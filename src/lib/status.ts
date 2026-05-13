export function normalizeStatus(status?: string | null): string {
  return String(status || "").trim().toLowerCase();
}

export function formatStatus(status?: string | null): string {
  return normalizeStatus(status)
    .split("_")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
