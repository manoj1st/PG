import { FormEvent, useState } from "react";
import { Button } from "../components/common/Button";
import { AuthShell } from "../components/common/AuthShell";
import { InputField } from "../components/common/InputField";
import { OtpVerificationForm } from "../components/common/OtpVerificationForm";
import { LoginPayload, OtpChallenge, login, sendLoginOtp } from "../services/authApi";

const initialLoginData: LoginPayload = {
  identifier: ""
};

export function LoginPage() {
  const [formData, setFormData] = useState<LoginPayload>(initialLoginData);
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpChallenge, setOtpChallenge] = useState<OtpChallenge[]>([]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    const loginResponse = await login(formData);
    const otpResponse = await sendLoginOtp(formData);

    setStatusMessage(`${loginResponse.message} ${otpResponse.message}`);
    setOtpChallenge(otpResponse.challenges);
    setIsSubmitting(false);
  };

  return (
    <AuthShell
      title="Welcome back"
      description="Login using your registered email or mobile number, then verify OTP to continue."
      footerPrompt="New here?"
      footerCtaLabel="Create account"
      footerCtaTo="/signup"
    >
      {!otpChallenge.length ? (
        <form className="auth-form" onSubmit={handleSubmit}>
          <InputField
            id="login-identifier"
            label="Email or Mobile Number"
            placeholder="Email or 10-digit mobile"
            value={formData.identifier}
            onChange={(event) => setFormData({ identifier: event.target.value })}
            required
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending OTP..." : "Send OTP"}
          </Button>
        </form>
      ) : (
        <OtpVerificationForm
          heading="Verify login OTP"
          description="Enter the OTP sent to your selected login channel."
          challenges={otpChallenge}
          onVerified={() => {
            setStatusMessage("Login successful. OTP verified.");
          }}
        />
      )}
      {statusMessage ? <p className="auth-status">{statusMessage}</p> : null}
    </AuthShell>
  );
}
