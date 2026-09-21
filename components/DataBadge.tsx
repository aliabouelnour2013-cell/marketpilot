import type { DataKind } from "@/lib/types";

export function DataBadge({ kind }: { kind: DataKind }) {
  const className =
    kind === "SIMULATED"
      ? "data-badge simulated"
      : kind === "UNAVAILABLE"
        ? "data-badge unavailable"
        : "data-badge";

  return <span className={className}>{kind}</span>;
}
