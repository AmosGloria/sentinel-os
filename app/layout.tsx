import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from '@/context/AuthContext';
import { AgentProvider } from '@/context/AgentContext';
import Script from 'next/script'; // Import Script
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
  title: "KoboTrack",
  description: "Your Autonomous OPs",
  icons: {
    icon: "/Images/logo.png",
    apple: "/Images/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <AgentProvider>
            {children}
          </AgentProvider>
        </AuthProvider>
        <Script 
          src="https://connect.withmono.com/connect.js" 
          strategy="afterInteractive" 
        />
      </body>
    </html>
  );
}