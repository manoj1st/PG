import { HeroCarousel } from "../components/home/HeroCarousel";
import { ShopByCategoryGrid } from "../components/home/ShopByCategoryGrid";
import { TrustBadges } from "../components/home/TrustBadges";
import { SectionHeading } from "../components/common/SectionHeading";
import { ProductGrid } from "../components/product/ProductGrid";

export function HomePage() {
  return (
    <>
      <HeroCarousel />
      <ShopByCategoryGrid />
      <TrustBadges />
      <SectionHeading title="Best Sellers" subtitle="Most loved designs from our latest collection" />
      <ProductGrid />
    </>
  );
}
