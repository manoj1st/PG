import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HomePage } from "./HomePage";
import { CartProvider } from "../store/CartContext";

describe("HomePage", () => {
  it("renders hero and best sellers", async () => {
    render(
      <CartProvider>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </CartProvider>
    );

    expect(await screen.findByText(/Festive Collection/i)).toBeInTheDocument();
    expect(await screen.findByText(/Best Sellers/i)).toBeInTheDocument();
    expect((await screen.findAllByRole("button", { name: /Add to cart/i })).length).toBeGreaterThan(0);
  });
});
