// Client-side session helpers.
// The backend issues JWT access/refresh tokens (see backend/src/auth).
// We store the access token + the authenticated user (including isSuperAdmin)
// so routes can enforce authorization (e.g. super-admin-only dashboards).

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  isSuperAdmin: boolean;
  organizationId: string;
  roleId: string;
  createdAt: string;
}

export interface Session {
  accessToken: string;
  refreshToken?: string;
  user: AuthUser;
}

const ACCESS_TOKEN_KEY = "hdp.accessToken";
const REFRESH_TOKEN_KEY = "hdp.refreshToken";
const USER_KEY = "hdp.user";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

/** Persist a successful auth response (from /auth/login or /auth/signup). */
export function saveSession(session: Session): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(ACCESS_TOKEN_KEY, session.accessToken);
  if (session.refreshToken) {
    window.localStorage.setItem(REFRESH_TOKEN_KEY, session.refreshToken);
  }
  window.localStorage.setItem(USER_KEY, JSON.stringify(session.user));
}

/** Remove any persisted session (logout). */
export function clearSession(): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);
}

/** Read the current access token, if any. */
export function getAccessToken(): string | null {
  if (!isBrowser()) return null;
  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
}

/** Read the persisted authenticated user, if any. */
export function getAuthUser(): AuthUser | null {
  if (!isBrowser()) return null;
  const raw = window.localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

/** True only when there is a signed-in user who is a platform super admin. */
export function isSuperAdmin(): boolean {
  return getAuthUser()?.isSuperAdmin === true;
}