import type { NewsSource } from "@/types";

export const NEWS_SOURCES: NewsSource[] = [
  {
    id: "reuters-business",
    name: "Reuters Business",
    feedUrl: "https://feeds.reuters.com/reuters/businessNews",
    category: "macro",
  },
  {
    id: "cnbc-finance",
    name: "CNBC Finance",
    feedUrl: "https://www.cnbc.com/id/10001147/device/rss/rss.html",
    category: "market-movers",
  },
  {
    id: "cnbc-earnings",
    name: "CNBC Earnings",
    feedUrl: "https://www.cnbc.com/id/15839135/device/rss/rss.html",
    category: "earnings",
  },
  {
    id: "marketwatch",
    name: "MarketWatch",
    feedUrl: "https://feeds.marketwatch.com/marketwatch/topstories/",
    category: "market-movers",
  },
  {
    id: "seeking-alpha",
    name: "Seeking Alpha",
    feedUrl: "https://seekingalpha.com/market_currents.xml",
    category: "analysis",
  },
  {
    id: "yahoo-finance",
    name: "Yahoo Finance",
    feedUrl: "https://finance.yahoo.com/news/rssindex",
    category: "market-movers",
  },
  {
    id: "ft-markets",
    name: "Financial Times",
    feedUrl: "https://www.ft.com/markets?format=rss",
    category: "macro",
  },
  {
    id: "investing-com",
    name: "Investing.com",
    feedUrl: "https://www.investing.com/rss/news.rss",
    category: "analysis",
  },
];

export const RSS_TO_JSON_API = "https://api.rss2json.com/v1/api.json";

export const REFRESH_INTERVAL = 60_000; // 60 seconds

export const CATEGORY_LABELS: Record<string, string> = {
  all: "All News",
  "market-movers": "Market Movers",
  earnings: "Earnings",
  macro: "Macro",
  ipo: "IPO",
  crypto: "Crypto",
  commodities: "Commodities",
  forex: "Forex",
  analysis: "Analysis",
};

export const SENTIMENT_KEYWORDS = {
  bullish: [
    "surge", "rally", "gain", "rise", "jump", "soar", "bull", "up", "record",
    "growth", "profit", "beat", "strong", "positive", "upgrade", "buy",
    "outperform", "exceed", "boost", "high",
  ],
  bearish: [
    "drop", "fall", "decline", "plunge", "crash", "bear", "down", "loss",
    "miss", "weak", "negative", "downgrade", "sell", "underperform", "cut",
    "low", "slump", "tumble", "retreat", "concern",
  ],
};
