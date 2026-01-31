import { useEffect, useRef, useState } from 'react';

const SECRET_CODE = '2211';
const HERO_TEXT = 'Nuestra historia infinita';
const HERO_TAGLINE = 'Cartas, sorpresas y noches de cine solo para nosotros.';

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

const INSTRUCTIONS = [
  { emoji: '✨', text: 'Momentos inolvidables de nuestra historia.' },
  { emoji: '💌', text: 'Cartas y sorpresas hechas con amor.' },
  { emoji: '🎟️',text: 'Cine VIP: tu pase eterno a nuestra cita.' },
  { emoji: '💍', text: 'El recuerdo de cuando dijimos "Sí".' },
];

export default function App() {
  const [digits, setDigits] = useState(['', '', '', '']);
  const [stage, setStage] = useState('login'); // login | welcome | hidden
  const [hasSeenIntro, setHasSeenIntro] = useState(false);
  const [lockState, setLockState] = useState('');
  const [errorVisible, setErrorVisible] = useState(false);
  const particlesRef = useRef(null);
  const heroRef = useRef(null);
  const carouselRef = useRef(null);
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

  const overlayClass = `login-screen ${stage === 'hidden' ? 'login-hidden' : ''}`;
  const navClass = stage === 'hidden' ? 'nav-visible' : '';

  return (
    <>
      <div id="particles" ref={particlesRef} />

      <div className={overlayClass}>
        {stage === 'login' && (
          <div className="login-box">
            <h1 className="login-title">Nuestra Página Juntos</h1>
            <p className="login-subtitle">"Donde cada recuerdo vive por siempre" ✨</p>

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

        <section id="pedida" className="proposal-section">
          <h2 className="section-title">Nuestro Aniversario</h2>

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

          <p className="anniversary-text">
            Desde el <strong>2 de Enero del 2026</strong>,<br />comenzamos nuestro capítulo más bonito.
          </p>

          <div className="polaroid-grid">
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
