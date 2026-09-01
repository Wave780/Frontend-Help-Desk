import { getAccessToken } from "./auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001";

export interface UserPayload {
  id: string;
  email: string;
  name: string;
  isSuperAdmin: boolean;
  organizationId: string;
  roleId: string;
  createdAt: string;
}

interface SignUpPayload {
  organizationName: string;
  name: string;
  email: string;
  password: string;
  address?: string;
  logoUrl?: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
  user: UserPayload;
  organization: {
    id: string;
    name: string;
  };
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const rawMessage = errorData.message;
    const message = Array.isArray(rawMessage)
      ? rawMessage[0]
      : rawMessage ?? "Request failed";
    throw new Error(message);
  }

  return res.json();
}

export function signUp(payload: SignUpPayload): Promise<AuthResponse> {
  return request<AuthResponse>("/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function login(payload: LoginPayload): Promise<AuthResponse> {
  return request<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/** Fetch the current user's profile using the provided access token. */
export function getMe(accessToken: string): Promise<{ user: UserPayload }> {
  return request<{ user: UserPayload }>("/auth/me", {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

// ---- Admin / Super-admin endpoints ----

export interface AdminMetricsSummary {
  organizations: {
    total: number;
    active: number;
    suspended: number;
    trial: number;
  };
  users: {
    total: number;
    active: number;
  };
  customers: { total: number };
  complaints: {
    total: number;
    open: number;
    inProgress: number;
    resolved: number;
    closed: number;
  };
  integrations: { apiKeys: number; webhooks: number };
  plans: { total: number };
}

export interface OrganizationGrowthPoint {
  label: string;
  value: number;
}

export interface OrganizationGrowth {
  series: OrganizationGrowthPoint[];
  meta: {
    period: string;
    count: number;
    total: number;
  };
}

function adminRequest<T>(path: string): Promise<T> {
  const token = getAccessToken();
  return request<T>(path, {
    method: "GET",
    headers: { Authorization: `Bearer ${token ?? ""}` },
  });
}

export function getAdminMetricsSummary(): Promise<AdminMetricsSummary> {
  return adminRequest<AdminMetricsSummary>("/admin/metrics/summary");
}

export function getOrganizationGrowth(): Promise<OrganizationGrowth> {
  return adminRequest<OrganizationGrowth>("/admin/metrics/organization-growth");
}

// ---- Admin / User management ----

export type OrgStatus = "ACTIVE" | "TRIAL" | "SUSPENDED";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  isSuperAdmin: boolean;
  createdAt: string;
  organization: {
    id: string;
    name: string;
    status: OrgStatus;
  };
  role: {
    id: string;
    name: string;
  };
}

export interface AdminUserListResponse {
  data: AdminUser[];
  meta: { total: number };
}

export function getAdminUsers(): Promise<AdminUserListResponse> {
  return adminRequest<AdminUserListResponse>("/admin/users");
}