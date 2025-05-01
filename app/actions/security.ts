"use server"

import { z } from "zod"
import { requireAuth } from "@/lib/auth"
import { db } from "@/lib/db/client"
import { revalidatePath } from "next/cache"

// Security scan schema
const SecurityScanSchema = z.object({
  scanType: z.enum(["vulnerability", "compliance", "network", "configuration", "full"]),
})

// Run security scan action
export async function runSecurityScan(formData: FormData) {
  try {
    const session = await requireAuth()

    const validatedFields = SecurityScanSchema.parse({
      scanType: formData.get("scanType") || "full",
    })

    // Create a new security scan
    const scan = await db.securityScan.create({
      data: {
        organizationId: session.organizationId,
        scanType: validatedFields.scanType,
        status: "In Progress",
        startedAt: new Date(),
      },
    })

    // In a real app, this would trigger an async job to perform the scan
    // For demo purposes, we'll simulate the scan with a timeout
    setTimeout(async () => {
      // Simulate finding vulnerabilities
      const assets = await db.asset.findMany({
        where: { organizationId: session.organizationId },
      })

      // Generate random vulnerabilities for each asset
      let vulnerabilityCount = 0
      for (const asset of assets) {
        const assetVulnerabilityCount = Math.floor(Math.random() * 3) // 0-2 vulnerabilities per asset
        vulnerabilityCount += assetVulnerabilityCount

        for (let i = 0; i < assetVulnerabilityCount; i++) {
          const severity = ["Low", "Medium", "High", "Critical"][Math.floor(Math.random() * 4)] as
            | "Low"
            | "Medium"
            | "High"
            | "Critical"

          await db.vulnerability.create({
            data: {
              assetId: asset.id,
              organizationId: session.organizationId,
              name: getRandomVulnerabilityName(),
              description: getRandomVulnerabilityDescription(),
              severity,
              cvssScore: Math.random() * 10,
              status: "Open",
              discoveredAt: new Date(),
            },
          })
        }
      }

      // Update scan status
      await db.securityScan.update({
        where: { id: scan.id },
        data: {
          status: "Completed",
          completedAt: new Date(),
          summary: JSON.stringify({
            assetsScanned: assets.length,
            vulnerabilitiesFound: vulnerabilityCount,
            highSeverity: vulnerabilityCount > 0 ? Math.floor(Math.random() * vulnerabilityCount) : 0,
          }),
        },
      })

      revalidatePath("/dashboard")
      revalidatePath("/threats")
    }, 5000) // Simulate 5 second scan

    return { success: true, data: scan }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message }
    }
    return { success: false, error: "Failed to run security scan" }
  }
}

// Update threat status action
export async function updateThreatStatus(formData: FormData) {
  try {
    await requireAuth()

    const threatId = formData.get("threatId") as string
    const status = formData.get("status") as "Active" | "Investigating" | "Resolved" | "False Positive"

    if (!threatId || !status) {
      return { success: false, error: "Missing required fields" }
    }

    // Update the threat status
    await db.securityEvent.update({
      where: { id: threatId },
      data: { status },
    })

    revalidatePath("/threats")
    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to update threat status" }
  }
}

// Helper functions for generating random vulnerability data
function getRandomVulnerabilityName() {
  const names = [
    "Outdated Software",
    "Weak Password Policy",
    "Unpatched System",
    "Insecure Configuration",
    "Missing Encryption",
    "Open Network Port",
    "SQL Injection Vulnerability",
    "Cross-Site Scripting (XSS)",
    "Insecure File Permissions",
    "Default Credentials",
  ]
  return names[Math.floor(Math.random() * names.length)]
}

function getRandomVulnerabilityDescription() {
  const descriptions = [
    "Software is running an outdated version with known security vulnerabilities.",
    "Password policy does not enforce sufficient complexity requirements.",
    "System is missing critical security patches.",
    "Service is configured with insecure default settings.",
    "Sensitive data is not properly encrypted at rest or in transit.",
    "Unnecessary network port is open and accessible.",
    "Web application is vulnerable to SQL injection attacks.",
    "Web application is vulnerable to cross-site scripting attacks.",
    "File permissions allow unauthorized access to sensitive data.",
    "System is using default or easily guessable credentials.",
  ]
  return descriptions[Math.floor(Math.random() * descriptions.length)]
}
