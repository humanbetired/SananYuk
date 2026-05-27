import { formatDistanceToNow } from "date-fns";
import type { NewsArticle } from "@/types";
import { CATEGORY_LABELS } from "@/lib/sources";

interface NewsCardProps {
  article: NewsArticle;
  featured?: boolean;
}

const SENTIMENT_CONFIG = {
  bullish: {
    label: "BULLISH",
    color: "text-accent-green",
    border: "border-accent-green/30",
    bg: "bg-accent-green/5",
    dot: "bg-accent-green",
    badge: "bg-accent-green/10 text-accent-green",
    indicator: "border-l-accent-green",
  },
  bearish: {
    label: "BEARISH",
    color: "text-accent-red",
    border: "border-accent-red/30",
    bg: "bg-accent-red/5",
    dot: "bg-accent-red",
    badge: "bg-accent-red/10 text-accent-red",
    indicator: "border-l-accent-red",
  },
  neutral: {
    label: "NEUTRAL",
    color: "text-text-secondary",
    border: "border-bg-border",
    bg: "",
    dot: "bg-text-dim",
    badge: "bg-bg-border/50 text-text-secondary",
    indicator: "border-l-bg-border",
  },
};

export default function NewsCard({ article, featured = false }: NewsCardProps) {
  const sentiment = SENTIMENT_CONFIG[article.sentiment];
  const timeAgo = formatDistanceToNow(new Date(article.publishedAt), {
    addSuffix: true,
  });

  if (featured) {
    return (
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`news-card block card card-hover border-l-4 ${sentiment.indicator} p-5 group`}
      >
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`font-mono text-[10px] tracking-widest px-2 py-0.5 ${sentiment.badge}`}>
              {sentiment.label}
            </span>
            <span className="label-mono text-[10px] px-2 py-0.5 bg-bg-border/50">
              {CATEGORY_LABELS[article.category]}
            </span>
          </div>
          <span className="font-mono text-[10px] text-text-dim shrink-0">{timeAgo}</span>
        </div>

        <h2 className="font-display text-xl font-semibold text-text-primary group-hover:text-accent-gold transition-colors duration-200 leading-snug mb-2">
          {article.title}
        </h2>

        <p className="font-body text-sm text-text-secondary leading-relaxed mb-4 line-clamp-3">
          {article.summary}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="label-mono text-[10px] text-accent-gold">{article.source}</span>
            {article.tickers && article.tickers.length > 0 && (
              <div className="flex gap-1">
                {article.tickers.slice(0, 3).map((t) => (
                  <span key={t} className="font-mono text-[10px] px-1.5 py-0.5 bg-accent-blue/10 text-accent-blue border border-accent-blue/20">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-text-dim group-hover:text-accent-gold transition-colors">
            <span className="font-mono text-[10px]">READ</span>
            <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </a>
    );
  }

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`news-card flex gap-0 card card-hover border-l-2 ${sentiment.indicator} group overflow-hidden`}
    >
      <div className="flex-1 p-4">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${sentiment.dot}`} />
            <span className="label-mono text-[10px] text-accent-gold">{article.source}</span>
            <span className="text-bg-border font-mono">·</span>
            <span className="label-mono text-[10px]">{CATEGORY_LABELS[article.category]}</span>
          </div>
          <span className="font-mono text-[10px] text-text-dim">{timeAgo}</span>
        </div>

        <h3 className="font-display text-sm font-semibold text-text-primary group-hover:text-accent-gold/90 transition-colors duration-200 leading-snug mb-2 line-clamp-2">
          {article.title}
        </h3>

        <p className="font-body text-xs text-text-secondary leading-relaxed line-clamp-2 mb-3">
          {article.summary}
        </p>

        <div className="flex items-center gap-2">
          <span className={`font-mono text-[10px] tracking-widest px-1.5 py-0.5 ${sentiment.badge}`}>
            {sentiment.label}
          </span>
          {article.tickers?.slice(0, 2).map((t) => (
            <span key={t} className="font-mono text-[10px] px-1.5 py-0.5 bg-accent-blue/10 text-accent-blue/80 border border-accent-blue/15">
              {t}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}
