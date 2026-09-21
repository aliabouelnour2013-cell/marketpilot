import type { ReactNode } from "react";
import { Bell, Search } from "lucide-react";

import { DemoBanner } from "./DemoBanner";
import { Sidebar } from "./Sidebar";

export function AppShell({
  activePage,
  query,
  onQueryChange,
  onNavigate,
  children,
}: {
  activePage: string;
  query: string;
  onQueryChange: (value: string) => void;
  onNavigate: (page: string) => void;
  children: ReactNode;
}) {
  return (
    <main className="shell">
      <Sidebar activePage={activePage} onNavigate={onNavigate} />

      <section className="content">
        <header className="topbar">
          <div>
            <div className="eyebrow">MARKET RESEARCH TERMINAL</div>
            <h1>{activePage}</h1>
          </div>

          <div className="top-actions">
            <div className="search">
              <Search size={17} />

              <input
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                placeholder="Search demo ticker or company..."
                aria-label="Search demo ticker or company"
              />
            </div>

            <button
              className="icon-btn"
              type="button"
              aria-label="Notifications are not configured"
              title="Notifications are not configured"
            >
              <Bell size={18} />
            </button>

            <div className="avatar" title="Local demo profile">
              MP
            </div>
          </div>
        </header>

        <DemoBanner />

        {children}
      </section>
    </main>
  );
}
