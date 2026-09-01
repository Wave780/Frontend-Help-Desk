"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  getAdminUsers,
  AdminUser,
  AdminUserListResponse,
  OrgStatus,
} from "@/lib/api";

// ---- Icon set (Feather/Lucide style, matching the Figma design) ----

function Svg({
  size,
  viewBox,
  children,
}: {
  size: number | string;
  viewBox: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
}

const UsersIcon = ({ size = 18 }: { size?: number }) => (
  <Svg size={size} viewBox="0 0 24 24">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </Svg>
);

const SearchIcon = ({ size = 18 }: { size?: number }) => (
  <Svg size={size} viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </Svg>
);

const SlidersIcon = ({ size = 13.5 }: { size?: number }) => (
  <Svg size={size} viewBox="0 0 24 24">
    <line x1="4" x2="4" y1="21" y2="14" />
    <line x1="4" x2="4" y1="10" y2="3" />
    <line x1="12" x2="12" y1="21" y2="12" />
    <line x1="12" x2="12" y1="8" y2="3" />
    <line x1="20" x2="20" y1="21" y2="16" />
    <line x1="20" x2="20" y1="12" y2="3" />
    <line x1="2" x2="6" y1="14" y2="14" />
    <line x1="10" x2="14" y1="8" y2="8" />
    <line x1="18" x2="22" y1="16" y2="16" />
  </Svg>
);

const DownloadIcon = ({ size = 12 }: { size?: number }) => (
  <Svg size={size} viewBox="0 0 24 24">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </Svg>
);

const PlusIcon = ({ size = 10.5 }: { size?: number }) => (
  <Svg size={size} viewBox="0 0 24 24">
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </Svg>
);
const ChevronLeftIcon = ({ size = 18 }: { size?: number }) => (
  <Svg size={size} viewBox="0 0 24 24">
    <path d="m15 18-6-6 6-6" />
  </Svg>
);

const ChevronRightIcon = ({ size = 18 }: { size?: number }) => (
  <Svg size={size} viewBox="0 0 24 24">
    <path d="m9 18 6-6-6-6" />
  </Svg>
);

const MoreVerticalIcon = ({ size = 18 }: { size?: number }) => (
  <Svg size={size} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="19" r="1" />
  </Svg>
);

// ---- Helpers ----

/** Deterministic muted avatar palette, keyed by a stable string. */
const AVATAR_COLORS: { bg: string; fg: string }[] = [
  { bg: "#DEE9FC", fg: "#2F5B94" },
  { bg: "#FCE0D6", fg: "#A2543C" },
  { bg: "#E3F4E8", fg: "#3E7A55" },
  { bg: "#F6E7D2", fg: "#9A6B2F" },
  { bg: "#E8E2F6", fg: "#5E4B95" },
  { bg: "#D9F1F2", fg: "#2F6E72" },
];

function stableHash(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function Avatar({ name, seed }: { name: string; seed: string }) {
  const palette = AVATAR_COLORS[stableHash(seed) % AVATAR_COLORS.length];
  return (
    <span
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold leading-4"
      style={{ backgroundColor: palette.bg, color: palette.fg }}
    >
      {initials(name)}
    </span>
  );
}

const STATUS_STYLES: Record<
  OrgStatus,
  { classes: string; dot: string; label: string }
> = {
  ACTIVE: {
    classes: "border-green-600/25 bg-green-50 text-green-700",
    dot: "bg-green-600",
    label: "Active",
  },
  TRIAL: {
    classes: "border-amber-600/25 bg-amber-50 text-amber-700",
    dot: "bg-amber-500",
    label: "Trial",
  },
  SUSPENDED: {
    classes: "border-[#BA1A1A]/20 bg-[#FFDAD6] text-[#BA1A1A]",
    dot: "bg-[#BA1A1A]",
    label: "Suspended",
  },
};

function StatusBadge({ status }: { status: OrgStatus }) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.ACTIVE;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium leading-4 ${style.classes}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      {style.label}
    </span>
  );
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function timeAgo(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const diffMs = Date.now() - date.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  return "";
}

const PAGE_SIZE = 8;
// ---- Table ----

function SkeletonRows() {
  return (
    <>
      {Array.from({ length: PAGE_SIZE }).map((_, i) => (
        <tr key={i} className="animate-pulse border-b border-[#D4C3BA]/20">
          <td className="px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-[#D4C3BA]/40" />
              <div className="flex flex-col gap-1.5">
                <div className="h-3 w-40 rounded bg-[#D4C3BA]/40" />
                <div className="h-2.5 w-52 rounded bg-[#D4C3BA]/30" />
              </div>
            </div>
          </td>
          <td className="px-6 py-4">
            <div className="h-6 w-16 rounded-md bg-[#D4C3BA]/30" />
          </td>
          <td className="px-6 py-4">
            <div className="h-3 w-32 rounded bg-[#D4C3BA]/40" />
          </td>
          <td className="px-6 py-4">
            <div className="h-5 w-20 rounded-full bg-[#D4C3BA]/30" />
          </td>
          <td className="px-6 py-4">
            <div className="h-3 w-28 rounded bg-[#D4C3BA]/40" />
          </td>
          <td className="px-4 py-4 text-right">
            <div className="ml-auto h-6 w-6 rounded bg-[#D4C3BA]/30" />
          </td>
        </tr>
      ))}
    </>
  );
}

function UserRow({ user }: { user: AdminUser }) {
  return (
    <tr className="border-b border-[#D4C3BA]/20 transition-colors last:border-0 hover:bg-[#F8F9FF]/70">
      {/* User */}
      <td className="px-6 py-3.5">
        <div className="flex items-center gap-3">
          <Avatar name={user.name} seed={user.organization?.id ?? user.id} />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="truncate text-sm font-medium leading-5 text-[#121C2A]">
                {user.name}
              </span>
              {user.isSuperAdmin && (
                <span className="flex h-4 shrink-0 items-center rounded border border-[#916D54]/30 bg-[#916D54]/10 px-1.5 text-[10px] font-semibold uppercase leading-3 tracking-[0.05em] text-[#916D54]">
                  Admin
                </span>
              )}
            </div>
            <span className="truncate text-[13px] leading-[18px] text-[#50453E]">
              {user.email}
            </span>
          </div>
        </div>
      </td>
      {/* Role */}
      <td className="px-6 py-3.5">
        <span className="inline-flex items-center rounded border border-[#D4C3BA]/30 bg-[#DEE9FC] px-2 py-0.5 text-xs font-medium leading-4 text-[#121C2A]">
          {user.role?.name ?? "Member"}
        </span>
      </td>
      {/* Organization */}
      <td className="px-6 py-3.5">
        <span className="text-sm leading-5 text-[#121C2A]">
          {user.organization?.name ?? "—"}
        </span>
      </td>
      {/* Status */}
      <td className="px-6 py-3.5">
        <StatusBadge status={user.organization?.status ?? "ACTIVE"} />
      </td>
      {/* Joined */}
      <td className="px-6 py-3.5">
        <span className="text-sm leading-5 text-[#121C2A]">
          {formatDate(user.createdAt)}
        </span>
        {timeAgo(user.createdAt) && (
          <span className="ml-1.5 text-xs leading-4 text-[#50453E]/60">
            ({timeAgo(user.createdAt)})
          </span>
        )}
      </td>
      {/* Actions */}
      <td className="px-4 py-3.5 text-right">
        <button
          type="button"
          aria-label={`Actions for ${user.name}`}
          className="flex h-7 w-7 items-center justify-center rounded text-[#50453E] transition-colors hover:bg-[#D4C3BA]/30"
        >
          <MoreVerticalIcon size={18} />
        </button>
      </td>
    </tr>
  );
}

// ---- Page ----

function PageNumberButton({
  page,
  current,
  onClick,
}: {
  page: number;
  current: number;
  onClick: (page: number) => void;
}) {
  const isActive = page === current;
  return (
    <button
      type="button"
      onClick={() => onClick(page)}
      className={`flex h-8 w-8 items-center justify-center rounded text-[13px] leading-[18px] transition-colors ${
        isActive
          ? "bg-[#916D54] font-medium text-[#FFFBFF]"
          : "text-[#50453E] hover:bg-[#D4C3BA]/30"
      }`}
    >
      {page}
    </button>
  );
}

export default function UserManagementPage() {
  const [data, setData] = useState<AdminUserListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await getAdminUsers();
        if (!active) return;
        setData(res);
      } catch (e) {
        if (!active) return;
        setError(e instanceof Error ? e.message : "Failed to load users");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const all = data?.data ?? [];
    const q = query.trim().toLowerCase();
    if (!q) return all;
    return all.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.organization?.name ?? "").toLowerCase().includes(q),
    );
  }, [data, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (safePage - 1) * PAGE_SIZE;
  const pageUsers = filtered.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <main className="min-w-0 flex-1">
      {/* Page Header / Actions */}
      <div className="flex items-center justify-between gap-4 px-6 py-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-[24px] font-semibold leading-[32px] tracking-[-0.01em] text-[#121C2A]">
            User Management
          </h1>
          <p className="text-[13px] leading-[18px] text-[#50453E]">
            Manage all staff members across all tenant organizations.
          </p>
        </div>

        <Link
          href="/invite"
          className="flex h-[34px] items-center gap-2 rounded-lg bg-[#76553E] px-4 text-xs font-medium leading-4 tracking-[0.02em] text-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-colors hover:bg-[#6A4C38]"
        >
          <PlusIcon size={10.5} />
          Invite User
        </Link>
      </div>

      {/* Content Canvas */}
      <div className="flex flex-col items-stretch px-6 pb-6">
        <div className="overflow-hidden rounded-xl border border-[#D4C3BA]/30 bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D4C3BA]/30 px-4 py-4">
            <div className="relative w-full max-w-md">
              <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#50453E] opacity-70">
                <SearchIcon size={18} />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search by name, email, or organization..."
                className="h-9 w-full rounded-lg border border-[#D4C3BA]/50 bg-[#F8F9FF] py-2 pl-10 pr-4 text-[13px] leading-[18px] text-[#121C2A] placeholder:text-[#50453E]/60 focus:border-[#76553E] focus:outline-none focus:ring-1 focus:ring-[#76553E]/30"
              />
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                className="flex h-[34px] items-center gap-2 rounded-lg border border-[#D4C3BA]/50 bg-white px-3 text-xs font-medium leading-4 tracking-[0.02em] text-[#50453E] transition-colors hover:bg-[#F8F9FF]"
              >
                <SlidersIcon size={13.5} />
                Filters
              </button>
              <button
                type="button"
                className="flex h-[34px] items-center gap-2 rounded-lg border border-[#D4C3BA]/50 bg-white px-3 text-xs font-medium leading-4 tracking-[0.02em] text-[#50453E] transition-colors hover:bg-[#F8F9FF]"
              >
                <DownloadIcon size={12} />
                Export
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[880px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#D4C3BA]/30 bg-[#F8F9FF]/60">
                  {["Staff", "Role", "Organization", "Status", "Joined", ""].map(
                    (heading, i) => (
                      <th
                        key={i}
                        className={`px-6 py-3.5 text-[11px] font-semibold uppercase leading-[14px] tracking-[0.05em] text-[#50453E] ${
                          i === 5 ? "w-14 text-right" : ""
                        }`}
                      >
                        {heading}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <SkeletonRows />
                ) : error ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <p className="text-sm font-medium leading-5 text-[#121C2A]">
                        Couldn&apos;t load users
                      </p>
                      <p className="mt-1 text-[13px] leading-[18px] text-[#50453E]">
                        {error}
                      </p>
                    </td>
                  </tr>
                ) : pageUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#D4C3BA]/20 text-[#50453E]">
                        <UsersIcon size={20} />
                      </div>
                      <p className="mt-3 text-sm font-medium leading-5 text-[#121C2A]">
                        {query ? "No matching users" : "No users found"}
                      </p>
                      <p className="mt-1 text-[13px] leading-[18px] text-[#50453E]">
                        {query
                          ? "Try a different search term."
                          : "Invite a user to get started."}
                      </p>
                    </td>
                  </tr>
                ) : (
                  pageUsers.map((user) => (
                    <UserRow key={user.id} user={user} />
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!loading && !error && filtered.length > PAGE_SIZE && (
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#D4C3BA]/30 px-4 py-3">
              <span className="text-[13px] leading-[18px] text-[#50453E]">
                Showing{" "}
                <span className="font-medium text-[#121C2A]">
                  {startIndex + 1}–
                  {Math.min(startIndex + PAGE_SIZE, filtered.length)}
                </span>{" "}
                of{" "}
                <span className="font-medium text-[#121C2A]">
                  {filtered.length}
                </span>{" "}
                users
              </span>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  aria-label="Previous page"
                  disabled={safePage === 1}
                  onClick={() => setPage(safePage - 1)}
                  className="flex h-8 w-8 items-center justify-center rounded text-[#50453E] transition-colors hover:bg-[#D4C3BA]/30 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeftIcon size={18} />
                </button>

                {Array.from({ length: totalPages }).map((_, i) => {
                  const p = i + 1;
                  // Show first, last, and a small window around the current page.
                  if (
                    p === 1 ||
                    p === totalPages ||
                    Math.abs(p - safePage) <= 1
                  ) {
                    return (
                      <PageNumberButton
                        key={p}
                        page={p}
                        current={safePage}
                        onClick={(next) => setPage(next)}
                      />
                    );
                  }
                  // Collapse the middle gap into a single ellipsis.
                  if (p === safePage - 2 || p === safePage + 2) {
                    return (
                      <span
                        key={`el-${p}`}
                        className="px-1 text-[13px] leading-[18px] text-[#50453E]"
                      >
                        …
                      </span>
                    );
                  }
                  return null;
                })}

                <button
                  type="button"
                  aria-label="Next page"
                  disabled={safePage === totalPages}
                  onClick={() => setPage(safePage + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded text-[#50453E] transition-colors hover:bg-[#D4C3BA]/30 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronRightIcon size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}