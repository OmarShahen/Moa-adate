import { createClient } from '@supabase/supabase-js'

// Replace with your Supabase project credentials
const SUPABASE_URL = "https://spzgjhtrszuxucjfguth.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwemdqaHRyc3p1eHVjamZndXRoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MjYwNjE3OSwiZXhwIjoyMDU4MTgyMTc5fQ.wKhPMjTeeN61ujtdGrQPQ3OEJiKidh1iBvFFBUIXUNs"

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
