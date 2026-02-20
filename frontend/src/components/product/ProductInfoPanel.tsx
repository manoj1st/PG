import { Button } from "../common/Button";
import { PriceDisplay } from "../common/PriceDisplay";
<<<<<<< codex/analyze-website-and-create-react-components-gb5mh5
import { Product } from "../../data/mockData";
import { useCart } from "../../store/CartContext";

type ProductInfoPanelProps = { product: Product };

export function ProductInfoPanel({ product }: ProductInfoPanelProps) {
  const { addToCart } = useCart();

  return (
    <aside className="card">
      <p>{product.title}</p>
      <h2>{product.title} in 18K Gold</h2>
      <PriceDisplay amount={product.price} compareAt={product.compareAt} />
      <p>
        Certified craftsmanship, BIS hallmarked gold, insured delivery, and lifetime maintenance support for your
        jewellery.
      </p>
      <Button onClick={() => addToCart(product)}>Add to Cart</Button>
=======

export function ProductInfoPanel() {
  return (
    <aside className="card">
      <p>Diamond Ring</p>
      <h2>Royal Diamond Ring in 18K Gold</h2>
      <PriceDisplay amount={86500} compareAt={91500} />
      <p>
        Certified solitaire setting, BIS hallmarked gold, and insured delivery. Includes lifetime maintenance and
        easy exchange policy.
      </p>
      <Button>Add to Cart</Button>
>>>>>>> main
    </aside>
  );
}
