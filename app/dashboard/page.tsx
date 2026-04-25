"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Plus, 
  ShieldAlert, 
  LogOut, 
  Settings, 
  User, 
  Activity,
  CreditCard
} from "lucide-react";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  
  // Local state for checking bank connection (In Task 3, this will come from Supabase)
  const [hasLinkedBank, setHasLinkedBank] = useState(false);

  useEffect(() => {
    if (!user) router.push("/auth");
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* SIDEBAR */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col p-6 fixed h-full">
        <div className="mb-12 px-2">
          <h2 className="text-xl font-black tracking-tight text-blue-600 flex items-center gap-2">
            <Activity size={24} /> Sentinel-OS
          </h2>
        </div>

        <nav className="flex-1 space-y-1">
          <SidebarLink icon={<LayoutDashboard size={18}/>} label="Overview" active />
          <SidebarLink icon={<CreditCard size={18}/>} label="Bank Accounts" />
          <SidebarLink icon={<User size={18}/>} label="Business Profile" />
          <SidebarLink icon={<Settings size={18}/>} label="Settings" />
        </nav>

        {/* User Footer in Sidebar */}
        <div className="pt-6 border-t border-slate-100">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="size-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-xs">
              {user.email?.[0].toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-[#0F172A] truncate">{user.email}</p>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Operator</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-72 p-12">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-[#0F172A]">Terminal Overview</h1>
            <p className="text-slate-500 font-medium">Real-time financial integrity monitoring.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 bg-green-50 border border-green-100 rounded-full flex items-center gap-2">
              <div className="size-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold text-green-600 uppercase">System Live</span>
            </div>
          </div>
        </header>

        {!hasLinkedBank ? (
          <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2rem] p-20 flex flex-col items-center text-center space-y-6 shadow-sm">
            <div className="size-16 bg-blue-50 rounded-2xl flex items-center justify-center">
              <ShieldAlert className="text-blue-600" size={32} />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-black tracking-tight text-[#0F172A]">Connect Bank to Unlock Your Sentinel Score</h3>
              <p className="text-slate-500 max-w-sm mx-auto font-medium">
                We need direct-ledger access to verify your business and generate your high-fidelity financial resume.
              </p>
            </div>
            <Link href="/dashboard/connect">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-[#0F172A] transition-all shadow-lg shadow-blue-100 cursor-pointer">
                <Plus size={18} /> Connect Bank Account
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-[#0F172A] p-8 rounded-3xl text-white">
               <p className="text-slate-400 text-xs font-bold uppercase mb-4 tracking-widest">Sentinel Score</p>
               <h4 className="text-5xl font-black">742</h4>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function SidebarLink({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <div className={`
      flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer
      ${active ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50 hover:text-[#0F172A]'}
    `}>
      {icon}
      {label}
    </div>
  );
}