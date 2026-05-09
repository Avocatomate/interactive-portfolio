'use client'

import { useEffect, useRef } from 'react'

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789<>{}[]|/\\@#$%ABCDEFGHIJKLMNOPQRSTUVWXYZ'

const FONT_SIZE = 13
const SPEED = 1        // columns advance 1 char per tick
const TICK_MS = 40     // ~25fps — light on CPU

export default function MatrixEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let drops: number[] = []
    let raf: number
    let lastTick = 0

    const init = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const cols = Math.floor(canvas.width / FONT_SIZE)
      // Start drops at random heights so it doesn't all fall at once
      drops = Array.from({ length: cols }, () =>
        Math.floor(Math.random() * -(canvas.height / FONT_SIZE))
      )
    }

    init()
    window.addEventListener('resize', init)

    const tick = (time: number) => {
      raf = requestAnimationFrame(tick)
      if (time - lastTick < TICK_MS) return
      lastTick = time

      // Fade previous frame — colour matches page bg (#080809)
      ctx.fillStyle = 'rgba(8, 8, 9, 0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${FONT_SIZE}px "JetBrains Mono", monospace`

      for (let i = 0; i < drops.length; i++) {
        const y = drops[i] * FONT_SIZE
        if (y < 0) { drops[i] += SPEED; continue }

        const char = CHARS[Math.floor(Math.random() * CHARS.length)]
        const x = i * FONT_SIZE

        // Lead character — bright cyan/white
        ctx.fillStyle = 'rgba(180, 240, 255, 0.95)'
        ctx.fillText(char, x, y)

        // One character behind — full cyan
        if (drops[i] > 1) {
          const prev = CHARS[Math.floor(Math.random() * CHARS.length)]
          ctx.fillStyle = 'rgba(0, 212, 255, 0.7)'
          ctx.fillText(prev, x, y - FONT_SIZE)
        }

        // Reset column randomly after passing bottom
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = Math.floor(Math.random() * -30)
        }

        drops[i] += SPEED
      }
    }

    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('resize', init)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity: 0.18,
      }}
    />
  )
}
