"use client"

import { useState, useEffect, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ArrowLeft,
  Heart,
  Zap,
  Shield,
  TrendingUp,
  Lightbulb,
  Star,
  Award,
  Trophy,
  Sparkles,
  Target,
  Gift,
} from "lucide-react"
import Link from "next/link"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { HealthAvatar } from "@/components/health-avatar"
import { SuggestionCard } from "@/components/suggestion-card"
import { AnimatedPieChart } from "@/components/animated-chart"
import { FloatingIngredients } from "@/components/floating-ingredients"
import { ProgressRing } from "@/components/progress-ring"
import { NutritionMeter } from "@/components/nutrition-meter"

const calculateHealthScore = (nutrition: any, ingredients: any[]) => {
  let score = 0
  const maxScore = 100

  // Protein adequacy (20 points)
  const proteinScore = Math.min((nutrition.protein / 25) * 20, 20)
  score += proteinScore

  // Fiber content (20 points)
  const fiberScore = Math.min((nutrition.fiber / 15) * 20, 20)
  score += fiberScore

  // Calorie balance (20 points) - ideal range 400-600 for a meal
  const calorieScore =
    nutrition.calories >= 400 && nutrition.calories <= 600
      ? 20
      : nutrition.calories < 400
        ? (nutrition.calories / 400) * 20
        : nutrition.calories > 600
          ? Math.max(0, 20 - ((nutrition.calories - 600) / 100) * 5)
          : 0
  score += calorieScore

  // Variety bonus (20 points) - different food categories
  const categories = new Set(ingredients.map((ing) => ing.category))
  const varietyScore = (categories.size / 4) * 20
  score += varietyScore

  // Vegetable inclusion (20 points)
  const hasVegetables = ingredients.some((ing) => ing.category === "vegetables")
  const vegetableScore = hasVegetables ? 20 : 0
  score += vegetableScore

  return Math.round(score)
}

const getHealthGrade = (score: number) => {
  if (score >= 90) return { grade: "A+", color: "text-green-600", bg: "bg-green-100", emoji: "🏆" }
  if (score >= 80) return { grade: "A", color: "text-green-600", bg: "bg-green-100", emoji: "⭐" }
  if (score >= 70) return { grade: "B+", color: "text-blue-600", bg: "bg-blue-100", emoji: "👍" }
  if (score >= 60) return { grade: "B", color: "text-blue-600", bg: "bg-blue-100", emoji: "👌" }
  if (score >= 50) return { grade: "C", color: "text-yellow-600", bg: "bg-yellow-100", emoji: "🤔" }
  return { grade: "D", color: "text-red-600", bg: "bg-red-100", emoji: "💪" }
}

const generateSuggestions = (nutrition: any, ingredients: any[], healthScore: number) => {
  const suggestions = []

  if (nutrition.protein < 20) {
    suggestions.push({
      type: "protein",
      title: "Boost Your Protein Power! 💪",
      description:
        "Your meal needs more protein for muscle health and sustained energy. Protein helps you feel full longer!",
      impact: "+15 Health Points",
      icon: "💪",
      ingredients: ["Moong Dal", "Paneer", "Greek Yogurt", "Chickpeas"],
      healthBenefit: "Supports muscle growth and keeps you satisfied longer",
      priority: "high",
    })
  }

  if (nutrition.fiber < 10) {
    suggestions.push({
      type: "fiber",
      title: "Add Fiber for Digestive Health! 🌾",
      description: "Increase fiber intake for better digestion and heart health. Fiber also helps control blood sugar!",
      impact: "+12 Health Points",
      icon: "🌾",
      ingredients: ["Brown Rice", "Whole Wheat Roti", "Mixed Vegetables", "Oats"],
      healthBenefit: "Improves digestion and helps maintain healthy cholesterol levels",
      priority: "medium",
    })
  }

  if (!ingredients.some((ing) => ing.category === "vegetables")) {
    suggestions.push({
      type: "vegetables",
      title: "Include Colorful Vegetables! 🥬",
      description: "Vegetables provide essential vitamins, minerals, and antioxidants that your body needs daily.",
      impact: "+20 Health Points",
      icon: "🥬",
      ingredients: ["Spinach", "Carrots", "Bell Peppers", "Broccoli"],
      healthBenefit: "Rich in vitamins A, C, and K plus powerful antioxidants",
      priority: "high",
    })
  }

  if (nutrition.calories > 600) {
    suggestions.push({
      type: "calories",
      title: "Perfect Your Portions! ⚖️",
      description: "Consider reducing portion sizes to maintain an ideal calorie range for better weight management.",
      impact: "+8 Health Points",
      icon: "⚖️",
      healthBenefit: "Helps maintain healthy weight and prevents overeating",
      priority: "low",
    })
  }

  if (nutrition.calories < 400) {
    suggestions.push({
      type: "calories",
      title: "Fuel Up Your Meal! 🍽️",
      description: "Your meal might be too light. Add healthy, nutrient-dense foods to meet your energy needs.",
      impact: "+10 Health Points",
      icon: "🍽️",
      ingredients: ["Nuts", "Seeds", "Avocado", "Healthy Oils"],
      healthBenefit: "Provides sustained energy and essential fatty acids",
      priority: "medium",
    })
  }

  const categories = new Set(ingredients.map((ing) => ing.category))
  if (categories.size < 3) {
    suggestions.push({
      type: "variety",
      title: "Rainbow Your Plate! 🌈",
      description: "Include items from different food groups for a complete nutritional profile and better taste!",
      impact: "+15 Health Points",
      icon: "🌈",
      ingredients: ["Different Colors", "Various Textures", "Mixed Food Groups"],
      healthBenefit: "Ensures comprehensive nutrition and prevents deficiencies",
      priority: "medium",
    })
  }

  // Add positive reinforcement suggestions for good choices
  if (healthScore >= 80) {
    suggestions.push({
      type: "achievement",
      title: "Excellent Food Choices! 🏆",
      description: "You're doing great! Your meal shows excellent nutritional balance and variety.",
      impact: "Keep it up!",
      icon: "🏆",
      healthBenefit: "Maintaining this pattern supports long-term health goals",
      priority: "celebration",
    })
  }

  return suggestions
}

export default function NutritionAnalysis() {
  const searchParams = useSearchParams()
  const [mealData, setMealData] = useState<any[]>([])
  const [nutrition, setNutrition] = useState({ calories: 0, protein: 0, carbs: 0, fiber: 0 })
  const [healthScore, setHealthScore] = useState(0)
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [animationStep, setAnimationStep] = useState(0)
  const [isGameMode, setIsGameMode] = useState(false)
  const [pointsEarned, setPointsEarned] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)

  const mealParam = useMemo(() => searchParams.get("meal"), [searchParams])
  const gameParam = useMemo(() => searchParams.get("game"), [searchParams])
  const cuisineParam = useMemo(() => searchParams.get("cuisine"), [searchParams])

  useEffect(() => {
    setIsGameMode(gameParam === "true")

    if (mealParam) {
      try {
        const ingredients = JSON.parse(decodeURIComponent(mealParam))
        setMealData(ingredients)

        const totalNutrition = ingredients.reduce(
          (total: any, ingredient: any) => ({
            calories: total.calories + ingredient.calories,
            protein: total.protein + ingredient.protein,
            carbs: total.carbs + ingredient.carbs,
            fiber: total.fiber + ingredient.fiber,
          }),
          { calories: 0, protein: 0, carbs: 0, fiber: 0 },
        )

        setNutrition(totalNutrition)

        const score = calculateHealthScore(totalNutrition, ingredients)
        setHealthScore(score)

        if (gameParam === "true") {
          const basePoints = 75
          const bonusPoints = Math.floor(score * 0.5) // Up to 50 bonus points
          setPointsEarned(basePoints + bonusPoints)

          if (score >= 80) {
            setShowCelebration(true)
            setTimeout(() => setShowCelebration(false), 3000)
          }
        }

        const mealSuggestions = generateSuggestions(totalNutrition, ingredients, score)
        setSuggestions(mealSuggestions)

        // Animate the analysis
        setTimeout(() => setAnimationStep(1), 500)
        setTimeout(() => setAnimationStep(2), 1000)
        setTimeout(() => setAnimationStep(3), 1500)
      } catch (error) {
        console.error("Error parsing meal data:", error)
      }
    }
  }, [mealParam, gameParam, cuisineParam]) // Use memoized values as dependencies

  const healthGrade = getHealthGrade(healthScore)

  // Data for charts
  const nutritionData = [
    { name: "Protein", value: nutrition.protein, color: "#10b981" },
    { name: "Carbs", value: nutrition.carbs, color: "#3b82f6" },
    { name: "Fiber", value: nutrition.fiber, color: "#f59e0b" },
    {
      name: "Other",
      value: Math.max(0, nutrition.calories - nutrition.protein * 4 - nutrition.carbs * 4),
      color: "#6b7280",
    },
  ]

  const healthMetrics = [{ name: "Health Score", value: healthScore, max: 100, color: "#10b981" }]

  const categoryBreakdown = mealData.reduce((acc, ingredient) => {
    const category = ingredient.category
    if (!acc[category]) {
      acc[category] = { name: category, calories: 0, count: 0 }
    }
    acc[category].calories += ingredient.calories
    acc[category].count += 1
    return acc
  }, {} as any)

  const categoryData = Object.values(categoryBreakdown).map((cat: any) => ({
    name: cat.name.charAt(0).toUpperCase() + cat.name.slice(1),
    calories: cat.calories,
    count: cat.count,
  }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-green-950 dark:via-blue-950 dark:to-purple-950 relative">
      <FloatingIngredients ingredients={mealData} />

      {showCelebration && isGameMode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
          <Card className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white border-0 shadow-2xl max-w-md mx-4">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4 animate-bounce">🎉</div>
              <h2 className="text-2xl font-bold mb-2">Fantastic Job!</h2>
              <p className="text-lg mb-4">You created a super healthy meal!</p>
              <div className="flex items-center justify-center gap-4">
                <Badge className="bg-white/20 text-white px-4 py-2 text-lg">
                  <Trophy className="h-5 w-5 mr-2" />
                  {pointsEarned} Points!
                </Badge>
                <Badge className="bg-white/20 text-white px-4 py-2 text-lg">
                  <Star className="h-5 w-5 mr-2" />
                  Grade {healthGrade.grade}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href={isGameMode ? "/meal-planner" : "/meal-builder"}>
              <Button variant="ghost" size="sm" className="hover:scale-110 transition-transform">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {isGameMode ? "Back to Game" : "Back to Builder"}
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                {isGameMode ? "Health Analysis Game" : "Nutrition Analysis"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isGameMode && (
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-3 py-1">
                <Gift className="h-4 w-4 mr-1" />
                {pointsEarned} Points Earned!
              </Badge>
            )}
            <Badge variant="secondary" className={`${healthGrade.bg} ${healthGrade.color} font-bold px-3 py-1`}>
              {healthGrade.emoji} Grade: {healthGrade.grade}
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        <div className="text-center mb-12">
          <div
            className={`transition-all duration-1000 ${animationStep >= 1 ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
          >
            <HealthAvatar healthScore={healthScore} animated={animationStep >= 1} />
          </div>

          <div
            className={`flex justify-center mb-6 mt-4 transition-all duration-1000 ${animationStep >= 1 ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
          >
            <ProgressRing
              progress={healthScore}
              size={160}
              strokeWidth={14}
              color={
                healthGrade.color.includes("green")
                  ? "#10b981"
                  : healthGrade.color.includes("blue")
                    ? "#3b82f6"
                    : healthGrade.color.includes("yellow")
                      ? "#f59e0b"
                      : "#ef4444"
              }
              label="Health Score"
              animated={animationStep >= 1}
            />
          </div>

          <h1
            className={`text-4xl font-bold mb-4 transition-all duration-1000 delay-300 ${animationStep >= 2 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          >
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {isGameMode ? "🎮 Your Meal Analysis Results!" : "Your Meal Analysis"}
            </span>
          </h1>
          <p
            className={`text-muted-foreground text-xl transition-all duration-1000 delay-500 ${animationStep >= 3 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          >
            {isGameMode
              ? "Comprehensive nutritional breakdown with fun insights and rewards!"
              : "Comprehensive nutritional breakdown and health insights"}
          </p>

          {isGameMode && animationStep >= 3 && (
            <div
              className="flex items-center justify-center gap-4 mt-6 animate-fade-in-up"
              style={{ animationDelay: "800ms" }}
            >
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 text-lg hover:scale-105 transition-transform">
                <Trophy className="h-5 w-5 mr-2" />
                {pointsEarned} Points
              </Badge>
              <Badge className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-4 py-2 text-lg hover:scale-105 transition-transform">
                <Target className="h-5 w-5 mr-2" />
                Level Complete
              </Badge>
              <Badge className="bg-gradient-to-r from-green-400 to-teal-500 text-white px-4 py-2 text-lg hover:scale-105 transition-transform">
                <Star className="h-5 w-5 mr-2" />
                Grade {healthGrade.grade}
              </Badge>
            </div>
          )}
        </div>

        <Card className="mb-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-orange-100 via-red-100 to-pink-100 dark:from-orange-900 dark:via-red-900 dark:to-pink-900">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <span className="text-3xl">🍽️</span>
              Your Perfect {isGameMode ? "Game" : ""} Thali
            </CardTitle>
            <CardDescription className="text-lg">
              {mealData.length} carefully selected ingredients for optimal nutrition
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {mealData.map((ingredient, index) => (
                <div key={index} className="text-center group" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl animate-fade-in-up border-4 border-white shadow-lg">
                      <img
                        src={ingredient.image || "/placeholder.svg"}
                        alt={ingredient.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-bold">✓</span>
                    </div>
                  </div>
                  <p className="text-sm font-medium group-hover:text-primary transition-colors">{ingredient.name}</p>
                  <p className="text-xs text-muted-foreground">{ingredient.calories} cal</p>
                  <Badge variant="outline" className="text-xs mt-1 capitalize">
                    {ingredient.category}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Nutrition Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Macronutrient Breakdown */}
          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Macronutrient Breakdown
              </CardTitle>
              <CardDescription>Distribution of proteins, carbs, and fiber</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <AnimatedPieChart data={nutritionData} delay={800} />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {nutritionData.slice(0, 3).map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 animate-fade-in-right"
                    style={{ animationDelay: `${1200 + index * 200}ms` }}
                  >
                    <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm">
                      {item.name}: {item.value}g
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Health Score Gauge */}
          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Health Score Analysis
              </CardTitle>
              <CardDescription>Overall nutritional quality assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center">
                <ProgressRing
                  progress={healthScore}
                  size={180}
                  strokeWidth={16}
                  color={
                    healthGrade.color.includes("green")
                      ? "#10b981"
                      : healthGrade.color.includes("blue")
                        ? "#3b82f6"
                        : healthGrade.color.includes("yellow")
                          ? "#f59e0b"
                          : "#ef4444"
                  }
                  animated={animationStep >= 2}
                />
              </div>
              <div className="text-center mt-4">
                <Badge className={`${healthGrade.bg} ${healthGrade.color} text-lg px-4 py-2 animate-pulse`}>
                  {healthGrade.emoji} Grade: {healthGrade.grade}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category Breakdown */}
        <Card className="mb-8 hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Food Category Analysis
            </CardTitle>
            <CardDescription>Calorie distribution across food categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [`${value} calories`, "Calories"]} />
                  <Bar
                    dataKey="calories"
                    fill="#10b981"
                    radius={[4, 4, 0, 0]}
                    animationBegin={1500}
                    animationDuration={1000}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8 hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Detailed Nutrition Facts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <NutritionMeter label="Total Calories" value={nutrition.calories} target={600} unit="" delay={0} />
              <NutritionMeter label="Protein" value={nutrition.protein} target={25} unit="g" delay={200} />
              <NutritionMeter label="Carbohydrates" value={nutrition.carbs} target={80} unit="g" delay={400} />
              <NutritionMeter label="Dietary Fiber" value={nutrition.fiber} target={15} unit="g" delay={600} />
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Suggestions */}
        {suggestions.length > 0 && (
          <Card className="mb-8 hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                {isGameMode ? "🤖 Your AI Nutrition Coach" : "Your Personal Nutrition Coach"}
              </CardTitle>
              <CardDescription>
                {isGameMode
                  ? "Game-powered suggestions to level up your meal's health benefits!"
                  : "AI-powered suggestions to optimize your meal's health benefits"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {suggestions.slice(0, 4).map((suggestion, index) => (
                  <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${2000 + index * 200}ms` }}>
                    <SuggestionCard
                      suggestion={suggestion}
                      onApply={() => {
                        console.log("Applied suggestion:", suggestion.title)
                      }}
                    />
                  </div>
                ))}
              </div>
              {suggestions.length > 4 && (
                <div className="text-center mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setShowSuggestions(true)}
                    className="hover:scale-105 transition-transform duration-200 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    View All {suggestions.length} Suggestions
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
          style={{ animationDelay: "2800ms" }}
        >
          <Dialog open={showSuggestions} onOpenChange={setShowSuggestions}>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="flex items-center gap-2 hover:scale-105 transition-transform duration-200 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Lightbulb className="h-5 w-5" />
                {isGameMode ? "🎯 Power-Up Suggestions" : "View All Suggestions"}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-2xl">
                  <Star className="h-6 w-6" />
                  {isGameMode ? "🚀 Level Up Your Meal!" : "Improve Your Meal"}
                </DialogTitle>
                <DialogDescription className="text-lg">
                  {isGameMode
                    ? "Complete these challenges to earn bonus health points and unlock achievements!"
                    : "Here are personalized suggestions to make your meal even healthier"}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="p-6 border rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-4xl animate-bounce" style={{ animationDelay: `${index * 100}ms` }}>
                        {suggestion.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-xl mb-3">{suggestion.title}</h4>
                        <p className="text-muted-foreground mb-4 text-lg">{suggestion.description}</p>
                        {suggestion.ingredients && (
                          <div className="mb-4">
                            <p className="font-medium mb-2">💡 Try adding:</p>
                            <div className="flex flex-wrap gap-2">
                              {suggestion.ingredients.map((ingredient: string, idx: number) => (
                                <Badge key={idx} variant="outline" className="hover:scale-105 transition-transform">
                                  {ingredient}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        <div className="flex items-center gap-3 flex-wrap">
                          <Badge
                            variant="outline"
                            className={`text-green-600 border-green-600 px-3 py-1 ${suggestion.priority === "high" ? "animate-pulse" : ""}`}
                          >
                            {suggestion.impact}
                          </Badge>
                          <Badge variant="secondary" className="capitalize px-3 py-1">
                            {suggestion.type}
                          </Badge>
                          {suggestion.priority === "high" && (
                            <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 px-3 py-1">
                              High Priority
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-3 italic">🌟 {suggestion.healthBenefit}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            size="lg"
            onClick={() => (window.location.href = isGameMode ? "/meal-planner" : "/meal-builder")}
            className="hover:scale-105 transition-transform duration-200"
          >
            <Award className="h-5 w-5 mr-2" />
            {isGameMode ? "🎮 Play Again" : "Create New Meal"}
          </Button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out both;
        }
        
        .animate-fade-in-right {
          animation: fade-in-right 0.6s ease-out both;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out both;
        }
      `}</style>
    </div>
  )
}
