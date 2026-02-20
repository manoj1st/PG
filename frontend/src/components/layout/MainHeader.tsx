import { Link } from "react-router-dom";
import { useCart } from "../../store/CartContext";

export function MainHeader() {
  const { totalItems } = useCart();

  return (
    <header className="header">
      <div className="container header-row">
        <Link className="brand" to="/">
          KWALITY JEWELLERS
        </Link>
        <nav className="nav" aria-label="Main">
          <Link to="/">Home</Link>
          <Link to="/shop">Jewellery</Link>
          <Link to="/shop/gold">Gold</Link>
          <Link to="/shop/silver">Silver</Link>
          <Link to="/shop/diamond">Diamond</Link>
          <Link to="/cart">Cart ({totalItems})</Link>
          <Link to="/checkout">Checkout</Link>
        </nav>
      </div>
    </header>
  );
}
