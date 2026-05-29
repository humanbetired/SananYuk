"use client";

import type { NewsArticle } from "@/types";

interface StatsBarProps {
  articles: NewsArticle[];
}

export default function StatsBar({ articles }: StatsBarProps) {
  const total = articles.length;
  const sources = Array.from(new Set(articles.map((a) => a.source))).length;

  const categoryCounts: Record<string, number> = {};
  articles.forEach((a) => {
    categoryCounts[a.category] = (categoryCounts[a.category] || 0) + 1;
  });
  const topCategory = Object.entries(categoryCounts).sort(
    (x, y) => y[1] - x[1]
  )[0];

  return (
    <div className="bg-bg-secondary border-b border-bg-border px-4 md:px-6 py-2.5">
      <div className="flex items-center gap-4 md:gap-6 flex-wrap">
        {[
          { label: "Total Berita", value: total, color: "text-text-primary" },
          { label: "Sumber Aktif", value: sources, color: "text-accent-blue" },
        ].map(({ label, value, color }) => (
          <div key={label} className="flex items-center gap-1.5 shrink-0">
            <span className={"text-sm font-semibold " + color}>{value}</span>
            <span className="text-[11px] text-text-dim">{label}</span>
          </div>
        ))}

        {topCategory && (
          <>
            <div className="h-4 w-px bg-bg-border shrink-0 hidden md:block" />
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-gold" />
              <span className="text-[11px] text-text-dim">
                Terbanyak:
              </span>
              <span className="text-[11px] font-semibold text-text-primary capitalize">
                {topCategory[0].replace("-", " ")}
              </span>
              <span className="text-[11px] text-text-dim">
                ({topCategory[1]} berita)
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}