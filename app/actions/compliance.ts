"use server"
import { requireAuth } from "@/lib/auth"
import { db } from "@/lib/db/client"
import { revalidatePath } from "next/cache"

// Update compliance status action
export async function updateComplianceStatus(formData: FormData) {
  try {
    const session = await requireAuth()

    const requirementId = formData.get("requirementId") as string
    const status = formData.get("status") as "Not Started" | "In Progress" | "Completed"
    const notes = formData.get("notes") as string | undefined

    if (!requirementId || !status) {
      return { success: false, error: "Missing required fields" }
    }

    // Check if compliance record exists
    const existingCompliance = await db.organizationCompliance.findFirst({
      where: {
        organizationId: session.organizationId,
        requirementId,
      },
    })

    if (existingCompliance) {
      // Update existing record
      await db.organizationCompliance.update({
        where: { id: existingCompliance.id },
        data: {
          status,
          notes,
          completedAt: status === "Completed" ? new Date() : null,
        },
      })
    } else {
      // Create new record
      await db.organizationCompliance.create({
        data: {
          organizationId: session.organizationId,
          requirementId,
          status,
          notes,
          completedAt: status === "Completed" ? new Date() : null,
        },
      })
    }

    revalidatePath("/compliance")
    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to update compliance status" }
  }
}

// Get compliance frameworks action
export async function getComplianceFrameworks() {
  try {
    const frameworks = await db.complianceFramework.findMany({
      include: {
        requirements: true,
      },
    })

    return { success: true, data: frameworks }
  } catch (error) {
    return { success: false, error: "Failed to fetch compliance frameworks" }
  }
}

// Get organization compliance status action
export async function getOrganizationCompliance() {
  try {
    const session = await requireAuth()

    const compliance = await db.organizationCompliance.findMany({
      where: { organizationId: session.organizationId },
      include: {
        requirement: {
          include: {
            framework: true,
          },
        },
      },
    })

    return { success: true, data: compliance }
  } catch (error) {
    return { success: false, error: "Failed to fetch compliance status" }
  }
}

// Generate compliance report action
export async function generateComplianceReport() {
  try {
    const session = await requireAuth()

    // In a real app, this would generate a PDF report
    // For demo purposes, we'll just return a success message

    return {
      success: true,
      data: {
        reportUrl: `/api/reports/compliance/${session.organizationId}`,
        generatedAt: new Date(),
      },
    }
  } catch (error) {
    return { success: false, error: "Failed to generate compliance report" }
  }
}
