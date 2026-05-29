import type { NewsSource } from "@/types";

export const NEWS_SOURCES: NewsSource[] = [
  // Sumber yang punya RSS langsung & HTTPS
  {
    id: "cnbc-indonesia",
    name: "CNBC Indonesia",
    feedUrl: "https://www.cnbcindonesia.com/rss",
    category: "market-movers",
  },
  {
    id: "detik-finance",
    name: "Detik Finance",
    feedUrl: "https://finance.detik.com/rss",
    category: "macro",
  },

  // Via Google News RSS (reliable, selalu HTTPS, tidak perlu domain RSS khusus)
  {
    id: "bisnis-com",
    name: "Bisnis.com",
    feedUrl: "https://news.google.com/rss/search?q=saham+site:bisnis.com&hl=id&gl=ID&ceid=ID:id",
    category: "market-movers",
  },
  {
    id: "kontan",
    name: "Kontan",
    feedUrl: "https://news.google.com/rss/search?q=saham+IHSG+site:kontan.co.id&hl=id&gl=ID&ceid=ID:id",
    category: "analysis",
  },
  {
    id: "idx-channel",
    name: "IDX Channel",
    feedUrl: "https://news.google.com/rss/search?q=saham+bursa+site:idxchannel.com&hl=id&gl=ID&ceid=ID:id",
    category: "market-movers",
  },
  {
    id: "investor-id",
    name: "Investor Daily",
    feedUrl: "https://news.google.com/rss/search?q=saham+emiten+site:investor.id&hl=id&gl=ID&ceid=ID:id",
    category: "analysis",
  },
  {
    id: "newsmaker",
    name: "Newsmaker",
    feedUrl: "https://news.google.com/rss/search?q=saham+IHSG+site:newsmaker.id&hl=id&gl=ID&ceid=ID:id",
    category: "market-movers",
  },

  // Tambahan: Google News agregat berita saham Indonesia
  {
    id: "google-ihsg",
    name: "Google News — IHSG",
    feedUrl: "https://news.google.com/rss/search?q=IHSG+saham+Indonesia&hl=id&gl=ID&ceid=ID:id",
    category: "market-movers",
  },
  {
    id: "google-emiten",
    name: "Google News — Emiten",
    feedUrl: "https://news.google.com/rss/search?q=emiten+bursa+efek+Indonesia&hl=id&gl=ID&ceid=ID:id",
    category: "earnings",
  },
];

export const RSS_TO_JSON_API = "https://api.rss2json.com/v1/api.json";

export const REFRESH_INTERVAL = 60_000;

export const CATEGORY_LABELS: Record<string, string> = {
  all: "Semua Berita",
  "market-movers": "Penggerak Pasar",
  earnings: "Kinerja Emiten",
  macro: "Makro Ekonomi",
  ipo: "IPO",
  crypto: "Kripto",
  commodities: "Komoditas",
  forex: "Valas",
  analysis: "Analisis",
};

export const SENTIMENT_KEYWORDS = {
  bullish: [
    "naik", "menguat", "reli", "tumbuh", "lonjak", "melejit", "positif",
    "rekor", "untung", "laba", "surplus", "optimis", "beli", "upgrade",
    "overweight", "outperform", "rally", "gain", "rise", "surge", "bull",
  ],
  bearish: [
    "turun", "melemah", "anjlok", "jatuh", "koreksi", "rugi", "defisit",
    "pesimis", "jual", "downgrade", "underweight", "underperform", "crash",
    "plunge", "drop", "fall", "decline", "bear", "loss", "sell",
  ],
};