const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001";

interface SignUpPayload {
  organizationName: string;
  name: string;
  email: string;
  password: string;
  address?: string;
  logoUrl?: string;
}

interface SignUpResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
  user: {
    id: string;
    email: string;
    name: string;
    isSuperAdmin: boolean;
    organizationId: string;
    roleId: string;
    createdAt: string;
  };
  organization: {
    id: string;
    name: string;
  };
}

export async function signUp(payload: SignUpPayload): Promise<SignUpResponse> {
  const res = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const rawMessage = errorData.message;
    const message = Array.isArray(rawMessage)
      ? rawMessage[0]
      : rawMessage ?? "Signup failed";
    throw new Error(message);
  }

  return res.json();
}