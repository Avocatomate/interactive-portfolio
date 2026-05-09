'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, CheckCircle } from 'lucide-react'

interface Props {
  onClose: () => void
}

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(0,212,255,0.3)',
  borderRadius: 10,
  padding: '11px 14px',
  color: '#00d4ff',
  fontFamily: 'var(--font-outfit)',
  fontSize: 14,
  outline: 'none',
}

const labelStyle = {
  display: 'block',
  fontFamily: 'var(--font-jetbrains)',
  fontSize: 11,
  color: 'rgba(0,212,255,0.6)',
  letterSpacing: '0.08em',
  marginBottom: 6,
}

export default function WorkWithMeModal({ onClose }: Props) {
  const [form, setForm] = useState({ name: '', email: '', whatsapp: '', company: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.whatsapp || !form.company) {
      setError('Please fill in all fields.')
      return
    }
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/save-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          whatsapp: form.whatsapp,
          companyName: form.company,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setSuccess(true)
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(6px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.96 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '100%',
          maxWidth: 440,
          background: '#0a0c0e',
          border: '1px solid rgba(0,212,255,0.45)',
          borderRadius: 20,
          boxShadow: '0 0 40px rgba(0,212,255,0.15), 0 8px 60px rgba(0,0,0,0.6)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '18px 20px',
          borderBottom: '1px solid rgba(0,212,255,0.12)',
          background: 'rgba(0,212,255,0.04)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 800,
              fontSize: 18,
              color: '#00d4ff',
              letterSpacing: '-0.01em',
            }}>
              Let's Work Together
            </div>
            <div style={{
              fontFamily: 'var(--font-outfit)',
              fontSize: 12,
              color: 'rgba(0,212,255,0.5)',
              marginTop: 2,
            }}>
              Fill in your details and I'll reach out shortly
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(0,212,255,0.4)',
              cursor: 'pointer',
              padding: 4,
              display: 'flex',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px 20px' }}>
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '24px 0' }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                >
                  <CheckCircle size={52} color="#00d4ff" style={{ margin: '0 auto 16px' }} />
                </motion.div>
                <div style={{
                  fontFamily: 'var(--font-syne)',
                  fontWeight: 700,
                  fontSize: 20,
                  color: '#00d4ff',
                  marginBottom: 8,
                }}>
                  Thank you! 🙌
                </div>
                <div style={{
                  fontFamily: 'var(--font-outfit)',
                  fontSize: 14,
                  color: 'rgba(0,212,255,0.65)',
                  lineHeight: 1.6,
                }}>
                  I received your details and will contact you shortly.<br />
                  Talk soon! — Raymond
                </div>
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    marginTop: 24,
                    padding: '10px 28px',
                    borderRadius: 12,
                    background: 'rgba(0,212,255,0.1)',
                    border: '1px solid rgba(0,212,255,0.35)',
                    color: '#00d4ff',
                    fontFamily: 'var(--font-outfit)',
                    fontSize: 14,
                    cursor: 'pointer',
                  }}
                >
                  Close
                </motion.button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
              >
                <div>
                  <label style={labelStyle}>FULL NAME</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Juan dela Cruz"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>EMAIL ADDRESS</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="e.g. juan@example.com"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>WHATSAPP NUMBER</label>
                  <input
                    name="whatsapp"
                    value={form.whatsapp}
                    onChange={handleChange}
                    placeholder="e.g. +63 917 123 4567"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>COMPANY NAME</label>
                  <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="e.g. Avocado AI Solutions"
                    style={inputStyle}
                  />
                </div>

                {error && (
                  <div style={{
                    fontSize: 12,
                    color: '#ff6b6b',
                    fontFamily: 'var(--font-outfit)',
                    padding: '8px 12px',
                    background: 'rgba(255,60,60,0.08)',
                    border: '1px solid rgba(255,60,60,0.2)',
                    borderRadius: 8,
                  }}>
                    {error}
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(0,212,255,0.4)' }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    marginTop: 4,
                    padding: '13px',
                    borderRadius: 12,
                    background: 'radial-gradient(ellipse at 40% 30%, #0d2233 0%, #060c12 100%)',
                    border: '1px solid rgba(0,212,255,0.5)',
                    boxShadow: '0 0 12px rgba(0,212,255,0.25)',
                    color: '#00d4ff',
                    fontFamily: 'var(--font-jetbrains)',
                    fontSize: 13,
                    letterSpacing: '0.06em',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.6 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                  }}
                >
                  <Send size={14} />
                  {loading ? 'SENDING...' : 'SEND MESSAGE'}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
}
