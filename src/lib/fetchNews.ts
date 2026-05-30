import type { NewsArticle, NewsCategory } from "@/types";
import { NEWS_SOURCES } from "./sources";
import { XMLParser } from "fast-xml-parser";

interface RssItem {
  title: string;
  link: string;
  pubDate?: string;
  published?: string;
  updated?: string;
  description?: string;
  "content:encoded"?: string;
  content?: string;
  enclosure?: { "@_url": string; "@_type": string };
  "media:content"?: { "@_url": string };
  "media:thumbnail"?: { "@_url": string };
}

interface RssChannel {
  item?: RssItem | RssItem[];
  entry?: RssItem | RssItem[];
  title?: string;
  link?: string;
}

interface RssFeed {
  rss?: { channel?: RssChannel };
  feed?: RssChannel;
}

function stripHtml(html: string): string {
  if (!html) return "";
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

function resolveLink(link: unknown): string {
  if (typeof link === "string") return link;
  if (Array.isArray(link)) return link[0] ?? "";
  if (typeof link === "object" && link !== null) {
    const l = link as Record<string, unknown>;
    return (l["@_href"] as string) ?? "";
  }
  return "";
}

async function fetchFeed(
  sourceId: string,
  feedUrl: string,
  category: NewsCategory
): Promise<NewsArticle[]> {
  try {
    const res = await fetch(feedUrl, {
      cache: "no-store",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; DikSaham/1.0)",
        "Accept": "application/rss+xml, application/xml, text/xml, */*",
      },
      signal: AbortSignal.timeout(8000), // timeout 8 detik
    });

    if (!res.ok) return [];

    const xml = await res.text();
    if (!xml || xml.trim() === "") return [];

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
      textNodeName: "#text",
      isArray: (name) => ["item", "entry"].includes(name),
    });

    const parsed: RssFeed = parser.parse(xml);

    // Support RSS 2.0 dan Atom
    const channel = parsed?.rss?.channel ?? parsed?.feed;
    if (!channel) return [];

    const rawItems: RssItem[] = [
      ...((channel.item as RssItem[]) ?? []),
      ...((channel.entry as RssItem[]) ?? []),
    ];

    if (rawItems.length === 0) return [];

    const source = NEWS_SOURCES.find((s) => s.id === sourceId);
    const now = Date.now();

    return rawItems.map((item, idx) => {
      const rawContent =
        item["content:encoded"] ||
        item.description ||
        item.content ||
        "";

      const summary = stripHtml(rawContent).slice(0, 220) + "...";

      const pubDate =
        item.pubDate ||
        item.published ||
        item.updated ||
        new Date().toISOString();

      const imageUrl =
        item["media:thumbnail"]?.["@_url"] ||
        item["media:content"]?.["@_url"] ||
        item.enclosure?.["@_url"] ||
        undefined;

      return {
        id: `${sourceId}-${idx}-${now}`,
        title: stripHtml(String(item.title ?? "")),
        summary,
        source: source?.name ?? sourceId,
        sourceUrl: resolveLink(channel.link) || feedUrl,
        url: resolveLink(item.link),
        publishedAt: String(pubDate),
        category,
        imageUrl,
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
    if (!a.title || a.title.trim() === "") return false;
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