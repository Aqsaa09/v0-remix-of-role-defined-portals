"use client"

import { useState, useEffect } from "react"

interface HealthAvatarProps {
  healthScore: number
  animated?: boolean
}

export function HealthAvatar({ healthScore, animated = true }: HealthAvatarProps) {
  const [currentExpression, setCurrentExpression] = useState("neutral")

  useEffect(() => {
    if (typeof healthScore !== "number" || isNaN(healthScore)) {
      setCurrentExpression("neutral")
      return
    }

    if (healthScore >= 90) setCurrentExpression("excellent")
    else if (healthScore >= 80) setCurrentExpression("great")
    else if (healthScore >= 70) setCurrentExpression("good")
    else if (healthScore >= 60) setCurrentExpression("okay")
    else if (healthScore >= 50) setCurrentExpression("concerned")
    else setCurrentExpression("worried")
  }, [healthScore])

  const expressions = {
    excellent: { face: "😊", color: "text-green-500", message: "Excellent meal!" },
    great: { face: "😄", color: "text-green-400", message: "Great choices!" },
    good: { face: "🙂", color: "text-blue-500", message: "Good meal!" },
    okay: { face: "😐", color: "text-yellow-500", message: "Could be better" },
    concerned: { face: "😕", color: "text-orange-500", message: "Needs improvement" },
    worried: { face: "😟", color: "text-red-500", message: "Let me help!" },
    neutral: { face: "😊", color: "text-gray-500", message: "Loading..." }, // Added neutral state for loading
  }

  const expression = expressions[currentExpression as keyof typeof expressions]

  if (!expression) {
    return (
      <div className="text-center">
        <div className="text-6xl mb-2">😊</div>
        <p className="text-sm font-medium text-gray-500">Loading...</p>
      </div>
    )
  }

  return (
    <div className={`text-center transition-all duration-500 ${animated ? "animate-bounce" : ""}`}>
      <div className="text-6xl mb-2 transition-all duration-300 hover:scale-110">{expression.face}</div>
      <p className={`text-sm font-medium ${expression.color}`}>{expression.message}</p>
    </div>
  )
}
