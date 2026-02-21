export const DEFAULT_ORG_ID = import.meta.env.VITE_ORG_ID ?? "kwality-jewellers";

export function getActiveOrgId() {
  if (typeof window === "undefined") return DEFAULT_ORG_ID;
  const queryOrgId = new URLSearchParams(window.location.search).get("orgId");
  return queryOrgId || DEFAULT_ORG_ID;
}

export function getOrgScopedStorageKey(baseKey: string) {
  return `${baseKey}:${getActiveOrgId()}`;
}
