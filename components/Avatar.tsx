'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export type AvatarState = 'idle' | 'thinking' | 'happy'

const TOTAL_FRAMES = 192
const FPS = 24

interface AvatarProps {
  state?: AvatarState
  size?: number
}

export default function Avatar({ state = 'idle', size = 180 }: AvatarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frames = useRef<HTMLImageElement[]>([])
  const current = useRef(0)
  const loaded = useRef(0)
  const raf = useRef<number>(0)
  const lastTime = useRef(0)

  useEffect(() => {
    /* Preload all frames */
    frames.current = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
      const img = new Image()
      img.src = `/avatar-frames/frame_${String(i + 1).padStart(4, '0')}.webp`
      img.onload = () => { loaded.current++ }
      return img
    })

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const interval = 1000 / FPS

    const render = (time: number) => {
      if (loaded.current > 0 && time - lastTime.current >= interval) {
        const frame = frames.current[current.current]
        if (frame?.complete && frame.naturalWidth > 0) {
          ctx.clearRect(0, 0, size, size)

          /* Circular clip */
          ctx.save()
          ctx.beginPath()
          ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
          ctx.clip()
          ctx.drawImage(frame, 0, 0, size, size)
          ctx.restore()
        }
        current.current = (current.current + 1) % TOTAL_FRAMES
        lastTime.current = time
      }
      raf.current = requestAnimationFrame(render)
    }

    raf.current = requestAnimationFrame(render)
    return () => cancelAnimationFrame(raf.current)
  }, [size])

  const glow =
    state === 'thinking'
      ? ['0 0 16px rgba(0,212,255,0.42), 0 0 35px rgba(0,212,255,0.25), 0 0 70px rgba(0,212,255,0.1)', '0 0 22px rgba(0,212,255,0.6), 0 0 50px rgba(0,212,255,0.35), 0 0 90px rgba(0,212,255,0.15)', '0 0 16px rgba(0,212,255,0.42), 0 0 35px rgba(0,212,255,0.25), 0 0 70px rgba(0,212,255,0.1)']
      : state === 'happy'
      ? '0 0 18px rgba(0,212,255,0.5), 0 0 40px rgba(0,212,255,0.28), 0 0 70px rgba(0,212,255,0.1)'
      : '0 0 16px rgba(0,212,255,0.42), 0 0 35px rgba(0,212,255,0.25), 0 0 70px rgba(0,212,255,0.1)'

  return (
    <motion.div
      animate={{ y: [0, -7, 0] }}
      transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
      style={{ position: 'relative', width: size, height: size }}
    >
      {/* Glow ring */}
      <motion.div
        animate={{ boxShadow: glow }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          inset: -6,
          borderRadius: '50%',
          border: '1.5px solid rgba(0,212,255,0.45)',
          pointerEvents: 'none',
        }}
      />

      {/* Frame canvas */}
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        style={{ display: 'block', borderRadius: '50%' }}
      />
    </motion.div>
  )
}
