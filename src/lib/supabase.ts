import { createClient } from '@supabase/supabase-js';

// ─────────────────────────────────────────────
// Public client — safe to use in React components
// (uses anon key, respects Row Level Security)
// ─────────────────────────────────────────────
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─────────────────────────────────────────────
// Admin / service-role client — server-side only
// (bypasses RLS — never expose to the browser)
// ─────────────────────────────────────────────
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
