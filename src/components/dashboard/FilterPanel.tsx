"use client";

import { CATEGORY_LABELS } from "@/lib/sources";
import type { FilterState, NewsCategory } from "@/types";

interface FilterPanelProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  sources: string[];
  counts: Record<string, number>;
}

const SENTIMENTS = [
  { value: "all", label: "All Signals" },
  { value: "bullish", label: "Bullish" },
  { value: "bearish", label: "Bearish" },
  { value: "neutral", label: "Neutral" },
];

const CATEGORIES = [
  "all",
  "market-movers",
  "earnings",
  "macro",
  "analysis",
  "crypto",
  "commodities",
  "forex",
  "ipo",
] as const;

export default function FilterPanel({
  filters,
  onChange,
  sources,
  counts,
}: FilterPanelProps) {
  const set = (patch: Partial<FilterState>) =>
    onChange({ ...filters, ...patch });

  return (
    <aside className="w-56 shrink-0 border-r border-bg-border bg-bg-secondary flex flex-col overflow-y-auto">
      {/* Search */}
      <div className="p-4 border-b border-bg-border">
        <div className="label-mono text-[10px] mb-2 flex items-center gap-2">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Search
        </div>
        <input
          type="text"
          placeholder="Filter by keyword..."
          value={filters.search}
          onChange={(e) => set({ search: e.target.value })}
          className="w-full bg-bg-primary border border-bg-border px-3 py-2 font-mono text-xs text-text-primary placeholder-text-dim focus:outline-none focus:border-accent-gold/50 transition-colors"
        />
      </div>

      {/* Category */}
      <div className="p-4 border-b border-bg-border">
        <div className="label-mono text-[10px] mb-3 flex items-center gap-2">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          Category
        </div>
        <div className="flex flex-col gap-0.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => set({ category: cat as NewsCategory | "all" })}
              className={`flex items-center justify-between px-2 py-1.5 text-left transition-all duration-150 group ${
                filters.category === cat
                  ? "bg-accent-gold/10 text-accent-gold border-l-2 border-accent-gold"
                  : "text-text-secondary hover:text-text-primary hover:bg-bg-hover border-l-2 border-transparent"
              }`}
            >
              <span className="font-mono text-[11px]">
                {CATEGORY_LABELS[cat]}
              </span>
              {counts[cat] !== undefined && (
                <span
                  className={`font-mono text-[10px] px-1.5 py-0.5 rounded-sm ${
                    filters.category === cat
                      ? "bg-accent-gold/20 text-accent-gold"
                      : "bg-bg-border text-text-dim"
                  }`}
                >
                  {counts[cat]}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Sentiment */}
      <div className="p-4 border-b border-bg-border">
        <div className="label-mono text-[10px] mb-3 flex items-center gap-2">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Sentiment
        </div>
        <div className="flex flex-col gap-0.5">
          {SENTIMENTS.map((s) => (
            <button
              key={s.value}
              onClick={() => set({ sentiment: s.value as FilterState["sentiment"] })}
              className={`flex items-center gap-2 px-2 py-1.5 text-left transition-all duration-150 border-l-2 ${
                filters.sentiment === s.value
                  ? s.value === "bullish"
                    ? "border-accent-green bg-accent-green/10 text-accent-green"
                    : s.value === "bearish"
                    ? "border-accent-red bg-accent-red/10 text-accent-red"
                    : "border-accent-gold bg-accent-gold/10 text-accent-gold"
                  : "border-transparent text-text-secondary hover:text-text-primary hover:bg-bg-hover"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  s.value === "bullish"
                    ? "bg-accent-green"
                    : s.value === "bearish"
                    ? "bg-accent-red"
                    : s.value === "neutral"
                    ? "bg-text-secondary"
                    : "bg-accent-gold"
                }`}
              />
              <span className="font-mono text-[11px]">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sources */}
      <div className="p-4">
        <div className="label-mono text-[10px] mb-3 flex items-center gap-2">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          Source
        </div>
        <div className="flex flex-col gap-0.5">
          <button
            onClick={() => set({ source: "all" })}
            className={`flex items-center justify-between px-2 py-1.5 text-left transition-all duration-150 border-l-2 ${
              filters.source === "all"
                ? "border-accent-gold bg-accent-gold/10 text-accent-gold"
                : "border-transparent text-text-secondary hover:text-text-primary hover:bg-bg-hover"
            }`}
          >
            <span className="font-mono text-[11px]">All Sources</span>
          </button>
          {sources.map((src) => (
            <button
              key={src}
              onClick={() => set({ source: src })}
              className={`flex items-center px-2 py-1.5 text-left transition-all duration-150 border-l-2 ${
                filters.source === src
                  ? "border-accent-gold bg-accent-gold/10 text-accent-gold"
                  : "border-transparent text-text-secondary hover:text-text-primary hover:bg-bg-hover"
              }`}
            >
              <span className="font-mono text-[11px] truncate">{src}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
