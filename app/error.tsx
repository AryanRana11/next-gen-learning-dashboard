'use client'

import React, { useEffect } from 'react'
import { AlertOctagon, RefreshCw } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="w-full min-h-screen bg-[#09090f] text-slate-100 flex flex-col justify-center items-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full bg-[#111118] border border-red-500/20 rounded-2xl p-8 text-center shadow-[0_0_50px_rgba(239,68,68,0.05)] relative overflow-hidden"
      >
        {/* Glow accent */}
        <div className="absolute -top-12 -left-12 w-24 h-24 bg-red-500/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl"></div>

        <div className="mx-auto w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20 text-red-400">
          <AlertOctagon className="w-8 h-8" />
        </div>

        <h2 className="text-2xl font-bold text-slate-100 mb-2">Something went wrong</h2>
        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
          An error occurred while loading the dashboard. Please try reloading or check your database settings.
        </p>

        {error.message && (
          <div className="mb-6 p-3 bg-red-950/20 border border-red-950/50 rounded-lg text-left text-xs font-mono text-red-400 max-h-24 overflow-y-auto">
            {error.message}
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.02, backgroundColor: '#4f46e5' }}
          whileTap={{ scale: 0.98 }}
          onClick={() => reset()}
          className="w-full py-3 px-4 bg-[#6366f1] text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors duration-200 cursor-pointer shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </motion.button>
      </motion.div>
    </div>
  )
}
