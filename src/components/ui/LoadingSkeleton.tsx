export default function LoadingSkeleton() {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="flex items-center justify-center gap-3 mb-8 mt-12">
        <div className="w-4 h-4 relative">
          <svg viewBox="0 0 28 28" fill="none" className="w-full h-full animate-spin" style={{ animationDuration: "3s" }}>
            <path d="M4 14 L10 8 L14 12 L18 6 L24 14" stroke="#C9A84C" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="font-mono text-xs text-text-secondary tracking-widest">
          ACQUIRING SIGNALS...
        </span>
      </div>

      <div className="grid gap-3">
        {/* Featured skeleton */}
        <div className="card p-5 animate-pulse">
          <div className="flex gap-3 mb-3">
            <div className="h-5 w-20 bg-bg-hover rounded-sm" />
            <div className="h-5 w-24 bg-bg-hover rounded-sm" />
          </div>
          <div className="h-6 w-3/4 bg-bg-hover rounded-sm mb-2" />
          <div className="h-4 w-full bg-bg-hover rounded-sm mb-1" />
          <div className="h-4 w-5/6 bg-bg-hover rounded-sm mb-1" />
          <div className="h-4 w-2/3 bg-bg-hover rounded-sm" />
        </div>

        {/* Regular skeletons */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="card p-4 animate-pulse" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex justify-between mb-2">
              <div className="flex gap-2">
                <div className="h-3 w-16 bg-bg-hover rounded-sm" />
                <div className="h-3 w-20 bg-bg-hover rounded-sm" />
              </div>
              <div className="h-3 w-12 bg-bg-hover rounded-sm" />
            </div>
            <div className="h-4 w-5/6 bg-bg-hover rounded-sm mb-1" />
            <div className="h-4 w-3/4 bg-bg-hover rounded-sm mb-2" />
            <div className="h-3 w-full bg-bg-hover rounded-sm mb-1" />
            <div className="h-3 w-4/5 bg-bg-hover rounded-sm" />
          </div>
        ))}
      </div>
    </div>
  );
}
