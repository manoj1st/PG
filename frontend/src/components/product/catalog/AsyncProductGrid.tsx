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

  useEffect(() => {
    getProducts({ type, subtype }).then(setItems);
  }, [type, subtype]);

  return (
    <section className="container product-grid">
      {items.map((product) => (
        <ProductCard key={product.slug} {...product} />
      ))}
    </section>
  );
}
