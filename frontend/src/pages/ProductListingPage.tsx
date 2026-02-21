import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SectionHeading } from "../components/common/SectionHeading";
import { AsyncProductGrid } from "../components/product/catalog/AsyncProductGrid";
import { ProductTypeTabs } from "../components/product/catalog/ProductTypeTabs";
import { SubtypeFilter } from "../components/product/catalog/SubtypeFilter";
import { ProductType, ProductTypeConfig } from "../data/mockData";
import { getProductTypes } from "../services/productsApi";

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
    <>
      <SectionHeading title={title} subtitle={subtitle} />
      <ProductTypeTabs activeType={type} types={types} />
      {selectedTypeConfig ? (
        <SubtypeFilter type={selectedTypeConfig.type} selectedSubtype={selectedSubtype} subtypes={selectedTypeConfig.subtypes} />
      ) : null}
      <AsyncProductGrid type={type} subtype={selectedSubtype} />
    </>
  );
}
