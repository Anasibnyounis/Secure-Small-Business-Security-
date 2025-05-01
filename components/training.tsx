"use client"

import { useState, useEffect } from "react"
import { Users, BookOpen, Award, Clock, ChevronRight, Search, Play, Download, UserPlus, BarChart3 } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"

interface TrainingProps {
  onNavigate: (page: string) => void
}

// Mock training modules data with real images
const trainingModules = [
  {
    id: 1,
    title: "Phishing Awareness",
    description: "Learn to identify and avoid phishing attempts.",
    duration: "30 min",
    level: "Beginner",
    completionRate: 85,
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 2,
    title: "Password Security",
    description: "Best practices for creating and managing secure passwords.",
    duration: "20 min",
    level: "Beginner",
    completionRate: 92,
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 3,
    title: "Data Protection Basics",
    description: "Understanding how to protect sensitive data.",
    duration: "45 min",
    level: "Intermediate",
    completionRate: 68,
    image:
      "https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 4,
    title: "Mobile Device Security",
    description: "Securing smartphones and tablets in the workplace.",
    duration: "25 min",
    level: "Beginner",
    completionRate: 75,
    image:
      "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 5,
    title: "Social Engineering Defense",
    description: "Recognizing and preventing social engineering attacks.",
    duration: "40 min",
    level: "Intermediate",
    completionRate: 62,
    image:
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 6,
    title: "Secure Remote Work",
    description: "Security best practices for working remotely.",
    duration: "35 min",
    level: "Beginner",
    completionRate: 78,
    image:
      "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
]

// Mock employee data with real images
const employees = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    department: "Marketing",
    completedModules: 3,
    inProgressModules: 1,
    totalModules: 5,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    department: "Finance",
    completedModules: 5,
    inProgressModules: 0,
    totalModules: 5,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    department: "IT",
    completedModules: 4,
    inProgressModules: 1,
    totalModules: 5,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    department: "HR",
    completedModules: 2,
    inProgressModules: 2,
    totalModules: 5,
    avatar:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david.wilson@example.com",
    department: "Sales",
    completedModules: 1,
    inProgressModules: 1,
    totalModules: 5,
    avatar:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
  },
]

export default function Training({ onNavigate }: TrainingProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("modules")
  const [moduleData, setModuleData] = useState(trainingModules)
  const [employeeData, setEmployeeData] = useState(employees)
  const { toast } = useToast()

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedModules = localStorage.getItem("trainingModules")
    const savedEmployees = localStorage.getItem("trainingEmployees")

    if (savedModules) setModuleData(JSON.parse(savedModules))
    if (savedEmployees) setEmployeeData(JSON.parse(savedEmployees))
  }, [])

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("trainingModules", JSON.stringify(moduleData))
    localStorage.setItem("trainingEmployees", JSON.stringify(employeeData))
  }, [moduleData, employeeData])

  // Filter modules based on search
  const filteredModules = moduleData.filter(
    (module) =>
      module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.level.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Filter employees based on search
  const filteredEmployees = employeeData.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Handle starting a training module
  const handleStartModule = (moduleId: number) => {
    toast({
      title: "Training module started",
      description: `You've started the ${moduleData.find((m) => m.id === moduleId)?.title} module.`,
    })
  }

  // Handle assigning training
  const handleAssignTraining = () => {
    toast({
      title: "Training assigned",
      description: "Training modules have been assigned to selected employees.",
    })
  }

  return (
    <div className="container px-4 py-6 md:px-6 md:py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">Employee Training</h1>
        <p className="text-gray-500">Manage cybersecurity training for your team.</p>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-6 md:grid-cols-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Employees</p>
                <h3 className="text-2xl font-bold text-gray-900">{employeeData.length}</h3>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <Users className="h-6 w-6 text-blue-700" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Training Modules</p>
                <h3 className="text-2xl font-bold text-gray-900">{moduleData.length}</h3>
              </div>
              <div className="p-3 rounded-full bg-purple-100">
                <BookOpen className="h-6 w-6 text-purple-700" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Completion Rate</p>
                <h3 className="text-2xl font-bold text-green-700">76%</h3>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <Award className="h-6 w-6 text-green-700" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Avg. Completion Time</p>
                <h3 className="text-2xl font-bold text-orange-700">28m</h3>
              </div>
              <div className="p-3 rounded-full bg-orange-100">
                <Clock className="h-6 w-6 text-orange-700" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <Search className="h-4 w-4 text-gray-500" />
          <Input
            placeholder={`Search ${activeTab === "modules" ? "modules" : "employees"}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-80"
          />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button className="bg-blue-700 hover:bg-blue-800" onClick={handleAssignTraining}>
            <UserPlus className="mr-2 h-4 w-4" />
            Assign Training
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              toast({
                title: "Reports",
                description: "Training reports would be displayed here in a real application.",
              })
            }}
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            View Reports
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="modules" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="modules">Training Modules</TabsTrigger>
          <TabsTrigger value="employees">Employees</TabsTrigger>
        </TabsList>

        {/* Training Modules Tab */}
        <TabsContent value="modules">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredModules.map((module) => (
              <Card key={module.id} className="overflow-hidden">
                <div className="aspect-video bg-gray-100">
                  <img
                    src={module.image || "/placeholder.svg"}
                    alt={module.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{module.title}</CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-500">{module.duration}</span>
                    </div>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800">
                      {module.level}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Completion Rate</span>
                      <span className="text-sm font-medium">{module.completionRate}%</span>
                    </div>
                    <Progress value={module.completionRate} className="h-1" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      toast({
                        title: "Materials Downloaded",
                        description: `Training materials for ${module.title} have been downloaded.`,
                      })
                    }}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Materials
                  </Button>
                  <Button
                    size="sm"
                    className="bg-blue-700 hover:bg-blue-800"
                    onClick={() => handleStartModule(module.id)}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Start Module
                  </Button>
                </CardFooter>
              </Card>
            ))}
            {filteredModules.length === 0 && (
              <div className="col-span-full flex justify-center py-12 text-gray-500">
                No training modules found matching your search.
              </div>
            )}
          </div>
        </TabsContent>

        {/* Employees Tab */}
        <TabsContent value="employees">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <img
                            src={employee.avatar || "/placeholder.svg"}
                            alt={employee.name}
                            className="rounded-full w-10 h-10 object-cover"
                          />
                          <div>
                            <p className="font-medium">{employee.name}</p>
                            <p className="text-sm text-gray-500">{employee.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                              {employee.completedModules}/{employee.totalModules} completed
                            </span>
                            <span className="text-sm font-medium">
                              {Math.round((employee.completedModules / employee.totalModules) * 100)}%
                            </span>
                          </div>
                          <Progress value={(employee.completedModules / employee.totalModules) * 100} className="h-1" />
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            toast({
                              title: "Employee Details",
                              description: `Viewing training details for ${employee.name}.`,
                            })
                          }}
                        >
                          View Details
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredEmployees.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                        No employees found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
