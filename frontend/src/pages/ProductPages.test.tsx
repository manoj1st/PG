import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ProductListingPage } from "./ProductListingPage";
import { ProductDetailsPage } from "./ProductDetailsPage";
import { CartProvider } from "../store/CartContext";

describe("Product pages", () => {
  it("renders listing grid with add-to-cart buttons", async () => {
    render(
      <CartProvider>
        <MemoryRouter>
          <ProductListingPage />
        </MemoryRouter>
      </CartProvider>
    );

    expect(await screen.findByText(/All Jewellery/i)).toBeInTheDocument();
    expect((await screen.findAllByText(/View details/i)).length).toBeGreaterThan(0);
    expect((await screen.findAllByRole("button", { name: /Add to cart/i })).length).toBeGreaterThan(0);
  });

  it("renders details information", async () => {
    render(
      <CartProvider>
        <MemoryRouter initialEntries={["/product/royal-diamond-ring"]}>
          <Routes>
            <Route path="/product/:slug" element={<ProductDetailsPage />} />
          </Routes>
        </MemoryRouter>
      </CartProvider>
    );

    expect(await screen.findByRole("heading", { name: /Royal Diamond Ring in 18K Gold/i })).toBeInTheDocument();
    expect(await screen.findByRole("button", { name: /Add to Cart/i })).toBeInTheDocument();
  });
});
