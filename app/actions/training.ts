"use server"
import { requireAuth } from "@/lib/auth"
import { db } from "@/lib/db/client"
import { revalidatePath } from "next/cache"

// Get training modules action
export async function getTrainingModules() {
  try {
    const modules = await db.trainingModule.findMany({
      orderBy: { createdAt: "desc" },
    })

    return { success: true, data: modules }
  } catch (error) {
    return { success: false, error: "Failed to fetch training modules" }
  }
}

// Get user training progress action
export async function getUserTrainingProgress(userId?: string) {
  try {
    const session = await requireAuth()

    const progress = await db.userTrainingProgress.findMany({
      where: { userId: userId || session.id },
      include: {
        module: true,
      },
    })

    return { success: true, data: progress }
  } catch (error) {
    return { success: false, error: "Failed to fetch training progress" }
  }
}

// Start training module action
export async function startTrainingModule(formData: FormData) {
  try {
    const session = await requireAuth()

    const moduleId = formData.get("moduleId") as string

    if (!moduleId) {
      return { success: false, error: "Module ID is required" }
    }

    // Check if progress record exists
    const existingProgress = await db.userTrainingProgress.findFirst({
      where: {
        userId: session.id,
        moduleId,
      },
    })

    if (existingProgress) {
      // Update existing record
      await db.userTrainingProgress.update({
        where: { id: existingProgress.id },
        data: {
          status: "In Progress",
        },
      })
    } else {
      // Create new record
      await db.userTrainingProgress.create({
        data: {
          userId: session.id,
          moduleId,
          status: "In Progress",
          progress: 0,
        },
      })
    }

    revalidatePath("/training")
    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to start training module" }
  }
}

// Update training progress action
export async function updateTrainingProgress(formData: FormData) {
  try {
    const session = await requireAuth()

    const moduleId = formData.get("moduleId") as string
    const progress = Number(formData.get("progress"))
    const completed = formData.get("completed") === "true"

    if (!moduleId || isNaN(progress)) {
      return { success: false, error: "Missing required fields" }
    }

    // Find progress record
    const progressRecord = await db.userTrainingProgress.findFirst({
      where: {
        userId: session.id,
        moduleId,
      },
    })

    if (!progressRecord) {
      return { success: false, error: "Training progress not found" }
    }

    // Update progress
    await db.userTrainingProgress.update({
      where: { id: progressRecord.id },
      data: {
        progress,
        status: completed ? "Completed" : "In Progress",
        completedAt: completed ? new Date() : null,
      },
    })

    revalidatePath("/training")
    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to update training progress" }
  }
}

// Assign training to users action
export async function assignTrainingToUsers(formData: FormData) {
  try {
    await requireAuth()

    const moduleId = formData.get("moduleId") as string
    const userIds = (formData.get("userIds") as string).split(",")

    if (!moduleId || !userIds.length) {
      return { success: false, error: "Missing required fields" }
    }

    // Assign training to each user
    for (const userId of userIds) {
      // Check if progress record exists
      const existingProgress = await db.userTrainingProgress.findFirst({
        where: {
          userId,
          moduleId,
        },
      })

      if (!existingProgress) {
        // Create new record
        await db.userTrainingProgress.create({
          data: {
            userId,
            moduleId,
            status: "Not Started",
            progress: 0,
          },
        })
      }
    }

    revalidatePath("/training")
    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to assign training" }
  }
}
