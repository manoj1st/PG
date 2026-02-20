import { useParams } from "react-router-dom";
import { ProductGallery } from "../components/product/ProductGallery";
import { ProductInfoPanel } from "../components/product/ProductInfoPanel";
import { products } from "../data/mockData";

export function ProductDetailsPage() {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug) ?? products[0];

  return (
    <section className="container section pdp-grid">
      <ProductGallery />
      <ProductInfoPanel product={product} />
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
