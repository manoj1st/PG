import { ProductGallery } from "../components/product/ProductGallery";
import { ProductInfoPanel } from "../components/product/ProductInfoPanel";

export function ProductDetailsPage() {
  return (
    <section className="container section pdp-grid">
      <ProductGallery />
      <ProductInfoPanel />
    </section>
  );
}
