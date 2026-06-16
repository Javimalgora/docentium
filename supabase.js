// ============================================
// DOCENTIUM — Supabase Config
// ============================================
// Cuando tengas las credenciales de Supabase,
// reemplaza los valores de abajo:
// https://app.supabase.com → Settings → API
// ============================================

const SUPABASE_URL = '';
const SUPABASE_ANON_KEY = '';

// Crear cliente Supabase solo si hay credenciales
let sb = null;
try {
  if (SUPABASE_URL && SUPABASE_ANON_KEY && typeof supabase !== 'undefined') {
    sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
} catch(e) {
  console.log('Supabase no configurado - modo demo activo');
}
