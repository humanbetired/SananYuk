const EXTERNAL_SOURCES = [
  {
    name: "Emiten News",
    description: "Berita emiten, saham & investasi",
    url: "https://emitennews.com",
    category: "Emiten",
  },
  {
    name: "InvestorTrust",
    description: "Market & portofolio",
    url: "https://share.google/4p3ujJLBpn1VoBMGj",
    category: "Market",
  },
  {
    name: "IDN Financials",
    description: "Berita & data keuangan emiten",
    url: "https://share.google/BFCo9ZchRScOhk35t",
    category: "Data",
  },
  {
    name: "Kontan",
    description: "Portal finansial & investasi",
    url: "https://www.kontan.co.id",
    category: "Investasi",
  },
  {
    name: "Bisnis.com",
    description: "Berita bisnis & pasar modal",
    url: "https://bisnis.com",
    category: "Bisnis",
  },
  {
    name: "IDX",
    description: "Berita resmi Bursa Efek Indonesia",
    url: "https://www.idx.co.id/id/berita/berita/",
    category: "Bursa",
  },
  {
    name: "Investor Daily",
    description: "Analisis & berita investasi",
    url: "https://investor.id",
    category: "Analisis",
  },
];

export default function SourceLinks() {
  return (
    <div className="p-4 border-t border-bg-border mt-2">
      <div className="label-mono text-[10px] mb-3 flex items-center gap-2">
        <svg
          className="w-3 h-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
        Sumber Lainnya
      </div>

      <div className="flex flex-col gap-0.5">
        {EXTERNAL_SOURCES.map((source) => (
          <a
            key={source.name}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between px-3 py-2 rounded-lg hover:bg-bg-hover transition-all duration-150"
          >
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-text-primary group-hover:text-accent-gold transition-colors truncate">
                {source.name}
              </span>
              <span className="text-[10px] text-text-dim truncate">
                {source.description}
              </span>
            </div>
            <svg
              className="w-3 h-3 text-text-dim group-hover:text-accent-gold transition-colors shrink-0 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
}