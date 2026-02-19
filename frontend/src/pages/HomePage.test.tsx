import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HomePage } from "./HomePage";

describe("HomePage", () => {
  it("renders hero and best sellers", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Festive Collection/i)).toBeInTheDocument();
    expect(screen.getByText(/Best Sellers/i)).toBeInTheDocument();
  });
});
