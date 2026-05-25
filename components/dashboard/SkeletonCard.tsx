import React from 'react'

export default function SkeletonCard() {
  return (
    <div className="col-span-1 rounded-2xl border border-white/5 bg-[#111118] p-6 flex flex-col justify-between min-h-[240px] animate-pulse">
      {/* Header Placeholder */}
      <div className="flex justify-between items-start">
        <div className="w-12 h-12 bg-white/5 rounded-xl"></div>
        <div className="w-12 h-5 bg-white/5 rounded-full"></div>
      </div>

      {/* Title Placeholder */}
      <div className="space-y-2 mt-4">
        <div className="h-5 bg-white/10 rounded-md w-full"></div>
        <div className="h-5 bg-white/10 rounded-md w-3/4"></div>
      </div>

      {/* Progress Placeholder */}
      <div className="space-y-2 mt-4">
        <div className="flex justify-between items-center">
          <div className="h-3 w-20 bg-white/5 rounded"></div>
          <div className="h-3 w-8 bg-white/5 rounded"></div>
        </div>
        <div className="w-full h-2.5 bg-white/5 rounded-full"></div>
      </div>
    </div>
  )
}
