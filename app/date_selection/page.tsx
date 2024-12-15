'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/app/components/ui/button"
import { Card } from "@/app/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"
import { ChevronDown } from 'lucide-react'

type AvailabilityStatus = '○' | '△' | '×';

type DateSlot = {
  date: string;
  availability: AvailabilityStatus;
}

export default function Component() {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<string>("")
  
  const availableDates: DateSlot[] = [
    { date: "12月18日 (水)", availability: "○" },
    { date: "12月19日 (木)", availability: "○" },
    { date: "12月20日 (金)", availability: "△" },
    { date: "12月24日 (火)", availability: "○" },
    { date: "12月25日 (水)", availability: "×" },
  ]

  const getAvailabilityColor = (availability: AvailabilityStatus) => {
    switch (availability) {
      case '○': return 'text-green-600';
      case '△': return 'text-yellow-600';
      case '×': return 'text-red-600';
      default: return '';
    }
  };

  const handleNext = () => {
    router.push('/guest_selector')
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      <Card className="w-full max-w-4xl mx-auto rounded-3xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <Button variant="ghost" className="text-sm sm:text-base font-medium text-gray-600">
                終了
              </Button>
              <div className="text-sm sm:text-base text-gray-600">
                23:47
              </div>
            </div>

            {/* Title */}
            <div className="text-center lg:text-left space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">日付</h1>
              <p className="text-sm sm:text-base text-gray-600">
                ご都合のよい日付をお選びください。
              </p>
            </div>

            {/* Date Selection */}
            <div className="space-y-4 sm:space-y-6">
              <Select>
                <SelectTrigger className="w-full p-3 sm:p-4 text-left border rounded-xl text-sm sm:text-base">
                  <div className="flex justify-between items-center">
                    <SelectValue placeholder="予約可能な日付" />
                    <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべての日付</SelectItem>
                  <SelectItem value="available">予約可能な日付のみ</SelectItem>
                </SelectContent>
              </Select>

              <RadioGroup
                value={selectedDate}
                onValueChange={setSelectedDate}
                className="space-y-3 sm:space-y-4"
              >
                {availableDates.map((slot, index) => (
                  <label
                    key={index}
                    className={`flex items-center justify-between p-3 sm:p-4 bg-white rounded-xl border cursor-pointer hover:bg-gray-50 transition-colors ${
                      slot.availability === '×' ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <div className="space-y-1">
                        <div className="font-medium text-sm sm:text-base">{slot.date}</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`font-bold ${getAvailabilityColor(slot.availability)}`}>
                          {slot.availability}
                        </span>
                        <RadioGroupItem 
                          value={`${index}`} 
                          className="h-4 w-4 sm:h-5 sm:w-5"
                          disabled={slot.availability === '×'}
                        />
                      </div>
                    </div>
                  </label>
                ))}
              </RadioGroup>
            </div>
          </div>

          <div className="lg:w-1/2 bg-gray-50 p-6 lg:p-8 flex flex-col justify-center">
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold">予約の詳細</h2>
              <p className="text-sm sm:text-base text-gray-600">
                選択された日付: {selectedDate ? availableDates[parseInt(selectedDate)].date : "未選択"}
              </p>
            </div>

            {/* Next Button */}
            <div className="mt-6 sm:mt-8">
              <Button
                className="w-full bg-[#006699] text-white rounded-xl py-4 sm:py-6 text-sm sm:text-base transition-opacity"
                disabled={!selectedDate}
                onClick={handleNext}
              >
                次へ
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

