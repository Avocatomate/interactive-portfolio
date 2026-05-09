'use client'

import { motion } from 'framer-motion'

const CHIPS = [
  'Show me your best projects 🚀',
  'What tools do you use?',
  'How can we work together?',
  'Tell me about your background',
]

const WORK_CHIP = 'How can we work together?'

interface SuggestionChipsProps {
  onSelect: (text: string) => void
  onWorkWithMe: () => void
}

export default function SuggestionChips({ onSelect, onWorkWithMe }: SuggestionChipsProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {CHIPS.map((chip, i) => (
        <motion.button
          key={chip}
          initial={{ opacity: 0, y: 10, scale: 0.93 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5 + i * 0.07, duration: 0.35 }}
          whileHover={{
            scale: 1.06,
            borderColor: 'rgba(0,212,255,0.8)',
            boxShadow: '0 0 14px rgba(0,212,255,0.55), 0 0 32px rgba(0,212,255,0.2)',
            color: '#00d4ff',
          }}
          whileTap={{ scale: 0.96 }}
          onClick={() => chip === WORK_CHIP ? onWorkWithMe() : onSelect(chip)}
          className="px-4 py-2 rounded-full text-sm cursor-pointer"
          style={{
            background: 'var(--s1)',
            border: '1px solid rgba(0,212,255,0.45)',
            color: 'var(--txt2)',
            fontFamily: 'var(--font-outfit)',
            boxShadow: '0 0 8px rgba(0,212,255,0.2), 0 0 20px rgba(0,212,255,0.08)',
            transition: 'color 0.2s ease',
          }}
        >
          {chip}
        </motion.button>
      ))}
    </div>
  )
}
