// @/lib/actions/onboarding.ts
"use server";
import { createClient } from "../services/supabase/server";
import { redirect } from "next/navigation";

export async function completeOnboarding(prevState: any, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/auth");

  const businessName = formData.get("businessName") as string;
  const industry = formData.get("industry") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;

  const { data: existingProfile } = await supabase
    .from("sme_profiles")
    .select("user_id")
    .eq("user_id", user.id)
    .single();

  if (existingProfile) {
    return { error: "A business profile already exists for this account. Redirecting..." };
  }

  const { error } = await supabase
    .from("sme_profiles")
    .insert({
      user_id: user.id,
      first_name: firstName,
      last_name: lastName,
      business_name: businessName,
      industry: industry,
      onboarding_completed: true,
    });

  if (error) return { error: "Database synchronization failed. Please try again." };

  redirect("/dashboard");
}