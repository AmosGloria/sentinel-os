import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');
  
  // if "next" is in search params, use it as the redirection URL
  const next = searchParams.get('next') ?? '/dashboard';

  // Handle error from OAuth provider
  if (error) {
    console.error('Auth error:', error, errorDescription);
    return NextResponse.redirect(`${origin}/auth?error=${error}`);
  }

  if (code) {
    const supabase = await createClient();
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!exchangeError) {
      return NextResponse.redirect(`${origin}${next}`);
    } else {
      console.error('Session exchange error:', exchangeError);
    }
  }

  // If something goes wrong, return the user to an error page or login
  return NextResponse.redirect(`${origin}/auth?error=auth-code-exchange-failed`);
}