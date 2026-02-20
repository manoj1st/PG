import { useEffect, useState } from "react";
import { Product, ProductType } from "../../../data/mockData";
import { getProducts } from "../../../services/productsApi";
import { ProductCard } from "../ProductCard";

type AsyncProductGridProps = {
  type?: ProductType;
  subtype?: string;
};

export function AsyncProductGrid({ type, subtype }: AsyncProductGridProps) {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProducts({ type, subtype })
      .then(setItems)
      .finally(() => setLoading(false));
  }, [type, subtype]);

  if (loading && items.length === 0) {
    return <p className="container section">Loading products...</p>;
  }

  return (
    <section className="container product-grid">
      {items.map((product) => (
        <ProductCard key={product.slug} {...product} />
      ))}
    </section>
  );
}
