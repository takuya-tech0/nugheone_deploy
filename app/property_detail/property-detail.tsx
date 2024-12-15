import { useState } from 'react'
import { format } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { Button } from "../components/ui/button"
import { Calendar } from "../components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover"
import { cn } from "../../lib/utils"

export default function PropertyDetail() {
  const [date, setDate] = useState<DateRange | undefined>()
  
  // property オブジェクトの定義
  const property = {
    title: "海辺の素敵なコテージ",
    price: 15000,
    cleaningFee: 5000,
    // 他の必要なプロパティがあれば追加してください
  }

  const handleDateSelect = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">{property.title}</h1>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "yyyy年MM月dd日")} - {format(date.to, "yyyy年MM月dd日")}
                </>
              ) : (
                format(date.from, "yyyy年MM月dd日")
              )
            ) : (
              <span>日付を選択</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={date}
            onSelect={handleDateSelect}
          />
        </PopoverContent>
      </Popover>

      {date?.from && date?.to && (
        <div className="space-y-2 mt-4">
          <div className="flex justify-between">
            <span>¥{property.price.toLocaleString()} x {Math.ceil((date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24))}泊</span>
            <span>¥{(property.price * Math.ceil((date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24))).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>清掃料</span>
            <span>¥{property.cleaningFee.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>合計</span>
            <span>¥{(property.price * Math.ceil((date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24)) + property.cleaningFee).toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  )
}