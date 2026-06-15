// ============================================
// DOCENTIUM — app.js
// ============================================

// ---- DATOS DE DEMO (se reemplazarán por Supabase) ----
const DEMO_JOBS = [
  {
    id: 1, title: "Profesor/a de Matemáticas", school: "Colegio Bilingüe San Isidro",
    location: "Madrid", type: "Jornada completa", stage: "Secundaria",
    salary: "26.000€ - 30.000€", match: 97, date: "Hace 1 día",
    emoji: "📐", bg: "#E8EFF8", tags: ["Secundaria", "Bilingüe", "Inmediata"],
    desc: "Buscamos un/a docente apasionado/a por las Matemáticas para impartir clases en 3º y 4º de ESO. El centro apuesta por la metodología STEM y el aprendizaje basado en proyectos. Se valorará experiencia en entornos bilingües y dominio de herramientas digitales educativas como GeoGebra o Desmos.",
    candidatos: 12, cierre: 5
  },
  {
    id: 2, title: "Tutor/a de Primaria (2º ciclo)", school: "Academia Bright Minds",
    location: "Barcelona", type: "Media jornada", stage: "Primaria",
    salary: "18.000€ - 22.000€", match: 89, date: "Hace 2 días",
    emoji: "🌟", bg: "#FEF9E7", tags: ["Primaria", "Tarde", "Inglés"],
    desc: "Academia de refuerzo educativo busca tutor/a para grupos reducidos de 2º ciclo de primaria. Horario de tardes de 16h a 20h, de lunes a viernes. Metodología lúdica y personalizada. Buen ambiente de trabajo y posibilidad de ampliación de horas.",
    candidatos: 7, cierre: 8
  },
  {
    id: 3, title: "Profesor/a de Inglés — Cambridge", school: "British School of Valencia",
    location: "Valencia", type: "Jornada completa", stage: "Idiomas",
    salary: "28.000€ - 34.000€", match: 85, date: "Hace 3 días",
    emoji: "🇬🇧", bg: "#DCFCE7", tags: ["Bilingüe", "Cambridge", "Senior"],
    desc: "Centro británico acreditado busca docente nativo o con nivel C2 para impartir inglés según el currículo Cambridge. Experiencia demostrable en preparación de exámenes FCE/CAE. El puesto incluye coordinación con el departamento de idiomas y tutorización de alumnos internacionales.",
    candidatos: 21, cierre: 3
  },
  {
    id: 4, title: "Orientador/a Escolar", school: "IES Ramón y Cajal",
    location: "Zaragoza", type: "Jornada completa", stage: "Secundaria",
    salary: "24.000€ - 28.000€", match: 78, date: "Hace 5 días",
    emoji: "🧠", bg: "#EEF2FF", tags: ["Orientación", "Secundaria", "LOGSE"],
    desc: "Instituto busca orientador/a para el departamento de orientación. Funciones: atención psicopedagógica al alumnado, coordinación con familias y equipo docente, gestión de diversidad funcional y elaboración de adaptaciones curriculares.",
    candidatos: 5, cierre: 12
  },
  {
    id: 5, title: "Profesor/a de FP — Informática", school: "Centro FP Reto",
    location: "Sevilla", type: "Jornada completa", stage: "FP",
    salary: "27.000€ - 32.000€", match: 74, date: "Hace 6 días",
    emoji: "💻", bg: "#F0FDF4", tags: ["FP", "Informática", "DAW"],
    desc: "Centro de FP privado en expansión busca docente para impartir módulos de Desarrollo de Aplicaciones Web (DAW). Se valorará experiencia profesional en el sector y conocimientos de metodologías ágiles. Posibilidad de colaborar en el diseño del currículo.",
    candidatos: 9, cierre: 7
  }
];

const DEMO_CANDIDATES = [
  { name: "Ana García", role: "Matemáticas · 8 años exp.", match: 97, color: "#1B3A6B", initials: "AG" },
  { name: "Pedro Martínez", role: "Física y Química · 5 años exp.", match: 91, color: "#4CAF82", initials: "PM" },
  { name: "Laura Sánchez", role: "Matemáticas · 12 años exp.", match: 88, color: "#F5C842", initials: "LS", textColor: "#1B3A6B" },
  { name: "Miguel Torres", role: "Matemáticas · 3 años exp.", match: 79, color: "#4338CA", initials: "MT" },
];

// ---- STATE ----
let currentJob = null;
let skills = ["Matemáticas", "Física"];
let activeFilter = "todos";

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  showScreen('home');
});

// ---- ROUTING ----
function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const screen = document.getElementById('screen-' + name);
  if (screen) {
    screen.classList.add('active');
    window.scrollTo(0, 0);
  }
  if (name === 'jobs') renderJobs(DEMO_JOBS);
  if (name === 'school') renderCandidates();
}

// ---- RENDER HOME ----
function renderHome() {
  return `
    <nav>
      <div class="logo" onclick="showScreen('home')">Docen<span>tium</span></div>
      <div class="nav-links">
        <button class="btn btn-ghost" onclick="showScreen('login')">Iniciar sesión</button>
        <button class="btn btn-primary" onclick="showScreen('register')">Registrarse gratis</button>
      </div>
    </nav>

    <div class="hero">
      <div class="hero-side hero-left" onclick="showScreen('jobs')">
        <div class="hero-badge">✨ IA te ayuda a destacar</div>
        <div class="hero-icon">🎓</div>
        <h2 class="hero-title">Soy docente</h2>
        <p class="hero-sub">Encuentra tu próxima plaza, sustitución o proyecto educativo</p>
        <button class="btn btn-yellow btn-lg hero-cta">Ver ofertas de empleo</button>
      </div>
      <div class="hero-side hero-right" onclick="showScreen('school')">
        <div class="hero-badge">✨ Oferta generada con IA</div>
        <div class="hero-icon">🏫</div>
        <h2 class="hero-title">Soy un centro</h2>
        <p class="hero-sub">Publica una oferta y accede a los mejores docentes en minutos</p>
        <button class="btn btn-primary btn-lg hero-cta">Publicar oferta</button>
      </div>
    </div>

    <div class="ai-section">
      <div class="ai-header"><div class="ai-dot"></div><span>Asistente Docentium IA</span></div>
      <p class="ai-message">¡Hola! Soy tu asistente de empleo educativo. Puedo ayudarte a encontrar oportunidades, preparar tu perfil o publicar una oferta en segundos. ¿Qué necesitas?</p>
      <div class="ai-suggestions">
        <button class="ai-suggestion" onclick="showScreen('jobs')">🔍 Ver ofertas activas</button>
        <button class="ai-suggestion" onclick="showScreen('register')">📋 Crear mi perfil docente</button>
        <button class="ai-suggestion" onclick="showScreen('oferta')">📢 Publicar oferta rápida</button>
      </div>
    </div>

    <div style="padding: 40px 32px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; max-width: 860px; margin: 0 auto;">
      ${[
        { icon: '⚡', title: 'Inscripción en 60 segundos', desc: 'Sin formularios eternos. Importa tu LinkedIn y listo.' },
        { icon: '🤖', title: 'Match inteligente con IA', desc: 'Conectamos tu perfil con las ofertas que más encajan.' },
        { icon: '🏫', title: 'Solo sector educativo', desc: 'Nada de ruido. Solo centros, academias y docentes.' }
      ].map(f => `
        <div style="background: #fff; border: 1px solid var(--border); border-radius: 14px; padding: 24px; text-align: center;">
          <div style="font-size: 36px; margin-bottom: 12px;">${f.icon}</div>
          <h3 style="font-family: 'Fraunces', serif; font-size: 16px; color: var(--blue); margin-bottom: 8px;">${f.title}</h3>
          <p style="font-size: 13px; color: var(--gray); line-height: 1.6;">${f.desc}</p>
        </div>
      `).join('')}
    </div>
  `;
}

// ---- RENDER JOBS ----
function renderJobsScreen() {
  return `
    <nav>
      <div class="logo" onclick="showScreen('home')">Docen<span>tium</span></div>
      <div class="nav-links">
        <button class="btn btn-ghost" onclick="showScreen('home')">← Inicio</button>
        <button class="btn btn-primary" onclick="showScreen('register')">Mi perfil</button>
      </div>
    </nav>

    <div class="search-section">
      <div class="search-bar">
        <div class="search-input-wrap">
          <span class="search-icon">🔍</span>
          <input class="search-input" id="searchInput" placeholder="Matemáticas en Madrid, Inglés primaria..." oninput="filterJobs(this.value)">
        </div>
        <button class="btn btn-primary" onclick="aiSearchTip()">✨ IA</button>
      </div>
      <div class="filters">
        <button class="filter-chip active" onclick="filterChip(this,'todos')">Todos</button>
        <button class="filter-chip" onclick="filterChip(this,'Primaria')">Primaria</button>
        <button class="filter-chip" onclick="filterChip(this,'Secundaria')">Secundaria</button>
        <button class="filter-chip" onclick="filterChip(this,'FP')">FP</button>
        <button class="filter-chip" onclick="filterChip(this,'Idiomas')">Idiomas</button>
        <span class="ai-badge">✨ Ordenadas por match IA</span>
      </div>
    </div>

    <div class="ai-section">
      <div class="ai-header"><div class="ai-dot"></div><span>Recomendación IA</span></div>
      <p class="ai-message" id="aiMsg">Mostrando las mejores ofertas activas. <strong>Regístrate gratis</strong> para ver tu match personalizado y recibir alertas de nuevas ofertas.</p>
    </div>

    <div class="jobs-section">
      <div class="section-header">
        <span class="section-title">Ofertas activas</span>
        <span class="section-label" id="jobCount">${DEMO_JOBS.length} ofertas</span>
      </div>
      <div id="jobsList"></div>
    </div>
  `;
}

function renderJobs(list) {
  const container = document.getElementById('jobsList');
  const count = document.getElementById('jobCount');
  if (count) count.textContent = list.length + ' ofertas';
  if (!container) return;
  if (list.length === 0) {
    container.innerHTML = `<div class="empty-state"><p>No encontramos ofertas con ese filtro</p><span>Prueba con otra búsqueda</span></div>`;
    return;
  }
  container.innerHTML = list.map(j => `
    <div class="job-card" onclick="showJob(${j.id})">
      <div class="job-logo" style="background:${j.bg}">${j.emoji}</div>
      <div class="job-info">
        <h3>${j.title}</h3>
        <div class="job-school">${j.school} · ${j.location}</div>
        <div class="job-tags">
          ${j.tags.map(t => `<span class="tag tag-blue">${t}</span>`).join('')}
          <span class="tag tag-gray">${j.type}</span>
        </div>
        <div class="match-score">✨ ${j.match}% match</div>
      </div>
      <div class="job-right">
        <div class="job-salary">${j.salary}</div>
        <div class="job-date">${j.date}</div>
      </div>
    </div>
  `).join('');
}

function filterJobs(val) {
  const q = val.toLowerCase();
  const filtered = q
    ? DEMO_JOBS.filter(j =>
        j.title.toLowerCase().includes(q) ||
        j.school.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q) ||
        j.tags.some(t => t.toLowerCase().includes(q))
      )
    : DEMO_JOBS;
  renderJobs(filtered);
}

function filterChip(el, type) {
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  const filtered = type === 'todos' ? DEMO_JOBS : DEMO_JOBS.filter(j => j.stage === type || j.tags.includes(type));
  renderJobs(filtered);
}

function aiSearchTip() {
  const msg = document.getElementById('aiMsg');
  if (msg) msg.innerHTML = '🤖 Búsqueda IA activada. <strong>Regístrate</strong> para que la IA analice tu perfil y filtre automáticamente las ofertas que mejor encajan contigo.';
  showToast('✨ Con tu perfil, la IA filtra automáticamente las mejores opciones');
}

// ---- JOB DETAIL ----
function showJob(id) {
  currentJob = DEMO_JOBS.find(j => j.id === id);
  if (!currentJob) return;
  const screen = document.getElementById('screen-jobdetail');
  screen.innerHTML = `
    <nav>
      <div class="logo" onclick="showScreen('home')">Docen<span>tium</span></div>
      <div class="nav-links">
        <button class="btn btn-ghost" onclick="showScreen('jobs')">← Volver</button>
      </div>
    </nav>
    <div class="job-detail-wrap">
      <button class="back-btn" onclick="showScreen('jobs')">← Volver a ofertas</button>
      <div class="job-detail-header">
        <div class="job-detail-logo" style="background:${currentJob.bg}">${currentJob.emoji}</div>
        <div class="job-detail-title">
          <h2>${currentJob.title}</h2>
          <p>${currentJob.school} · ${currentJob.location} · ${currentJob.type}</p>
          <div class="job-tags" style="margin-top:8px">
            ${currentJob.tags.map(t => `<span class="tag tag-blue">${t}</span>`).join('')}
            <span class="match-score">✨ ${currentJob.match}% match</span>
          </div>
        </div>
      </div>

      <div class="ai-section" style="margin: 0 0 24px">
        <div class="ai-header"><div class="ai-dot"></div><span>Análisis IA de compatibilidad</span></div>
        <p class="ai-message">Esta oferta tiene un <strong>${currentJob.match}% de compatibilidad</strong> con el perfil típico de Docentium. Regístrate para ver tu match personal y recibir consejos para mejorar tu candidatura.</p>
      </div>

      <div class="detail-section">
        <h3>Descripción del puesto</h3>
        <p>${currentJob.desc}</p>
      </div>
      <div class="detail-section">
        <h3>Condiciones</h3>
        <p>💰 Salario: <strong>${currentJob.salary}</strong> bruto anual<br>
           📅 Incorporación inmediata<br>
           📍 Presencial en ${currentJob.location}</p>
      </div>
    </div>
    <div class="apply-bar">
      <div class="apply-info">⏱ Cierra en <strong>${currentJob.cierre} días</strong> · <strong>${currentJob.candidatos}</strong> candidatos</div>
      <button class="btn btn-primary btn-lg" onclick="applyNow()">Inscribirme ahora</button>
    </div>
  `;
  showScreen('jobdetail');
}

function applyNow() {
  openModal(`
    <h3>¡Un paso más!</h3>
    <p>Para inscribirte necesitas tener un perfil en Docentium. Es gratis y solo tarda 2 minutos.</p>
    <button class="btn btn-primary btn-full btn-lg" onclick="closeModal();showScreen('register')">Crear mi perfil gratis →</button>
    <button class="btn btn-ghost btn-full" style="margin-top:8px" onclick="closeModal();showScreen('login')">Ya tengo cuenta</button>
  `);
}

// ---- REGISTER ----
function renderRegisterScreen() {
  return `
    <nav>
      <div class="logo" onclick="showScreen('home')">Docen<span>tium</span></div>
      <button class="btn btn-ghost" onclick="showScreen('home')">← Volver</button>
    </nav>
    <div class="form-screen">
      <div class="progress-bar">
        <div class="progress-step done"></div>
        <div class="progress-step active"></div>
        <div class="progress-step"></div>
      </div>
      <div class="form-header">
        <h2>Crea tu perfil docente</h2>
        <p>En 2 minutos tendrás tu perfil listo. La IA hace el resto.</p>
      </div>

      <button class="social-btn" onclick="googleLogin()">
        <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
        Continuar con Google
      </button>
      <button class="social-btn" onclick="showToast('Próximamente disponible')">
        🔗 Importar desde LinkedIn
      </button>

      <div class="divider"></div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Nombre</label>
          <input class="form-input" id="regNombre" placeholder="Ana">
        </div>
        <div class="form-group">
          <label class="form-label">Apellidos</label>
          <input class="form-input" id="regApellidos" placeholder="García López">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Email</label>
        <input class="form-input" id="regEmail" type="email" placeholder="ana@email.com">
      </div>
      <div class="form-group">
        <label class="form-label">Contraseña</label>
        <input class="form-input" id="regPassword" type="password" placeholder="Mínimo 8 caracteres">
      </div>
      <div class="form-group">
        <label class="form-label">¿Qué materias enseñas? <span>(pulsa Enter para añadir)</span></label>
        <input class="form-input" id="skillInput" placeholder="ej: Matemáticas, Inglés, Historia..." onkeydown="addSkill(event)">
        <div class="skill-tags" id="skillTags">
          ${skills.map(s => `<span class="skill-tag">${s} <span class="remove" onclick="removeSkill(this)">×</span></span>`).join('')}
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Sobre ti</label>
        <textarea class="form-input" id="bioInput" placeholder="Cuéntanos brevemente tu experiencia y metodología..."></textarea>
        <button class="ai-generate" onclick="generateBio()">
          <div class="loading-dots" id="bioLoading" style="display:none"><span>•</span><span>•</span><span>•</span></div>
          <span id="bioGenLabel">✨ Generar bio con IA</span>
        </button>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Comunidad autónoma</label>
          <select class="form-input" id="regComunidad">
            <option value="">Selecciona...</option>
            ${['Andalucía','Aragón','Asturias','Baleares','Canarias','Cantabria','Castilla-La Mancha','Castilla y León','Cataluña','Extremadura','Galicia','La Rioja','Madrid','Murcia','Navarra','País Vasco','Valencia'].map(c => `<option>${c}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Disponibilidad</label>
          <select class="form-input" id="regDisponibilidad">
            <option>Inmediata</option>
            <option>En 1 mes</option>
            <option>En 3 meses</option>
            <option>Solo sustituciones</option>
            <option>Solo fines de semana</option>
          </select>
        </div>
      </div>
      <button class="btn btn-primary btn-full btn-lg" style="margin-top:8px" id="registerBtn" onclick="submitRegister()">
        Crear perfil y ver ofertas →
      </button>
      <p style="text-align:center;font-size:12px;color:var(--gray);margin-top:14px">
        Al registrarte aceptas los <a href="#" style="color:var(--blue)">Términos de uso</a> y la <a href="#" style="color:var(--blue)">Política de privacidad</a>
      </p>
    </div>
  `;
}

// ---- LOGIN ----
function renderLoginScreen() {
  return `
    <nav>
      <div class="logo" onclick="showScreen('home')">Docen<span>tium</span></div>
      <button class="btn btn-ghost" onclick="showScreen('home')">← Volver</button>
    </nav>
    <div class="form-screen">
      <div class="form-header">
        <h2>Bienvenido/a de nuevo</h2>
        <p>Accede a tu cuenta de Docentium</p>
      </div>
      <button class="social-btn" onclick="googleLogin()">
        <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
        Entrar con Google
      </button>
      <div class="divider"></div>
      <div class="form-group">
        <label class="form-label">Email</label>
        <input class="form-input" id="loginEmail" type="email" placeholder="tu@email.com">
      </div>
      <div class="form-group">
        <label class="form-label">Contraseña</label>
        <input class="form-input" id="loginPassword" type="password" placeholder="••••••••">
      </div>
      <button class="btn btn-primary btn-full btn-lg" style="margin-top:8px" onclick="submitLogin()">
        Iniciar sesión
      </button>
      <p style="text-align:center;font-size:13px;color:var(--gray);margin-top:16px">
        ¿No tienes cuenta? <button class="btn btn-ghost" style="padding:0;text-decoration:underline;color:var(--blue);font-size:13px" onclick="showScreen('register')">Regístrate gratis</button>
      </p>
    </div>
  `;
}

// ---- SCHOOL DASHBOARD ----
function renderSchoolScreen() {
  return `
    <nav>
      <div class="logo" onclick="showScreen('home')">Docen<span>tium</span></div>
      <div class="nav-links">
        <button class="btn btn-ghost" onclick="showScreen('home')">← Inicio</button>
        <button class="btn btn-yellow" onclick="showScreen('oferta')">+ Nueva oferta</button>
      </div>
    </nav>
    <div class="dash-header">
      <h2>Panel del Centro</h2>
      <p>Demo · Gestiona tus ofertas y candidatos</p>
    </div>
    <div class="dash-stats">
      <div class="stat-card"><div class="stat-num">47</div><div class="stat-label">Candidatos totales</div></div>
      <div class="stat-card"><div class="stat-num">3</div><div class="stat-label">Ofertas activas</div></div>
      <div class="stat-card"><div class="stat-num green">94%</div><div class="stat-label">Match IA promedio</div></div>
    </div>
    <div class="ai-section">
      <div class="ai-header"><div class="ai-dot"></div><span>IA recomienda</span></div>
      <p class="ai-message">Tienes <strong>4 candidatos nuevos</strong> con alto match para tu oferta de Matemáticas. Ana García tiene un <strong>97% de compatibilidad</strong> — te recomiendo contactarla hoy antes de que otro centro lo haga.</p>
    </div>
    <div class="candidates-section">
      <div class="section-title" style="margin-bottom:16px">Candidatos destacados por IA</div>
      <div id="candidatesList"></div>
    </div>
  `;
}

function renderCandidates() {
  const container = document.getElementById('candidatesList');
  if (!container) return;
  container.innerHTML = DEMO_CANDIDATES.map(c => `
    <div class="candidate-card">
      <div class="avatar" style="background:${c.color};color:${c.textColor || '#fff'}">${c.initials}</div>
      <div class="candidate-info">
        <h4>${c.name}</h4>
        <p>${c.role}</p>
      </div>
      <div class="candidate-right">
        <div class="ai-match">✨ ${c.match}% match</div>
        <div class="action-btns">
          <button class="btn btn-outline btn-sm" onclick="showToast('Perfil de ${c.name} abierto')">Ver perfil</button>
          <button class="btn btn-green btn-sm" onclick="contactCandidate('${c.name}')">Contactar</button>
        </div>
      </div>
    </div>
  `).join('');
}

function contactCandidate(name) {
  openModal(`
    <h3>Contactar con ${name}</h3>
    <p>Escribe un mensaje breve. La IA sugerirá el tono perfecto según el perfil del candidato.</p>
    <textarea class="form-input" id="msgText" rows="4" placeholder="Hola ${name}, hemos visto tu perfil y nos gustaría..."></textarea>
    <button class="ai-generate" onclick="generateMsg('${name}')">
      <span>✨ Mejorar mensaje con IA</span>
    </button>
    <button class="btn btn-primary btn-full" style="margin-top:16px" onclick="closeModal();showToast('✉️ Mensaje enviado a ${name}')">
      Enviar mensaje
    </button>
  `);
}

function generateMsg(name) {
  const ta = document.getElementById('msgText');
  if (ta) ta.value = `Hola ${name}, mi nombre es Carlos y soy el director del Colegio San Isidro en Madrid. He revisado tu perfil en Docentium y me ha parecido muy interesante tu experiencia en Matemáticas y tu enfoque metodológico. Nos gustaría invitarte a una entrevista para la plaza de Secundaria que tenemos abierta. ¿Estarías disponible esta semana? Un saludo.`;
  showToast('✨ Mensaje mejorado con IA');
}

// ---- OFERTA FORM ----
function renderOfertaScreen() {
  return `
    <nav>
      <div class="logo" onclick="showScreen('home')">Docen<span>tium</span></div>
      <button class="btn btn-ghost" onclick="showScreen('school')">← Volver</button>
    </nav>
    <div class="oferta-form" style="max-width:600px;margin:0 auto;padding:32px 28px">
      <div class="form-header">
        <h2>Publicar oferta</h2>
        <p>La IA genera la descripción por ti en segundos.</p>
      </div>
      <div class="form-group">
        <label class="form-label">Puesto</label>
        <select class="form-input" id="puestoSelect">
          <option>Profesor/a de Matemáticas</option>
          <option>Profesor/a de Inglés</option>
          <option>Tutor/a de Primaria</option>
          <option>Jefe/a de Departamento</option>
          <option>Orientador/a escolar</option>
          <option>Profesor/a de FP</option>
          <option>Profesor/a de Educación Física</option>
          <option>Logopeda</option>
          <option>PT / AL</option>
        </select>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Tipo de jornada</label>
          <select class="form-input">
            <option>Jornada completa</option>
            <option>Media jornada</option>
            <option>Sustitución</option>
            <option>Por horas</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Incorporación</label>
          <select class="form-input">
            <option>Inmediata</option>
            <option>Septiembre 2025</option>
            <option>Enero 2026</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Ciudad</label>
          <input class="form-input" placeholder="Madrid, Barcelona...">
        </div>
        <div class="form-group">
          <label class="form-label">Salario bruto anual</label>
          <input class="form-input" placeholder="26.000€ - 30.000€">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Descripción del puesto</label>
        <button class="ai-generate" onclick="generateDesc()">
          <div class="loading-dots" id="descLoading" style="display:none"><span>•</span><span>•</span><span>•</span></div>
          <span id="descGenLabel">✨ Generar descripción con IA</span>
        </button>
        <div class="ai-desc-box" id="descBox">La descripción aparecerá aquí después de generarla con IA...</div>
      </div>
      <div class="form-group">
        <label class="form-label">Requisitos adicionales <span>(opcional)</span></label>
        <input class="form-input" placeholder="ej: Bilingüe, experiencia mínima 2 años, MIR educativo...">
      </div>
      <button class="btn btn-primary btn-full btn-lg" style="margin-top:8px" onclick="submitOferta()">
        Publicar oferta →
      </button>
    </div>
  `;
}

// ---- SKILLS ----
function addSkill(e) {
  if (e.key === 'Enter') {
    const val = e.target.value.trim();
    if (!val || skills.includes(val)) return;
    skills.push(val);
    const tag = document.createElement('span');
    tag.className = 'skill-tag';
    tag.innerHTML = val + ' <span class="remove" onclick="removeSkill(this)">×</span>';
    document.getElementById('skillTags').appendChild(tag);
    e.target.value = '';
  }
}

function removeSkill(el) {
  const tag = el.parentElement;
  skills = skills.filter(s => s !== tag.textContent.replace('×', '').trim());
  tag.remove();
}

// ---- AI GENERATORS ----
function generateBio() {
  const loading = document.getElementById('bioLoading');
  const label = document.getElementById('bioGenLabel');
  const bio = document.getElementById('bioInput');
  if (!loading) return;
  loading.style.display = 'inline';
  label.style.display = 'none';
  const materias = skills.join(', ') || 'docencia';
  setTimeout(() => {
    loading.style.display = 'none';
    label.style.display = 'inline';
    bio.value = `Docente vocacional con más de 8 años de experiencia en la enseñanza de ${materias}. Especializado/a en metodología activa y aprendizaje basado en proyectos. Comprometido/a con la innovación educativa y el desarrollo integral del alumnado. Disponibilidad inmediata para incorporación en centro privado o concertado.`;
    showToast('✨ Bio generada con IA');
  }, 1800);
}

function generateDesc() {
  const loading = document.getElementById('descLoading');
  const label = document.getElementById('descGenLabel');
  const box = document.getElementById('descBox');
  const puesto = document.getElementById('puestoSelect')?.value || 'Docente';
  if (!loading) return;
  loading.style.display = 'inline';
  label.style.display = 'none';
  box.textContent = 'Generando con IA...';
  setTimeout(() => {
    loading.style.display = 'none';
    label.style.display = 'inline';
    box.textContent = `Buscamos un/a ${puesto} para incorporarse a nuestro claustro en un proyecto educativo sólido y en crecimiento. El/la candidato/a ideal es una persona vocacional, con metodología innovadora y orientada al desarrollo integral del alumnado. Se valorará experiencia en proyectos interdisciplinares, uso de plataformas digitales educativas y comunicación fluida con familias. Ofrecemos un entorno de trabajo colaborativo, formación continua y estabilidad a largo plazo.`;
    showToast('✨ Descripción generada con IA');
  }, 2000);
}

// ---- AUTH ----
async function googleLogin() {
  try {
    const { error } = await sb.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin } });
    if (error) showToast('Error: ' + error.message);
  } catch(e) {
    showToast('Configura Supabase para activar Google Login');
  }
}

async function submitRegister() {
  const email = document.getElementById('regEmail')?.value;
  const password = document.getElementById('regPassword')?.value;
  const nombre = document.getElementById('regNombre')?.value;
  if (!email || !password || !nombre) { showToast('Por favor completa todos los campos'); return; }

  const btn = document.getElementById('registerBtn');
  if (btn) { btn.textContent = 'Creando perfil...'; btn.disabled = true; }

  try {
    const { data, error } = await sb.auth.signUp({ email, password, options: { data: { nombre } } });
    if (error) throw error;
    showToast('🎉 ¡Perfil creado! Bienvenido/a a Docentium');
    setTimeout(() => showScreen('jobs'), 1000);
  } catch(e) {
    showToast('Configura Supabase para activar el registro real');
    setTimeout(() => showScreen('jobs'), 1000);
  } finally {
    if (btn) { btn.textContent = 'Crear perfil y ver ofertas →'; btn.disabled = false; }
  }
}

async function submitLogin() {
  const email = document.getElementById('loginEmail')?.value;
  const password = document.getElementById('loginPassword')?.value;
  if (!email || !password) { showToast('Por favor introduce email y contraseña'); return; }
  try {
    const { error } = await sb.auth.signInWithPassword({ email, password });
    if (error) throw error;
    showToast('¡Bienvenido/a de nuevo!');
    setTimeout(() => showScreen('jobs'), 800);
  } catch(e) {
    showToast('Configura Supabase para el login real');
    setTimeout(() => showScreen('jobs'), 800);
  }
}

function submitOferta() {
  showToast('🚀 ¡Oferta publicada! Ya está recibiendo candidatos');
  setTimeout(() => showScreen('school'), 1000);
}

// ---- MODAL ----
function openModal(html) {
  document.getElementById('modalContent').innerHTML = html;
  document.getElementById('modal').classList.add('open');
  document.getElementById('modalOverlay').classList.add('open');
}
function closeModal() {
  document.getElementById('modal').classList.remove('open');
  document.getElementById('modalOverlay').classList.remove('open');
}

// ---- TOAST ----
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ---- SCREEN DEFINITIONS ----
const SCREENS = {
  home: renderHome,
  jobs: renderJobsScreen,
  register: renderRegisterScreen,
  login: renderLoginScreen,
  school: renderSchoolScreen,
  oferta: renderOfertaScreen,
};

// Override showScreen to render dynamic content
const _showScreen = showScreen;
showScreen = function(name) {
  if (SCREENS[name]) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    let screen = document.getElementById('screen-' + name);
    if (!screen) {
      screen = document.createElement('div');
      screen.className = 'screen';
      screen.id = 'screen-' + name;
      document.getElementById('app').appendChild(screen);
    }
    screen.innerHTML = SCREENS[name]();
    screen.classList.add('active');
    window.scrollTo(0, 0);
    if (name === 'jobs') renderJobs(DEMO_JOBS);
    if (name === 'school') renderCandidates();
  } else {
    _showScreen(name);
  }
};
