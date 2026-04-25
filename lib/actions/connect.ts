"use server";

import { createClient } from "@/lib/services/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

function getAdminClient() {
  return createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SERVICE_ROLE_KEY!
  );
}

export async function exchangeCode(code: string) {
    const response = await fetch("https://api.withmono.com/v2/accounts/auth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "mono-sec-key": process.env.MONO_SECRET_KEY!,
        },
        body: JSON.stringify({ code }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to exchange Mono code");
    }

    const monoAccountId = data.id;

    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        throw new Error("User not authenticated");
    }

    const admin = getAdminClient();
    const { error: upsertError } = await admin
        .from("profiles")
        .upsert({ id: user.id, mono_account_id: monoAccountId }, { onConflict: "id" });

    if (upsertError) {
        throw new Error(upsertError.message);
    }

    return monoAccountId;
}

export async function getLinkedAccount(): Promise<{ monoAccountId: string | null }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { monoAccountId: null };

  const { data } = await supabase
    .from("profiles")
    .select("mono_account_id")
    .eq("id", user.id)
    .single();

  return { monoAccountId: data?.mono_account_id ?? null };
}

export async function getAccountDetails(monoAccountId: string) {
  const [accountRes, transactionsRes] = await Promise.all([
    fetch(`https://api.withmono.com/v2/accounts/${monoAccountId}`, {
      headers: { "mono-sec-key": process.env.MONO_SECRET_KEY! },
    }),
    fetch(`https://api.withmono.com/v2/accounts/${monoAccountId}/transactions?paginate=false`, {
      headers: { "mono-sec-key": process.env.MONO_SECRET_KEY! },
    }),
  ]);

  const account = accountRes.ok ? await accountRes.json() : null;
  const txData = transactionsRes.ok ? await transactionsRes.json() : null;

  return {
    account: account?.data ?? null,
    transactions: txData?.data ?? [],
  };
}