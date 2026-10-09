type ChangeBadgeProps = {
  dir: "up" | "down" | "flat";
  pct: number;
};

export default function ChangeBadge({
  dir,
  pct,
}: ChangeBadgeProps) {
  if (dir === "up") {
    return (
      <span className="badge badge-success">
        ▲ {pct}%
      </span>
    );
  }

  if (dir === "down") {
    return (
      <span className="badge badge-error">
        ▼ {pct}%
      </span>
    );
  }

  return (
    <span className="badge badge-ghost">
      — 0%
    </span>
  );
}