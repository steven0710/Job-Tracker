import { BACKEND_API, TOKEN_KEY } from "../constants";

export async function getJobs() {
  const res = await fetch(`${BACKEND_API}/jobs`);
  const data = await res.json();
  return data;
}

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user?: {
    id: string;
    email: string;
  };
};

export async function handleLogin(
  payload: LoginPayload,
): Promise<LoginResponse> {
  const res = await fetch(`${BACKEND_API}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // no Authorization header for login
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  console.log("LOGIN response status:", res.status);
  console.log("LOGIN response token:", data.token);
  if (data?.token) localStorage.setItem(TOKEN_KEY, data.token);
  //localStorage.getItem(TOKEN_KEY) should return the token we just set, but we can log it to confirm
  console.log(
    "Token in localStorage after login:",
    localStorage.getItem(TOKEN_KEY),
  );
  if (!res.ok) {
    throw new Error(`Login failed: ${res.status}`);
  }

  return data;
}

export async function verifyEmail(token: string): Promise<void> {
  const res = await fetch(
    `${BACKEND_API}/users/verify-email?token=${encodeURIComponent(token)}`,
  );
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message ?? `Email verification failed: ${res.status}`);
  }
}

export async function resendVerificationEmail(email: string): Promise<void> {
  const res = await fetch(`${BACKEND_API}/users/resend-verification-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(
      data.message ?? `Failed to resend verification email: ${res.status}`,
    );
  }
}

export async function requestPasswordReset(email: string): Promise<void> {
  const res = await fetch(`${BACKEND_API}/users/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message ?? `Request failed: ${res.status}`);
  }
}

export async function resetPassword(
  token: string,
  password: string,
): Promise<void> {
  console.log("Resetting password with token:", token);
  console.log("New password:", password);
  const res = await fetch(
    `${BACKEND_API}/users/reset-password?token=${encodeURIComponent(token)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    },
  );
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message ?? `Reset failed: ${res.status}`);
  }
}

export async function handleRegister(
  payload: LoginPayload,
): Promise<LoginResponse> {
  const res = await fetch(`${BACKEND_API}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // no Authorization header for register
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  console.log("REGISTER response status:", res.status);
  console.log("REGISTER response token:", data.token);
  console.log("REGISTER response message:", data.message, data.issues);
  if (data?.token) localStorage.setItem(TOKEN_KEY, data.token);
  //localStorage.getItem(TOKEN_KEY) should return the token we just set, but we can log it to confirm
  console.log(
    "Token in localStorage after register:",
    localStorage.getItem(TOKEN_KEY),
  );
  if (!res.ok) {
    throw new Error(`Register failed: ${res.status}`);
  }

  return data;
}
