import { NextResponse } from "next/server";
import { fetchAllNews } from "@/lib/fetchNews";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const articles = await fetchAllNews();

    // Log di terminal untuk debug
    console.log("Total articles fetched:", articles.length);
    console.log("Sample:", articles.slice(0, 2).map(a => ({
      title: a.title,
      source: a.source,
      publishedAt: a.publishedAt,
    })));

    return NextResponse.json(
      { articles, timestamp: new Date().toISOString() },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    console.error("Fetch error:", err);
    return NextResponse.json(
      { error: "Gagal mengambil berita", articles: [] },
      { status: 500 }
    );
  }
}