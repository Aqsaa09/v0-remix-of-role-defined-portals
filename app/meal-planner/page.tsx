"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChefHat, ArrowLeft, Play, Sparkles, Trophy, Heart, Globe } from "lucide-react"
import Link from "next/link"

const cuisineOptions = [
  // Asian Cuisines
  {
    id: "north-indian",
    name: "North Indian",
    region: "Asian",
    description: "Rich curries, rotis, and hearty dishes",
    difficulty: "Beginner",
  },
  {
    id: "south-indian",
    name: "South Indian",
    region: "Asian",
    description: "Rice-based meals with sambar and coconut flavors",
    difficulty: "Intermediate",
  },
  {
    id: "chinese",
    name: "Chinese",
    region: "Asian",
    description: "Stir-fries, dumplings, and balanced flavors",
    difficulty: "Intermediate",
  },
  {
    id: "japanese",
    name: "Japanese",
    region: "Asian",
    description: "Fresh ingredients, sushi, and umami-rich dishes",
    difficulty: "Advanced",
  },
  {
    id: "thai",
    name: "Thai",
    region: "Asian",
    description: "Spicy, sweet, and aromatic Southeast Asian cuisine",
    difficulty: "Intermediate",
  },
  {
    id: "korean",
    name: "Korean",
    region: "Asian",
    description: "Fermented foods, BBQ, and bold flavors",
    difficulty: "Intermediate",
  },

  // European Cuisines
  {
    id: "italian",
    name: "Italian",
    region: "European",
    description: "Pasta, pizza, and Mediterranean ingredients",
    difficulty: "Beginner",
  },
  {
    id: "french",
    name: "French",
    region: "European",
    description: "Refined techniques and rich sauces",
    difficulty: "Advanced",
  },
  {
    id: "spanish",
    name: "Spanish",
    region: "European",
    description: "Tapas, paella, and vibrant flavors",
    difficulty: "Intermediate",
  },
  {
    id: "greek",
    name: "Greek",
    region: "European",
    description: "Fresh herbs, olive oil, and Mediterranean diet",
    difficulty: "Beginner",
  },

  // American Cuisines
  {
    id: "mexican",
    name: "Mexican",
    region: "American",
    description: "Spices, beans, and corn-based dishes",
    difficulty: "Beginner",
  },
  {
    id: "american",
    name: "American",
    region: "American",
    description: "Comfort foods and diverse regional styles",
    difficulty: "Beginner",
  },
  {
    id: "brazilian",
    name: "Brazilian",
    region: "American",
    description: "Tropical fruits, grilled meats, and rice dishes",
    difficulty: "Intermediate",
  },

  // Middle Eastern & African
  {
    id: "middle-eastern",
    name: "Middle Eastern",
    region: "Middle Eastern",
    description: "Hummus, kebabs, and aromatic spices",
    difficulty: "Intermediate",
  },
  {
    id: "moroccan",
    name: "Moroccan",
    region: "African",
    description: "Tagines, couscous, and exotic spices",
    difficulty: "Advanced",
  },
  {
    id: "ethiopian",
    name: "Ethiopian",
    region: "African",
    description: "Injera bread and spicy stews",
    difficulty: "Advanced",
  },
]

export default function MealPlannerGame() {
  const [gameStarted, setGameStarted] = useState(false)
  const [selectedCuisine, setSelectedCuisine] = useState<string>("")
  const [playerName, setPlayerName] = useState("Chef")

  const handleCuisineSelect = (cuisineId: string) => {
    setSelectedCuisine(cuisineId)
  }

  const handleStartCooking = () => {
    if (selectedCuisine) {
      // Redirect to enhanced meal builder with cuisine parameter
      window.location.href = `/meal-builder?cuisine=${selectedCuisine}&game=true`
    }
  }

  const startGame = () => {
    setGameStarted(true)
  }

  const selectedCuisineData = cuisineOptions.find((c) => c.id === selectedCuisine)

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-green-950 dark:via-blue-950 dark:to-purple-950">
        {/* Header */}
        <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/student">
                <Button variant="ghost" size="sm" className="hover:scale-110 transition-transform">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Portal
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                  <ChefHat className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Global Meal Planner Game
                </span>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              Individual Player
            </Badge>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12 max-w-6xl">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <Globe className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Welcome to Global Meal Planner!
            </h1>
            <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
              Create delicious and nutritious meals from cuisines around the world! Choose your favorite cuisine, build
              your perfect meal, and get personalized nutrition analysis with health recommendations!
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span>Earn 75 points</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                <span>Health scoring</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-500" />
                <span>Animated analysis</span>
              </div>
            </div>
          </div>

          {/* Game Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🍽️</span>
                </div>
                <h3 className="font-semibold mb-2">Step-by-Step Building</h3>
                <p className="text-sm text-muted-foreground">
                  Choose cuisine → Select ingredients → Build complete meals
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="font-semibold mb-2">Nutrition Analysis</h3>
                <p className="text-sm text-muted-foreground">Get detailed nutritional breakdown with animated charts</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💡</span>
                </div>
                <h3 className="font-semibold mb-2">Health Suggestions</h3>
                <p className="text-sm text-muted-foreground">Receive personalized tips to make your meals healthier</p>
              </CardContent>
            </Card>
          </div>

          {/* Start Game Button */}
          <div className="text-center">
            <Button
              size="lg"
              onClick={startGame}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <Play className="h-6 w-6 mr-2" />
              Start Cooking Adventure
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
            <Button variant="ghost" size="sm" onClick={() => setGameStarted(false)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <Globe className="h-6 w-6 text-primary" />
              <span className="font-semibold">Choose Your Cuisine</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Playing as:</span>
            <Badge variant="outline">{playerName}</Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <div className="w-16 h-1 bg-muted"></div>
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-muted-foreground font-bold">
                2
              </div>
              <div className="w-16 h-1 bg-muted"></div>
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-muted-foreground font-bold">
                3
              </div>
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Step 1: Choose Your Global Cuisine</h2>
            <p className="text-muted-foreground">
              Select a cuisine from around the world to start building your perfect meal
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Select Your Cuisine</h3>
              <p className="text-muted-foreground">Choose from cuisines around the world</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Cuisine Type</label>
                <Select value={selectedCuisine} onValueChange={handleCuisineSelect}>
                  <SelectTrigger className="w-full h-12 text-left">
                    <SelectValue placeholder="Select a cuisine to explore..." />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="p-2">
                      <div className="text-xs font-semibold text-muted-foreground mb-2 px-2">ASIAN CUISINES</div>
                      {cuisineOptions
                        .filter((c) => c.region === "Asian")
                        .map((cuisine) => (
                          <SelectItem key={cuisine.id} value={cuisine.id} className="py-3">
                            <div className="flex items-center justify-between w-full">
                              <div>
                                <div className="font-medium">{cuisine.name}</div>
                                <div className="text-xs text-muted-foreground">{cuisine.description}</div>
                              </div>
                              <Badge variant="outline" className="ml-2 text-xs">
                                {cuisine.difficulty}
                              </Badge>
                            </div>
                          </SelectItem>
                        ))}

                      <div className="text-xs font-semibold text-muted-foreground mb-2 mt-4 px-2">
                        EUROPEAN CUISINES
                      </div>
                      {cuisineOptions
                        .filter((c) => c.region === "European")
                        .map((cuisine) => (
                          <SelectItem key={cuisine.id} value={cuisine.id} className="py-3">
                            <div className="flex items-center justify-between w-full">
                              <div>
                                <div className="font-medium">{cuisine.name}</div>
                                <div className="text-xs text-muted-foreground">{cuisine.description}</div>
                              </div>
                              <Badge variant="outline" className="ml-2 text-xs">
                                {cuisine.difficulty}
                              </Badge>
                            </div>
                          </SelectItem>
                        ))}

                      <div className="text-xs font-semibold text-muted-foreground mb-2 mt-4 px-2">
                        AMERICAN CUISINES
                      </div>
                      {cuisineOptions
                        .filter((c) => c.region === "American")
                        .map((cuisine) => (
                          <SelectItem key={cuisine.id} value={cuisine.id} className="py-3">
                            <div className="flex items-center justify-between w-full">
                              <div>
                                <div className="font-medium">{cuisine.name}</div>
                                <div className="text-xs text-muted-foreground">{cuisine.description}</div>
                              </div>
                              <Badge variant="outline" className="ml-2 text-xs">
                                {cuisine.difficulty}
                              </Badge>
                            </div>
                          </SelectItem>
                        ))}

                      <div className="text-xs font-semibold text-muted-foreground mb-2 mt-4 px-2">
                        MIDDLE EASTERN & AFRICAN
                      </div>
                      {cuisineOptions
                        .filter((c) => c.region === "Middle Eastern" || c.region === "African")
                        .map((cuisine) => (
                          <SelectItem key={cuisine.id} value={cuisine.id} className="py-3">
                            <div className="flex items-center justify-between w-full">
                              <div>
                                <div className="font-medium">{cuisine.name}</div>
                                <div className="text-xs text-muted-foreground">{cuisine.description}</div>
                              </div>
                              <Badge variant="outline" className="ml-2 text-xs">
                                {cuisine.difficulty}
                              </Badge>
                            </div>
                          </SelectItem>
                        ))}
                    </div>
                  </SelectContent>
                </Select>
              </div>

              {selectedCuisineData && (
                <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-blue-200 dark:border-blue-800">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">🍽️</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">{selectedCuisineData.name} Cuisine</h4>
                        <p className="text-sm text-muted-foreground">{selectedCuisineData.description}</p>
                      </div>
                      <Badge variant="secondary" className="ml-auto">
                        {selectedCuisineData.difficulty}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Button
                onClick={handleStartCooking}
                disabled={!selectedCuisine}
                className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Play className="h-5 w-5 mr-2" />
                {selectedCuisineData ? `Start Cooking ${selectedCuisineData.name}` : "Select a Cuisine to Continue"}
              </Button>
            </div>
          </Card>
        </div>

        {/* Fun Facts Section */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 border-yellow-200 dark:border-yellow-800">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center justify-center gap-2">
                <span className="text-2xl">🌟</span>
                Did You Know?
              </h3>
              <p className="text-muted-foreground">
                Every cuisine around the world has developed unique ways to create balanced, nutritious meals using
                local ingredients. From the Mediterranean diet's emphasis on olive oil and fresh vegetables to Asian
                cuisine's balance of flavors and textures!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
