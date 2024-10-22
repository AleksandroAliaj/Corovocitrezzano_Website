import {createClient} from "@supabase/supabase-js"; // Importa il componente

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export function useDb() {
    return supabase;
}