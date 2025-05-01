"use client"

import { useState } from "react"
import {
  FileCheck,
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  HelpCircle,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ComplianceProps {
  onNavigate: (page: string) => void
}

// Mock compliance data
const complianceFrameworks = [
  {
    id: "gdpr",
    name: "GDPR",
    description: "General Data Protection Regulation",
    progress: 85,
    requirements: [
      {
        id: "gdpr-1",
        name: "Data Protection Policy",
        status: "Completed",
        description: "Create and implement a data protection policy for your organization.",
      },
      {
        id: "gdpr-2",
        name: "Privacy Notices",
        status: "Completed",
        description: "Provide clear privacy notices to data subjects about how their data is processed.",
      },
      {
        id: "gdpr-3",
        name: "Data Processing Register",
        status: "Completed",
        description: "Maintain a register of all data processing activities within your organization.",
      },
      {
        id: "gdpr-4",
        name: "Data Subject Rights",
        status: "In Progress",
        description: "Implement procedures to handle data subject rights requests (access, erasure, etc.).",
      },
      {
        id: "gdpr-5",
        name: "Data Breach Procedures",
        status: "Not Started",
        description: "Establish procedures for detecting, reporting, and investigating data breaches.",
      },
    ],
  },
  {
    id: "ccpa",
    name: "CCPA",
    description: "California Consumer Privacy Act",
    progress: 60,
    requirements: [
      {
        id: "ccpa-1",
        name: "Privacy Policy Update",
        status: "Completed",
        description: "Update privacy policy to include CCPA-specific disclosures.",
      },
      {
        id: "ccpa-2",
        name: "Consumer Rights Procedures",
        status: "In Progress",
        description: "Implement procedures for handling consumer rights requests.",
      },
      {
        id: "ccpa-3",
        name: "Data Inventory",
        status: "In Progress",
        description: "Create an inventory of personal information collected in the last 12 months.",
      },
      {
        id: "ccpa-4",
        name: "Opt-Out Mechanism",
        status: "Not Started",
        description: "Implement a 'Do Not Sell My Personal Information' option if applicable.",
      },
    ],
  },
  {
    id: "hipaa",
    name: "HIPAA",
    description: "Health Insurance Portability and Accountability Act",
    progress: 40,
    requirements: [
      {
        id: "hipaa-1",
        name: "Privacy Officer",
        status: "Completed",
        description: "Designate a privacy officer responsible for HIPAA compliance.",
      },
      {
        id: "hipaa-2",
        name: "Risk Assessment",
        status: "In Progress",
        description: "Conduct a risk assessment of potential vulnerabilities to PHI.",
      },
      {
        id: "hipaa-3",
        name: "Security Measures",
        status: "Not Started",
        description: "Implement appropriate security measures to protect PHI.",
      },
      {
        id: "hipaa-4",
        name: "Business Associate Agreements",
        status: "Not Started",
        description: "Ensure all business associates have signed BAAs.",
      },
      {
        id: "hipaa-5",
        name: "Training Program",
        status: "Not Started",
        description: "Develop and implement a HIPAA training program for all staff.",
      },
    ],
  },
]

export default function Compliance({ onNavigate }: ComplianceProps) {
  const [expandedFramework, setExpandedFramework] = useState("gdpr")

  // Calculate overall compliance
  const totalRequirements = complianceFrameworks.reduce((total, framework) => total + framework.requirements.length, 0)

  const completedRequirements = complianceFrameworks.reduce(
    (total, framework) => total + framework.requirements.filter((req) => req.status === "Completed").length,
    0,
  )

  const overallProgress = Math.round((completedRequirements / totalRequirements) * 100)

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            Completed
          </Badge>
        )
      case "In Progress":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            In Progress
          </Badge>
        )
      case "Not Started":
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800">
            Not Started
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "In Progress":
        return <Clock className="h-5 w-5 text-yellow-600" />
      case "Not Started":
        return <AlertCircle className="h-5 w-5 text-gray-400" />
      default:
        return null
    }
  }

  return (
    <div className="container px-4 py-6 md:px-6 md:py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">Compliance Management</h1>
        <p className="text-gray-500">Track and manage regulatory compliance requirements.</p>
      </div>

      {/* Overall Compliance Card */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="text-xl font-bold mb-2">Overall Compliance</h2>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-gray-500">
                    {completedRequirements}/{totalRequirements} requirements
                  </span>
                </div>
                <Progress value={overallProgress} className="h-2" />
                <p className="text-sm text-gray-500">{overallProgress}% of all compliance requirements completed</p>
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <Button className="w-full sm:w-auto" onClick={() => onNavigate("compliance-report")}>
                <FileCheck className="mr-2 h-4 w-4" />
                Generate Compliance Report
              </Button>
              <Button variant="outline" className="w-full sm:w-auto">
                <Download className="mr-2 h-4 w-4" />
                Download Requirements Checklist
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Frameworks */}
      <div className="grid gap-6 md:grid-cols-3 mb-6">
        {complianceFrameworks.map((framework) => (
          <Card
            key={framework.id}
            className={`cursor-pointer transition-all ${
              expandedFramework === framework.id ? "border-blue-200 shadow-md" : ""
            }`}
            onClick={() => setExpandedFramework(framework.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold">{framework.name}</h3>
                  <p className="text-sm text-gray-500">{framework.description}</p>
                </div>
                {expandedFramework === framework.id ? (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Compliance</span>
                  <span className="text-sm text-gray-500">{framework.progress}%</span>
                </div>
                <Progress value={framework.progress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected Framework Requirements */}
      <Card>
        <CardHeader>
          <CardTitle>{complianceFrameworks.find((f) => f.id === expandedFramework)?.name} Requirements</CardTitle>
          <CardDescription>
            Track and manage compliance requirements for{" "}
            {complianceFrameworks.find((f) => f.id === expandedFramework)?.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {complianceFrameworks
              .find((f) => f.id === expandedFramework)
              ?.requirements.map((requirement) => (
                <AccordionItem key={requirement.id} value={requirement.id}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center space-x-4 text-left">
                      {getStatusIcon(requirement.status)}
                      <div>
                        <p className="font-medium">{requirement.name}</p>
                        <div className="flex items-center mt-1">{getStatusBadge(requirement.status)}</div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pt-2 pb-4 px-4 bg-gray-50 rounded-md">
                      <p className="text-gray-700 mb-4">{requirement.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {requirement.status !== "Completed" && (
                          <Button size="sm" className="bg-blue-700 hover:bg-blue-800">
                            Mark as Completed
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button size="sm" variant="ghost" className="gap-1">
                                <HelpCircle className="h-4 w-4" />
                                Help
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-80">
                                Get detailed guidance on how to meet this requirement and what documentation is needed.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
