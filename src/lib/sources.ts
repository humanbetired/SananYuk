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
    id: "emitennews",
    name: "Emiten News",
    feedUrl: "https://news.google.com/rss/search?q=saham+emiten+site:emitennews.com&hl=id&gl=ID&ceid=ID:id",
    category: "earnings",
  },
  {
    id: "warta-ekonomi",
    name: "Warta Ekonomi",
    feedUrl: "https://news.google.com/rss/search?q=saham+investasi+site:wartaekonomi.co.id&hl=id&gl=ID&ceid=ID:id",
    category: "macro",
  },
  {
    id: "kaburbursa",
    name: "KabarBursa",
    feedUrl: "https://news.google.com/rss/search?q=saham+bursa+site:kabarbursa.com&hl=id&gl=ID&ceid=ID:id",
    category: "market-movers",
  },
  {
    id: "pasardana",
    name: "Pasardana",
    feedUrl: "https://news.google.com/rss/search?q=saham+site:pasardana.id&hl=id&gl=ID&ceid=ID:id",
    category: "market-movers",
  },
  {
    id: "idn-financials",
    name: "IDN Financials",
    feedUrl: "https://news.google.com/rss/search?q=saham+emiten+site:idnfinancials.com&hl=id&gl=ID&ceid=ID:id",
    category: "earnings",
  },
  {
    id: "google-ihsg",
    name: "Google News IHSG",
    feedUrl: "https://news.google.com/rss/search?q=IHSG+saham+Indonesia&hl=id&gl=ID&ceid=ID:id",
    category: "market-movers",
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