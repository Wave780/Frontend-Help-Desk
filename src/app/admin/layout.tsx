"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import RequireSuperAdmin from "./RequireSuperAdmin";
import { clearSession } from "@/lib/auth";

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

function BrandStar({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size * 0.9}
      viewBox="0 0 26.67 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.335 0L16.32 8.21L25.07 8.21L18.03 13.39L21.02 21.6L13.335 16.42L5.65 21.6L8.64 13.39L1.6 8.21L10.35 8.21L13.335 0Z"
        fill={color}
      />
    </svg>
  );
}

const GridIcon = ({ size = 18 }: { size?: number }) => (
  <Svg size={size} viewBox="0 0 24 24">
    <rect width="7" height="7" x="3" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="14" rx="1" />
    <rect width="7" height="7" x="3" y="14" rx="1" />
  </Svg>
);

const BuildingIcon = ({ size = 18 }: { size?: number }) => (
  <Svg size={size} viewBox="0 0 24 24">
    <rect width="16" height="20" x="4" y="2" rx="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01" />
    <path d="M16 6h.01" />
    <path d="M12 6h.01" />
    <path d="M12 10h.01" />
    <path d="M12 14h.01" />
    <path d="M16 10h.01" />
    <path d="M16 14h.01" />
    <path d="M8 10h.01" />
    <path d="M8 14h.01" />
  </Svg>
);

const LayersIcon = ({ size = 18 }: { size?: number }) => (
  <Svg size={size} viewBox="0 0 24 24">
    <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
    <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
    <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
  </Svg>
);

const UsersIcon = ({ size = 18 }: { size?: number }) => (
  <Svg size={size} viewBox="0 0 24 24">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </Svg>
);

const SettingsGearIcon = ({ size = 18 }: { size?: number }) => (
  <Svg size={size} viewBox="0 0 24 24">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </Svg>
);

const FileTextIcon = ({ size = 18 }: { size?: number }) => (
  <Svg size={size} viewBox="0 0 24 24">
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="M10 9H8" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
  </Svg>
);

const LogOutIcon = ({ size = 18 }: { size?: number }) => (
  <Svg size={size} viewBox="0 0 24 24">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" x2="9" y1="12" y2="12" />
  </Svg>
);

// ---- Sidebar Navigation ----

const navItems = [
  { label: "Overview", href: "/admin/overview", icon: <GridIcon size={18} /> },
  { label: "Organizations", href: "/admin/organizations", icon: <BuildingIcon size={18} /> },
  { label: "Plans", href: "/admin/plans", icon: <LayersIcon size={18} /> },
  { label: "Users", href: "/admin/users", icon: <UsersIcon size={18} /> },
  { label: "Settings", href: "/admin/settings", icon: <SettingsGearIcon size={18} /> },
];

const footerItems = [
  { label: "Global Logs", href: "/admin/logs", icon: <FileTextIcon size={18} /> },
];

function NavLink({
  icon,
  label,
  href,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex h-9 w-full items-center gap-3 rounded-lg px-3 transition-colors ${
        active ? "bg-[#916D54]" : "hover:bg-white/5"
      }`}
    >
      <span className={active ? "text-[#FFFBFF]" : "text-[#D9E3F6]"}>
        {icon}
      </span>
      <span
        className={`text-sm leading-5 ${
          active ? "text-[#FFFBFF] font-medium" : "text-[#D9E3F6]"
        }`}
      >
        {label}
      </span>
    </Link>
  );
}

function LogoutButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => {
        clearSession();
        router.replace("/signin");
      }}
      className="flex h-9 w-full items-center gap-3 rounded-lg px-3 text-left transition-colors hover:bg-white/5"
    >
      <span className="text-[#D9E3F6]">
        <LogOutIcon size={18} />
      </span>
      <span className="text-sm leading-5 text-[#D9E3F6]">Logout</span>
    </button>
  );
}
function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden w-[256px] shrink-0 flex-col bg-[#27313F] lg:flex">
      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#916D54]">
            <BrandStar size={20} color="#FFFBFF" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-semibold leading-7 text-[#FFDCC5]">
              Admin Central
            </span>
            <span className="text-[11px] leading-[14px] text-[#D9E3F6]">
              System Control
            </span>
          </div>
        </div>
      </div>

      {/* Main Tabs */}
      <nav className="flex flex-1 flex-col gap-1 px-4">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            icon={item.icon}
            label={item.label}
            href={item.href}
            active={pathname === item.href}
          />
        ))}
      </nav>

      {/* Footer Tabs */}
      <nav className="flex flex-col gap-1 px-4 pb-4">
        {footerItems.map((item) => (
          <NavLink
            key={item.href}
            icon={item.icon}
            label={item.label}
            href={item.href}
            active={pathname === item.href}
          />
        ))}
        <LogoutButton />
      </nav>
    </aside>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireSuperAdmin>
      <div className="flex min-h-screen bg-[#F8F9FF]">
        <Sidebar />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </RequireSuperAdmin>
  );
}
