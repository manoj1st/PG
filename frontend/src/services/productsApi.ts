import { Product, ProductType, ProductTypeConfig, products as fallbackProducts, productTypeConfigs as fallbackTypes } from "../data/mockData";

type ProductFilters = {
  type?: ProductType;
  subtype?: string;
};

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000/api";

function withQuery(path: string, filters: ProductFilters) {
  const params = new URLSearchParams();
  if (filters.type) params.set("type", filters.type);
  if (filters.subtype) params.set("subtype", filters.subtype);
  const query = params.toString();
  return query ? `${path}?${query}` : path;
}

export async function getProductTypes(): Promise<ProductTypeConfig[]> {
  try {
    const response = await fetch(`${API_BASE}/products/types`);
    if (!response.ok) throw new Error("Failed to fetch product types");
    return response.json();
  } catch {
    return fallbackTypes;
  }
}

export async function getProducts(filters: ProductFilters = {}): Promise<Product[]> {
  try {
    const response = await fetch(`${API_BASE}${withQuery("/products", filters)}`);
    if (!response.ok) throw new Error("Failed to fetch products");
    return response.json();
  } catch {
    return fallbackProducts.filter((product) => {
      if (filters.type && product.type !== filters.type) return false;
      if (filters.subtype && product.subtype !== filters.subtype) return false;
      return true;
    });
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const response = await fetch(`${API_BASE}/products/${slug}`);
    if (!response.ok) throw new Error("Failed to fetch product");
    return response.json();
  } catch {
    return fallbackProducts.find((item) => item.slug === slug) ?? null;
  }
}
