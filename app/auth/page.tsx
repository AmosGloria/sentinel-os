"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-9 20-20c0-1.3-.1-2.7-.4-3.9z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2A12 12 0 0124 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3a12 12 0 01-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.7-.4-3.9z" />
    </svg>
  );
}

function MicrosoftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 21 21" aria-hidden="true">
      <rect x="1" y="1" width="9" height="9" fill="#f25022" />
      <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
      <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
      <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z" fill="url(#sg)" />
      <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <linearGradient id="sg" x1="3" y1="2" x2="21" y2="23.25" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366f1" /><stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function Spinner({ color = "currentColor" }: { color?: string }) {
  return (
    <svg
      style={{ animation: "spin .75s linear infinite", flexShrink: 0 }}
      width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"
    >
      <circle style={{ opacity: 0.2 }} cx="12" cy="12" r="10" stroke={color} strokeWidth="3" />
      <path style={{ opacity: 0.9 }} fill={color} d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z" />
    </svg>
  );
}

const ERRORS: Record<string, string> = {
  "auth-code-exchange-failed": "Authentication failed. Please try again.",
  access_denied:               "Access was denied. Please allow the required permissions.",
  server_error:                "A server error occurred. Please try again later.",
  temporarily_unavailable:    "The sign-in service is temporarily unavailable.",
};

function AuthPageInner() {
  const { loginWithProvider, loadingProvider } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlError = searchParams.get("error");
  const errorMsg = urlError ? (ERRORS[urlError] ?? "An unexpected error occurred.") : null;

  const busy = loadingProvider !== null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body { background: #080810; }

        /* ── layout ── */
        .sa-root {
          min-height: 100vh;
          background: #080810;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Inter', system-ui, sans-serif;
          position: relative; overflow: hidden; padding: 1rem;
        }
        .sa-root::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(99,102,241,.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,.07) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: gridPan 30s linear infinite;
          pointer-events: none;
        }
        @keyframes gridPan { to { background-position: 40px 40px; } }

        .blob {
          position: absolute; border-radius: 50%;
          filter: blur(100px); opacity: .18;
          animation: blobF 10s ease-in-out infinite alternate;
          pointer-events: none;
        }
        .blob-1 { width:500px; height:500px; background: radial-gradient(circle,#6366f1,transparent 70%); top:-100px; left:-100px; }
        .blob-2 { width:400px; height:400px; background: radial-gradient(circle,#8b5cf6,transparent 70%); bottom:-80px; right:-80px; animation-delay:-4s; }
        @keyframes blobF { to { transform: translate(30px,20px) scale(1.08); } }

        /* ── card ── */
        .sa-card {
          position: relative; z-index: 10;
          width: 100%; max-width: 420px;
          background: rgba(15,15,30,.9);
          border: 1px solid rgba(99,102,241,.22);
          border-radius: 20px;
          padding: 2.5rem 2.25rem 2rem;
          backdrop-filter: blur(24px);
          box-shadow:
            0 0 0 1px rgba(255,255,255,.03) inset,
            0 32px 80px rgba(0,0,0,.65),
            0 0 60px rgba(99,102,241,.09);
          animation: cardIn .4s cubic-bezier(.34,1.5,.64,1) both;
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(24px) scale(.97); }
          to   { opacity: 1; transform: none; }
        }

        /* ── branding ── */
        .sa-logo { display:flex; align-items:center; gap:10px; margin-bottom:1.5rem; }
        .sa-logo-text { font-size:1.1rem; font-weight:700; color:#e2e8ff; letter-spacing:.02em; }
        .sa-badge {
          font-size:.6rem; font-weight:600; color:#818cf8;
          background:rgba(99,102,241,.12); border:1px solid rgba(99,102,241,.3);
          border-radius:4px; padding:1px 5px; letter-spacing:.08em; text-transform:uppercase;
        }
        .sa-title    { font-size:1.6rem; font-weight:800; color:#f1f5ff; letter-spacing:-.02em; line-height:1.2; margin-bottom:.4rem; }
        .sa-subtitle { font-size:.875rem; color:#64748b; line-height:1.55; margin-bottom:2rem; }

        /* ── error banner ── */
        .sa-error {
          display:flex; align-items:flex-start; gap:10px;
          background:rgba(239,68,68,.08); border:1px solid rgba(239,68,68,.25);
          border-radius:10px; padding:12px 14px; margin-bottom:1.25rem;
          color:#f87171; font-size:.8125rem; line-height:1.5;
          animation: fadeDown .3s ease;
        }
        @keyframes fadeDown { from { opacity:0; transform:translateY(-6px); } to { opacity:1; } }

        /* ── provider buttons ── */
        .sa-btn {
          width: 100%;
          display: flex; align-items: center; justify-content: center; gap: 12px;
          padding: 13px 20px;
          border-radius: 12px;
          font-family: 'Inter', sans-serif;
          font-size: .9rem; font-weight: 600;
          cursor: pointer;
          border: none;
          transition: transform .15s ease, box-shadow .15s ease, opacity .15s ease;
          position: relative;
          overflow: hidden;
        }
        .sa-btn:disabled { cursor: not-allowed; opacity: .55; }
        .sa-btn:not(:disabled):active { transform: scale(.98); }

        /* Google */
        .sa-btn-google {
          background: #ffffff;
          color: #1f1f1f;
          box-shadow: 0 1px 3px rgba(0,0,0,.2), 0 4px 12px rgba(0,0,0,.15);
          margin-bottom: 12px;
        }
        .sa-btn-google:not(:disabled):hover {
          box-shadow: 0 2px 6px rgba(0,0,0,.25), 0 6px 20px rgba(0,0,0,.2);
          transform: translateY(-1px);
        }
        .sa-btn-google.sa-loading {
          animation: pulse 1.5s ease-in-out infinite;
        }

        /* Microsoft */
        .sa-btn-ms {
          background: rgba(255,255,255,.06);
          color: #e2e8ff;
          border: 1px solid rgba(255,255,255,.1);
          box-shadow: 0 2px 8px rgba(0,0,0,.2);
        }
        .sa-btn-ms:not(:disabled):hover {
          background: rgba(255,255,255,.11);
          border-color: rgba(255,255,255,.2);
          box-shadow: 0 4px 16px rgba(0,0,0,.3);
          transform: translateY(-1px);
        }
        .sa-btn-ms.sa-loading { animation: pulse 1.5s ease-in-out infinite; }

        @keyframes pulse { 50% { opacity: .65; } }
        @keyframes spin   { to { transform: rotate(360deg); } }

        /* ── divider ── */
        .sa-divider {
          display: flex; align-items: center; gap: 12px;
          margin: 1.25rem 0;
        }
        .sa-divider hr { flex:1; border:none; border-top:1px solid rgba(255,255,255,.07); }
        .sa-divider span {
          font-size: .72rem; color: #475569; font-weight: 500;
          letter-spacing: .04em; text-transform: uppercase; white-space: nowrap;
        }

        /* ── email ── */
        .sa-input {
          width: 100%;
          padding: 12px 16px; border-radius: 10px;
          background: rgba(255,255,255,.04);
          border: 1px solid rgba(255,255,255,.08);
          color: #e2e8ff; font-size: .9rem; font-family: 'Inter', sans-serif;
          outline: none;
          transition: border-color .2s, box-shadow .2s;
          margin-bottom: 10px;
        }
        .sa-input::placeholder { color: #475569; }
        .sa-input:focus { border-color: rgba(99,102,241,.5); box-shadow: 0 0 0 3px rgba(99,102,241,.12); }
        .sa-input:disabled { opacity: .5; cursor: not-allowed; }

        .sa-btn-email {
          width: 100%; padding: 12px 20px; border-radius: 10px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: #fff; font-size: .9rem; font-weight: 700;
          border: none; cursor: pointer; letter-spacing: .02em;
          font-family: 'Inter', sans-serif;
          box-shadow: 0 4px 15px rgba(99,102,241,.3);
          transition: all .2s ease;
        }
        .sa-btn-email:hover:not(:disabled) {
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          box-shadow: 0 6px 20px rgba(99,102,241,.4);
          transform: translateY(-1px);
        }
        .sa-btn-email:disabled { opacity:.5; cursor:not-allowed; transform:none; }

        /* ── footer ── */
        .sa-footer {
          margin-top: 1.5rem; text-align: center;
          font-size: .73rem; color: #334155; line-height: 1.8;
        }
        .sa-footer a { color: #6366f1; text-decoration: none; }
        .sa-footer a:hover { text-decoration: underline; }
        .sa-dot {
          display: inline-block; width: 6px; height: 6px; border-radius: 50%;
          background: #22c55e; margin-right: 6px; vertical-align: middle;
          box-shadow: 0 0 6px #22c55e;
          animation: livePulse 2s ease-in-out infinite;
        }
        @keyframes livePulse { 50% { opacity: .4; box-shadow: 0 0 2px #22c55e; } }
      `}</style>

      <div className="sa-root">
        <div className="blob blob-1" />
        <div className="blob blob-2" />

        <div className="sa-card">
          <div className="sa-logo">
            <span className="sa-logo-text">KoboTrack</span>
          </div>

          {errorMsg && (
            <div className="sa-error" role="alert">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 1 }} aria-hidden="true">
                <circle cx="12" cy="12" r="10" stroke="#f87171" strokeWidth="2" />
                <path d="M12 8v4M12 16h.01" stroke="#f87171" strokeWidth="2" strokeLinecap="round" />
              </svg>
              {errorMsg}
            </div>
          )}

          <button
            id="btn-google-signin"
            className={`sa-btn sa-btn-google${loadingProvider === "google" ? " sa-loading" : ""}`}
            onClick={() => loginWithProvider("google")}
            disabled={busy}
            type="button"
          >
            {loadingProvider === "google"
              ? <Spinner color="#1f1f1f" />
              : <GoogleIcon />}
            {loadingProvider === "google"
              ? "Opening account chooser…"
              : "Continue with Google"}
          </button>

          <button
            id="btn-microsoft-signin"
            className={`sa-btn sa-btn-ms${loadingProvider === "azure" ? " sa-loading" : ""}`}
            onClick={() => loginWithProvider("azure")}
            disabled={busy}
            type="button"
          >
            {loadingProvider === "azure" ? <Spinner /> : <MicrosoftIcon />}
            {loadingProvider === "azure" ? "Redirecting to Microsoft…" : "Continue with Microsoft"}
          </button>

          <div className="sa-divider">
            <hr /><span>or use email</span><hr />
          </div>

          <input
            id="input-email"
            type="email"
            placeholder="your@email.com"
            className="sa-input"
            autoComplete="email"
            disabled={busy}
          />
          <button
            id="btn-email-signin"
            className="sa-btn-email"
            type="button"
            disabled={busy}
          >
            Continue with Email
          </button>

          <div className="sa-footer">
            <span className="sa-dot" />
            All systems operational &nbsp;·&nbsp;{" "}
            <a href="#">Privacy Policy</a>&nbsp;·&nbsp;<a href="#">Terms</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default function AuthPage() {
  return (
    <Suspense>
      <AuthPageInner />
    </Suspense>
  );
}