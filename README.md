# StockINTEL — Market Intelligence Platform

A real-time stock market news aggregator inspired by cyber threat intelligence dashboards.
Aggregates news from Reuters, CNBC, MarketWatch, Yahoo Finance, Seeking Alpha, and more.

## Features
- Real-time RSS feed aggregation from 8+ financial news sources
- Automatic sentiment analysis (Bullish / Bearish / Neutral)
- Ticker symbol extraction from headlines
- Live ticker tape with top headlines
- Filter by category, sentiment, and source
- Full-text search across headlines and summaries
- Auto-refreshes every 60 seconds
- Intelligence-style dark UI

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Fonts**: Playfair Display + IBM Plex Mono
- **Data**: RSS feeds via rss2json.com (free tier)
- **Hosting**: Vercel (free tier)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel (Free)

1. Push this project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign up / log in
3. Click "Add New Project" → import your GitHub repo
4. Vercel auto-detects Next.js — click Deploy
5. Your site is live at `https://your-project.vercel.app`

## Customization

### Add/Remove News Sources
Edit `src/lib/sources.ts` — add entries to `NEWS_SOURCES` array with any RSS feed URL.

### Change Refresh Rate
Edit `REFRESH_INTERVAL` in `src/lib/sources.ts` (in milliseconds). Default: 60000 (1 min).

### Sentiment Keywords
Edit `SENTIMENT_KEYWORDS` in `src/lib/sources.ts` to tune sentiment detection.

## RSS Feed Sources Used
| Source | Category |
|--------|----------|
| Reuters Business | Macro |
| CNBC Finance | Market Movers |
| CNBC Earnings | Earnings |
| MarketWatch | Market Movers |
| Yahoo Finance | Market Movers |
| Seeking Alpha | Analysis |
| Financial Times | Macro |
| Investing.com | Analysis |

## Notes on rss2json.com
The free tier allows 10,000 API requests/month. With 8 sources refreshing every 60s:
- 8 requests × 60 refreshes/hour × 24 hours = 11,520 requests/day on active use
- For production, consider caching at the API route level (already set to `revalidate: 60`)
- Or upgrade to rss2json paid plan ($14/mo) for unlimited requests

## License
MIT
