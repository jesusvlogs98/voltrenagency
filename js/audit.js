  const WEBHOOK_URL = 'https://n8n.voltrenagency.com/webhook/voltren-audit';

  // ── i18n ──
  const I18N = {
    en: {
      'nav.services': 'Services', 'nav.why': 'Why Us', 'nav.audit': 'Free Audit', 'nav.cta': 'Get Started',
      'h.eyebrow': 'Free Self-Audit · No Email Walls',
      'h.title': 'THE 5-MINUTE<br><span>ADS AUDIT</span>',
      'h.sub': "The exact checklist we use to diagnose <strong>why Meta Ads aren't converting</strong>. Answer 7 questions honestly and get your score instantly. Fail 3 or more? Money is going in the trash.",
      'q1': 'Is your pixel correctly installed and firing on every key event?',
      'q2': 'Are you excluding audiences that already purchased?',
      'q3': 'Are the first 3 seconds of your creative optimized to stop the scroll?',
      'q4': 'Does your CTA match the funnel stage the user is in?',
      'q5': 'Do you have at least 3 ad variants running in parallel?',
      'q6': 'Does your landing page load in under 3 seconds on mobile?',
      'q7': 'Is retargeting active with a 7-day window?',
      'btn.yes': 'Yes', 'btn.no': 'No',
      'f.title': 'GET YOUR <span>SCORE</span>',
      'f.sub': 'Tell us where to send your results and recommendations.',
      'f.name': 'Name', 'f.email': 'Email', 'f.company': 'Company / Instagram (optional)',
      'f.btn': 'Get My Score →',
      'f.note': 'Free. No spam. Your answers go straight to our strategy team.',
      'r.label': 'Your Ads Health Score',
      'r.cta': 'Book My Free Audit →',
      'ft.copy': '© 2026 Voltren Agency · voltrenagency.com',
      'ph.name': 'John Smith', 'ph.email': 'john@company.com', 'ph.company': '@yourbrand',
      'alert.answers': 'Please answer all 7 questions first.',
      'sending': 'Sending...', 'error': 'Error — Try Again',
      'msg.good': "<strong>Solid foundation.</strong> You passed the audit — but \"good\" is where most brands stall. If you want to scale past your current ceiling, let's talk strategy.",
      'msg.bad': "You failed <strong>{n} of 7 checks</strong> — that's money going in the trash every single day. Book your free audit and we'll show you exactly where it's leaking."
    },
    es: {
      'nav.services': 'Servicios', 'nav.why': 'Por Qué Nosotros', 'nav.audit': 'Auditoría Gratis', 'nav.cta': 'Empezar',
      'h.eyebrow': 'Autoauditoría Gratis · Sin Muros de Email',
      'h.title': 'LA AUDITORÍA DE ADS<br><span>EN 5 MINUTOS</span>',
      'h.sub': 'El checklist exacto que usamos para diagnosticar <strong>por qué tus Meta Ads no están convirtiendo</strong>. Responde 7 preguntas con honestidad y recibe tu puntaje al instante. ¿Fallaste 3 o más? Hay dinero yéndose a la basura.',
      'q1': '¿Tu pixel está correctamente instalado y disparando en cada evento clave?',
      'q2': '¿Estás excluyendo audiencias que ya compraron?',
      'q3': '¿Los primeros 3 segundos de tu creativo están optimizados para frenar el scroll?',
      'q4': '¿Tu CTA coincide con la etapa del funnel donde está el usuario?',
      'q5': '¿Tienes al menos 3 variantes de anuncio corriendo en paralelo?',
      'q6': '¿Tu landing page carga en menos de 3 segundos en móvil?',
      'q7': '¿Tienes retargeting activo con ventana de 7 días?',
      'btn.yes': 'Sí', 'btn.no': 'No',
      'f.title': 'RECIBE TU <span>PUNTAJE</span>',
      'f.sub': 'Dinos a dónde enviamos tus resultados y recomendaciones.',
      'f.name': 'Nombre', 'f.email': 'Email', 'f.company': 'Empresa / Instagram (opcional)',
      'f.btn': 'Ver Mi Puntaje →',
      'f.note': 'Gratis. Sin spam. Tus respuestas van directo a nuestro equipo de estrategia.',
      'r.label': 'Tu Puntaje de Salud de Ads',
      'r.cta': 'Agendar Mi Auditoría Gratis →',
      'ft.copy': '© 2026 Voltren Agency · voltrenagency.com',
      'ph.name': 'Juan Pérez', 'ph.email': 'juan@empresa.com', 'ph.company': '@tumarca',
      'alert.answers': 'Responde las 7 preguntas primero.',
      'sending': 'Enviando...', 'error': 'Error — Intenta de Nuevo',
      'msg.good': '<strong>Base sólida.</strong> Pasaste la auditoría — pero en "bien" es donde la mayoría de las marcas se estancan. Si quieres escalar más allá de tu techo actual, hablemos de estrategia.',
      'msg.bad': 'Fallaste <strong>{n} de 7 puntos</strong> — eso es dinero yéndose a la basura todos los días. Agenda tu auditoría gratuita y te mostramos exactamente por dónde se está fugando.'
    }
  };

  let LANG = localStorage.getItem('voltren-lang') || 'en';

  function T(key) { return I18N[LANG][key] || I18N.en[key] || ''; }

  function applyLang() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const v = T(el.dataset.i18n);
      if (v) el.innerHTML = v;
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const v = T(el.dataset.i18nPh);
      if (v) el.placeholder = v;
    });
    document.documentElement.lang = LANG;
    document.getElementById('langToggle').textContent = LANG === 'es' ? 'EN' : 'ES';
    // Re-mark selected answers (innerHTML reset removes nothing, classes persist on buttons)
    if (document.getElementById('result').classList.contains('show')) renderResult();
  }

  function toggleLang() {
    LANG = LANG === 'es' ? 'en' : 'es';
    localStorage.setItem('voltren-lang', LANG);
    applyLang();
  }

  // ── Checklist logic ──
  const answers = {};

  document.querySelectorAll('.q-card').forEach(card => {
    card.querySelectorAll('.q-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const q = card.dataset.q;
        answers[q] = btn.dataset.a;
        card.classList.add('answered');
        card.querySelectorAll('.q-btn').forEach(b => b.classList.remove('sel-yes', 'sel-no'));
        btn.classList.add(btn.dataset.a === 'yes' ? 'sel-yes' : 'sel-no');
      });
    });
  });

  let lastScore = null, lastFails = null;

  function renderResult() {
    document.getElementById('scoreNum').textContent = lastScore;
    const msg = lastFails >= 3 ? T('msg.bad').replace('{n}', lastFails) : T('msg.good');
    document.getElementById('resultMsg').innerHTML = msg;
  }

  async function submitAudit(e) {
    e.preventDefault();
    if (Object.keys(answers).length < 7) {
      alert(T('alert.answers'));
      return;
    }

    const btn = document.getElementById('auditBtn');
    btn.textContent = T('sending');
    btn.disabled = true;

    const fails = Object.values(answers).filter(a => a === 'no').length;
    const score = 7 - fails;
    lastScore = score; lastFails = fails;

    // Human-readable summary for CRM + Telegram
    const summary = [1,2,3,4,5,6,7]
      .map(i => `${i}. ${I18N.es['q' + i]} → ${answers[i] === 'yes' ? 'SÍ ✓' : 'NO ✗'}`)
      .join('\n');

    const payload = {
      name: document.getElementById('fName').value,
      email: document.getElementById('fEmail').value,
      company: document.getElementById('fCompany').value,
      answers: answers,
      score: score,
      failed: fails,
      summary: summary,
      lang: LANG
    };

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body: payload })
      });
    } catch (err) {
      // Show the score anyway — the lead sees value even if the webhook hiccups
    }

    renderResult();
    document.getElementById('result').classList.add('show');
    document.getElementById('result').scrollIntoView({ behavior: 'smooth', block: 'center' });
    btn.textContent = T('f.btn');
    btn.disabled = false;
  }

  applyLang();
