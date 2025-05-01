"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Database, Search, AlertTriangle, FileCheck, Brain } from "lucide-react"

export default function HowItWorks() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">How SecureSmallBiz Works</CardTitle>
        <CardDescription>Understanding how our AI-powered security platform protects your business</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="data-collection">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
            <TabsTrigger value="data-collection">1. Data Collection</TabsTrigger>
            <TabsTrigger value="analysis">2. Analysis</TabsTrigger>
            <TabsTrigger value="detection">3. Detection</TabsTrigger>
            <TabsTrigger value="alerts">4. Alerts</TabsTrigger>
            <TabsTrigger value="remediation">5. Remediation</TabsTrigger>
            <TabsTrigger value="learning">6. Learning</TabsTrigger>
          </TabsList>

          <TabsContent value="data-collection" className="mt-6 space-y-4">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Database className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Data Collection</h3>
                <p className="text-gray-600 mt-2">
                  SecureSmallBiz collects security-relevant data from your business through multiple methods:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>
                    <span className="font-medium">Asset Discovery:</span> We identify and catalog all your digital
                    assets, including servers, workstations, mobile devices, network equipment, and cloud resources.
                  </li>
                  <li>
                    <span className="font-medium">Network Scanning:</span> Our automated scanners examine your network
                    for open ports, services, and potential vulnerabilities.
                  </li>
                  <li>
                    <span className="font-medium">Log Collection:</span> We collect and analyze logs from your systems,
                    applications, and security devices to identify suspicious activities.
                  </li>
                  <li>
                    <span className="font-medium">Cloud Integration:</span> Connect your cloud accounts (AWS, Azure,
                    Google Cloud) to monitor cloud resources and configurations.
                  </li>
                  <li>
                    <span className="font-medium">Endpoint Agents:</span> Optional lightweight agents can be installed
                    on critical systems to provide deeper visibility and protection.
                  </li>
                </ul>
                <p className="text-gray-600 mt-4">
                  All data is collected securely and encrypted both in transit and at rest. You maintain full control
                  over what data is collected and how it's used.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="mt-6 space-y-4">
            <div className="flex items-start space-x-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <Search className="h-6 w-6 text-purple-700" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Security Analysis</h3>
                <p className="text-gray-600 mt-2">
                  Our platform analyzes your business data using multiple security techniques:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>
                    <span className="font-medium">Vulnerability Scanning:</span> We check your systems against a
                    database of known vulnerabilities (CVEs) to identify unpatched software and security weaknesses.
                  </li>
                  <li>
                    <span className="font-medium">Configuration Analysis:</span> We compare your system configurations
                    against security best practices and industry benchmarks.
                  </li>
                  <li>
                    <span className="font-medium">Behavioral Analysis:</span> Our AI models establish baselines of
                    normal behavior and identify anomalies that could indicate security threats.
                  </li>
                  <li>
                    <span className="font-medium">Compliance Checking:</span> We evaluate your systems against
                    regulatory requirements like GDPR, HIPAA, PCI DSS, and others relevant to your industry.
                  </li>
                  <li>
                    <span className="font-medium">Risk Scoring:</span> Each asset and potential vulnerability is
                    assigned a risk score based on severity, exploitability, and business impact.
                  </li>
                </ul>
                <p className="text-gray-600 mt-4">
                  Analysis is performed continuously, with comprehensive scans running on a schedule you define (daily,
                  weekly, or monthly) and real-time monitoring for critical systems.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="detection" className="mt-6 space-y-4">
            <div className="flex items-start space-x-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <AlertTriangle className="h-6 w-6 text-amber-700" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Threat Detection</h3>
                <p className="text-gray-600 mt-2">
                  SecureSmallBiz detects a wide range of security threats to your business:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>
                    <span className="font-medium">Malware & Viruses:</span> Detection of malicious software through
                    signature matching and behavioral analysis.
                  </li>
                  <li>
                    <span className="font-medium">Phishing Attempts:</span> Identification of suspicious emails and
                    websites targeting your employees.
                  </li>
                  <li>
                    <span className="font-medium">Unauthorized Access:</span> Detection of suspicious login attempts,
                    unusual access patterns, or credential compromise.
                  </li>
                  <li>
                    <span className="font-medium">Data Exfiltration:</span> Identification of unusual data transfers
                    that could indicate data theft.
                  </li>
                  <li>
                    <span className="font-medium">Network Intrusions:</span> Detection of suspicious network traffic,
                    port scans, and potential intrusion attempts.
                  </li>
                  <li>
                    <span className="font-medium">Insider Threats:</span> Identification of unusual employee behavior
                    that could indicate malicious intent.
                  </li>
                </ul>
                <p className="text-gray-600 mt-4">
                  Our detection combines rule-based systems with advanced AI models trained on millions of threat
                  patterns, providing both accuracy and the ability to detect novel threats.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="mt-6 space-y-4">
            <div className="flex items-start space-x-4">
              <div className="bg-red-100 p-3 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-700" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Alert Management</h3>
                <p className="text-gray-600 mt-2">
                  When threats are detected, our platform manages alerts intelligently:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>
                    <span className="font-medium">Prioritization:</span> Alerts are prioritized based on severity,
                    confidence, and potential business impact.
                  </li>
                  <li>
                    <span className="font-medium">Correlation:</span> Related alerts are grouped together to reduce
                    noise and provide context for investigation.
                  </li>
                  <li>
                    <span className="font-medium">Notification:</span> Alerts are delivered through multiple channels
                    (dashboard, email, SMS, mobile app) based on your preferences.
                  </li>
                  <li>
                    <span className="font-medium">Enrichment:</span> Alerts include contextual information about the
                    affected assets, users, and potential impact.
                  </li>
                  <li>
                    <span className="font-medium">False Positive Reduction:</span> AI filtering reduces false positives,
                    ensuring you focus on real threats.
                  </li>
                </ul>
                <p className="text-gray-600 mt-4">
                  You can customize alert thresholds and notification preferences to match your security team's capacity
                  and your business priorities.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="remediation" className="mt-6 space-y-4">
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <FileCheck className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Guided Remediation</h3>
                <p className="text-gray-600 mt-2">SecureSmallBiz helps you fix security issues with clear guidance:</p>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>
                    <span className="font-medium">Step-by-Step Instructions:</span> Each security issue comes with
                    detailed remediation steps tailored to your specific environment.
                  </li>
                  <li>
                    <span className="font-medium">Prioritized Actions:</span> Remediation tasks are prioritized based on
                    risk level, helping you focus on the most critical issues first.
                  </li>
                  <li>
                    <span className="font-medium">Automated Fixes:</span> For certain issues, our platform can apply
                    automated fixes with your approval.
                  </li>
                  <li>
                    <span className="font-medium">Verification:</span> After remediation, we verify that the issue has
                    been resolved through follow-up scans.
                  </li>
                  <li>
                    <span className="font-medium">Documentation:</span> All remediation actions are documented for
                    compliance and audit purposes.
                  </li>
                </ul>
                <p className="text-gray-600 mt-4">
                  For complex issues, our platform can connect you with security experts who can provide additional
                  guidance or hands-on assistance.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="learning" className="mt-6 space-y-4">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Brain className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Continuous Learning</h3>
                <p className="text-gray-600 mt-2">
                  Our AI-powered platform continuously improves its security capabilities:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>
                    <span className="font-medium">Threat Intelligence:</span> We constantly update our threat database
                    with the latest vulnerabilities and attack techniques.
                  </li>
                  <li>
                    <span className="font-medium">Behavioral Baselines:</span> The system learns what's normal for your
                    business, improving anomaly detection over time.
                  </li>
                  <li>
                    <span className="font-medium">Feedback Loop:</span> Your responses to alerts (confirm, dismiss) help
                    train the system to better match your security priorities.
                  </li>
                  <li>
                    <span className="font-medium">Cross-Customer Learning:</span> Anonymized threat data across our
                    customer base helps identify emerging threats faster.
                  </li>
                  <li>
                    <span className="font-medium">Security Research:</span> Our security research team continuously adds
                    new detection capabilities based on the evolving threat landscape.
                  </li>
                </ul>
                <p className="text-gray-600 mt-4">
                  This continuous learning approach ensures that your security protection improves over time, adapting
                  to both your specific business and the changing threat landscape.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
