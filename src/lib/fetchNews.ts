import type { NewsArticle, NewsCategory } from "@/types";
import { NEWS_SOURCES, RSS_TO_JSON_API } from "./sources";

interface RssItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  content: string;
  enclosure?: { link: string; type: string };
  thumbnail?: string;
}

interface RssResponse {
  status: string;
  feed: { title: string; link: string; image: string };
  items: RssItem[];
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchFeed(
  sourceId: string,
  feedUrl: string,
  category: NewsCategory
): Promise<NewsArticle[]> {
  try {
    const url = `${RSS_TO_JSON_API}?rss_url=${encodeURIComponent(feedUrl)}&count=10`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data: RssResponse = await res.json();
    if (data.status !== "ok" || !data.items) return [];

    const source = NEWS_SOURCES.find((s) => s.id === sourceId);

    return data.items.map((item, idx) => {
      const summary =
        stripHtml(item.description || item.content || "").slice(0, 200) + "...";

      return {
        id: `${sourceId}-${idx}-${Date.now()}`,
        title: stripHtml(item.title),
        summary,
        source: source?.name || sourceId,
        sourceUrl: data.feed?.link || feedUrl,
        url: item.link,
        publishedAt: item.pubDate,
        category,
        imageUrl: item.thumbnail || item.enclosure?.link || undefined,
      } satisfies NewsArticle;
    });
  } catch {
    return [];
  }
}

export async function fetchAllNews(): Promise<NewsArticle[]> {
  const results = await Promise.allSettled(
    NEWS_SOURCES.map((s) => fetchFeed(s.id, s.feedUrl, s.category))
  );

  const allArticles = results
    .filter(
      (r): r is PromiseFulfilledResult<NewsArticle[]> =>
        r.status === "fulfilled"
    )
    .flatMap((r) => r.value);

  const seen = new Set<string>();
  const unique = allArticles.filter((a) => {
    const key = a.title.slice(0, 60).toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return unique.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}