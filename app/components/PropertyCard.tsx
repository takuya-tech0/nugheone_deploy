"use client"

import { useState } from 'react'
import { ChevronLeft, ChevronRight, MapPin, Star } from 'lucide-react'
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { Card } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { type Property } from '@/app/types/property'

export function PropertyCard({ property }: { property: Property }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const router = useRouter()

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prevIndex) => 
      prevIndex === property.images.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? property.images.length - 1 : prevIndex - 1
    )
  }

  const handleCardClick = () => {
    router.push(`/date_selection?propertyId=${property.id}`)
  }

  return (
    <Card 
      className="overflow-hidden border-0 shadow-none cursor-pointer hover:opacity-95 transition-opacity"
      onClick={handleCardClick}
    >
      <div className="relative aspect-[4/3]">
        <Image
          src={property.images[currentImageIndex]}
          fill
          alt={`${property.location}の景色 ${currentImageIndex + 1}`}
          className="object-cover rounded-lg"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full"
          onClick={prevImage}
          aria-label="前の画像"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full"
          onClick={nextImage}
          aria-label="次の画像"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">{property.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm">{property.rating}</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{property.price} / 1weekstay</span>
        </div>
      </div>
    </Card>
  )
}

