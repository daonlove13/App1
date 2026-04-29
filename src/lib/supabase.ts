import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://dpedlqyzszmsovjyvwou.supabase.co"
const SUPABASE_ANON_KEY = "sb_publishable_Fqj59iomK4EVZuM5SW5vQA__nmOz_Qe"

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
