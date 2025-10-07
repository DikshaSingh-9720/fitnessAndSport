import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseConfigErrorMessage =
  'Supabase environment variables are not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable authentication features.';

const createDisabledSupabase = (): SupabaseClient => {
  const error = new Error(supabaseConfigErrorMessage);
  const subscription = {
    id: 'supabase-disabled',
    callback: () => {},
    unsubscribe: () => {},
  };

  return {
    auth: {
      async getSession() {
        return { data: { session: null }, error: null };
      },
      async signInWithOtp() {
        return { data: null, error };
      },
      async signOut() {
        return { error };
      },
      onAuthStateChange() {
        return { data: { subscription }, error: null };
      },
    },
  } as unknown as SupabaseClient;
};

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.warn(supabaseConfigErrorMessage);
}

export const supabase: SupabaseClient = isSupabaseConfigured
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : createDisabledSupabase();