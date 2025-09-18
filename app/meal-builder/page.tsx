"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChefHat, ArrowLeft, Plus, Check, Sparkles, Trophy, Star } from "lucide-react"
import Link from "next/link"

const ingredientDatabase = {
  "north-indian": {
    grains: [
      {
        id: "roti",
        name: "Roti",
        image: "/placeholder-1xud0.png",
        calories: 120,
        protein: 4,
        carbs: 22,
        fiber: 3,
        category: "grains",
      },
      {
        id: "rice",
        name: "Basmati Rice",
        image: "/placeholder-ywl2y.png",
        calories: 150,
        protein: 3,
        carbs: 33,
        fiber: 1,
        category: "grains",
      },
      {
        id: "naan",
        name: "Naan",
        image: "/placeholder-6u72f.png",
        calories: 180,
        protein: 5,
        carbs: 30,
        fiber: 2,
        category: "grains",
      },
    ],
    proteins: [
      {
        id: "dal",
        name: "Dal (Lentils)",
        image: "/placeholder-ptn50.png",
        calories: 100,
        protein: 8,
        carbs: 15,
        fiber: 6,
        category: "proteins",
      },
      {
        id: "paneer",
        name: "Paneer Curry",
        image: "/placeholder-rp13f.png",
        calories: 200,
        protein: 12,
        carbs: 8,
        fiber: 2,
        category: "proteins",
      },
      {
        id: "chole",
        name: "Chole (Chickpeas)",
        image: "/placeholder-wnquo.png",
        calories: 180,
        protein: 10,
        carbs: 25,
        fiber: 8,
        category: "proteins",
      },
    ],
    vegetables: [
      {
        id: "aloo-gobi",
        name: "Aloo Gobi",
        image: "/images/aloo-gobi.jpg",
        calories: 120,
        protein: 3,
        carbs: 20,
        fiber: 4,
        category: "vegetables",
      },
      {
        id: "palak",
        name: "Palak Sabzi",
        image: "/placeholder-gc6al.png",
        calories: 80,
        protein: 4,
        carbs: 8,
        fiber: 3,
        category: "vegetables",
      },
      {
        id: "bhindi",
        name: "Bhindi Masala",
        image: "/placeholder-y2bp3.png",
        calories: 90,
        protein: 2,
        carbs: 12,
        fiber: 5,
        category: "vegetables",
      },
    ],
    sides: [
      {
        id: "raita",
        name: "Cucumber Raita",
        image: "/placeholder-6sjph.png",
        calories: 60,
        protein: 3,
        carbs: 6,
        fiber: 1,
        category: "sides",
      },
      {
        id: "pickle",
        name: "Mango Pickle",
        image: "/placeholder-t0gi3.png",
        calories: 30,
        protein: 0,
        carbs: 7,
        fiber: 1,
        category: "sides",
      },
      {
        id: "papad",
        name: "Roasted Papad",
        image: "/placeholder-8dd7n.png",
        calories: 40,
        protein: 2,
        carbs: 6,
        fiber: 1,
        category: "sides",
      },
    ],
  },
  "south-indian": {
    grains: [
      {
        id: "rice",
        name: "Steamed Rice",
        image: "/placeholder.svg?height=80&width=80",
        calories: 140,
        protein: 3,
        carbs: 30,
        fiber: 1,
        category: "grains",
      },
      {
        id: "dosa",
        name: "Plain Dosa",
        image: "/placeholder.svg?height=80&width=80",
        calories: 160,
        protein: 4,
        carbs: 28,
        fiber: 2,
        category: "grains",
      },
      {
        id: "idli",
        name: "Idli (2 pieces)",
        image: "/placeholder.svg?height=80&width=80",
        calories: 80,
        protein: 3,
        carbs: 15,
        fiber: 1,
        category: "grains",
      },
    ],
    proteins: [
      {
        id: "sambar",
        name: "Sambar",
        image: "/placeholder.svg?height=80&width=80",
        calories: 120,
        protein: 6,
        carbs: 18,
        fiber: 5,
        category: "proteins",
      },
      {
        id: "rasam",
        name: "Rasam",
        image: "/placeholder.svg?height=80&width=80",
        calories: 60,
        protein: 2,
        carbs: 10,
        fiber: 2,
        category: "proteins",
      },
      {
        id: "fish-curry",
        name: "Fish Curry",
        image: "/placeholder.svg?height=80&width=80",
        calories: 180,
        protein: 20,
        carbs: 8,
        fiber: 1,
        category: "proteins",
      },
    ],
    vegetables: [
      {
        id: "avial",
        name: "Avial",
        image: "/placeholder.svg?height=80&width=80",
        calories: 100,
        protein: 3,
        carbs: 15,
        fiber: 4,
        category: "vegetables",
      },
      {
        id: "poriyal",
        name: "Beans Poriyal",
        image: "/placeholder.svg?height=80&width=80",
        calories: 70,
        protein: 2,
        carbs: 10,
        fiber: 3,
        category: "vegetables",
      },
      {
        id: "kootu",
        name: "Cabbage Kootu",
        image: "/placeholder.svg?height=80&width=80",
        calories: 90,
        protein: 4,
        carbs: 12,
        fiber: 3,
        category: "vegetables",
      },
    ],
    sides: [
      {
        id: "coconut-chutney",
        name: "Coconut Chutney",
        image: "/placeholder.svg?height=80&width=80",
        calories: 80,
        protein: 2,
        carbs: 6,
        fiber: 2,
        category: "sides",
      },
      {
        id: "pickle",
        name: "Lime Pickle",
        image: "/placeholder.svg?height=80&width=80",
        calories: 25,
        protein: 0,
        carbs: 5,
        fiber: 1,
        category: "sides",
      },
      {
        id: "appalam",
        name: "Appalam",
        image: "/placeholder.svg?height=80&width=80",
        calories: 35,
        protein: 1,
        carbs: 5,
        fiber: 1,
        category: "sides",
      },
    ],
  },
}

const mealSteps = [
  { id: "grains", name: "Choose Your Base", description: "Select grains or main carbohydrates", icon: "🍚" },
  { id: "proteins", name: "Add Proteins", description: "Pick protein-rich dishes", icon: "🫘" },
  { id: "vegetables", name: "Include Vegetables", description: "Add nutritious vegetables", icon: "🥬" },
  { id: "sides", name: "Complete with Sides", description: "Finish with accompaniments", icon: "🥒" },
]

export default function MealBuilder() {
  const searchParams = useSearchParams()
  const cuisine = searchParams.get("cuisine") || "north-indian"
  const isGameMode = searchParams.get("game") === "true"
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedIngredients, setSelectedIngredients] = useState<any[]>([])
  const [mealComplete, setMealComplete] = useState(false)
  const [showIngredientAnimation, setShowIngredientAnimation] = useState(false)

  const currentCategory = mealSteps[currentStep]?.id
  const availableIngredients =
    ingredientDatabase[cuisine as keyof typeof ingredientDatabase]?.[
      currentCategory as keyof (typeof ingredientDatabase)["north-indian"]
    ] || []

  const handleIngredientSelect = (ingredient: any) => {
    setShowIngredientAnimation(true)
    setTimeout(() => setShowIngredientAnimation(false), 1000)

    setSelectedIngredients((prev) => [...prev, ingredient])

    if (currentStep < mealSteps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      setMealComplete(true)
    }
  }

  const getTotalNutrition = () => {
    return selectedIngredients.reduce(
      (total, ingredient) => ({
        calories: total.calories + ingredient.calories,
        protein: total.protein + ingredient.protein,
        carbs: total.carbs + ingredient.carbs,
        fiber: total.fiber + ingredient.fiber,
      }),
      { calories: 0, protein: 0, carbs: 0, fiber: 0 },
    )
  }

  const progress = ((currentStep + 1) / mealSteps.length) * 100

  if (mealComplete) {
    const nutrition = getTotalNutrition()
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-green-950 dark:via-blue-950 dark:to-purple-950 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <Trophy className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Fantastic! Meal Complete! 🎉
            </h1>
            <p className="text-muted-foreground text-lg">
              Your delicious {cuisine.replace("-", " ")} thali is ready for analysis
            </p>

            {isGameMode && (
              <div className="flex items-center justify-center gap-4 mt-4">
                <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 px-4 py-2">
                  <Star className="h-4 w-4 mr-1" />
                  +75 Points Earned!
                </Badge>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-4 py-2">
                  <Trophy className="h-4 w-4 mr-1" />
                  Level Complete
                </Badge>
              </div>
            )}
          </div>

          <Card className="mb-6 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900 dark:to-red-900">
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🍽️</span>
                Your Perfect Thali
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                {selectedIngredients.map((ingredient, index) => (
                  <div key={index} className="text-center group">
                    <div className="relative">
                      <img
                        src={ingredient.image || "/placeholder.svg"}
                        alt={ingredient.name}
                        className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    </div>
                    <p className="text-sm font-medium">{ingredient.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{ingredient.category}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">{nutrition.calories}</div>
                  <div className="text-sm text-muted-foreground">Calories</div>
                  <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2 mt-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${Math.min((nutrition.calories / 800) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">{nutrition.protein}g</div>
                  <div className="text-sm text-muted-foreground">Protein</div>
                  <div className="w-full bg-green-200 dark:bg-green-800 rounded-full h-2 mt-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${Math.min((nutrition.protein / 50) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-1">{nutrition.carbs}g</div>
                  <div className="text-sm text-muted-foreground">Carbs</div>
                  <div className="w-full bg-orange-200 dark:bg-orange-800 rounded-full h-2 mt-2">
                    <div
                      className="bg-orange-600 h-2 rounded-full"
                      style={{ width: `${Math.min((nutrition.carbs / 100) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">{nutrition.fiber}g</div>
                  <div className="text-sm text-muted-foreground">Fiber</div>
                  <div className="w-full bg-purple-200 dark:bg-purple-800 rounded-full h-2 mt-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${Math.min((nutrition.fiber / 25) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button
              size="lg"
              onClick={() => {
                const params = new URLSearchParams({
                  meal: JSON.stringify(selectedIngredients),
                  cuisine: cuisine,
                  ...(isGameMode && { game: "true" }),
                })
                window.location.href = `/nutrition-analysis?${params.toString()}`
              }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <Sparkles className="h-6 w-6 mr-2" />
              Get Detailed Health Analysis
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-green-950 dark:via-blue-950 dark:to-purple-950">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href={isGameMode ? "/meal-planner" : "/"}>
              <Button variant="ghost" size="sm" className="hover:scale-110 transition-transform">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <ChefHat className="h-6 w-6 text-primary" />
              <span className="font-semibold">Building Your Thali</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="capitalize">
              {cuisine.replace("-", " ")} Cuisine
            </Badge>
            {isGameMode && (
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Game Mode</Badge>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Enhanced Progress with animations */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Step {currentStep + 1} of {mealSteps.length}
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
              {isGameMode && (
                <Badge variant="outline" className="animate-pulse">
                  <Trophy className="h-3 w-3 mr-1" />
                  75 pts
                </Badge>
              )}
            </div>
          </div>
          <Progress value={progress} className="mb-6 h-3" />

          <div className="flex items-center gap-6 mb-6 p-4 bg-white/50 dark:bg-gray-900/50 rounded-xl backdrop-blur-sm">
            <div className="text-6xl animate-bounce">{currentCategory && mealSteps[currentStep].icon}</div>
            <div>
              <h3 className="text-2xl font-bold mb-2">{currentCategory && mealSteps[currentStep].name}</h3>
              <p className="text-muted-foreground text-lg">{currentCategory && mealSteps[currentStep].description}</p>
            </div>
          </div>
        </div>

        {/* Selected Ingredients with enhanced visuals */}
        {selectedIngredients.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-2xl">🍽️</span>
              Your Thali So Far:
            </h3>
            <div className="flex flex-wrap gap-3">
              {selectedIngredients.map((ingredient, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-2 px-3 py-2 text-sm hover:scale-105 transition-transform"
                >
                  <img
                    src={ingredient.image || "/placeholder.svg"}
                    alt={ingredient.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  {ingredient.name}
                  <span className="text-xs opacity-70 capitalize">({ingredient.category})</span>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Ingredient Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableIngredients.map((ingredient, index) => (
            <Card
              key={ingredient.id}
              className={`cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group overflow-hidden ${
                showIngredientAnimation ? "animate-pulse" : ""
              }`}
              onClick={() => handleIngredientSelect(ingredient)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="text-center pb-4">
                <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden group-hover:scale-110 transition-transform duration-300">
                  <img
                    src={ingredient.image || "/placeholder.svg"}
                    alt={ingredient.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
                  {ingredient.name}
                </CardTitle>
                <Badge variant="outline" className="capitalize text-xs">
                  {ingredient.category}
                </Badge>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                  <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg">
                    <div className="font-bold text-blue-600 text-lg">{ingredient.calories}</div>
                    <div className="text-xs text-muted-foreground">Calories</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-lg">
                    <div className="font-bold text-green-600 text-lg">{ingredient.protein}g</div>
                    <div className="text-xs text-muted-foreground">Protein</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 rounded-lg">
                    <div className="font-bold text-orange-600 text-lg">{ingredient.carbs}g</div>
                    <div className="text-xs text-muted-foreground">Carbs</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 rounded-lg">
                    <div className="font-bold text-purple-600 text-lg">{ingredient.fiber}g</div>
                    <div className="text-xs text-muted-foreground">Fiber</div>
                  </div>
                </div>
                <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 hover:scale-105">
                  <Plus className="h-4 w-4 mr-2" />
                  Add to Thali
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
