"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Carou() {
  const [current, setCurrent] = useState(0)
  const totalCards = 4

  // Array of image sources - you can change these to any image URLs or local paths
  const images = [
    "https://i.pinimg.com/736x/76/1e/75/761e75861b346dbbe1d55facd4f427b7.jpg",
    "https://i.pinimg.com/736x/40/9b/d3/409bd39e8291ae6906833cf0199215bf.jpg", 
    "https://i.pinimg.com/736x/66/0d/c4/660dc4595103ca59381029f1e7f5d2be.jpg",
    "https://i.pinimg.com/736x/e1/0c/01/e10c014001c95fae012ad71fcda3907c.jpg",
    "https://i.pinimg.com/736x/da/53/b4/da53b4ed475a121dd91c3f7e26379ec7.jpg"
  ]

  const goToPrevious = () => {
    setCurrent((prev) => (prev === 0 ? totalCards - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrent((prev) => (prev === totalCards - 1 ? 0 : prev + 1))
  }

  const getCardPosition = (index: number) => {
    let distance = index - current
    
    // Handle circular wrapping
    if (distance > totalCards / 2) {
      distance = distance - totalCards
    } else if (distance < -totalCards / 2) {
      distance = distance + totalCards
    }

    return distance
  }

  const getCardStyle = (index: number) => {
    const distance = getCardPosition(index)
    const absDistance = Math.abs(distance)

    // Center card is bigger, side cards are smaller
    // Width for 9:16 aspect ratio
    const width = absDistance === 0 ? 270 : 240
    const height = absDistance === 0 ? 480 : 427
    
    // Z-index: center card on top
    const zIndex = 100 - absDistance * 10
    
    // Opacity: only show center and adjacent cards
    const opacity = absDistance > 1 ? 0 : 1
    
    // Visibility
    const visibility = (absDistance > 1 ? 'hidden' : 'visible') as 'hidden' | 'visible'
    
    // Position
    let left = '50%'
    let transform = 'translateX(-50%)'
    
    if (distance === -1) {
      // Left card
      left = '10%'
      transform = 'translateX(0)'
    } else if (distance === 1) {
      // Right card
      left = 'auto'
      transform = 'translateX(0)'
    }

    return {
      position: 'absolute' as const,
      left: distance === 1 ? 'auto' : left,
      right: distance === 1 ? '10%' : 'auto',
      width: `${width}px`,
      height: `${height}px`,
      transform,
      zIndex,
      opacity,
      visibility,
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    }
  }

  return (
    <div className="w-full flex justify-center items-center py-12">
      <div className="relative w-full max-w-4xl h-[550px] flex items-center justify-center">
        {/* Cards */}
        {Array.from({ length: totalCards }).map((_, index) => (
          <div key={index} style={getCardStyle(index)}>
            <Card className="w-full h-full shadow-2xl border-2 overflow-hidden">
              <CardContent className="relative flex items-center justify-center w-full h-full p-0">
                <img 
                  src={images[index]} 
                  alt={`Card ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <span className="absolute text-4xl font-semibold text-white drop-shadow-lg">
                  {index + 1}
                </span>
              </CardContent>
            </Card>
          </div>
        ))}

        {/* Previous Arrow */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-[200] bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all hover:scale-110"
          aria-label="Previous card"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>

        {/* Next Arrow */}
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-[200] bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all hover:scale-110"
          aria-label="Next card"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>
      </div>
    </div>
  )
}