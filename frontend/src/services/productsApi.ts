import {
  Product,
  ProductType,
  ProductTypeConfig,
  products as fallbackProducts,
  productTypeConfigs as fallbackTypes
} from "../data/mockData";

type ProductFilters = {
  type?: ProductType;
  subtype?: string;
};

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000/api";
const DEFAULT_ORG_ID = import.meta.env.VITE_ORG_ID ?? "kwality-jewellers";
const REQUEST_TIMEOUT_MS = 1200;

const productTypesCache = new Map<string, ProductTypeConfig[]>();
const productsCache = new Map<string, Product[]>();

function getActiveOrgId() {
  if (typeof window === "undefined") return DEFAULT_ORG_ID;
  const queryOrgId = new URLSearchParams(window.location.search).get("orgId");
  return queryOrgId || DEFAULT_ORG_ID;
}

function withQuery(path: string, filters: ProductFilters) {
  const params = new URLSearchParams();
  if (filters.type) params.set("type", filters.type);
  if (filters.subtype) params.set("subtype", filters.subtype);
  const query = params.toString();
  return query ? `${path}?${query}` : path;
}

function getFallbackProducts(filters: ProductFilters = {}) {
  return fallbackProducts.filter((product) => {
    if (filters.type && product.type !== filters.type) return false;
    if (filters.subtype && product.subtype !== filters.subtype) return false;
    return true;
  });
}

async function fetchJsonWithTimeout<T>(url: string): Promise<T> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "x-org-id": getActiveOrgId()
      }
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }

    return response.json();
  } finally {
    window.clearTimeout(timeoutId);
  }
}

export async function getProductTypes(): Promise<ProductTypeConfig[]> {
  const orgId = getActiveOrgId();
  const cached = productTypesCache.get(orgId);
  if (cached) return cached;

  try {
    const types = await fetchJsonWithTimeout<ProductTypeConfig[]>(`${API_BASE}/products/types`);
    productTypesCache.set(orgId, types);
    return types;
  } catch {
    productTypesCache.set(orgId, fallbackTypes);
    return fallbackTypes;
  }
}

export async function getProducts(filters: ProductFilters = {}): Promise<Product[]> {
  const orgId = getActiveOrgId();
  const cacheKey = `${orgId}:${filters.type ?? "all"}:${filters.subtype ?? "all"}`;
  const cached = productsCache.get(cacheKey);
  if (cached) return cached;

  try {
    const items = await fetchJsonWithTimeout<Product[]>(`${API_BASE}${withQuery("/products", filters)}`);
    productsCache.set(cacheKey, items);
    return items;
  } catch {
    const fallback = getFallbackProducts(filters);
    productsCache.set(cacheKey, fallback);
    return fallback;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    return await fetchJsonWithTimeout<Product>(`${API_BASE}/products/${slug}`);
  } catch {
    return fallbackProducts.find((item) => item.slug === slug) ?? null;
  }
}
