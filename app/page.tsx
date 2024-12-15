"use client"

import { type Property } from './types/property'
import { PropertyCard } from './components/PropertyCard'

// サンプルデータ
const properties: Property[] = [
  { 
    id: 1, 
    location: "THE RESIDENCE MUROMI by Nudgeone.", 
    rating: 5.0, 
    price: "¥280,000",
    images: [
      "/Nudgeone_1.webp",
      "/Nudgeone_2.webp",
    ]
  },
  { 
    id: 2, 
    location: "Nudgeone.香椎", 
    rating: 4.8, 
    price: "¥80,000",
    images: [
      "/Nudgeone_3.jpg",
      "/Nudgeone_4.jpg",
    ]
  },
  { 
    id: 3, 
    location: "NDG 福大通り by Nudgeone", 
    rating: 4.9, 
    price: "¥50,000",
    images: [
      "/Nudgeone_5.jpg",
      "/Nudgeone_6.jpg",
      "/Nudgeone_7.jpg"
    ]
  },
]

export default function Component() {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <main className="flex-grow p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-muted text-muted-foreground text-sm p-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2024 Travel App. All rights reserved.</p>
          <nav className="mt-2 md:mt-0">
            <ul className="flex flex-wrap justify-center md:justify-end space-x-4">
              <li><a href="#" className="hover:underline">プライバシーポリシー</a></li>
              <li><a href="#" className="hover:underline">利用規約</a></li>
              <li><a href="#" className="hover:underline">お問い合わせ</a></li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  )
}

