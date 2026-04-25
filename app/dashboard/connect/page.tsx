"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import MonoButton from "@/components/connect-button";
import {
  Activity,
  ArrowLeft,
  ShieldCheck,
  Lock,
  Zap,
} from "lucide-react";

export default function ConnectPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/auth");
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top bar */}
      <header className="bg-white border-b border-slate-200 px-8 h-16 flex items-center justify-between">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#0F172A] transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>
        <h2 className="text-sm font-black tracking-tight text-blue-600 flex items-center gap-2">
          <Activity size={18} /> Sentinel-OS
        </h2>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-xl">
          {/* Card */}
          <div className="bg-white border border-slate-200 rounded-[2rem] p-12 shadow-sm space-y-8">
            {/* Icon + heading */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="size-20 bg-blue-50 rounded-3xl flex items-center justify-center shadow-inner">
                <ShieldCheck className="text-blue-600" size={40} />
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-black tracking-tight text-[#0F172A]">
                  Connect Your Bank
                </h1>
                <p className="text-slate-500 font-medium max-w-sm mx-auto leading-relaxed">
                  Link your SME bank account via Mono to generate your
                  high-fidelity Sentinel Score and financial resume.
                </p>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: <Lock size={16} />, label: "Bank-grade encryption" },
                { icon: <ShieldCheck size={16} />, label: "Read-only access" },
                { icon: <Zap size={16} />, label: "Instant verification" },
              ].map(({ icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 p-4 bg-slate-50 rounded-2xl text-center"
                >
                  <span className="text-blue-600">{icon}</span>
                  <span className="text-[11px] font-bold text-slate-500 leading-tight">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex justify-center">
              <MonoButton />
            </div>

            <p className="text-center text-xs text-slate-400 leading-relaxed">
              Powered by{" "}
              <span className="font-bold text-slate-500">Mono</span>. Your
              credentials are never stored or shared. We use read-only access to
              analyse your transaction history.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
