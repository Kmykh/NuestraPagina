import { useEffect, useRef, useState } from 'react';

const SECRET_CODE = '2211';
const HERO_TEXT = 'Nuestra historia infinita';
const HERO_TAGLINE = 'Cartas, sorpresas y noches de cine solo para nosotros.';
const FIRST_MONTH_UNLOCK_KEY = 'first_month_unlocked';
const SITE_UNLOCK_KEY = 'site_unlock_ready';
const SITE_UNLOCK_AT = new Date('2026-02-01T08:00:00-05:00');

const MEMORIES = [
  {
    date: '22 NOV 2025',
    title: 'Felices 21 Años',
    desc: 'Tu regalo de cumpleaños. El inicio de las sorpresas.',
    icon: '🎂',
    url: 'https://hbmabel.netlify.app/',
  },
  {
    date: '23 DIC 2025',
    title: 'Nuestra Primera Cita',
    desc: 'El día que salimos juntos por primera vez.',
    icon: '💌',
    url: 'https://paratibel.netlify.app/',
  },
  {
    date: '31 DIC 2025',
    title: 'Sorpresa de Año Nuevo',
    desc: 'Invitación especial para nuestra cita del 2 de Enero.',
    icon: '✨',
    url: 'https://paratimabel.netlify.app/',
  },
  {
    date: '02 ENE 2026',
    title: 'Nuestro Aniversario',
    desc: '¡El día oficial! Cuando Ratón y Ratoncita se hicieron novios.',
    icon: '💍',
    url: '#pedida',
  },
  {
    date: '07 ENE 2026',
    title: 'Primer Día de Prácticas',
    desc: 'Un detalle floral para la mejor enfermera en su gran día.',
    icon: '💉',
    url: 'https://ratoncitam.netlify.app/',
  },
  {
    date: '19 ENE 2026',
    title: 'Nuestra Tercera Cita',
    desc: 'Otra invitación sorpresa llena de risas y complicidad.',
    icon: '🌙',
    url: 'https://mabelinviacion3.netlify.app/',
  },
];

const VISITED_PLACES = [
  {
    title: 'Museo Larco',
    desc: 'Entre huacos, reliquias y nuestra propia historia silenciosa.',
    icon: '🏛️',
  },
  {
    title: 'Comida de tacos',
    desc: 'Picante, risas, manos entrelazadas y un montón de servilletas.',
    icon: '🌮',
  },
  {
    title: 'Pollito a la brasa',
    desc: 'Los domingos saben mejor cuando compartimos la mesa.',
    icon: '🍗',
  },
  {
    title: 'Paseo por Jockey Cinemark',
    desc: 'Películas, palomitas y ese abrazo que siempre espero en la butaca.',
    icon: '🎬',
  },
];

const ANNIVERSARY_FACTS = [
  {
    title: 'Sí oficial',
    desc: '2 de enero de 2026. Latidos al mismo ritmo y un “sí” eterno.',
  },
  {
    title: 'Lugar secreto',
    desc: 'Un restaurante acogedor, risas compartidas y miradas que lo dijeron todo.',
  },
];

const ANNIVERSARY_PROMISES = [
  'Celebrar cada mes como si fuera el primero.',
  'Ser tu abrazo seguro después de cada guardia.',
  'Llenar nuestras fotos de risas, viajes y castillos.',
];

const LETTER_PARAGRAPHS = [
  'Hoy cumplimos un mes. Un mes que, dicho en semanas, son cuatro… pero que en emociones se siente como mucho más. Cuatro semanas donde aprendimos, sentimos, reímos, estuvimos tristes, nos cuidamos y, sobre todo, nos elegimos.',
  'Este mes no fue perfecto, pero fue real. Pasamos momentos intensos, conversaciones profundas y silencios que también dijeron cosas. Y aun así, aquí estamos. Más unidos, más conscientes, más enamorados.',
  'No sabes lo feliz que me hace caminar contigo, mirarte y sentir que estoy exactamente donde quiero estar. Estoy muy enamorado de ti, de tu forma de ser, de tu sensibilidad, de tu fuerza y de cómo haces que mi mundo se sienta distinto desde que estás en él.',
  'Gracias por este primer mes. Gracias por ser tú. Y gracias por elegirme también.',
];

const EXPECTATION_TEXT =
  'Y esto recién empieza… Porque cuando nos volvamos a ver, te esperan cosas bonitas. Momentos, sorpresas y detalles que he guardado con paciencia para ti. Así que espérame, ratoncita, que mi llegada viene cargada de abrazos pendientes, besos acumulados y mucho amor por darte.';

const COUNTDOWN_UNLOCK_AT = new Date('2026-02-02T08:00:00-05:00');
const NEXT_VISIT_DATE = new Date('2026-02-16T06:00:00-05:00');

const getCountdownValues = () => {
  const diff = NEXT_VISIT_DATE.getTime() - Date.now();
  const safeDiff = Math.max(diff, 0);
  const days = Math.floor(safeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((safeDiff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((safeDiff / (1000 * 60)) % 60);
  const seconds = Math.floor((safeDiff / 1000) % 60);
  return { days, hours, minutes, seconds };
};

const getUnlockCountdownValues = () => {
  const diff = COUNTDOWN_UNLOCK_AT.getTime() - Date.now();
  const safeDiff = Math.max(diff, 0);
  const days = Math.floor(safeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((safeDiff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((safeDiff / (1000 * 60)) % 60);
  const seconds = Math.floor((safeDiff / 1000) % 60);
  return { days, hours, minutes, seconds };
};

const getSiteCountdownValues = () => {
  const diff = SITE_UNLOCK_AT.getTime() - Date.now();
  const safeDiff = Math.max(diff, 0);
  const days = Math.floor(safeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((safeDiff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((safeDiff / (1000 * 60)) % 60);
  const seconds = Math.floor((safeDiff / 1000) % 60);
  return { days, hours, minutes, seconds };
};

const INSTRUCTIONS = [
  { emoji: '✨', text: 'Momentos inolvidables de nuestra historia.' },
  { emoji: '💌', text: 'Cartas y sorpresas hechas con amor.' },
  { emoji: '🎟️',text: 'Cine VIP: tu pase eterno a nuestra cita.' },
  { emoji: '💍', text: 'El recuerdo de cuando dijimos "Sí".' },
];

const hasUnlockedFirstMonth = () => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(FIRST_MONTH_UNLOCK_KEY) === 'true';
};

const hasUnlockedSite = () => {
  if (typeof window === 'undefined') return false;
  const unlockedByDate = Date.now() >= SITE_UNLOCK_AT.getTime();
  const stored = localStorage.getItem(SITE_UNLOCK_KEY) === 'true';

  if (unlockedByDate) {
    if (!stored) {
      try {
        localStorage.setItem(SITE_UNLOCK_KEY, 'true');
      } catch (error) {
        // ignore storage errors during hydration
      }
    }
    return true;
  }

  if (stored && !unlockedByDate) {
    try {
      localStorage.removeItem(SITE_UNLOCK_KEY);
    } catch (error) {
      // ignore storage errors during reset
    }
  }

  return false;
};

export default function App() {
  const [digits, setDigits] = useState(['', '', '', '']);
  const [stage, setStage] = useState('login'); // login | welcome | hidden
  const [hasSeenIntro, setHasSeenIntro] = useState(false);
  const [lockState, setLockState] = useState('');
  const [errorVisible, setErrorVisible] = useState(false);
  const [countdown, setCountdown] = useState(() => getCountdownValues());
  const [unlockCountdown, setUnlockCountdown] = useState(() => getUnlockCountdownValues());
  const [showCountdown, setShowCountdown] = useState(false);
  const [isSurpriseLocked, setIsSurpriseLocked] = useState(() => !hasUnlockedFirstMonth());
  const [isUnlockAvailable, setIsUnlockAvailable] = useState(() => Date.now() >= COUNTDOWN_UNLOCK_AT.getTime());
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [siteLocked, setSiteLocked] = useState(() => !hasUnlockedSite());
  const [siteCountdown, setSiteCountdown] = useState(() => getSiteCountdownValues());
  const particlesRef = useRef(null);
  const heroRef = useRef(null);
  const carouselRef = useRef(null);
  const countdownRef = useRef(null);
  const unlockTimeoutRef = useRef(null);
  const siteIntervalRef = useRef(null);
  const inputRefs = useRef(Array.from({ length: 4 }, () => null));

  useEffect(() => {
    const stored = localStorage.getItem('mabel_intro_seen') === 'true';
    setHasSeenIntro(stored);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', stage !== 'hidden');
    return () => document.body.classList.remove('no-scroll');
  }, [stage]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return undefined;

    const nodes = Array.from({ length: 30 }).map(() => {
      const firefly = document.createElement('div');
      firefly.className = 'firefly';
      const size = Math.random() * 8 + 4;
      firefly.style.width = `${size}px`;
      firefly.style.height = `${size}px`;
      firefly.style.left = `${Math.random() * 100}%`;
      firefly.style.animationDuration = `${Math.random() * 10 + 10}s`;
      firefly.style.animationDelay = `${Math.random() * 5}s`;
      container.appendChild(firefly);
      return firefly;
    });

    return () => nodes.forEach((node) => node.remove());
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;

    const interval = setInterval(() => {
      const heart = document.createElement('div');
      heart.className = 'floating-heart';
      heart.innerHTML = '❤';
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.bottom = '10%';
      heart.style.fontSize = `${Math.random() * 20 + 20}px`;
      heart.style.animationDuration = `${Math.random() * 3 + 3}s`;
      hero.appendChild(heart);
      setTimeout(() => heart.remove(), 6000);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (stage !== 'hidden') return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 },
    );

    const targets = document.querySelectorAll('.scroll-trigger');
    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, [stage]);

  useEffect(() => {
    const rail = carouselRef.current;
    if (!rail) return undefined;

    let isPointerDown = false;
    let startX = 0;
    let scrollStart = 0;

    const getX = (event) => (event.touches ? event.touches[0].pageX : event.pageX);

    const handleDown = (event) => {
      isPointerDown = true;
      rail.classList.add('dragging');
      startX = getX(event);
      scrollStart = rail.scrollLeft;
    };

    const handleMove = (event) => {
      if (!isPointerDown) return;
      event.preventDefault();
      const x = getX(event);
      const walk = (x - startX) * 1.1;
      rail.scrollLeft = scrollStart - walk;
    };

    const handleUp = () => {
      isPointerDown = false;
      rail.classList.remove('dragging');
    };

    const options = { passive: false };
    rail.addEventListener('mousedown', handleDown);
    rail.addEventListener('mousemove', handleMove);
    rail.addEventListener('mouseleave', handleUp);
    rail.addEventListener('mouseup', handleUp);
    rail.addEventListener('touchstart', handleDown, options);
    rail.addEventListener('touchmove', handleMove, options);
    rail.addEventListener('touchend', handleUp);
    rail.addEventListener('touchcancel', handleUp);

    return () => {
      rail.removeEventListener('mousedown', handleDown);
      rail.removeEventListener('mousemove', handleMove);
      rail.removeEventListener('mouseleave', handleUp);
      rail.removeEventListener('mouseup', handleUp);
      rail.removeEventListener('touchstart', handleDown, options);
      rail.removeEventListener('touchmove', handleMove, options);
      rail.removeEventListener('touchend', handleUp);
      rail.removeEventListener('touchcancel', handleUp);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setCountdown(getCountdownValues()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!siteLocked) return undefined;

    const updateSiteCountdown = () => {
      const values = getSiteCountdownValues();
      setSiteCountdown(values);
      if (SITE_UNLOCK_AT.getTime() <= Date.now()) {
        try {
          localStorage.setItem(SITE_UNLOCK_KEY, 'true');
        } catch (error) {
          // ignore storage errors
        }
        setSiteLocked(false);
        if (siteIntervalRef.current) {
          clearInterval(siteIntervalRef.current);
        }
      }
    };

    updateSiteCountdown();
    siteIntervalRef.current = setInterval(updateSiteCountdown, 1000);
    return () => {
      if (siteIntervalRef.current) {
        clearInterval(siteIntervalRef.current);
      }
    };
  }, [siteLocked]);

  useEffect(() => {
    if (showCountdown && countdownRef.current) {
      countdownRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [showCountdown]);

  useEffect(() => {
    if (!isSurpriseLocked) return undefined;

    const updateCountdown = () => {
      const values = getUnlockCountdownValues();
      setUnlockCountdown(values);
      if (!isUnlockAvailable && COUNTDOWN_UNLOCK_AT.getTime() <= Date.now()) {
        setIsUnlockAvailable(true);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [isSurpriseLocked, isUnlockAvailable]);

  useEffect(() => () => {
    if (unlockTimeoutRef.current) {
      clearTimeout(unlockTimeoutRef.current);
    }
  }, []);

  const handleDigitChange = (index, rawValue) => {
    const sanitized = rawValue.replace(/\D/g, '').slice(-1);
    const nextDigits = [...digits];
    nextDigits[index] = sanitized;
    setDigits(nextDigits);

    if (sanitized && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (nextDigits.every((digit) => digit)) {
      checkAccess(nextDigits);
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === 'Backspace' && digits[index] === '' && index > 0) {
      event.preventDefault();
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === 'Enter') {
      checkAccess();
    }
  };

  const checkAccess = (attemptDigits = digits) => {
    const attempt = attemptDigits.join('');
    if (attempt.length < 4) return;

    if (attempt === SECRET_CODE) {
      setLockState('open');
      setErrorVisible(false);
      setTimeout(() => {
        if (hasSeenIntro) {
          startJourney();
        } else {
          setStage('welcome');
        }
      }, 800);
    } else {
      setLockState('shake');
      setErrorVisible(true);
      setTimeout(() => setLockState(''), 600);
      setTimeout(() => setErrorVisible(false), 1200);
      setDigits(['', '', '', '']);
      requestAnimationFrame(() => inputRefs.current[0]?.focus());
    }
  };

  const startJourney = () => {
    localStorage.setItem('mabel_intro_seen', 'true');
    setHasSeenIntro(true);
    setStage('hidden');
    setLockState('');
  };

  const handleUnlockReveal = () => {
    if (!isUnlockAvailable || isUnlocking) return;
    setIsUnlocking(true);
    unlockTimeoutRef.current = setTimeout(() => {
      try {
        localStorage.setItem(FIRST_MONTH_UNLOCK_KEY, 'true');
      } catch (error) {
        // ignore storage issues
      }
      setIsSurpriseLocked(false);
      setIsUnlocking(false);
      setShowCountdown(false);
      unlockTimeoutRef.current = null;
    }, 700);
  };

  const overlayClass = `login-screen ${stage === 'hidden' ? 'login-hidden' : ''}`;
  const navClass = stage === 'hidden' ? 'nav-visible' : '';
  const letterWrapperClasses = ['letter-wrapper', 'scroll-trigger'];
  if (isSurpriseLocked) letterWrapperClasses.push('locked-letter');
  if (isUnlocking) letterWrapperClasses.push('unlocking');

  if (siteLocked) {
    return (
      <div className="site-lock-screen">
        <div className="site-lock-stars" aria-hidden="true" />
        <div className="site-lock-content">
          <span className="site-lock-pill">Algo se está preparando</span>
          <h1>Estamos trabajando en tu sorpresa</h1>
          <p>
            Hay manos ocupadas, corazones acelerados y detalles terminando de tomar forma. Cuando este contador llegue a
            cero, el portal se abrirá solo para ti.
          </p>
          <div className="site-lock-countdown" aria-live="polite">
            {[
              { label: 'Días', value: siteCountdown.days },
              { label: 'Horas', value: siteCountdown.hours },
              { label: 'Minutos', value: siteCountdown.minutes },
              { label: 'Segundos', value: siteCountdown.seconds },
            ].map((slot) => (
              <div key={slot.label} className="site-lock-box">
                <span className="site-lock-number">{String(slot.value).padStart(2, '0')}</span>
                <span className="site-lock-label">{slot.label}</span>
              </div>
            ))}
          </div>
          <p className="site-lock-date">Desbloqueo: Domingo 1 de febrero · 8:00 a.m.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div id="particles" ref={particlesRef} />

      <div className={overlayClass}>
        {stage === 'login' && (
          <div className="login-shell">
            <div className="login-hero-panel">
              <span className="login-pill">Solo nosotros</span>
              <h1>Nuestro amor Nuestra historia</h1>
              <p>
                Esta puerta guarda cartas, promesas y destellos de todo lo que vivimos. Respira hondo y abre con la clave
                que solo tú conoces.
              </p>
            </div>

            <div className="login-box glass">
              <h2 className="login-title-small">Portón a nuestra historia</h2>
              <p className="login-subtitle">Es el código DDMM de tu cumpleaños. Cada dígito desbloquea un latido.</p>

              <div className={`lock-container ${lockState}`}>
                <div className="lock-shackle" />
                <div className="lock-body" />
              </div>

              <div className="digit-container">
                {digits.map((digit, index) => (
                  <input
                    key={`digit-${index}`}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="tel"
                    inputMode="numeric"
                    maxLength={1}
                    className="digit-input"
                    value={digit}
                    onChange={(event) => handleDigitChange(index, event.target.value)}
                    onKeyDown={(event) => handleKeyDown(event, index)}
                    aria-label={`Digito ${index + 1}`}
                  />
                ))}
              </div>

              <p className="hint-text">Pista: La fecha de tu cumpleaños (DDMM) 🎂</p>
              <p className={`error-msg ${errorVisible ? 'error-visible' : ''}`}>Código incorrecto mi amor ❤️</p>
            </div>
          </div>
        )}

        {stage === 'welcome' && (
          <div className="welcome-box">
            <h2>¡Bienvenida Amor! 🐭❤️</h2>
            <p>He preparado este rincón especial con todo mi cariño para ti.</p>

            <ul className="instruction-list">
              {INSTRUCTIONS.map((item) => (
                <li key={item.text}>
                  <span className="instruction-icon">{item.emoji}</span>
                  {item.text}
                </li>
              ))}
            </ul>

            <button type="button" className="enter-btn" onClick={startJourney}>
              ¡Ver Nuestra Historia!
            </button>
          </div>
        )}
      </div>

      <nav id="navbar" className={navClass}>
        <div className="nav-logo">Ratón &amp; Ratoncita</div>
        <ul className="nav-links">
          <li>
            <a href="#inicio">Inicio</a>
          </li>
          <li>
            <a href="#cine">Cine VIP</a>
          </li>
          <li>
            <a href="#historia">Nuestra Historia</a>
          </li>
          <li>
            <a href="#viajes">Viajes</a>
          </li>
          <li>
            <a href="#lugares">Lugares</a>
          </li>
          <li>
            <a href="#primer-mes">Primer Mes</a>
          </li>
          <li>
            <a href="#pedida">El Gran Día</a>
          </li>
        </ul>
      </nav>

      <header id="inicio" className="hero" ref={heroRef}>
        <div className="hero-icons">
          <span className="mouse left">🐭</span>
          <span className="heart-beat">❤️</span>
          <span className="mouse right">🐭</span>
        </div>
        <h1>Maycol &amp; Mabel</h1>
        <h2 className="hero-subtitle">{HERO_TEXT}</h2>
        <p className="hero-tagline">{HERO_TAGLINE}</p>
        <div className="hero-cta">
          <a href="#historia" className="hero-btn">Ver recuerdos</a>
          <a href="#cine" className="hero-btn ghost">Noche de cine</a>
        </div>
        <div className="scroll-down">Desliza para ver más<br />▼</div>
      </header>

      <main>
        <section id="primer-mes" className={`first-month-section ${isSurpriseLocked ? 'section-locked' : ''}`}>
          {isSurpriseLocked && <div className="section-lock-veil" aria-hidden="true" />}
          <h2 className="section-title">Primer Mes</h2>
          <div className={letterWrapperClasses.join(' ')}>
            {isSurpriseLocked ? (
              <div className="surprise-lock">
                <span className="surprise-pill">Sorpresa</span>
                <h3 className="surprise-heading">Contador reservado</h3>
                <p className="surprise-note">
                  {!isUnlockAvailable ? (
                    <>
                      Estoy guardando esta parte para ti. El contador se abrirá el <strong>2 de febrero de 2026</strong> a las{' '}
                      <strong>8:00 a.m.</strong>
                    </>
                  ) : (
                    <>¡Llegó el momento! Presiona el botón para ver lo que guardé para ti.</>
                  )}
                </p>
                {!isUnlockAvailable ? (
                  <>
                    <div className="surprise-countdown" aria-live="polite">
                      {[
                        { label: 'Días', value: unlockCountdown.days },
                        { label: 'Horas', value: unlockCountdown.hours },
                        { label: 'Min', value: unlockCountdown.minutes },
                        { label: 'Seg', value: unlockCountdown.seconds },
                      ].map((slot) => (
                        <div key={slot.label} className="surprise-countdown-slot">
                          <span className="surprise-countdown-number">{String(slot.value).padStart(2, '0')}</span>
                          <span className="surprise-countdown-label">{slot.label}</span>
                        </div>
                      ))}
                    </div>
                    <div className="surprise-time">
                      <span>Cuando llegue la hora, la magia aparecerá automáticamente. Confía en mí.</span>
                    </div>
                  </>
                ) : (
                  <>
                    <button type="button" className="surprise-unlock-btn" onClick={handleUnlockReveal}>
                      Destapar sorpresa
                    </button>
                    <div className="surprise-time">
                      <span>Respira profundo y presiona cuando estés lista. Todo esto es para ti.</span>
                    </div>
                  </>
                )}
              </div>
            ) : !showCountdown ? (
              <>
                <p className="letter-greeting">Querida Mabel,</p>
                {LETTER_PARAGRAPHS.map((text, index) => (
                  <p
                    key={`letter-${text.slice(0, 6)}-${index}`}
                    className="letter-paragraph"
                    style={{ animationDelay: `${index * 0.18 + 0.2}s` }}
                  >
                    {text}
                  </p>
                ))}
                <p className="letter-signature">
                  Con todo mi amor,
                  <br />
                  Maycol 🤍
                </p>
                <button
                  type="button"
                  className="letter-btn"
                  onClick={() => setShowCountdown(true)}
                >
                  Continuar
                </button>
              </>
            ) : (
              <div ref={countdownRef} className="countdown-panel scroll-trigger visible">
                <h3 className="section-title animated-title">Llegada de Ratoncito</h3>
                <div className="countdown-glow" aria-hidden="true" />
                <div className="countdown-grid" aria-live="polite">
                  {[
                    { label: 'Días', value: countdown.days },
                    { label: 'Horas', value: countdown.hours },
                    { label: 'Minutos', value: countdown.minutes },
                    { label: 'Segundos', value: countdown.seconds },
                  ].map((slot) => (
                    <div key={slot.label} className="countdown-box">
                      <span className="count-number">{String(slot.value).padStart(2, '0')}</span>
                      <span className="count-label">{slot.label}</span>
                    </div>
                  ))}
                </div>
                <p className="letter-paragraph emphasis" style={{marginTop: '2rem'}}>{EXPECTATION_TEXT}</p>
                <p className="countdown-warning">Quédate atenta al temporizador, mi amor: si mi llegada a Lima cambia, él también se moverá. Te amo infinito, ratoncita. ❤️</p>
              </div>
            )}
          </div>
        </section>
        <section id="cine" className="cine-section">
          <h2 className="section-title" style={{ color: '#d4af37' }}>
            Noche de Película
          </h2>
          <p className="cine-description">
            Porque cada momento contigo es de película. Aquí tienes tu entrada exclusiva para nuestra cita virtual.
          </p>

          <div className="ticket-container scroll-trigger">
            <a href="https://meet.google.com/yqd-qoia-yxf" target="_blank" rel="noreferrer" className="ticket">
              <div className="ticket-stub">
                <span className="ticket-emoji">🍿</span>
                <span className="ticket-line">ADMIT ONE</span>
                <span className="ticket-pass">VIP PASS</span>
              </div>
              <div className="ticket-body">
                <div className="cinema-subtitle">Maycol &amp; Mabel Presents</div>
                <div className="cinema-title">Nuestro Universo</div>
                <div className="cinema-details">
                  FECHA: SIEMPRE <br />
                  HORA: AHORA MISMO <br />
                  ASIENTO: PRIMERA FILA ❤️
                </div>
                <div className="cta-play">▶</div>
              </div>
            </a>
          </div>
        </section>

        <section id="historia">
          <div className="section-label">Nuestros detalles</div>
          <h2 className="section-title">Momentos Inolvidables</h2>
          <p className="section-subtitle">Cada enlace es un portal a las sorpresas que preparé para ti, latiendo como nuestros corazones.</p>
          <div className="timeline-hearts" aria-hidden="true">
            {Array.from({ length: 8 }).map((_, index) => (
              <span key={`heart-${index}`} className={`timeline-heart timeline-heart-${index + 1}`}>
                ❤
              </span>
            ))}
          </div>
          <div className="memories-carousel-wrapper">
            <div className="memories-carousel" ref={carouselRef}>
              {MEMORIES.map((memory, index) => (
                <a
                  key={memory.title}
                  href={memory.url}
                  target={memory.url.startsWith('#') ? undefined : '_blank'}
                  rel={memory.url.startsWith('#') ? undefined : 'noreferrer'}
                  className="memory-card scroll-trigger"
                  style={{ animationDelay: `${index * 0.12}s` }}
                >
                  <div className="card-icon">{memory.icon}</div>
                  <div className="card-content">
                    <div className="card-date">{memory.date}</div>
                    <h3>{memory.title}</h3>
                    <p>{memory.desc}</p>
                    {!memory.url.startsWith('#') && <span className="card-details-btn">Ver Tu Detalle →</span>}
                  </div>
                  <span className="card-heart" aria-hidden="true">❤</span>
                </a>
              ))}
            </div>
            <div className="carousel-hint">Arrastra para descubrir ↔</div>
          </div>
        </section>

        <section id="mensaje-conexion" className="message-section">
          <h2 className="section-title">Tú y Yo</h2>
          <div className="message-content scroll-trigger">
            <span className="quote-mark top">"</span>
            <p>
              Hay conexiones que no se explican, se sienten. Y lo nuestro es exactamente eso:
              <strong> una conexión instantánea y única.</strong>
              <br />
              <br />
              Desde que llegaste, mi mundo tiene más luz. No eres solo mi amor, eres mi compañera de vida.
              <br />
              <strong>Te quiero, te amo</strong> y sobre todo…
              <br />
              <span className="message-highlight">Quiero una vida entera contigo.</span>
            </p>
            <span className="quote-mark bottom">"</span>
          </div>
        </section>

        <section id="viajes" className="travel-section">
          <div className="section-label">Primer Destino</div>
          <h2 className="section-title">Próximamente: Castillo de Chancay</h2>
          <p className="travel-lead">
            Aquí comenzará la colección de nuestros viajes juntos. Cada destino será un nuevo capítulo, lleno de momentos bonitos y recuerdos para siempre.
          </p>
          <div className="castle-card scroll-trigger">
            <div className="castle-badge">Próximamente</div>
            <h3>Castillo de Chancay</h3>
            <p className="castle-soon">
              Estoy guardando la fecha exacta y cada sorpresa para contártelo en persona. Solo quiero que sepas que este
              viaje será nuestro gran "por fin".
            </p>
            <div className="castle-footer simple">
              <span className="travel-status glow">plan secreto en marcha</span>
              <span className="castle-date">Te aviso apenas sea hora </span>
            </div>
          </div>
          <p className="travel-note">
            Este es solo el comienzo. Cuando menos lo esperes, estaremos mirando el mar desde el castillo.
          </p>
        </section>

        <section id="lugares" className="places-section">
          <div className="section-label">Nuestros paseos</div>
          <h2 className="section-title">Lugares Visitados Juntos</h2>
          <p className="section-subtitle">
            Todos esos rincones que ya nos pertenecen tienen un recuerdo, un olor y una risa guardada.
          </p>
          <div className="places-grid">
            {VISITED_PLACES.map((place) => (
              <article key={place.title} className="place-card scroll-trigger">
                <div className="place-icon" aria-hidden="true">{place.icon}</div>
                <h3>{place.title}</h3>
                <p>{place.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="pedida" className="proposal-section">
          <div className="section-label">Nuestro capítulo</div>
          <h2 className="section-title">Nuestro Aniversario</h2>

          <div className="anniversary-hero scroll-trigger">
            <div className="mice-container">
              <img
                src="/foto3.png"
                alt="Nosotros"
                className="hero-photo"
                onError={(event) => {
                  event.currentTarget.src = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800';
                }}
              />
            </div>
            <div className="anniversary-hero-copy">
              <span className="anniversary-pill">2 · ENE · 2026</span>
              <p className="anniversary-quote">
                Ese día prometimos que cada año tendría más magia, más calma y más nosotros.
              </p>
            </div>
          </div>

          <p className="anniversary-text">
            Desde el <strong>2 de Enero del 2026</strong>,<br />comenzamos nuestro capítulo más bonito. Ese momento me enseñó
            que tu sonrisa será por siempre mi hogar.
          </p>

          <div className="anniversary-highlight-grid">
            {ANNIVERSARY_FACTS.map((fact) => (
              <article key={fact.title} className="anniversary-highlight scroll-trigger">
                <h3>{fact.title}</h3>
                <p>{fact.desc}</p>
              </article>
            ))}
          </div>

          <div className="promise-card scroll-trigger">
            <h3>Promesa de Ratón</h3>
            <ul>
              {ANNIVERSARY_PROMISES.map((promise) => (
                <li key={promise}>{promise}</li>
              ))}
            </ul>
            <span className="promise-signature">Siempre tuyo, Maycol.</span>
          </div>

          <div className="polaroid-grid scroll-trigger">
            <div className="polaroid">
              <img
                src="/foto1.jpeg"
                alt="Pedida foto 1"
                onError={(event) => {
                  event.currentTarget.src =
                    'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=400';
                }}
              />
              <p>El momento</p>
            </div>
            <div className="polaroid">
              <img
                src="/foto2.jpeg"
                alt="Pedida foto 2"
                onError={(event) => {
                  event.currentTarget.src =
                    'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=400';
                }}
              />
              <p>Juntos por Siempre</p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>Hecho con código y mucho amor para Mabel 🐭❤️</p>
        <p className="footer-note">© 2026 Ratón y Ratoncita</p>
      </footer>
    </>
  );
}
