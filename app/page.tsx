'use client'

import { useState, useEffect, useRef } from 'react'
import { useChat } from 'ai/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, ArrowUp, RotateCcw } from 'lucide-react'
import Avatar, { type AvatarState } from '@/components/Avatar'
import ChatInterface from '@/components/ChatInterface'
import SuggestionChips from '@/components/SuggestionChips'
import MouseEffect from '@/components/MouseEffect'
import MatrixEffect from '@/components/MatrixEffect'
import WorkWithMeModal from '@/components/WorkWithMeModal'
import AboutMeModal from '@/components/AboutMeModal'

/* ── Noise grain overlay ──────────────────────────── */
const NOISE_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`

export default function Home() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [avatarState, setAvatarState] = useState<AvatarState>('idle')
  const [showWorkModal, setShowWorkModal] = useState(false)
  const [showAboutModal, setShowAboutModal] = useState(false)
  const resetRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading, append, setMessages } = useChat({
    api: '/api/chat',
    onFinish: () => {
      if (resetRef.current) clearTimeout(resetRef.current)
      setAvatarState('happy')
      resetRef.current = setTimeout(() => setAvatarState('idle'), 2600)
    },
  })

  const hasMessages = messages.length > 0

  /* Avatar thinking state */
  useEffect(() => {
    if (isLoading) {
      if (resetRef.current) clearTimeout(resetRef.current)
      setAvatarState('thinking')
    }
  }, [isLoading])

  /* Theme init from localStorage */
  useEffect(() => {
    const saved = (localStorage.getItem('theme') as 'dark' | 'light') ?? 'dark'
    setTheme(saved)
    document.documentElement.setAttribute('data-theme', saved)
  }, [])

  const toggleTheme = () => {
    const next: 'dark' | 'light' = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('theme', next)
    document.documentElement.setAttribute('data-theme', next)
  }

  const handleSuggestion = (text: string) => {
    append({ role: 'user', content: text })
  }

  const handleReset = () => {
    setMessages([])
    if (resetRef.current) clearTimeout(resetRef.current)
    setAvatarState('idle')
  }

  return (
    <>
      <MouseEffect />

      <AnimatePresence>
        {showWorkModal && <WorkWithMeModal onClose={() => setShowWorkModal(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {showAboutModal && <AboutMeModal onClose={() => setShowAboutModal(false)} />}
      </AnimatePresence>


      {/* Full-viewport wrapper */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--bg)',
          overflow: 'hidden',
        }}
      >
        <MatrixEffect />

        {/* Noise grain */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            opacity: 0.035,
            backgroundImage: NOISE_SVG,
            backgroundRepeat: 'repeat',
            backgroundSize: '128px',
          }}
        />

        {/* Ambient glow orbs */}
        <div
          style={{
            position: 'absolute',
            width: 480,
            height: 480,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,212,255,0.055) 0%, transparent 70%)',
            top: '-120px',
            left: '50%',
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
          }}
        />

        {/* Top-right controls */}
        <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 50, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>

          {/* New chat button — only when conversation is active */}
          <AnimatePresence>
            {hasMessages && (
              <motion.button
                key="reset"
                initial={{ opacity: 0, scale: 0.85, x: 12 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.85, x: 12 }}
                transition={{ duration: 0.25 }}
                onClick={handleReset}
                whileHover={{
                  scale: 1.07,
                  boxShadow: '0 0 18px rgba(0,212,255,0.6), 0 0 40px rgba(0,212,255,0.25)',
                }}
                whileTap={{ scale: 0.93 }}
                title="Back"
                style={{
                  height: 38,
                  padding: '0 16px',
                  borderRadius: 19,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                  background: 'radial-gradient(ellipse at 40% 30%, #0d2233 0%, #060c12 100%)',
                  border: '1px solid rgba(0,212,255,0.5)',
                  boxShadow: '0 0 10px rgba(0,212,255,0.3), 0 0 24px rgba(0,212,255,0.1)',
                  color: '#00d4ff',
                  cursor: 'pointer',
                  fontSize: 13,
                  fontFamily: 'var(--font-jetbrains)',
                  letterSpacing: '0.04em',
                  transition: 'box-shadow 0.2s ease',
                }}
              >
                <RotateCcw size={13} strokeWidth={2} />
                Back
              </motion.button>
            )}
          </AnimatePresence>



          {/* About Me button */}
          <motion.button
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.3 }}
            onClick={() => setShowAboutModal(true)}
            whileHover={{ scale: 1.07, boxShadow: '0 0 18px rgba(0,212,255,0.6), 0 0 40px rgba(0,212,255,0.25)' }}
            whileTap={{ scale: 0.93 }}
            style={{
              height: 38,
              padding: '0 16px',
              borderRadius: 19,
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              background: 'radial-gradient(ellipse at 40% 30%, #0d2233 0%, #060c12 100%)',
              border: '1px solid rgba(0,212,255,0.5)',
              boxShadow: '0 0 10px rgba(0,212,255,0.3), 0 0 24px rgba(0,212,255,0.1)',
              color: '#00d4ff',
              cursor: 'pointer',
              fontSize: 13,
              fontFamily: 'var(--font-jetbrains)',
              letterSpacing: '0.04em',
            }}
          >
            About Me
          </motion.button>

          {/* Work with me button — always visible */}
          <motion.button
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.3 }}
            onClick={() => setShowWorkModal(true)}
            whileHover={{
              scale: 1.07,
              boxShadow: '0 0 18px rgba(0,212,255,0.6), 0 0 40px rgba(0,212,255,0.25)',
            }}
            whileTap={{ scale: 0.93 }}
            style={{
              height: 38,
              padding: '0 16px',
              borderRadius: 19,
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              background: 'radial-gradient(ellipse at 40% 30%, #0d2233 0%, #060c12 100%)',
              border: '1px solid rgba(0,212,255,0.5)',
              boxShadow: '0 0 10px rgba(0,212,255,0.3), 0 0 24px rgba(0,212,255,0.1)',
              color: '#00d4ff',
              cursor: 'pointer',
              fontSize: 13,
              fontFamily: 'var(--font-jetbrains)',
              letterSpacing: '0.04em',
            }}
          >
            Let's Work Together
          </motion.button>

          {/* Theme toggle */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            onClick={toggleTheme}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.93 }}
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--s1)',
              border: '1px solid var(--border)',
              color: 'var(--txt2)',
              cursor: 'pointer',
            }}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </motion.button>

        </div>

        {/* ── Avatar + hero area ─────────────────────────── */}
        <motion.div
          animate={{ paddingTop: hasMessages ? 12 : '9vh' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <motion.div
            animate={{ scale: hasMessages ? 0.48 : 1 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <Avatar state={avatarState} size={216} />
          </motion.div>

          <AnimatePresence>
            {!hasMessages && (
              <motion.div
                key="hero"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, delay: 0.12 }}
                style={{ textAlign: 'center', marginTop: 20 }}
              >
                <motion.h1
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.45 }}
                  style={{
                    fontFamily: 'var(--font-syne)',
                    fontWeight: 800,
                    fontSize: 'clamp(28px, 5vw, 44px)',
                    color: '#ffffff',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.15,
                    WebkitTextStroke: '1px rgba(0,212,255,0.45)',
                    textShadow: '0 0 16px rgba(0,212,255,0.42), 0 0 35px rgba(0,212,255,0.25), 0 0 70px rgba(0,212,255,0.1)',
                  }}
                >
                  Hey, I'm Raymond 👋
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  style={{
                    marginTop: 10,
                    fontFamily: 'var(--font-jetbrains)',
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#8a8a8a',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    textShadow: 'none',
                  }}
                >
                  AI Automation Specialist / Civil Engineer
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Messages area (scrollable) ─────────────────── */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div style={{ maxWidth: 672, margin: '0 auto', padding: '0 16px' }}>
            <ChatInterface messages={messages} isLoading={isLoading} />
          </div>
        </div>

        {/* ── Bottom: chips + input ──────────────────────── */}
        <div
          style={{
            flexShrink: 0,
            maxWidth: 672,
            width: '100%',
            margin: '0 auto',
            padding: '0 16px 20px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Top-fade over messages */}
          <div
            style={{
              position: 'absolute',
              top: -48,
              insetInline: 0,
              height: 48,
              background: `linear-gradient(to bottom, transparent, var(--bg))`,
              pointerEvents: 'none',
            }}
          />

          <AnimatePresence>
            {!hasMessages && (
              <motion.div
                key="chips"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.35 }}
                style={{ marginBottom: 12 }}
              >
                <SuggestionChips onSelect={handleSuggestion} onWorkWithMe={() => setShowWorkModal(true)} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chat input */}
          <form
            onSubmit={handleSubmit}
            style={{ position: 'relative' }}
          >
            <input
              value={input}
              onChange={handleInputChange}
              disabled={isLoading}
              placeholder={
                hasMessages
                  ? 'Type your message…'
                  : 'Hi! Ask me about Raymond\'s work, services, or how to get in touch…'
              }
              className="chat-input"
              style={{
                width: '100%',
                padding: '14px 52px 14px 18px',
                borderRadius: 18,
                border: '1px solid var(--border)',
                background: 'var(--s1)',
                color: '#f0ede8',
                fontFamily: 'var(--font-outfit)',
                fontSize: 14,
                outline: 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
            />
            <motion.button
              type="submit"
              disabled={isLoading || !input.trim()}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.93 }}
              style={{
                position: 'absolute',
                right: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 36,
                height: 36,
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--cyan)',
                color: '#000',
                border: 'none',
                cursor: 'pointer',
                opacity: isLoading || !input.trim() ? 0.35 : 1,
                transition: 'opacity 0.2s',
              }}
            >
              <ArrowUp size={16} strokeWidth={2.5} />
            </motion.button>
          </form>
        </div>
      </div>
    </>
  )
}
