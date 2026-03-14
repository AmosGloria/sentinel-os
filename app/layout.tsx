import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from '@/context/AuthContext';
import { AgentProvider } from '@/context/AgentContext';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sentinel-OS",
  description: "Your Autonomous OPs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* AuthProvider must be the TOP level wrapper */}
        <AuthProvider>
          <AgentProvider>
            {children}
          </AgentProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
