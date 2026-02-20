import { lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/mockData";

const ProductGallery = lazy(() =>
  import("../components/product/ProductGallery").then((module) => ({ default: module.ProductGallery }))
);
const ProductInfoPanel = lazy(() =>
  import("../components/product/ProductInfoPanel").then((module) => ({ default: module.ProductInfoPanel }))
);

export function ProductDetailsPage() {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug) ?? products[0];

  return (
    <Suspense fallback={<p className="container section">Loading product details...</p>}>
      <section className="container section pdp-grid">
        <ProductGallery />
        <ProductInfoPanel product={product} />
      </section>
    </Suspense>
  );
}
