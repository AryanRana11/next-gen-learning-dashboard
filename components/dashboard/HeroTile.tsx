'use client'
import React from 'react'
import { motion, Variants } from 'framer-motion'
import { Flame, Sparkles } from 'lucide-react'
import { itemVariants } from './BentoGrid'
const circleContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08
    }
  }
}

const circleVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      type: 'spring', 
      stiffness: 260, 
      damping: 15 
    } 
  }
}

export default function HeroTile() {
  const streakDays = Array.from({ length: 12 }).map((_, i) => ({
    dayNumber: i + 1,
    isCompleted: i < 11 
  }))
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="col-span-1 md:col-span-2 lg:col-span-2 rounded-2xl border border-white/5 p-6 md:p-8 flex flex-col justify-between min-h-[260px] animated-mesh-bg noise-overlay glow-on-hover shadow-[0_4px_30px_rgba(0,0,0,0.3)] relative overflow-hidden"
    >
      {/* Decorative subtle background lights */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Welcome Text */}
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-semibold border border-indigo-500/30 flex items-center gap-1">
            <Sparkles className="w-3. h-3" /> Pro Member
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-none mb-3">
          Welcome back, Alex 👋
        </h1>
        <p className="text-slate-300 text-sm md:text-base font-medium flex items-center gap-1.5">
          You're on a <span className="text-amber-400 flex items-center font-bold gap-0.5"><Flame className="w-5 h-5 fill-amber-400 text-amber-500" /> 12-day</span> learning streak!
        </p>
      </div>

      {/* Streak Indicator Dots */}
      <div className="relative z-10 mt-6 md:mt-0">
        <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">
          Streak Progress (Last 12 Days)
        </h3>
        
        <motion.div 
          variants={circleContainerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-2 md:gap-3"
        >
          {streakDays.map((day) => (
            <motion.div
              key={day.dayNumber}
              variants={circleVariants}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                day.isCompleted
                  ? 'bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-lg shadow-orange-500/20 scale-105 border border-orange-400/30'
                  : 'bg-white/5 text-slate-500 border border-white/5'
              }`}
              title={`Day ${day.dayNumber}: ${day.isCompleted ? 'Active' : 'Today'}`}
            >
              {day.isCompleted ? (
                <Flame className="w-4 h-4 fill-white text-white" />
              ) : (
                day.dayNumber
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
