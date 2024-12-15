'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from "@/app/components/ui/button"
import { Card } from "@/app/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group"
import { Label } from "@/app/components/ui/label"

export default function ApprovalPage() {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState<string>('bank')

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Card className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-6">決済確認</h1>
        
        <div className="space-y-6">
          {/* 支払い方法選択 */}
          <div>
            <p className="mb-4">支払い方法を選択してください</p>
            <RadioGroup 
              value={paymentMethod} 
              onValueChange={setPaymentMethod} 
              className="space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="credit" id="credit" />
                <Label htmlFor="credit">クレジットカード</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bank" id="bank" />
                <Label htmlFor="bank">銀行振込</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="convenience" id="convenience" />
                <Label htmlFor="convenience">コンビニ支払い</Label>
              </div>
            </RadioGroup>
          </div>

          {/* 予約内容 */}
          <div className="mt-8">
            <h2 className="text-lg font-medium mb-4">予約内容</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">宿泊期間</span>
                <span>2024/01/01 - 2024/01/07</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">宿泊人数</span>
                <span>2名</span>
              </div>
              <div className="flex justify-between items-center border-t pt-4">
                <span className="font-medium">合計金額</span>
                <span className="font-medium">¥70,000</span>
              </div>
            </div>
          </div>

          {/* ボタン */}
          <div className="flex justify-end gap-4 mt-8">
            <Button
              variant="outline"
              onClick={() => router.back()}
            >
              戻る
            </Button>
            <Button
              className="bg-[#006699] text-white hover:bg-[#006699]/90"
              onClick={() => router.push('/approval/complete')}
            >
              決済する
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
