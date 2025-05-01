import { cookies } from "next/headers"
import { jwtVerify, SignJWT } from "jose"
import { z } from "zod"
import bcrypt from "bcryptjs"
import { db } from "./db/client"

// Secret key for JWT signing
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// User session schema
const SessionSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  organizationId: z.string(),
  role: z.string(),
  exp: z.number(),
})

export type Session = z.infer<typeof SessionSchema>

// Create a JWT token
export async function createToken(payload: Omit<Session, "exp">): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(new TextEncoder().encode(JWT_SECRET))
}

// Verify a JWT token
export async function verifyToken(token: string): Promise<Session | null> {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET))
    return SessionSchema.parse(payload)
  } catch (error) {
    return null
  }
}

// Get the current session
export async function getSession(): Promise<Session | null> {
  const cookieStore = cookies()
  const token = cookieStore.get("session")?.value

  if (!token) return null

  return verifyToken(token)
}

// Hash a password
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

// Compare a password with a hash
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

// Login user
export async function login(email: string, password: string) {
  // In a real app, you would fetch the user from the database
  const user = await db.user.findUnique({
    where: { email },
    include: { organization: true },
  })

  if (!user) {
    throw new Error("Invalid email or password")
  }

  const passwordMatch = await comparePassword(password, user.password)

  if (!passwordMatch) {
    throw new Error("Invalid email or password")
  }

  const session = {
    id: user.id,
    email: user.email,
    name: user.name,
    organizationId: user.organizationId,
    role: user.role,
  }

  const token = await createToken(session)

  // Set the session cookie
  cookies().set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
  })

  return session
}

// Logout user
export function logout() {
  cookies().delete("session")
}

// Check if user is authenticated
export async function requireAuth() {
  const session = await getSession()

  if (!session) {
    throw new Error("Unauthorized")
  }

  return session
}
