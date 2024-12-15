'use client'

import { useRouter } from 'next/navigation'
import { Button } from "@/app/components/ui/button"
import { Card } from "@/app/components/ui/card"
import { CheckCircle } from 'lucide-react'
import { ConfettiEffect } from '../../components/confetti-effect'  // 相対パスに修正

export default function CompletePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <ConfettiEffect />
      <Card className="max-w-2xl mx-auto p-6">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h1 className="text-2xl font-semibold">予約が完了しました</h1>
          <p className="text-gray-600">
            ご予約ありがとうございます。<br />
            予約内容の確認のLineをお送りしましたのでご確認ください。
          </p>
          
          <div className="pt-6">
            <Button
              className="bg-[#006699] text-white hover:bg-[#006699]/90"
              onClick={() => router.push('/')}
            >
              トップページへ戻る
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

