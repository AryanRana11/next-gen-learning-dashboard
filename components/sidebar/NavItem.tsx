'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'

interface NavItemProps {
  label: string;
  href: string;
  iconName: string;
  isActive: boolean;
  isCollapsed: boolean;
  isMobile?: boolean;
}

export default function NavItem({
  label,
  href,
  iconName,
  isActive,
  isCollapsed,
  isMobile = false
}: NavItemProps) {
  // Dynamically resolve Lucide icon component
  const IconComponent = (Icons as any)[iconName] || Icons.HelpCircle

  return (
    <Link href={href} className="relative w-full block group">
      <div
        className={`relative z-10 flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-200 cursor-pointer ${
          isMobile
            ? 'flex-col gap-1 px-2 py-1 justify-center'
            : isCollapsed
            ? 'justify-center px-0'
            : ''
        } ${isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}
      >
        {/* Lucide Icon */}
        <IconComponent className={`${isMobile ? 'w-5 h-5' : 'w-5 h-5'} shrink-0`} />

        {/* Text Label */}
        {!isMobile && !isCollapsed && (
          <span className="text-sm font-medium transition-opacity duration-200">
            {label}
          </span>
        )}
        {isMobile && (
          <span className="text-[10px] font-medium leading-none">
            {label}
          </span>
        )}

        {/* Tooltip for collapsed sidebar */}
        {!isMobile && isCollapsed && (
          <div className="absolute left-full ml-3 px-2 py-1 bg-[#151522] border border-white/5 text-xs text-slate-200 rounded-md opacity-0 pointer-events-none translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 z-50 shadow-lg">
            {label}
          </div>
        )}
      </div>

      {/* Active Navigation Highlight Pill (layoutId) */}
      {isActive && (
        <motion.div
          layoutId="active-nav"
          className="absolute inset-0 bg-white/10 border-l-2 border-indigo-500 rounded-xl"
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  )
}
