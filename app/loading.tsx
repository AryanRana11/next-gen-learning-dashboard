import React from 'react'

export default function Loading() {
  return (
    <div className="w-full min-h-screen bg-[#09090f] text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar Skeleton (Slim collapsible) */}
      <aside className="w-full md:w-20 lg:w-64 border-b md:border-b-0 md:border-r border-white/5 bg-[#0b0b14] p-4 flex flex-row md:flex-col justify-between items-center md:items-stretch h-16 md:h-screen shrink-0 animate-pulse">
        <div className="flex flex-row md:flex-col items-center gap-6 w-full">
          <div className="h-8 w-8 bg-white/5 rounded-lg"></div>
          <div className="hidden lg:block h-6 w-32 bg-white/5 rounded-md md:mt-2"></div>
          
          <nav className="flex flex-row md:flex-col gap-4 w-full md:mt-8 justify-center md:justify-start">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 w-10 lg:w-full bg-white/5 rounded-lg flex items-center p-2 gap-3">
                <div className="h-5 w-5 bg-white/10 rounded-full shrink-0"></div>
                <div className="hidden lg:block h-4 w-20 bg-white/10 rounded-md"></div>
              </div>
            ))}
          </nav>
        </div>
        <div className="hidden md:block h-10 bg-white/5 rounded-lg w-full"></div>
      </aside>

      {/* Main Content Area Skeleton */}
      <main className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full overflow-y-auto space-y-6">
        {/* Header Skeleton */}
        <header className="flex justify-between items-center pb-4 border-b border-white/5 animate-pulse">
          <div>
            <div className="h-8 w-48 bg-white/10 rounded-md mb-2"></div>
            <div className="h-4 w-72 bg-white/5 rounded-md"></div>
          </div>
          <div className="h-10 w-10 bg-white/10 rounded-full"></div>
        </header>

        {/* Bento Grid Skeleton */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {/* Hero Tile Skeleton (spans 2 cols on desktop) */}
          <div className="lg:col-span-2 h-64 bg-[#111118] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="h-8 w-64 bg-white/10 rounded-md mb-3"></div>
              <div className="h-5 w-48 bg-white/5 rounded-md"></div>
            </div>
            <div className="space-y-3">
              <div className="h-4 w-32 bg-white/5 rounded-md"></div>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <div key={i} className="h-8 w-8 bg-white/10 rounded-full"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Activity Tile Skeleton (spans 1 col, 2 rows height) */}
          <div className="lg:row-span-2 h-[552px] bg-[#111118] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="h-6 w-32 bg-white/10 rounded-md"></div>
              {/* Contribution Grid */}
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }).map((_, i) => (
                  <div key={i} className="aspect-square bg-white/5 rounded-sm"></div>
                ))}
              </div>
            </div>
            {/* Stats pills */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="h-10 bg-white/5 rounded-lg"></div>
              <div className="h-10 bg-white/5 rounded-lg"></div>
              <div className="h-10 bg-white/5 rounded-lg"></div>
            </div>
          </div>

          {/* Course Cards Skeletons (spans 1 col, 1 row each) */}
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-60 bg-[#111118] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="h-12 w-12 bg-white/10 rounded-xl"></div>
                <div className="h-6 w-12 bg-white/5 rounded-full"></div>
              </div>
              <div className="space-y-2">
                <div className="h-5 w-full bg-white/10 rounded-md"></div>
                <div className="h-5 w-2/3 bg-white/10 rounded-md"></div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <div className="h-3 w-16 bg-white/5 rounded"></div>
                  <div className="h-3 w-8 bg-white/5 rounded"></div>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full"></div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}
