'use client'

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Animated AI Brain Icon */}
      <div className="relative">
        {/* Outer glow ring */}
        <div className="absolute inset-0 w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 animate-spin opacity-20 blur-xl"></div>
        
        {/* Main container */}
        <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[2px] animate-float">
          <div className="w-full h-full rounded-2xl bg-[#0a0a0f] flex items-center justify-center">
            {/* AI Icon */}
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
              />
            </svg>
          </div>
        </div>
        
        {/* Orbiting dots */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-indigo-400"></div>
        </div>
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s', animationDelay: '1s' }}>
          <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-400"></div>
        </div>
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s', animationDelay: '2s' }}>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 rounded-full bg-pink-400"></div>
        </div>
      </div>
      
      {/* Loading text with shimmer effect */}
      <div className="mt-8 text-center">
        <div className="text-lg font-medium text-white mb-2">Processing Request</div>
        <div className="flex items-center justify-center gap-2">
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div 
                key={i}
                className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"
                style={{ animationDelay: `${i * 150}ms` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Progress indicators */}
      <div className="mt-6 space-y-2 w-48">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
          </div>
          <span className="text-xs text-white/50">Fetching historical data</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-indigo-500/20 flex items-center justify-center animate-pulse">
            <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
          </div>
          <span className="text-xs text-white/50">Running AI model</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white/30"></div>
          </div>
          <span className="text-xs text-white/30">Generating predictions</span>
        </div>
      </div>
    </div>
  )
}
