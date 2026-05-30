"use client";

import { useEffect, useState, useRef } from "react";
import type { MarketIndex } from "@/lib/fetchMarket";

export default function MarketBar() {
  const [indices, setIndices] = useState<MarketIndex[]>([]);
  const [loading, setLoading] = useState(true);
  const tickerRef = useRef<HTMLDivElement>(null);

  const loadData = async () => {
    try {
      const res = await fetch("/api/market", { cache: "no-store" });
      const data = await res.json();
      setIndices(data.indices ?? []);
    } catch {
      // silent fail
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const t = setInterval(loadData, 60_000);
    return () => clearInterval(t);
  }, []);

  if (loading) {
    return (
      <div className="bg-bg-secondary border-b border-bg-border h-8 flex items-center px-4 gap-4 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-3 w-24 bg-bg-hover rounded animate-pulse shrink-0" />
        ))}
      </div>
    );
  }

  if (indices.length === 0) return null;

  const formatPrice = (index: MarketIndex) => {
    if (index.symbol === "USDIDR") {
      return index.price.toLocaleString("id-ID", { maximumFractionDigits: 0 });
    }
    if (index.price > 1000) {
      return index.price.toLocaleString("id-ID", { maximumFractionDigits: 0 });
    }
    return index.price.toLocaleString("id-ID", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const repeated = [
    ...indices, ...indices, ...indices,
    ...indices, ...indices, ...indices,
  ];

  return (
    <div className="bg-bg-secondary border-b border-bg-border overflow-hidden">
      <div className="flex items-center h-8">
        {/* Label kiri - fixed */}
        <div className="shrink-0 px-3 h-full flex items-center border-r border-bg-border bg-accent-gold/10 z-10">
          <span className="text-[10px] font-semibold text-accent-gold tracking-widest uppercase whitespace-nowrap">
            Market
          </span>
        </div>

        {/* Ticker container */}
        <div className="overflow-hidden flex-1 relative">
          <div
            ref={tickerRef}
            className="flex items-center gap-8 whitespace-nowrap w-max"
            style={{
              animation: "marketTickerScroll 25s linear infinite",
            }}
          >
            {repeated.map((index, idx) => (
              <div
                key={index.symbol + "-" + idx}
                className="inline-flex items-center gap-2 shrink-0"
              >
                <span className="text-[11px] font-semibold text-text-secondary">
                  {index.name}
                </span>
                <span className="text-[12px] font-semibold text-text-primary">
                  {formatPrice(index)}
                </span>
                <span
                  className={
                    "text-[11px] font-semibold " +
                    (index.isUp ? "text-accent-green" : "text-accent-red")
                  }
                >
                  {index.isUp ? "+" : ""}
                  {index.changePercent.toFixed(2)}%
                </span>
                <span className="text-text-dim mx-1">·</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}