import { Link } from "react-router-dom";
import { PriceDisplay } from "../common/PriceDisplay";
import { Button } from "../common/Button";
import { useCart } from "../../store/CartContext";
import { Product } from "../../data/mockData";

type ProductCardProps = Product;

export function ProductCard({ slug, title, price, compareAt, image }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <article className="card product-card">
      <img src={image} alt={title} loading="lazy" />
      <h3>{title}</h3>
      <PriceDisplay amount={price} compareAt={compareAt} />
      <div className="product-actions">
        <Button onClick={() => addToCart({ slug, title, price, compareAt, image })}>Add to cart</Button>
        <Link to={`/product/${slug}`}>View details</Link>
      </div>
    </article>
  );
}
