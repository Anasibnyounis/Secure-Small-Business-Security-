"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { addAsset } from "@/app/actions/assets"
import { useToast } from "@/components/ui/use-toast"
import { Network, Cloud, Database } from "lucide-react"

export default function DataCollection() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("manual")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleManualSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const result = await addAsset(formData)

    if (result.success) {
      toast({
        title: "Asset added",
        description: "Your asset has been added successfully.",
      })
      event.currentTarget.reset()
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to add asset",
        variant: "destructive",
      })
    }

    setIsSubmitting(false)
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // In a real app, this would parse the CSV/Excel file
    toast({
      title: "File uploaded",
      description: "Your file is being processed. Assets will be added shortly.",
    })
  }

  const handleNetworkScan = async () => {
    setIsSubmitting(true)

    // In a real app, this would trigger a network scan
    toast({
      title: "Network scan initiated",
      description: "Scanning your network for devices. This may take a few minutes.",
    })

    // Simulate scan completion
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Network scan complete",
        description: "5 new devices were discovered and added to your assets.",
      })
    }, 3000)
  }

  const handleCloudConnect = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    // In a real app, this would connect to cloud provider API
    toast({
      title: "Cloud connection initiated",
      description: "Connecting to your cloud provider. This may take a few moments.",
    })

    // Simulate connection completion
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Cloud connection complete",
        description: "3 cloud resources were discovered and added to your assets.",
      })
    }, 3000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Assets to Monitor</CardTitle>
        <CardDescription>
          Add your business assets to be monitored for security threats. The more information you provide, the better we
          can protect your business.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="manual" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
            <TabsTrigger value="file">File Upload</TabsTrigger>
            <TabsTrigger value="network">Network Scan</TabsTrigger>
            <TabsTrigger value="cloud">Cloud Connect</TabsTrigger>
          </TabsList>

          <TabsContent value="manual">
            <form onSubmit={handleManualSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Asset Name</Label>
                  <Input id="name" name="name" placeholder="Web Server" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Asset Type</Label>
                  <Select name="type" defaultValue="server">
                    <SelectTrigger>
                      <SelectValue placeholder="Select asset type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="server">Server</SelectItem>
                      <SelectItem value="workstation">Workstation</SelectItem>
                      <SelectItem value="mobile">Mobile Device</SelectItem>
                      <SelectItem value="network">Network Device</SelectItem>
                      <SelectItem value="cloud">Cloud Resource</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ipAddress">IP Address</Label>
                  <Input id="ipAddress" name="ipAddress" placeholder="192.168.1.1" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="macAddress">MAC Address</Label>
                  <Input id="macAddress" name="macAddress" placeholder="00:1A:2B:3C:4D:5E" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="operatingSystem">Operating System</Label>
                  <Input id="operatingSystem" name="operatingSystem" placeholder="Windows Server 2022" />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Adding Asset..." : "Add Asset"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="file">
            <div className="space-y-4 mt-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Database className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-2">
                  <Label htmlFor="file-upload" className="cursor-pointer text-blue-600 hover:text-blue-500">
                    Upload a CSV or Excel file
                  </Label>
                  <Input
                    id="file-upload"
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">CSV or Excel with columns: name, type, ipAddress, etc.</p>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  // Download template
                  toast({
                    title: "Template downloaded",
                    description: "Asset import template has been downloaded.",
                  })
                }}
              >
                Download Template
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="network">
            <div className="space-y-4 mt-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <Network className="h-8 w-8 text-blue-600 mr-3" />
                  <div>
                    <h3 className="font-medium">Network Discovery</h3>
                    <p className="text-sm text-gray-500">
                      Automatically scan your network to discover devices and add them as assets.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="network-range">IP Range (optional)</Label>
                <Input id="network-range" placeholder="192.168.1.0/24" />
              </div>
              <Button onClick={handleNetworkScan} className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Scanning Network..." : "Start Network Scan"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="cloud">
            <form onSubmit={handleCloudConnect} className="space-y-4 mt-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <Cloud className="h-8 w-8 text-blue-600 mr-3" />
                  <div>
                    <h3 className="font-medium">Cloud Integration</h3>
                    <p className="text-sm text-gray-500">
                      Connect to your cloud provider to automatically discover and monitor cloud resources.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cloud-provider">Cloud Provider</Label>
                <Select defaultValue="aws">
                  <SelectTrigger>
                    <SelectValue placeholder="Select cloud provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aws">Amazon Web Services (AWS)</SelectItem>
                    <SelectItem value="azure">Microsoft Azure</SelectItem>
                    <SelectItem value="gcp">Google Cloud Platform</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key / Access Key</Label>
                <Input id="api-key" type="password" placeholder="Enter your API key" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="api-secret">API Secret / Access Secret</Label>
                <Input id="api-secret" type="password" placeholder="Enter your API secret" />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Connecting..." : "Connect Cloud Provider"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <p className="text-sm text-gray-500">
          Your asset information is securely stored and only used for security monitoring purposes.
        </p>
      </CardFooter>
    </Card>
  )
}
