'use client'

import { useState, useCallback } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Award, ChevronLeft, ChevronRight } from 'lucide-react'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

interface Props {
  onClose: () => void
}

export default function CertificatesModal({ onClose }: Props) {
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState(1)

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
  }, [])

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
          maxWidth: 780,
          maxHeight: '90vh',
          background: '#0a0c0e',
          border: '1px solid rgba(0,212,255,0.45)',
          borderRadius: 20,
          boxShadow: '0 0 40px rgba(0,212,255,0.15), 0 8px 60px rgba(0,0,0,0.7)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 20px',
          borderBottom: '1px solid rgba(0,212,255,0.15)',
          background: 'rgba(0,212,255,0.04)',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Award size={17} color="#00d4ff" />
            <div>
              <div style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 800,
                fontSize: 15,
                color: '#00d4ff',
              }}>
                IDs & Certificates
              </div>
              <div style={{
                fontFamily: 'var(--font-outfit)',
                fontSize: 11,
                color: 'rgba(0,212,255,0.45)',
                marginTop: 1,
              }}>
                Engr. Raymond Borja — Credentials & References
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'rgba(0,212,255,0.45)', cursor: 'pointer', display: 'flex' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* PDF Canvas Viewer */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px 16px',
          gap: 12,
          background: '#0d0f11',
        }}>
          <Document
            file="/Raymond_Borja_References.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div style={{ color: 'rgba(0,212,255,0.5)', fontFamily: 'var(--font-outfit)', fontSize: 14, padding: 40 }}>
                Loading...
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              width={Math.min(700, window.innerWidth - 80)}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        </div>

        {/* Pagination */}
        {numPages > 1 && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            padding: '12px 20px',
            borderTop: '1px solid rgba(0,212,255,0.12)',
            flexShrink: 0,
          }}>
            <motion.button
              onClick={() => setPageNumber(p => Math.max(1, p - 1))}
              disabled={pageNumber <= 1}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                background: 'none',
                border: '1px solid rgba(0,212,255,0.3)',
                borderRadius: 8,
                color: pageNumber <= 1 ? 'rgba(0,212,255,0.2)' : '#00d4ff',
                cursor: pageNumber <= 1 ? 'default' : 'pointer',
                padding: '6px 10px',
                display: 'flex',
              }}
            >
              <ChevronLeft size={16} />
            </motion.button>

            <span style={{
              fontFamily: 'var(--font-jetbrains)',
              fontSize: 12,
              color: 'rgba(0,212,255,0.6)',
              letterSpacing: '0.06em',
            }}>
              {pageNumber} / {numPages}
            </span>

            <motion.button
              onClick={() => setPageNumber(p => Math.min(numPages, p + 1))}
              disabled={pageNumber >= numPages}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                background: 'none',
                border: '1px solid rgba(0,212,255,0.3)',
                borderRadius: 8,
                color: pageNumber >= numPages ? 'rgba(0,212,255,0.2)' : '#00d4ff',
                cursor: pageNumber >= numPages ? 'default' : 'pointer',
                padding: '6px 10px',
                display: 'flex',
              }}
            >
              <ChevronRight size={16} />
            </motion.button>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
