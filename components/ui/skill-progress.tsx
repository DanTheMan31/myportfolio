"use client"

import { motion, useInView } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

interface SkillProgressProps {
  skill: string
  percentage: number
  delay?: number
  color?: string
}

export function SkillProgress({ skill, percentage, delay = 0, color = "teal" }: SkillProgressProps) {
  const ref = useRef(null)
  const isVisible = useInView(ref, { once: true, margin: '-50px' })
  const [animatedPercentage, setAnimatedPercentage] = useState(0)

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setAnimatedPercentage(percentage)
      }, delay * 1000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, percentage, delay])

  const colorClasses = {
    teal: "from-teal-500 to-cyan-500",
    blue: "from-blue-500 to-indigo-500",
    green: "from-green-500 to-emerald-500",
    purple: "from-purple-500 to-pink-500",
    orange: "from-orange-500 to-red-500"
  }

  return (
    <motion.div
      ref={ref as any}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      className="space-y-2"
    >
      <div className="flex justify-between items-center">
        <span className="font-poppins font-medium text-slate-700">{skill}</span>
        <span className="font-poppins font-bold text-teal-600">
          {animatedPercentage}%
        </span>
      </div>
      <div className="relative h-3 bg-slate-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: isVisible ? `${animatedPercentage}%` : 0 }}
          transition={{ 
            duration: 1.5, 
            delay: delay + 0.2, 
            ease: [0.25, 0.4, 0.25, 1] 
          }}
          className={`h-full bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} rounded-full relative overflow-hidden`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
        </motion.div>
      </div>
    </motion.div>
  )
}