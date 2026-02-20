import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HomePage } from "./HomePage";
<<<<<<< codex/analyze-website-and-create-react-components-gb5mh5
import { CartProvider } from "../store/CartContext";
=======
>>>>>>> main

describe("HomePage", () => {
  it("renders hero and best sellers", () => {
    render(
<<<<<<< codex/analyze-website-and-create-react-components-gb5mh5
      <CartProvider>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </CartProvider>
=======
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
>>>>>>> main
    );

    expect(screen.getByText(/Festive Collection/i)).toBeInTheDocument();
    expect(screen.getByText(/Best Sellers/i)).toBeInTheDocument();
<<<<<<< codex/analyze-website-and-create-react-components-gb5mh5
    expect(screen.getAllByRole("button", { name: /Add to cart/i }).length).toBeGreaterThan(0);
=======
>>>>>>> main
  });
});
