"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, Shield, Search, ChevronDown, Download, Eye, CheckCircle, XCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"

interface ThreatMonitoringProps {
  onNavigate: (page: string) => void
}

// Mock threat data
const initialThreats = [
  {
    id: 1,
    type: "Phishing Attempt",
    severity: "High",
    source: "Email",
    timestamp: "2025-05-02T09:30:00",
    status: "Active",
    description: "Suspicious email with malicious attachment detected.",
  },
  {
    id: 2,
    type: "Suspicious Login",
    severity: "High",
    source: "Authentication",
    timestamp: "2025-05-01T16:45:00",
    status: "Active",
    description: "Login attempt from unrecognized IP address (203.0.113.42).",
  },
  {
    id: 3,
    type: "Malware Detected",
    severity: "Medium",
    source: "Endpoint",
    timestamp: "2025-05-01T11:20:00",
    status: "Resolved",
    description: "Potentially unwanted program detected on workstation WS-003.",
  },
  {
    id: 4,
    type: "Outdated Software",
    severity: "Medium",
    source: "Vulnerability Scan",
    timestamp: "2025-04-30T14:15:00",
    status: "Active",
    description: "Critical security updates pending for 3 applications.",
  },
  {
    id: 5,
    type: "Weak Password",
    severity: "Medium",
    source: "Security Assessment",
    timestamp: "2025-04-30T10:05:00",
    status: "Active",
    description: "User accounts with weak passwords detected.",
  },
  {
    id: 6,
    type: "Unusual Network Traffic",
    severity: "Low",
    source: "Network Monitor",
    timestamp: "2025-04-29T19:50:00",
    status: "Investigating",
    description: "Unusual outbound traffic detected to unknown IP address.",
  },
  {
    id: 7,
    type: "Insecure File Sharing",
    severity: "Low",
    source: "Data Protection",
    timestamp: "2025-04-29T13:25:00",
    status: "Resolved",
    description: "Sensitive files shared with external email addresses.",
  },
  {
    id: 8,
    type: "Firewall Misconfiguration",
    severity: "Low",
    source: "Network Security",
    timestamp: "2025-04-28T15:40:00",
    status: "Resolved",
    description: "Firewall rule allowing unnecessary inbound traffic detected.",
  },
]

export default function ThreatMonitoring({ onNavigate }: ThreatMonitoringProps) {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [severityFilter, setSeverityFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [sortBy, setSortBy] = useState("timestamp")
  const [sortOrder, setSortOrder] = useState("desc")
  const [threats, setThreats] = useState(initialThreats)

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedThreats = localStorage.getItem("monitoringThreats")
    if (savedThreats) setThreats(JSON.parse(savedThreats))
  }, [])

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("monitoringThreats", JSON.stringify(threats))
  }, [threats])

  // Filter and sort threats
  const filteredThreats = threats
    .filter((threat) => {
      const matchesSearch =
        searchQuery === "" ||
        threat.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        threat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        threat.source.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesSeverity = severityFilter === "All" || threat.severity === severityFilter
      const matchesStatus = statusFilter === "All" || threat.status === statusFilter

      return matchesSearch && matchesSeverity && matchesStatus
    })
    .sort((a, b) => {
      if (sortBy === "timestamp") {
        return sortOrder === "desc"
          ? new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          : new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      } else if (sortBy === "severity") {
        const severityOrder = { High: 3, Medium: 2, Low: 1 }
        return sortOrder === "desc"
          ? severityOrder[b.severity as keyof typeof severityOrder] -
              severityOrder[a.severity as keyof typeof severityOrder]
          : severityOrder[a.severity as keyof typeof severityOrder] -
              severityOrder[b.severity as keyof typeof severityOrder]
      }
      return 0
    })

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  // Get severity badge variant
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "High":
        return <Badge variant="destructive">{severity}</Badge>
      case "Medium":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            {severity}
          </Badge>
        )
      case "Low":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            {severity}
          </Badge>
        )
      default:
        return <Badge variant="outline">{severity}</Badge>
    }
  }

  // Get status badge variant
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

  // Handle threat status change
  const handleStatusChange = (id: number, newStatus: string) => {
    setThreats(threats.map((threat) => (threat.id === id ? { ...threat, status: newStatus } : threat)))

    toast({
      title: `Threat ${newStatus}`,
      description: `Threat #${id} has been marked as ${newStatus}.`,
    })
  }

  // Handle export
  const handleExport = () => {
    toast({
      title: "Export Initiated",
      description: "Threat report is being generated and will download shortly.",
    })

    // In a real app, this would generate and download a CSV/PDF
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Threat report has been downloaded.",
      })
    }, 1500)
  }

  // Count threats by status
  const activeThreats = threats.filter((t) => t.status === "Active").length
  const resolvedThreats = threats.filter((t) => t.status === "Resolved").length

  return (
    <div className="container px-4 py-6 md:px-6 md:py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">Threat Monitoring</h1>
        <p className="text-gray-500">Monitor and manage security threats to your business.</p>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Threats</p>
                <h3 className="text-2xl font-bold text-red-600">{activeThreats}</h3>
              </div>
              <div className="p-3 rounded-full bg-red-100">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Resolved (30 days)</p>
                <h3 className="text-2xl font-bold text-green-600">{resolvedThreats}</h3>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Last Scan</p>
                <h3 className="text-2xl font-bold text-blue-600">{Math.floor(Math.random() * 3) + 1}h ago</h3>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center space-x-2">
              <Search className="h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search threats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="flex items-center space-x-2">
                <Select value={severityFilter} onValueChange={setSeverityFilter}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Severities</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Statuses</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Investigating">Investigating</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" className="flex items-center gap-1" onClick={handleExport}>
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Threats Table */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Threat List</CardTitle>
          <CardDescription>
            Showing {filteredThreats.length} of {threats.length} threats
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-1 p-0 font-medium"
                    onClick={() => {
                      setSortBy("timestamp")
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                    }}
                  >
                    Time
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        sortBy === "timestamp" && sortOrder === "asc" ? "rotate-180" : ""
                      }`}
                    />
                  </Button>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredThreats.map((threat) => (
                <TableRow key={threat.id}>
                  <TableCell className="font-medium">{threat.type}</TableCell>
                  <TableCell>{getSeverityBadge(threat.severity)}</TableCell>
                  <TableCell>{threat.source}</TableCell>
                  <TableCell>{formatDate(threat.timestamp)}</TableCell>
                  <TableCell>{getStatusBadge(threat.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Actions <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="flex items-center"
                          onClick={() => {
                            toast({
                              title: "Threat Details",
                              description: threat.description,
                            })
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        {threat.status !== "Resolved" && (
                          <DropdownMenuItem
                            className="flex items-center"
                            onClick={() => handleStatusChange(threat.id, "Resolved")}
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Mark as Resolved
                          </DropdownMenuItem>
                        )}
                        {threat.status === "Active" && (
                          <DropdownMenuItem
                            className="flex items-center"
                            onClick={() => handleStatusChange(threat.id, "Investigating")}
                          >
                            <Shield className="mr-2 h-4 w-4" />
                            Start Investigation
                          </DropdownMenuItem>
                        )}
                        {threat.status === "Resolved" && (
                          <DropdownMenuItem
                            className="flex items-center"
                            onClick={() => handleStatusChange(threat.id, "Active")}
                          >
                            <XCircle className="mr-2 h-4 w-4" />
                            Reopen
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filteredThreats.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No threats found matching your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
