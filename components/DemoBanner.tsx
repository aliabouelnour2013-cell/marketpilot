import { ShieldCheck } from "lucide-react";

import { demoSource } from "@/lib/demo-data";

export function DemoBanner() {
  return (
    <section className="demo-banner" aria-label="Demo data status">
      <ShieldCheck size={18} />

      <div>
        <strong>DEMO MODE — NO LIVE MARKET DATA CONNECTED</strong>

        <span>
          Prices, charts, financial metrics, ideas, headlines, and portfolio
          values in this prototype are illustrative. Source: {demoSource}.
        </span>
      </div>
    </section>
  );
}
