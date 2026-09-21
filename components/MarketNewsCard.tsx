import { ChevronRight, Newspaper } from "lucide-react";

export function MarketNewsCard() {
  const placeholders = [
    {
      title: "Provider-backed financial news will appear here after integration",
      source: "Status: DEMO MODE · No news provider configured",
    },
    {
      title: "Government economic releases should cite official sources",
      source: "Preferred sources: Federal Reserve, BLS, BEA, Treasury",
    },
    {
      title: "Company filings should retain a link to the source record",
      source: "Preferred source: SEC EDGAR",
    },
    {
      title: "Full copyrighted news articles are not displayed in MarketPilot",
      source: "Use metadata, permitted excerpts, summaries, and source links",
    },
  ];

  return (
    <section className="card news">
      <div className="card-head">
        <div className="card-title">
          <Newspaper size={18} />
          Market News
        </div>

        <span className="muted">Sources required</span>
      </div>

      {placeholders.map((item) => (
        <NewsItem
          key={item.title}
          title={item.title}
          source={item.source}
        />
      ))}
    </section>
  );
}

function NewsItem({ title, source }: { title: string; source: string }) {
  return (
    <div className="news-item">
      <div>
        <strong>{title}</strong>
        <small>{source}</small>
      </div>

      <ChevronRight size={17} />
    </div>
  );
}
