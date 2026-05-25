'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  BookOpen, 
  BarChart3, 
  Settings as SettingsIcon, 
  ChevronLeft, 
  ChevronRight,
  GraduationCap
} from 'lucide-react'
import NavItem from './NavItem'
import { NavItemType } from '@/types'

const NAV_ITEMS: NavItemType[] = [
  { label: 'Dashboard', href: '/?tab=dashboard', iconName: 'LayoutDashboard' },
  { label: 'Courses', href: '/?tab=courses', iconName: 'BookOpen' },
  { label: 'Activity', href: '/?tab=activity', iconName: 'BarChart3' },
  { label: 'Settings', href: '/?tab=settings', iconName: 'SettingsIcon' }
]

function SidebarContent() {
  const searchParams = useSearchParams()
  const activeTab = searchParams.get('tab') || 'dashboard'
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Prevent hydration mismatches
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <aside className="hidden md:flex flex-col w-20 lg:w-64 h-screen bg-[#0b0b14] border-r border-white/5 p-4 shrink-0" />
    )
  }

  return (
    <>
      {/* Sidebar: Desktop (>1024px) & Tablet (768px-1024px) */}
      <aside 
        className={`hidden md:flex flex-col justify-between h-screen bg-[#0b0b14] border-r border-white/5 p-4 shrink-0 transition-all duration-300 relative z-30 ${
          isCollapsed ? 'w-20' : 'w-20 lg:w-64'
        }`}
      >
        <div className="flex flex-col gap-8">
          {/* Logo / Brand */}
          <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : 'lg:px-2'}`}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="hidden lg:block font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-300"
              >
                Aether Learn
              </motion.span>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => {
              const tabName = item.href.split('tab=')[1] || 'dashboard'
              const isActive = activeTab === tabName
              return (
                <NavItem
                  key={item.label}
                  label={item.label}
                  href={item.href}
                  iconName={item.iconName === 'SettingsIcon' ? 'Settings' : item.iconName}
                  isActive={isActive}
                  isCollapsed={isCollapsed}
                />
              )
            })}
          </nav>
        </div>

        {/* Sidebar Footer (Collapse Toggle) */}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-slate-200 transition-colors duration-200 cursor-pointer w-full text-left"
          >
            <div className="flex items-center justify-center shrink-0">
              {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </div>
            
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-sm font-medium whitespace-nowrap overflow-hidden"
                >
                  Collapse Sidebar
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Tablet only collapse visual fallback */}
          <div className="lg:hidden flex justify-center py-2 text-slate-500">
            <ChevronLeft className="w-4 h-4 opacity-50" />
          </div>
        </div>
      </aside>

      {/* Bottom Nav Bar: Mobile (<768px) */}
      <nav className="flex md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#0b0b14]/90 backdrop-blur-lg border-t border-white/5 justify-around items-center px-4 py-2 z-40">
        {NAV_ITEMS.map((item) => {
          const tabName = item.href.split('tab=')[1] || 'dashboard'
          const isActive = activeTab === tabName
          return (
            <div key={item.label} className="w-20">
              <NavItem
                label={item.label}
                href={item.href}
                iconName={item.iconName === 'SettingsIcon' ? 'Settings' : item.iconName}
                isActive={isActive}
                isCollapsed={false}
                isMobile={true}
              />
            </div>
          )
        })}
      </nav>
    </>
  )
}

export default function Sidebar() {
  return (
    <Suspense fallback={
      <aside className="hidden md:flex flex-col w-20 lg:w-64 h-screen bg-[#0b0b14] border-r border-white/5 p-4 shrink-0" />
    }>
      <SidebarContent />
    </Suspense>
  )
}
