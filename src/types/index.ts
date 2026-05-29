export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  source: string;
  sourceUrl: string;
  url: string;
  publishedAt: string;
  category: NewsCategory;
  imageUrl?: string;
}

export type NewsCategory =
  | "market-movers"
  | "earnings"
  | "macro"
  | "ipo"
  | "crypto"
  | "commodities"
  | "forex"
  | "analysis";

export interface NewsSource {
  id: string;
  name: string;
  feedUrl: string;
  category: NewsCategory;
  logo?: string;
}

export interface FeedState {
  articles: NewsArticle[];
  isLoading: boolean;
  lastUpdated: Date | null;
  error: string | null;
}

export interface FilterState {
  category: NewsCategory | "all";
  source: string | "all";
  search: string;
}