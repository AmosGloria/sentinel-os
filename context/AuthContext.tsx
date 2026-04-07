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
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  const loginWithProvider = async (provider: 'google' | 'azure') => {
    setLoadingProvider(provider);
    try {
      const options: any = {
        redirectTo: `${window.location.origin}/auth/callback`,
        scopes: 'openid email profile',
      };

      if (provider === 'google') {
        options.queryParams = { 
          prompt: 'select_account', 
          access_type: 'offline' 
        };
      }

      if (provider === 'azure') {
        options.queryParams = { 
          prompt: 'select_account',
        };
      }

      const { data, error } = await supabase.auth.signInWithOAuth({ 
        provider, 
        options 
      });

      if (error) {
        console.error(`${provider} OAuth error:`, error);
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

  return (
    <AuthContext.Provider value={{ user, loading, loadingProvider, loginWithProvider, logout }}>
      {!loading ? children : (
        <div className="flex items-center justify-center min-h-screen bg-slate-950 text-blue-400 font-mono">
          INITIALIZING_SENTINEL_UPLINK...
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);