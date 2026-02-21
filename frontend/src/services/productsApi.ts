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
const REQUEST_TIMEOUT_MS = 450;

let productTypesCache: ProductTypeConfig[] | null = null;
const productsCache = new Map<string, Product[]>();

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
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error("Request failed");
    return response.json();
  } finally {
    window.clearTimeout(timeoutId);
  }
}

export async function getProductTypes(): Promise<ProductTypeConfig[]> {
  if (productTypesCache) return productTypesCache;

  try {
    const types = await fetchJsonWithTimeout<ProductTypeConfig[]>(`${API_BASE}/products/types`);
    productTypesCache = types;
    return types;
  } catch {
    productTypesCache = fallbackTypes;
    return fallbackTypes;
  }
}

export async function getProducts(filters: ProductFilters = {}): Promise<Product[]> {
  const cacheKey = `${filters.type ?? "all"}:${filters.subtype ?? "all"}`;
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
