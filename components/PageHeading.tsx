import { DataBadge } from "./DataBadge";

export function PageHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="page-heading">
      <div>
        <div className="eyebrow">MARKETPILOT RESEARCH</div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <DataBadge kind="DEMO DATA" />
    </div>
  );
}
