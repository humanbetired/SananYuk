"use client";

import { format } from "date-fns";
import { useEffect, useState } from "react";
import type { NewsArticle } from "@/types";

interface HeaderProps {
  lastUpdated: Date | null;
  articleCount: number;
  topArticles: NewsArticle[];
  onRefresh: () => void;
}

export default function Header({
  lastUpdated,
  articleCount,
  topArticles,
  onRefresh,
}: HeaderProps) {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentTime(new Date());
    const t = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const tickerItems = topArticles.slice(0, 12);

  return (
    <header className="relative border-b border-bg-border">
      {/* Scan line effect */}
      <div className="scan-line" />

      {/* Top bar */}
      <div className="px-6 py-3 flex items-center justify-between border-b border-bg-border bg-bg-secondary">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 relative">
              <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <rect width="28" height="28" fill="none" />
                <path d="M4 14 L10 8 L14 12 L18 6 L24 14" stroke="#C9A84C" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 20 L10 16 L14 18 L18 14 L24 18" stroke="#C9A84C" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
                <rect x="1" y="1" width="26" height="26" stroke="#C9A84C" strokeWidth="0.5" opacity="0.3" />
              </svg>
            </div>
            <div>
              <span className="font-display text-lg font-bold tracking-tight text-text-primary">
                <span className="text-accent-gold">DikaSanan</span>
              </span>
              <div className="label-mono text-[9px] tracking-[0.2em] -mt-0.5">
                MARKET INTELLIGENCE PLATFORM
              </div>
            </div>
          </div>

          {/* Live indicator */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 border border-accent-gold/20 bg-accent-gold/5">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-gold live-dot" />
            <span className="font-mono text-[10px] tracking-widest text-accent-gold uppercase">
              Live Feed
            </span>
          </div>
        </div>

        {/* Right side meta */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4 text-text-secondary">
            <div className="text-right">
              <div className="font-mono text-xs text-text-secondary" suppressHydrationWarning>
                {currentTime ? `${format(currentTime, "HH:mm:ss")} UTC` : "-- : -- : --"}
              </div>
              <div className="font-mono text-[10px] text-text-dim" suppressHydrationWarning>
                {currentTime ? format(currentTime, "dd MMM yyyy") : "-- --- ----"}
              </div>
            </div>
          </div>

          <div className="hidden lg:block h-8 w-px bg-bg-border" />

          <div className="hidden lg:flex flex-col items-end">
            <span className="font-mono text-xs text-accent-gold">{articleCount}</span>
            <span className="label-mono text-[9px]">Signals Active</span>
          </div>

          <button
            onClick={onRefresh}
            className="flex items-center gap-2 px-3 py-1.5 border border-bg-border hover:border-accent-gold/50 text-text-secondary hover:text-accent-gold transition-all duration-200 group"
            title="Refresh feed"
          >
            <svg
              className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="font-mono text-[10px] uppercase tracking-widest hidden sm:block">
              Refresh
            </span>
          </button>
        </div>
      </div>

      {/* Ticker tape */}
      {tickerItems.length > 0 && (
        <div className="bg-bg-primary py-2 overflow-hidden border-b border-bg-border/50">
          <div className="ticker-wrap">
            <div className="ticker-content">
              {[...tickerItems, ...tickerItems].map((article, idx) => (
                <a
                  key={`${article.id}-${idx}`}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 group"
                >
                  <span
                    className={`font-mono text-[10px] uppercase tracking-widest px-1.5 py-0.5 ${
                      article.sentiment === "bullish"
                        ? "bg-accent-green/10 text-accent-green"
                        : article.sentiment === "bearish"
                        ? "bg-accent-red/10 text-accent-red"
                        : "bg-text-dim/10 text-text-secondary"
                    }`}
                  >
                    {article.sentiment === "bullish" ? "+" : article.sentiment === "bearish" ? "-" : "~"}
                  </span>
                  <span className="font-mono text-[11px] text-text-secondary group-hover:text-text-primary transition-colors line-clamp-1 max-w-[280px]">
                    {article.title}
                  </span>
                  <span className="text-text-dim font-mono text-[10px]">
                    {article.source}
                  </span>
                  <span className="text-bg-border mx-2">|</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Last updated */}
      {lastUpdated && (
        <div className="absolute right-6 -bottom-4 z-10">
          <span className="label-mono text-[9px] bg-bg-secondary px-2 py-0.5 border border-bg-border">
            Updated {format(lastUpdated, "HH:mm:ss")}
          </span>
        </div>
      )}
    </header>
  );
}
