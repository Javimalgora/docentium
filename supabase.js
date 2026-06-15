// ============================================
// DOCENTIUM — Supabase Config
// ============================================
// Reemplaza estos valores con los tuyos de:
// https://app.supabase.com → Settings → API
// ============================================

const SUPABASE_URL = 'TU_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'TU_SUPABASE_ANON_KEY';

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================
// SCHEMA SQL — ejecuta esto en Supabase SQL Editor
// ============================================
/*

-- Perfiles de docentes
CREATE TABLE docentes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  nombre TEXT NOT NULL,
  apellidos TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  bio TEXT,
  materias TEXT[],
  comunidad TEXT,
  disponibilidad TEXT,
  experiencia_anos INTEGER DEFAULT 0,
  cv_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Centros educativos
CREATE TABLE centros (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  nombre TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  ciudad TEXT,
  tipo TEXT, -- publico, concertado, privado
  web TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Ofertas de empleo
CREATE TABLE ofertas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  centro_id UUID REFERENCES centros(id),
  titulo TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  tipo_jornada TEXT,
  etapa TEXT,
  ciudad TEXT,
  salario TEXT,
  incorporacion TEXT,
  requisitos TEXT,
  activa BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Candidaturas
CREATE TABLE candidaturas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  docente_id UUID REFERENCES docentes(id),
  oferta_id UUID REFERENCES ofertas(id),
  mensaje TEXT,
  estado TEXT DEFAULT 'pendiente',
  match_score INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(docente_id, oferta_id)
);

-- Row Level Security
ALTER TABLE docentes ENABLE ROW LEVEL SECURITY;
ALTER TABLE centros ENABLE ROW LEVEL SECURITY;
ALTER TABLE ofertas ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidaturas ENABLE ROW LEVEL SECURITY;

-- Políticas básicas
CREATE POLICY "Ofertas públicas" ON ofertas FOR SELECT USING (activa = TRUE);
CREATE POLICY "Docentes ven su perfil" ON docentes FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Centros ven su perfil" ON centros FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Candidaturas propias" ON candidaturas FOR ALL USING (
  docente_id IN (SELECT id FROM docentes WHERE user_id = auth.uid())
);

*/
