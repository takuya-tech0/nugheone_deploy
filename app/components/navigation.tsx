'use client'

import { useState } from 'react'
import Image from "next/image"
import Link from 'next/link'
import { Button } from "@/app/components/ui/button"
import { Bell, Menu } from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-[#006699] p-4">
      <div className="container mx-auto">
        <nav className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Image
              src="/logo_6.png"
              alt="Nudgeone for 1Week"
              width={120}
              height={30}
              className="object-contain"
              
              priority
            />
          </div>

          {/* モバイルメニューボタン */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:text-white/80"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>

          {/* デスクトップナビゲーション */}
          <div className="hidden md:flex items-center gap-6">
            <Bell className="text-white h-5 w-5" />
            <Link href="/" className="text-white hover:text-white/80">
              ホーム
            </Link>
            <Link href="/search" className="text-white hover:text-white/80">
              検索
            </Link>
            <Link href="/favorites" className="text-white hover:text-white/80">
              お気に入り
            </Link>
            <Link href="/login" className="text-white hover:text-white/80">
              ログイン
            </Link>
          </div>
        </nav>

        {/* モバイルナビゲーション */}
        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} mt-4`}>
          <div className="flex flex-col space-y-2">
            <Link href="/" className="text-white hover:text-white/80 py-2">
              ホーム
            </Link>
            <Link href="/search" className="text-white hover:text-white/80 py-2">
              検索
            </Link>
            <Link href="/favorites" className="text-white hover:text-white/80 py-2">
              お気に入り
            </Link>
            <Link href="/login" className="text-white hover:text-white/80 py-2">
              ログイン
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}