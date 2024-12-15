'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  radius: number
  color: string
  velocity: {
    x: number
    y: number
  }
}

export function ConfettiEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // キャンバスをウィンドウサイズに設定
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // 紙吹雪のパーティクルを生成
    const particles: Particle[] = []
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']
    
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        radius: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        velocity: {
          x: (Math.random() - 0.5) * 3,
          y: Math.random() * 3 + 1
        }
      })
    }

    // アニメーション関数
    function animate() {
      if (!canvas || !ctx) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // パーティクルの位置を更新
        particle.x += particle.velocity.x
        particle.y += particle.velocity.y

        // 画面外に出たパーティクルを上に戻す
        if (particle.y > canvas.height) {
          particle.y = -10
          particle.x = Math.random() * canvas.width
        }
      })

      requestAnimationFrame(animate)
    }

    // アニメーションを開始
    animate()

    // クリーンアップ関数
    return () => {
      cancelAnimationFrame(requestAnimationFrame(animate))
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 50 }}
    />
  )
}
