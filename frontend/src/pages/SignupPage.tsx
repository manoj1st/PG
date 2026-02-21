import { FormEvent, useState } from "react";
import { Button } from "../components/common/Button";
import { AuthShell } from "../components/common/AuthShell";
import { InputField } from "../components/common/InputField";
import { OtpVerificationForm } from "../components/common/OtpVerificationForm";
import { OtpChallenge, SignupPayload, sendSignupOtps, signup } from "../services/authApi";

const initialSignupData: SignupPayload = {
  fullName: "",
  mobileNumber: "",
  email: ""
};

export function SignupPage() {
  const [formData, setFormData] = useState<SignupPayload>(initialSignupData);
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpChallenges, setOtpChallenges] = useState<OtpChallenge[]>([]);
  const [isVerified, setIsVerified] = useState(false);

  const updateField = (key: keyof SignupPayload, value: string) => {
    setFormData((currentState) => ({ ...currentState, [key]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    const profileResponse = await signup(formData);
    const otpResponse = await sendSignupOtps(formData);

    setStatusMessage(`${profileResponse.message} ${otpResponse.message}`);
    setOtpChallenges(otpResponse.challenges);
    setIsSubmitting(false);
  };

  return (
    <AuthShell
      title="Create your account"
      description="Use your details to sign up. Then verify both mobile and email OTP before account activation."
      footerPrompt="Already have account?"
      footerCtaLabel="Sign in"
      footerCtaTo="/login"
    >
      {!otpChallenges.length ? (
        <form className="auth-form" onSubmit={handleSubmit}>
          <InputField
            id="signup-full-name"
            label="Full Name"
            placeholder="Enter full name"
            value={formData.fullName}
            onChange={(event) => updateField("fullName", event.target.value)}
            autoComplete="name"
            required
          />
          <InputField
            id="signup-mobile"
            label="Mobile Number"
            placeholder="10-digit mobile number"
            value={formData.mobileNumber}
            onChange={(event) => updateField("mobileNumber", event.target.value)}
            autoComplete="tel"
            pattern="[0-9]{10}"
            required
          />
          <InputField
            id="signup-email"
            label="Email"
            placeholder="you@example.com"
            type="email"
            value={formData.email}
            onChange={(event) => updateField("email", event.target.value)}
            autoComplete="email"
            required
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Continue to OTP"}
          </Button>
        </form>
      ) : (
        <OtpVerificationForm
          heading="Verify your account"
          description="Please verify both OTPs to complete signup."
          challenges={otpChallenges}
          onVerified={() => {
            setIsVerified(true);
            setStatusMessage("Account created and verified successfully.");
          }}
        />
      )}
      {statusMessage ? <p className="auth-status">{statusMessage}</p> : null}
      {isVerified ? <p className="auth-status">You can now login with email or mobile OTP.</p> : null}
    </AuthShell>
  );
}
