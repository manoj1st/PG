import { Button } from "../common/Button";
import { PriceDisplay } from "../common/PriceDisplay";

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
    </aside>
  );
}
