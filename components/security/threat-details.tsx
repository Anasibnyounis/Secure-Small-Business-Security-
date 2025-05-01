"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Shield, CheckCircle, XCircle, ExternalLink } from "lucide-react"
import { updateThreatStatus } from "@/app/actions/security"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ThreatDetailsProps {
  threat: {
    id: string
    type: string
    severity: "High" | "Medium" | "Low"
    source: string
    timestamp: string
    status: "Active" | "Investigating" | "Resolved"
    description: string
    assetId?: string
    asset?: {
      name: string
      type: string
      ipAddress?: string
    }
  }
  onClose: () => void
}

export default function ThreatDetails({ threat, onClose }: ThreatDetailsProps) {
  const { toast } = useToast()
  const [isUpdating, setIsUpdating] = useState(false)
  const [currentStatus, setCurrentStatus] = useState(threat.status)

  const handleStatusChange = async (newStatus: "Active" | "Investigating" | "Resolved") => {
    setIsUpdating(true)

    const formData = new FormData()
    formData.append("threatId", threat.id)
    formData.append("status", newStatus)

    const result = await updateThreatStatus(formData)

    if (result.success) {
      setCurrentStatus(newStatus)
      toast({
        title: "Status updated",
        description: `Threat status changed to ${newStatus}.`,
      })
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to update threat status",
        variant: "destructive",
      })
    }

    setIsUpdating(false)
  }

  // Get severity color
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High":
        return "text-red-600"
      case "Medium":
        return "text-amber-600"
      case "Low":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800">
            {status}
          </Badge>
        )
      case "Investigating":
        return (
          <Badge variant="outline" className="bg-purple-100 text-purple-800">
            {status}
          </Badge>
        )
      case "Resolved":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            {status}
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center">
              <AlertTriangle className={`mr-2 h-5 w-5 ${getSeverityColor(threat.severity)}`} />
              {threat.type}
            </CardTitle>
            <CardDescription>Detected on {new Date(threat.timestamp).toLocaleString()}</CardDescription>
          </div>
          <div>{getStatusBadge(currentStatus)}</div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="details">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="remediation">Remediation</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4 pt-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500">Description</h3>
              <p>{threat.description}</p>
            </div>

            {threat.asset && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">Affected Asset</h3>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="font-medium">{threat.asset.name}</div>
                  <div className="text-sm text-gray-500">
                    {threat.asset.type} {threat.asset.ipAddress && `(${threat.asset.ipAddress})`}
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Severity</h3>
                <div className={`font-medium ${getSeverityColor(threat.severity)}`}>{threat.severity}</div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Source</h3>
                <div className="font-medium">{threat.source}</div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500">Technical Details</h3>
              <div className="bg-gray-50 p-3 rounded-lg font-mono text-xs overflow-auto">
                {JSON.stringify(
                  {
                    threatId: threat.id,
                    timestamp: threat.timestamp,
                    source: threat.source,
                    severity: threat.severity,
                    assetId: threat.assetId || "unknown",
                    detectionMethod: "signature-based",
                    confidence: "high",
                  },
                  null,
                  2,
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="remediation" className="space-y-4 pt-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500">Recommended Actions</h3>
              <ul className="list-disc pl-5 space-y-2">
                {threat.type.includes("Phishing") && (
                  <>
                    <li>Isolate the affected system from the network</li>
                    <li>Scan the system for malware</li>
                    <li>Reset user passwords</li>
                    <li>Review email logs for similar messages</li>
                    <li>Update email security filters</li>
                  </>
                )}
                {threat.type.includes("Login") && (
                  <>
                    <li>Lock the affected account</li>
                    <li>Reset the user's password</li>
                    <li>Enable multi-factor authentication</li>
                    <li>Review login logs for other suspicious activity</li>
                    <li>Update access control policies</li>
                  </>
                )}
                {threat.type.includes("Malware") && (
                  <>
                    <li>Isolate the affected system</li>
                    <li>Run a full system scan</li>
                    <li>Update antivirus definitions</li>
                    <li>Remove identified malware</li>
                    <li>Restore from clean backup if necessary</li>
                  </>
                )}
                {threat.type.includes("Outdated") && (
                  <>
                    <li>Apply security updates to affected systems</li>
                    <li>Implement a regular patching schedule</li>
                    <li>Consider automated patch management</li>
                  </>
                )}
                {!threat.type.includes("Phishing") &&
                  !threat.type.includes("Login") &&
                  !threat.type.includes("Malware") &&
                  !threat.type.includes("Outdated") && (
                    <>
                      <li>Investigate the root cause</li>
                      <li>Apply security patches if applicable</li>
                      <li>Update security configurations</li>
                      <li>Monitor for similar activity</li>
                      <li>Document the incident and resolution</li>
                    </>
                  )}
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500">Resources</h3>
              <div className="space-y-2">
                <Button variant="link" className="h-auto p-0 text-blue-600" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Security Knowledge Base Article
                  </a>
                </Button>
                <Button variant="link" className="h-auto p-0 text-blue-600" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Remediation Guide
                  </a>
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="flex">
                <div className="mr-4 flex flex-col items-center">
                  <div className="h-3 w-3 rounded-full bg-blue-600"></div>
                  <div className="h-full w-0.5 bg-gray-200"></div>
                </div>
                <div className="pb-4">
                  <div className="text-sm font-medium">{new Date(threat.timestamp).toLocaleString()}</div>
                  <div className="text-sm text-gray-500">Threat detected</div>
                  <div className="text-sm mt-1">{threat.description}</div>
                </div>
              </div>

              <div className="flex">
                <div className="mr-4 flex flex-col items-center">
                  <div className="h-3 w-3 rounded-full bg-purple-600"></div>
                  <div className="h-full w-0.5 bg-gray-200"></div>
                </div>
                <div className="pb-4">
                  <div className="text-sm font-medium">
                    {new Date(new Date(threat.timestamp).getTime() + 5 * 60000).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">Alert generated</div>
                  <div className="text-sm mt-1">Security alert created and notification sent to administrators.</div>
                </div>
              </div>

              {currentStatus !== "Active" && (
                <div className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="h-3 w-3 rounded-full bg-amber-600"></div>
                    <div className="h-full w-0.5 bg-gray-200"></div>
                  </div>
                  <div className="pb-4">
                    <div className="text-sm font-medium">
                      {new Date(new Date(threat.timestamp).getTime() + 15 * 60000).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">Investigation started</div>
                    <div className="text-sm mt-1">Security team began investigating the threat.</div>
                  </div>
                </div>
              )}

              {currentStatus === "Resolved" && (
                <div className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="h-3 w-3 rounded-full bg-green-600"></div>
                    <div className="h-full w-0.5 bg-transparent"></div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">
                      {new Date(new Date().getTime() - 30 * 60000).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">Threat resolved</div>
                    <div className="text-sm mt-1">
                      Security team implemented remediation steps and resolved the threat.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="flex w-full space-x-2">
          {currentStatus !== "Investigating" && (
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => handleStatusChange("Investigating")}
              disabled={isUpdating}
            >
              <Shield className="mr-2 h-4 w-4" />
              Start Investigation
            </Button>
          )}
          {currentStatus !== "Resolved" && (
            <Button
              className="flex-1 bg-green-600 hover:bg-green-700"
              onClick={() => handleStatusChange("Resolved")}
              disabled={isUpdating}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Mark as Resolved
            </Button>
          )}
          {currentStatus === "Resolved" && (
            <Button
              variant="outline"
              className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
              onClick={() => handleStatusChange("Active")}
              disabled={isUpdating}
            >
              <XCircle className="mr-2 h-4 w-4" />
              Reopen Threat
            </Button>
          )}
        </div>
        <Button variant="ghost" onClick={onClose} className="w-full">
          Close Details
        </Button>
      </CardFooter>
    </Card>
  )
}
