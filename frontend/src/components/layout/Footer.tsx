import { useOrganization } from "../../store/OrganizationContext";

export function Footer() {
  const { organization } = useOrganization();

  return (
    <footer className="footer">
      <div className="container">
        © {new Date().getFullYear()} {organization.name} · Hallmarked Gold · Certified Diamonds
      </div>
    </footer>
  );
}
