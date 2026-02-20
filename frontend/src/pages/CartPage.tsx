import { Link } from "react-router-dom";
import { PriceDisplay } from "../components/common/PriceDisplay";
import { Button } from "../components/common/Button";
import { useCart } from "../store/CartContext";

export function CartPage() {
  const { items, subtotal, removeFromCart } = useCart();

  return (
    <section className="container section">
      <h2>Your Cart</h2>
      {items.length === 0 ? (
        <div className="card">
          <p>Your cart is empty.</p>
          <Link to="/shop">Continue shopping</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-list">
            {items.map((item) => (
              <article key={item.slug} className="card cart-item">
                <img src={item.image} alt={item.title} />
                <div>
                  <h3>{item.title}</h3>
                  <p>Qty: {item.quantity}</p>
                  <PriceDisplay amount={item.price * item.quantity} />
                </div>
                <Button variant="ghost" onClick={() => removeFromCart(item.slug)}>
                  Remove
                </Button>
              </article>
            ))}
          </div>
          <aside className="card cart-summary">
            <h3>Order Summary</h3>
            <PriceDisplay amount={subtotal} />
            <Link to="/checkout">
              <Button>Proceed to Checkout</Button>
            </Link>
          </aside>
        </div>
      )}
    </section>
  );
}
