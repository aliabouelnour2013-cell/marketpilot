import { Sparkles } from "lucide-react";

import { navigationItems } from "@/lib/navigation";

export function Sidebar({
  activePage,
  onNavigate,
}: {
  activePage: string;
  onNavigate: (page: string) => void;
}) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="logo">
          <Sparkles size={19} />
        </div>

        <span>MarketPilot</span>
      </div>

      <div className="mode">
        RESEARCH MODE <span>DEMO DATA</span>
      </div>

      <nav aria-label="Primary navigation">
        {navigationItems.map(({ label, icon: Icon }) => (
          <button
            key={label}
            onClick={() => onNavigate(label)}
            className={activePage === label ? "nav active" : "nav"}
            type="button"
          >
            <Icon size={18} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="side-bottom">
        <div className="paper-badge">
          <div>Paper account</div>
          <strong>$100,000.00</strong>
          <small>SIMULATED / DEMO MODE</small>
        </div>

        <div className="disclaimer">
          MarketPilot provides research and simulation tools. It does not
          execute real-money trades, guarantee outcomes, or provide
          individualized financial advice.
        </div>
      </div>
    </aside>
  );
}
