"use client"

import { useState, useEffect } from "react"

interface FloatingIngredientsProps {
  ingredients: Array<{ name: string; image: string; calories: number }>
}

export function FloatingIngredients({ ingredients }: FloatingIngredientsProps) {
  const [positions, setPositions] = useState<Array<{ x: number; y: number; rotation: number }>>([])

  useEffect(() => {
    const newPositions = ingredients.map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: Math.random() * 360,
    }))
    setPositions(newPositions)
  }, [ingredients])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {ingredients.map((ingredient, index) => {
        const position = positions[index]
        if (!position) return null

        return (
          <div
            key={index}
            className="absolute w-12 h-12 opacity-20 animate-float"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: `rotate(${position.rotation}deg)`,
              animationDelay: `${index * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            <img
              src={ingredient.image || "/placeholder.svg"}
              alt={ingredient.name}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        )
      })}

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
