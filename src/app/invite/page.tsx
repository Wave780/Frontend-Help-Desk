"use client";

import { useState } from "react";
import Link from "next/link";

// Logo icon (HelpDesk Pro brand mark)
function LogoIcon({ color = "#76553E" }: { color?: string }) {
  return (
    <svg
      width="15"
      height="17.5"
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
function EmailIcon({ color = "#D4C3BA" }: { color?: string }) {
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
        fill={color}
      />
    </svg>
  );
}

// Check-circle icon (confirm field)
function CheckCircleIcon({ color = "#D4C3BA" }: { color?: string }) {
  return (
    <svg
      width="16.67"
      height="16.67"
      viewBox="0 0 16.67 16.67"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.335 0C3.73 0 0 3.73 0 8.335C0 12.94 3.73 16.67 8.335 16.67C12.94 16.67 16.67 12.94 16.67 8.335C16.67 3.73 12.94 0 8.335 0ZM8.335 1.39C12.17 1.39 15.28 4.5 15.28 8.335C15.28 12.17 12.17 15.28 8.335 15.28C4.5 15.28 1.39 12.17 1.39 8.335C1.39 4.5 4.5 1.39 8.335 1.39ZM7.35 11.54L3.68 7.88L4.71 6.85L7.35 9.48L11.93 4.9L12.97 5.93L7.35 11.54Z"
        fill={color}
      />
    </svg>
  );
}

// Lock icon
function LockIcon({ color = "#D4C3BA" }: { color?: string }) {
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
        fill={color}
      />
    </svg>
  );
}

// Arrow right icon
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

export default function StaffInvitePage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const passwordsMatch = password === confirmPassword;
  const isStrongEnough = password.length >= 8;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isStrongEnough) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (!passwordsMatch) {
      setError("Passwords do not match.");
      return;
    }

    setError(null);
    setIsSubmitting(true);
    // TODO: POST to the staff-invite acceptance endpoint.
    setSuccess(true);
    setIsSubmitting(false);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#F9FAFB] px-4 py-8">
      <div className="flex w-full max-w-[440px] flex-col items-stretch gap-8">
        {/* HelpDesk Pro Logo Header */}
        <div className="flex items-center justify-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#76553E]">
            <LogoIcon color="#FFFFFF" />
          </div>
          <h1 className="text-xl font-semibold leading-[28px] tracking-tight text-[#76553E]">
            HelpDesk Pro
          </h1>
        </div>

        {/* Main Card */}
        <div className="overflow-hidden rounded-xl border border-[#D4C3BA] bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03),0px_1px_3px_0px_rgba(0,0,0,0.05)]">
          {/* Decorative Top Bar */}
          <div className="h-1 w-full bg-gradient-to-r from-[#76553E] to-[#F6DBC5]" />

          <div className="flex flex-col items-stretch px-[33px] pb-[28px] pt-[29px]">
            {/* Content Header */}
            <div className="mb-6 flex flex-col items-stretch gap-1">
              <h2 className="text-2xl font-semibold leading-[32px] tracking-[-0.01em] text-[#121C2A]">
                Complete your profile
              </h2>
              <p className="text-sm leading-5 text-[#50453E]">
                {"You've been invited to join Acme Corp on HelpDesk Pro."}
              </p>
            </div>

            {/* Success Message */}
            {success && (
              <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                <p className="font-medium">
                  You&rsquo;re all set! Your account is ready.
                </p>
                <p className="mt-1">
                  You can now sign in and start helping your organization.
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-stretch gap-4"
            >
              {/* Email Field (read-only) */}
              <div className="flex flex-col items-stretch gap-1">
                <label className="text-xs font-medium leading-4 tracking-[0.02em] text-[#50453E]">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <EmailIcon />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value="alex.staff@acmecorp.com"
                    readOnly
                    className="h-[42px] w-full cursor-not-allowed rounded-lg border border-[#D4C3BA] bg-[#EFF4FF] pl-[41px] pr-4 text-sm leading-5 text-[#50453E] focus:outline-none"
                  />
                </div>
              </div>
{/* Create Password Field */}
              <div className="flex flex-col items-stretch gap-1">
                <label
                  htmlFor="password"
                  className="text-xs font-medium leading-4 tracking-[0.02em] text-[#50453E]"
                >
                  Create Password
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <LockIcon />
                  </div>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-[42px] w-full rounded-lg border border-[#D4C3BA] bg-white pl-[41px] pr-4 text-sm text-[#50453E] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] placeholder:text-[#6B7280] focus:border-[#76553E] focus:outline-none focus:ring-1 focus:ring-[#76553E]/30"
                  />
                </div>
                {password.length > 0 && !isStrongEnough && (
                  <p className="text-xs leading-4 text-[#C4643E]">
                    Must be at least 8 characters.
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="flex flex-col items-stretch gap-1">
                <label
                  htmlFor="confirmPassword"
                  className="text-xs font-medium leading-4 tracking-[0.02em] text-[#50453E]"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <CheckCircleIcon />
                  </div>
                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="h-[42px] w-full rounded-lg border border-[#D4C3BA] bg-white pl-[41px] pr-4 text-sm text-[#50453E] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] placeholder:text-[#6B7280] focus:border-[#76553E] focus:outline-none focus:ring-1 focus:ring-[#76553E]/30"
                  />
                </div>
                {confirmPassword.length > 0 && !passwordsMatch && (
                  <p className="text-xs leading-4 text-[#C4643E]">
                    Passwords do not match.
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-1 flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#76553E] bg-[#76553E] px-4 text-xs font-medium leading-4 tracking-[0.02em] text-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-colors hover:bg-[#6a4c38] focus:outline-none focus:ring-2 focus:ring-[#76553E]/30 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "Joining..." : "Join Organization"}
                <ArrowRightIcon />
              </button>
            </form>
          </div>
        </div>

        {/* Footer Link */}
        <div className="flex items-center justify-center">
          <Link
            href="/signin"
            className="text-[13px] leading-[18px] text-[#50453E] hover:text-[#76553E] hover:underline"
          >
            Sign in with an existing account
          </Link>
        </div>
      </div>
    </main>
  );
}