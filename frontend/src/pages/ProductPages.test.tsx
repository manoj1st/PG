import { render, screen } from "@testing-library/react";
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
    );

    expect(screen.getByText(/All Jewellery/i)).toBeInTheDocument();
    expect(screen.getAllByText(/View details/i).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("button", { name: /Add to cart/i }).length).toBeGreaterThan(0);
  });

  it("renders details information", () => {
    render(
      <CartProvider>
        <MemoryRouter initialEntries={["/product/royal-diamond-ring"]}>
          <Routes>
            <Route path="/product/:slug" element={<ProductDetailsPage />} />
          </Routes>
        </MemoryRouter>
      </CartProvider>
    );

    expect(screen.getByText(/Royal Diamond Ring/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Add to Cart/i })).toBeInTheDocument();
  });
});
