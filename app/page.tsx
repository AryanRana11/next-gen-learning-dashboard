import React, { Suspense } from 'react'
import { supabase } from '@/lib/supabase'
import BentoGrid from '@/components/dashboard/BentoGrid'
import HeroTile from '@/components/dashboard/HeroTile'
import ActivityTile from '@/components/dashboard/ActivityTile'
import CourseCard from '@/components/dashboard/CourseCard'
import SkeletonCard from '@/components/dashboard/SkeletonCard'
import { Course } from '@/types'
import { AlertCircle, RefreshCw, BookOpen, User, Settings as SettingsIcon, Bell, Lock } from 'lucide-react'
import Link from 'next/link'

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Course Grid component that fetches data on the server
async function CourseGrid() {
  const { data, error } = await supabase.from('courses').select('*')
  const courses = data as Course[] | null

  if (error) {
    return (
      <div className="col-span-1 md:col-span-2 lg:col-span-2 rounded-2xl border border-red-500/20 bg-red-500/5 p-6 flex flex-col items-center justify-center text-center gap-3 min-h-[240px]">
        <AlertCircle className="w-10 h-10 text-red-400" />
        <h3 className="text-lg font-bold text-white">Failed to load courses</h3>
        <p className="text-slate-400 text-xs max-w-md">{error.message || 'Please check your connection.'}</p>
        <Link 
          href="/" 
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-500 transition-colors flex items-center gap-1.5 cursor-pointer mt-2"
        >
          <RefreshCw className="w-3 h-3" /> Retry
        </Link>
      </div>
    )
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="col-span-1 md:col-span-2 lg:col-span-2 rounded-2xl border border-white/5 bg-[#111118] p-6 flex flex-col items-center justify-center text-center gap-2 min-h-[240px]">
        <BookOpen className="w-8 h-8 text-slate-500" />
        <h3 className="text-lg font-bold text-white">No courses found</h3>
        <p className="text-slate-400 text-xs">Your courses list is currently empty.</p>
      </div>
    )
  }

  return (
    <>
      {courses.map((course: Course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </>
  )
}

// Loader wrapper for course skeletons
function CourseGridSkeleton() {
  return (
    <>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </>
  )
}

export default async function DashboardPage({ searchParams }: PageProps) {
  // Await searchParams in Next.js 15+
  const resolvedSearchParams = await searchParams
  const activeTab = (resolvedSearchParams.tab as string) || 'dashboard'

  // Header Titles based on tabs
  const getHeaderInfo = () => {
    switch (activeTab) {
      case 'courses':
        return { title: 'My Courses', desc: 'Browse and resume your active learning modules.' }
      case 'activity':
        return { title: 'Learning Activity', desc: 'Track your daily contributions and active hours.' }
      case 'settings':
        return { title: 'Settings', desc: 'Manage your profile and learning environment preferences.' }
      case 'dashboard':
      default:
        return { title: 'Dashboard', desc: 'Track your learning streaks and resume active modules.' }
    }
  }

  const header = getHeaderInfo()

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <header className="flex justify-between items-center pb-4 border-b border-white/5">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-none mb-1 md:mb-2">
            {header.title}
          </h1>
          <p className="text-slate-400 text-xs md:text-sm">
            {header.desc}
          </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/15 flex items-center justify-center text-indigo-400 font-bold shadow-md shadow-indigo-500/5 hover:bg-indigo-500/20 transition-colors duration-200 cursor-pointer">
          A
        </div>
      </header>

      {/* Render tab content */}
      {activeTab === 'dashboard' && (
        <BentoGrid>
          {/* 1. Hero banner tile (Client Component, spans 2 cols on desktop) */}
          <HeroTile />

          {/* 2. Activity summary tile (Client Component, spans 1 col, 2 rows height) */}
          <ActivityTile />

          {/* 3. Dynamic Course Cards (Suspended, each card spans 1 col) */}
          <Suspense fallback={<CourseGridSkeleton />}>
            <CourseGrid />
          </Suspense>
        </BentoGrid>
      )}

      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Suspense fallback={
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          }>
            <CourseGrid />
          </Suspense>
        </div>
      )}

      {activeTab === 'activity' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ActivityTile />
          <div className="lg:col-span-2 bg-[#111118] border border-white/5 rounded-2xl p-6 space-y-6">
            <h3 className="text-lg font-bold text-white">Recent Achievements</h3>
            <div className="space-y-4">
              <div className="flex gap-4 items-center bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-400 border border-yellow-500/25 shrink-0">
                  🔥
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-slate-200">10-Day Streak Milestone</h4>
                  <p className="text-xs text-slate-400">Completed 10 consecutive learning days.</p>
                </div>
              </div>
              <div className="flex gap-4 items-center bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/25 shrink-0">
                  🚀
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-slate-200">System Architect</h4>
                  <p className="text-xs text-slate-400">Completed the Systems Design Fundamentals course.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="max-w-2xl bg-[#111118] border border-white/5 rounded-2xl p-6 md:p-8 space-y-8">
          {/* Profile Section */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2 pb-2 border-b border-white/5">
              <User className="w-5 h-5 text-indigo-400" /> Account Profile
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Full Name</label>
                <input 
                  type="text" 
                  defaultValue="Alex Mercer" 
                  disabled
                  className="w-full bg-[#151522] border border-white/5 rounded-xl px-4 py-2.5 text-slate-300 text-sm focus:outline-none focus:border-indigo-500 cursor-not-allowed" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Email Address</label>
                <input 
                  type="email" 
                  defaultValue="alex.mercer@aetherlearn.edu" 
                  disabled
                  className="w-full bg-[#151522] border border-white/5 rounded-xl px-4 py-2.5 text-slate-300 text-sm focus:outline-none focus:border-indigo-500 cursor-not-allowed" 
                />
              </div>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2 pb-2 border-b border-white/5">
              <Bell className="w-5 h-5 text-violet-400" /> Notifications
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-indigo-500" />
                <span className="text-sm text-slate-300">Daily learning reminders (Push notifications)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-indigo-500" />
                <span className="text-sm text-slate-300">Weekly progress summaries (Email)</span>
              </label>
            </div>
          </div>

          {/* Database Info Section */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2 pb-2 border-b border-white/5">
              <Lock className="w-5 h-5 text-amber-500" /> Supabase Connection Status
            </h3>
            <div className="bg-[#151522] border border-amber-500/10 p-4 rounded-xl text-xs space-y-2">
              <p className="text-slate-300 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500"></span> Active (Mock Fallback Enabled)
              </p>
              <p className="text-slate-400 leading-relaxed">
                The application is running securely. If placeholder variables are detected in your `.env.local` configuration, the system automatically falls back to an internal mock datastore so that page renders remain active and zero crashes occur.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
