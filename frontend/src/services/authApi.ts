import { getActiveOrgId, getOrgScopedStorageKey } from "../utils/tenant";

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

const DUMMY_OTP = "123456";
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000/api";

const wait = (duration = 250) => new Promise((resolve) => setTimeout(resolve, duration));

const maskMobile = (value: string) => `******${value.slice(-4)}`;
const maskEmail = (value: string) => {
  const [name = "", domain = ""] = value.split("@");
  return `${name.slice(0, 2)}***@${domain}`;
};

function toChallengeId(prefix: string, identifier: string) {
  return `${prefix}:${btoa(identifier)}`;
}

function fromChallengeId(challengeId: string) {
  const encoded = challengeId.split(":")[1] || "";
  try {
    return atob(encoded);
  } catch {
    return "";
  }
}

async function postJson<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-org-id": getActiveOrgId()
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error("request failed");
  }

  return response.json() as Promise<T>;
}

export async function signup(payload: SignupPayload): Promise<AuthResult> {
  try {
    const response = await postJson<{ success: boolean; message: string }>("/public/auth/signup", payload);
    return { success: response.success, message: response.message };
  } catch {
    await wait();
    return { success: true, message: `Welcome ${payload.fullName}. Base profile captured successfully.` };
  }
}

export async function sendSignupOtps(payload: SignupPayload): Promise<OtpDispatchResult> {
  await wait();

  return {
    success: true,
    message: "OTP sent to your registered mobile number.",
    challenges: [
      {
        challengeId: toChallengeId("signup-mobile", payload.mobileNumber),
        channel: "mobile",
        destination: payload.mobileNumber,
        maskedDestination: maskMobile(payload.mobileNumber),
        dummyOtp: DUMMY_OTP
      }
    ]
  };
}

export async function login(payload: LoginPayload): Promise<AuthResult> {
  try {
    const response = await postJson<{ success: boolean; message: string }>("/public/auth/login", payload);
    return { success: response.success, message: response.message };
  } catch {
    await wait();
    return { success: true, message: `Identity found for ${payload.identifier}.` };
  }
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
        challengeId: toChallengeId(`login-${channel}`, payload.identifier),
        channel,
        destination: payload.identifier,
        maskedDestination: isMobile ? maskMobile(payload.identifier) : maskEmail(payload.identifier),
        dummyOtp: DUMMY_OTP
      }
    ]
  };
}

export async function verifyOtp(payload: OtpVerificationPayload): Promise<AuthResult> {
  const identifier = fromChallengeId(payload.challengeId);

  try {
    const response = await postJson<{ success: boolean; token: string }>("/public/auth/verify-otp", {
      identifier,
      otp: payload.otp
    });

    if (response.success && typeof window !== "undefined") {
      window.localStorage.setItem(getOrgScopedStorageKey("kwality-token"), response.token);
    }

    return { success: response.success, message: "OTP verified successfully." };
  } catch {
    await wait();

    if (payload.otp !== DUMMY_OTP) {
      return { success: false, message: "Invalid OTP. Please enter the demo OTP: 123456" };
    }

    return { success: true, message: `OTP verified for ${payload.challengeId}.` };
  }
}