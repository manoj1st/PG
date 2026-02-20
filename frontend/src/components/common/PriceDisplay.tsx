type PriceDisplayProps = { amount: number; compareAt?: number; currency?: string };

export function PriceDisplay({ amount, compareAt, currency = "INR" }: PriceDisplayProps) {
  return (
    <div className="price">
      <strong>{new Intl.NumberFormat("en-IN", { style: "currency", currency }).format(amount)}</strong>
      {compareAt ? <s>{new Intl.NumberFormat("en-IN", { style: "currency", currency }).format(compareAt)}</s> : null}
    </div>
  );
}
