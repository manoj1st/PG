import { trustPoints } from "../../data/mockData";

export function TrustBadges() {
  return (
    <section className="container section">
      <h2>Why Customers Trust Us</h2>
      <div className="grid-3">
        {trustPoints.map((point) => (
          <article key={point} className="card">
            <p>{point}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
