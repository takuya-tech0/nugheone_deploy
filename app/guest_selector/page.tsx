'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/app/components/ui/button"
import { Card } from "@/app/components/ui/card"
import { Minus, Plus, X } from 'lucide-react'
import Link from 'next/link'

export default function GuestSelectorPage() {
  const router = useRouter()
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [infants, setInfants] = useState(0)

  const updateCount = (
    current: number,
    setter: (value: number) => void,
    increment: boolean,
    max: number = 6
  ) => {
    if (increment && current < max) {
      setter(current + 1)
    } else if (!increment && current > 0) {
      setter(current - 1)
    }
  }

  const handleSave = () => {
    console.log('Saving guest selection:', { adults, children, infants })
    router.push('/approval')
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <div className="min-h-screen bg-white p-4">
      <Card className="max-w-md mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">ゲスト人数</h1>
          <Button variant="ghost" size="icon" onClick={handleCancel}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="text-sm text-gray-600 mb-8">
          <p>こちらの宿泊施設の最大定員は6人です</p>
          <p>（乳幼児を除く)</p>
          
        </div>

        <div className="space-y-6">
          {/* Adults */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">大人</div>
              <div className="text-sm text-gray-500">13歳以上</div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateCount(adults, setAdults, false)}
                disabled={adults <= 1}
                className="h-8 w-8 rounded-full"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{adults}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateCount(adults, setAdults, true)}
                disabled={adults + children >= 6}
                className="h-8 w-8 rounded-full"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Children */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">子ども</div>
              <div className="text-sm text-gray-500">2〜12歳</div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateCount(children, setChildren, false)}
                disabled={children <= 0}
                className="h-8 w-8 rounded-full"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{children}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateCount(children, setChildren, true)}
                disabled={adults + children >= 6}
                className="h-8 w-8 rounded-full"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Infants */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">乳幼児</div>
              <div className="text-sm text-gray-500">2歳未満</div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateCount(infants, setInfants, false)}
                disabled={infants <= 0}
                className="h-8 w-8 rounded-full"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{infants}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateCount(infants, setInfants, true, 5)}
                className="h-8 w-8 rounded-full"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Pets */}
          <div className="pt-4 border-t">
            <div className="font-medium mb-2">ペット</div>
            <Link href="#" className="text-sm text-[#006699] hover:underline">
              介助動物同伴の場合は？
            </Link>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <Button 
            variant="ghost" 
            className="flex-1"
            onClick={handleCancel}
          >
            キャンセル
          </Button>
          <Button 
            className="flex-1 bg-[#006699] text-white hover:bg-[#006699]/90"
            onClick={handleSave}
          >
            保存
          </Button>
        </div>
      </Card>
    </div>
  )
}

