import { useEffect } from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CartProvider, useCart } from "../store/CartContext";
import { CartPage } from "./CartPage";
import { products } from "../data/mockData";

function SeedCart() {
  const { addToCart } = useCart();

  useEffect(() => {
    addToCart(products[0]);
  }, [addToCart]);

  return null;
}

describe("Commerce flow", () => {
  it("shows product in cart when added", () => {
    render(
      <CartProvider>
        <MemoryRouter>
          <SeedCart />
          <CartPage />
        </MemoryRouter>
      </CartProvider>
    );

    expect(screen.getByText(/Your Cart/i)).toBeInTheDocument();
    expect(screen.getByText(/Royal Diamond Ring/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Proceed to Checkout/i })).toBeInTheDocument();
  });
});
