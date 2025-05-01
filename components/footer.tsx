"use client"

import { Shield } from "lucide-react"

interface FooterProps {
  onNavigate: (page: string) => void
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="w-full border-t bg-white py-6">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-blue-700" />
              <span className="text-xl font-bold text-blue-900">SecureSmallBiz</span>
            </div>
            <p className="text-sm text-gray-500">
              Affordable, AI-powered cybersecurity solutions for small businesses.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium">Company</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <button className="text-gray-500 hover:text-blue-700" onClick={() => onNavigate("about")}>
                  About
                </button>
              </li>
              <li>
                <button className="text-gray-500 hover:text-blue-700" onClick={() => onNavigate("contact")}>
                  Contact
                </button>
              </li>
              <li>
                <button className="text-gray-500 hover:text-blue-700">Careers</button>
              </li>
              <li>
                <button className="text-gray-500 hover:text-blue-700">Blog</button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium">Resources</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <button className="text-gray-500 hover:text-blue-700">Documentation</button>
              </li>
              <li>
                <button className="text-gray-500 hover:text-blue-700">Help Center</button>
              </li>
              <li>
                <button className="text-gray-500 hover:text-blue-700">Security Guide</button>
              </li>
              <li>
                <button className="text-gray-500 hover:text-blue-700">Webinars</button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium">Legal</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <button className="text-gray-500 hover:text-blue-700">Privacy Policy</button>
              </li>
              <li>
                <button className="text-gray-500 hover:text-blue-700">Terms of Service</button>
              </li>
              <li>
                <button className="text-gray-500 hover:text-blue-700">Cookie Policy</button>
              </li>
              <li>
                <button className="text-gray-500 hover:text-blue-700">GDPR</button>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-6">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} SecureSmallBiz. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
