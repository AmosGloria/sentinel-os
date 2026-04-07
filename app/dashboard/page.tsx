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
    <div>
      <div>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🛡️</div>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: 8 }}>
          Welcome to Sentinel-OS
        </h1>
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
