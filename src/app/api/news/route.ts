import { NextResponse } from "next/server";
import { fetchAllNews } from "@/lib/fetchNews";

export const revalidate = 60;

export async function GET() {
  try {
    const articles = await fetchAllNews();
    return NextResponse.json({ articles, timestamp: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch news", articles: [] },
      { status: 500 }
    );
  }
}
