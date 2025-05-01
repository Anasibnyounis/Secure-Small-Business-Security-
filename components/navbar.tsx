"use client"

import { useState } from "react"
import { Menu, X, Shield, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface NavbarProps {
  isLoggedIn: boolean
  currentPage: string
  onNavigate: (page: string) => void
  onLogout: () => void
}

export default function Navbar({ isLoggedIn, currentPage, onNavigate, onLogout }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2" onClick={() => onNavigate("landing")} role="button" tabIndex={0}>
          <Shield className="h-6 w-6 text-blue-700" />
          <span className="text-xl font-bold text-blue-900">SecureSmallBiz</span>
        </div>

        {/* Desktop Navigation */}
        {isLoggedIn ? (
          <nav className="hidden md:flex items-center gap-6">
            <Button
              variant={currentPage === "dashboard" ? "default" : "ghost"}
              onClick={() => onNavigate("dashboard")}
              className={currentPage === "dashboard" ? "bg-blue-700 text-white" : ""}
            >
              Dashboard
            </Button>
            <Button
              variant={currentPage === "threats" ? "default" : "ghost"}
              onClick={() => onNavigate("threats")}
              className={currentPage === "threats" ? "bg-blue-700 text-white" : ""}
            >
              Threat Monitoring
            </Button>
            <Button
              variant={currentPage === "compliance" ? "default" : "ghost"}
              onClick={() => onNavigate("compliance")}
              className={currentPage === "compliance" ? "bg-blue-700 text-white" : ""}
            >
              Compliance
            </Button>
            <Button
              variant={currentPage === "training" ? "default" : "ghost"}
              onClick={() => onNavigate("training")}
              className={currentPage === "training" ? "bg-blue-700 text-white" : ""}
            >
              Training
            </Button>
            <Button
              variant={currentPage === "settings" ? "default" : "ghost"}
              onClick={() => onNavigate("settings")}
              className={currentPage === "settings" ? "bg-blue-700 text-white" : ""}
            >
              Settings
            </Button>
          </nav>
        ) : (
          <nav className="hidden md:flex items-center gap-6">
            <Button variant="ghost" onClick={() => onNavigate("landing")}>
              Home
            </Button>
            <Button variant="ghost">Features</Button>
            <Button variant="ghost">Pricing</Button>
            <Button variant="ghost">About</Button>
            <Button variant="ghost">Contact</Button>
          </nav>
        )}

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarFallback className="bg-blue-100 text-blue-900">JS</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onNavigate("settings")}>Profile</DropdownMenuItem>
                  <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <Button variant="outline" onClick={() => onNavigate("login")}>
                Log In
              </Button>
              <Button className="bg-blue-700 hover:bg-blue-800" onClick={() => onNavigate("signup")}>
                Sign Up
              </Button>
            </div>
          )}

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMobileMenu} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {isLoggedIn ? (
              <>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    onNavigate("dashboard")
                    setMobileMenuOpen(false)
                  }}
                >
                  Dashboard
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    onNavigate("threats")
                    setMobileMenuOpen(false)
                  }}
                >
                  Threat Monitoring
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    onNavigate("compliance")
                    setMobileMenuOpen(false)
                  }}
                >
                  Compliance
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    onNavigate("training")
                    setMobileMenuOpen(false)
                  }}
                >
                  Training
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    onNavigate("settings")
                    setMobileMenuOpen(false)
                  }}
                >
                  Settings
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    onLogout()
                    setMobileMenuOpen(false)
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    onNavigate("landing")
                    setMobileMenuOpen(false)
                  }}
                >
                  Home
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => setMobileMenuOpen(false)}>
                  Features
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => setMobileMenuOpen(false)}>
                  Pricing
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => setMobileMenuOpen(false)}>
                  About
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => setMobileMenuOpen(false)}>
                  Contact
                </Button>
                <Button
                  variant="outline"
                  className="w-full mt-2"
                  onClick={() => {
                    onNavigate("login")
                    setMobileMenuOpen(false)
                  }}
                >
                  Log In
                </Button>
                <Button
                  className="w-full mt-2 bg-blue-700 hover:bg-blue-800"
                  onClick={() => {
                    onNavigate("signup")
                    setMobileMenuOpen(false)
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
