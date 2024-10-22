import {createClient} from "@supabase/supabase-js"; // Importa il componente

const supabaseUrl = "https://uwwvcnrzsymmlbdstena.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3d3ZjbnJ6c3ltbWxiZHN0ZW5hIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyOTYzMDUxMCwiZXhwIjoyMDQ1MjA2NTEwfQ.NgVh3gRZteWiLppp9WYYdsLQlsybFJtCuAoXPpK_o8s"
const supabase = createClient(supabaseUrl, supabaseKey)

export function useDb() {
    return supabase;
}