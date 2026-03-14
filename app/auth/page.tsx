"use client";
import { useAuth } from "@/context/AuthContext";

export default function AuthPage() {
  const { loginWithProvider } = useAuth();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-slate-100">
        <h2 className="text-2xl font-bold text-center mb-8">Join Sentinel-OS</h2>
        
        <div className="space-y-4">
          <button onClick={() => loginWithProvider('azure')} className="w-full flex items-center justify-center gap-3 border p-3 rounded-lg hover:bg-slate-50 transition">
            <img src="/Images/microsoft-icon.svg" className="w-5 h-5" alt="MS" />
            Continue with Microsoft
          </button>

          <button onClick={() => loginWithProvider('google')} className="w-full flex items-center justify-center gap-3 border p-3 rounded-lg hover:bg-slate-50 transition">
            <img src="/Images/google-icon.svg" className="w-5 h-5" alt="G" />
            Continue with Google
          </button>

          <div className="relative my-6 text-center text-slate-400 text-sm">
            <span className="bg-white px-2 z-10 relative">Or use email</span>
            <hr className="absolute top-1/2 w-full border-slate-200" />
          </div>

          <input type="email" placeholder="Email address" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          <button className="w-full bg-slate-900 text-white p-3 rounded-lg font-bold hover:bg-black transition">
            Sign Up with Email
          </button>
        </div>
      </div>
    </div>
  );
}