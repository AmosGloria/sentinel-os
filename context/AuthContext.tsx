"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

const AuthContext = createContext<any>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [loadingProvider, setLoadingProvider] = useState<'google' | 'azure' | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  const loginWithProvider = async (provider: 'google' | 'azure') => {
    setLoadingProvider(provider);
    try {
      const options: {
        redirectTo: string;
        scopes?: string;
        queryParams?: Record<string, string>;
      } = {
        redirectTo: `${window.location.origin}/auth/callback`,
      };

      if (provider === 'google') {
        options.scopes = 'openid email profile';
        options.queryParams = { prompt: 'select_account', access_type: 'offline' };
      }

      const { data, error } = await supabase.auth.signInWithOAuth({ provider, options });

      if (error) {
        console.error('OAuth error:', error);
        setLoadingProvider(null);
        return;
      }

      if (data?.url) {
        window.location.href = data.url;
      }
 
    } catch (err) {
      console.error('Unexpected OAuth error:', err);
      setLoadingProvider(null);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const signInWithGoogleIdToken = async (idToken: string) => {
    const { error } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: idToken,
    });
    if (error) {
      console.error('signInWithIdToken error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, loadingProvider, loginWithProvider, signInWithGoogleIdToken, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);