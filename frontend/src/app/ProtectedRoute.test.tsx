import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../components/common/ProtectedRoute";
import { AuthProvider } from "../store/AuthContext";

describe("ProtectedRoute", () => {
  it("redirects unauthenticated users to login", () => {
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={["/cart"]}>
          <Routes>
            <Route path="/login" element={<p>Login Page</p>} />
            <Route element={<ProtectedRoute />}>
              <Route path="/cart" element={<p>Cart Page</p>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );

    expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
  });
});
