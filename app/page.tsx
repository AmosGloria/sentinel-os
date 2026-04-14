import React from 'react';
import Link from 'next/link';
import Footer from "@/components/footer";
import Image from 'next/image';
import KoboTrackLogo from "@/components/KoboTrackLogo";
import {
  BarChart3,
  ShieldCheck,
  Terminal,
  ArrowRight,
  Fingerprint,
  Activity,
  Globe,
  Plus,
  ArrowUpRight
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#0F172A] font-sans antialiased">

      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <KoboTrackLogo size={36} variant="dark" />
            <div className="hidden lg:flex items-center gap-6 text-[13px] font-semibold text-slate-500 uppercase tracking-tight">
              <a href="#infra" className="hover:text-black transition-all">Infrastructure</a>
              <a href="#services" className="hover:text-black transition-all">Services</a>
              <a href="#security" className="hover:text-black transition-all">Security</a>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <Link href="/auth">
              <button className="bg-[#0F172A] text-white px-6 py-3 rounded-lg text-sm font-bold hover:bg-blue-600 transition-all shadow-lg shadow-slate-200 flex items-center gap-2 group cursor-pointer">
                Get Started <Plus size={16} className="group-hover:rotate-90 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <header className="pt-44 pb-24 px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            <div className="space-y-10">
              <div className="inline-flex items-center gap-3 px-3 py-1 bg-slate-50 border border-slate-200 rounded-md">
                <div className="size-2 rounded-full bg-blue-600 animate-pulse" />
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">System Status: Ready to Sync</span>
              </div>

              <h1 className="text-7xl lg:text-8xl font-black tracking-tight leading-[0.9]">
                Financial <br />
                <span className="text-slate-400 italic">Integrity</span> <br />
                at Scale.
              </h1>

              <p className="text-xl text-slate-500 max-w-lg leading-relaxed font-medium">
                The industrial-standard for SME profiling. KoboTrack provides high-fidelity financial auditing through direct-ledger aggregation.
              </p>

              <div className="flex items-center gap-6">
                <Link href="/auth/signup">
                  <button className="bg-blue-600 text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-black transition-all shadow-xl shadow-blue-100 flex items-center gap-3 cursor-pointer">
                    Initialize Infrastructure <ArrowRight size={20} />
                  </button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 h-[500px]">
              <div className="bg-[#0F172A] rounded-3xl text-white relative overflow-hidden">
                <Image src="/images/koboTrack.png" alt="KoboTrack" fill style={{ objectFit: 'fill' }} />
              </div>
               <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 flex flex-col justify-between overflow-hidden relative">
                <Activity className="text-blue-600 mb-4" size={32} />
                <div className="space-y-2">
                  <div className="h-1 w-12 bg-blue-600 rounded-full" />
                  <p className="font-bold text-2xl tracking-tighter">99.9%</p>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Sync Accuracy</p>
                </div>
              </div>
              <div className="col-span-2 bg-slate-50 border border-slate-100 rounded-3xl p-8 relative overflow-hidden">
                <div className="flex items-center gap-4 mb-6">
                  <div className="size-10 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center">
                    <Fingerprint size={20} className="text-slate-600" />
                  </div>
                  <p className="font-bold text-sm uppercase tracking-widest">Audit Logs (LIVE)</p>
                </div>
                <div className="space-y-3 font-mono text-[10px] text-slate-400">
                  <p className="flex justify-between"><span>{'>'} DB_SYNC_SUCCESSFUL</span> <span>12:40:01</span></p>
                  <p className="flex justify-between"><span>{'>'} BVN_ENCRYPTION_ACTIVE</span> <span>12:40:05</span></p>
                  <p className="flex justify-between text-blue-600"><span>{'>'} AGGREGATING_LEADGER_DATA...</span> <span>RUNNING</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- Section: Services --- */}
      <section id="services" className="py-24 px-8 border-t border-slate-100">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <ServiceItem
              title="Direct Extraction"
              num="01"
              desc="Direct read-access to SME bank statements via Mono & Okra nodes. Zero manual input."
            />
            <ServiceItem
              title="Pattern Analysis"
              num="02"
              desc="Automated identification of spending anomalies, payroll clusters, and cash-flow health."
            />
            <ServiceItem
              title="KYB Infrastructure"
              num="03"
              desc="Full-stack Business Verification. Audit CAC registration and tax status in seconds."
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function ServiceItem({ title, num, desc }) {
  return (
    <div className="space-y-6 group cursor-default">
      <p className="font-mono text-blue-600 text-sm">{num}</p>
      <div className="h-px bg-slate-200 w-full group-hover:bg-blue-600 transition-all duration-500" />
      <h3 className="text-2xl font-bold tracking-tighter">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}