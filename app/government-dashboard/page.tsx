"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { TrendingUp, School, Users, Recycle, Award } from "lucide-react"

// Mock data for school progress
const schoolsData = [
  {
    name: "St. Xavier's High School",
    city: "Mumbai",
    state: "Maharashtra",
    students: 1200,
    recyclingScore: 85,
    wasteReduction: 78,
    energyEfficiency: 92,
    overallScore: 85,
    monthlyProgress: [
      { month: "Jan", score: 75 },
      { month: "Feb", score: 78 },
      { month: "Mar", score: 82 },
      { month: "Apr", score: 85 },
    ],
    categories: {
      "Waste Management": 88,
      "Energy Conservation": 92,
      "Water Conservation": 80,
      "Green Initiatives": 85,
    },
  },
  {
    name: "Cathedral & John Connon School",
    city: "Mumbai",
    state: "Maharashtra",
    students: 950,
    recyclingScore: 92,
    wasteReduction: 88,
    energyEfficiency: 85,
    overallScore: 88,
    monthlyProgress: [
      { month: "Jan", score: 82 },
      { month: "Feb", score: 85 },
      { month: "Mar", score: 87 },
      { month: "Apr", score: 88 },
    ],
    categories: {
      "Waste Management": 92,
      "Energy Conservation": 85,
      "Water Conservation": 90,
      "Green Initiatives": 88,
    },
  },
  {
    name: "Bombay Scottish School",
    city: "Mumbai",
    state: "Maharashtra",
    students: 800,
    recyclingScore: 76,
    wasteReduction: 82,
    energyEfficiency: 79,
    overallScore: 79,
    monthlyProgress: [
      { month: "Jan", score: 72 },
      { month: "Feb", score: 75 },
      { month: "Mar", score: 77 },
      { month: "Apr", score: 79 },
    ],
    categories: {
      "Waste Management": 76,
      "Energy Conservation": 79,
      "Water Conservation": 82,
      "Green Initiatives": 78,
    },
  },
  {
    name: "Dhirubhai Ambani International School",
    city: "Mumbai",
    state: "Maharashtra",
    students: 1500,
    recyclingScore: 94,
    wasteReduction: 91,
    energyEfficiency: 96,
    overallScore: 94,
    monthlyProgress: [
      { month: "Jan", score: 88 },
      { month: "Feb", score: 90 },
      { month: "Mar", score: 92 },
      { month: "Apr", score: 94 },
    ],
    categories: {
      "Waste Management": 94,
      "Energy Conservation": 96,
      "Water Conservation": 92,
      "Green Initiatives": 95,
    },
  },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function GovernmentDashboard() {
  const [selectedState, setSelectedState] = useState("Maharashtra")
  const [selectedCity, setSelectedCity] = useState("Mumbai")

  const filteredSchools = useMemo(() => {
    return schoolsData.filter((school) => school.state === selectedState && school.city === selectedCity)
  }, [selectedState, selectedCity])

  const cityStats = useMemo(() => {
    const totalStudents = filteredSchools.reduce((sum, school) => sum + school.students, 0)
    const avgOverallScore =
      filteredSchools.reduce((sum, school) => sum + school.overallScore, 0) / filteredSchools.length
    const avgRecyclingScore =
      filteredSchools.reduce((sum, school) => sum + school.recyclingScore, 0) / filteredSchools.length
    const avgWasteReduction =
      filteredSchools.reduce((sum, school) => sum + school.wasteReduction, 0) / filteredSchools.length

    return {
      totalStudents,
      avgOverallScore: Math.round(avgOverallScore),
      avgRecyclingScore: Math.round(avgRecyclingScore),
      avgWasteReduction: Math.round(avgWasteReduction),
      totalSchools: filteredSchools.length,
    }
  }, [filteredSchools])

  const comparisonData = filteredSchools.map((school) => ({
    name: school.name.split(" ")[0] + " " + school.name.split(" ")[1], // Shortened name
    overall: school.overallScore,
    recycling: school.recyclingScore,
    waste: school.wasteReduction,
    energy: school.energyEfficiency,
  }))

  const categoryData = Object.entries(filteredSchools[0]?.categories || {}).map(([category, score]) => ({
    name: category,
    value: score,
  }))

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Government Dashboard</h1>
            <p className="text-muted-foreground">Environmental Progress Monitoring</p>
          </div>
          <Badge variant="secondary" className="px-4 py-2">
            <Award className="h-4 w-4 mr-2" />
            Verified Official Access
          </Badge>
        </div>

        {/* Location Selectors */}
        <div className="flex gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">State</label>
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                <SelectItem value="Karnataka">Karnataka</SelectItem>
                <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">City</label>
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mumbai">Mumbai</SelectItem>
                <SelectItem value="Pune">Pune</SelectItem>
                <SelectItem value="Nagpur">Nagpur</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* City Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Schools</CardTitle>
              <School className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{cityStats.totalSchools}</div>
              <p className="text-xs text-muted-foreground">Active in {selectedCity}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{cityStats.totalStudents.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Across all schools</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Overall Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{cityStats.avgOverallScore}%</div>
              <p className="text-xs text-green-600">+5% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Recycling Score</CardTitle>
              <Recycle className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{cityStats.avgRecyclingScore}%</div>
              <p className="text-xs text-blue-600">+3% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* School Comparison Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle>School Performance Comparison</CardTitle>
              <CardDescription>Overall environmental scores by school</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="overall" fill="#8884d8" name="Overall Score" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Category Breakdown Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Environmental Categories</CardTitle>
              <CardDescription>Average performance by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Detailed School Rankings */}
        <Card>
          <CardHeader>
            <CardTitle>School Rankings - {selectedCity}</CardTitle>
            <CardDescription>Detailed performance metrics for all schools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredSchools
                .sort((a, b) => b.overallScore - a.overallScore)
                .map((school, index) => (
                  <div key={school.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold">{school.name}</h3>
                        <p className="text-sm text-muted-foreground">{school.students} students</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{school.overallScore}%</div>
                        <div className="text-xs text-muted-foreground">Overall</div>
                      </div>

                      <div className="space-y-2 min-w-48">
                        <div className="flex justify-between text-sm">
                          <span>Recycling</span>
                          <span>{school.recyclingScore}%</span>
                        </div>
                        <Progress value={school.recyclingScore} className="h-2" />

                        <div className="flex justify-between text-sm">
                          <span>Waste Reduction</span>
                          <span>{school.wasteReduction}%</span>
                        </div>
                        <Progress value={school.wasteReduction} className="h-2" />

                        <div className="flex justify-between text-sm">
                          <span>Energy Efficiency</span>
                          <span>{school.energyEfficiency}%</span>
                        </div>
                        <Progress value={school.energyEfficiency} className="h-2" />
                      </div>

                      <Badge
                        variant={
                          school.overallScore >= 90 ? "default" : school.overallScore >= 80 ? "secondary" : "outline"
                        }
                      >
                        {school.overallScore >= 90
                          ? "Excellent"
                          : school.overallScore >= 80
                            ? "Good"
                            : "Needs Improvement"}
                      </Badge>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Progress Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Progress Trend</CardTitle>
            <CardDescription>City-wide environmental score progression</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={filteredSchools[0]?.monthlyProgress || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
