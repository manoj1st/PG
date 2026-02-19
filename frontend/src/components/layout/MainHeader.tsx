import { Link } from "react-router-dom";

export function MainHeader() {
  return (
    <header className="header">
      <div className="container header-row">
        <Link className="brand" to="/">
          KWALITY JEWELLERS
        </Link>
        <nav className="nav" aria-label="Main">
          <Link to="/">Home</Link>
          <Link to="/shop">Jewellery</Link>
          <Link to="/product/royal-diamond-ring">Featured Product</Link>
        </nav>
      </div>
    </header>
  );
}
