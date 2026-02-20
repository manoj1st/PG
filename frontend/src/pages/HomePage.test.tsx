import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HomePage } from "./HomePage";
import { CartProvider } from "../store/CartContext";

describe("HomePage", () => {
  it("renders hero and best sellers", () => {
    render(
      <CartProvider>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </CartProvider>
    );

    expect(screen.getByText(/Festive Collection/i)).toBeInTheDocument();
    expect(screen.getByText(/Best Sellers/i)).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /Add to cart/i }).length).toBeGreaterThan(0);
  });
});
