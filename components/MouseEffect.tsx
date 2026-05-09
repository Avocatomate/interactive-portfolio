'use client'

import { useEffect, useRef } from 'react'

export default function MouseEffect() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: -200, y: -200 })
  const ring = useRef({ x: -200, y: -200 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }

    const tick = () => {
      const dot = dotRef.current
      const ringEl = ringRef.current

      if (dot) {
        dot.style.transform = `translate(${mouse.current.x - 4}px, ${mouse.current.y - 4}px)`
      }
      if (ringEl) {
        ring.current.x += (mouse.current.x - ring.current.x) * 0.1
        ring.current.y += (mouse.current.y - ring.current.y) * 0.1
        ringEl.style.transform = `translate(${ring.current.x - 18}px, ${ring.current.y - 18}px)`
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      {/* Small solid dot — snaps instantly */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#00d4ff',
          pointerEvents: 'none',
          zIndex: 9999,
          willChange: 'transform',
        }}
      />
      {/* Larger ring — follows with spring lag */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1.5px solid rgba(0,212,255,0.45)',
          pointerEvents: 'none',
          zIndex: 9998,
          willChange: 'transform',
        }}
      />
    </>
  )
}
