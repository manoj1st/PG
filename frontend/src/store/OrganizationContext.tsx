import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";
import { getActiveOrgId } from "../utils/tenant";

type Organization = {
  id: string;
  name: string;
};

type OrganizationContextValue = {
  organization: Organization;
};

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000/api";

const OrganizationContext = createContext<OrganizationContextValue | undefined>(undefined);

function prettifyOrgId(orgId: string) {
  return orgId
    .split("-")
    .map((part) => (part ? `${part[0].toUpperCase()}${part.slice(1)}` : part))
    .join(" ");
}

function getFallbackOrg(): Organization {
  const orgId = getActiveOrgId();
  return { id: orgId, name: prettifyOrgId(orgId) };
}

export function OrganizationProvider({ children }: { children: ReactNode }) {
  const [organization, setOrganization] = useState<Organization>(getFallbackOrg());

  useEffect(() => {
    const orgId = getActiveOrgId();

    fetch(`${API_BASE}/public/organizations`, {
      headers: {
        "x-org-id": orgId
      }
    })
      .then((response) => {
        if (!response.ok) throw new Error("failed to load organizations");
        return response.json() as Promise<Organization[]>;
      })
      .then((organizations) => {
        const selected = organizations.find((item) => item.id === orgId);
        if (selected) {
          setOrganization(selected);
        } else {
          setOrganization(getFallbackOrg());
        }
      })
      .catch(() => {
        setOrganization(getFallbackOrg());
      });
  }, []);

  const value = useMemo(() => ({ organization }), [organization]);

  return <OrganizationContext.Provider value={value}>{children}</OrganizationContext.Provider>;
}

export function useOrganization() {
  const context = useContext(OrganizationContext);
  if (!context) {
    throw new Error("useOrganization must be used within OrganizationProvider");
  }

  return context;
}
