import { createClient } from '@supabase/supabase-js'
import { env } from '../config/env.js'

// Inicializa cliente administrativo de Supabase para operaciones de servidor.

// Cliente de servidor con service role para operaciones administrativas en BD.
export const supabaseAdmin = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
})
