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

  // ── i18n EN/ES ──
  // Language is decided by the URL: "/" = English, "/es/" = Spanish.
  // Each page ships its copy statically in the HTML; JS only needs the few
  // dynamic strings used by the contact form.
  const LANG = (document.documentElement.lang === 'es') ? 'es' : 'en';

  const FORM_TXT = {
    en: { send: 'Send My Information →', sending: 'Sending...', sent: 'Message Sent ✓', error: 'Error — Try Again' },
    es: { send: 'Enviar Mi Información →', sending: 'Enviando...', sent: 'Mensaje Enviado ✓', error: 'Error — Intenta de Nuevo' }
  };

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

  // Expose the form handler for the inline onsubmit attribute
  window.handleSubmit = handleSubmit;
