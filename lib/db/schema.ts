// Database schema for SecureSmallBiz
import { z } from "zod"

// User schema
export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(), // Hashed password
  company: z.string(),
  role: z.string(),
  phone: z.string().optional(),
  website: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type User = z.infer<typeof UserSchema>

// Organization schema
export const OrganizationSchema = z.object({
  id: z.string(),
  name: z.string(),
  industry: z.string(),
  size: z.string(), // Small, Medium, Large
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Organization = z.infer<typeof OrganizationSchema>

// Asset schema (devices, servers, etc.)
export const AssetSchema = z.object({
  id: z.string(),
  organizationId: z.string(),
  name: z.string(),
  type: z.enum(["server", "workstation", "mobile", "network", "cloud", "other"]),
  ipAddress: z.string().optional(),
  macAddress: z.string().optional(),
  operatingSystem: z.string().optional(),
  lastSeen: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Asset = z.infer<typeof AssetSchema>

// Vulnerability schema
export const VulnerabilitySchema = z.object({
  id: z.string(),
  assetId: z.string(),
  organizationId: z.string(),
  name: z.string(),
  description: z.string(),
  severity: z.enum(["Low", "Medium", "High", "Critical"]),
  cvssScore: z.number().optional(), // Common Vulnerability Scoring System
  cveId: z.string().optional(), // Common Vulnerabilities and Exposures ID
  status: z.enum(["Open", "In Progress", "Resolved", "False Positive"]),
  remediationSteps: z.string().optional(),
  discoveredAt: z.date(),
  resolvedAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Vulnerability = z.infer<typeof VulnerabilitySchema>

// Security Event schema
export const SecurityEventSchema = z.object({
  id: z.string(),
  organizationId: z.string(),
  assetId: z.string().optional(),
  eventType: z.enum([
    "login_attempt",
    "data_access",
    "configuration_change",
    "malware_detection",
    "network_anomaly",
    "policy_violation",
    "other",
  ]),
  severity: z.enum(["Low", "Medium", "High"]),
  source: z.string(),
  sourceIp: z.string().optional(),
  description: z.string(),
  rawData: z.string().optional(), // JSON string of raw event data
  status: z.enum(["Active", "Investigating", "Resolved", "False Positive"]),
  timestamp: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type SecurityEvent = z.infer<typeof SecurityEventSchema>

// Compliance Framework schema
export const ComplianceFrameworkSchema = z.object({
  id: z.string(),
  name: z.string(), // GDPR, HIPAA, PCI DSS, etc.
  description: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type ComplianceFramework = z.infer<typeof ComplianceFrameworkSchema>

// Compliance Requirement schema
export const ComplianceRequirementSchema = z.object({
  id: z.string(),
  frameworkId: z.string(),
  name: z.string(),
  description: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type ComplianceRequirement = z.infer<typeof ComplianceRequirementSchema>

// Organization Compliance Status schema
export const OrganizationComplianceSchema = z.object({
  id: z.string(),
  organizationId: z.string(),
  requirementId: z.string(),
  status: z.enum(["Not Started", "In Progress", "Completed"]),
  evidence: z.string().optional(), // URL or description of compliance evidence
  notes: z.string().optional(),
  completedAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type OrganizationCompliance = z.infer<typeof OrganizationComplianceSchema>

// Training Module schema
export const TrainingModuleSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  content: z.string(), // URL to content or embedded content
  duration: z.number(), // in minutes
  level: z.enum(["Beginner", "Intermediate", "Advanced"]),
  topics: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type TrainingModule = z.infer<typeof TrainingModuleSchema>

// User Training Progress schema
export const UserTrainingProgressSchema = z.object({
  id: z.string(),
  userId: z.string(),
  moduleId: z.string(),
  status: z.enum(["Not Started", "In Progress", "Completed"]),
  progress: z.number(), // percentage
  score: z.number().optional(), // quiz/test score
  completedAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type UserTrainingProgress = z.infer<typeof UserTrainingProgressSchema>

// Security Scan schema
export const SecurityScanSchema = z.object({
  id: z.string(),
  organizationId: z.string(),
  scanType: z.enum(["vulnerability", "compliance", "network", "configuration", "full"]),
  status: z.enum(["Scheduled", "In Progress", "Completed", "Failed"]),
  startedAt: z.date(),
  completedAt: z.date().optional(),
  summary: z.string().optional(), // JSON string of scan summary
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type SecurityScan = z.infer<typeof SecurityScanSchema>
