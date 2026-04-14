import React from 'react';
import Link from 'next/link';
import KoboTrackLogo from "@/components/KoboTrackLogo";
import { ShieldCheck, Globe, ArrowUpRight } from 'lucide-react';

const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);
const XIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-950 border-t border-slate-900 pt-16 pb-8 px-6 font-sans selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="space-y-6">
            <KoboTrackLogo size={32} variant="light" />
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Sovereign financial intelligence for the Nigerian SME ecosystem. 
              Bridging the gap between raw banking data and verifiable credit identity.
            </p>
            <div className="flex gap-4">
              <SocialLink href="#" icon={<XIcon size={18} />} />
              <SocialLink href="#" icon={<LinkedInIcon size={18} />} />
              <SocialLink href="#" icon={<GithubIcon size={18} />} />
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-widest">Intelligence</h4>
            <ul className="space-y-4">
              <FooterLink href="/profiling">SME Profiling</FooterLink>
              <FooterLink href="/risk">Risk Mitigation</FooterLink>
              <FooterLink href="/open-banking">Open Banking API</FooterLink>
              <FooterLink href="/compliance">Regulatory Guard</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-widest">Governance</h4>
            <ul className="space-y-4">
              <FooterLink href="/privacy">NDPA Compliance</FooterLink>
              <FooterLink href="/security">Encryption Standards</FooterLink>
              <FooterLink href="/terms">Terms of Service</FooterLink>
              <FooterLink href="/audit">Audit Logs</FooterLink>
            </ul>
          </div>

          <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-emerald-500 text-xs font-mono uppercase tracking-tighter">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              All Systems Operational
            </div>
            <h5 className="text-slate-300 text-xs font-semibold uppercase">Lagos Datacenter: NGP-01</h5>
            <div className="pt-4 border-t border-slate-800">
              <button className="flex items-center justify-between w-full text-blue-400 text-xs font-bold group hover:text-blue-300 transition-colors">
                NETWORK STATUS 
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6 text-xs text-slate-600 font-mono">
            <span>© {currentYear} KoboTrack Systems</span>
            <span className="hidden md:inline">|</span>
            <span className="flex items-center gap-1.5">
              <Globe size={12} /> NGA_LOCALE
            </span>
          </div>
          
          <div className="flex items-center gap-4 px-4 py-2 bg-slate-900/30 rounded-full border border-slate-800">
            <ShieldCheck className="text-blue-500 size-4" />
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Secure System
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link 
        href={href} 
        className="text-slate-500 hover:text-blue-400 text-sm transition-colors flex items-center gap-1 group"
      >
        {children}
      </Link>
    </li>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a 
      href={href} 
      className="bg-slate-900 text-slate-400 p-2 rounded hover:bg-blue-600 hover:text-white transition-all border border-slate-800"
    >
      {icon}
    </a>
  );
}

export default Footer;