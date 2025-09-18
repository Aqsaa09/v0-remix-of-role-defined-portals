"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, ArrowRight, UserPlus, Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface FormData {
  firstName: string
  lastName: string
  role: string
  state: string
  city: string
  school: string
  governmentId: string
}

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
]

const citiesByState: Record<string, string[]> = {
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
  Karnataka: ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli"],
  Delhi: ["New Delhi", "Central Delhi", "South Delhi", "North Delhi", "East Delhi"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
  // Add more states and cities as needed
}

const schoolsByCity: Record<string, string[]> = {
  Mumbai: [
    "St. Xavier's High School",
    "Cathedral & John Connon School",
    "Bombay Scottish School",
    "Dhirubhai Ambani International School",
  ],
  Pune: ["Bishop's School", "Symbiosis International School", "The Orchid School", "Pune International School"],
  Bangalore: [
    "Bishop Cotton Boys' School",
    "National Public School",
    "Mallya Aditi International School",
    "Inventure Academy",
  ],
  Chennai: ["Padma Seshadri Bala Bhavan", "Chettinad Vidyashram", "American International School", "Sishya School"],
  // Add more cities and schools as needed
}

export default function SignupPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    role: "",
    state: "",
    city: "",
    school: "",
    governmentId: "",
  })

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Registration data:", formData)
    if (formData.role === "government") {
      window.location.href = "/government-dashboard"
    } else {
      // Handle regular user registration
      window.location.href = "/student" // or appropriate role-based redirect
    }
  }

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const availableCities = formData.state ? citiesByState[formData.state] || [] : []
  const availableSchools = formData.city ? schoolsByCity[formData.city] || [] : []

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Image
                src="/images/recyclerun-logo.png"
                alt="RecycleRun Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <div>
                <CardTitle className="text-xl">Join RecycleRun</CardTitle>
                <CardDescription>
                  Create your account - Step {step} of {formData.role === "government" ? 4 : 5}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={(e) => updateFormData("firstName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={(e) => updateFormData("lastName", e.target.value)}
                      required
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="w-full gap-2"
                    disabled={!formData.firstName || !formData.lastName}
                  >
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="space-y-2">
                    <Label>Select Your Role</Label>
                    <Select value={formData.role} onValueChange={(value) => updateFormData("role", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="teacher">Teacher</SelectItem>
                        <SelectItem value="cleaning-staff">Cleaning Staff</SelectItem>
                        <SelectItem value="government">Government Official</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button type="button" onClick={handleBack} variant="outline" className="flex-1 bg-transparent">
                      Back
                    </Button>
                    <Button type="button" onClick={handleNext} className="flex-1 gap-2" disabled={!formData.role}>
                      Next
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div className="space-y-2">
                    <Label>Select State</Label>
                    <Select value={formData.state} onValueChange={(value) => updateFormData("state", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose your state" />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button type="button" onClick={handleBack} variant="outline" className="flex-1 bg-transparent">
                      Back
                    </Button>
                    <Button type="button" onClick={handleNext} className="flex-1 gap-2" disabled={!formData.state}>
                      Next
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              )}

              {step === 4 && formData.role === "government" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="governmentId">Government ID Verification</Label>
                    <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <Shield className="h-5 w-5 text-blue-600" />
                      <span className="text-sm text-blue-700 dark:text-blue-300">
                        Verified officials get access to all school data
                      </span>
                    </div>
                    <Input
                      id="governmentId"
                      placeholder="Enter your verified government ID"
                      value={formData.governmentId}
                      onChange={(e) => updateFormData("governmentId", e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="button" onClick={handleBack} variant="outline" className="flex-1 bg-transparent">
                      Back
                    </Button>
                    <Button type="submit" className="flex-1 gap-2" disabled={!formData.governmentId}>
                      <UserPlus className="h-4 w-4" />
                      Complete Registration
                    </Button>
                  </div>
                </>
              )}

              {step === 4 && formData.role !== "government" && (
                <>
                  <div className="space-y-2">
                    <Label>Select City</Label>
                    <Select value={formData.city} onValueChange={(value) => updateFormData("city", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose your city" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableCities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button type="button" onClick={handleBack} variant="outline" className="flex-1 bg-transparent">
                      Back
                    </Button>
                    <Button type="button" onClick={handleNext} className="flex-1 gap-2" disabled={!formData.city}>
                      Next
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              )}

              {step === 5 && formData.role !== "government" && (
                <>
                  <div className="space-y-2">
                    <Label>Select School</Label>
                    <Select value={formData.school} onValueChange={(value) => updateFormData("school", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose your school" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableSchools.map((school) => (
                          <SelectItem key={school} value={school}>
                            {school}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button type="button" onClick={handleBack} variant="outline" className="flex-1 bg-transparent">
                      Back
                    </Button>
                    <Button type="submit" className="flex-1 gap-2" disabled={!formData.school}>
                      <UserPlus className="h-4 w-4" />
                      Complete Registration
                    </Button>
                  </div>
                </>
              )}
            </form>

            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-primary hover:underline">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
