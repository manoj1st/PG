import { Link } from "react-router-dom";
import { ProductTypeConfig } from "../../../data/mockData";

type ProductTypeTabsProps = {
  activeType?: string;
  types: ProductTypeConfig[];
};

export function ProductTypeTabs({ activeType, types }: ProductTypeTabsProps) {
  return (
    <div className="container type-tabs" role="tablist" aria-label="Product type tabs">
      <Link to="/shop" className={!activeType ? "active" : ""}>
        All
      </Link>
      {types.map((type) => (
        <Link key={type.type} to={`/shop/${type.type}`} className={activeType === type.type ? "active" : ""}>
          {type.label}
        </Link>
      ))}
    </div>
  );
}
