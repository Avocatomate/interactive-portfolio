'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { type Project } from '@/lib/projects'

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.09, duration: 0.4 }}
      className="relative overflow-hidden rounded-2xl flex flex-col"
      style={{
        background: 'var(--s1)',
        border: '1px solid var(--border)',
      }}
    >
      {/* Visual header — image or gradient fallback */}
      <div className="relative h-28 w-full overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: project.gradient }}
        />
        {project.image && (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            style={{ opacity: 0.75 }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        )}
        {/* Bottom fade into card */}
        <div
          className="absolute inset-x-0 bottom-0 h-10"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--s1))' }}
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3
          className="text-sm font-bold leading-tight"
          style={{ fontFamily: 'var(--font-syne)', color: 'var(--txt)' }}
        >
          {project.title}
        </h3>

        <p
          className="text-xs leading-relaxed"
          style={{ color: 'var(--txt2)', fontFamily: 'var(--font-outfit)' }}
        >
          {project.description}
        </p>

        {/* Metric badges */}
        <div className="flex flex-wrap gap-1.5 mt-1">
          {project.metrics.map((m) => (
            <span
              key={m}
              className="px-2 py-0.5 rounded-full text-xs font-medium"
              style={{
                background: 'rgba(0,212,255,0.1)',
                color: 'var(--cyan)',
                border: '1px solid rgba(0,212,255,0.2)',
                fontFamily: 'var(--font-jetbrains)',
              }}
            >
              {m}
            </span>
          ))}
        </div>

      </div>
    </motion.div>
  )
}
