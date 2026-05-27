"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { NewsArticle, FeedState, FilterState } from "@/types";
import { REFRESH_INTERVAL } from "@/lib/sources";

export function useNews() {
  const [state, setState] = useState<FeedState>({
    articles: [],
    isLoading: true,
    lastUpdated: null,
    error: null,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchNews = useCallback(async () => {
    try {
      const res = await fetch("/api/news", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setState({
        articles: data.articles || [],
        isLoading: false,
        lastUpdated: new Date(),
        error: null,
      });
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Unable to fetch latest news. Retrying...",
      }));
    }
  }, []);

  useEffect(() => {
    fetchNews();
    intervalRef.current = setInterval(fetchNews, REFRESH_INTERVAL);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchNews]);

  return { ...state, refresh: fetchNews };
}

export function useFilteredNews(
  articles: NewsArticle[],
  filters: FilterState
) {
  return articles.filter((article) => {
    if (filters.category !== "all" && article.category !== filters.category)
      return false;
    if (filters.sentiment !== "all" && article.sentiment !== filters.sentiment)
      return false;
    if (filters.source !== "all" && article.source !== filters.source)
      return false;
    if (filters.search) {
      const query = filters.search.toLowerCase();
      if (
        !article.title.toLowerCase().includes(query) &&
        !article.summary.toLowerCase().includes(query)
      )
        return false;
    }
    return true;
  });
}
