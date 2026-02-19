import { products } from "../../data/mockData";
import { ProductCard } from "./ProductCard";

export function ProductGrid() {
  return (
    <section className="container product-grid">
      {products.map((product) => (
        <ProductCard key={product.slug} {...product} />
      ))}
    </section>
  );
}
