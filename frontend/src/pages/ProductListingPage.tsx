import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductType, ProductTypeConfig } from "../data/mockData";
import { getProductTypes } from "../services/productsApi";

const SectionHeading = lazy(() =>
  import("../components/common/SectionHeading").then((module) => ({ default: module.SectionHeading }))
);
const ProductTypeTabs = lazy(() =>
  import("../components/product/catalog/ProductTypeTabs").then((module) => ({ default: module.ProductTypeTabs }))
);
const SubtypeFilter = lazy(() =>
  import("../components/product/catalog/SubtypeFilter").then((module) => ({ default: module.SubtypeFilter }))
);
const AsyncProductGrid = lazy(() =>
  import("../components/product/catalog/AsyncProductGrid").then((module) => ({ default: module.AsyncProductGrid }))
);

type ProductListingPageProps = {
  type?: ProductType;
};

export function ProductListingPage({ type }: ProductListingPageProps) {
  const [types, setTypes] = useState<ProductTypeConfig[]>([]);
  const [searchParams] = useSearchParams();
  const selectedSubtype = searchParams.get("subtype") ?? undefined;

  useEffect(() => {
    getProductTypes().then(setTypes);
  }, []);

  const selectedTypeConfig = useMemo(() => types.find((item) => item.type === type), [types, type]);
  const title = selectedTypeConfig ? `${selectedTypeConfig.label} Jewellery` : "All Jewellery";
  const subtitle = selectedTypeConfig
    ? `Explore ${selectedTypeConfig.subtypes.join(", ")} and more`
    : "Rings, earrings, necklaces and bridal statement sets";

  return (
    <Suspense fallback={<p className="container section">Loading products...</p>}>
      <SectionHeading title={title} subtitle={subtitle} />
      <ProductTypeTabs activeType={type} types={types} />
      {selectedTypeConfig ? (
        <SubtypeFilter type={selectedTypeConfig.type} selectedSubtype={selectedSubtype} subtypes={selectedTypeConfig.subtypes} />
      ) : null}
      <AsyncProductGrid type={type} subtype={selectedSubtype} />
    </Suspense>
  );
}
