import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { chartData } from "@/lib/demo-data";
import type { TradeIdea } from "@/lib/types";

import { DataBadge } from "./DataBadge";

export function StockSummaryCard({
  idea,
  onOpenPaperTrade,
}: {
  idea: TradeIdea;
  onOpenPaperTrade: () => void;
}) {
  return (
    <section className="card hero">
      <div className="card-head">
        <div>
          <span className="symbol">{idea.ticker}</span>
          <span className="company"> {idea.company}</span>
          <DataBadge kind="DEMO DATA" />
        </div>

        <button className="outline" type="button" onClick={onOpenPaperTrade}>
          Paper Trade
        </button>
      </div>

      <div className="quote">
        {idea.displayPrice}{" "}
        <span className={idea.change.startsWith("-") ? "down" : "up"}>
          {idea.change}
        </span>
      </div>

      <div className="source-line">
        Source: {idea.source} · Timestamp: {idea.timestamp}
      </div>

      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height={290}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient
                id="demo-chart-gradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopOpacity={0.22} />
                <stop offset="100%" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis dataKey="t" tickLine={false} axisLine={false} />

            <YAxis
              domain={["dataMin - 2", "dataMax + 2"]}
              tickLine={false}
              axisLine={false}
              width={48}
            />

            <Tooltip
              formatter={(value: number | string | undefined) => [
                `${String(value)} (demo)`,
                "Demo price",
              ]}
            />

            <Area
              type="monotone"
              dataKey="p"
              strokeWidth={2}
              fill="url(#demo-chart-gradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="stats">
        <Stat label="Market cap" value="Data unavailable" />
        <Stat label="Volume" value="Data unavailable" />
        <Stat label="P/E" value="Data unavailable" />
        <Stat label="RSI (14)" value="Data unavailable" />
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <small>{label}</small>
      <strong>{value}</strong>
    </div>
  );
}
