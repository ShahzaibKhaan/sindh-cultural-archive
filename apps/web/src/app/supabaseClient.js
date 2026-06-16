import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fxvrpyhknfaxvrwekdet.supabase.co'

// ⚠️ Apne Supabase Dashboard -> Project Settings -> API se 'anon public' wali key copy karke direct yahan paste karein
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4dnJweWhrbmZheHZyd2VrZGV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1ODg4MTMsImV4cCI6MjA5NzE2NDgxM30.BQvRpOmZrPvokYVx_eE5DAOheoRvWOMT7jsqor2ne9A'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)