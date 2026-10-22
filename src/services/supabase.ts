import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const hasUsableCredentials = (() => {
  if (!supabaseUrl || !supabaseAnonKey || supabaseAnonKey === 'your-supabase-anon-key') return false;
  try {
    const url = new URL(supabaseUrl);
    return (url.protocol === 'https:' || url.protocol === 'http:') &&
      !url.hostname.startsWith('your-project.');
  } catch {
    return false;
  }
})();

export const supabaseConfigured = hasUsableCredentials;
export const supabase = supabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    })
  : null;
