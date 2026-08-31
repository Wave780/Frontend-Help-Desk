"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { isSuperAdmin } from "@/lib/auth";

const emptySubscribe = () => () => {};

/**
 * RequireSuperAdmin
 * -------------------------------
 * Route guard that only renders `children` when the signed-in user is a
 * platform super-admin. Non-super-admins / unauthenticated visitors are
 * redirected to /signin.
 *
 * Usage:
 *   <RequireSuperAdmin>...super-admin-only ui...</RequireSuperAdmin>
 */
export default function RequireSuperAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  // Read the persisted session as external state (localStorage). The server
  // snapshot is always false so we never render protected content with stale
  // or unauthenticated markup.
  const authorized = useSyncExternalStore(
    emptySubscribe,
    () => (typeof window === "undefined" ? false : isSuperAdmin()),
    () => false,
  );

  useEffect(() => {
    if (!authorized) {
      router.replace("/signin");
    }
  }, [authorized, router]);

  if (!authorized) {
    // Blank loading state while we decide/redirect — no protected flash.
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F9FF]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#76553E] border-t-transparent" />
      </div>
    );
  }

  return <>{children}</>;
}