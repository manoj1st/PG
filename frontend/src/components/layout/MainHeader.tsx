import { Link } from "react-router-dom";
import { productTypeConfigs } from "../../data/mockData";
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

          {productTypeConfigs.map((typeConfig) => (
            <div key={typeConfig.type} className="nav-dropdown">
              <Link to={`/shop/${typeConfig.type}`} className="nav-dropdown-trigger">
                {typeConfig.label}
              </Link>
              <div className="nav-dropdown-menu" role="menu" aria-label={`${typeConfig.label} subtypes`}>
                {typeConfig.subtypes.map((subtype) => (
                  <Link
                    key={subtype}
                    to={`/shop/${typeConfig.type}?subtype=${encodeURIComponent(subtype)}`}
                    role="menuitem"
                  >
                    {subtype}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <Link to="/cart">Cart ({totalItems})</Link>
          <Link to="/checkout">Checkout</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign up</Link>
        </nav>
      </div>
    </header>
  );
}
