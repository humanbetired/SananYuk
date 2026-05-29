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

  return (
    <div className="bg-bg-secondary border-b border-bg-border sticky top-0 z-50 shadow-sm">
      <div className="px-4 md:px-6 h-14 flex items-center justify-between gap-4">

        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-7 h-7 flex items-center justify-center">
              <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
                {/* Batang utama */}
                <line x1="14" y1="26" x2="14" y2="6" stroke="#B8860B" strokeWidth="1.5" strokeLinecap="round"/>
                {/* Ujung melengkung */}
                <path d="M14 6 Q13 3 14 2 Q15 3 14 6" fill="#B8860B"/>
                {/* Butir padi kiri */}
                <ellipse cx="11" cy="10" rx="2.8" ry="1.4" transform="rotate(-35 11 10)" fill="#B8860B" opacity="0.9"/>
                <ellipse cx="10" cy="14" rx="2.8" ry="1.4" transform="rotate(-35 10 14)" fill="#B8860B" opacity="0.85"/>
                <ellipse cx="10" cy="18" rx="2.8" ry="1.4" transform="rotate(-35 10 18)" fill="#B8860B" opacity="0.8"/>
                <ellipse cx="11" cy="22" rx="2.8" ry="1.4" transform="rotate(-35 11 22)" fill="#B8860B" opacity="0.75"/>
                {/* Butir padi kanan */}
                <ellipse cx="17" cy="10" rx="2.8" ry="1.4" transform="rotate(35 17 10)" fill="#B8860B" opacity="0.9"/>
                <ellipse cx="18" cy="14" rx="2.8" ry="1.4" transform="rotate(35 18 14)" fill="#B8860B" opacity="0.85"/>
                <ellipse cx="18" cy="18" rx="2.8" ry="1.4" transform="rotate(35 18 18)" fill="#B8860B" opacity="0.8"/>
                <ellipse cx="17" cy="22" rx="2.8" ry="1.4" transform="rotate(35 17 22)" fill="#B8860B" opacity="0.75"/>
              </svg>
            </div>
          <div>
            <div className="font-semibold text-base text-text-primary tracking-tight">
              Dik<span className="text-accent-gold">Saham</span>
            </div>
            <div className="text-[9px] text-text-dim font-medium tracking-widest uppercase leading-none hidden sm:block">
              Indonesia Market Feed
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-green live-dot" />
            <span className="text-xs font-medium text-accent-green">Live</span>
          </div>
          <span className="text-text-dim">|</span>
          <span
            className="text-xs text-text-secondary font-medium"
            suppressHydrationWarning
          >
            {currentTime
              ? format(currentTime, "HH:mm:ss") + " WIB"
              : "--:--:--"}
          </span>
          {lastUpdated && (
            <span className="text-xs text-text-dim">
              Diperbarui {format(lastUpdated, "HH:mm")}
            </span>
          )}
        </div>

        {/* Right side meta */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4 text-text-secondary">
            <div className="text-right">
              <div className="font-mono text-xs text-text-secondary">
                {currentTime ? `${format(currentTime, "HH:mm:ss")} UTC` : "-- : -- : --"}
              </div>
              <div className="font-mono text-[10px] text-text-dim">
                {format(currentTime, "dd MMM yyyy")}
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
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-bg-primary border border-bg-border hover:border-accent-gold hover:text-accent-gold text-text-secondary transition-all duration-200 text-xs font-medium"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span className="hidden sm:block">Refresh</span>
          </button>
        </div>
      </div>

      {topArticles.length > 0 && (
        <div className="border-t border-bg-border bg-bg-primary py-1.5 overflow-hidden">
          <div className="ticker-wrap">
            <div className="ticker-content">
              {[
                ...topArticles.slice(0, 12),
                ...topArticles.slice(0, 12),
              ].map((article, idx) => (
                <a
                  key={article.id + "-" + idx}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 group shrink-0"
                >
                  <span
                    className={
                      "text-[10px] font-semibold px-1.5 py-0.5 rounded " +
                      (article.sentiment === "bullish"
                        ? "bg-green-100 text-accent-green"
                        : article.sentiment === "bearish"
                        ? "bg-red-100 text-accent-red"
                        : "bg-gray-100 text-text-secondary")
                    }
                  >
                    {article.sentiment === "bullish"
                      ? "+"
                      : article.sentiment === "bearish"
                      ? "-"
                      : "~"}
                  </span>
                  <span className="text-xs text-text-secondary group-hover:text-text-primary transition-colors max-w-xs truncate">
                    {article.title}
                  </span>
                  <span className="text-[10px] text-text-dim font-medium shrink-0">
                    {article.source}
                  </span>
                  <span className="text-text-dim mx-1">·</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
