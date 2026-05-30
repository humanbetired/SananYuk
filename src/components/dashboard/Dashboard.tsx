"use client";

import { useState, useMemo } from "react";
import { useNews, useFilteredNews } from "@/hooks/useNews";
import Header from "@/components/dashboard/Header";
import MarketBar from "@/components/dashboard/MarketBar";
import FilterPanel from "@/components/dashboard/FilterPanel";
import StatsBar from "@/components/dashboard/StatsBar";
import NewsCard from "@/components/news/NewsCard";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import type { FilterState } from "@/types";

const DEFAULT_FILTERS: FilterState = {
  category: "all",
  source: "all",
  search: "",
};

export default function Dashboard() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { articles, isLoading, lastUpdated, error, refresh } = useNews();
  const filtered = useFilteredNews(articles, filters);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: articles.length };
    articles.forEach((a) => {
      c[a.category] = (c[a.category] || 0) + 1;
    });
    return c;
  }, [articles]);

  const uniqueSources = useMemo(
    () => Array.from(new Set(articles.map((a) => a.source))).sort(),
    [articles]
  );

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      <Header
        lastUpdated={lastUpdated}
        articleCount={articles.length}
        topArticles={articles.slice(0, 15)}
        onRefresh={refresh}
      />
      <MarketBar />
      <StatsBar articles={articles} />

      <div className="flex flex-1 overflow-hidden">
        <FilterPanel
          filters={filters}
          onChange={setFilters}
          sources={uniqueSources}
          counts={counts}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 overflow-y-auto">
          {isLoading ? (
            <LoadingSkeleton />
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-64 gap-3">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                <svg className="w-5 h-5 text-accent-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
              </div>
              <p className="text-sm text-text-secondary">{error}</p>
              <button
                onClick={refresh}
                className="text-xs font-semibold text-accent-gold border border-accent-gold/30 px-4 py-2 rounded-full hover:bg-accent-gold/10 transition-colors"
              >
                Coba Lagi
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 gap-3">
              <div className="w-10 h-10 rounded-full bg-bg-hover flex items-center justify-center">
                <svg className="w-5 h-5 text-text-dim" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm text-text-secondary">Tidak ada berita yang cocok</p>
              <button
                onClick={() => setFilters(DEFAULT_FILTERS)}
                className="text-xs font-semibold text-accent-gold hover:underline"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="p-4 md:p-6 max-w-3xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-bg-secondary border border-bg-border text-xs font-medium text-text-secondary hover:border-accent-gold hover:text-accent-gold transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                    </svg>
                    Filter
                  </button>
                  <span className="text-sm font-semibold text-text-primary">
                    {filtered.length} Berita
                  </span>
                </div>
                <span className="text-xs text-text-dim">Terbaru</span>
              </div>

              {featured && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-gold live-dot" />
                    <span className="text-xs font-semibold text-text-dim uppercase tracking-wide">
                      Berita Utama
                    </span>
                  </div>
                  <NewsCard article={featured} featured />
                </div>
              )}

              {rest.length > 0 && (
                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px bg-bg-border" />
                  <span className="text-xs text-text-dim font-medium">Berita Lainnya</span>
                  <div className="flex-1 h-px bg-bg-border" />
                </div>
              )}

              <div className="flex flex-col gap-2">
                {rest.map((article) => (
                  <NewsCard key={article.id} article={article} />
                ))}
              </div>

              <div className="mt-8 pt-4 border-t border-bg-border flex items-center justify-between">
                <span className="text-xs text-text-dim">
                  {filtered.length} berita ditampilkan
                </span>
                <button
                  onClick={refresh}
                  className="text-xs font-medium text-text-dim hover:text-accent-gold transition-colors"
                >
                  Muat ulang feed
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}