export default function OrganizationsPage() {
  return (
    <main className="min-w-0 flex-1 px-6 py-8 lg:px-10">
      <div className="mb-6">
        <h1 className="text-4xl font-semibold leading-[44px] tracking-[-0.02em] text-[#121C2A]">
          Organizations
        </h1>
        <p className="mt-1 text-sm leading-5 text-[#50453E]">Manage every tenant organization on the platform.</p>
      </div>

      <div className="rounded-xl border border-[#D4C3BA]/40 bg-white p-10 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03),0px_1px_3px_0px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F6DBC5]">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#735F4E"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold leading-7 text-[#121C2A]">
            Coming soon
          </h2>
          <p className="max-w-sm text-sm leading-5 text-[#50453E]">
            This section is part of the platform roadmap. The design and
            endpoints are being prepared.
          </p>
        </div>
      </div>
    </main>
  );
}
