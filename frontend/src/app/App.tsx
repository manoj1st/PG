import { Outlet } from "react-router-dom";
import { AnnouncementBar } from "../components/layout/AnnouncementBar";
import { MainHeader } from "../components/layout/MainHeader";
import { Footer } from "../components/layout/Footer";

export function App() {
  return (
    <>
      <AnnouncementBar message="Hallmarked Gold | Certified Diamonds | Free Shipping Across India" />
      <MainHeader />
      <main className="layout-main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
