"use client";

import { useMemo, useState } from "react";
import {
  Activity, BarChart3, Bell, BookOpen, BrainCircuit, ChevronRight,
  CircleDollarSign, FileText, LayoutDashboard, Newspaper, Search,
  ShieldAlert, Sparkles, TrendingDown, TrendingUp, Wallet, X
} from "lucide-react";
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis
} from "recharts";

const chart = [
  { t: "9:30", p: 183.2 }, { t: "10:00", p: 184.1 }, { t: "10:30", p: 182.9 },
  { t: "11:00", p: 185.7 }, { t: "11:30", p: 186.3 }, { t: "12:00", p: 185.8 },
  { t: "12:30", p: 188.1 }, { t: "1:00", p: 187.4 }, { t: "1:30", p: 189.2 },
  { t: "2:00", p: 190.1 }, { t: "2:30", p: 189.7 }, { t: "3:00", p: 191.4 },
];

const ideas = [
  { ticker: "NVDA", side: "LONG", price: "$191.42", change: "+3.1%", reason: "Momentum + above-average volume + semiconductor strength", risk: "Earnings volatility; loss of $187 support" },
  { ticker: "MSFT", side: "WATCH", price: "$514.06", change: "+0.8%", reason: "Strong trend, but valuation and resistance need confirmation", risk: "Failed breakout / weaker cloud growth" },
  { ticker: "TSLA", side: "SHORT", price: "$338.71", change: "-2.4%", reason: "Downtrend + declining relative strength", risk: "Reclaim of short-term resistance" },
];

const nav = [
  ["Dashboard", LayoutDashboard], ["Markets", Activity], ["Stocks", BarChart3],
  ["Watchlists", Bell], ["Portfolio", Wallet], ["Paper Trade", CircleDollarSign],
  ["News", Newspaper], ["Filings", FileText], ["AI Analyst", BrainCircuit],
  ["Education", BookOpen]
] as const;

export default function Home() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("NVDA");
  const [paperOpen, setPaperOpen] = useState(false);
  const [active, setActive] = useState("Dashboard");

  const filtered = useMemo(() => {
    if (!query.trim()) return ideas;
    return ideas.filter(x => x.ticker.includes(query.toUpperCase()));
  }, [query]);

  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand"><div className="logo"><Sparkles size={19}/></div><span>MarketPilot</span></div>
        <div className="mode">RESEARCH MODE <span>LIVE</span></div>
        <nav>
          {nav.map(([label, Icon]) => (
            <button key={label} onClick={() => setActive(label)} className={active === label ? "nav active" : "nav"}>
              <Icon size={18}/><span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="side-bottom">
          <div className="paper-badge"><div>Paper account</div><strong>$100,000.00</strong><small>SIMULATED</small></div>
          <div className="disclaimer">MarketPilot provides research and simulation tools. It does not guarantee outcomes.</div>
        </div>
      </aside>

      <section className="content">
        <header className="topbar">
          <div>
            <div className="eyebrow">MARKET RESEARCH TERMINAL</div>
            <h1>{active}</h1>
          </div>
          <div className="top-actions">
            <div className="search"><Search size={17}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search ticker or company..." /></div>
            <button className="icon-btn"><Bell size={18}/></button>
            <div className="avatar">MP</div>
          </div>
        </header>

        <div className="ticker-row">
          <Ticker name="S&P 500" value="6,642.18" change="+0.42%" />
          <Ticker name="NASDAQ" value="22,318.12" change="+0.67%" />
          <Ticker name="DOW" value="46,211.90" change="+0.12%" />
          <Ticker name="VIX" value="15.82" change="-4.13%" down />
          <Ticker name="10Y" value="4.12%" change="+0.03%" />
        </div>

        <div className="grid">
          <section className="card hero">
            <div className="card-head">
              <div><span className="symbol">{selected}</span><span className="company"> NVIDIA Corporation</span></div>
              <button className="outline" onClick={() => setPaperOpen(true)}>Paper Trade</button>
            </div>
            <div className="quote">$191.42 <span className="up">+5.74 (+3.09%)</span></div>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height={290}>
                <AreaChart data={chart}>
                  <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopOpacity={0.22}/><stop offset="100%" stopOpacity={0}/></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="t" tickLine={false} axisLine={false} />
                  <YAxis domain={["dataMin - 2", "dataMax + 2"]} tickLine={false} axisLine={false} width={48}/>
                  <Tooltip />
                  <Area type="monotone" dataKey="p" strokeWidth={2} fill="url(#g)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="stats">
              <Stat k="Market cap" v="$4.66T" /><Stat k="Volume" v="182.4M" />
              <Stat k="P/E" v="48.2" /><Stat k="RSI (14)" v="63.8" />
            </div>
          </section>

          <section className="card ai">
            <div className="card-title"><BrainCircuit size={19}/> AI Analyst <span className="live-dot">● LIVE</span></div>
            <h2>Why is NVDA interesting?</h2>
            <p className="summary">The current setup combines positive price momentum with elevated volume. The trend remains above its short-term moving averages, while semiconductor stocks are showing relative strength.</p>
            <div className="evidence"><b>TECHNICAL</b><span>Price above 20/50-day averages · RSI 63.8 · positive MACD</span></div>
            <div className="evidence"><b>FUNDAMENTAL</b><span>Strong revenue/FCF profile; valuation remains a risk</span></div>
            <div className="evidence"><b>CATALYST</b><span>Upcoming earnings and AI infrastructure demand</span></div>
            <div className="warning"><ShieldAlert size={17}/><span><b>Invalidation:</b> sustained break below the recent support zone would weaken this setup.</span></div>
            <button className="challenge">Challenge this idea <ChevronRight size={16}/></button>
          </section>

          <section className="card ideas">
            <div className="card-head"><div className="card-title"><Sparkles size={18}/> Trade Ideas</div><span className="muted">Research signals</span></div>
            <div className="idea-list">
              {filtered.map(i => (
                <button className="idea" key={i.ticker} onClick={() => setSelected(i.ticker)}>
                  <div className="idea-top"><strong>{i.ticker}</strong><span className={i.side === "SHORT" ? "pill red" : i.side === "WATCH" ? "pill gray" : "pill"}>{i.side}</span><span className={i.change.startsWith("-") ? "down" : "up"}>{i.change}</span></div>
                  <div className="idea-reason">{i.reason}</div><small>Risk: {i.risk}</small>
                </button>
              ))}
            </div>
          </section>

          <section className="card news">
            <div className="card-head"><div className="card-title"><Newspaper size={18}/> Market News</div><span className="muted">Sources & timestamps</span></div>
            <News title="Semiconductor shares climb as AI infrastructure spending remains in focus" source="Reuters · 18 min ago" />
            <News title="Markets weigh inflation data and the next rate decision" source="Federal Reserve / FRED · 42 min ago" />
            <News title="NVIDIA files latest quarterly report with SEC" source="SEC EDGAR · 1 hr ago" />
            <News title="Mega-cap technology leads today's sector breadth" source="Market data · 2 hr ago" />
          </section>

          <section className="card portfolio">
            <div className="card-head"><div className="card-title"><Wallet size={18}/> Paper Portfolio</div><button className="outline small" onClick={() => setPaperOpen(true)}>Open simulator</button></div>
            <div className="portfolio-value">$104,286.50 <span className="up">+$4,286.50 (+4.29%)</span></div>
            <div className="bars"><div><span>NVDA</span><i style={{width:"72%"}}/></div><div><span>MSFT</span><i style={{width:"48%"}}/></div><div><span>Cash</span><i style={{width:"32%"}}/></div></div>
          </section>
        </div>
      </section>

      {paperOpen && <div className="modal-backdrop" onClick={() => setPaperOpen(false)}>
        <div className="modal" onClick={e => e.stopPropagation()}>
          <button className="close" onClick={() => setPaperOpen(false)}><X/></button>
          <div className="eyebrow">SIMULATED ORDER</div><h2>Paper trade {selected}</h2>
          <p>This order changes only the virtual $100,000 paper account.</p>
          <div className="order-grid"><button className="order long">LONG</button><button className="order short">SHORT</button></div>
          <label>Shares<input type="number" defaultValue="10" /></label>
          <label>Order type<select defaultValue="market"><option value="market">Market</option><option value="limit">Limit</option><option value="stop">Stop</option></select></label>
          <button className="primary" onClick={() => setPaperOpen(false)}>Place simulated order</button>
        </div>
      </div>}
    </main>
  );
}

function Ticker({name,value,change,down=false}:{name:string,value:string,change:string,down?:boolean}) {
  return <div className="ticker"><span>{name}</span><strong>{value}</strong><small className={down ? "down":"up"}>{change}</small></div>
}
function Stat({k,v}:{k:string,v:string}) { return <div><small>{k}</small><strong>{v}</strong></div> }
function News({title,source}:{title:string,source:string}) { return <div className="news-item"><div><strong>{title}</strong><small>{source}</small></div><ChevronRight size={17}/></div> }