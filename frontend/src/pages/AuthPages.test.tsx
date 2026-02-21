import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SignupPage } from "./SignupPage";
import { LoginPage } from "./LoginPage";

describe("Auth pages", () => {
  it("renders signup fields and sign in cta", () => {
    render(
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: /Create your account/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mobile Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Email$/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Sign in/i })).toHaveAttribute("href", "/login");
  });

  it("supports signup otp verification for both mobile and email", async () => {
    render(
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: "Akhil User" } });
    fireEvent.change(screen.getByLabelText(/Mobile Number/i), { target: { value: "9999988888" } });
    fireEvent.change(screen.getByLabelText(/^Email$/i), { target: { value: "akhil@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: /Continue to OTP/i }));

    expect(await screen.findByRole("heading", { name: /Verify your account/i })).toBeInTheDocument();

    const otpInputs = await screen.findAllByLabelText(/Enter .* OTP/i);
    fireEvent.change(otpInputs[0], { target: { value: "123456" } });
    fireEvent.change(otpInputs[1], { target: { value: "123456" } });
    fireEvent.click(screen.getByRole("button", { name: /Verify OTP/i }));

    expect(await screen.findByText(/Account created and verified successfully/i)).toBeInTheDocument();
  });

  it("accepts login with email or mobile and verifies otp", async () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email or Mobile Number/i), { target: { value: "9999988888" } });
    fireEvent.click(screen.getByRole("button", { name: /Send OTP/i }));

    expect(await screen.findByRole("heading", { name: /Verify login OTP/i })).toBeInTheDocument();

    fireEvent.change(await screen.findByLabelText(/Enter mobile OTP/i), { target: { value: "123456" } });
    fireEvent.click(screen.getByRole("button", { name: /Verify OTP/i }));

    expect(await screen.findByText(/Login successful. OTP verified/i)).toBeInTheDocument();
  });
});
