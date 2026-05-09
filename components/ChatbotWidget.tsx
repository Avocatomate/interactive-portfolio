'use client'

import { useEffect, useRef, useState } from 'react'
import { useChat } from 'ai/react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowUp, MessageCircle, RotateCcw } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  const [error, setError] = useState<string | null>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
    api: '/api/chat',
    onError: (err) => setError(err.message ?? 'Something went wrong'),
    onResponse: () => setError(null),
  })

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  return (
    <>
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="widget-panel"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              bottom: 88,
              right: 20,
              width: 360,
              height: 520,
              borderRadius: 20,
              background: '#0d0d0e',
              border: '1px solid rgba(0,212,255,0.45)',
              boxShadow: '0 0 24px rgba(0,212,255,0.15), 0 8px 40px rgba(0,0,0,0.6)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              zIndex: 9990,
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px',
                borderBottom: '1px solid rgba(0,212,255,0.15)',
                background: 'rgba(0,212,255,0.04)',
                flexShrink: 0,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#00d4ff',
                    boxShadow: '0 0 8px rgba(0,212,255,0.8)',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-jetbrains)',
                    fontSize: 12,
                    color: '#00d4ff',
                    letterSpacing: '0.06em',
                  }}
                >
                  RAYMOND · AI ASSISTANT
                </span>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                {messages.length > 0 && (
                  <button
                    onClick={() => setMessages([])}
                    title="Clear chat"
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'rgba(255,255,255,0.35)',
                      cursor: 'pointer',
                      padding: 4,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <RotateCcw size={13} />
                  </button>
                )}
                <button
                  onClick={() => setOpen(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255,255,255,0.35)',
                    cursor: 'pointer',
                    padding: 4,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '14px 14px 4px',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              {messages.length === 0 && (
                <div
                  style={{
                    textAlign: 'center',
                    marginTop: 40,
                    color: 'rgba(255,255,255,0.25)',
                    fontFamily: 'var(--font-outfit)',
                    fontSize: 13,
                    lineHeight: 1.6,
                  }}
                >
                  <div style={{ fontSize: 28, marginBottom: 10 }}>👋</div>
                  Hey! I'm Raymond's AI assistant.
                  <br />Ask me anything about his work or services.
                </div>
              )}

              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22 }}
                    style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}
                  >
                    <div
                      style={{
                        maxWidth: '85%',
                        padding: '9px 13px',
                        borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                        fontSize: 13,
                        lineHeight: 1.6,
                        fontFamily: 'var(--font-outfit)',
                        background: msg.role === 'user' ? 'rgba(0,212,255,0.12)' : 'rgba(255,255,255,0.05)',
                        border: msg.role === 'user'
                          ? '1px solid rgba(0,212,255,0.35)'
                          : '1px solid rgba(255,255,255,0.08)',
                        borderLeft: msg.role === 'assistant' ? '2px solid rgba(0,212,255,0.45)' : undefined,
                        color: '#e8e8e8',
                      }}
                      className="prose-chat"
                    >
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    display: 'flex',
                    gap: 5,
                    padding: '9px 13px',
                    borderRadius: '16px 16px 16px 4px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderLeft: '2px solid rgba(0,212,255,0.45)',
                    width: 'fit-content',
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: '#00d4ff',
                        display: 'block',
                      }}
                      animate={{ opacity: [0.25, 1, 0.25], scale: [0.8, 1.1, 0.8] }}
                      transition={{ duration: 0.85, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
                    />
                  ))}
                </motion.div>
              )}

              {error && (
                <div
                  style={{
                    padding: '8px 12px',
                    borderRadius: 10,
                    background: 'rgba(255,60,60,0.1)',
                    border: '1px solid rgba(255,60,60,0.3)',
                    color: '#ff6b6b',
                    fontSize: 12,
                    fontFamily: 'var(--font-jetbrains)',
                  }}
                >
                  ⚠ {error}
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              style={{
                padding: '10px 12px',
                borderTop: '1px solid rgba(0,212,255,0.12)',
                display: 'flex',
                gap: 8,
                alignItems: 'center',
                flexShrink: 0,
              }}
            >
              <input
                value={input}
                onChange={handleInputChange}
                disabled={isLoading}
                placeholder="Ask me anything…"
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(0,212,255,0.3)',
                  borderRadius: 12,
                  padding: '9px 14px',
                  color: '#f0f0ef',
                  fontFamily: 'var(--font-outfit)',
                  fontSize: 13,
                  outline: 'none',
                }}
              />
              <motion.button
                type="submit"
                disabled={isLoading || !input.trim()}
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.93 }}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  background: '#00d4ff',
                  border: 'none',
                  color: '#000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0,
                  opacity: isLoading || !input.trim() ? 0.35 : 1,
                  transition: 'opacity 0.2s',
                }}
              >
                <ArrowUp size={15} strokeWidth={2.5} />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating trigger button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.08, boxShadow: '0 0 24px rgba(0,212,255,0.7), 0 0 50px rgba(0,212,255,0.3)' }}
        whileTap={{ scale: 0.93 }}
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at 40% 30%, #0d2233 0%, #060c12 100%)',
          border: '1.5px solid rgba(0,212,255,0.45)',
          boxShadow: '0 0 16px rgba(0,212,255,0.42), 0 0 35px rgba(0,212,255,0.25)',
          color: '#00d4ff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9991,
        }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X size={20} />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <MessageCircle size={20} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  )
}
