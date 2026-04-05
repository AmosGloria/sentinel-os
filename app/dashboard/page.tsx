"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/auth");
  }, [user, router]);

  if (!user) return null;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080810",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Inter', system-ui, sans-serif",
      color: "#e2e8ff",
    }}>
      <div style={{
        background: "rgba(15,15,30,.88)",
        border: "1px solid rgba(99,102,241,.2)",
        borderRadius: 20,
        padding: "2.5rem",
        maxWidth: 480,
        width: "100%",
        textAlign: "center",
        boxShadow: "0 32px 80px rgba(0,0,0,.6)",
      }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🛡️</div>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: 8 }}>
          Welcome to Sentinel-OS
        </h1>
        <p style={{ color: "#64748b", fontSize: ".9rem", marginBottom: 24 }}>
          Signed in as <strong style={{ color: "#a5b4fc" }}>{user.email}</strong>
        </p>
        <button
          onClick={logout}
          style={{
            background: "rgba(239,68,68,.1)",
            border: "1px solid rgba(239,68,68,.25)",
            color: "#f87171",
            padding: "10px 24px",
            borderRadius: 10,
            cursor: "pointer",
            fontWeight: 600,
            fontSize: ".875rem",
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
