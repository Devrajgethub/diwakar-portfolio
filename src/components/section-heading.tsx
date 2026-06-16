'use client'

import { motion } from 'framer-motion'
import { Terminal } from 'lucide-react'

interface SectionHeadingProps {
  title: string
  subtitle?: string
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center mb-12"
    >
      <div className="flex items-center justify-center gap-2 mb-2">
        <Terminal className="h-5 w-5 text-cyber-green" />
        <span className="text-cyber-green font-mono text-sm">
          ~/portfolio/{title.toLowerCase().replace(/\s+/g, '-')}
        </span>
      </div>
      <h2 className="text-3xl sm:text-4xl font-bold">
        <span className="text-cyber-green">&lt;</span>
        <span className="text-foreground">{title}</span>
        <span className="text-cyber-green">/&gt;</span>
      </h2>
      {subtitle && (
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">{subtitle}</p>
      )}
      <div className="mt-4 h-1 w-20 mx-auto bg-gradient-to-r from-cyber-green to-cyber-cyan rounded-full" style={{ boxShadow: '0 0 10px rgba(0, 255, 65, 0.5)' }} />
    </motion.div>
  )
}
