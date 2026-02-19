import { Link } from "react-router-dom";
import { PriceDisplay } from "../common/PriceDisplay";

type ProductCardProps = { slug: string; title: string; price: number; compareAt?: number; image: string };

export function ProductCard({ slug, title, price, compareAt, image }: ProductCardProps) {
  return (
    <article className="card product-card">
      <img src={image} alt={title} loading="lazy" />
      <h3>{title}</h3>
      <PriceDisplay amount={price} compareAt={compareAt} />
      <Link to={`/product/${slug}`}>View details</Link>
    </article>
  );
}
