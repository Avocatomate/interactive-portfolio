'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Phone, MapPin, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface Props {
  onClose: () => void
}

const SOCIALS = [
  {
    name: 'LinkedIn',
    handle: 'Raymond Borja',
    url: 'https://www.linkedin.com/in/raymond-borja-2bb4a5255/',
    color: '#0a66c2',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: 'Facebook',
    handle: 'Raymond Borja',
    url: 'https://www.facebook.com/raymond.borja.716',
    color: '#1877f2',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    name: 'Avocado AI Solutions',
    handle: 'Company Facebook Page',
    url: 'https://www.facebook.com/profile.php?id=61566690103043',
    color: '#1877f2',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    name: 'Instagram',
    handle: '@montrep01',
    url: 'https://www.instagram.com/montrep01/',
    color: '#e1306c',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
  },
]

const CERTS = [
  { title: 'AI Automation with n8n', issuer: 'Technical Virtual Assistants PH', date: 'April 29, 2026', image: '/projects/N8n.png' },
  { title: 'No Code Automation with Make.com', issuer: 'Technical Virtual Assistants PH', date: 'April 3, 2026', image: '/projects/Make.png' },
  { title: 'No Code Automation with Zapier', issuer: 'Technical Virtual Assistants PH', date: 'March 28, 2026', image: '/projects/Zappier.png' },
  { title: 'BS Civil Engineering', issuer: 'Licensed Civil Engineer, Philippines', date: '', image: '/prcid.png' },
]

export default function AboutMeModal({ onClose }: Props) {
  const [lightbox, setLightbox] = useState<string | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.8)',
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
          maxWidth: 480,
          maxHeight: '90vh',
          overflowY: 'auto',
          background: '#0a0c0e',
          border: '1px solid rgba(0,212,255,0.45)',
          borderRadius: 20,
          boxShadow: '0 0 40px rgba(0,212,255,0.15), 0 8px 60px rgba(0,0,0,0.7)',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          borderBottom: '1px solid rgba(0,212,255,0.12)',
          background: 'rgba(0,212,255,0.04)',
        }}>
          <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 16, color: '#00d4ff' }}>
            About Me
          </span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(0,212,255,0.45)', cursor: 'pointer', display: 'flex' }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Profile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: 'linear-gradient(135deg, #0d2233, #060c12)',
              border: '2px solid rgba(0,212,255,0.45)',
              boxShadow: '0 0 16px rgba(0,212,255,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28,
            }}>
              👨‍💻
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 18, color: '#ffffff' }}>
                Engr. Raymond Borja
              </div>
              <div style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 11, color: '#00d4ff', letterSpacing: '0.08em', marginTop: 3 }}>
                AI AUTOMATION SPECIALIST / CIVIL ENGINEER
              </div>
            </div>
          </div>

          {/* Contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { icon: <Mail size={14} />, text: 'raymondborja21@gmail.com' },
              { icon: <Phone size={14} />, text: '+63 927-066-4056 (WhatsApp)' },
              { icon: <MapPin size={14} />, text: 'Philippines' },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(0,212,255,0.7)', fontFamily: 'var(--font-outfit)', fontSize: 13 }}>
                <span style={{ color: '#00d4ff', flexShrink: 0 }}>{icon}</span>
                {text}
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(0,212,255,0.1)' }} />

          {/* Social Links */}
          <div>
            <div style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 11, color: 'rgba(0,212,255,0.5)', letterSpacing: '0.1em', marginBottom: 12 }}>
              SOCIAL PROFILES
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {SOCIALS.map((s) => (
                <motion.a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4, borderColor: s.color }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: 12,
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    textDecoration: 'none',
                    transition: 'border-color 0.2s',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ color: s.color }}>{s.icon}</span>
                    <div>
                      <div style={{ fontFamily: 'var(--font-outfit)', fontSize: 14, color: '#e0e0e0', fontWeight: 500 }}>{s.name}</div>
                      <div style={{ fontFamily: 'var(--font-outfit)', fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 1 }}>{s.handle}</div>
                    </div>
                  </div>
                  <ExternalLink size={13} color="rgba(255,255,255,0.25)" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(0,212,255,0.1)' }} />

          {/* Reference Photo */}
          <div>
            <div style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 11, color: 'rgba(0,212,255,0.5)', letterSpacing: '0.1em', marginBottom: 12 }}>
              REFERENCE PHOTO
            </div>
            <motion.div
              whileHover={{ scale: 1.01 }}
              onClick={() => setLightbox('/Self.png')}
              style={{
                borderRadius: 14,
                overflow: 'hidden',
                border: '1px solid rgba(0,212,255,0.2)',
                cursor: 'zoom-in',
                position: 'relative',
              }}
            >
              <Image
                src="/Self.png"
                alt="Raymond Borja"
                width={440}
                height={300}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </motion.div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(0,212,255,0.1)' }} />

          {/* Certificates */}
          <div>
            <div style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 11, color: 'rgba(0,212,255,0.5)', letterSpacing: '0.1em', marginBottom: 12 }}>
              CERTIFICATIONS & CREDENTIALS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {CERTS.map((c) => (
                <motion.div
                  key={c.title}
                  whileHover={c.image ? { scale: 1.01, borderColor: 'rgba(0,212,255,0.3)' } : {}}
                  onClick={() => c.image && setLightbox(c.image)}
                  style={{
                    borderRadius: 12,
                    background: 'rgba(0,212,255,0.04)',
                    border: '1px solid rgba(0,212,255,0.12)',
                    overflow: 'hidden',
                    cursor: c.image ? 'pointer' : 'default',
                    transition: 'border-color 0.2s',
                  }}
                >
                  {c.image && (
                    <div style={{ position: 'relative', width: '100%', height: 160 }}>
                      <Image src={c.image} alt={c.title} fill style={{ objectFit: 'cover' }} />
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.7) 100%)',
                      }} />
                    </div>
                  )}
                  <div style={{ padding: '10px 14px' }}>
                    <div style={{ fontFamily: 'var(--font-outfit)', fontSize: 13, color: '#00d4ff', fontWeight: 600 }}>{c.title}</div>
                    <div style={{ fontFamily: 'var(--font-outfit)', fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>
                      {c.issuer}{c.date ? ` · ${c.date}` : ''}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 10000,
              background: 'rgba(0,0,0,0.92)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: 20, cursor: 'zoom-out',
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{ position: 'relative', maxWidth: 800, width: '100%', borderRadius: 16, overflow: 'hidden' }}
            >
              <Image
                src={lightbox}
                alt="Certificate"
                width={800}
                height={600}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
