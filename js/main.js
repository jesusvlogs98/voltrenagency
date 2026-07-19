  // Custom cursor
  const cursor = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateCursor() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effects on cursor
  document.querySelectorAll('a, button, .service-card, .why-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorRing.style.transform = 'translate(-50%, -50%) scale(1.8)';
      cursorRing.style.borderColor = 'rgba(26,108,255,0.8)';
    });
    el.addEventListener('mouseleave', () => {
      cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorRing.style.borderColor = 'rgba(26,108,255,0.5)';
    });
  });

  // Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Webhook URL
  const WEBHOOK_URL = 'https://n8n.voltrenagency.com/webhook/voltren-leads';

  // Form submit
  async function handleSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    btn.textContent = FORM_TXT[LANG].sending;
    btn.disabled = true;

    const form = e.target;
    const formData = {
      firstName: form[0].value,
      lastName:  form[1].value,
      email:     form[2].value,
      company:   form[3].value,
      phone:     form[4].value,
      city:      form[5].value,
      service:   form[6].value,
      budget:    form[7].value,
      message:   form[8].value,
      lang:      LANG
    };

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body: formData })
      });
      btn.textContent = FORM_TXT[LANG].sent;
      btn.style.background = '#0A3B99';
      form.reset();
    } catch(err) {
      btn.textContent = FORM_TXT[LANG].error;
      btn.style.background = '#FF3B5C';
    }

    setTimeout(() => {
      btn.textContent = FORM_TXT[LANG].send;
      btn.style.background = '';
      btn.disabled = false;
    }, 4000);
  }

  // ── i18n EN/ES ──
  const FORM_TXT = {
    en: { send: 'Send My Information →', sending: 'Sending...', sent: 'Message Sent ✓', error: 'Error — Try Again' },
    es: { send: 'Enviar Mi Información →', sending: 'Enviando...', sent: 'Mensaje Enviado ✓', error: 'Error — Intenta de Nuevo' }
  };

  // [selector, index, Spanish HTML]
  const ES_MAP = [
    ['.nav-links a[href="#services"]', 0, 'Servicios'],
    ['.nav-links a[href="#why"]', 0, 'Por Qué Nosotros'],
    ['.nav-audit', 0, 'Auditoría Gratis'],
    ['.nav-links a.nav-cta', 0, 'Empezar'],
    ['.hero-eyebrow', 0, 'Agencia de Marketing y Publicidad · Sarasota, FL'],
    ['.hero-title', 0, 'TU MARCA.<br><span class="accent">AMPLIFICADA.</span><br><span class="outline">DOMINANTE.</span>'],
    ['.hero-body', 0, 'Combinamos <strong>producción de contenido de alto impacto</strong> con publicidad pagada de precisión para convertir tu marca en una fuerza del mercado. Sin relleno — solo <strong>resultados medibles</strong> a máximo voltaje.'],
    ['.hero-actions .btn-primary', 0, 'Empieza a Crecer'],
    ['.hero-actions .btn-ghost', 0, 'Ver Servicios'],
    ['.hero-stats .stat-item:nth-child(1) .stat-label', 0, 'ROAS Promedio'],
    ['.hero-stats .stat-item:nth-child(2) .stat-label', 0, 'Onboarding'],
    ['.hero-stats .stat-item:nth-child(3) .stat-label', 0, 'Dedicación'],
    ['#services .section-eyebrow', 0, 'Qué Hacemos'],
    ['#services .section-title', 0, 'NUESTROS<br><span>SERVICIOS</span>'],
    ['#services .section-desc', 0, 'Tres servicios principales diseñados para generar leads, construir autoridad y escalar tus ingresos.'],
    ['.services-grid .service-card:nth-child(1) .service-name', 0, 'ADS PAGADOS'],
    ['.services-grid .service-card:nth-child(1) .service-desc', 0, 'Campañas de Meta y Google basadas en datos, diseñadas para el máximo ROAS. Creamos, gestionamos y escalamos tu pauta con total transparencia.'],
    ['.services-grid .service-card:nth-child(2) .service-name', 0, 'VIDEO Y CONTENIDO'],
    ['.services-grid .service-card:nth-child(2) .service-desc', 0, 'Video y fotografía de alta producción creados específicamente para ads. Nos encargamos del concepto, la producción y la entrega — listos para convertir.'],
    ['.services-grid .service-card:nth-child(2) .service-tag:nth-child(1)', 0, 'Creativos de Ads'],
    ['.services-grid .service-card:nth-child(2) .service-tag:nth-child(3)', 0, 'Fotografía'],
    ['.services-grid .service-card:nth-child(3) .service-name', 0, 'ESTRATEGIA DE MARCA'],
    ['.services-grid .service-card:nth-child(3) .service-desc', 0, 'Desde el posicionamiento hasta la identidad visual, construimos marcas que captan la atención y generan confianza — antes de mostrar el primer anuncio.'],
    ['.services-grid .service-card:nth-child(3) .service-tag:nth-child(1)', 0, 'Posicionamiento'],
    ['.services-grid .service-card:nth-child(3) .service-tag:nth-child(2)', 0, 'Identidad'],
    ['.services-grid .service-card:nth-child(3) .service-tag:nth-child(3)', 0, 'Mensaje'],
    ['#why .section-eyebrow', 0, 'Por Qué Voltren'],
    ['#why .section-title', 0, 'NO SOLO<br><span>CORREMOS ADS</span>'],
    ['#why .section-desc', 0, 'La mayoría de las agencias separan la estrategia de la ejecución. Nosotros no — cada decisión está diseñada para dar resultados.'],
    ['.why-list .why-item:nth-child(1) h4', 0, 'Ejecución Integral'],
    ['.why-list .why-item:nth-child(1) .why-text p', 0, 'Producimos el contenido Y corremos los ads. Sin intermediarios, sin vacíos, sin excusas.'],
    ['.why-list .why-item:nth-child(2) h4', 0, 'Datos Primero, Siempre'],
    ['.why-list .why-item:nth-child(2) .why-text p', 0, 'Cada decisión de campaña está respaldada por números. Tienes un dashboard en vivo — no un PDF mensual.'],
    ['.why-list .why-item:nth-child(3) h4', 0, 'Enfoque Dedicado'],
    ['.why-list .why-item:nth-child(3) .why-text p', 0, 'No hacemos malabares con 50 clientes. Tu marca recibe atención real y una estrategia real.'],
    ['.why-list .why-item:nth-child(4) h4', 0, 'Hecho para Escalar'],
    ['.why-list .why-item:nth-child(4) .why-text p', 0, 'Construimos sistemas que crecen contigo — cuando estés listo para escalar, la infraestructura ya estará ahí.'],
    ['.metrics-card > div:first-child', 0, 'Resultados de Campaña de Ejemplo'],
    ['.metric-row .metric-label', 0, 'Retorno de Inversión Publicitaria'],
    ['.metric-row .metric-label', 1, 'Reducción de Costo por Lead'],
    ['.metric-row .metric-label', 2, 'Crecimiento de Ingresos (90 días)'],
    ['.metric-row .metric-label', 3, 'Tasa de Interacción'],
    ['.metrics-card > div:last-child', 0, '* Basado en resultados promedio de clientes'],
    ['.contact .section-eyebrow', 0, 'Trabajemos Juntos'],
    ['.contact .section-title', 0, 'IMPULSA TU<br><span>CRECIMIENTO</span>'],
    ['.contact .section-desc', 0, 'Cuéntanos sobre tu marca. Te responderemos en menos de 24 horas con una propuesta de estrategia personalizada.'],
    ['.contact-left h3', 0, '¿LISTO PARA<br><span>DOMINAR</span><br>TU MERCADO?'],
    ['.contact-left > p', 0, 'Seas un negocio local, una marca de e-commerce o una empresa en crecimiento — si vas en serio con los resultados, queremos hablar contigo.'],
    ['.contact-info .contact-info-item:nth-child(2)', 0, 'Sarasota, FL — Atendemos clientes en todo el país'],
    ['.contact-info .contact-info-item:nth-child(3)', 0, 'Respuesta garantizada en menos de 24 horas'],
    ['.form .form-group label', 0, 'Nombre'],
    ['.form .form-group label', 1, 'Apellido'],
    ['.form .form-group label', 2, 'Correo Electrónico'],
    ['.form .form-group label', 3, 'Empresa / Marca'],
    ['.form .form-group label', 4, 'Teléfono'],
    ['.form .form-group label', 5, 'Ciudad'],
    ['.form .form-group label', 6, 'Servicio de Interés'],
    ['.form .form-group label', 7, 'Presupuesto Mensual'],
    ['.form .form-group label', 8, 'Cuéntanos Tus Objetivos'],
    ['.form select option', 0, 'Selecciona un servicio'],
    ['.form select option', 1, 'Ads Pagados (Meta / Google)'],
    ['.form select option', 2, 'Video y Producción de Contenido'],
    ['.form select option', 3, 'Estrategia de Marca'],
    ['.form select option', 4, 'Paquete Completo'],
    ['.form select option', 5, 'Selecciona tu presupuesto'],
    ['.footer-links a[href="#services"]', 0, 'Servicios'],
    ['.footer-links a[href="#why"]', 0, 'Por Qué Nosotros'],
    ['.footer-links a[href="audit.html"]', 0, 'Auditoría Gratis'],
    ['.footer-links a[href="#contact"]', 0, 'Contacto'],
    ['.footer-copy', 0, '© 2026 Voltren Agency · voltrenagency.com · Todos los Derechos Reservados']
  ];

  // Placeholders: [selector, index, Spanish placeholder]
  const ES_PH = [
    ['.form input[type="text"]', 0, 'Juan'],
    ['.form input[type="text"]', 1, 'Pérez'],
    ['.form input[type="email"]', 0, 'juan@empresa.com'],
    ['.form input[type="text"]', 2, 'Nombre de tu empresa'],
    ['.form textarea', 0, '¿Qué quieres lograr en los próximos 90 días?']
  ];

  // Marquee items (translated by their English text)
  const MARQ_ES = {
    'Video Production': 'Producción de Video',
    'Brand Strategy': 'Estrategia de Marca',
    'Content Creation': 'Creación de Contenido',
    'Lead Generation': 'Generación de Leads',
    'Ad Creative': 'Creatividad Publicitaria',
    'Analytics & Reporting': 'Analítica y Reportes'
  };
  document.querySelectorAll('.marquee-item span').forEach((el, i) => {
    const es = MARQ_ES[el.textContent.trim()];
    if (es) ES_MAP.push(['.marquee-item span', i, es]);
  });

  let LANG = localStorage.getItem('voltren-lang') || 'en';
  const EN_STORE = {};
  const EN_PH_STORE = {};

  function applyLang() {
    ES_MAP.forEach((m, k) => {
      const el = document.querySelectorAll(m[0])[m[1]];
      if (!el) return;
      if (EN_STORE[k] === undefined) EN_STORE[k] = el.innerHTML;
      el.innerHTML = LANG === 'es' ? m[2] : EN_STORE[k];
    });
    ES_PH.forEach((m, k) => {
      const el = document.querySelectorAll(m[0])[m[1]];
      if (!el) return;
      if (EN_PH_STORE[k] === undefined) EN_PH_STORE[k] = el.placeholder;
      el.placeholder = LANG === 'es' ? m[2] : EN_PH_STORE[k];
    });
    document.documentElement.lang = LANG;
    const t = document.getElementById('langToggle');
    if (t) t.textContent = LANG === 'es' ? 'EN' : 'ES';
    const btn = document.getElementById('submitBtn');
    if (btn && !btn.disabled) btn.textContent = FORM_TXT[LANG].send;
  }

  function toggleLang() {
    LANG = LANG === 'es' ? 'en' : 'es';
    localStorage.setItem('voltren-lang', LANG);
    applyLang();
  }

  applyLang();
