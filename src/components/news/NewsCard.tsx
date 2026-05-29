import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import type { NewsArticle } from "@/types";
import { CATEGORY_LABELS } from "@/lib/sources";

interface NewsCardProps {
  article: NewsArticle;
  featured?: boolean;
}

export default function NewsCard({ article, featured = false }: NewsCardProps) {
  const timeAgo = formatDistanceToNow(new Date(article.publishedAt), {
    addSuffix: true,
    locale: id,
  });

  if (featured) {
    return (
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="news-card block card card-hover border-l-4 border-l-accent-gold p-5 group"
      >
        <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
          <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-bg-primary text-text-secondary border border-bg-border">
            {CATEGORY_LABELS[article.category]}
          </span>
          <span className="text-xs text-text-dim">{timeAgo}</span>
        </div>
        <div className="text-lg font-semibold text-text-primary group-hover:text-accent-gold transition-colors duration-200 leading-snug mb-2">
          {article.title}
        </div>
        <div className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-3">
          {article.summary}
        </div>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-xs font-semibold text-accent-gold">
            {article.source}
          </span>
          <span className="text-xs text-text-dim font-medium group-hover:text-accent-gold transition-colors">
            Baca selengkapnya
          </span>
        </div>
      </a>
    );
  }

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="news-card block card card-hover border-l-4 border-l-bg-border px-4 py-3.5 group"
    >
      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
        <span className="text-[11px] font-semibold text-accent-gold shrink-0">
          {article.source}
        </span>
        <span className="text-[11px] text-text-dim">·</span>
        <span className="text-[11px] text-text-dim">
          {CATEGORY_LABELS[article.category]}
        </span>
        <span className="text-[11px] text-text-dim">·</span>
        <span className="text-[11px] text-text-dim">{timeAgo}</span>
      </div>
      <div className="text-sm font-semibold text-text-primary group-hover:text-accent-gold transition-colors duration-200 leading-snug mb-1.5 line-clamp-2">
        {article.title}
      </div>
      <div className="text-xs text-text-secondary leading-relaxed line-clamp-2 hidden sm:block">
        {article.summary}
      </div>
    </a>
  );
}