import { FormEvent, useState } from "react";
import { Button } from "../components/common/Button";
import { PriceDisplay } from "../components/common/PriceDisplay";
import { useCart } from "../store/CartContext";

export function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setPlaced(true);
    clearCart();
  };

  if (placed) {
    return (
      <section className="container section card">
        <h2>Order placed successfully</h2>
        <p>Thank you for shopping with us. You will receive confirmation details shortly.</p>
      </section>
    );
  }

  return (
    <section className="container section checkout-layout">
      <form className="card checkout-form" onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <label>
          Full Name
          <input required placeholder="Your full name" />
        </label>
        <label>
          Email
          <input required type="email" placeholder="you@example.com" />
        </label>
        <label>
          Shipping Address
          <textarea required placeholder="House no, street, city, state, pincode" />
        </label>
        <Button type="submit">Place Order</Button>
      </form>

      <aside className="card checkout-summary">
        <h3>Items ({items.length})</h3>
        {items.map((item) => (
          <p key={item.slug}>
            {item.title} × {item.quantity}
          </p>
        ))}
        <PriceDisplay amount={subtotal} />
      </aside>
    </section>
  );
}
