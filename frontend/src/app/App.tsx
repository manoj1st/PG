import { Outlet } from "react-router-dom";
import { AnnouncementBar } from "../components/layout/AnnouncementBar";
import { MainHeader } from "../components/layout/MainHeader";
import { Footer } from "../components/layout/Footer";
import { useOrganization } from "../store/OrganizationContext";

export function App() {
  const { organization } = useOrganization();

  return (
    <>
      <AnnouncementBar message={`${organization.name} · Hallmarked Gold | Certified Diamonds | Free Shipping Across India`} />
      <MainHeader />
      <main className="layout-main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
