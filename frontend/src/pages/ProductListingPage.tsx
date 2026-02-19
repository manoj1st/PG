import { SectionHeading } from "../components/common/SectionHeading";
import { ProductGrid } from "../components/product/ProductGrid";

export function ProductListingPage() {
  return (
    <>
      <SectionHeading title="All Jewellery" subtitle="Rings, earrings, necklaces and bridal statement sets" />
      <ProductGrid />
    </>
  );
}
