import { categories } from "../../data/mockData";
import { Link } from "react-router-dom";

export function ShopByCategoryGrid() {
  return (
    <section className="container section">
      <h2>Shop by Category</h2>
      <div className="grid-3">
        {categories.map((category) => (
          <article key={category.name} className="card">
            <h3>{category.name}</h3>
            <p>{category.description}</p>
            <Link to="/shop">Browse</Link>
          </article>
        ))}
      </div>
    </section>
  );
}
