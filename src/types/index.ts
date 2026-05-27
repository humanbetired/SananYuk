export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  source: string;
  sourceUrl: string;
  url: string;
  publishedAt: string;
  category: NewsCategory;
  sentiment: "bullish" | "bearish" | "neutral";
  tickers?: string[];
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

export interface MarketIndex {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface FeedState {
  articles: NewsArticle[];
  isLoading: boolean;
  lastUpdated: Date | null;
  error: string | null;
}

export interface FilterState {
  category: NewsCategory | "all";
  sentiment: "all" | "bullish" | "bearish" | "neutral";
  source: string | "all";
  search: string;
}
