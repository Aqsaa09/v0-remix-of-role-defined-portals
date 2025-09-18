"use client"

import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"

interface NutritionMeterProps {
  label: string
  value: number
  target: number
  unit: string
  color?: string
  delay?: number
}

export function NutritionMeter({ label, value, target, unit, color = "#10b981", delay = 0 }: NutritionMeterProps) {
  const [animatedValue, setAnimatedValue] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const percentage = Math.min((value / target) * 100, 100)
  const status = percentage >= 80 ? "excellent" : percentage >= 60 ? "good" : percentage >= 40 ? "fair" : "poor"

  const statusColors = {
    excellent: "#10b981",
    good: "#3b82f6",
    fair: "#f59e0b",
    poor: "#ef4444",
  }

  const statusEmojis = {
    excellent: "🌟",
    good: "👍",
    fair: "⚠️",
    poor: "📈",
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
      // Animate the value counting up
      const duration = 1000
      const steps = 50
      const increment = value / steps
      let current = 0

      const counter = setInterval(() => {
        current += increment
        if (current >= value) {
          setAnimatedValue(value)
          clearInterval(counter)
        } else {
          setAnimatedValue(current)
        }
      }, duration / steps)

      return () => clearInterval(counter)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return (
    <div
      className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
    >
      <div className="text-center p-4 bg-muted/50 rounded-lg hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-2xl">{statusEmojis[status]}</span>
          <div className="text-3xl font-bold text-primary">
            {Math.round(animatedValue)}
            {unit}
          </div>
        </div>
        <div className="text-sm text-muted-foreground mb-2">{label}</div>
        <Progress
          value={percentage}
          className="h-3 mb-2"
          style={{
            background: `linear-gradient(to right, ${statusColors[status]}20, ${statusColors[status]}40)`,
          }}
        />
        <div className="text-xs text-muted-foreground">
          Target: {target}
          {unit}
        </div>
        <div className={`text-xs font-medium mt-1`} style={{ color: statusColors[status] }}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
      </div>
    </div>
  )
}
