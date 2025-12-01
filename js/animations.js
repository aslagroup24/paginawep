/* ==========================================================================
   ASLA GROUP - ANIMATION ENGINE (LIQUID GLASS PHYSICS)
   Author: Cristian Quispe Lucas (Optimized by AI)
   Tech: GSAP 3 + ScrollTrigger + QuickTo
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. Safety Check
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('⚠️ GSAP Core or ScrollTrigger missing.');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Configuración Global de Física "Glass"
  gsap.defaults({
    ease: 'expo.out', // Suave como el cristal
    duration: 1.2
  });

  // ==========================================================================
  // 2. HERO SECTION COREOGRAPHY (Timeline)
  // ==========================================================================
  // Usamos Timeline para sincronización perfecta sin 'delays' manuales
  const initHero = () => {
    const tl = gsap.timeline({ defaults: { opacity: 0, y: 30 } }); // Movimiento sutil (30px)

    tl.addLabel('start')
      .from('.hero-badge', { scale: 0.8, duration: 1 }, 'start')
      .from('.hero-title-top', { x: -20, duration: 1.4 }, 'start+=0.2')
      .from('.hero-title-main', { 
        y: 50, 
        scale: 0.95, 
        duration: 1.5,
        clearProps: 'all' // Limpiar para evitar conflictos con hover CSS
      }, 'start+=0.3')
      .from('.hero-subtitle', { duration: 1 }, '-=1')
      .from('.hero-buttons', { y: 20, duration: 1 }, '-=0.8')
      .from('.hero-stats', { y: 40, stagger: 0.1 }, '-=0.8')
      .from('.scroll-indicator', { opacity: 0, y: -10, duration: 2, repeat: -1, yoyo: true }, '+=0.5');
  };

  // ==========================================================================
  // 3. RESPONSIVE LOGIC (MatchMedia)
  // ==========================================================================
  ScrollTrigger.matchMedia({
    
    // A. Desktop Animations Only (Mouse intensive)
    "(min-width: 992px)": function() {
      
      // --- Mouse Parallax (High Performance quickTo) ---
      const heroContent = document.querySelector('.hero-content');
      if (heroContent) {
        const xTo = gsap.quickTo(heroContent, "x", { duration: 0.8, ease: "power3" });
        const yTo = gsap.quickTo(heroContent, "y", { duration: 0.8, ease: "power3" });

        window.addEventListener("mousemove", (e) => {
          const xPos = (e.clientX / window.innerWidth - 0.5) * 30; // 30px range
          const yPos = (e.clientY / window.innerHeight - 0.5) * 30;
          xTo(xPos);
          yTo(yPos);
        });
      }

      // --- Custom Cursor "Liquid" Effect ---
      const cursor = document.createElement('div');
      cursor.className = 'custom-cursor';
      // Estilos críticos inyectados por JS para asegurar funcionamiento
      Object.assign(cursor.style, {
        position: 'fixed', top: 0, left: 0, width: '20px', height: '20px',
        border: '1.5px solid #7FFFD4', borderRadius: '50%', pointerEvents: 'none',
        zIndex: 9999, transform: 'translate(-50%, -50%)', mixBlendMode: 'difference'
      });
      document.body.appendChild(cursor);

      const cursorX = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power2.out" });
      const cursorY = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power2.out" });

      window.addEventListener("mousemove", (e) => {
        cursorX(e.clientX);
        cursorY(e.clientY);
      });

      // Cursor Magnetism/Scaling on Hover
      const interactives = document.querySelectorAll('a, button, .service-card, .gallery-item');
      interactives.forEach(el => {
        el.addEventListener('mouseenter', () => gsap.to(cursor, { scale: 3, backgroundColor: 'rgba(127, 255, 212, 0.1)', duration: 0.3 }));
        el.addEventListener('mouseleave', () => gsap.to(cursor, { scale: 1, backgroundColor: 'transparent', duration: 0.3 }));
      });
    },

    // B. All Devices (ScrollTriggers)
    "all": function() {
      initHero();

      // --- Efficient Batching for Grids (Services & Gallery) ---
      // "Batch" es mucho más eficiente que crear un trigger por cada tarjeta
      ScrollTrigger.batch(".service-card, .gallery-item", {
        interval: 0.1, // Delay entre elementos del lote
        batchMax: 3,   // Máximo elementos por lote
        onEnter: batch => gsap.to(batch, {
          opacity: 1, 
          y: 0, 
          stagger: 0.15, 
          overwrite: true,
          duration: 1
        }),
        onLeaveBack: batch => gsap.set(batch, { opacity: 0, y: 50 }) // Reset sutil al volver arriba
      });

      // Setup inicial para batch (ocultarlos antes de animar)
      gsap.set(".service-card, .gallery-item", { opacity: 0, y: 50 });

      // --- Section Headers ---
      gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
          scrollTrigger: {
            trigger: header,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          y: 40,
          opacity: 0,
          duration: 1
        });
      });

      // --- Text Reveal (Word by Word) ---
      // Solo aplicamos si el navegador soporta Intl.Segmenter para no romper palabras complejas, o split simple
      const titles = document.querySelectorAll('.section-title');
      titles.forEach(title => {
        // Simple split por espacios
        const text = title.innerText;
        title.innerHTML = text.split(' ').map(t => `<span style="display:inline-block">${t}</span>`).join(' ');
        
        gsap.from(title.children, {
          scrollTrigger: {
            trigger: title,
            start: "top 90%"
          },
          y: 20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "back.out(1.7)"
        });
      });

      // --- About Section (Composition) ---
      const aboutTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-grid",
          start: "top 75%"
        }
      });
      
      aboutTl.from(".about-image-main", { x: -50, opacity: 0, duration: 1.2 })
             .from(".about-image-secondary", { y: 50, opacity: 0, duration: 1.2 }, "<0.2") // Overlap
             .from(".about-content > *", { x: 30, opacity: 0, stagger: 0.1 }, "<");

      // --- Contact Form ---
      gsap.from(".contact-card", {
        scrollTrigger: { trigger: ".contact", start: "top 80%" },
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "elastic.out(1, 0.75)"
      });
    }
  });

  // ==========================================================================
  // 4. FLOATING ELEMENTS (Continuous Ambient Motion)
  // ==========================================================================
  // Efecto de flotación perpetua para iconos
  gsap.to(".service-icon", {
    y: -10,
    duration: 2.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    stagger: {
      each: 0.2,
      from: "random"
    }
  });

  console.log('%c ASLA GROUP %c Liquid Glass Physics Active ', 'background:#0a7a4a; color:white; padding: 4px; border-radius: 4px 0 0 4px;', 'background:#111; color:#fff; padding: 4px; border-radius: 0 4px 4px 0;');
});