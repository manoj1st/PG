import { lazy, Suspense } from "react";

const HeroCarousel = lazy(() => import("../components/home/HeroCarousel").then((module) => ({ default: module.HeroCarousel })));
const ShopByCategoryGrid = lazy(() =>
  import("../components/home/ShopByCategoryGrid").then((module) => ({ default: module.ShopByCategoryGrid }))
);
const TrustBadges = lazy(() => import("../components/home/TrustBadges").then((module) => ({ default: module.TrustBadges })));
const SectionHeading = lazy(() =>
  import("../components/common/SectionHeading").then((module) => ({ default: module.SectionHeading }))
);
const ProductGrid = lazy(() => import("../components/product/ProductGrid").then((module) => ({ default: module.ProductGrid })));

export function HomePage() {
  return (
    <Suspense fallback={<p className="container section">Loading home content...</p>}>
      <HeroCarousel />
      <ShopByCategoryGrid />
      <TrustBadges />
      <SectionHeading title="Best Sellers" subtitle="Most loved designs from our latest collection" />
      <ProductGrid />
    </Suspense>
  );
}
