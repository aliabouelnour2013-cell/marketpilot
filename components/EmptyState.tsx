import type { ReactNode } from "react";

import { demoTimestamp } from "@/lib/demo-data";

export function EmptyState({
  icon,
  title,
  body,
}: {
  icon: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <section className="empty-state">
      <div className="empty-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{body}</p>

      <div className="source-line">
        Data status: unavailable · Timestamp: {demoTimestamp}
      </div>
    </section>
  );
}
