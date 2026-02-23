import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

dotenv.config({ override: true })

const url = process.env.SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
const table = process.env.SUPABASE_FORMS_TABLE || 'affiliation_forms'

const client = createClient(url, key, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
})

const { data, error } = await client
  .from(table)
  .insert({ status: 'draft', data: { prueba: 'direct-node' } })
  .select('*')
  .single()

if (error) {
  console.error('HAS_ERROR=true')
  console.error(error)
  process.exit(1)
}

console.log('HAS_ERROR=false')
console.log('OK_ID=', data.id)
