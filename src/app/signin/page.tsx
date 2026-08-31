"use client";

import Link from "next/link";

// Logo icon (Help Desk Pro brand mark)
function LogoIcon({ color = "#76553E" }: { color?: string }) {
  return (
    <svg
      width="26.67"
      height="24"
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

// Email icon
function EmailIcon() {
  return (
    <svg
      width="16.67"
      height="13.33"
      viewBox="0 0 16.67 13.33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 1.67C0 0.75 0.75 0 1.67 0L15 0C15.92 0 16.67 0.75 16.67 1.67V11.67C16.67 12.58 15.92 13.33 15 13.33H1.67C0.75 13.33 0 12.58 0 11.67V1.67ZM1.67 2.08V4.17L8.33 7.92L15 4.17V2.08L8.33 5.83L1.67 2.08Z"
        fill="#82746D"
      />
    </svg>
  );
}

// Lock icon
function LockIcon() {
  return (
    <svg
      width="13.33"
      height="17.5"
      viewBox="0 0 13.33 17.5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.5 7.5V5.83C2.5 2.61 4.14 0 6.67 0C9.19 0 10.83 2.61 10.83 5.83V7.5H11.67C12.75 7.5 13.33 8.08 13.33 9.17V15.83C13.33 16.91 12.75 17.5 11.66 17.5H1.67C0.58 17.5 0 16.91 0 15.83V9.17C0 8.08 0.58 7.5 1.67 7.5H2.5ZM4.23 5.83H9.11C9.11 3.64 8.19 1.83 6.67 1.83C5.14 1.83 4.23 3.64 4.23 5.83ZM7.5 12.5C7.5 11.95 7.22 11.61 6.67 11.61C6.11 11.61 5.83 11.95 5.83 12.5V12.92C5.83 13.47 6.11 13.81 6.67 13.81C7.22 13.81 7.5 13.47 7.5 12.92V12.5Z"
        fill="#82746D"
      />
    </svg>
  );
}

// Arrow right icon for submit button
function ArrowRightIcon({ color = "#FFFFFF" }: { color?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 0L4.95 1.05L9.14 5.25H0V6.75H9.14L4.95 10.95L6 12L12 6L6 0Z"
        fill={color}
      />
    </svg>
  );
}

export default function SignInPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#F8F9FF] px-4 py-8">
      {/* Main Container: Asymmetric Split Layout */}
      <div className="flex w-full max-w-[1024px] height-[600px] overflow-hidden rounded-xl bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03),0px_1px_3px_0px_rgba(0,0,0,0.05)]">
        {/* ===== Left Side: Graphic / Branding Panel ===== */}
        <aside
          className="relative hidden w-[512px] shrink-0 flex-col justify-between gap-10 p-8 md:flex"
          style={{ backgroundColor: "#D9E3F6" }}
        >
          {/* Branding Header */}
          <div className="relative z-10 flex flex-col items-stretch gap-6">
            <div className="flex items-center gap-2">
              <LogoIcon color="#76553E" />
              <h1 className="text-xl font-semibold leading-[28px] text-[#121C2A]">
                HelpDesk Pro
              </h1>
            </div>

            <div>
              <p className="max-w-[358px] text-base leading-6 text-[#50453E]">
                Streamline your tenant support operations with precision and
                clarity.
              </p>
            </div>
          </div>

          {/* Testimonial Card */}
          <div className="relative z-10 flex flex-col items-stretch">
            <div className="flex flex-col items-stretch gap-2 rounded-lg border border-[rgba(212,195,186,0.3)] bg-[rgba(248,249,255,0.8)] p-4 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] backdrop-blur-[6px]">
              <p className="text-[13px] italic leading-[18px] text-[#121C2A]">
                {
                  "\u201CThe refined minimalist interface drastically reduced our team\u2019s fatigue during peak hours.\u201D"
                }
              </p>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F6DBC5]">
                  <span className="text-[11px] font-semibold text-[#735F4E]">
                    JS
                  </span>
                </div>
                <p className="text-[11px] font-semibold leading-[14px] text-[#50453E]">
                  Jane Smith, Operations Lead
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* ===== Right Side: Form Panel ===== */}
        <section className="flex flex-1 flex-col justify-center bg-white px-[76px] py-8 max-md:px-6">
          <div className="flex flex-col items-stretch gap-8">
            {/* Header */}
            <div className="flex flex-col items-stretch gap-2">
              <h2 className="text-2xl font-semibold leading-8 tracking-[-0.01em] text-[#121C2A]">
                Sign in to workspace
              </h2>
              <p className="text-[13px] leading-[18px] text-[#50453E]">
                Enter your details below to access your account.
              </p>
            </div>

            {/* Form */}
            <form className="flex flex-col items-stretch gap-4">
              {/* Email Field */}
              <div className="flex flex-col items-stretch gap-1">
                <label className="text-xs font-medium leading-4 tracking-[0.02em] text-[#50453E]">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <EmailIcon />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="name@organization.com"
                    autoComplete="email"
                    className="w-full rounded-lg border border-[#D4C3BA] bg-white py-[9px] pl-10 pr-4 text-[13px] leading-[16px] text-[#121C2A] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] placeholder:text-[#82746D] focus:border-[#76553E] focus:outline-none focus:ring-1 focus:ring-[#76553E]/30"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="flex flex-col items-stretch gap-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium leading-4 tracking-[0.02em] text-[#50453E]">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-[11px] font-semibold leading-[14px] text-[#76553E] hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <LockIcon />
                  </div>
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="w-full rounded-lg border border-[#D4C3BA] bg-white py-[9px] pl-10 pr-4 text-[13px] leading-[16px] text-[#121C2A] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] placeholder:text-[#82746D] focus:border-[#82746D] focus:outline-none focus:ring-1 focus:ring-[#76553E]/30"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-1 flex w-full items-center justify-center gap-2 rounded-lg border border-[#76553E] bg-[#76553E] px-4 py-2.5 text-xs font-medium leading-4 tracking-[0.02em] text-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-colors hover:bg-[#6a4c38] focus:outline-none focus:ring-2 focus:ring-[#76553E]/30"
              >
                Sign in
                <ArrowRightIcon />
              </button>
            </form>

            {/* Footer Links */}
            <div className="flex flex-col items-stretch border-t border-[rgba(212,195,186,0.5)] pt-6">
              <p className="text-center text-[13px] leading-[18px] text-[#50453E]">
                {"Don\u2019t have an account? "}
                <Link
                  href="/"
                  className="text-[11px] font-semibold leading-[14px] text-[#76553E] hover:underline"
                >
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}