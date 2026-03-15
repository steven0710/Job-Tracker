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

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const res = await fetch(`${BACKEND_API}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // no Authorization header for login
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  console.log("LOGIN response status:", res.status);
  console.log("LOGIN response json:", data);
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
