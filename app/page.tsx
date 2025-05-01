"use client"

import { Progress } from "@/components/ui/progress"

import { CardFooter } from "@/components/ui/card"

import { CardContent } from "@/components/ui/card"

import { CardDescription } from "@/components/ui/card"

import { CardTitle } from "@/components/ui/card"

import { CardHeader } from "@/components/ui/card"

import { Card } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { useState, useEffect } from "react"
import { Shield, Users, Bell, FileCheck } from "lucide-react"
import LandingPage from "@/components/landing-page"
import Dashboard from "@/components/dashboard"
import ThreatMonitoring from "@/components/threat-monitoring"
import Compliance from "@/components/compliance"
import Training from "@/components/training"
import Settings from "@/components/settings"
import { useToast } from "@/components/ui/use-toast"
import DataCollection from "@/components/onboarding/data-collection"
import SecurityScanner from "@/components/security/scanner"
import HowItWorks from "@/components/security/how-it-works"
import { loginUser, registerUser, logoutUser } from "./actions/auth"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"

export default function App() {
  const [currentPage, setCurrentPage] = useState("landing")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [onboardingStep, setOnboardingStep] = useState(0)
  const { toast } = useToast()

  // Load state from localStorage on initial render
  useEffect(() => {
    const savedPage = localStorage.getItem("currentPage")
    const savedLoginState = localStorage.getItem("isLoggedIn")
    const onboardingComplete = localStorage.getItem("onboardingComplete")

    if (savedPage) {
      setCurrentPage(savedPage)
    }

    if (savedLoginState === "true") {
      setIsLoggedIn(true)
    }

    if (savedLoginState === "true" && !onboardingComplete) {
      setShowOnboarding(true)
    }
  }, [])

  // Save state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("currentPage", currentPage)
    localStorage.setItem("isLoggedIn", isLoggedIn.toString())
  }, [currentPage, isLoggedIn])

  // Handle navigation
  const navigate = (page: string) => {
    setCurrentPage(page)

    // Auto-login when navigating to dashboard or other protected pages
    if (page !== "landing" && !isLoggedIn) {
      setIsLoggedIn(true)
    }
  }

  // Handle login
  const handleLogin = async (email?: string, password?: string) => {
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Email and password are required",
        variant: "destructive",
      })
      return
    }

    const formData = new FormData()
    formData.append("email", email)
    formData.append("password", password)

    const result = await loginUser(formData)

    if (result.success) {
      setIsLoggedIn(true)
      navigate("dashboard")
      toast({
        title: "Login successful",
        description: "Welcome back to SecureSmallBiz!",
      })

      // Check if onboarding is complete
      const onboardingComplete = localStorage.getItem("onboardingComplete")
      if (!onboardingComplete) {
        setShowOnboarding(true)
      }
    } else {
      toast({
        title: "Login failed",
        description: result.error || "Invalid email or password",
        variant: "destructive",
      })
    }
  }

  // Handle signup
  const handleSignup = async (email?: string, password?: string, company?: string) => {
    if (!email || !password || !company) {
      toast({
        title: "Error",
        description: "All fields are required",
        variant: "destructive",
      })
      return
    }

    const formData = new FormData()
    formData.append("email", email)
    formData.append("password", password)
    formData.append("company", company)
    formData.append("name", email.split("@")[0]) // Use part of email as name

    const result = await registerUser(formData)

    if (result.success) {
      setIsLoggedIn(true)
      setShowOnboarding(true)
      navigate("dashboard")
      toast({
        title: "Account created",
        description: "Welcome to SecureSmallBiz!",
      })
    } else {
      toast({
        title: "Registration failed",
        description: result.error || "Failed to create account",
        variant: "destructive",
      })
    }
  }

  // Handle logout
  const handleLogout = async () => {
    const result = await logoutUser()

    if (result.success) {
      setIsLoggedIn(false)
      navigate("landing")
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      })
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to logout",
        variant: "destructive",
      })
    }
  }

  // Handle onboarding completion
  const completeOnboarding = () => {
    localStorage.setItem("onboardingComplete", "true")
    setShowOnboarding(false)
    navigate("dashboard")
    toast({
      title: "Onboarding complete",
      description: "Your security setup is complete. Welcome to SecureSmallBiz!",
    })
  }

  // Render onboarding
  const renderOnboarding = () => {
    switch (onboardingStep) {
      case 0:
        return (
          <div className="container px-4 py-6 md:px-6 md:py-8">
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl mb-6">Welcome to SecureSmallBiz</h1>
            <p className="text-gray-500 mb-8">
              Let's set up your security profile to protect your business. This will only take a few minutes.
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              <DataCollection />
              <div className="space-y-6">
                <HowItWorks />
                <div className="flex justify-end">
                  <Button onClick={() => setOnboardingStep(1)} className="bg-blue-700 hover:bg-blue-800">
                    Continue to Security Scan
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )
      case 1:
        return (
          <div className="container px-4 py-6 md:px-6 md:py-8">
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl mb-6">Initial Security Scan</h1>
            <p className="text-gray-500 mb-8">
              Let's run an initial security scan to identify any vulnerabilities in your systems.
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              <SecurityScanner onComplete={() => setOnboardingStep(2)} />
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>What We're Scanning For</CardTitle>
                    <CardDescription>
                      Our initial security scan checks for these common vulnerabilities:
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Outdated Software</h3>
                        <p className="text-sm text-gray-500">
                          Identifying systems running outdated software with known security vulnerabilities.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Weak Passwords</h3>
                        <p className="text-sm text-gray-500">
                          Checking for weak password policies and potentially compromised credentials.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Open Network Ports</h3>
                        <p className="text-sm text-gray-500">
                          Detecting unnecessarily open network ports that could be exploited.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Insecure Configurations</h3>
                        <p className="text-sm text-gray-500">
                          Finding systems configured with insecure default settings.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="container px-4 py-6 md:px-6 md:py-8">
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl mb-6">Setup Complete!</h1>
            <p className="text-gray-500 mb-8">
              Your security profile has been set up and your initial scan is complete. You're now ready to start using
              SecureSmallBiz!
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Next Steps</CardTitle>
                  <CardDescription>Here's what you can do next to improve your security posture:</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-100 rounded-full p-1">
                      <Shield className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Review Security Dashboard</h3>
                      <p className="text-sm text-gray-500">
                        Check your security score and address any identified vulnerabilities.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-100 rounded-full p-1">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Invite Team Members</h3>
                      <p className="text-sm text-gray-500">Add your team members to collaborate on security tasks.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-100 rounded-full p-1">
                      <FileCheck className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Set Up Compliance Checks</h3>
                      <p className="text-sm text-gray-500">
                        Configure compliance frameworks relevant to your industry.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-100 rounded-full p-1">
                      <Bell className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Configure Notifications</h3>
                      <p className="text-sm text-gray-500">Set up how you want to be notified about security events.</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={completeOnboarding} className="w-full bg-blue-700 hover:bg-blue-800">
                    Go to Dashboard
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Your Security Summary</CardTitle>
                  <CardDescription>Here's a summary of your initial security assessment:</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Security Score</span>
                    <span className="text-sm text-gray-500">78/100</span>
                  </div>
                  <Progress value={78} className="h-2" />
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold">5</div>
                      <div className="text-xs text-gray-500">Assets Scanned</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold">3</div>
                      <div className="text-xs text-gray-500">Vulnerabilities</div>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-red-600">1</div>
                      <div className="text-xs text-gray-500">High Severity</div>
                    </div>
                    <div className="bg-amber-50 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-amber-600">2</div>
                      <div className="text-xs text-gray-500">Medium Severity</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  // Render the current page
  const renderPage = () => {
    if (showOnboarding) {
      return renderOnboarding()
    }

    switch (currentPage) {
      case "landing":
        return <LandingPage onLogin={handleLogin} onSignup={handleSignup} onNavigate={navigate} />
      case "dashboard":
        return <Dashboard onNavigate={navigate} />
      case "threats":
        return <ThreatMonitoring onNavigate={navigate} />
      case "compliance":
        return <Compliance onNavigate={navigate} />
      case "training":
        return <Training onNavigate={navigate} />
      case "settings":
        return <Settings onNavigate={navigate} />
      case "how-it-works":
        return (
          <div className="container px-4 py-6 md:px-6 md:py-8">
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl mb-6">How SecureSmallBiz Works</h1>
            <HowItWorks />
          </div>
        )
      case "login":
        return <LandingPage onLogin={handleLogin} onSignup={handleSignup} onNavigate={navigate} activeTab="login" />
      case "signup":
        return <LandingPage onLogin={handleLogin} onSignup={handleSignup} onNavigate={navigate} activeTab="signup" />
      default:
        return <LandingPage onLogin={handleLogin} onSignup={handleSignup} onNavigate={navigate} />
    }
  }

  // Render the app
  return (
    <div className="flex min-h-screen flex-col">
      {isLoggedIn && (
        <div className="flex-none">
          <Navbar isLoggedIn={isLoggedIn} currentPage={currentPage} onNavigate={navigate} onLogout={handleLogout} />
        </div>
      )}
      <div className="flex-grow">{renderPage()}</div>
      {(currentPage === "landing" || currentPage === "login" || currentPage === "signup") && (
        <div className="flex-none">
          <Footer onNavigate={navigate} />
        </div>
      )}
    </div>
  )
}
