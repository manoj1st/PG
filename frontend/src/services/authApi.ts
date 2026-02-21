export type SignupPayload = {
  fullName: string;
  mobileNumber: string;
  email?: string;
};

export type LoginPayload = {
  identifier: string;
};

export type OtpChannel = "email" | "mobile";

export type OtpChallenge = {
  challengeId: string;
  channel: OtpChannel;
  destination: string;
  maskedDestination: string;
  dummyOtp: string;
};

export type OtpVerificationPayload = {
  challengeId: string;
  otp: string;
};

type AuthResult = {
  success: boolean;
  message: string;
};

type OtpDispatchResult = {
  success: boolean;
  message: string;
  challenges: OtpChallenge[];
};

const wait = (duration = 400) => new Promise((resolve) => setTimeout(resolve, duration));

const DUMMY_OTP = "123456";

const maskMobile = (value: string) => `******${value.slice(-4)}`;
const maskEmail = (value: string) => {
  const [name = "", domain = ""] = value.split("@");
  return `${name.slice(0, 2)}***@${domain}`;
};

export async function signup(payload: SignupPayload): Promise<AuthResult> {
  await wait();

  return {
    success: true,
    message: `Welcome ${payload.fullName}. Base profile captured successfully.`
  };
}

export async function sendSignupOtps(payload: SignupPayload): Promise<OtpDispatchResult> {
  await wait();

  return {
    success: true,
    message: "OTP sent to your registered mobile number.",
    challenges: [
      {
        challengeId: `signup-mobile-${payload.mobileNumber}`,
        channel: "mobile",
        destination: payload.mobileNumber,
        maskedDestination: maskMobile(payload.mobileNumber),
        dummyOtp: DUMMY_OTP
      }
    ]
  };
}

export async function login(payload: LoginPayload): Promise<AuthResult> {
  await wait();

  return {
    success: true,
    message: `Identity found for ${payload.identifier}.`
  };
}

export async function sendLoginOtp(payload: LoginPayload): Promise<OtpDispatchResult> {
  await wait();

  const isMobile = /^\d{10}$/.test(payload.identifier);
  const channel: OtpChannel = isMobile ? "mobile" : "email";

  return {
    success: true,
    message: `OTP sent to your ${channel}.`,
    challenges: [
      {
        challengeId: `login-${channel}-${payload.identifier}`,
        channel,
        destination: payload.identifier,
        maskedDestination: isMobile ? maskMobile(payload.identifier) : maskEmail(payload.identifier),
        dummyOtp: DUMMY_OTP
      }
    ]
  };
}

export async function verifyOtp(payload: OtpVerificationPayload): Promise<AuthResult> {
  await wait();

  if (payload.otp !== DUMMY_OTP) {
    return {
      success: false,
      message: "Invalid OTP. Please enter the demo OTP: 123456"
    };
  }

  return {
    success: true,
    message: `OTP verified for ${payload.challengeId}.`
  };
}
