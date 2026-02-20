import { Link } from "react-router-dom";

type SubtypeFilterProps = {
  type: string;
  selectedSubtype?: string;
  subtypes: string[];
};

export function SubtypeFilter({ type, selectedSubtype, subtypes }: SubtypeFilterProps) {
  return (
    <div className="container subtype-filter" aria-label="Subtype filter">
      <Link to={`/shop/${type}`} className={!selectedSubtype ? "active" : ""}>
        All {type}
      </Link>
      {subtypes.map((subtype) => {
        const encodedSubtype = encodeURIComponent(subtype);
        const isActive = selectedSubtype === subtype;
        return (
          <Link key={subtype} to={`/shop/${type}?subtype=${encodedSubtype}`} className={isActive ? "active" : ""}>
            {subtype}
          </Link>
        );
      })}
    </div>
  );
}
