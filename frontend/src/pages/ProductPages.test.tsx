import { render, screen } from "@testing-library/react";
<<<<<<< codex/analyze-website-and-create-react-components-gb5mh5
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ProductListingPage } from "./ProductListingPage";
import { ProductDetailsPage } from "./ProductDetailsPage";
import { CartProvider } from "../store/CartContext";

describe("Product pages", () => {
  it("renders listing grid with add-to-cart buttons", () => {
    render(
      <CartProvider>
        <MemoryRouter>
          <ProductListingPage />
        </MemoryRouter>
      </CartProvider>
=======
import { MemoryRouter } from "react-router-dom";
import { ProductListingPage } from "./ProductListingPage";
import { ProductDetailsPage } from "./ProductDetailsPage";

describe("Product pages", () => {
  it("renders listing grid", () => {
    render(
      <MemoryRouter>
        <ProductListingPage />
      </MemoryRouter>
>>>>>>> main
    );

    expect(screen.getByText(/All Jewellery/i)).toBeInTheDocument();
    expect(screen.getAllByText(/View details/i).length).toBeGreaterThan(0);
<<<<<<< codex/analyze-website-and-create-react-components-gb5mh5
    expect(screen.getAllByRole("button", { name: /Add to cart/i }).length).toBeGreaterThan(0);
=======
>>>>>>> main
  });

  it("renders details information", () => {
    render(
<<<<<<< codex/analyze-website-and-create-react-components-gb5mh5
      <CartProvider>
        <MemoryRouter initialEntries={["/product/royal-diamond-ring"]}>
          <Routes>
            <Route path="/product/:slug" element={<ProductDetailsPage />} />
          </Routes>
        </MemoryRouter>
      </CartProvider>
=======
      <MemoryRouter>
        <ProductDetailsPage />
      </MemoryRouter>
>>>>>>> main
    );

    expect(screen.getByText(/Royal Diamond Ring/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Add to Cart/i })).toBeInTheDocument();
  });
});
