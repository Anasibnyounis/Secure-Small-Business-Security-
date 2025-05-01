"use server"

import { z } from "zod"
import { requireAuth } from "@/lib/auth"
import { db } from "@/lib/db/client"
import { revalidatePath } from "next/cache"

// Asset schema
const AssetSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(["server", "workstation", "mobile", "network", "cloud", "other"]),
  ipAddress: z.string().optional(),
  macAddress: z.string().optional(),
  operatingSystem: z.string().optional(),
})

// Add asset action
export async function addAsset(formData: FormData) {
  try {
    const session = await requireAuth()

    const validatedFields = AssetSchema.parse({
      name: formData.get("name"),
      type: formData.get("type"),
      ipAddress: formData.get("ipAddress") || undefined,
      macAddress: formData.get("macAddress") || undefined,
      operatingSystem: formData.get("operatingSystem") || undefined,
    })

    // Create a new asset
    const asset = await db.asset.create({
      data: {
        ...validatedFields,
        organizationId: session.organizationId,
        lastSeen: new Date(),
      },
    })

    revalidatePath("/assets")
    return { success: true, data: asset }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message }
    }
    return { success: false, error: "Failed to add asset" }
  }
}

// Get assets action
export async function getAssets() {
  try {
    const session = await requireAuth()

    const assets = await db.asset.findMany({
      where: { organizationId: session.organizationId },
      orderBy: { createdAt: "desc" },
    })

    return { success: true, data: assets }
  } catch (error) {
    return { success: false, error: "Failed to fetch assets" }
  }
}

// Delete asset action
export async function deleteAsset(formData: FormData) {
  try {
    await requireAuth()

    const assetId = formData.get("assetId") as string

    if (!assetId) {
      return { success: false, error: "Asset ID is required" }
    }

    // Delete the asset
    await db.asset.delete({
      where: { id: assetId },
    })

    revalidatePath("/assets")
    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to delete asset" }
  }
}
