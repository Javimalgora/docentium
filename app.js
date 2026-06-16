// DOCENTIUM — app.js

const DEMO_JOBS = [
  { id:1, title:"Profesor/a de Matemáticas", school:"Colegio Bilingüe San Isidro", location:"Madrid", type:"Jornada completa", stage:"Secundaria", salary:"26.000€ - 30.000€", match:97, date:"Hace 1 día", emoji:"📐", bg:"#E8EFF8", tags:["Secundaria","Bilingüe","Inmediata"], desc:"Buscamos un/a docente apasionado/a por las Matemáticas para impartir clases en 3º y 4º de ESO. El centro apuesta por la metodología STEM y el aprendizaje basado en proyectos.", candidatos:12, cierre:5 },
  { id:2, title:"Tutor/a de Primaria (2º ciclo)", school:"Academia Bright Minds", location:"Barcelona", type:"Media jornada", stage:"Primaria", salary:"18.000€ - 22.000€", match:89, date:"Hace 2 días", emoji:"🌟", bg:"#FEF9E7", tags:["Primaria","Tarde","Inglés"], desc:"Academia de refuerzo educativo busca tutor/a para grupos reducidos de 2º ciclo de primaria. Horario de tardes de 16h a 20h, de lunes a viernes.", candidatos:7, cierre:8 },
  { id:3, title:"Profesor/a de Inglés — Cambridge", school:"British School of Valencia", location:"Valencia", type:"Jornada completa", stage:"Idiomas", salary:"28.000€ - 34.000€", match:85, date:"Hace 3 días", emoji:"🇬🇧", bg:"#DCFCE7", tags:["Bilingüe","Cambridge","Senior"], desc:"Centro británico acreditado busca docente nativo o con nivel C2 para impartir inglés según el currículo Cambridge.", candidatos:21, cierre:3 },
  { id:4, title:"Orientador/a Escolar", school:"IES Ramón y Cajal", location:"Zaragoza", type:"Jornada completa", stage:"Secundaria", salary:"24.000€ - 28.000€", match:78, date:"Hace 5 días", emoji:"🧠", bg:"#EEF2FF", tags:["Orientación","Secundaria"], desc:"Instituto busca orientador/a para el departamento de orientación. Atención psicopedagógica al alumnado y coordinación con familias.", candidatos:5, cierre:12 },
  { id:5, title:"Profesor/a de FP — Informática", school:"Centro FP Reto", location:"Sevilla", type:"Jornada completa", stage:"FP", salary:"27.000€ - 32.000€", match:74, date:"Hace 6 días", emoji:"💻", bg:"#F0FDF4", tags:["FP","Informática","DAW"], desc:"Centro de FP privado busca docente para módulos de Desarrollo de Aplicaciones Web (DAW).", candidatos:9, cierre:7 }
];

const DEMO_CANDIDATES = [
  { name:"Ana García", role:"Matemáticas · 8 años exp.", match:97, color:"#1B3A6B", initials:"AG" },
  { name:"Pedro Martínez", role:"Física y Química · 5 años exp.", match:91, color:"#4CAF82", initials:"PM" },
  { name:"Laura Sánchez", role:"Matemáticas · 12 años exp.", match:88, color:"#F5C842", initials:"LS", textColor:"#1B3A6B" },
  { name:"Miguel Torres", role:"Matemáticas · 3 años exp.", match:79, color:"#4338CA", initials:"MT" }
];

let skills = ["Matemáticas","Física"];
let currentJob = null;

function nav(back, backScreen, rightBtn) {
  return `<nav>
    <div class="logo" onclick="go('home')">Docen<span>tium</span></div>
    <div class="nav-links">
      ${back ? `<button class="btn btn-ghost" onclick="go('${backScreen}')">← ${back}</button>` : ''}
      ${rightBtn || ''}
    </div>
  </nav>`;
}

function go(screen) {
  const app = document.getElementById('app');
  const screens = {
    home: homeHTML,
    jobs: jobsHTML,
    register: registerHTML,
    login: loginHTML,
    school: schoolHTML,
    oferta: ofertaHTML,
  };
  if (screens[screen]) {
    app.innerHTML = screens[screen]();
    window.scrollTo(0,0);
    if (screen === 'jobs') renderJobs(DEMO_JOBS);
    if (screen === 'school') renderCandidates();
  }
}

function homeHTML() {
  return `
    ${nav('','',' <button class="btn btn-ghost" onclick="go(\'login\')">Iniciar sesión</button><button class="btn btn-primary" onclick="go(\'register\')">Registrarse gratis</button>')}
    <div class="hero">
      <div class="hero-side hero-left" onclick="go('jobs')">
        <div class="hero-badge">✨ IA te ayuda a destacar</div>
        <div class="hero-icon">🎓</div>
        <h2 class="hero-title">Soy docente</h2>
        <p class="hero-sub">Encuentra tu próxima plaza, sustitución o proyecto educativo</p>
        <button class="btn btn-yellow btn-lg hero-cta">Ver ofertas de empleo</button>
      </div>
      <div class="hero-side hero-right" onclick="go('school')">
        <div class="hero-badge">✨ Oferta generada con IA</div>
        <div class="hero-icon">🏫</div>
        <h2 class="hero-title">Soy un centro</h2>
        <p class="hero-sub">Publica una oferta y accede a los mejores docentes en minutos</p>
        <button class="btn btn-primary btn-lg hero-cta">Publicar oferta</button>
      </div>
    </div>
    <div class="ai-section">
      <div class="ai-header"><div class="ai-dot"></div><span>Asistente Docentium IA</span></div>
      <p class="ai-message">¡Hola! Soy tu asistente de empleo educativo. Puedo ayudarte a encontrar oportunidades, preparar tu perfil o publicar una oferta en segundos.</p>
      <div class="ai-suggestions">
        <button class="ai-suggestion" onclick="go('jobs')">🔍 Ver ofertas activas</button>
        <button class="ai-suggestion" onclick="go('register')">📋 Crear mi perfil docente</button>
        <button class="ai-suggestion" onclick="go('oferta')">📢 Publicar oferta rápida</button>
      </div>
    </div>
    <div style="padding:40px 32px;display:grid;grid-template-columns:repeat(3,1fr);gap:20px;max-width:860px;margin:0 auto">
      ${[
        {icon:'⚡',title:'Inscripción en 60 segundos',desc:'Sin formularios eternos. Importa tu LinkedIn y listo.'},
        {icon:'🤖',title:'Match inteligente con IA',desc:'Conectamos tu perfil con las ofertas que más encajan.'},
        {icon:'🏫',title:'Solo sector educativo',desc:'Nada de ruido. Solo centros, academias y docentes.'}
      ].map(f=>`<div style="background:#fff;border:1px solid var(--border);border-radius:14px;padding:24px;text-align:center">
        <div style="font-size:36px;margin-bottom:12px">${f.icon}</div>
        <h3 style="font-family:'Fraunces',serif;font-size:16px;color:var(--blue);margin-bottom:8px">${f.title}</h3>
        <p style="font-size:13px;color:var(--gray);line-height:1.6">${f.desc}</p>
      </div>`).join('')}
    </div>`;
}

function jobsHTML() {
  return `
    ${nav('Inicio','home','<button class="btn btn-primary" onclick="go(\'register\')">Mi perfil</button>')}
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
      <p class="ai-message" id="aiMsg">Mostrando las mejores ofertas activas. <strong>Regístrate gratis</strong> para ver tu match personalizado.</p>
    </div>
    <div class="jobs-section">
      <div class="section-header">
        <span class="section-title">Ofertas activas</span>
        <span class="section-label" id="jobCount"></span>
      </div>
      <div id="jobsList"></div>
    </div>`;
}

function renderJobs(list) {
  const c = document.getElementById('jobsList');
  const cnt = document.getElementById('jobCount');
  if (cnt) cnt.textContent = list.length + ' ofertas';
  if (!c) return;
  if (!list.length) { c.innerHTML = '<div class="empty-state"><p>No encontramos ofertas</p></div>'; return; }
  c.innerHTML = list.map(j=>`
    <div class="job-card" onclick="showJob(${j.id})">
      <div class="job-logo" style="background:${j.bg}">${j.emoji}</div>
      <div class="job-info">
        <h3>${j.title}</h3>
        <div class="job-school">${j.school} · ${j.location}</div>
        <div class="job-tags">${j.tags.map(t=>`<span class="tag tag-blue">${t}</span>`).join('')}<span class="tag tag-gray">${j.type}</span></div>
        <div class="match-score">✨ ${j.match}% match</div>
      </div>
      <div class="job-right">
        <div class="job-salary">${j.salary}</div>
        <div class="job-date">${j.date}</div>
      </div>
    </div>`).join('');
}

function filterJobs(val) {
  const q = val.toLowerCase();
  renderJobs(q ? DEMO_JOBS.filter(j=>j.title.toLowerCase().includes(q)||j.location.toLowerCase().includes(q)||j.tags.some(t=>t.toLowerCase().includes(q))) : DEMO_JOBS);
}

function filterChip(el, type) {
  document.querySelectorAll('.filter-chip').forEach(c=>c.classList.remove('active'));
  el.classList.add('active');
  renderJobs(type==='todos' ? DEMO_JOBS : DEMO_JOBS.filter(j=>j.stage===type||j.tags.includes(type)));
}

function aiSearchTip() {
  const m = document.getElementById('aiMsg');
  if (m) m.innerHTML = '🤖 <strong>Regístrate</strong> para que la IA filtre automáticamente las ofertas que mejor encajan con tu perfil.';
  toast('✨ Con tu perfil, la IA filtra las mejores opciones');
}

function showJob(id) {
  currentJob = DEMO_JOBS.find(j=>j.id===id);
  if (!currentJob) return;
  document.getElementById('app').innerHTML = `
    ${nav('Volver a ofertas','jobs','')}
    <div class="job-detail-wrap">
      <div class="job-detail-header">
        <div class="job-detail-logo" style="background:${currentJob.bg}">${currentJob.emoji}</div>
        <div class="job-detail-title">
          <h2>${currentJob.title}</h2>
          <p>${currentJob.school} · ${currentJob.location} · ${currentJob.type}</p>
          <div class="job-tags" style="margin-top:8px">${currentJob.tags.map(t=>`<span class="tag tag-blue">${t}</span>`).join('')}<span class="match-score">✨ ${currentJob.match}% match</span></div>
        </div>
      </div>
      <div class="ai-section" style="margin:0 0 24px">
        <div class="ai-header"><div class="ai-dot"></div><span>Análisis IA</span></div>
        <p class="ai-message">Esta oferta tiene un <strong>${currentJob.match}% de compatibilidad</strong>. Regístrate para ver tu match personal.</p>
      </div>
      <div class="detail-section"><h3>Descripción</h3><p>${currentJob.desc}</p></div>
      <div class="detail-section"><h3>Condiciones</h3><p>💰 <strong>${currentJob.salary}</strong> bruto anual<br>📅 Incorporación inmediata<br>📍 ${currentJob.location}</p></div>
    </div>
    <div class="apply-bar">
      <div class="apply-info">⏱ Cierra en <strong>${currentJob.cierre} días</strong> · <strong>${currentJob.candidatos}</strong> candidatos</div>
      <button class="btn btn-primary btn-lg" onclick="applyNow()">Inscribirme ahora</button>
    </div>`;
}

function applyNow() {
  openModal(`<h3>¡Un paso más!</h3><p>Para inscribirte necesitas un perfil en Docentium. Es gratis y tarda 2 minutos.</p>
    <button class="btn btn-primary btn-full btn-lg" onclick="closeModal();go('register')">Crear mi perfil gratis →</button>
    <button class="btn btn-ghost btn-full" style="margin-top:8px" onclick="closeModal();go('login')">Ya tengo cuenta</button>`);
}

function registerHTML() {
  return `
    ${nav('Volver','home','')}
    <div class="form-screen">
      <div class="progress-bar"><div class="progress-step done"></div><div class="progress-step active"></div><div class="progress-step"></div></div>
      <div class="form-header"><h2>Crea tu perfil docente</h2><p>En 2 minutos listo. La IA hace el resto.</p></div>
      <button class="social-btn">G &nbsp; Continuar con Google</button>
      <button class="social-btn">🔗 Importar desde LinkedIn</button>
      <div class="divider"></div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Nombre</label><input class="form-input" id="regNombre" placeholder="Ana"></div>
        <div class="form-group"><label class="form-label">Apellidos</label><input class="form-input" placeholder="García López"></div>
      </div>
      <div class="form-group"><label class="form-label">Email</label><input class="form-input" id="regEmail" type="email" placeholder="ana@email.com"></div>
      <div class="form-group"><label class="form-label">Contraseña</label><input class="form-input" type="password" placeholder="Mínimo 8 caracteres"></div>
      <div class="form-group">
        <label class="form-label">¿Qué materias enseñas? <span>(pulsa Enter)</span></label>
        <input class="form-input" id="skillInput" placeholder="ej: Matemáticas, Inglés..." onkeydown="addSkill(event)">
        <div class="skill-tags" id="skillTags">${skills.map(s=>`<span class="skill-tag">${s} <span class="remove" onclick="removeSkill(this)">×</span></span>`).join('')}</div>
      </div>
      <div class="form-group">
        <label class="form-label">Sobre ti</label>
        <textarea class="form-input" id="bioInput" placeholder="Cuéntanos tu experiencia..."></textarea>
        <button class="ai-generate" onclick="generateBio()">
          <div class="loading-dots" id="bioLoading" style="display:none"><span>•</span><span>•</span><span>•</span></div>
          <span id="bioGenLabel">✨ Generar bio con IA</span>
        </button>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Comunidad</label>
          <select class="form-input"><option>Madrid</option><option>Cataluña</option><option>Andalucía</option><option>País Vasco</option><option>Valencia</option></select>
        </div>
        <div class="form-group"><label class="form-label">Disponibilidad</label>
          <select class="form-input"><option>Inmediata</option><option>En 1 mes</option><option>Solo sustituciones</option></select>
        </div>
      </div>
      <button class="btn btn-primary btn-full btn-lg" style="margin-top:8px" onclick="toast('🎉 ¡Perfil creado! Bienvenido/a');setTimeout(()=>go(\'jobs\'),800)">Crear perfil y ver ofertas →</button>
    </div>`;
}

function loginHTML() {
  return `
    ${nav('Volver','home','')}
    <div class="form-screen">
      <div class="form-header"><h2>Bienvenido/a de nuevo</h2><p>Accede a tu cuenta de Docentium</p></div>
      <button class="social-btn">G &nbsp; Entrar con Google</button>
      <div class="divider"></div>
      <div class="form-group"><label class="form-label">Email</label><input class="form-input" type="email" placeholder="tu@email.com"></div>
      <div class="form-group"><label class="form-label">Contraseña</label><input class="form-input" type="password" placeholder="••••••••"></div>
      <button class="btn btn-primary btn-full btn-lg" style="margin-top:8px" onclick="toast('¡Bienvenido/a!');setTimeout(()=>go('jobs'),800)">Iniciar sesión</button>
      <p style="text-align:center;font-size:13px;color:var(--gray);margin-top:16px">¿No tienes cuenta? <button class="btn btn-ghost" style="padding:0;text-decoration:underline;color:var(--blue);font-size:13px" onclick="go('register')">Regístrate gratis</button></p>
    </div>`;
}

function schoolHTML() {
  return `
    ${nav('Inicio','home','<button class="btn btn-yellow" onclick="go(\'oferta\')">+ Nueva oferta</button>')}
    <div class="dash-header"><h2>Panel del Centro</h2><p>Demo · Gestiona tus ofertas y candidatos</p></div>
    <div class="dash-stats">
      <div class="stat-card"><div class="stat-num">47</div><div class="stat-label">Candidatos</div></div>
      <div class="stat-card"><div class="stat-num">3</div><div class="stat-label">Ofertas activas</div></div>
      <div class="stat-card"><div class="stat-num green">94%</div><div class="stat-label">Match IA medio</div></div>
    </div>
    <div class="ai-section">
      <div class="ai-header"><div class="ai-dot"></div><span>IA recomienda</span></div>
      <p class="ai-message">Tienes <strong>4 candidatos nuevos</strong> con alto match. Ana García tiene un <strong>97%</strong> — contáctala hoy.</p>
    </div>
    <div class="candidates-section">
      <div class="section-title" style="margin-bottom:16px">Candidatos destacados por IA</div>
      <div id="candidatesList"></div>
    </div>`;
}

function renderCandidates() {
  const c = document.getElementById('candidatesList');
  if (!c) return;
  c.innerHTML = DEMO_CANDIDATES.map(c=>`
    <div class="candidate-card">
      <div class="avatar" style="background:${c.color};color:${c.textColor||'#fff'}">${c.initials}</div>
      <div class="candidate-info"><h4>${c.name}</h4><p>${c.role}</p></div>
      <div class="candidate-right">
        <div class="ai-match">✨ ${c.match}% match</div>
        <div class="action-btns">
          <button class="btn btn-outline btn-sm" onclick="toast('Perfil abierto')">Ver perfil</button>
          <button class="btn btn-green btn-sm" onclick="toast('✉️ Mensaje enviado')">Contactar</button>
        </div>
      </div>
    </div>`).join('');
}

function ofertaHTML() {
  return `
    ${nav('Volver','school','')}
    <div style="max-width:600px;margin:0 auto;padding:32px 28px">
      <div class="form-header"><h2>Publicar oferta</h2><p>La IA genera la descripción por ti.</p></div>
      <div class="form-group"><label class="form-label">Puesto</label>
        <select class="form-input" id="puestoSelect">
          <option>Profesor/a de Matemáticas</option><option>Profesor/a de Inglés</option>
          <option>Tutor/a de Primaria</option><option>Orientador/a escolar</option><option>Profesor/a de FP</option>
        </select>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Jornada</label>
          <select class="form-input"><option>Jornada completa</option><option>Media jornada</option><option>Sustitución</option></select>
        </div>
        <div class="form-group"><label class="form-label">Incorporación</label>
          <select class="form-input"><option>Inmediata</option><option>Septiembre 2025</option></select>
        </div>
      </div>
      <div class="form-group"><label class="form-label">Salario</label><input class="form-input" placeholder="26.000€ - 30.000€"></div>
      <div class="form-group">
        <label class="form-label">Descripción</label>
        <button class="ai-generate" onclick="generateDesc()">
          <div class="loading-dots" id="descLoading" style="display:none"><span>•</span><span>•</span><span>•</span></div>
          <span id="descGenLabel">✨ Generar descripción con IA</span>
        </button>
        <div class="ai-desc-box" id="descBox">La descripción aparecerá aquí...</div>
      </div>
      <button class="btn btn-primary btn-full btn-lg" style="margin-top:8px" onclick="toast('🚀 ¡Oferta publicada!');setTimeout(()=>go('school'),800)">Publicar oferta →</button>
    </div>`;
}

function addSkill(e) {
  if (e.key==='Enter') {
    const val = e.target.value.trim();
    if (!val||skills.includes(val)) return;
    skills.push(val);
    const tag = document.createElement('span');
    tag.className='skill-tag';
    tag.innerHTML=val+' <span class="remove" onclick="removeSkill(this)">×</span>';
    document.getElementById('skillTags').appendChild(tag);
    e.target.value='';
  }
}
function removeSkill(el) { el.parentElement.remove(); }

function generateBio() {
  const l=document.getElementById('bioLoading'), lb=document.getElementById('bioGenLabel'), b=document.getElementById('bioInput');
  if(!l) return;
  l.style.display='inline'; lb.style.display='none';
  setTimeout(()=>{ l.style.display='none'; lb.style.display='inline'; b.value='Docente vocacional con más de 8 años de experiencia. Especializado/a en metodología activa y aprendizaje basado en proyectos. Disponibilidad inmediata.'; toast('✨ Bio generada con IA'); },1800);
}

function generateDesc() {
  const l=document.getElementById('descLoading'), lb=document.getElementById('descGenLabel'), box=document.getElementById('descBox');
  const p=document.getElementById('puestoSelect')?.value||'Docente';
  if(!l) return;
  l.style.display='inline'; lb.style.display='none'; box.textContent='Generando...';
  setTimeout(()=>{ l.style.display='none'; lb.style.display='inline'; box.textContent=`Buscamos un/a ${p} para incorporarse a nuestro claustro. Persona vocacional con metodología innovadora y orientada al desarrollo integral del alumnado. Ofrecemos entorno colaborativo y estabilidad a largo plazo.`; toast('✨ Descripción generada'); },2000);
}

function openModal(html) {
  document.getElementById('modalContent').innerHTML=html;
  document.getElementById('modal').classList.add('open');
  document.getElementById('modalOverlay').classList.add('open');
}
function closeModal() {
  document.getElementById('modal').classList.remove('open');
  document.getElementById('modalOverlay').classList.remove('open');
}
function toast(msg) {
  const t=document.getElementById('toast');
  t.textContent=msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),3000);
}

document.addEventListener('DOMContentLoaded', ()=>go('home'));
