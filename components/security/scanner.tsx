"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Shield, AlertTriangle, CheckCircle, Loader2 } from "lucide-react"
import { runSecurityScan } from "@/app/actions/security"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SecurityScanner({ onComplete }: { onComplete?: () => void }) {
  const { toast } = useToast()
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [scanType, setScanType] = useState<"vulnerability" | "compliance" | "network" | "configuration" | "full">(
    "full",
  )
  const [scanResults, setScanResults] = useState<{
    assetsScanned: number
    vulnerabilitiesFound: number
    highSeverity: number
  } | null>(null)

  const handleScan = async () => {
    setIsScanning(true)
    setScanProgress(0)
    setScanResults(null)

    // Create form data with scan type
    const formData = new FormData()
    formData.append("scanType", scanType)

    // Run the scan
    const result = await runSecurityScan(formData)

    if (result.success) {
      toast({
        title: "Security scan initiated",
        description: "Scanning your systems for vulnerabilities...",
      })

      // Simulate progress updates
      const interval = setInterval(() => {
        setScanProgress((prev) => {
          const newProgress = prev + Math.floor(Math.random() * 10)
          return newProgress >= 100 ? 100 : newProgress
        })
      }, 500)

      // Simulate scan completion
      setTimeout(() => {
        clearInterval(interval)
        setScanProgress(100)

        // Generate random results
        const results = {
          assetsScanned: Math.floor(Math.random() * 10) + 5,
          vulnerabilitiesFound: Math.floor(Math.random() * 8) + 2,
          highSeverity: Math.floor(Math.random() * 3),
        }

        setScanResults(results)
        setIsScanning(false)

        toast({
          title: "Security scan complete",
          description: `Found ${results.vulnerabilitiesFound} vulnerabilities across ${results.assetsScanned} assets.`,
        })

        if (onComplete) {
          onComplete()
        }
      }, 5000)
    } else {
      setIsScanning(false)
      toast({
        title: "Error",
        description: result.error || "Failed to run security scan",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Scanner</CardTitle>
        <CardDescription>
          Scan your systems for vulnerabilities, compliance issues, and security threats.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isScanning && !scanResults && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="scan-type" className="text-sm font-medium">
                Scan Type
              </label>
              <Select value={scanType} onValueChange={(value: any) => setScanType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select scan type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vulnerability">Vulnerability Scan</SelectItem>
                  <SelectItem value="compliance">Compliance Scan</SelectItem>
                  <SelectItem value="network">Network Scan</SelectItem>
                  <SelectItem value="configuration">Configuration Audit</SelectItem>
                  <SelectItem value="full">Full Security Assessment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start">
                <Shield className="h-6 w-6 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium text-blue-900">Scan Information</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    {scanType === "vulnerability" && "Identifies software vulnerabilities and security weaknesses."}
                    {scanType === "compliance" && "Checks your systems against regulatory compliance requirements."}
                    {scanType === "network" && "Scans your network for open ports and potential intrusion points."}
                    {scanType === "configuration" && "Audits system configurations for security best practices."}
                    {scanType === "full" && "Comprehensive security assessment covering all security aspects."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {isScanning && (
          <div className="space-y-4">
            <div className="flex justify-center">
              <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
            </div>
            <div className="text-center">
              <h3 className="font-medium text-lg">Scanning in progress...</h3>
              <p className="text-sm text-gray-500 mt-1">
                {scanProgress < 30 && "Initializing scan and discovering assets..."}
                {scanProgress >= 30 && scanProgress < 60 && "Analyzing systems and configurations..."}
                {scanProgress >= 60 && scanProgress < 90 && "Identifying vulnerabilities and threats..."}
                {scanProgress >= 90 && "Finalizing results and generating report..."}
              </p>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{scanProgress}%</span>
              </div>
              <Progress value={scanProgress} className="h-2" />
            </div>
          </div>
        )}

        {!isScanning && scanResults && (
          <div className="space-y-4">
            <div className="flex justify-center">
              {scanResults.highSeverity > 0 ? (
                <AlertTriangle className="h-12 w-12 text-amber-500" />
              ) : (
                <CheckCircle className="h-12 w-12 text-green-500" />
              )}
            </div>
            <div className="text-center">
              <h3 className="font-medium text-lg">Scan Complete</h3>
              <p className="text-sm text-gray-500 mt-1">
                {scanResults.vulnerabilitiesFound === 0
                  ? "No vulnerabilities were found. Your systems are secure."
                  : `Found ${scanResults.vulnerabilitiesFound} vulnerabilities across ${scanResults.assetsScanned} assets.`}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold">{scanResults.assetsScanned}</div>
                <div className="text-xs text-gray-500">Assets Scanned</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold">{scanResults.vulnerabilitiesFound}</div>
                <div className="text-xs text-gray-500">Vulnerabilities</div>
              </div>
              <div
                className={`p-3 rounded-lg text-center ${scanResults.highSeverity > 0 ? "bg-red-50" : "bg-green-50"}`}
              >
                <div
                  className={`text-2xl font-bold ${scanResults.highSeverity > 0 ? "text-red-600" : "text-green-600"}`}
                >
                  {scanResults.highSeverity}
                </div>
                <div className="text-xs text-gray-500">High Severity</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!isScanning && !scanResults && (
          <Button onClick={handleScan} className="w-full">
            Start Security Scan
          </Button>
        )}
        {!isScanning && scanResults && (
          <div className="flex flex-col w-full space-y-2">
            <Button onClick={() => (window.location.href = "/threats")} className="w-full">
              View Detailed Results
            </Button>
            <Button variant="outline" onClick={() => setScanResults(null)} className="w-full">
              Run Another Scan
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
