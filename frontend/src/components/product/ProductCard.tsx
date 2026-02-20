import { Link } from "react-router-dom";
import { PriceDisplay } from "../common/PriceDisplay";
<<<<<<< codex/analyze-website-and-create-react-components-gb5mh5
import { Button } from "../common/Button";
import { useCart } from "../../store/CartContext";
import { Product } from "../../data/mockData";

type ProductCardProps = Product;

export function ProductCard({ slug, title, price, compareAt, image }: ProductCardProps) {
  const { addToCart } = useCart();

=======

type ProductCardProps = { slug: string; title: string; price: number; compareAt?: number; image: string };

export function ProductCard({ slug, title, price, compareAt, image }: ProductCardProps) {
>>>>>>> main
  return (
    <article className="card product-card">
      <img src={image} alt={title} loading="lazy" />
      <h3>{title}</h3>
      <PriceDisplay amount={price} compareAt={compareAt} />
<<<<<<< codex/analyze-website-and-create-react-components-gb5mh5
      <div className="product-actions">
        <Button onClick={() => addToCart({ slug, title, price, compareAt, image })}>Add to cart</Button>
        <Link to={`/product/${slug}`}>View details</Link>
      </div>
=======
      <Link to={`/product/${slug}`}>View details</Link>
>>>>>>> main
    </article>
  );
}
