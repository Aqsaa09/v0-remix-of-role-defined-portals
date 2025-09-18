"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ThemeToggle } from "@/components/theme-toggle"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  User,
  Clock,
  AlertTriangle,
  MessageSquare,
  ArrowLeft,
  Bell,
  Camera,
  CheckCircle,
  MapPin,
  Calendar,
  Star,
  Plus,
  Eye,
  Edit,
  Timer,
  ClipboardCheck,
  Sparkles,
} from "lucide-react"
import Link from "next/link"

const staffProfile = {
  name: "Maria Rodriguez",
  id: "CS001",
  department: "Cleaning Services",
  shift: "Morning (6:00 AM - 2:00 PM)",
  rating: 4.8,
  completedTasks: 156,
  hoursWorked: 320,
}

const todaySchedule = [
  {
    id: 1,
    area: "Main Hall",
    task: "Deep cleaning and mopping",
    time: "6:00 AM - 8:00 AM",
    status: "completed",
    priority: "high",
  },
  {
    id: 2,
    area: "Dormitory Block A",
    task: "Room cleaning and sanitization",
    time: "8:00 AM - 10:00 AM",
    status: "in-progress",
    priority: "medium",
  },
  {
    id: 3,
    area: "Cafeteria",
    task: "Kitchen and dining area cleaning",
    time: "10:00 AM - 12:00 PM",
    status: "pending",
    priority: "high",
  },
  {
    id: 4,
    area: "Library",
    task: "Dusting and organizing",
    time: "12:00 PM - 2:00 PM",
    status: "pending",
    priority: "low",
  },
]

const recentIssues = [
  {
    id: 1,
    title: "Broken vacuum cleaner in Block B",
    description: "Main vacuum cleaner not working properly",
    location: "Dormitory Block B",
    priority: "high",
    status: "reported",
    reportedAt: "2024-01-15 09:30",
  },
  {
    id: 2,
    title: "Low cleaning supplies",
    description: "Running low on disinfectant and paper towels",
    location: "Supply Room",
    priority: "medium",
    status: "in-progress",
    reportedAt: "2024-01-14 14:20",
  },
  {
    id: 3,
    title: "Water leak in bathroom",
    description: "Small leak under sink in 2nd floor bathroom",
    location: "Main Building - Floor 2",
    priority: "high",
    status: "resolved",
    reportedAt: "2024-01-13 11:15",
  },
]

const feedbackData = [
  {
    id: 1,
    from: "Building Manager",
    message: "Excellent work on the deep cleaning of the main hall. Very thorough!",
    rating: 5,
    date: "2024-01-14",
  },
  {
    id: 2,
    from: "Student Representative",
    message: "The dormitory rooms are always spotless. Thank you for your hard work!",
    rating: 5,
    date: "2024-01-12",
  },
  {
    id: 3,
    from: "Facility Supervisor",
    message: "Good attention to detail in the library cleaning. Keep it up!",
    rating: 4,
    date: "2024-01-10",
  },
]

export default function CleaningStaffPortal() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isCheckedIn, setIsCheckedIn] = useState(false)
  const [showIssueForm, setShowIssueForm] = useState(false)
  const [showFaceRecognition, setShowFaceRecognition] = useState(false)
  const [newIssue, setNewIssue] = useState({
    title: "",
    description: "",
    location: "",
    priority: "medium",
  })

  const handleCheckIn = () => {
    setShowFaceRecognition(true)
    // Simulate face recognition process
    setTimeout(() => {
      setIsCheckedIn(true)
      setShowFaceRecognition(false)
    }, 3000)
  }

  const handleReportIssue = () => {
    console.log("Reporting issue:", newIssue)
    setShowIssueForm(false)
    setNewIssue({ title: "", description: "", location: "", priority: "medium" })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "pending":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
      case "resolved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "reported":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  if (showFaceRecognition) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-96">
          <CardHeader className="text-center">
            <CardTitle>Face Recognition Check-in</CardTitle>
            <CardDescription>Please look at the camera for verification</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Camera className="h-16 w-16 text-primary animate-pulse" />
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Scanning...</p>
              <Progress value={66} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <Image
              src="/images/recyclerun-logo.png"
              alt="RecycleRun Logo"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <div>
              <h1 className="text-lg font-bold text-primary">Cleaning Staff Portal</h1>
              <p className="text-xs text-muted-foreground">Welcome, {staffProfile.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="issues">Issues</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Check-in Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Staff Profile & Check-in
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{staffProfile.name}</h3>
                      <p className="text-sm text-muted-foreground">ID: {staffProfile.id}</p>
                      <p className="text-sm text-muted-foreground">{staffProfile.shift}</p>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    {isCheckedIn ? (
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Checked In
                      </Badge>
                    ) : (
                      <Button onClick={handleCheckIn}>
                        <Camera className="h-4 w-4 mr-2" />
                        Check-in with Face Recognition
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Today's Tasks</CardTitle>
                  <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4</div>
                  <p className="text-xs text-muted-foreground">1 completed, 3 remaining</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Hours Worked</CardTitle>
                  <Timer className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{staffProfile.hoursWorked}</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Performance Rating</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{staffProfile.rating}</div>
                  <p className="text-xs text-muted-foreground">Out of 5.0</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
                  <Sparkles className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{staffProfile.completedTasks}</div>
                  <p className="text-xs text-green-600">+12 this week</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Today's Schedule */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Today's Schedule</CardTitle>
                    <CardDescription>Your assigned cleaning tasks for today</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {todaySchedule.slice(0, 3).map((task) => (
                        <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                task.status === "completed"
                                  ? "bg-green-500"
                                  : task.status === "in-progress"
                                    ? "bg-blue-500"
                                    : "bg-gray-300"
                              }`}
                            />
                            <div>
                              <p className="font-medium">{task.area}</p>
                              <p className="text-sm text-muted-foreground">{task.task}</p>
                              <p className="text-xs text-muted-foreground">{task.time}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                            <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      className="w-full justify-start bg-transparent"
                      variant="outline"
                      onClick={() => setShowIssueForm(true)}
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Report Issue
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Clock className="h-4 w-4 mr-2" />
                      View Shift Time
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Give Feedback
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Calendar className="h-4 w-4 mr-2" />
                      Request Time Off
                    </Button>
                  </CardContent>
                </Card>

                {/* Recent Feedback */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Feedback</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {feedbackData.slice(0, 2).map((feedback) => (
                        <div key={feedback.id} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium">{feedback.from}</p>
                            <div className="flex items-center gap-1">
                              {[...Array(feedback.rating)].map((_, i) => (
                                <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">{feedback.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{feedback.date}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Shift Schedule</h2>
                <p className="text-muted-foreground">Manage your cleaning tasks and time</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Calendar
                </Button>
                <Button variant="outline">
                  <Clock className="h-4 w-4 mr-2" />
                  Time Tracker
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Today's Tasks</CardTitle>
                <CardDescription>Complete your assigned cleaning tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todaySchedule.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-4 h-4 rounded-full ${
                            task.status === "completed"
                              ? "bg-green-500"
                              : task.status === "in-progress"
                                ? "bg-blue-500"
                                : "bg-gray-300"
                          }`}
                        />
                        <div>
                          <h4 className="font-medium">{task.area}</h4>
                          <p className="text-sm text-muted-foreground">{task.task}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{task.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                        <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                          {task.status !== "completed" && (
                            <Button size="sm">
                              <CheckCircle className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Shift Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Current Shift</span>
                      <span className="font-medium">{staffProfile.shift}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Hours Today</span>
                      <span className="font-medium">6.5 / 8.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Break Time</span>
                      <span className="font-medium">12:00 PM - 12:30 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Overtime</span>
                      <span className="font-medium text-green-600">0.5 hours</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Weekly Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Tasks Completed</span>
                      <span>28/30</span>
                    </div>
                    <Progress value={93} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span>Efficiency Rating</span>
                      <span className="text-green-600">Excellent</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Issues Tab */}
          <TabsContent value="issues" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Issue Reporting</h2>
                <p className="text-muted-foreground">Report and track maintenance issues</p>
              </div>
              <Button onClick={() => setShowIssueForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Report New Issue
              </Button>
            </div>

            {showIssueForm && (
              <Card>
                <CardHeader>
                  <CardTitle>Report New Issue</CardTitle>
                  <CardDescription>Describe the issue you encountered</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Issue Title</Label>
                      <Input
                        id="title"
                        value={newIssue.title}
                        onChange={(e) => setNewIssue({ ...newIssue, title: e.target.value })}
                        placeholder="Brief description of the issue"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={newIssue.location}
                        onChange={(e) => setNewIssue({ ...newIssue, location: e.target.value })}
                        placeholder="Where did this occur?"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newIssue.description}
                      onChange={(e) => setNewIssue({ ...newIssue, description: e.target.value })}
                      placeholder="Provide detailed information about the issue"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority Level</Label>
                    <select
                      id="priority"
                      value={newIssue.priority}
                      onChange={(e) => setNewIssue({ ...newIssue, priority: e.target.value })}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleReportIssue}>Report Issue</Button>
                    <Button variant="outline" onClick={() => setShowIssueForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Recent Issues</CardTitle>
                <CardDescription>Track the status of reported issues</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentIssues.map((issue) => (
                    <div key={issue.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <AlertTriangle className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{issue.title}</h4>
                          <p className="text-sm text-muted-foreground">{issue.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <MapPin className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{issue.location}</span>
                            <span className="text-xs text-muted-foreground">• {issue.reportedAt}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getPriorityColor(issue.priority)}>{issue.priority}</Badge>
                        <Badge className={getStatusColor(issue.status)}>{issue.status}</Badge>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
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

          {/* Feedback Tab */}
          <TabsContent value="feedback" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Feedback & Performance</h2>
              <p className="text-muted-foreground">View feedback and track your performance</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold">{staffProfile.rating}</div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(staffProfile.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Based on 24 reviews</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Positive Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">92%</div>
                  <p className="text-xs text-green-600">+5% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">98%</div>
                  <p className="text-xs text-muted-foreground">Issue resolution</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Feedback</CardTitle>
                <CardDescription>Comments and ratings from supervisors and residents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {feedbackData.map((feedback) => (
                    <div key={feedback.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-medium">{feedback.from}</p>
                          <p className="text-sm text-muted-foreground">{feedback.date}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(feedback.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm">{feedback.message}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Track your work efficiency and quality</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Task Completion Rate</span>
                      <span className="font-bold">96%</span>
                    </div>
                    <Progress value={96} className="h-2" />
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Quality Score</span>
                      <span className="font-bold">4.8/5.0</span>
                    </div>
                    <Progress value={96} className="h-2" />
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Punctuality</span>
                      <span className="font-bold">100%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Issue Response Time</span>
                      <span className="font-bold">Excellent</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
