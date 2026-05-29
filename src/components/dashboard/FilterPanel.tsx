"use client";

import { CATEGORY_LABELS } from "@/lib/sources";
import type { FilterState, NewsCategory } from "@/types";

interface FilterPanelProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  sources: string[];
  counts: Record<string, number>;
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES = [
  "all",
  "market-movers",
  "earnings",
  "macro",
  "analysis",
] as const;

export default function FilterPanel({
  filters,
  onChange,
  sources,
  counts,
  isOpen,
  onClose,
}: FilterPanelProps) {
  const set = (patch: Partial<FilterState>) =>
    onChange({ ...filters, ...patch });

  return (
    <div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={
          "fixed md:static top-0 left-0 h-full z-40 md:z-auto " +
          "w-56 shrink-0 bg-bg-secondary border-r border-bg-border " +
          "flex flex-col overflow-y-auto transition-transform duration-300 " +
          (isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0")
        }
      >
        <div className="flex items-center justify-between p-4 border-b border-bg-border md:hidden">
          <span className="font-semibold text-sm text-text-primary">Filter</span>
          <button
            onClick={onClose}
            className="text-text-dim hover:text-text-primary"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 border-b border-bg-border">
          <div className="label-mono text-[10px] mb-2">Cari Berita</div>
          <div className="relative">
            <svg
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-dim"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Keyword..."
              value={filters.search}
              onChange={(e) => set({ search: e.target.value })}
              className="w-full bg-bg-primary border border-bg-border rounded-lg pl-8 pr-3 py-2 text-xs text-text-primary placeholder-text-dim focus:outline-none focus:border-accent-gold transition-colors"
            />
          </div>
        </div>

        <div className="p-4 border-b border-bg-border">
          <div className="label-mono text-[10px] mb-3">Kategori</div>
          <div className="flex flex-col gap-0.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => set({ category: cat as NewsCategory | "all" })}
                className={
                  "flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all text-xs font-medium " +
                  (filters.category === cat
                    ? "bg-accent-gold/10 text-accent-gold"
                    : "text-text-secondary hover:bg-bg-hover hover:text-text-primary")
                }
              >
                <span>{CATEGORY_LABELS[cat]}</span>
                {counts[cat] !== undefined && (
                  <span
                    className={
                      "text-[10px] px-1.5 py-0.5 rounded-full " +
                      (filters.category === cat
                        ? "bg-accent-gold/20 text-accent-gold"
                        : "bg-bg-border text-text-dim")
                    }
                  >
                    {counts[cat]}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4">
          <div className="label-mono text-[10px] mb-3">Sumber</div>
          <div className="flex flex-col gap-0.5">
            <button
              onClick={() => set({ source: "all" })}
              className={
                "px-3 py-2 rounded-lg text-left text-xs font-medium transition-all " +
                (filters.source === "all"
                  ? "bg-accent-gold/10 text-accent-gold"
                  : "text-text-secondary hover:bg-bg-hover hover:text-text-primary")
              }
            >
              Semua Sumber
            </button>
            {sources.map((src) => (
              <button
                key={src}
                onClick={() => set({ source: src })}
                className={
                  "px-3 py-2 rounded-lg text-left text-xs font-medium transition-all truncate " +
                  (filters.source === src
                    ? "bg-accent-gold/10 text-accent-gold"
                    : "text-text-secondary hover:bg-bg-hover hover:text-text-primary")
                }
              >
                {src}
              </button>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}