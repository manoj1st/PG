import { lazy, Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product, products } from "../data/mockData";
import { getProductBySlug } from "../services/productsApi";

const ProductGallery = lazy(() =>
  import("../components/product/ProductGallery").then((module) => ({ default: module.ProductGallery }))
);
const ProductInfoPanel = lazy(() =>
  import("../components/product/ProductInfoPanel").then((module) => ({ default: module.ProductInfoPanel }))
);

export function ProductDetailsPage() {
  const { slug = "" } = useParams();
  const [product, setProduct] = useState<Product>(products[0]);

  useEffect(() => {
    getProductBySlug(slug).then((item) => setProduct(item ?? products[0]));
  }, [slug]);

  return (
    <Suspense fallback={<p className="container section">Loading product details...</p>}>
      <section className="container section pdp-grid">
        <ProductGallery />
        <ProductInfoPanel product={product} />
      </section>
    </Suspense>
  );
}
