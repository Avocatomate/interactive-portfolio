'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Message } from 'ai'
import ReactMarkdown from 'react-markdown'
import Image from 'next/image'
import { ProjectCard } from '@/components/ProjectCard'
import { projects } from '@/lib/projects'

const PROJECT_TRIGGERS = [
  'show me your project',
  'show your project',
  'see your project',
  'your best project',
  'show me your work',
  'see your work',
  'show your work',
  'portfolio',
  'case study',
  'what have you built',
  'what projects',
  'show me examples',
  'see examples',
]

function userAskedForProjects(content: string) {
  const lower = content.toLowerCase()
  return PROJECT_TRIGGERS.some((kw) => lower.includes(kw))
}

const TOOLS_TRIGGERS = ['what tools', 'tools do you use', 'what platform', 'platforms do you use', 'tech stack', 'what software', 'tools you use']

function userAskedForTools(content: string) {
  const lower = content.toLowerCase()
  return TOOLS_TRIGGERS.some((kw) => lower.includes(kw))
}

const ZAPIER_TRIGGERS = [
  'zapier',
  'zap ',
  'zapier workflow',
  'zapier automation',
  'automation sample in zapier',
  'sample automation in zapier',
  'zapier example',
  'show me zapier',
]

function userAskedForZapier(content: string) {
  const lower = content.toLowerCase()
  return ZAPIER_TRIGGERS.some((kw) => lower.includes(kw))
}

const N8N_TRIGGERS = [
  'n8n',
  'n8n workflow',
  'n8n automation',
  'sample automation in n8n',
  'automation sample in n8n',
  'n8n example',
  'show me n8n',
  'sample n8n',
]

function userAskedForN8n(content: string) {
  const lower = content.toLowerCase()
  return N8N_TRIGGERS.some((kw) => lower.includes(kw))
}

const MAKE_TRIGGERS = [
  'make.com',
  'make automation',
  'make workflow',
  'sample automation in make',
  'automation sample in make',
  'make example',
  'show me make',
  'sample make',
  'make.com workflow',
  'make.com automation',
]

function userAskedForMake(content: string) {
  const lower = content.toLowerCase()
  return MAKE_TRIGGERS.some((kw) => lower.includes(kw))
}

function WorkflowGallery({ label, images }: { label: string; images: { src: string; alt: string }[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.4 }}
      style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
    >
      <div style={{
        fontFamily: 'var(--font-jetbrains)',
        fontSize: 11,
        color: 'rgba(0,212,255,0.5)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        paddingLeft: 2,
      }}>
        {label}
      </div>
      {images.map(({ src, alt }, i) => (
        <motion.div
          key={src}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + i * 0.12, duration: 0.35 }}
          style={{
            borderRadius: 12,
            overflow: 'hidden',
            border: '1px solid rgba(0,212,255,0.2)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
          }}
        >
          <Image
            src={src}
            alt={alt}
            width={700}
            height={400}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}

interface ChatInterfaceProps {
  messages: Message[]
  isLoading: boolean
}

export default function ChatInterface({ messages, isLoading }: ChatInterfaceProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  return (
    <div className="flex flex-col gap-4 py-2">
      <AnimatePresence initial={false}>
        {messages.map((msg, idx) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            {msg.role === 'user' ? (
              <div className="flex justify-end">
                <div
                  className="max-w-[82%] px-4 py-2.5 rounded-2xl rounded-tr-sm"
                  style={{
                    background: 'rgba(30,34,40,0.92)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: '#f0f0ef',
                    fontFamily: 'var(--font-outfit)',
                    fontSize: 15,
                    lineHeight: 1.65,
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {/* AI bubble */}
                {(() => {
                  const prevUser = messages.slice(0, idx).reverse().find(m => m.role === 'user')
                  const showLogos = prevUser && userAskedForTools(prevUser.content)
                  return (
                    <div
                      className="max-w-[92%] rounded-2xl rounded-tl-sm overflow-hidden"
                      style={{
                        background: 'rgba(18,22,28,0.92)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderLeft: '2px solid rgba(0,212,255,0.6)',
                        backdropFilter: 'blur(8px)',
                        boxShadow: '0 2px 20px rgba(0,0,0,0.4)',
                      }}
                    >
                      {showLogos && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15, duration: 0.35 }}
                          style={{ borderBottom: '1px solid rgba(0,212,255,0.15)' }}
                        >
                          <Image
                            src="/logos.png"
                            alt="Tools & Platforms"
                            width={600}
                            height={200}
                            style={{ width: '100%', height: 'auto', display: 'block' }}
                          />
                        </motion.div>
                      )}
                      <div
                        className="px-5 py-4 prose-chat"
                        style={{
                          color: '#00d4ff',
                          fontFamily: 'var(--font-outfit)',
                          fontSize: 15,
                          lineHeight: 1.75,
                        }}
                      >
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    </div>
                  )
                })()}

                {/* Inline project cards — only when user explicitly asked */}
                {(() => {
                  const prevUser = messages.slice(0, idx).reverse().find(m => m.role === 'user')
                  return prevUser && userAskedForProjects(prevUser.content)
                })() && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {projects.map((p, i) => (
                      <ProjectCard key={p.id} project={p} index={i} />
                    ))}
                  </div>
                )}

                {/* Zapier workflow screenshots — only when user asks about Zapier */}
                {(() => {
                  const prevUser = messages.slice(0, idx).reverse().find(m => m.role === 'user')
                  return prevUser && userAskedForZapier(prevUser.content)
                })() && (
                  <WorkflowGallery
                    label="Sample Zapier Workflow"
                    images={[
                      { src: '/projects/z1.png', alt: 'Zapier workflow 1' },
                      { src: '/projects/z2.png', alt: 'Zapier workflow 2' },
                    ]}
                  />
                )}

                {/* n8n workflow screenshots — only when user asks about n8n */}
                {(() => {
                  const prevUser = messages.slice(0, idx).reverse().find(m => m.role === 'user')
                  return prevUser && userAskedForN8n(prevUser.content)
                })() && (
                  <WorkflowGallery
                    label="Sample n8n Workflow"
                    images={[
                      { src: '/projects/n1.png', alt: 'n8n workflow 1' },
                      { src: '/projects/n2.png', alt: 'n8n workflow 2' },
                      { src: '/projects/n3.png', alt: 'n8n workflow 3' },
                    ]}
                  />
                )}

                {/* Make.com workflow screenshots — only when user asks about Make */}
                {(() => {
                  const prevUser = messages.slice(0, idx).reverse().find(m => m.role === 'user')
                  return prevUser && userAskedForMake(prevUser.content)
                })() && (
                  <WorkflowGallery
                    label="Sample Make.com Workflow"
                    images={[
                      { src: '/projects/m1.png', alt: 'Make.com workflow 1' },
                      { src: '/projects/m2.png', alt: 'Make.com workflow 2' },
                    ]}
                  />
                )}
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Typing indicator */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-1.5 px-4 py-3 rounded-2xl rounded-tl-sm w-fit"
          style={{
            background: 'var(--s1)',
            border: '1px solid var(--border)',
            borderLeft: '2px solid rgba(0,212,255,0.45)',
          }}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ background: 'var(--cyan)', display: 'block' }}
              animate={{ opacity: [0.25, 1, 0.25], scale: [0.8, 1.1, 0.8] }}
              transition={{ duration: 0.85, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
            />
          ))}
        </motion.div>
      )}

      <div ref={bottomRef} />
    </div>
  )
}
