"use client";

import { useState } from "react";

// Logo icon (Help Desk Pro brand mark)
function LogoIcon() {
  return (
    <svg
      width="16.67"
      height="15"
      viewBox="0 0 16.67 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.335 0L10.2 5.13L15.67 5.13L11.27 8.37L13.13 13.5L8.335 10.26L3.54 13.5L5.4 8.37L1 5.13L6.47 5.13L8.335 0Z"
        fill="white"
      />
    </svg>
  );
}

// Upload cloud icon
function UploadIcon() {
  return (
    <svg
      width="22"
      height="16"
      viewBox="0 0 22 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.5 5.5C14.9 2.4 12.2 0 9 0C5.8 0 3.1 2.4 2.5 5.5C1.1 5.9 0 7.3 0 9C0 11.2 1.8 13 4 13H15.5C18 13 20 11 20 8.5C20 6 18 5.5 15.5 5.5ZM11 8V11.5H7V8H4.5L9 3.5L13.5 8H11Z"
        fill="#50453E"
      />
    </svg>
  );
}

// Shield icon for trust row
function ShieldIcon() {
  return (
    <svg
      width="13.33"
      height="16.67"
      viewBox="0 0 13.33 16.67"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.665 0L13.33 2.5V7.5C13.33 11.9 10.4 15.5 6.665 16.67C2.93 15.5 0 11.9 0 7.5V2.5L6.665 0ZM6.665 7.5H11.33V3.75L6.665 2.08V7.5ZM2 7.5V3.75L5.665 2.5V7.5H2ZM6.665 9.5H2.1C2.4 12.1 4.1 14.2 6.665 14.9V9.5ZM11.23 9.5H6.665V14.9C9.23 14.2 10.93 12.1 11.23 9.5Z"
        fill="#76553E"
      />
    </svg>
  );
}

// Arrow right icon
function ArrowRightIcon() {
  return (
    <svg
      width="10.67"
      height="10.67"
      viewBox="0 0 10.67 10.67"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.33 0L4.4 0.93L8.13 4.67H0V6H8.13L4.4 9.73L5.33 10.67L10.67 5.33L5.33 0Z"
        fill="#50453E"
      />
    </svg>
  );
}

// Form field component
function FormField({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className="flex flex-col items-stretch gap-1">
      <label className="text-xs font-medium tracking-[0.02em] text-[#121C2A]">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg border border-[#82746D] bg-white px-4 py-2.5 text-sm text-[#50453E]/50 placeholder:text-[#50453E]/50 focus:border-[#76553E] focus:outline-none focus:ring-1 focus:ring-[#76553E]/30"
      />
    </div>
  );
}

// Section header component
function SectionHeader({
  number,
  title,
  active = false,
}: {
  number: string;
  title: string;
  active?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 border-b border-[#D4C3BA]/30 pb-2">
      <div
        className={`flex h-6 w-6 items-center justify-center rounded-full ${
          active ? "bg-[#916D54]" : "bg-[#D9E3F6]"
        }`}
      >
        <span
          className={`text-[11px] font-semibold ${
            active ? "text-[#FFFBFF]" : "text-[#50453E]"
          }`}
        >
          {number}
        </span>
      </div>
      <h2 className="text-xl font-semibold text-[#121C2A]">{title}</h2>
    </div>
  );
}

export default function Home() {
  const [password, setPassword] = useState("");

  // Calculate password strength (0-4)
  const getPasswordStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;
    return strength;
  };

  const strength = getPasswordStrength(password);

  return (
    <div className="flex min-h-screen flex-col bg-[#F8F9FF]">
      {/* Header */}
      <header className="flex items-center px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-[#76553E]">
            <LogoIcon />
          </div>
          <span className="text-xl font-bold tracking-tight text-[#76553E]">
            Help Desk Pro
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-24">
        <div className="flex w-full max-w-[600px] flex-col items-stretch gap-6">
          {/* Context Header */}
          <div className="flex flex-col items-stretch pb-4">
            <div className="flex flex-col items-center gap-1">
              <h1 className="text-center text-4xl font-semibold tracking-tight text-[#121C2A]">
                Setup your workspace
              </h1>
              <p className="text-center text-base text-[#50453E]">
                {"Let's get your organization ready to support customers."}
              </p>
            </div>
          </div>

          {/* Main Form Card */}
          <div className="rounded-xl border border-[#D4C3BA] bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03),0px_1px_3px_0px_rgba(0,0,0,0.05)]">
            <div className="flex flex-col items-stretch gap-8 p-8">
              {/* Step 1: Organization Info */}
              <div className="flex flex-col items-stretch gap-4">
                <SectionHeader number="1" title="Organization Info" active />

                <div className="flex flex-col items-stretch gap-4">
                  <FormField label="Organization Name" placeholder="e.g. Acme Corp Holdings" />
                  <FormField label="Headquarters Address" placeholder="City, Country" />
                </div>
              </div>

              {/* Step 2: Brand Identity */}
              <div className="flex flex-col items-stretch gap-4">
                <SectionHeader number="2" title="Brand Identity" />

                <div className="flex flex-col items-stretch gap-1">
                  <label className="text-xs font-medium tracking-[0.02em] text-[#121C2A]">
                    Workspace Logo
                  </label>
                  <div className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-[#D4C3BA] bg-[#EFF4FF] p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D9E3F6]">
                      <UploadIcon />
                    </div>
                    <div className="flex flex-col items-stretch gap-1">
                      <p className="text-center text-xs font-medium tracking-[0.02em] text-[#76553E]">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-center text-[13px] leading-[18px] text-[#50453E]">
                        SVG, PNG, JPG or GIF (max. 800x400px)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Admin Account */}
              <div className="flex flex-col items-stretch gap-4">
                <SectionHeader number="3" title="Administrator Account" />

                <div className="flex flex-col items-stretch gap-4">
                  <div className="flex justify-center gap-4">
                    <div className="flex flex-1 flex-col items-stretch gap-1">
                      <label className="text-xs font-medium tracking-[0.02em] text-[#121C2A]">
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="Jane Doe"
                        className="w-full rounded-lg border border-[#82746D] bg-white px-4 py-2.5 text-sm text-[#50453E]/50 placeholder:text-[#50453E]/50 focus:border-[#76553E] focus:outline-none focus:ring-1 focus:ring-[#76553E]/30"
                      />
                    </div>
                    <div className="flex flex-1 flex-col items-stretch gap-1">
                      <label className="text-xs font-medium tracking-[0.02em] text-[#121C2A]">
                        Work Email
                      </label>
                      <input
                        type="email"
                        placeholder="jane@acmecorp.com"
                        className="w-full rounded-lg border border-[#82746D] bg-white px-4 py-2.5 text-sm text-[#50453E]/50 placeholder:text-[#50453E]/50 focus:border-[#76553E] focus:outline-none focus:ring-1 focus:ring-[#76553E]/30"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col items-stretch gap-1">
                    <label className="text-xs font-medium tracking-[0.02em] text-[#121C2A]">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-lg border border-[#82746D] bg-white px-4 py-2.5 text-sm text-[#50453E]/50 placeholder:text-[#50453E]/50 focus:border-[#76553E] focus:outline-none focus:ring-1 focus:ring-[#76553E]/30"
                    />
                    <div className="flex flex-col items-stretch pt-2">
                      <div className="flex items-stretch justify-center gap-1">
                        {[0, 1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className={`h-1 flex-1 rounded-full ${
                              i < strength
                                ? strength <= 1
                                  ? "bg-red-400"
                                  : strength <= 2
                                    ? "bg-yellow-400"
                                    : "bg-green-500"
                                : "bg-[#D9E3F6]"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="text-right text-[13px] leading-[18px] text-[#50453E]">
                          Must be at least 8 characters
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions Footer */}
            <div className="flex flex-col items-center gap-4 border-t border-[#D4C3BA] bg-[#EFF4FF] p-6">
              <button
                type="button"
                className="h-10 w-full rounded-lg bg-[#76553E] text-xs font-medium tracking-[0.02em] text-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-colors hover:bg-[#6a4c38] focus:outline-none focus:ring-2 focus:ring-[#76553E]/30"
              >
                Create your Help Desk
              </button>
              <div className="flex items-center gap-1">
                <span className="text-[13px] leading-[18px] text-[#50453E]">
                  Already have an account?
                </span>
                <a
                  href="#"
                  className="text-xs font-medium tracking-[0.02em] text-[#76553E] hover:underline"
                >
                  Sign in
                </a>
                <ArrowRightIcon />
              </div>
            </div>
          </div>

          {/* Trust Row */}
          <div className="flex flex-col items-stretch pt-4">
            <div className="flex items-center justify-center gap-2 opacity-80">
              <ShieldIcon />
              <p className="text-[13px] leading-[18px] text-[#50453E]">
                Used by support teams to resolve 50k+ complaints globally.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}