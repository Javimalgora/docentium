# Docentium 🎓

**La plataforma de empleo educativo con IA**

---

## 🚀 Deploy en 30 minutos (todo gratis)

### Paso 1 — GitHub
1. Ve a [github.com](https://github.com) → New repository
2. Nombre: `docentium`
3. Sube estos 5 archivos: `index.html`, `style.css`, `app.js`, `supabase.js`, `vercel.json`

### Paso 2 — Supabase (base de datos + auth)
1. Ve a [app.supabase.com](https://app.supabase.com) → New project
2. Nombre: `docentium`, elige región `West EU (Ireland)`
3. Ve a **SQL Editor** y ejecuta el SQL que está comentado en `supabase.js`
4. Ve a **Settings → API** y copia:
   - `Project URL`
   - `anon public key`
5. Pégalos en `supabase.js` reemplazando `TU_SUPABASE_URL` y `TU_SUPABASE_ANON_KEY`
6. Para Google Login: **Authentication → Providers → Google** → actívalo
   - Necesitas crear credenciales en [console.cloud.google.com](https://console.cloud.google.com)

### Paso 3 — Vercel (deploy automático)
1. Ve a [vercel.com](https://vercel.com) → Sign up with GitHub
2. "Import Project" → selecciona tu repo `docentium`
3. Deploy → ¡listo! Tendrás una URL tipo `docentium.vercel.app`

### Paso 4 — Dominio docentium.es
1. En Vercel → tu proyecto → Settings → Domains
2. Añade `docentium.es`
3. En DonDominio → gestión DNS → añade los registros que te indica Vercel
4. En ~24h estará activo

---

## 📁 Estructura del proyecto

```
docentium/
├── index.html      # HTML principal
├── style.css       # Todos los estilos
├── app.js          # Lógica de la app y pantallas
├── supabase.js     # Config de base de datos + schema SQL
└── vercel.json     # Config de deploy
```

---

## ✨ Funcionalidades del MVP

- **Pantalla de inicio** con split docente/centro
- **Listado de ofertas** con filtros y buscador
- **Detalle de oferta** con análisis IA
- **Registro de docentes** con generador de bio por IA
- **Login** con email o Google
- **Panel de centros** con candidatos rankeados por IA
- **Publicar oferta** con descripción generada por IA

---

## 🔮 Próximas funcionalidades

- [ ] Matching real con IA (Claude API)
- [ ] Alertas por email de nuevas ofertas
- [ ] Subida de CV en PDF
- [ ] Chat entre centro y docente
- [ ] Perfil público del docente
- [ ] Panel analytics para centros
- [ ] App móvil (PWA)

---

## 💡 Stack

- **Frontend**: HTML + CSS + JS vanilla (sin frameworks, carga instantánea)
- **Base de datos**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth + Google OAuth
- **Deploy**: Vercel
- **IA**: Claude API (próximamente conectada)
- **Dominio**: DonDominio

---

Construido con ❤️ para el mundo de la educación
