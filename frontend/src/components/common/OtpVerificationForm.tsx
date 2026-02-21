import { FormEvent, useState } from "react";
import { Button } from "./Button";
import { InputField } from "./InputField";
import { OtpChallenge, verifyOtp } from "../../services/authApi";

type OtpVerificationFormProps = {
  heading: string;
  description?: string;
  challenges: OtpChallenge[];
  onVerified: () => void;
};

export function OtpVerificationForm({ heading, description, challenges, onVerified }: OtpVerificationFormProps) {
  const [otpValues, setOtpValues] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const updateOtpValue = (challengeId: string, value: string) => {
    setOtpValues((current) => ({ ...current, [challengeId]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    const results = await Promise.all(
      challenges.map((challenge) => verifyOtp({ challengeId: challenge.challengeId, otp: otpValues[challenge.challengeId] || "" }))
    );

    const hasError = results.some((result) => !result.success);

    if (hasError) {
      const firstError = results.find((result) => !result.success);
      setStatusMessage(firstError?.message || "OTP verification failed.");
      setIsSubmitting(false);
      return;
    }

    setStatusMessage("OTP verification successful.");
    setIsSubmitting(false);
    onVerified();
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h3>{heading}</h3>
      {description ? <p>{description}</p> : null}

      {challenges.map((challenge) => (
        <InputField
          key={challenge.challengeId}
          id={`otp-${challenge.challengeId}`}
          label={`Enter ${challenge.channel} OTP`}
          placeholder={`Sent to ${challenge.maskedDestination}`}
          value={otpValues[challenge.challengeId] || ""}
          onChange={(event) => updateOtpValue(challenge.challengeId, event.target.value)}
          required
          pattern="[0-9]{6}"
          hint={`Demo OTP: ${challenge.dummyOtp}`}
        />
      ))}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Verifying OTP..." : "Verify OTP"}
      </Button>
      {statusMessage ? <p className="auth-status">{statusMessage}</p> : null}
    </form>
  );
}
