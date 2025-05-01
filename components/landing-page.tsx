"use client"

import type React from "react"

import { useState } from "react"
import { Shield, Bell, FileCheck, Users, Mail, Lock, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface LandingPageProps {
  onLogin: (email?: string, password?: string) => void
  onSignup: (email?: string, password?: string, company?: string) => void
  onNavigate: (page: string) => void
  activeTab?: string
}

export default function LandingPage({ onLogin, onSignup, onNavigate, activeTab = "hero" }: LandingPageProps) {
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [signupData, setSignupData] = useState({ email: "", password: "", company: "" })
  const [newsletterEmail, setNewsletterEmail] = useState("")
  const [activeSection, setActiveSection] = useState(activeTab)

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin(loginData.email, loginData.password)
  }

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSignup(signupData.email, signupData.password, signupData.company)
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Thank you for subscribing with ${newsletterEmail}!`)
    setNewsletterEmail("")
  }

  if (activeSection === "login") {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-16rem)] p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-2">
                <Shield className="h-8 w-8 text-blue-700" />
                <span className="text-2xl font-bold text-blue-900">SecureSmallBiz</span>
              </div>
            </div>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login" onClick={() => setActiveSection("login")}>
                  Login
                </TabsTrigger>
                <TabsTrigger value="signup" onClick={() => setActiveSection("signup")}>
                  Sign Up
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        className="pl-10"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-sm"
                        onClick={() => alert("Reset password functionality would be implemented here")}
                      >
                        Forgot password?
                      </Button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-800">
                    Log In
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            <div className="mt-6 text-center">
              <Button variant="link" onClick={() => setActiveSection("hero")}>
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (activeSection === "signup") {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-16rem)] p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-2">
                <Shield className="h-8 w-8 text-blue-700" />
                <span className="text-2xl font-bold text-blue-900">SecureSmallBiz</span>
              </div>
            </div>
            <Tabs defaultValue="signup" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login" onClick={() => setActiveSection("login")}>
                  Login
                </TabsTrigger>
                <TabsTrigger value="signup" onClick={() => setActiveSection("signup")}>
                  Sign Up
                </TabsTrigger>
              </TabsList>
              <TabsContent value="signup">
                <form onSubmit={handleSignupSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="your@email.com"
                        className="pl-10"
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="company"
                        placeholder="Your Company"
                        className="pl-10"
                        value={signupData.company}
                        onChange={(e) => setSignupData({ ...signupData, company: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-800">
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            <div className="mt-6 text-center">
              <Button variant="link" onClick={() => setActiveSection("hero")}>
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-blue-50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-blue-900">
                  Protect Your Small Business with Affordable Cybersecurity
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl">
                  AI-powered security solutions designed specifically for small businesses. No technical expertise
                  required.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button className="bg-blue-700 hover:bg-blue-800" size="lg" onClick={() => setActiveSection("signup")}>
                  Start Free Trial
                </Button>
                <Button variant="outline" size="lg" onClick={() => setActiveSection("login")}>
                  Log In
                </Button>
              </div>
              <p className="text-sm text-gray-500">No credit card required. 14-day free trial.</p>
            </div>
            <div className="flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Cybersecurity Dashboard"
                width={500}
                height={500}
                className="rounded-lg object-cover shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-900">
                Comprehensive Security for Small Businesses
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl">
                Our all-in-one platform provides everything you need to protect your business from cyber threats.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-2 border-blue-100 hover:border-blue-200 transition-all">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-blue-100">
                  <Shield className="h-8 w-8 text-blue-700" />
                </div>
                <h3 className="text-xl font-bold text-blue-900">Automated Security Assessments</h3>
                <p className="text-gray-500">
                  Regular scans of your systems to identify vulnerabilities before they can be exploited.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 border-blue-100 hover:border-blue-200 transition-all">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-blue-100">
                  <Bell className="h-8 w-8 text-blue-700" />
                </div>
                <h3 className="text-xl font-bold text-blue-900">Real-Time Threat Monitoring</h3>
                <p className="text-gray-500">
                  24/7 monitoring of your network and systems with instant alerts for suspicious activity.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 border-blue-100 hover:border-blue-200 transition-all">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-blue-100">
                  <Users className="h-8 w-8 text-blue-700" />
                </div>
                <h3 className="text-xl font-bold text-blue-900">Employee Training</h3>
                <p className="text-gray-500">
                  Interactive cybersecurity training modules to educate your team on best practices.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 border-blue-100 hover:border-blue-200 transition-all">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-blue-100">
                  <FileCheck className="h-8 w-8 text-blue-700" />
                </div>
                <h3 className="text-xl font-bold text-blue-900">Compliance Management</h3>
                <p className="text-gray-500">
                  Tools to help you meet industry regulations and data protection requirements.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-900">
                Trusted by 1,000+ Small Businesses
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl">
                See what our customers have to say about SecureSmallBiz.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-yellow-400"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-500">
                    "SecureSmallBiz has been a game-changer for our dental practice. We now have peace of mind knowing
                    our patient data is protected."
                  </p>
                  <div className="flex items-center space-x-4">
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                      alt="Dr. Sarah Johnson"
                      className="rounded-full w-10 h-10 object-cover"
                    />
                    <div>
                      <p className="font-medium">Dr. Sarah Johnson</p>
                      <p className="text-sm text-gray-500">Bright Smile Dental</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-yellow-400"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-500">
                    "As a small law firm, we needed affordable security that meets compliance requirements.
                    SecureSmallBiz delivers exactly that."
                  </p>
                  <div className="flex items-center space-x-4">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                      alt="Michael Rodriguez"
                      className="rounded-full w-10 h-10 object-cover"
                    />
                    <div>
                      <p className="font-medium">Michael Rodriguez</p>
                      <p className="text-sm text-gray-500">Rodriguez Legal Group</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-yellow-400"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-500">
                    "The employee training modules have significantly improved our team's security awareness. Worth
                    every penny!"
                  </p>
                  <div className="flex items-center space-x-4">
                    <img
                      src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                      alt="Jennifer Lee"
                      className="rounded-full w-10 h-10 object-cover"
                    />
                    <div>
                      <p className="font-medium">Jennifer Lee</p>
                      <p className="text-sm text-gray-500">Cornerstone Retail</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-900 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to secure your business?
                </h2>
                <p className="max-w-[600px] text-blue-100 md:text-xl">
                  Join thousands of small businesses that trust SecureSmallBiz for their cybersecurity needs.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  className="bg-green-500 hover:bg-green-600 text-white"
                  size="lg"
                  onClick={() => setActiveSection("signup")}
                >
                  Start Free Trial
                </Button>
                <Button
                  variant="outline"
                  className="text-white border-white hover:bg-blue-800"
                  size="lg"
                  onClick={() => alert("Demo scheduling would be implemented here")}
                >
                  Schedule Demo
                </Button>
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="rounded-lg bg-blue-800 p-6">
                <h3 className="text-xl font-bold mb-4">Subscribe to our newsletter</h3>
                <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="bg-blue-700 border-blue-600 text-white placeholder:text-blue-300"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      required
                    />
                    <Button type="submit" className="bg-green-500 hover:bg-green-600 whitespace-nowrap">
                      Subscribe
                    </Button>
                  </div>
                  <p className="text-sm text-blue-300">
                    Get the latest cybersecurity tips and updates for small businesses.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
