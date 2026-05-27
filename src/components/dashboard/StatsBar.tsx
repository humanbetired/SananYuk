"use client";

import type { NewsArticle } from "@/types";

interface StatsBarProps {
  articles: NewsArticle[];
}

export default function StatsBar({ articles }: StatsBarProps) {
  const total = articles.length;
  const bullish = articles.filter((a) => a.sentiment === "bullish").length;
  const bearish = articles.filter((a) => a.sentiment === "bearish").length;
  const neutral = total - bullish - bearish;

  const bullPct = total ? Math.round((bullish / total) * 100) : 0;
  const bearPct = total ? Math.round((bearish / total) * 100) : 0;

  const sources = Array.from(new Set(articles.map((a) => a.source))).length;
  const tickers = Array.from(new Set(articles.flatMap((a) => a.tickers || []))).length;

  return (
    <div className="border-b border-bg-border bg-bg-secondary px-6 py-3">
      <div className="flex items-center gap-8 flex-wrap">
        {/* Sentiment gauge */}
        <div className="flex items-center gap-3">
          <span className="label-mono text-[10px]">Market Sentiment</span>
          <div className="flex items-center gap-1">
            <div className="h-1.5 rounded-full bg-accent-green" style={{ width: `${bullPct * 0.6}px`, minWidth: "4px" }} />
            <div className="h-1.5 rounded-full bg-text-dim" style={{ width: `${(100 - bullPct - bearPct) * 0.3}px`, minWidth: "4px" }} />
            <div className="h-1.5 rounded-full bg-accent-red" style={{ width: `${bearPct * 0.6}px`, minWidth: "4px" }} />
          </div>
          <span className="font-mono text-xs text-accent-green">{bullPct}%</span>
          <span className="font-mono text-xs text-text-dim">/</span>
          <span className="font-mono text-xs text-accent-red">{bearPct}%</span>
        </div>

        <div className="h-4 w-px bg-bg-border" />

        {/* Stats */}
        {[
          { label: "Signals", value: total },
          { label: "Bullish", value: bullish, color: "text-accent-green" },
          { label: "Bearish", value: bearish, color: "text-accent-red" },
          { label: "Neutral", value: neutral },
          { label: "Sources", value: sources },
          { label: "Tickers", value: tickers },
        ].map(({ label, value, color }) => (
          <div key={label} className="flex items-baseline gap-1.5">
            <span className={`font-mono text-sm font-semibold ${color || "text-text-primary"}`}>
              {value}
            </span>
            <span className="label-mono text-[10px]">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
