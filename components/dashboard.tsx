"use client"

import { useState, useEffect } from "react"
import { Shield, AlertTriangle, CheckCircle, Users, FileCheck, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

interface DashboardProps {
  onNavigate: (page: string) => void
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const { toast } = useToast()

  // Mock data for the dashboard with state
  const [securityScore, setSecurityScore] = useState(78)
  const [threatData, setThreatData] = useState({
    high: 2,
    medium: 3,
    low: 5,
    total: 10,
  })
  const [complianceStatus, setComplianceStatus] = useState({
    completed: 8,
    inProgress: 3,
    notStarted: 2,
    total: 13,
  })
  const [trainingStatus, setTrainingStatus] = useState({
    completed: 12,
    inProgress: 8,
    notStarted: 5,
    total: 25,
  })
  const [isScanning, setIsScanning] = useState(false)

  // Simulate a security scan
  const runSecurityScan = () => {
    setIsScanning(true)
    toast({
      title: "Security scan initiated",
      description: "Scanning your systems for vulnerabilities...",
    })

    // Simulate scan completion after 3 seconds
    setTimeout(() => {
      // Randomly adjust security score
      const newScore = Math.max(60, Math.min(95, securityScore + Math.floor(Math.random() * 7) - 3))
      setSecurityScore(newScore)

      // Update threat data
      setThreatData({
        high: Math.floor(Math.random() * 3),
        medium: Math.floor(Math.random() * 4) + 1,
        low: Math.floor(Math.random() * 6) + 2,
        total: 10,
      })

      setIsScanning(false)
      toast({
        title: "Security scan complete",
        description: "New vulnerabilities detected. View the threats page for details.",
      })
    }, 3000)
  }

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedScore = localStorage.getItem("securityScore")
    const savedThreats = localStorage.getItem("threatData")
    const savedCompliance = localStorage.getItem("complianceStatus")
    const savedTraining = localStorage.getItem("trainingStatus")

    if (savedScore) setSecurityScore(Number.parseInt(savedScore))
    if (savedThreats) setThreatData(JSON.parse(savedThreats))
    if (savedCompliance) setComplianceStatus(JSON.parse(savedCompliance))
    if (savedTraining) setTrainingStatus(JSON.parse(savedTraining))
  }, [])

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("securityScore", securityScore.toString())
    localStorage.setItem("threatData", JSON.stringify(threatData))
    localStorage.setItem("complianceStatus", JSON.stringify(complianceStatus))
    localStorage.setItem("trainingStatus", JSON.stringify(trainingStatus))
  }, [securityScore, threatData, complianceStatus, trainingStatus])

  return (
    <div className="container px-4 py-6 md:px-6 md:py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">Dashboard</h1>
        <p className="text-gray-500">Welcome back! Here's an overview of your security status.</p>
      </div>

      {/* Security Score Card */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="col-span-full lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Security Score</CardTitle>
            <CardDescription>Overall security rating</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-gray-50">
                <div className="absolute text-4xl font-bold text-blue-700">{securityScore}%</div>
                <svg className="h-40 w-40" viewBox="0 0 100 100">
                  <circle
                    className="stroke-current text-gray-200"
                    cx="50"
                    cy="50"
                    r="40"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    className="stroke-current text-blue-700"
                    cx="50"
                    cy="50"
                    r="40"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 * (1 - securityScore / 100)}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-500">
                  {securityScore >= 80
                    ? "Excellent"
                    : securityScore >= 70
                      ? "Good"
                      : securityScore >= 60
                        ? "Fair"
                        : "Poor"}
                </p>
                <p className="text-xs text-gray-500">Last updated: Today at {new Date().toLocaleTimeString()}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={runSecurityScan} disabled={isScanning}>
              {isScanning ? "Scanning..." : "Run New Assessment"}
            </Button>
          </CardFooter>
        </Card>

        {/* Recent Threats Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Recent Threats</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <span className="text-sm font-medium">High</span>
                </div>
                <Badge variant="destructive">{threatData.high}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm font-medium">Medium</span>
                </div>
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                  {threatData.medium}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-blue-500" />
                  <span className="text-sm font-medium">Low</span>
                </div>
                <Badge variant="outline" className="bg-blue-100 text-blue-800">
                  {threatData.low}
                </Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full" onClick={() => onNavigate("threats")}>
              View All Threats
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        {/* Compliance Status Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Compliance Status</CardTitle>
            <CardDescription>Regulatory requirements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-gray-500">
                    {complianceStatus.completed}/{complianceStatus.total}
                  </span>
                </div>
                <Progress value={(complianceStatus.completed / complianceStatus.total) * 100} />
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg bg-green-100 p-2">
                  <div className="font-medium text-green-800">{complianceStatus.completed}</div>
                  <div className="text-xs text-green-800">Completed</div>
                </div>
                <div className="rounded-lg bg-yellow-100 p-2">
                  <div className="font-medium text-yellow-800">{complianceStatus.inProgress}</div>
                  <div className="text-xs text-yellow-800">In Progress</div>
                </div>
                <div className="rounded-lg bg-gray-100 p-2">
                  <div className="font-medium text-gray-800">{complianceStatus.notStarted}</div>
                  <div className="text-xs text-gray-800">Not Started</div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full" onClick={() => onNavigate("compliance")}>
              View Compliance
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        {/* Training Status Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Employee Training</CardTitle>
            <CardDescription>Security awareness</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Completion Rate</span>
                  <span className="text-sm text-gray-500">
                    {Math.round((trainingStatus.completed / trainingStatus.total) * 100)}%
                  </span>
                </div>
                <Progress value={(trainingStatus.completed / trainingStatus.total) * 100} />
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg bg-green-100 p-2">
                  <div className="font-medium text-green-800">{trainingStatus.completed}</div>
                  <div className="text-xs text-green-800">Completed</div>
                </div>
                <div className="rounded-lg bg-yellow-100 p-2">
                  <div className="font-medium text-yellow-800">{trainingStatus.inProgress}</div>
                  <div className="text-xs text-yellow-800">In Progress</div>
                </div>
                <div className="rounded-lg bg-gray-100 p-2">
                  <div className="font-medium text-gray-800">{trainingStatus.notStarted}</div>
                  <div className="text-xs text-gray-800">Not Started</div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full" onClick={() => onNavigate("training")}>
              View Training
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Quick Actions */}
      <h2 className="mb-4 mt-8 text-xl font-bold">Quick Actions</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={runSecurityScan}>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-2 rounded-full bg-blue-100">
              <Shield className="h-6 w-6 text-blue-700" />
            </div>
            <div>
              <h3 className="font-medium">Run Security Scan</h3>
              <p className="text-sm text-gray-500">Check for vulnerabilities</p>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => onNavigate("threats")}>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-2 rounded-full bg-red-100">
              <AlertTriangle className="h-6 w-6 text-red-700" />
            </div>
            <div>
              <h3 className="font-medium">View Threats</h3>
              <p className="text-sm text-gray-500">Review detected issues</p>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => onNavigate("training")}>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-2 rounded-full bg-green-100">
              <Users className="h-6 w-6 text-green-700" />
            </div>
            <div>
              <h3 className="font-medium">Assign Training</h3>
              <p className="text-sm text-gray-500">Educate your team</p>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => onNavigate("compliance")}>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-2 rounded-full bg-purple-100">
              <FileCheck className="h-6 w-6 text-purple-700" />
            </div>
            <div>
              <h3 className="font-medium">Compliance Report</h3>
              <p className="text-sm text-gray-500">Generate documentation</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <h2 className="mb-4 mt-8 text-xl font-bold">Recent Activity</h2>
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="p-2 rounded-full bg-blue-100">
                <Shield className="h-5 w-5 text-blue-700" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Security scan completed</p>
                  <span className="text-sm text-gray-500">Today, {new Date().toLocaleTimeString()}</span>
                </div>
                <p className="text-sm text-gray-500">
                  Weekly security scan completed with {threatData.high + threatData.medium} new vulnerabilities
                  detected.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="p-2 rounded-full bg-red-100">
                <AlertTriangle className="h-5 w-5 text-red-700" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">High severity threat detected</p>
                  <span className="text-sm text-gray-500">Yesterday, 4:15 PM</span>
                </div>
                <p className="text-sm text-gray-500">
                  Suspicious login attempt from unrecognized IP address (192.168.1.254).
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="p-2 rounded-full bg-green-100">
                <CheckCircle className="h-5 w-5 text-green-700" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Employee training completed</p>
                  <span className="text-sm text-gray-500">Yesterday, 2:30 PM</span>
                </div>
                <p className="text-sm text-gray-500">John Smith completed "Phishing Awareness" training module.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="p-2 rounded-full bg-purple-100">
                <FileCheck className="h-5 w-5 text-purple-700" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Compliance check updated</p>
                  <span className="text-sm text-gray-500">May 1, 11:20 AM</span>
                </div>
                <p className="text-sm text-gray-500">GDPR compliance status updated to 85% complete.</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => {
              toast({
                title: "Activity Log",
                description: "Full activity log would be displayed here in a real application.",
              })
            }}
          >
            View All Activity
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
