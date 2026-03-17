"use client"

import { motion } from 'framer-motion'

interface FloatingElementProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  x?: number
  y?: number
  className?: string
}

export function FloatingElement({
  children,
  delay = 0,
  duration = 3,
  x = 20,
  y = 20,
  className = ""
}: FloatingElementProps) {
  return (
    <motion.div
      animate={{
        x: [0, x, 0],
        y: [0, y, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function FloatingParticles({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Large floating circles */}
      <FloatingElement delay={0} duration={4} x={30} y={25} className="absolute top-10 left-10">
        <div className="w-16 h-16 bg-gradient-to-br from-teal-400/20 to-cyan-400/20 rounded-full blur-xl" />
      </FloatingElement>
      
      <FloatingElement delay={1} duration={5} x={-25} y={20} className="absolute top-32 right-20">
        <div className="w-12 h-12 bg-gradient-to-br from-cyan-400/15 to-teal-400/15 rounded-full blur-lg" />
      </FloatingElement>
      
      <FloatingElement delay={2} duration={3.5} x={15} y={-30} className="absolute bottom-20 left-32">
        <div className="w-20 h-20 bg-gradient-to-br from-teal-300/10 to-cyan-300/10 rounded-full blur-2xl" />
      </FloatingElement>
      
      <FloatingElement delay={0.5} duration={6} x={-20} y={-15} className="absolute bottom-32 right-16">
        <div className="w-8 h-8 bg-gradient-to-br from-cyan-500/25 to-teal-500/25 rounded-full blur-sm" />
      </FloatingElement>
      
      {/* Small floating dots */}
      <FloatingElement delay={1.5} duration={4} x={10} y={15} className="absolute top-1/4 left-1/4">
        <div className="w-4 h-4 bg-teal-400/30 rounded-full blur-sm" />
      </FloatingElement>
      
      <FloatingElement delay={2.5} duration={5} x={-12} y={10} className="absolute top-1/2 right-1/3">
        <div className="w-6 h-6 bg-cyan-400/20 rounded-full blur-md" />
      </FloatingElement>
      
      <FloatingElement delay={3} duration={3.8} x={18} y={-12} className="absolute bottom-1/4 left-1/2">
        <div className="w-3 h-3 bg-teal-500/40 rounded-full" />
      </FloatingElement>
    </div>
  )
}