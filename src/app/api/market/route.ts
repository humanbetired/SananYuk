import { NextResponse } from "next/server";
import { fetchMarketIndices } from "@/lib/fetchMarket";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const indices = await fetchMarketIndices();
    return NextResponse.json(
      { indices, timestamp: new Date().toISOString() },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    return NextResponse.json({ indices: [] }, { status: 500 });
  }
}