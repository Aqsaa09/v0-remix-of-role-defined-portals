"use client"

import { useState, useEffect } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

interface AnimatedChartProps {
  data: Array<{ name: string; value: number; color: string }>
  delay?: number
}

export function AnimatedPieChart({ data, delay = 0 }: AnimatedChartProps) {
  const [animatedData, setAnimatedData] = useState(data.map((item) => ({ ...item, value: 0 })))
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
      // Animate each slice individually
      data.forEach((item, index) => {
        setTimeout(() => {
          setAnimatedData((prev) =>
            prev.map((prevItem, prevIndex) => (prevIndex === index ? { ...prevItem, value: item.value } : prevItem)),
          )
        }, index * 200)
      })
    }, delay)

    return () => clearTimeout(timer)
  }, [data, delay])

  return (
    <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={animatedData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
            animationBegin={delay}
            animationDuration={800}
          >
            {animatedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                style={{
                  filter: `drop-shadow(0 4px 8px ${entry.color}20)`,
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [`${value}g`, name]}
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              border: "none",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
