import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { SignupPage } from "./SignupPage";
import { LoginPage } from "./LoginPage";
import { AuthProvider } from "../store/AuthContext";

describe("Auth pages", () => {
  it("renders signup fields and sign in cta", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <SignupPage />
        </MemoryRouter>
      </AuthProvider>
    );

    expect(screen.getByRole("heading", { name: /Create your account/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mobile Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email \(Optional\)/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Sign in/i })).toHaveAttribute("href", "/login");
  });

  it("supports signup otp verification for mobile", async () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <SignupPage />
        </MemoryRouter>
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: "Akhil User" } });
    fireEvent.change(screen.getByLabelText(/Mobile Number/i), { target: { value: "9999988888" } });
    fireEvent.click(screen.getByRole("button", { name: /Continue to OTP/i }));

    expect(await screen.findByRole("heading", { name: /Verify your mobile OTP/i })).toBeInTheDocument();

    fireEvent.change(await screen.findByLabelText(/Enter mobile OTP/i), { target: { value: "123456" } });
    fireEvent.click(screen.getByRole("button", { name: /Verify OTP/i }));

    expect(await screen.findByText(/Account created and mobile verified successfully/i)).toBeInTheDocument();
  });

  it("accepts login and redirects after otp verification", async () => {
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={["/login"]}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/shop/gold" element={<p>Gold gated page</p>} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/Email or Mobile Number/i), { target: { value: "9999988888" } });
    fireEvent.click(screen.getByRole("button", { name: /Send OTP/i }));

    expect(await screen.findByRole("heading", { name: /Verify login OTP/i })).toBeInTheDocument();

    fireEvent.change(await screen.findByLabelText(/Enter mobile OTP/i), { target: { value: "123456" } });
    fireEvent.click(screen.getByRole("button", { name: /Verify OTP/i }));

    expect(await screen.findByText(/Gold gated page/i)).toBeInTheDocument();
  });
});
