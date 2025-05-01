"use server"

import { z } from "zod"
import { login, logout, hashPassword } from "@/lib/auth"
import { db } from "@/lib/db/client"
import { revalidatePath } from "next/cache"

// Login schema
const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

// Register schema
const RegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
})

// Login action
export async function loginUser(formData: FormData) {
  try {
    const validatedFields = LoginSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    })

    const session = await login(validatedFields.email, validatedFields.password)
    revalidatePath("/")
    return { success: true, data: session }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message }
    }
    return { success: false, error: "Invalid email or password" }
  }
}

// Register action
export async function registerUser(formData: FormData) {
  try {
    const validatedFields = RegisterSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      company: formData.get("company"),
    })

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email: validatedFields.email },
    })

    if (existingUser) {
      return { success: false, error: "Email already in use" }
    }

    // Create organization
    const organization = await db.organization.create({
      data: {
        name: validatedFields.company,
        industry: "Other",
        size: "Small",
      },
    })

    // Hash password
    const hashedPassword = await hashPassword(validatedFields.password)

    // Create user
    const user = await db.user.create({
      data: {
        name: validatedFields.name,
        email: validatedFields.email,
        password: hashedPassword,
        role: "Owner",
        organizationId: organization.id,
      },
    })

    // Log in the user
    const session = await login(validatedFields.email, validatedFields.password)
    revalidatePath("/")
    return { success: true, data: session }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message }
    }
    return { success: false, error: "Failed to create account" }
  }
}

// Logout action
export async function logoutUser() {
  try {
    logout()
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to logout" }
  }
}
