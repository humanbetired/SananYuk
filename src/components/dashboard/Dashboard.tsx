"use client";

import { useState, useMemo } from "react";
import { useNews, useFilteredNews } from "@/hooks/useNews";
import Header from "@/components/dashboard/Header";
import FilterPanel from "@/components/dashboard/FilterPanel";
import StatsBar from "@/components/dashboard/StatsBar";
import NewsCard from "@/components/news/NewsCard";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import type { FilterState } from "@/types";

const DEFAULT_FILTERS: FilterState = {
  category: "all",
  sentiment: "all",
  source: "all",
  search: "",
};

export default function Dashboard() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { articles, isLoading, lastUpdated, error, refresh } = useNews();
  const filtered = useFilteredNews(articles, filters);

  // Category counts
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
    <div className="h-screen flex flex-col bg-bg-primary noise-bg overflow-hidden">
      {/* Grid background */}
      <div className="fixed inset-0 grid-bg opacity-30 pointer-events-none" />

      <Header
        lastUpdated={lastUpdated}
        articleCount={articles.length}
        topArticles={articles.slice(0, 15)}
        onRefresh={refresh}
      />

      <StatsBar articles={articles} />

      <div className="flex flex-1 overflow-hidden relative z-10">
        {/* Sidebar toggle for mobile */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute left-0 top-4 z-20 md:hidden bg-bg-secondary border border-bg-border p-2"
        >
          <svg className="w-4 h-4 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Filter sidebar */}
        <div className={`${sidebarOpen ? "flex" : "hidden"} md:flex`}>
          <FilterPanel
            filters={filters}
            onChange={setFilters}
            sources={uniqueSources}
            counts={counts}
          />
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          {isLoading ? (
            <LoadingSkeleton />
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
              <div className="w-10 h-10 border border-accent-red/40 flex items-center justify-center">
                <svg className="w-5 h-5 text-accent-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <p className="font-mono text-xs text-text-secondary">{error}</p>
              <button
                onClick={refresh}
                className="font-mono text-xs text-accent-gold border border-accent-gold/30 px-4 py-2 hover:bg-accent-gold/10 transition-colors"
              >
                RETRY
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 gap-3">
              <div className="w-8 h-8 border border-bg-border flex items-center justify-center">
                <svg className="w-4 h-4 text-text-dim" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="font-mono text-xs text-text-secondary">No signals match current filters</p>
              <button
                onClick={() => setFilters(DEFAULT_FILTERS)}
                className="font-mono text-[10px] text-accent-gold/60 hover:text-accent-gold transition-colors"
              >
                CLEAR FILTERS
              </button>
            </div>
          ) : (
            <div className="p-6 max-w-4xl">
              {/* Header row */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="label-mono text-[10px]">Intelligence Feed</span>
                  <span className="font-mono text-[10px] bg-accent-gold/10 text-accent-gold px-2 py-0.5">
                    {filtered.length} Signals
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="label-mono text-[10px]">Sort: Latest First</span>
                </div>
              </div>

              {/* Featured article */}
              {featured && (
                <div className="mb-4">
                  <div className="label-mono text-[10px] mb-2 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent-gold live-dot rounded-full" />
                    Top Signal
                  </div>
                  <NewsCard article={featured} featured />
                </div>
              )}

              {/* Divider */}
              {rest.length > 0 && (
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 h-px bg-bg-border" />
                  <span className="label-mono text-[10px]">All Signals</span>
                  <div className="flex-1 h-px bg-bg-border" />
                </div>
              )}

              {/* Rest of articles */}
              <div className="grid gap-2">
                {rest.map((article) => (
                  <NewsCard key={article.id} article={article} />
                ))}
              </div>

              {/* Footer */}
              <div className="mt-8 pt-4 border-t border-bg-border flex items-center justify-between">
                <span className="label-mono text-[10px]">
                  End of feed — {filtered.length} signals displayed
                </span>
                <button
                  onClick={refresh}
                  className="font-mono text-[10px] text-text-dim hover:text-accent-gold transition-colors"
                >
                  REFRESH FEED
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
