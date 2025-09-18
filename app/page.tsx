"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Leaf,
  Recycle,
  Users,
  Trophy,
  ArrowRight,
  Target,
  BookOpen,
  Play,
  Award,
  TrendingUp,
  LogIn,
  UserPlus,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const roles = [
  {
    id: "student",
    name: "Student Portal",
    description: "Access eco-games, sustainability challenges, and environmental education",
    icon: BookOpen,
    color: "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300",
    features: ["Eco Games", "Daily Challenges", "Learning Modules", "Progress Tracking"],
    href: "/auth/student-login",
  },
  {
    id: "teacher",
    name: "Teacher Portal",
    description: "Manage classes, create assignments, and track student progress",
    icon: Users,
    color: "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300",
    features: ["Class Management", "Assignment Creation", "Progress Analytics", "Resource Library"],
    href: "/auth/teacher-login",
  },
  {
    id: "hostler",
    name: "Hostler Portal",
    description: "Monitor hostel sustainability metrics and waste management",
    icon: Target,
    color: "bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300",
    features: ["Waste Tracking", "Energy Monitoring", "Sustainability Reports", "Resource Management"],
    href: "/auth/hostler-login",
  },
  {
    id: "cleaning-staff",
    name: "Cleaning Staff Portal",
    description: "Track cleaning activities and waste collection efficiency",
    icon: Recycle,
    color: "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300",
    features: ["Task Management", "Waste Collection", "Efficiency Tracking", "Reporting Tools"],
    href: "/auth/cleaning-staff-login",
  },
]

const platformStats = [
  { label: "Active Users", value: "2,847", icon: Users },
  { label: "CO₂ Saved", value: "1.2T", icon: Leaf },
  { label: "Waste Recycled", value: "850kg", icon: Recycle },
  { label: "Achievements", value: "1,234", icon: Trophy },
]

export default function RecycleRunHome() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50 transition-all duration-300">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/images/recyclerun-logo.png"
              alt="RecycleRun Logo"
              width={40}
              height={40}
              className="rounded-lg transition-transform duration-300 hover:scale-110"
            />
            <div>
              <h1 className="text-xl font-bold text-primary">RecycleRun</h1>
              <p className="text-xs text-muted-foreground">Eco Sustainability Platform</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/login">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <LogIn className="h-4 w-4" />
                Login
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="sm" className="gap-2">
                <UserPlus className="h-4 w-4" />
                Sign Up
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/5 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/5 rounded-full animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium animate-bounce">
              <Leaf className="h-4 w-4" />
              Gamified Environmental Education
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance animate-fade-in">
            Transform Learning with{" "}
            <span className="text-primary bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Eco Sustainability
            </span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto animate-fade-in-delay">
            Join our gamified platform to learn about environmental sustainability, track your eco-impact, and compete
            in green challenges!
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {platformStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.label}
                  className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Icon className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Role Selection */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Choose Your Portal</h2>
            <p className="text-muted-foreground text-lg">
              Select your role to access personalized sustainability tools and features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((role, index) => {
              const Icon = role.icon
              return (
                <Card
                  key={role.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group ${
                    selectedRole === role.id ? "ring-2 ring-primary scale-105" : ""
                  }`}
                  style={{ animationDelay: `${index * 150}ms` }}
                  onClick={() => setSelectedRole(role.id)}
                >
                  <CardHeader className="text-center pb-4">
                    <div
                      className={`w-16 h-16 ${role.color} rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
                      {role.name}
                    </CardTitle>
                    <CardDescription className="text-sm">{role.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm font-medium text-muted-foreground">Key Features:</p>
                      <div className="space-y-1">
                        {role.features.map((feature, index) => (
                          <div
                            key={index}
                            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full text-center"
                          >
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                    <Link href={role.href}>
                      <Button className="w-full group-hover:scale-105 transition-transform duration-300">
                        Enter Portal
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-8">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4 group hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 text-green-600 rounded-lg flex items-center justify-center mx-auto group-hover:rotate-12 transition-transform duration-300">
                <Play className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
                Interactive Eco Games
              </h3>
              <p className="text-muted-foreground">
                Engage with fun, educational games that teach environmental sustainability concepts
              </p>
            </div>
            <div className="space-y-4 group hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 text-blue-600 rounded-lg flex items-center justify-center mx-auto group-hover:rotate-12 transition-transform duration-300">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
                Progress Tracking
              </h3>
              <p className="text-muted-foreground">
                Monitor your environmental impact and track your sustainability journey over time
              </p>
            </div>
            <div className="space-y-4 group hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 text-orange-600 rounded-lg flex items-center justify-center mx-auto group-hover:rotate-12 transition-transform duration-300">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
                Achievements & Rewards
              </h3>
              <p className="text-muted-foreground">
                Earn badges, unlock achievements, and compete with others in sustainability challenges
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Image
              src="/images/recyclerun-logo.png"
              alt="RecycleRun Logo"
              width={24}
              height={24}
              className="rounded transition-transform duration-300 hover:scale-110"
            />
            <span className="font-semibold text-primary">RecycleRun</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Empowering sustainable futures through gamified environmental education
          </p>
          <p className="text-xs text-muted-foreground mt-2">Made with 💚 for a greener tomorrow</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-delay {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fade-in-delay 0.8s ease-out 0.3s both;
        }
      `}</style>
    </div>
  )
}
