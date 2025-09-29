 import  {createClient} from '@supabase/supabase-js'
  

 const supabaseUrl = "https://dwhgpetflesknntcygwc.supabase.co"
 const SupabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3aGdwZXRmbGVza25udGN5Z3djIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2Mzk2OTYsImV4cCI6MjA3MzIxNTY5Nn0.UjE5dlBptqvetszTl-WAIwR5NFM54yDfGrQDSbT_kew"



 export const supabase = createClient(supabaseUrl, SupabaseKey)