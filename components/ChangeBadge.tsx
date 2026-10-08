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
      <span className="badge badge-success gap-1">
        ▲ {pct}%
      </span>
    );
  }

  if (dir === "down") {
    return (
      <span className="badge badge-error gap-1">
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