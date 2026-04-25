import { NextResponse } from 'next/server';
import { createClient } from '@/lib/services/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');

  if (error) {
    console.error('Auth error:', error, errorDescription);
    return NextResponse.redirect(`${origin}/auth?error=${error}`);
  }

  if (code) {
    const supabase = await createClient();
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (!exchangeError) {
      // Determine whether this is a first-time signup or a returning login.
      // We do this by checking whether the user already has a completed
      // onboarding profile in the database.
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from('sme_profiles')
          .select('onboarding_completed')
          .eq('user_id', user.id)
          .maybeSingle();

        const hasCompletedOnboarding = profile?.onboarding_completed === true;

        // First-time user → onboarding; returning user → dashboard
        const destination = hasCompletedOnboarding ? '/dashboard' : '/onboarding';
        return NextResponse.redirect(`${origin}${destination}`);
      }

      // Fallback if user lookup fails unexpectedly
      return NextResponse.redirect(`${origin}/dashboard`);
    } else {
      console.error('Session exchange error:', exchangeError);
    }
  }

  return NextResponse.redirect(`${origin}/auth?error=auth-code-exchange-failed`);
}