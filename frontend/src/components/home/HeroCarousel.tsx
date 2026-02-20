import { Button } from "../common/Button";
import { Link } from "react-router-dom";

export function HeroCarousel() {
  return (
    <section className="container hero">
      <div className="hero-card">
        <p>Festive Collection 2026</p>
        <h2>Bridal Gold & Diamond Jewellery Crafted for Timeless Celebrations</h2>
        <p>Explore handcrafted rings, necklaces and earrings inspired by heritage silhouettes.</p>
        <Link to="/shop">
          <Button>Shop Collection</Button>
        </Link>
      </div>
      <div className="hero-image">Campaign Visual</div>
    </section>
  );
}
