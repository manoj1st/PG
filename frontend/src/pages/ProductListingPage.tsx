import { lazy, Suspense } from "react";

const SectionHeading = lazy(() =>
  import("../components/common/SectionHeading").then((module) => ({ default: module.SectionHeading }))
);
const ProductGrid = lazy(() => import("../components/product/ProductGrid").then((module) => ({ default: module.ProductGrid })));

export function ProductListingPage() {
  return (
    <Suspense fallback={<p className="container section">Loading products...</p>}>
      <SectionHeading title="All Jewellery" subtitle="Rings, earrings, necklaces and bridal statement sets" />
      <ProductGrid />
    </Suspense>
  );
}
