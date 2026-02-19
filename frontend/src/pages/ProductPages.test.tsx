import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ProductListingPage } from "./ProductListingPage";
import { ProductDetailsPage } from "./ProductDetailsPage";

describe("Product pages", () => {
  it("renders listing grid", () => {
    render(
      <MemoryRouter>
        <ProductListingPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/All Jewellery/i)).toBeInTheDocument();
    expect(screen.getAllByText(/View details/i).length).toBeGreaterThan(0);
  });

  it("renders details information", () => {
    render(
      <MemoryRouter>
        <ProductDetailsPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Royal Diamond Ring/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Add to Cart/i })).toBeInTheDocument();
  });
});
