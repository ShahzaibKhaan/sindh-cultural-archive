import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fxvrpyhknfaxvrwekdet.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4dnJweWhrbmZheHZyd2VrZGV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1ODg4MTMsImV4cCI6MjA5NzE2NDgxM30.BQvRpOmPKANcJ1mEqTfLd5VK8H9JK2sX8y3zD4qR5E8';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
