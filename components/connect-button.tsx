"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { exchangeCode } from "@/lib/actions/connect";

declare global {
  interface Window {
    Connect: any;
  }
}

export default function MonoButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = () => {
    if (!window.Connect) {
      alert("Mono script not loaded yet. Please wait a second.");
      return;
    }

    const monoInstance = new window.Connect({
      key: process.env.NEXT_PUBLIC_MONO_PUBLIC_KEY,
      onSuccess: async ({ code }: { code: string }) => {
        setLoading(true);
        setError(null);
        try {
          const accountId = await exchangeCode(code);
          console.log("Linked account ID:", accountId);
          // TODO: persist accountId to Supabase profile here
          router.push("/dashboard");
        } catch (err: any) {
          setError(err.message ?? "Something went wrong. Please try again.");
        } finally {
          setLoading(false);
        }
      },
      onClose: () => console.log("Widget closed"),
    });

    monoInstance.setup();
    monoInstance.open();
  };

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <button
        onClick={handleConnect}
        disabled={loading}
        className="bg-[#0055BA] text-white px-8 py-4 rounded-xl font-bold shadow-xl hover:scale-105 transition-transform disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 flex items-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle style={{ opacity: 0.2 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
              <path style={{ opacity: 0.9 }} fill="currentColor" d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z" />
            </svg>
            Linking account…
          </>
        ) : (
          "Connect SME Bank Account"
        )}
      </button>
      {error && (
        <p className="text-sm text-red-500 font-medium text-center">{error}</p>
      )}
    </div>
  );
}