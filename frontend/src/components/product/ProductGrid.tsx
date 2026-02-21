import { useEffect, useState } from "react";
import { Product } from "../../data/mockData";
import { getProducts } from "../../services/productsApi";
import { ProductCard } from "./ProductCard";

export function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts).catch(() => setProducts([]));
  }, []);

  return (
    <section className="container product-grid">
      {products.map((product) => (
        <ProductCard key={product.slug} {...product} />
      ))}
    </section>
  );
}
