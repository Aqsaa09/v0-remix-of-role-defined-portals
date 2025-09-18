"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ThemeToggle } from "@/components/theme-toggle"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Users,
  Plus,
  FileText,
  BarChart3,
  Clock,
  ArrowLeft,
  Bell,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Award,
  TrendingUp,
  Leaf,
  Star,
  BookOpen,
} from "lucide-react"
import Link from "next/link"

const assignments = [
  {
    id: 1,
    title: "Water Conservation Project",
    description: "Research traditional Indian water harvesting techniques like stepwells and tank systems",
    dueDate: "2024-01-15",
    submissions: 18,
    totalStudents: 25,
    status: "active",
    points: 100,
    category: "Research",
  },
  {
    id: 2,
    title: "Indian Eco-Meal Planning",
    description: "Create a week-long sustainable Indian thali meal plan with local ingredients",
    dueDate: "2024-01-20",
    submissions: 12,
    totalStudents: 25,
    status: "active",
    points: 75,
    category: "Practical",
  },
  {
    id: 3,
    title: "Swachh Bharat Challenge",
    description: "Document daily waste reduction efforts following Swachh Bharat principles",
    dueDate: "2024-01-10",
    submissions: 25,
    totalStudents: 25,
    status: "completed",
    points: 50,
    category: "Challenge",
  },
]

const recentSubmissions = [
  {
    id: 1,
    studentName: "Aryan Sharma",
    assignment: "Water Conservation Project",
    submittedAt: "2024-01-12 14:30",
    status: "pending",
    score: null,
    college: "IIT Delhi",
  },
  {
    id: 2,
    studentName: "Priya Patel",
    assignment: "Indian Eco-Meal Planning",
    submittedAt: "2024-01-12 10:15",
    status: "graded",
    score: 85,
    college: "DU",
  },
  {
    id: 3,
    studentName: "Rahul Gupta",
    assignment: "Water Conservation Project",
    submittedAt: "2024-01-11 16:45",
    status: "pending",
    score: null,
    college: "JNU",
  },
  {
    id: 4,
    studentName: "Anita Singh",
    assignment: "Swachh Bharat Challenge",
    submittedAt: "2024-01-10 09:20",
    status: "graded",
    score: 92,
    college: "BHU",
  },
]

const classStats = {
  totalStudents: 25,
  activeAssignments: 2,
  avgScore: 87.5,
  completionRate: 78,
  ecoPoints: 2150,
  co2Saved: 156.7,
  waterSaved: 1240,
}

const topPerformers = [
  { name: "Aryan Sharma", points: 1250, assignments: 8, college: "IIT Delhi" },
  { name: "Priya Patel", points: 1180, assignments: 7, college: "DU" },
  { name: "Anita Singh", points: 1050, assignments: 6, college: "BHU" },
]

export default function TeacherPortal() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [animateStats, setAnimateStats] = useState(false)
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    dueDate: "",
    points: "",
    category: "Research",
  })

  useEffect(() => {
    setAnimateStats(true)
  }, [])

  const handleCreateAssignment = () => {
    // Handle assignment creation logic here
    console.log("Creating assignment:", newAssignment)
    setShowCreateForm(false)
    setNewAssignment({ title: "", description: "", dueDate: "", points: "", category: "Research" })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50 transition-all duration-300">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform duration-300">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <Image
              src="/images/recyclerun-logo.png"
              alt="RecycleRun Logo"
              width={32}
              height={32}
              className="rounded-lg transition-transform duration-300 hover:scale-110"
            />
            <div>
              <h1 className="text-lg font-bold text-primary">Teacher Dashboard</h1>
              <p className="text-xs text-muted-foreground">Environmental Science Class</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform duration-300 relative">
              <Bell className="h-4 w-4" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 transition-all duration-300">
            <TabsTrigger value="dashboard" className="hover:scale-105 transition-transform duration-200">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="assignments" className="hover:scale-105 transition-transform duration-200">
              Assignments
            </TabsTrigger>
            <TabsTrigger value="submissions" className="hover:scale-105 transition-transform duration-200">
              Submissions
            </TabsTrigger>
            <TabsTrigger value="analytics" className="hover:scale-105 transition-transform duration-200">
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card
                className={`hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${animateStats ? "animate-fade-in" : ""}`}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{classStats.totalStudents}</div>
                  <p className="text-xs text-muted-foreground">Active in class</p>
                </CardContent>
              </Card>
              <Card
                className={`hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${animateStats ? "animate-fade-in" : ""}`}
                style={{ animationDelay: "100ms" }}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Assignments</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{classStats.activeAssignments}</div>
                  <p className="text-xs text-muted-foreground">Due this week</p>
                </CardContent>
              </Card>
              <Card
                className={`hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${animateStats ? "animate-fade-in" : ""}`}
                style={{ animationDelay: "200ms" }}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{classStats.avgScore}%</div>
                  <p className="text-xs text-green-600 animate-pulse">+2.5% from last week</p>
                </CardContent>
              </Card>
              <Card
                className={`hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${animateStats ? "animate-fade-in" : ""}`}
                style={{ animationDelay: "300ms" }}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Eco Points</CardTitle>
                  <Leaf className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{classStats.ecoPoints.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Class total</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <div className="lg:col-span-2">
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Recent Submissions
                    </CardTitle>
                    <CardDescription>Latest student work requiring attention</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentSubmissions.slice(0, 4).map((submission, index) => (
                        <div
                          key={submission.id}
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-all duration-300 hover:scale-102"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="flex-1">
                            <p className="font-medium">{submission.studentName}</p>
                            <p className="text-sm text-muted-foreground">{submission.assignment}</p>
                            <p className="text-xs text-muted-foreground">
                              {submission.college} • {submission.submittedAt}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {submission.status === "graded" ? (
                              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 animate-pulse">
                                {submission.score}/100
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="animate-bounce">
                                Pending
                              </Badge>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              className="hover:scale-110 transition-transform duration-300"
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Top Performers */}
              <div>
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Top Performers
                    </CardTitle>
                    <CardDescription>Students leading in eco points</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {topPerformers.map((student, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 hover:bg-muted/50 p-2 rounded-lg transition-all duration-300 hover:scale-102"
                          style={{ animationDelay: `${index * 150}ms` }}
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-transform duration-300 hover:scale-110 ${
                              index === 0
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                : index === 1
                                  ? "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                                  : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                            }`}
                          >
                            {index === 0 ? <Star className="h-4 w-4" /> : index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{student.name}</p>
                            <p className="text-xs text-muted-foreground">{student.college}</p>
                            <p className="text-xs text-muted-foreground">{student.assignments} assignments</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{student.points.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">points</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Class Impact */}
                <Card className="mt-6 hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle>Class Environmental Impact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">CO₂ Saved</span>
                        <span className="font-bold text-green-600">{classStats.co2Saved} kg</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Water Saved</span>
                        <span className="font-bold text-blue-600">{classStats.waterSaved.toLocaleString()} L</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Completion Rate</span>
                        <span className="font-bold">{classStats.completionRate}%</span>
                      </div>
                      <Progress value={classStats.completionRate} className="h-3 transition-all duration-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Assignments Tab */}
          <TabsContent value="assignments" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Assignments</h2>
                <p className="text-muted-foreground">Create and manage student assignments</p>
              </div>
              <Button
                onClick={() => setShowCreateForm(true)}
                className="hover:scale-105 transition-transform duration-300"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Assignment
              </Button>
            </div>

            {showCreateForm && (
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle>Create New Assignment</CardTitle>
                  <CardDescription>Design an eco-focused assignment for your students</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Assignment Title</Label>
                      <Input
                        id="title"
                        value={newAssignment.title}
                        onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                        placeholder="Enter assignment title"
                        className="transition-all duration-300 focus:scale-105"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="points">Points</Label>
                      <Input
                        id="points"
                        type="number"
                        value={newAssignment.points}
                        onChange={(e) => setNewAssignment({ ...newAssignment, points: e.target.value })}
                        placeholder="100"
                        className="transition-all duration-300 focus:scale-105"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newAssignment.description}
                      onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                      placeholder="Describe the assignment objectives and requirements"
                      rows={3}
                      className="transition-all duration-300 focus:scale-105"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dueDate">Due Date</Label>
                      <Input
                        id="dueDate"
                        type="date"
                        value={newAssignment.dueDate}
                        onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                        className="transition-all duration-300 focus:scale-105"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <select
                        id="category"
                        value={newAssignment.category}
                        onChange={(e) => setNewAssignment({ ...newAssignment, category: e.target.value })}
                        className="w-full px-3 py-2 border border-input bg-background rounded-md transition-all duration-300 focus:scale-105"
                      >
                        <option value="Research">Research</option>
                        <option value="Practical">Practical</option>
                        <option value="Challenge">Challenge</option>
                        <option value="Project">Project</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleCreateAssignment}
                      className="hover:scale-105 transition-transform duration-300"
                    >
                      Create Assignment
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowCreateForm(false)}
                      className="hover:scale-105 transition-transform duration-300"
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {assignments.map((assignment, index) => (
                <Card
                  key={assignment.id}
                  className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:rotate-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg hover:text-primary transition-colors duration-300">
                          {assignment.title}
                        </CardTitle>
                        <CardDescription>{assignment.description}</CardDescription>
                      </div>
                      <Badge
                        variant={assignment.status === "active" ? "default" : "secondary"}
                        className="animate-pulse"
                      >
                        {assignment.status === "active" ? "Active" : "Complete"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Submissions</span>
                        <span>
                          {assignment.submissions}/{assignment.totalStudents}
                        </span>
                      </div>
                      <Progress
                        value={(assignment.submissions / assignment.totalStudents) * 100}
                        className="h-2 transition-all duration-500"
                      />
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Due: {assignment.dueDate}</span>
                        <Badge variant="outline">{assignment.points} points</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover:scale-105 transition-transform duration-300 bg-transparent"
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover:scale-105 transition-transform duration-300 bg-transparent"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="submissions" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Student Submissions</h2>
                <p className="text-muted-foreground">Review and grade student work</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:scale-105 transition-transform duration-300 bg-transparent"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:scale-105 transition-transform duration-300 bg-transparent"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>All Submissions</CardTitle>
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search submissions..."
                      className="w-64 transition-all duration-300 focus:scale-105"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSubmissions.map((submission, index) => (
                    <div
                      key={submission.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-all duration-300 hover:scale-102"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:rotate-12 transition-transform duration-300">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{submission.studentName}</p>
                            <p className="text-sm text-muted-foreground">{submission.assignment}</p>
                            <p className="text-xs text-muted-foreground">
                              {submission.college} • Submitted: {submission.submittedAt}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {submission.status === "graded" ? (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 animate-pulse">
                            Graded: {submission.score}/100
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-orange-600 border-orange-200 animate-bounce">
                            <Clock className="h-3 w-3 mr-1" />
                            Review Pending
                          </Badge>
                        )}
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="hover:scale-110 transition-transform duration-300 bg-transparent"
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="hover:scale-110 transition-transform duration-300 bg-transparent"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Class Analytics</h2>
              <p className="text-muted-foreground">Track overall class progress and performance</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Performance Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average Score</span>
                      <span className="font-bold text-green-600">87.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Improvement</span>
                      <span className="font-bold text-green-600 animate-pulse">+5.2%</span>
                    </div>
                    <Progress value={87.5} className="h-3 transition-all duration-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <CardTitle>Assignment Completion</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">On Time</span>
                      <span className="font-bold text-green-600">78%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Late</span>
                      <span className="font-bold text-orange-600">15%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Missing</span>
                      <span className="font-bold text-red-600">7%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <CardTitle>Environmental Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Total Eco Points</span>
                      <span className="font-bold text-green-600">{classStats.ecoPoints.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">CO₂ Reduced</span>
                      <span className="font-bold text-green-600">{classStats.co2Saved} kg</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Water Saved</span>
                      <span className="font-bold text-blue-600">{classStats.waterSaved.toLocaleString()} L</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
