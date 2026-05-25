'use client'
import React, { useEffect, useState } from 'react'
import { motion, Variants } from 'framer-motion'
import { BookOpen, Clock, Flame } from 'lucide-react'
import { itemVariants } from './BentoGrid'

const gridContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.02
    }
  }
}

const squareVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      type: 'spring',
      stiffness: 200,
      damping: 15
    }
  }
}

interface ActivitySquare {
  id: number;
  level: number; 
}

export default function ActivityTile() {
  const [squares, setSquares] = useState<ActivitySquare[]>([])

  useEffect(() => {
    const mockSquares = Array.from({ length: 35 }).map((_, i) => {
      const rand = Math.random()
      let level = 0
      if (rand > 0.85) level = 3
      else if (rand > 0.6) level = 2
      else if (rand > 0.15) level = 1
      return { id: i, level }
    })
    setSquares(mockSquares)
  }, [])
  const getSquareColor = (level: number) => {
    switch (level) {
      case 3: return 'bg-violet-500 shadow-sm shadow-violet-500/20' 
      case 2: return 'bg-indigo-600' 
      case 1: return 'bg-indigo-900/60'
      case 0:
      default: return 'bg-white/[0.03]'
    }
  }

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="col-span-1 lg:row-span-2 rounded-2xl border border-white/5 bg-[#111118] p-6 flex flex-col justify-between min-h-[400px] lg:min-h-[552px] noise-overlay glow-on-hover shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
    >
      <div className="space-y-6">
        {/* Title */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-white tracking-tight">Weekly Activity</h2>
          <span className="text-xs text-[#64748b] bg-white/5 px-2 py-1 rounded-md border border-white/5">
            Last 5 Weeks
          </span>
        </div>

        {/* Mock Contribution Graph (7 columns x 5 rows) */}
        <div className="flex flex-col items-center justify-center py-4 bg-white/[0.01] rounded-xl border border-white/[0.02] p-4">
          {/* Legend days */}
          <div className="grid grid-cols-7 gap-2 w-full max-w-[220px] text-center text-[10px] text-slate-500 font-semibold mb-2 uppercase">
            <span>M</span>
            <span>T</span>
            <span>W</span>
            <span>T</span>
            <span>F</span>
            <span>S</span>
            <span>S</span>
          </div>

          <motion.div
            variants={gridContainerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-7 gap-2 w-full max-w-[220px]"
          >
            {squares.map((sq) => (
              <motion.div
                key={sq.id}
                variants={squareVariants}
                className={`aspect-square w-full rounded-[3px] transition-all duration-300 ${getSquareColor(sq.level)}`}
                whileHover={{ scale: 1.2, zIndex: 10 }}
                title={`Activity Level: ${sq.level}`}
              />
            ))}
          </motion.div>
          
          {/* Graph Legend */}
          <div className="flex items-center gap-1.5 mt-4 self-end text-[10px] text-slate-500">
            <span>Less</span>
            <span className="w-2.5 h-2.5 rounded-[1px] bg-white/[0.03]"></span>
            <span className="w-2.5 h-2.5 rounded-[1px] bg-indigo-900/60"></span>
            <span className="w-2.5 h-2.5 rounded-[1px] bg-indigo-600"></span>
            <span className="w-2.5 h-2.5 rounded-[1px] bg-violet-500"></span>
            <span>More</span>
          </div>
        </div>
      </div>

      {/* Stats section at the bottom */}
      <div className="space-y-3 mt-6 lg:mt-0">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Activity Summary
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {/* Stat 1 */}
          <div className="bg-[#151522] border border-white/5 rounded-xl p-3 flex flex-col items-center justify-center text-center">
            <BookOpen className="w-4 h-4 text-indigo-400 mb-1" />
            <span className="text-sm font-bold text-white">24</span>
            <span className="text-[9px] text-slate-400 uppercase font-semibold">lessons</span>
          </div>

          {/* Stat 2 */}
          <div className="bg-[#151522] border border-white/5 rounded-xl p-3 flex flex-col items-center justify-center text-center">
            <Clock className="w-4 h-4 text-violet-400 mb-1" />
            <span className="text-sm font-bold text-white">8 hrs</span>
            <span className="text-[9px] text-slate-400 uppercase font-semibold">time</span>
          </div>

          {/* Stat 3 */}
          <div className="bg-[#151522] border border-white/5 rounded-xl p-3 flex flex-col items-center justify-center text-center">
            <Flame className="w-4 h-4 text-amber-500 mb-1" />
            <span className="text-sm font-bold text-white">3</span>
            <span className="text-[9px] text-slate-400 uppercase font-semibold">streaks</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
