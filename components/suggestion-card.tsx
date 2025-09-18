"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, TrendingUp, Zap, Star, Target } from "lucide-react"

interface SuggestionCardProps {
  suggestion: {
    type: string
    title: string
    description: string
    impact: string
    icon: string
    ingredients?: string[]
    healthBenefit?: string
    priority?: string
  }
  onApply?: () => void
}

export function SuggestionCard({ suggestion, onApply }: SuggestionCardProps) {
  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "high":
        return "border-red-300 bg-red-50 dark:bg-red-950/20"
      case "medium":
        return "border-yellow-300 bg-yellow-50 dark:bg-yellow-950/20"
      case "low":
        return "border-blue-300 bg-blue-50 dark:bg-blue-950/20"
      case "celebration":
        return "border-green-300 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20"
      default:
        return "border-gray-200 bg-white dark:bg-gray-900"
    }
  }

  const getPriorityIcon = (priority?: string) => {
    switch (priority) {
      case "high":
        return <Zap className="h-4 w-4 text-red-500" />
      case "medium":
        return <Target className="h-4 w-4 text-yellow-500" />
      case "low":
        return <TrendingUp className="h-4 w-4 text-blue-500" />
      case "celebration":
        return <Star className="h-4 w-4 text-green-500" />
      default:
        return <TrendingUp className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <Card
      className={`hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group border-2 ${getPriorityColor(suggestion.priority)} ${suggestion.priority === "high" ? "animate-pulse" : ""}`}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="relative">
            <div
              className="text-4xl group-hover:scale-110 transition-transform duration-300 animate-bounce"
              style={{ animationDelay: "0.5s" }}
            >
              {suggestion.icon}
            </div>
            {suggestion.priority && (
              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center">
                {getPriorityIcon(suggestion.priority)}
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{suggestion.title}</h3>
              {suggestion.priority === "high" && (
                <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-xs animate-pulse">
                  URGENT
                </Badge>
              )}
              {suggestion.priority === "celebration" && (
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs">
                  🎉 GREAT JOB!
                </Badge>
              )}
            </div>

            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{suggestion.description}</p>

            {suggestion.healthBenefit && (
              <div className="mb-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-sm text-green-700 dark:text-green-300 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  <span className="font-medium">Health Benefit:</span>
                  {suggestion.healthBenefit}
                </p>
              </div>
            )}

            {suggestion.ingredients && (
              <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-1">
                  <Plus className="h-3 w-3" />
                  Try adding these:
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestion.ingredients.map((ingredient, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs hover:scale-105 transition-transform cursor-pointer bg-white dark:bg-gray-800"
                    >
                      {ingredient}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={`font-bold px-3 py-1 ${
                    suggestion.priority === "high"
                      ? "text-red-600 border-red-600 bg-red-50 dark:bg-red-950/20"
                      : suggestion.priority === "celebration"
                        ? "text-green-600 border-green-600 bg-green-50 dark:bg-green-950/20"
                        : "text-green-600 border-green-600"
                  }`}
                >
                  {suggestion.impact}
                </Badge>
                <Badge variant="secondary" className="capitalize text-xs">
                  {suggestion.type}
                </Badge>
              </div>

              {onApply && suggestion.priority !== "celebration" && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={onApply}
                  className="hover:scale-105 transition-all duration-200 hover:shadow-md bg-transparent"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Apply Now
                </Button>
              )}

              {suggestion.priority === "celebration" && (
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1">
                  <Star className="h-3 w-3 mr-1" />
                  Achievement!
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
