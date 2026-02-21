import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import { getOrgScopedStorageKey } from "../utils/tenant";

type AuthContextValue = {
  isAuthenticated: boolean;
  login: (identifier: string) => void;
  logout: () => void;
  identifier: string;
};

const STORAGE_KEY_BASE = "kwality-auth";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function getStorageKey() {
  return getOrgScopedStorageKey(STORAGE_KEY_BASE);
}

function getInitialAuthState() {
  if (typeof window === "undefined") {
    return { isAuthenticated: false, identifier: "" };
  }

  const storedValue = window.localStorage.getItem(getStorageKey());
  if (!storedValue) {
    return { isAuthenticated: false, identifier: "" };
  }

  return { isAuthenticated: true, identifier: storedValue };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const initialState = getInitialAuthState();
  const [isAuthenticated, setIsAuthenticated] = useState(initialState.isAuthenticated);
  const [identifier, setIdentifier] = useState(initialState.identifier);

  const login = (identifierValue: string) => {
    setIsAuthenticated(true);
    setIdentifier(identifierValue);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(getStorageKey(), identifierValue);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIdentifier("");
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(getStorageKey());
    }
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
      identifier
    }),
    [isAuthenticated, identifier]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
