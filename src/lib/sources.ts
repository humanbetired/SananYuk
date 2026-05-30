import type { NewsSource } from "@/types";

export const NEWS_SOURCES: NewsSource[] = [
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
  {
    id: "warta-ekonomi",
    name: "Warta Ekonomi",
    feedUrl: "https://wartaekonomi.co.id/rss",
    category: "macro",
  },
  {
    id: "kabarbursa",
    name: "KabarBursa",
    feedUrl: "https://kabarbursa.com/feed",
    category: "market-movers",
  },
  {
    id: "pasardana",
    name: "Pasardana",
    feedUrl: "https://pasardana.id/rss",
    category: "market-movers",
  }
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