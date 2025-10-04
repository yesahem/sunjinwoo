"use client"
//vertical caraousal with 3d effect
import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel"

export default function CarouselSize() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const totalCards = 6

  React.useEffect(() => {
    if (!api) return

    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  const getCardStyle = (index: number) => {
    // Calculate circular distance (handles wrapping)
    let distance = index - current
    
    // Normalize distance to be within -2 to 2 range (circular)
    if (distance > totalCards / 2) {
      distance = distance - totalCards
    } else if (distance < -totalCards / 2) {
      distance = distance + totalCards
    }
    
    const absDistance = Math.abs(distance)
    
    // Scale: each card is 12% smaller than the one in front
    const scale = 1 - (absDistance * 0.12)
    
    // Rotation: 15-18 degrees tilt
    const rotation = distance * 17
    
    // Z-index: center card on top
    const zIndex = 5 - absDistance
    
    // Opacity: fade out cards further away
    const opacity = absDistance > 2 ? 0.3 : 1 - (absDistance * 0.2)
    
    // translateX: spread cards out
    const translateX = distance * 5 // (change this to change the distance between cards)
    
    return {
      transform: `translateX(${translateX}%) scale(${scale}) rotateY(${rotation}deg)`,
      zIndex,
      opacity,
      transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    }
  }

  return (
    <div className="w-full flex justify-center items-center py-12">
      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
        setApi={setApi}
        className="w-full max-w-4xl border-2 border-red-500 "
      >
        <CarouselContent className="flex items-center" style={{ perspective: '1000px' }}>
          {Array.from({ length: totalCards }).map((_, index) => (
            <CarouselItem 
              key={index} 
              className="basis-1/3 flex justify-center"
            >
              <div 
                className="p-1 w-full max-w-[280px]"
                style={getCardStyle(index)}
              >
                <Card className="shadow-xl">
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  )
}

// --- Horizontal Carousel ---

// // CarouselHorizontal.tsx
// import * as React from "react"
// import { Card, CardContent } from "@/components/ui/card"
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
//   CarouselApi,
// } from "@/components/ui/carousel"

// export default function CarouselHorizontal() {
//   const [api, setApi] = React.useState<CarouselApi>()
//   const [current, setCurrent] = React.useState(0)
//   const totalCards = 5

//   React.useEffect(() => {
//     if (!api) return

//     setCurrent(api.selectedScrollSnap())

//     api.on("select", () => {
//       setCurrent(api.selectedScrollSnap())
//     })
//   }, [api])

//   const getCardStyle = (index: number) => {
//     // Calculate circular distance (handles wrapping)
//     let distance = index - current
    
//     // Normalize distance to be within -2 to 2 range (circular)
//     if (distance > totalCards / 2) {
//       distance = distance - totalCards
//     } else if (distance < -totalCards / 2) {
//       distance = distance + totalCards
//     }
    
//     const absDistance = Math.abs(distance)
    
//     // Scale: each card is 12% smaller than the one in front
//     const scale = 1 - (absDistance * 0.12)
    
//     // Rotation: 15-18 degrees tilt
//     const rotation = distance * 17
    
//     // Z-index: center card on top
//     const zIndex = 5 - absDistance
    
//     // Opacity: fade out cards further away
//     const opacity = absDistance > 2 ? 0.3 : 1 - (absDistance * 0.2)
    
//     // translateX: spread cards out
//     const translateX = distance * 5  // (change this to change the distance between cards)
    
//     return {
//       transform: `translateX(${translateX}%) scale(${scale}) rotateY(${rotation}deg)`,
//       zIndex,
//       opacity,
//       transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
//     }
//   }

//   return (
//     <div className="w-full flex justify-center items-center py-12">
//       <Carousel
//         opts={{
//           align: "center",
//           loop: true,
//         }}
//         setApi={setApi}
//         className="w-full max-w-5xl"
//       >
//         <CarouselContent className="flex items-center" style={{ perspective: '1000px' }}>
//           {Array.from({ length: totalCards }).map((_, index) => (
//             <CarouselItem 
//               key={index} 
//               className="basis-1/2 flex justify-center"
//             >
//               <div 
//                 className="p-1 w-full max-w-[600px]"
//                 style={getCardStyle(index)}
//               >
//                 <Card className="shadow-xl">
//                   <CardContent className="flex items-center justify-center p-6" style={{ aspectRatio: '16/9' }}>
//                     <span className="text-4xl font-semibold">{index + 1}</span>
//                   </CardContent>
//                 </Card>
//               </div>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         <CarouselPrevious className="left-4" />
//         <CarouselNext className="right-4" />
//       </Carousel>
//     </div>
//   )
// }