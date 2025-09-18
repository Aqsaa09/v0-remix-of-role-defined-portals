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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Utensils,
  Plus,
  BarChart3,
  ArrowLeft,
  Bell,
  Users,
  TrendingDown,
  Apple,
  Edit,
  Trash2,
  CheckCircle,
  AlertTriangle,
  ChefHat,
  Sparkles,
  Award,
  Heart,
  Leaf,
  Star,
  Zap,
} from "lucide-react"
import Link from "next/link"

const mealPlans = [
  {
    id: 1,
    date: "2024-01-15",
    day: "Monday",
    breakfast: "Poha with green chutney and chai",
    lunch: "Dal tadka, jeera rice, mixed vegetable sabzi, roti",
    dinner: "Rajma curry, steamed rice, aloo gobi, papad",
    students: 45,
    wasteLevel: "low",
    calories: 2200,
    status: "planned",
    hostelName: "Ganga Hostel",
  },
  {
    id: 2,
    date: "2024-01-16",
    day: "Tuesday",
    breakfast: "Upma with coconut chutney and filter coffee",
    lunch: "Sambar, curd rice, bhindi masala, chapati",
    dinner: "Chole bhature, mint chutney, onion salad",
    students: 42,
    wasteLevel: "medium",
    calories: 2150,
    status: "active",
    hostelName: "Yamuna Hostel",
  },
  {
    id: 3,
    date: "2024-01-17",
    day: "Wednesday",
    breakfast: "Paratha with curd and pickle",
    lunch: "Kadhi chawal, aloo matar, roti, salad",
    dinner: "Biryani with raita and shorba",
    students: 48,
    wasteLevel: "low",
    calories: 2100,
    status: "planned",
    hostelName: "Saraswati Hostel",
  },
]

const dietaryRequirements = [
  { type: "Pure Vegetarian", count: 35, color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
  { type: "Jain Vegetarian", count: 8, color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200" },
  { type: "Vegan", count: 5, color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
  { type: "Gluten-Free", count: 3, color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200" },
  { type: "No Onion/Garlic", count: 6, color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" },
]

const wasteData = [
  { date: "2024-01-10", amount: 2.5, target: 3.0, percentage: 83, day: "Wednesday" },
  { date: "2024-01-11", amount: 1.8, target: 3.0, percentage: 60, day: "Thursday" },
  { date: "2024-01-12", amount: 3.2, target: 3.0, percentage: 107, day: "Friday" },
  { date: "2024-01-13", amount: 2.1, target: 3.0, percentage: 70, day: "Saturday" },
  { date: "2024-01-14", amount: 1.9, target: 3.0, percentage: 63, day: "Sunday" },
]

const nutritionStats = {
  avgCalories: 2150,
  proteinGoal: 85,
  proteinActual: 78,
  carbGoal: 60,
  carbActual: 65,
  fatGoal: 25,
  fatActual: 22,
  fiberGoal: 30,
  fiberActual: 28,
}

const portionSizes = [
  { size: "Small", students: 15, percentage: 30 },
  { size: "Medium", students: 25, percentage: 50 },
  { size: "Large", students: 10, percentage: 20 },
]

const hostelStaff = [
  { name: "Ramesh Kumar", role: "Head Chef", experience: "12 years", specialty: "North Indian", rating: 4.8 },
  { name: "Lakshmi Devi", role: "Assistant Chef", experience: "8 years", specialty: "South Indian", rating: 4.6 },
  { name: "Suresh Yadav", role: "Kitchen Helper", experience: "5 years", specialty: "Snacks", rating: 4.4 },
]

const monthlyAchievements = [
  { title: "Zero Waste Day", description: "Achieved zero food waste on 5 days", icon: Leaf, achieved: true },
  { title: "Student Satisfaction", description: "95% positive feedback this month", icon: Heart, achieved: true },
  { title: "Cost Efficiency", description: "Reduced meal cost by 12%", icon: TrendingDown, achieved: false },
  { title: "Nutrition Balance", description: "Met all nutritional targets", icon: Award, achieved: true },
]

export default function HostlerPortal() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [showMealForm, setShowMealForm] = useState(false)
  const [animateStats, setAnimateStats] = useState(false)
  const [newMeal, setNewMeal] = useState({
    date: "",
    breakfast: "",
    lunch: "",
    dinner: "",
    expectedStudents: "",
  })

  useEffect(() => {
    setAnimateStats(true)
  }, [])

  const handleCreateMeal = () => {
    console.log("Creating meal plan:", newMeal)
    setShowMealForm(false)
    setNewMeal({ date: "", breakfast: "", lunch: "", dinner: "", expectedStudents: "" })
  }

  const getWasteColor = (level: string) => {
    switch (level) {
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-background">
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
              <h1 className="text-lg font-bold text-primary">Hostler Management</h1>
              <p className="text-xs text-muted-foreground">Welcome, Ramesh Kumar</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900 rounded-full">
              <ChefHat className="h-3 w-3 text-green-500" />
              <span className="text-xs font-semibold text-green-700 dark:text-green-300">Master Chef</span>
            </div>
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard" className="transition-all duration-300 hover:scale-105">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="meal-planning" className="transition-all duration-300 hover:scale-105">
              Meal Planning
            </TabsTrigger>
            <TabsTrigger value="nutrition" className="transition-all duration-300 hover:scale-105">
              Nutrition
            </TabsTrigger>
            <TabsTrigger value="waste-tracking" className="transition-all duration-300 hover:scale-105">
              Waste Tracking
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card
                className={`hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${animateStats ? "animate-fade-in" : ""}`}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">135</div>
                  <p className="text-xs text-muted-foreground">Across 3 hostels</p>
                </CardContent>
              </Card>
              <Card
                className={`hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${animateStats ? "animate-fade-in" : ""}`}
                style={{ animationDelay: "100ms" }}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Today's Meals</CardTitle>
                  <Utensils className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">405</div>
                  <p className="text-xs text-muted-foreground">Breakfast, Lunch, Dinner</p>
                </CardContent>
              </Card>
              <Card
                className={`hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${animateStats ? "animate-fade-in" : ""}`}
                style={{ animationDelay: "200ms" }}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Food Waste</CardTitle>
                  <TrendingDown className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1.9kg</div>
                  <p className="text-xs text-green-600">-23% from last week</p>
                </CardContent>
              </Card>
              <Card
                className={`hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${animateStats ? "animate-fade-in" : ""}`}
                style={{ animationDelay: "300ms" }}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.7/5</div>
                  <p className="text-xs text-muted-foreground">Student rating</p>
                </CardContent>
              </Card>
            </div>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-500" />
                  Monthly Achievements
                </CardTitle>
                <CardDescription>Track your hostel management milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {monthlyAchievements.map((achievement, index) => {
                    const Icon = achievement.icon
                    return (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border transition-all duration-300 hover:scale-105 ${
                          achievement.achieved
                            ? "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800"
                            : "bg-gray-50 dark:bg-gray-950 border-gray-200 dark:border-gray-800 opacity-60"
                        }`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Icon className={`h-4 w-4 ${achievement.achieved ? "text-green-600" : "text-gray-400"}`} />
                          <span className="text-sm font-medium">{achievement.title}</span>
                          {achievement.achieved && <CheckCircle className="h-3 w-3 text-green-500 ml-auto" />}
                        </div>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ChefHat className="h-5 w-5" />
                      Today's Indian Menu
                    </CardTitle>
                    <CardDescription>Authentic Indian meals for hostel residents</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mealPlans
                        .filter((meal) => meal.status === "active")
                        .map((meal, index) => (
                          <div
                            key={meal.id}
                            className="border rounded-lg p-4 hover:bg-muted/50 transition-all duration-300 hover:scale-102"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h4 className="font-medium">{meal.day}</h4>
                                <p className="text-sm text-muted-foreground">{meal.date}</p>
                                <p className="text-xs text-muted-foreground">{meal.hostelName}</p>
                              </div>
                              <Badge className={`${getWasteColor(meal.wasteLevel)} animate-pulse`}>
                                {meal.wasteLevel} waste
                              </Badge>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="flex items-start gap-2">
                                <Apple className="h-4 w-4 text-orange-500 mt-1" />
                                <div>
                                  <p className="text-xs text-muted-foreground">Breakfast</p>
                                  <p className="text-sm font-medium">{meal.breakfast}</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <Utensils className="h-4 w-4 text-green-500 mt-1" />
                                <div>
                                  <p className="text-xs text-muted-foreground">Lunch</p>
                                  <p className="text-sm font-medium">{meal.lunch}</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <ChefHat className="h-4 w-4 text-red-500 mt-1" />
                                <div>
                                  <p className="text-xs text-muted-foreground">Dinner</p>
                                  <p className="text-sm font-medium">{meal.dinner}</p>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-between items-center mt-3 pt-3 border-t">
                              <span className="text-sm text-muted-foreground">Expected: {meal.students} students</span>
                              <span className="text-sm font-medium">{meal.calories} cal/person</span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Kitchen Staff
                    </CardTitle>
                    <CardDescription>Your culinary team</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {hostelStaff.map((staff, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-all duration-300 hover:scale-102"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <ChefHat className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{staff.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {staff.role} • {staff.experience}
                            </p>
                            <p className="text-xs text-muted-foreground">Specialty: {staff.specialty}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500" />
                            <span className="text-xs font-medium">{staff.rating}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle>Dietary Requirements</CardTitle>
                    <CardDescription>Special dietary needs in Indian hostels</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {dietaryRequirements.map((req, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between hover:scale-105 transition-transform duration-300"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <span className="text-sm">{req.type}</span>
                          <Badge className={`${req.color} animate-pulse`}>{req.count} students</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle>Portion Preferences</CardTitle>
                    <CardDescription>Student portion size distribution</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {portionSizes.map((portion, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{portion.size}</span>
                            <span>
                              {portion.students} students ({portion.percentage}%)
                            </span>
                          </div>
                          <Progress value={portion.percentage} className="h-2 transition-all duration-500" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="meal-planning" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Indian Meal Planning</h2>
                <p className="text-muted-foreground">Plan nutritious and authentic Indian meals</p>
              </div>
              <Button
                onClick={() => setShowMealForm(true)}
                className="hover:scale-105 transition-transform duration-300"
              >
                <Plus className="h-4 w-4 mr-2" />
                Plan New Meal
              </Button>
            </div>

            {showMealForm && (
              <Card className="animate-scale-in">
                <CardHeader>
                  <CardTitle>Plan New Indian Meal</CardTitle>
                  <CardDescription>Create a sustainable Indian meal plan for hostel residents</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newMeal.date}
                        onChange={(e) => setNewMeal({ ...newMeal, date: e.target.value })}
                        className="transition-all duration-300 focus:scale-105"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="students">Expected Students</Label>
                      <Input
                        id="students"
                        type="number"
                        value={newMeal.expectedStudents}
                        onChange={(e) => setNewMeal({ ...newMeal, expectedStudents: e.target.value })}
                        placeholder="135"
                        className="transition-all duration-300 focus:scale-105"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="breakfast">Breakfast (Indian)</Label>
                    <Textarea
                      id="breakfast"
                      value={newMeal.breakfast}
                      onChange={(e) => setNewMeal({ ...newMeal, breakfast: e.target.value })}
                      placeholder="e.g., Poha with green chutney and masala chai"
                      rows={2}
                      className="transition-all duration-300 focus:scale-105"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lunch">Lunch (Indian)</Label>
                    <Textarea
                      id="lunch"
                      value={newMeal.lunch}
                      onChange={(e) => setNewMeal({ ...newMeal, lunch: e.target.value })}
                      placeholder="e.g., Dal tadka, jeera rice, mixed vegetable sabzi, roti, pickle"
                      rows={2}
                      className="transition-all duration-300 focus:scale-105"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dinner">Dinner (Indian)</Label>
                    <Textarea
                      id="dinner"
                      value={newMeal.dinner}
                      onChange={(e) => setNewMeal({ ...newMeal, dinner: e.target.value })}
                      placeholder="e.g., Rajma curry, steamed rice, aloo gobi, papad"
                      rows={2}
                      className="transition-all duration-300 focus:scale-105"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleCreateMeal} className="hover:scale-105 transition-transform duration-300">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Create Meal Plan
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowMealForm(false)}
                      className="hover:scale-105 transition-transform duration-300"
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mealPlans.map((meal, index) => (
                <Card
                  key={meal.id}
                  className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{meal.day}</CardTitle>
                        <CardDescription>{meal.date}</CardDescription>
                        <p className="text-xs text-muted-foreground mt-1">{meal.hostelName}</p>
                      </div>
                      <Badge variant={meal.status === "active" ? "default" : "secondary"} className="animate-pulse">
                        {meal.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Apple className="h-4 w-4 text-orange-500" />
                          <span className="text-sm font-medium">Breakfast</span>
                        </div>
                        <p className="text-sm text-muted-foreground pl-6">{meal.breakfast}</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Utensils className="h-4 w-4 text-green-500" />
                          <span className="text-sm font-medium">Lunch</span>
                        </div>
                        <p className="text-sm text-muted-foreground pl-6">{meal.lunch}</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <ChefHat className="h-4 w-4 text-red-500" />
                          <span className="text-sm font-medium">Dinner</span>
                        </div>
                        <p className="text-sm text-muted-foreground pl-6">{meal.dinner}</p>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t">
                        <Badge className={getWasteColor(meal.wasteLevel)}>{meal.wasteLevel} waste</Badge>
                        <span className="text-sm text-muted-foreground">{meal.students} students</span>
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
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Nutrition Tab */}
          <TabsContent value="nutrition" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Nutrition Analytics</h2>
              <p className="text-muted-foreground">Monitor nutritional balance and goals</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Protein</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Goal: {nutritionStats.proteinGoal}g</span>
                      <span>Actual: {nutritionStats.proteinActual}g</span>
                    </div>
                    <Progress
                      value={(nutritionStats.proteinActual / nutritionStats.proteinGoal) * 100}
                      className="h-2"
                    />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Carbohydrates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Goal: {nutritionStats.carbGoal}%</span>
                      <span>Actual: {nutritionStats.carbActual}%</span>
                    </div>
                    <Progress value={(nutritionStats.carbActual / nutritionStats.carbGoal) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Fats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Goal: {nutritionStats.fatGoal}%</span>
                      <span>Actual: {nutritionStats.fatActual}%</span>
                    </div>
                    <Progress value={(nutritionStats.fatActual / nutritionStats.fatGoal) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Fiber</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Goal: {nutritionStats.fiberGoal}g</span>
                      <span>Actual: {nutritionStats.fiberActual}g</span>
                    </div>
                    <Progress value={(nutritionStats.fiberActual / nutritionStats.fiberGoal) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Nutrition Trends</CardTitle>
                  <CardDescription>Track nutritional balance over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average Calories</span>
                      <span className="font-bold">{nutritionStats.avgCalories}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Protein Balance</span>
                      <span className="font-bold text-orange-600">92%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Vegetable Intake</span>
                      <span className="font-bold text-green-600">105%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Whole Grains</span>
                      <span className="font-bold text-blue-600">88%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Meal Feedback</CardTitle>
                  <CardDescription>Student satisfaction and preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Overall Satisfaction</span>
                      <div className="flex items-center gap-2">
                        <Progress value={85} className="w-20 h-2" />
                        <span className="text-sm font-medium">85%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Breakfast Rating</span>
                      <div className="flex items-center gap-2">
                        <Progress value={78} className="w-20 h-2" />
                        <span className="text-sm font-medium">78%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Lunch Rating</span>
                      <div className="flex items-center gap-2">
                        <Progress value={92} className="w-20 h-2" />
                        <span className="text-sm font-medium">92%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Dinner Rating</span>
                      <div className="flex items-center gap-2">
                        <Progress value={88} className="w-20 h-2" />
                        <span className="text-sm font-medium">88%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="waste-tracking" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Food Waste Tracking</h2>
              <p className="text-muted-foreground">Monitor and reduce food waste in Indian hostels</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card
                className={`hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${animateStats ? "animate-fade-in" : ""}`}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <TrendingDown className="h-4 w-4 text-green-500" />
                    Today's Waste
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1.9 kg</div>
                  <p className="text-xs text-green-600">-23% from yesterday</p>
                </CardContent>
              </Card>
              <Card
                className={`hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${animateStats ? "animate-fade-in" : ""}`}
                style={{ animationDelay: "100ms" }}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-blue-500" />
                    Weekly Average
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2.1 kg</div>
                  <p className="text-xs text-muted-foreground">Per day</p>
                </CardContent>
              </Card>
              <Card
                className={`hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${animateStats ? "animate-fade-in" : ""}`}
                style={{ animationDelay: "200ms" }}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    Waste Reduction
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">28%</div>
                  <p className="text-xs text-green-600">This month</p>
                </CardContent>
              </Card>
            </div>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle>Daily Waste Tracking</CardTitle>
                <CardDescription>Food waste levels over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {wasteData.map((day, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-all duration-300 hover:scale-102"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            day.percentage <= 70
                              ? "bg-green-500 animate-pulse"
                              : day.percentage <= 100
                                ? "bg-yellow-500 animate-pulse"
                                : "bg-red-500 animate-pulse"
                          }`}
                        />
                        <div>
                          <p className="font-medium">{day.day}</p>
                          <p className="text-sm text-muted-foreground">
                            {day.date} • Target: {day.target} kg
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{day.amount} kg</p>
                        <p className="text-sm text-muted-foreground">{day.percentage}% of target</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle>Indian Food Waste Categories</CardTitle>
                  <CardDescription>Breakdown of food waste types in Indian meals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Rice & Grains</span>
                      <div className="flex items-center gap-2">
                        <Progress value={32} className="w-20 h-2" />
                        <span className="text-sm font-medium">32%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Vegetables & Sabzi</span>
                      <div className="flex items-center gap-2">
                        <Progress value={28} className="w-20 h-2" />
                        <span className="text-sm font-medium">28%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Dal & Curry</span>
                      <div className="flex items-center gap-2">
                        <Progress value={25} className="w-20 h-2" />
                        <span className="text-sm font-medium">25%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Roti & Bread</span>
                      <div className="flex items-center gap-2">
                        <Progress value={15} className="w-20 h-2" />
                        <span className="text-sm font-medium">15%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle>Waste Reduction Tips</CardTitle>
                  <CardDescription>Indian hostel-specific suggestions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Portion Control for Thali</p>
                        <p className="text-xs text-muted-foreground">Offer small, medium, large thali options</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Leftover Dal Management</p>
                        <p className="text-xs text-muted-foreground">Convert leftover dal into dal paratha</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Regional Preference Survey</p>
                        <p className="text-xs text-muted-foreground">
                          Ask students about North/South Indian preferences
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Sparkles className="h-4 w-4 text-purple-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Composting Program</p>
                        <p className="text-xs text-muted-foreground">Convert food waste to organic fertilizer</p>
                      </div>
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
