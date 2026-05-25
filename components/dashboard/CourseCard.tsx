'use client'

import React from 'react'
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { Course } from '@/types'
import { itemVariants } from './BentoGrid'

interface CourseCardProps {
  course: Course;
}

// Dynamic Lucide Icon component resolver
const CourseIcon = ({ iconName, className }: { iconName: string; className?: string }) => {
  const IconComponent = (Icons as any)[iconName] || Icons.BookOpen
  return <IconComponent className={className} />
}

export default function CourseCard({ course }: CourseCardProps) {
  const { title, progress, icon_name } = course

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="col-span-1 rounded-2xl border border-white/5 bg-[#111118] p-6 flex flex-col justify-between min-h-[240px] noise-overlay glow-on-hover shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
    >
      {/* Card Header: Icon & Decorator */}
      <div className="flex justify-between items-start">
        <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 border border-indigo-500/15">
          <CourseIcon iconName={icon_name} className="w-6 h-6" />
        </div>
        <span className="text-[10px] uppercase font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full tracking-wider">
          Active
        </span>
      </div>

      {/* Course Title */}
      <div className="mt-4">
        <h2 className="text-lg font-bold text-white tracking-tight leading-snug line-clamp-2">
          {title}
        </h2>
      </div>

      {/* Progress Section */}
      <div className="space-y-2 mt-4">
        <div className="flex justify-between items-center text-xs font-semibold">
          <span className="text-slate-400">Course Progress</span>
          <span className="text-indigo-400 font-bold">{progress}%</span>
        </div>
        
        {/* Progress Bar Container */}
        <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
          />
        </div>
      </div>
    </motion.div>
  )
}
