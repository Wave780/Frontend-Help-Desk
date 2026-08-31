"use client";

import { useState, useEffect } from "react";
import RequireSuperAdmin from "../RequireSuperAdmin";
import {
  getAdminMetricsSummary,
  getOrganizationGrowth,
  AdminMetricsSummary,
  OrganizationGrowth,
  OrganizationGrowthPoint,
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

const UsersIcon = ({ size = 18 }: { size?: number }) => (
  <Svg size={size} viewBox="0 0 24 24">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </Svg>
);

const AlertTriangleIcon = ({ size = 18 }: { size?: number }) => (
  <Svg size={size} viewBox="0 0 24 24">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </Svg>
);

const LandmarkIcon = ({ size = 18 }: { size?: number }) => (
  <Svg size={size} viewBox="0 0 24 24">
    <line x1="3" x2="21" y1="22" y2="22" />
    <line x1="6" x2="6" y1="18" y2="11" />
    <line x1="10" x2="10" y1="18" y2="11" />
    <line x1="14" x2="14" y1="18" y2="11" />
    <line x1="18" x2="18" y1="18" y2="11" />
    <polygon points="12 2 20 7 4 7" />
  </Svg>
);

const GridIcon = ({ size = 18 }: { size?: number }) => (
  <Svg size={size} viewBox="0 0 24 24">
    <rect width="7" height="7" x="3" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="14" rx="1" />
    <rect width="7" height="7" x="3" y="14" rx="1" />
  </Svg>
);

const LayersIcon = ({ size = 18 }: { size?: number }) => (
  <Svg size={size} viewBox="0 0 24 24">
    <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
    <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
    <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
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

const CalendarIcon = ({ size = 18 }: { size?: number }) => (
  <Svg size={size} viewBox="0 0 24 24">
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M3 10h18" />
  </Svg>
);

const ChevronDownIcon = ({ size = 18 }: { size?: number }) => (
  <Svg size={size} viewBox="0 0 24 24">
    <path d="m6 9 6 6 6-6" />
  </Svg>
);

const DownloadIcon = ({ size = 18 }: { size?: number }) => (
  <Svg size={size} viewBox="0 0 24 24">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </Svg>
);

const MoreVerticalIcon = ({ size = 18 }: { size?: number }) => (
  <Svg size={size} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="19" r="1" />
  </Svg>
);

const ArrowUpIcon = ({ size = 14 }: { size?: number }) => (
  <Svg size={size} viewBox="0 0 24 24">
    <path d="M12 19V5" />
    <polyline points="5 12 12 5 19 12" />
  </Svg>
);
// ---- Sidebar Navigation ----

const navItems = [
  { label: "Overview", icon: <GridIcon size={18} />, active: true },
  { label: "Organizations", icon: <BuildingIcon size={18} />, active: false },
  { label: "Plans", icon: <LayersIcon size={18} />, active: false },
  { label: "Users", icon: <UsersIcon size={18} />, active: false },
  { label: "Settings", icon: <SettingsGearIcon size={18} />, active: false },
];

const footerItems = [
  { label: "Global Logs", icon: <FileTextIcon size={18} /> },
  { label: "Logout", icon: <LogOutIcon size={18} /> },
];

function NavLink({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <a
      href="#"
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
    </a>
  );
}

function Sidebar() {
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
            key={item.label}
            icon={item.icon}
            label={item.label}
            active={item.active}
          />
        ))}
      </nav>

      {/* Footer Tabs */}
      <nav className="flex flex-col gap-1 px-4 pb-4">
        {footerItems.map((item) => (
          <NavLink key={item.label} icon={item.icon} label={item.label} />
        ))}
      </nav>
    </aside>
  );
}

// ---- Stat Card ----

type StatCardProps = {
  label: string;
  value: string;
  delta: string;
  positive: boolean;
  badgeClass: string;
  iconClass: string;
  icon: React.ReactNode;
  glow: string;
};

function StatCard({
  label,
  value,
  delta,
  positive,
  badgeClass,
  iconClass,
  icon,
  glow,
}: StatCardProps) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-[#D4C3BA]/40 bg-white p-4 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03),0px_1px_3px_0px_rgba(0,0,0,0.05)]">
      {/* decorative glow */}
      <div
        className={`pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-20 blur-2xl ${glow}`}
      />
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium leading-4 tracking-[0.05em] text-[#50453E]">
          {label}
        </span>
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full ${badgeClass}`}
        >
          <span className={iconClass}>{icon}</span>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <span className="text-4xl font-semibold leading-9 tracking-[-0.02em] text-[#121C2A]">
          {value}
        </span>
        {/* <span
          className={`flex items-center gap-1 rounded border px-1.5 py-0.5 text-[11px] leading-[14px] ${
            positive
              ? "border-green-600/20 bg-green-50 text-green-700"
              : "border-[#BA1A1A]/20 bg-[#FFDAD6] text-[#BA1A1A]"
          }`}
        >
          <ArrowUpIcon size={12} />
          {delta}
        </span> */}
      </div>
    </div>
  );
}

// ---- Charts ----

function niceMax(value: number): number {
  if (value <= 0) return 100;
  const pow = Math.pow(10, Math.floor(Math.log10(value)));
  const norm = value / pow;
  let step: number;
  if (norm <= 1) step = 1;
  else if (norm <= 2) step = 2;
  else if (norm <= 5) step = 5;
  else step = 10;
  return step * pow;
}

function formatValue(value: number): string {
  if (value >= 1000) {
    const k = value / 1000;
    return `${k % 1 === 0 ? k : k.toFixed(1)}k`;
  }
  return `${value}`;
}

function OrganizationGrowthChart({
  data,
}: {
  data: OrganizationGrowthPoint[];
}) {
  const W = 600;
  const H = 260;
  // Marign so the line doesn't get clipped at the top edge.
  const padTop = 12;

  const max = niceMax(Math.max(...data.map((d) => d.value)));
  const yLabels = 5;
  const n = data.length;

  const points = data.map((d, i) => {
    const x = n <= 1 ? 0 : (i / (n - 1)) * W;
    const y = H - padTop - ((H - padTop) * d.value) / max;
    return { ...d, x, y };
  });

  const line = points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const area = `0,${H} ${line} ${W},${H} 0,${H}`;

  return (
    <div className="flex flex-col items-stretch">
      {/* Chart header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold leading-7 text-[#121C2A]">
          Organization Growth
        </h3>
        <button className="flex h-7 w-7 items-center justify-center rounded text-[#50453E] hover:bg-[#D4C3BA]/30">
          <MoreVerticalIcon size={18} />
        </button>
      </div>

      {/* Chart body */}
      <div className="flex gap-3 rounded-lg border border-[#D4C3BA]/40 bg-[#F8F9FF] p-3">
        {/* Y axis labels */}
        <div className="flex h-[260px] flex-col justify-between text-xs leading-[14px] text-[#50453E]">
          {Array.from({ length: yLabels }).map((_, i) => (
            <span key={i}>{formatValue(max - (max / (yLabels - 1)) * i)}</span>
          ))}
        </div>
        {/* Plot area */}
        <div className="relative h-[260px] flex-1">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="none"
            className="h-full w-full"
          >
            <defs>
              <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#76553E" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#76553E" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* horizontal grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((t) => (
              <line
                key={t}
                x1="0"
                x2={W}
                y1={H * t}
                y2={H * t}
                stroke="#D4C3BA"
                strokeOpacity="0.6"
              />
            ))}
            <polygon points={area} fill="url(#growthFill)" />
            <polyline
              points={line}
              fill="none"
              stroke="#76553E"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {points.map((p, i) => (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r="3.5"
                fill="#FFFFFF"
                stroke="#76553E"
                strokeWidth="2"
              />
            ))}
          </svg>
        </div>
      </div>
      {/* X axis labels (inline row) */}
      <div className="mt-4 flex justify-between text-xs leading-[14px] text-[#50453E]">
        {points.map((p, i) => (
          <span key={i}>{p.label}</span>
        ))}
      </div>
    </div>
  );
}

const VOLUME_DAYS = [
  { day: "Mon", critical: 22.3, normal: 38.9 },
  { day: "Tue", critical: 10.9, normal: 66.8 },
  { day: "Wed", critical: 33.2, normal: 27.5 },
  { day: "Thu", critical: 16.6, normal: 83.4 },
  { day: "Fri", critical: 27.5, normal: 55.5 },
  { day: "Sat", critical: 5.3, normal: 44.5 },
  { day: "Sun", critical: 44.5, normal: 49.8 },
];

function ComplaintVolumeChart() {
  return (
    <div className="flex flex-col items-stretch">
      {/* Chart header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold leading-7 text-[#121C2A]">
          Complaint Volume
        </h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs leading-[14px] text-[#50453E]">
            <span className="h-3 w-3 rounded bg-[#BA1A1A]" />
            Critical
          </div>
          <div className="flex items-center gap-1.5 text-xs leading-[14px] text-[#50453E]">
            <span className="h-3 w-3 rounded bg-[#6E5B4A]" />
            Normal
          </div>
          <button className="flex h-7 w-7 items-center justify-center rounded text-[#50453E] hover:bg-[#D4C3BA]/30">
            <MoreVerticalIcon size={18} />
          </button>
        </div>
      </div>

      {/* Chart body */}
      <div className="rounded-lg border border-[#D4C3BA]/40 bg-[#F8F9FF] p-3">
        <div className="flex gap-3">
          {/* Y axis labels */}
          <div className="flex h-48 flex-col justify-between text-xs leading-[14px] text-[#50453E]">
            <span>150</span>
            <span>100</span>
            <span>50</span>
            <span>0</span>
          </div>
          {/* Bars */}
          <div className="relative flex flex-1 items-end gap-2">
            {/* horizontal grid lines */}
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="absolute left-0 right-0 border-t border-[#D4C3BA]/50"
                style={{ bottom: `${(i / 3) * 100}%` }}
              />
            ))}
            {VOLUME_DAYS.map((d) => (
              <div
                key={d.day}
                className="relative flex h-48 flex-1 flex-col justify-end gap-0.5"
              >
                <div
                  className="w-full rounded-t-[2px] bg-[#BA1A1A]"
                  style={{ height: `${d.critical}%` }}
                />
                <div
                  className="w-full bg-[#6E5B4A]"
                  style={{ height: `${d.normal}%` }}
                />
              </div>
            ))}
          </div>
        </div>
        {/* X axis labels */}
        <div className="mt-2 flex gap-2">
          <div className="w-[24px]" />
          {VOLUME_DAYS.map((d) => (
            <div key={d.day} className="flex-1 text-center text-xs leading-[14px] text-[#50453E]">
              {d.day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---- Page ----

type StatCardMeta = {
  label: string;
  value: string;
  badgeClass: string;
  iconClass: string;
  icon: React.ReactNode;
  glow: string;
};

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Static presentation metadata for the stat cards. The org / active-user
// values are overwritten with live endpoint data once loaded; complaints and
// revenue remain design placeholders until the corresponding metrics exist.
const statCardMeta: (summary: AdminMetricsSummary | null) => StatCardMeta[] = (
  summary,
) => [
  {
    label: "TOTAL ORGANIZATIONS",
    value: summary ? summary.organizations.total.toLocaleString() : "—",
    badgeClass: "bg-[#F6DBC5]",
    iconClass: "text-[#735F4E]",
    icon: <BuildingIcon size={16} />,
    glow: "bg-[#76553E]",
  },
  {
    label: "ACTIVE USERS",
    value: summary ? summary.users.active.toLocaleString() : "—",
    badgeClass: "bg-[#DEE9FC]",
    iconClass: "text-[#121C2A]",
    icon: <UsersIcon size={16} />,
    glow: "bg-[#6E5B4A]",
  },
  {
    label: "PLATFORM COMPLAINTS",
    value: summary ? summary.complaints.total.toLocaleString() : "—",
    badgeClass: "bg-[#FFDAD6]",
    iconClass: "text-[#93000A]",
    icon: <AlertTriangleIcon size={16} />,
    glow: "bg-[#BA1A1A]",
  },
  {
    label: "MONTHLY REC. REV.",
    value: "$1.2M",
    badgeClass: "bg-[#DEE9FC]",
    iconClass: "text-[#121C2A]",
    icon: <LandmarkIcon size={16} />,
    glow: "bg-green-600",
  },
];

// Default to the current month's shorthand label while data loads.
const DEFAULT_LABEL = monthNames[new Date().getMonth()];

export default function OverviewPage() {
  const [summary, setSummary] = useState<AdminMetricsSummary | null>(null);
  const [growth, setGrowth] = useState<OrganizationGrowth | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const [summaryRes, growthRes] = await Promise.all([
          getAdminMetricsSummary(),
          getOrganizationGrowth(),
        ]);
        if (!active) return;
        setSummary(summaryRes);
        setGrowth(growthRes);
      } catch {
        // Leave cards/chart in their placeholder state if the request fails.
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const cards = statCardMeta(summary);

  // Growth series: use live data if available, otherwise a single "—" point.
  const growthData: OrganizationGrowthPoint[] =
    growth && growth.series.length > 0
      ? growth.series
      : [{ label: loading ? DEFAULT_LABEL : "—", value: 0 }];

  return (
    <RequireSuperAdmin>
      <div className="flex min-h-screen bg-[#F8F9FF]">
        <Sidebar />

        <main className="min-w-0 flex-1 px-6 py-8 lg:px-10">
          {/* Page Header */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-semibold leading-[44px] tracking-[-0.02em] text-[#121C2A]">
                Platform Overview
              </h1>
              <p className="mt-1 text-sm leading-5 text-[#50453E]">
                System-wide performance and metrics at a glance.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex h-[34px] items-center gap-2 rounded border border-[#D4C3BA] bg-[#F8F9FF] px-3 text-xs font-medium leading-4 tracking-[0.02em] text-[#121C2A] transition-colors hover:bg-white">
                <CalendarIcon size={15} />
                Last 30 Days
                <ChevronDownIcon size={14} />
              </button>
              <button className="flex h-8 items-center gap-2 rounded bg-[#76553E] px-3 text-xs font-medium leading-4 tracking-[0.02em] text-white transition-colors hover:bg-[#6A4C38]">
                <DownloadIcon size={14} />
                Export Report
              </button>
            </div>
          </div>

          {/* Key Metrics Bento Grid */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => (
              <StatCard key={card.label} {...card} delta="—" positive />
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <section className="rounded-xl border border-[#D4C3BA]/40 bg-white p-4 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03),0px_1px_3px_0px_rgba(0,0,0,0.05)]">
              <OrganizationGrowthChart data={growthData} />
            </section>
            <section className="rounded-xl border border-[#D4C3BA]/40 bg-white p-4 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03),0px_1px_3px_0px_rgba(0,0,0,0.05)]">
              <ComplaintVolumeChart />
            </section>
          </div>
        </main>
      </div>
    </RequireSuperAdmin>
  );
}
