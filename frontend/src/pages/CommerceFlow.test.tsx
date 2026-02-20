import { useEffect, useRef } from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CartProvider, useCart } from "../store/CartContext";
import { CartPage } from "./CartPage";
import { products } from "../data/mockData";

function SeedCart() {
  const { addToCart } = useCart();
  const hasSeededCart = useRef(false);

  useEffect(() => {
    if (hasSeededCart.current) {
      return;
    }

    addToCart(products[0]);
    hasSeededCart.current = true;
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
