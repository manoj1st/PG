import { Link } from "react-router-dom";
import { Product } from "../../data/mockData";
import { Button } from "../common/Button";
import { PriceDisplay } from "../common/PriceDisplay";
import { useCart } from "../../store/CartContext";

type ProductCardProps = Product;

export function ProductCard({ slug, title, price, compareAt, image, type, subtype }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <article className="card product-card">
      <img src={image} alt={title} loading="lazy" />
      <h3>{title}</h3>
      <p className="product-meta">{`${type.toUpperCase()} • ${subtype}`}</p>
      <PriceDisplay amount={price} compareAt={compareAt} />
      <div className="product-actions">
        <Button onClick={() => addToCart({ slug, title, price, compareAt, image })}>Add to cart</Button>
        <Link to={`/product/${slug}`}>View details</Link>
      </div>
    </article>
  );
}
