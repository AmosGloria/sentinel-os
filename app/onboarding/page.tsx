"use client";
import React, { useActionState } from "react";
import { completeOnboarding } from "@/lib/actions/onboarding";
import { AlertCircle, Loader2 } from "lucide-react";

const INDUSTRIES = [
  { label: "Agriculture & Agro-allied", value: "agriculture" },
  { label: "Retail & E-commerce", value: "retail" },
  { label: "Manufacturing & Production", value: "manufacturing" },
  { label: "Technology & Software", value: "tech" },
  { label: "Professional Services", value: "services" },
  { label: "Hospitality & Tourism", value: "hospitality" },
  { label: "Healthcare & Pharmaceuticals", value: "healthcare" },
  { label: "Construction & Real Estate", value: "construction" },
  { label: "Education & Training", value: "education" },
  { label: "Logistics & Transportation", value: "logistics" },
] as const;

export default function OnboardingPage() {
  // state will catch the return object from our server action
  const [state, formAction, isPending] = useActionState(completeOnboarding, null);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tight text-[#0F172A]">Initialize Entity.</h1>
          <p className="text-slate-500 font-medium">Configure your business profile to start the audit.</p>
        </div>

        {/* Display Error Message if it exists */}
        {state?.error && (
          <div className="flex items-center gap-2 p-4 text-sm font-medium text-red-600 bg-red-50 border border-red-100 rounded-xl animate-in fade-in slide-in-from-top-1">
            <AlertCircle size={16} />
            {state.error}
          </div>
        )}

        <form action={formAction} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase text-slate-400 tracking-widest">First Name</label>
              <input 
                name="firstName" 
                required 
                disabled={isPending}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all disabled:opacity-50"
                placeholder="Faith"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase text-slate-400 tracking-widest">Last Name</label>
              <input 
                name="lastName" 
                required 
                disabled={isPending}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all disabled:opacity-50"
                placeholder="Okafor"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase text-slate-400 tracking-widest">Business Name</label>
            <input 
              name="businessName" 
              required 
              disabled={isPending}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all disabled:opacity-50"
              placeholder="e.g. Aladeen Bakery"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase text-slate-400 tracking-widest">Industry</label>
            <div className="relative">
              <select 
                name="industry" 
                required
                disabled={isPending}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none appearance-none cursor-pointer focus:border-blue-600 transition-colors disabled:opacity-50"
              >
                <option value="" disabled selected>Select your industry</option>
                {INDUSTRIES.map((industry) => (
                  <option key={industry.value} value={industry.value}>
                    {industry.label}
                  </option>
                ))}
              </select>
            
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isPending}
            className="w-full bg-[#0F172A] text-white py-4 rounded-xl font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-100/50 flex items-center justify-center gap-2 disabled:bg-slate-400"
          >
            {isPending ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Initializing...
              </>
            ) : (
              "Complete Setup"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}