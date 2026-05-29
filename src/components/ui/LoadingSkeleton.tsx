export default function LoadingSkeleton() {
  return (
    <div className="p-4 md:p-6 max-w-3xl">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-2 rounded-full bg-accent-gold animate-pulse" />
        <span className="text-xs font-medium text-text-dim">
          Memuat berita terbaru...
        </span>
      </div>

      <div className="card p-5 mb-4 animate-pulse">
        <div className="flex gap-2 mb-3">
          <div className="h-6 w-16 bg-bg-hover rounded-full" />
          <div className="h-6 w-24 bg-bg-hover rounded-full" />
        </div>
        <div className="h-5 w-3/4 bg-bg-hover rounded-lg mb-2" />
        <div className="h-5 w-5/6 bg-bg-hover rounded-lg mb-4" />
        <div className="h-4 w-full bg-bg-hover rounded-lg mb-1" />
        <div className="h-4 w-4/5 bg-bg-hover rounded-lg" />
      </div>

      <div className="flex flex-col gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="card px-4 py-3.5 animate-pulse"
            style={{ animationDelay: i * 60 + "ms" }}
          >
            <div className="flex gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-bg-hover mt-1 shrink-0" />
              <div className="h-3 w-20 bg-bg-hover rounded" />
              <div className="h-3 w-16 bg-bg-hover rounded" />
            </div>
            <div className="h-4 w-5/6 bg-bg-hover rounded mb-1" />
            <div className="h-4 w-3/4 bg-bg-hover rounded mb-2" />
            <div className="h-3 w-full bg-bg-hover rounded mb-1" />
            <div className="h-3 w-4/5 bg-bg-hover rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
