"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { User, Lock, Bell, Link, Shield, Save, Mail, Phone, Building, Globe, Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"

interface SettingsProps {
  onNavigate: (page: string) => void
}

export default function Settings({ onNavigate }: SettingsProps) {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("profile")
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Mock user data
  const [userData, setUserData] = useState({
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    company: "Smith Enterprises",
    role: "Owner",
    website: "www.smithenterprises.com",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  })

  // Mock notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    smsAlerts: false,
    weeklyReports: true,
    securityUpdates: true,
    marketingEmails: false,
  })

  // Mock integration settings
  const [integrations, setIntegrations] = useState([
    {
      id: "slack",
      name: "Slack",
      connected: true,
      icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/slack.svg",
    },
    {
      id: "google",
      name: "Google Workspace",
      connected: true,
      icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/google.svg",
    },
    {
      id: "microsoft",
      name: "Microsoft 365",
      connected: false,
      icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/microsoft.svg",
    },
    {
      id: "quickbooks",
      name: "QuickBooks",
      connected: false,
      icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/intuit.svg",
    },
  ])

  // Password fields
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedUserData = localStorage.getItem("userData")
    const savedNotificationSettings = localStorage.getItem("notificationSettings")
    const savedIntegrations = localStorage.getItem("integrations")

    if (savedUserData) setUserData(JSON.parse(savedUserData))
    if (savedNotificationSettings) setNotificationSettings(JSON.parse(savedNotificationSettings))
    if (savedIntegrations) setIntegrations(JSON.parse(savedIntegrations))
  }, [])

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData))
    localStorage.setItem("notificationSettings", JSON.stringify(notificationSettings))
    localStorage.setItem("integrations", JSON.stringify(integrations))
  }, [userData, notificationSettings, integrations])

  // Handle form submission
  const handleSave = () => {
    // Simulate saving
    setSaveSuccess(true)
    toast({
      title: "Settings saved",
      description: "Your changes have been saved successfully.",
    })
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  // Handle password update
  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      })
      return
    }

    if (passwordData.newPassword.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      })
      return
    }

    // Simulate password update
    toast({
      title: "Password updated",
      description: "Your password has been updated successfully.",
    })

    // Clear password fields
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  // Toggle integration connection
  const toggleIntegration = (id: string) => {
    setIntegrations(
      integrations.map((integration) =>
        integration.id === id ? { ...integration, connected: !integration.connected } : integration,
      ),
    )

    toast({
      title: integrations.find((i) => i.id === id)?.connected ? "Integration disconnected" : "Integration connected",
      description: `${integrations.find((i) => i.id === id)?.name} has been ${integrations.find((i) => i.id === id)?.connected ? "disconnected" : "connected"} successfully.`,
    })
  }

  return (
    <div className="container px-4 py-6 md:px-6 md:py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">Settings</h1>
        <p className="text-gray-500">Manage your account and application preferences.</p>
      </div>

      <Tabs defaultValue="profile" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal and company information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col items-center space-y-2">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={userData.avatar || "/placeholder.svg"} alt="Profile" />
                      <AvatarFallback className="text-2xl">
                        {userData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        toast({
                          title: "Photo Upload",
                          description: "Photo upload functionality would be implemented here.",
                        })
                      }}
                    >
                      Change Photo
                    </Button>
                  </div>
                  <div className="flex-1 grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-gray-500 mr-2" />
                        <Input
                          id="name"
                          value={userData.name}
                          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-gray-500 mr-2" />
                        <Input
                          id="email"
                          type="email"
                          value={userData.email}
                          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-gray-500 mr-2" />
                        <Input
                          id="phone"
                          value={userData.phone}
                          onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="company">Company Name</Label>
                    <div className="flex items-center">
                      <Building className="h-4 w-4 text-gray-500 mr-2" />
                      <Input
                        id="company"
                        value={userData.company}
                        onChange={(e) => setUserData({ ...userData, company: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="role">Your Role</Label>
                    <Select value={userData.role} onValueChange={(value) => setUserData({ ...userData, role: value })}>
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Owner">Owner</SelectItem>
                        <SelectItem value="CEO">CEO</SelectItem>
                        <SelectItem value="IT Manager">IT Manager</SelectItem>
                        <SelectItem value="Security Officer">Security Officer</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="website">Website</Label>
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 text-gray-500 mr-2" />
                      <Input
                        id="website"
                        value={userData.website}
                        onChange={(e) => setUserData({ ...userData, website: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-blue-700 hover:bg-blue-800" onClick={handleSave}>
                  {saveSuccess ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Saved
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>Update your password.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handlePasswordUpdate}>
                  <div className="grid gap-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                      id="current-password"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid gap-2 mt-4">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid gap-2 mt-4">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 mt-4">
                    <Lock className="mr-2 h-4 w-4" />
                    Update Password
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your security preferences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-500">Add an extra layer of security to your account.</p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      toast({
                        title: "Two-Factor Authentication",
                        description: "2FA setup would be implemented here.",
                      })
                    }}
                  >
                    Setup
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Session Management</Label>
                    <p className="text-sm text-gray-500">Manage your active sessions and devices.</p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      toast({
                        title: "Session Management",
                        description: "Active sessions would be displayed here.",
                      })
                    }}
                  >
                    View
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Login History</Label>
                    <p className="text-sm text-gray-500">View your recent login activity.</p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      toast({
                        title: "Login History",
                        description: "Recent login activity would be displayed here.",
                      })
                    }}
                  >
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how and when you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Security Alerts</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-alerts">Email Alerts</Label>
                      <p className="text-sm text-gray-500">Receive security alerts via email.</p>
                    </div>
                    <Switch
                      id="email-alerts"
                      checked={notificationSettings.emailAlerts}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, emailAlerts: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sms-alerts">SMS Alerts</Label>
                      <p className="text-sm text-gray-500">Receive security alerts via text message.</p>
                    </div>
                    <Switch
                      id="sms-alerts"
                      checked={notificationSettings.smsAlerts}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, smsAlerts: checked })
                      }
                    />
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Reports and Updates</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="weekly-reports">Weekly Reports</Label>
                      <p className="text-sm text-gray-500">Receive a weekly summary of your security status.</p>
                    </div>
                    <Switch
                      id="weekly-reports"
                      checked={notificationSettings.weeklyReports}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, weeklyReports: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="security-updates">Security Updates</Label>
                      <p className="text-sm text-gray-500">
                        Receive notifications about new security features and updates.
                      </p>
                    </div>
                    <Switch
                      id="security-updates"
                      checked={notificationSettings.securityUpdates}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          securityUpdates: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="marketing-emails">Marketing Emails</Label>
                      <p className="text-sm text-gray-500">Receive promotional emails and special offers.</p>
                    </div>
                    <Switch
                      id="marketing-emails"
                      checked={notificationSettings.marketingEmails}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          marketingEmails: checked,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-blue-700 hover:bg-blue-800" onClick={handleSave}>
                {saveSuccess ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Saved
                  </>
                ) : (
                  <>
                    <Bell className="mr-2 h-4 w-4" />
                    Save Notification Preferences
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Connected Services</CardTitle>
              <CardDescription>Manage integrations with your business tools and services.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {integrations.map((integration) => (
                <div key={integration.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-gray-100 p-2">
                      <img
                        src={integration.icon || "/placeholder.svg"}
                        alt={integration.name}
                        className="h-full w-full"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{integration.name}</h3>
                      <p className="text-sm text-gray-500">{integration.connected ? "Connected" : "Not connected"}</p>
                    </div>
                  </div>
                  <Button
                    variant={integration.connected ? "outline" : "default"}
                    className={integration.connected ? "" : "bg-blue-700 hover:bg-blue-800"}
                    onClick={() => toggleIntegration(integration.id)}
                  >
                    {integration.connected ? "Disconnect" : "Connect"}
                  </Button>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  toast({
                    title: "Add Integration",
                    description: "Integration marketplace would be displayed here.",
                  })
                }}
              >
                <Link className="mr-2 h-4 w-4" />
                Add New Integration
              </Button>
            </CardFooter>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>API Access</CardTitle>
              <CardDescription>Manage API keys for programmatic access to your data.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <div className="flex items-center space-x-2">
                  <Input id="api-key" value="••••••••••••••••••••••••••••••" readOnly className="font-mono" />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      toast({
                        title: "API Key",
                        description: "API key would be displayed here.",
                      })
                    }}
                  >
                    Show
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      toast({
                        title: "API Key Copied",
                        description: "API key has been copied to clipboard.",
                      })
                    }}
                  >
                    Copy
                  </Button>
                </div>
                <p className="text-sm text-gray-500">Last used: May 1, 2025 at 10:45 AM</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                className="text-red-600 hover:text-red-700"
                onClick={() => {
                  toast({
                    title: "API Key Revoked",
                    description: "Your API key has been revoked.",
                  })
                }}
              >
                Revoke Key
              </Button>
              <Button
                className="bg-blue-700 hover:bg-blue-800"
                onClick={() => {
                  toast({
                    title: "New API Key Generated",
                    description: "Your new API key has been generated.",
                  })
                }}
              >
                <Shield className="mr-2 h-4 w-4" />
                Generate New Key
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
