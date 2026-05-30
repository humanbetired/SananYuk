export interface MarketIndex {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  isUp: boolean;
}

// Stooq symbols yang confirmed working
const STOOQ_INDICES = [
  { symbol: "XAUUSD", name: "Emas (USD)", stooq: "xauusd" },
  { symbol: "SPX", name: "S&P 500", stooq: "^spx" },
  { symbol: "OIL", name: "Minyak", stooq: "cl.f" },
  { symbol: "DXY", name: "USD Index", stooq: "dx.f" },
  { symbol: "EURJPY", name: "EUR/JPY", stooq: "eurjpy" },
];

// Untuk IHSG & IDR pakai Frankfurter / alternative
const MANUAL_INDICES = [
  {
    symbol: "IHSG",
    name: "IHSG",
    url: "https://query2.finance.yahoo.com/v8/finance/chart/%5EJKSE?interval=1d&range=2d",
  },
  {
    symbol: "USDIDR",
    name: "USD/IDR",
    url: "https://query2.finance.yahoo.com/v8/finance/chart/USDIDR%3DX?interval=1d&range=2d",
  },
];

async function fetchStooq(
  index: (typeof STOOQ_INDICES)[0]
): Promise<MarketIndex | null> {
  try {
    const url = `https://stooq.com/q/l/?s=${index.stooq}&f=sd2t2ohlcv&h&e=csv`;
    const res = await fetch(url, {
      cache: "no-store",
      headers: { "User-Agent": "Mozilla/5.0" },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return null;
    const text = await res.text();
    const lines = text.trim().split("\n");
    if (lines.length < 2) return null;
    const cols = lines[1].split(",");
    const open = parseFloat(cols[3]);
    const close = parseFloat(cols[6]);
    if (isNaN(close) || close === 0) return null;
    const change = close - open;
    const changePercent = open ? (change / open) * 100 : 0;
    return {
      symbol: index.symbol,
      name: index.name,
      price: close,
      change,
      changePercent,
      isUp: change >= 0,
    };
  } catch {
    return null;
  }
}

async function fetchYahoo(
  index: (typeof MANUAL_INDICES)[0]
): Promise<MarketIndex | null> {
  try {
    const res = await fetch(index.url, {
      cache: "no-store",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.9",
        "Origin": "https://finance.yahoo.com",
        "Referer": "https://finance.yahoo.com/",
      },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const meta = data?.chart?.result?.[0]?.meta;
    if (!meta) return null;
    const price = meta.regularMarketPrice ?? 0;
    const prevClose = meta.previousClose ?? meta.chartPreviousClose ?? price;
    const change = price - prevClose;
    const changePercent = prevClose ? (change / prevClose) * 100 : 0;
    return {
      symbol: index.symbol,
      name: index.name,
      price,
      change,
      changePercent,
      isUp: change >= 0,
    };
  } catch {
    return null;
  }
}

export async function fetchMarketIndices(): Promise<MarketIndex[]> {
  const [stooqResults, yahooResults] = await Promise.all([
    Promise.allSettled(STOOQ_INDICES.map(fetchStooq)),
    Promise.allSettled(MANUAL_INDICES.map(fetchYahoo)),
  ]);

  const stooq = stooqResults
    .filter(
      (r): r is PromiseFulfilledResult<MarketIndex> =>
        r.status === "fulfilled" && r.value !== null
    )
    .map((r) => r.value as MarketIndex);

  const yahoo = yahooResults
    .filter(
      (r): r is PromiseFulfilledResult<MarketIndex> =>
        r.status === "fulfilled" && r.value !== null
    )
    .map((r) => r.value as MarketIndex);

  // Urutkan: IHSG dan IDR duluan
  const priority = ["IHSG", "USDIDR"];
  const all = [...yahoo, ...stooq];
  return [
    ...all.filter((i) => priority.includes(i.symbol)),
    ...all.filter((i) => !priority.includes(i.symbol)),
  ];
}