// Timeline principal de GSAP
let tl = gsap.timeline();

// Configuración AOS
const aosConfig = {
  duration: 800,
  easing: 'ease-out-cubic',
  once: true,
  offset: 120,
  delay: 0
};

// Variables globales
let isLoading = true;
let scrollPosition = 0;
let lastScrollTop = 0; // declaración (solo una vez)
// ====================================
// 2. LOADER INICIAL CON LOGO ASLA GROUP
// ====================================

function initLoader() {
  const loader = document.createElement('div');
  loader.id = 'asla-loader';
  loader.innerHTML = `
    <div class="loader-content">
      <div class="loader-logo">
        <h1>ASLA GROUP <span class="loader-leaf">🌿</span></h1>
      </div>
      <div class="loader-progress">
        <div class="progress-bar"></div>
      </div>
      <p class="loader-text">Cultivando espacios verdes...</p>
    </div>
  `;

  const styles = `
    #asla-loader {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #1b5e20, #43a047);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      color: white;
      font-family: 'Segoe UI', sans-serif;
    }

    .loader-content {
      text-align: center;
      opacity: 0;
      transform: scale(0.9);
    }

    .loader-logo h1 {
      font-size: 2.8rem;
      font-weight: 700;
      letter-spacing: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .loader-leaf {
      font-size: 2.2rem;
      animation: leafFloat 2.5s infinite ease-in-out;
    }

    .loader-progress {
      width: 220px;
      height: 5px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 3px;
      margin: 2rem auto;
      overflow: hidden;
    }

    .progress-bar {
      height: 100%;
      background: white;
      transform: translateX(-100%);
      animation: progressSlide 2.5s ease-out forwards;
    }

    .loader-text {
      font-size: 1.1rem;
      opacity: 0.85;
      margin-top: 1.2rem;
    }

    @keyframes leafFloat {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-10px) rotate(10deg); }
    }

    @keyframes progressSlide {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(0); }
    }
  `;

  // Aplicar estilos al documento
  const styleElement = document.createElement('style');
  styleElement.innerHTML = styles;
  document.head.appendChild(styleElement);
  document.body.appendChild(loader);

  // Animar entrada del contenido con GSAP
  gsap.to(".loader-content", {
    duration: 1.2,
    opacity: 1,
    scale: 1,
    ease: "power2.out"
  });
}
function initLoader() {
  // Crear loader dinámico
  const loader = document.createElement('div');
  loader.id = 'asla-loader';
  loader.innerHTML = `
    <div class="loader-content">
      <div class="loader-logo">
        <h1>ASLA GROUP</h1>
        <div class="loader-leaf">🌿</div>
      </div>
      <div class="loader-progress">
        <div class="progress-bar"></div>
      </div>
      <p class="loader-text">Cultivando espacios verdes...</p>
    </div>
  `;

  // Estilos del loader (incluso para móviles)
  const loaderStyles = `
    #asla-loader {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #2e7d32, #4caf50);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      color: #fff;
      font-family: 'Segoe UI', sans-serif;
    }

    .loader-content {
      text-align: center;
      transform: scale(0.8);
      opacity: 0;
    }

    .loader-logo h1 {
      font-size: 3rem;
      font-weight: 800;
      margin-bottom: 0.8rem;
      letter-spacing: 2px;
    }

    .loader-leaf {
      font-size: 2.2rem;
      margin-bottom: 1.2rem;
    }

    .loader-progress {
      width: 200px;
      height: 4px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 4px;
      margin: 1.5rem auto;
      overflow: hidden;
    }

    .progress-bar {
      width: 100%;
      height: 100%;
      background: #fff;
      transform: translateX(-100%);
    }

    .loader-text {
      font-size: 1.1rem;
      opacity: 0.9;
    }

    @keyframes leafFloat {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-12px) rotate(15deg); }
    }

    @media (max-width: 768px) {
      .loader-logo h1 { font-size: 2rem; }
      .loader-progress { width: 150px; }
      .loader-text { font-size: 1rem; }
    }
  `;

  // Inyectar estilos
  const styleSheet = document.createElement('style');
  styleSheet.textContent = loaderStyles;
  document.head.appendChild(styleSheet);
  document.body.appendChild(loader);

  // Animación de entrada del contenido
  gsap.to('.loader-content', {
    scale: 1,
    opacity: 1,
    duration: 1,
    ease: 'power3.out'
  });

  // Hoja flotante animada
  gsap.to('.loader-leaf', {
    rotation: 20,
    y: -10,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  // Barra de progreso
  gsap.to('.progress-bar', {
    x: '0%',
    duration: 2.8,
    ease: 'power2.inOut',
    delay: 0.4
  });

  // Aparición del texto
  gsap.from('.loader-text', {
    opacity: 0,
    y: 25,
    duration: 1.2,
    delay: 1.3,
    ease: 'expo.out'
  });

  // Rebote suave del logo
  gsap.from('.loader-logo h1', {
    y: -50,
    opacity: 0,
    duration: 1,
    delay: 0.6,
    ease: 'back.out(1.8)'
  });

  // Ocultar loader luego de 3.5s
  setTimeout(hideLoader, 3500);
}

function hideLoader() {
  const loader = document.getElementById('asla-loader');
  if (loader) {
    gsap.to(loader, {
      opacity: 0,
      scale: 0.92,
      duration: 0.9,
      ease: 'power2.inOut',
      onComplete: () => {
        loader.remove();
        isLoading = false;
        initMainAnimations(); // Puedes definir esta función para animaciones de entrada
      }
    });
  }
}
// ====================================
// 3. ANIMACIONES PRINCIPALES AL CARGAR
// ====================================

function initMainAnimations() {
  // Animación del navbar con efecto slide-down + fade
  gsap.from('#navbar', {
    y: -80,
    opacity: 0,
    duration: 1,
    ease: 'expo.out',
    delay: 0.2
  });

  // Hero - animación escalonada para dar profundidad
  gsap.from('.hero-content h1', {
    y: 50,
    opacity: 0,
    scale: 0.95,
    duration: 1.2,
    ease: 'power4.out',
    delay: 0.5
  });

  gsap.from('.hero-content p', {
    y: 40,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    delay: 0.7
  });

  // Botones con rebote elegante y aparición secuencial
  gsap.from('.hero-content .btn', {
    y: 30,
    opacity: 0,
    duration: 0.9,
    ease: 'back.out(1.8)',
    delay: 0.9,
    stagger: 0.2
  });

  // Elementos decorativos opcionales (si los tienes)
  gsap.from('.hero-decor', {
    scale: 0,
    opacity: 0,
    duration: 1,
    ease: 'elastic.out(1, 0.75)',
    delay: 1.2
  });

  // Iniciar máquina de escribir con ligera espera
  setTimeout(() => {
    initTypewriter();
  }, 1600);
}
// ====================================
// 4. EFECTO MÁQUINA DE ESCRIBIR
// ====================================

function initTypewriter() {
  const typewriterElement = document.querySelector('.typewriter-text');
  if (!typewriterElement) return;

  const text = "Soluciones verdes para espacios vivos";
  const typingSpeed = 75;
  const cursorChar = "|";
  let index = 0;

  // Vaciar contenido antes de empezar
  typewriterElement.innerHTML = '<span class="typed-text"></span><span class="cursor">' + cursorChar + '</span>';
  const typedText = typewriterElement.querySelector('.typed-text');
  const cursor = typewriterElement.querySelector('.cursor');

  // Iniciar animación de parpadeo del cursor
  const cursorStyles = `
    .cursor {
      animation: blink 1s infinite;
      color: #4caf50;
      font-weight: bold;
    }
    @keyframes blink {
      0%, 49% { opacity: 1; }
      50%, 100% { opacity: 0; }
    }
  `;
  if (!document.querySelector('#cursor-style')) {
    const style = document.createElement('style');
    style.id = 'cursor-style';
    style.textContent = cursorStyles;
    document.head.appendChild(style);
  }

  // Función recursiva de escritura
  function typeChar() {
    if (index < text.length) {
      typedText.textContent += text.charAt(index);
      index++;
      setTimeout(typeChar, typingSpeed);
    }
  }

  typeChar();
}
// ====================================
// 5. ANIMACIONES CON SCROLL TRIGGER
// ====================================

function initScrollAnimations() {
  // Registrar plugin ScrollTrigger si está disponible
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Animación de íconos de servicios (rotación y aparición)
  gsap.utils.toArray('.service-card .service-icon').forEach((icon, index) => {
    gsap.fromTo(icon,
      {
        rotation: 90,
        scale: 0.2,
        opacity: 0
      },
      {
        rotation: 0,
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: 'elastic.out(1, 0.5)',
        scrollTrigger: {
          trigger: icon,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        delay: index * 0.15
      }
    );
  });

  // Animación de tarjetas de servicios (fade + desplazamiento en diagonal)
  gsap.utils.toArray('.service-card').forEach((card, index) => {
    gsap.fromTo(card,
      {
        y: 50,
        x: -30,
        opacity: 0
      },
      {
        y: 0,
        x: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        },
        delay: index * 0.2
      }
    );
  });
}

  // ====================================
// 5. ANIMACIONES CON SCROLL TRIGGER (CONTINUACIÓN)
// ====================================

function initScrollAnimations() {
  // Animación de títulos de sección (entrada vertical suave con desvanecimiento)
  gsap.utils.toArray('.section-title').forEach((title, index) => {
    gsap.from(title, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: title,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      delay: index * 0.1
    });
  });

  // Parallax suave en imágenes (efecto sutil al hacer scroll)
  gsap.utils.toArray('.parallax-img').forEach(img => {
    gsap.to(img, {
      yPercent: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: img,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });
  });
}
// ====================================
// 6. ANIMACIONES DE BOTONES
// ====================================

function initButtonAnimations() {
  const mainButton = document.querySelector('.btn-primary');

  if (mainButton) {
    // Animación de rebote cada 5 segundos si no está cargando
    setInterval(() => {
      if (!window.isLoading) {
        gsap.fromTo(mainButton,
          { scale: 1 },
          {
            scale: 1.15,
            duration: 0.3,
            ease: 'back.out(2)',
            yoyo: true,
            repeat: 1
          }
        );
      }
    }, 5000);

    // Efecto al pasar el mouse (hover) más fluido
    mainButton.addEventListener('mouseenter', () => {
      gsap.to(mainButton, {
        scale: 1.05,
        duration: 0.2,
        ease: 'power1.out'
      });
    });

    mainButton.addEventListener('mouseleave', () => {
      gsap.to(mainButton, {
        scale: 1,
        duration: 0.2,
        ease: 'power1.out'
      });
    });
  }
}

 // ====================================
// 7. EFECTOS DE INTERACCIÓN EN BOTONES
// ====================================

function initGlobalButtonEffects() {
  const botones = document.querySelectorAll('.btn');

  botones.forEach(btn => {
    // Efecto al pasar el mouse (hover) – animación más suave y con transición de rebote
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, {
        scale: 1.07,
        duration: 0.25,
        ease: 'back.out(1.7)'
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        scale: 1,
        duration: 0.25,
        ease: 'back.out(1.7)'
      });
    });

    // Efecto visual al hacer clic (click rápido hacia abajo)
    btn.addEventListener('mousedown', () => {
      gsap.to(btn, {
        scale: 0.94,
        duration: 0.1,
        ease: 'power2.inOut'
      });
    });

    // Vuelve al estado hover o normal tras el clic
    btn.addEventListener('mouseup', () => {
      gsap.to(btn, {
        scale: 1.07,
        duration: 0.15,
        ease: 'power2.out'
      });
    });

    // También para pantallas táctiles
    btn.addEventListener('touchstart', () => {
      gsap.to(btn, {
        scale: 0.94,
        duration: 0.1,
        ease: 'power2.inOut'
      });
    });

    btn.addEventListener('touchend', () => {
      gsap.to(btn, {
        scale: 1.07,
        duration: 0.15,
        ease: 'power2.out'
      });
    });
  });
}
// ====================================
// 7. EFECTOS DE IMÁGENES MEJORADOS
// ====================================

function initImageEffects() {
  const imagenes = document.querySelectorAll('.service-card img, .gallery-img');

  imagenes.forEach(img => {
    img.style.transformStyle = 'preserve-3d'; // Garantiza el efecto 3D

    img.addEventListener('mouseenter', () => {
      gsap.to(img, {
        scale: 1.08,
        rotationY: 8,
        rotationX: 6,
        duration: 0.45,
        ease: 'power3.out',
        transformPerspective: 800,
        transformOrigin: 'center center'
      });
    });

    img.addEventListener('mousemove', (e) => {
      const rect = img.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateY = ((x - centerX) / centerX) * 10;
      const rotateX = -((y - centerY) / centerY) * 10;

      gsap.to(img, {
        rotationY: rotateY,
        rotationX: rotateX,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    img.addEventListener('mouseleave', () => {
      gsap.to(img, {
        scale: 1,
        rotationY: 0,
        rotationX: 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    });
  });
}

 // ====================================
// 7. EFECTOS DE IMÁGENES MEJORADOS
// ====================================

function initImageEffects() {
  const imagenes = document.querySelectorAll('.service-card img, .gallery-img');

  imagenes.forEach(img => {
    img.style.transformStyle = 'preserve-3d';

    img.addEventListener('mouseenter', () => {
      gsap.to(img, {
        scale: 1.08,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    img.addEventListener('mousemove', (e) => {
      const rect = img.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / 10).toFixed(2);
      const rotateY = ((centerX - x) / 10).toFixed(2);

      gsap.to(img, {
        rotationX: rotateX,
        rotationY: rotateY,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    img.addEventListener('mouseleave', () => {
      gsap.to(img, {
        scale: 1,
        rotationX: 0,
        rotationY: 0,
        duration: 0.4,
        ease: 'power2.out'
      });
    });
  });
}

// ====================================
// 8. NAVEGACIÓN INTELIGENTE MEJORADA
// ====================================

// ...más adelante
lastScrollTop = 100; // reasignación ✔️
let isNavbarHidden = false;

function initNavigation() {
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScrollTop > lastScrollTop && currentScrollTop > 100 && !isNavbarHidden) {
      // Scroll hacia abajo - ocultar navbar
      gsap.to(navbar, {
        y: -100,
        duration: 0.35,
        ease: 'power3.out'
      });
      isNavbarHidden = true;
    } else if (currentScrollTop < lastScrollTop && isNavbarHidden) {
      // Scroll hacia arriba - mostrar navbar
      gsap.to(navbar, {
        y: 0,
        duration: 0.35,
        ease: 'power3.out'
      });
      isNavbarHidden = false;
    }

    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // Protege contra valores negativos
  });
}

  // Smooth scroll para enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        gsap.to(window, {
          duration: 1,
          scrollTo: target,
          ease: 'power2.inOut'
        });
      }
    });
  });
// ====================================
// SCROLL SUAVE A ENLACES INTERNOS
// ====================================

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Ignorar si es solo "#"
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();

        const offset = 0; // Puedes ajustar si tienes un navbar fijo

        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: target,
            offsetY: offset
          },
          ease: 'power2.inOut'
        });
      }
    });
  });
}
// Se espera a que todo el contenido de la página (DOM) esté cargado antes de ejecutar el script.
// Esta es una buena práctica para evitar errores.
document.addEventListener('DOMContentLoaded', () => {

    // =================================================================
    // FUNCIÓN PARA EL BOTÓN "VOLVER ARRIBA"
    // Se encarga de crear, estilizar y dar funcionalidad al botón.
    // =================================================================
    function initScrollToTop() {
        // Si el botón ya existe en la página, no hacemos nada más para evitar duplicados.
        if (document.querySelector('.scroll-to-top')) {
            return;
        }

        // 1. Crear el elemento del botón en memoria.
        const scrollBtn = document.createElement('button');
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.innerHTML = '↑'; // Símbolo de la flecha hacia arriba.
        scrollBtn.setAttribute('aria-label', 'Volver arriba');
        
        // 2. Añadir el botón al cuerpo del documento HTML.
        document.body.appendChild(scrollBtn);

        // 3. Crear y añadir los estilos CSS para el botón directamente en el <head>.
        // Esto evita tener que modificar tu archivo style.css y mantiene el componente autocontenido.
        const style = document.createElement('style');
        style.textContent = `
          .scroll-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #43e97b, #38f9d7); /* Gradiente verde atractivo */
            color: white;
            border: none;
            border-radius: 50%; /* Círculo perfecto */
            font-size: 1.5rem;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
            z-index: 999;
            opacity: 0; /* Inicialmente invisible */
            pointer-events: none; /* No se puede hacer clic cuando está invisible */
            transform: scale(0.8); /* Efecto de escala inicial */
            transition: all 0.3s ease; /* Transición suave para todos los cambios */
          }

          .scroll-to-top.show {
            opacity: 1; /* Hacer visible */
            pointer-events: auto; /* Permitir clics */
            transform: scale(1); /* Tamaño normal */
          }

          .scroll-to-top:hover {
            transform: scale(1.1); /* Agrandar al pasar el mouse */
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3); /* Sombra más pronunciada */
          }
        `;
        document.head.appendChild(style);

        // 4. Lógica para mostrar y ocultar el botón.
        window.addEventListener('scroll', () => {
            // Si el usuario ha bajado más de 300 píxeles, muestra el botón.
            if (window.scrollY > 300) {
                scrollBtn.classList.add('show');
            } else {
                scrollBtn.classList.remove('show');
            }
        });

        // 5. Acción que ocurre al hacer clic en el botón.
        scrollBtn.addEventListener('click', () => {
            // Usamos el método nativo del navegador para un scroll suave hacia la parte superior.
            // Es más eficiente y no requiere plugins adicionales.
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // =================================================================
    // FUNCIÓN PARA INICIALIZAR AOS (ANIMATE ON SCROLL)
    // Con un fallback por si la librería no carga.
    // =================================================================
    function initAOS(config = {}) {
        // Comprueba si la librería AOS está disponible en el objeto window.
        if (typeof AOS !== 'undefined') {
            AOS.init(config); // Si está, la inicializa con la configuración dada.
        } else {
            // Si AOS no está, muestra una advertencia en la consola del navegador.
            console.warn('La librería AOS no se ha cargado. Las animaciones de scroll no funcionarán.');
        }
    }


    // =================================================================
    // INICIALIZACIÓN DE TODAS LAS FUNCIONES
    // Aquí se "llaman" a las funciones para que se ejecuten.
    // =================================================================
    
    initScrollToTop();

    initAOS({
        duration: 800,   // Duración de la animación en milisegundos.
        once: true,      // La animación solo ocurre una vez por elemento.
        offset: 100,     // La animación se dispara 100px antes de que el elemento sea visible.
    });

});

// ====================================
// 11. Optimización para dispositivos móviles
// ====================================
function initMobileOptimizations() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (!isMobile) return;

  // Reduce la velocidad global de las animaciones GSAP para mejor rendimiento
  if (gsap && gsap.globalTimeline) {
    gsap.globalTimeline.timeScale(0.8);
  }

  // Añade clase para estilos específicos móviles (ej. desactivar hover)
  document.body.classList.add('mobile-device');

  // Simplifica/parchea efectos parallax basados en ScrollTrigger con scrub
  if (typeof ScrollTrigger !== 'undefined' && ScrollTrigger.getAll) {
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars?.scrub) {
        trigger.kill();
      }
    });
  }
}
// ====================================
// 12. Función para mostrar notificaciones con GSAP
// ====================================
function showNotification(message, type = 'success', duration = 3000) {
  // Crear contenedor de notificación
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;

  // Estilos CSS encapsulados y añadidos solo una vez
  if (!document.getElementById('notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
      .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        background: linear-gradient(135deg, #4caf50, #2e7d32); /* default success */
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        cursor: pointer;
        user-select: none;
        transform: translateX(100%);
        opacity: 0;
        will-change: transform, opacity;
      }
      .notification.success {
        background: linear-gradient(135deg, #4caf50, #2e7d32);
      }
      .notification.error {
        background: linear-gradient(135deg, #f44336, #d32f2f);
      }
      .notification.info {
        background: linear-gradient(135deg, #2196f3, #1976d2);
      }
      .notification:hover {
        box-shadow: 0 6px 18px rgba(0,0,0,0.3);
      }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(notification);

  // Animación de entrada
  gsap.to(notification, {
    x: 0,
    opacity: 1,
    duration: 0.5,
    ease: 'back.out(1.7)'
  });

  // Función para eliminar notificación con animación de salida
  const removeNotification = () => {
    gsap.to(notification, {
      x: 100,
      opacity: 0,
      duration: 0.5,
      ease: 'power1.in',
      onComplete: () => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }
    });
  };

  // Auto eliminar después de 'duration' ms
  const timeoutId = setTimeout(removeNotification, duration);

  // Permitir cerrar al hacer click (y limpiar timeout)
  notification.addEventListener('click', () => {
    clearTimeout(timeoutId);
    removeNotification();
  });
}
// ====================================
// Remover notificación después de un tiempo con animación GSAP
// ====================================
function autoRemoveNotification(notification, delay = 3000) {
  setTimeout(() => {
    gsap.to(notification, {
      x: '100%',
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => notification.remove()
    });
  }, delay);
}

// ====================================
// Función para validar formularios
// ====================================
function validateForm(formElement) {
  const inputs = formElement.querySelectorAll('input[required], textarea[required]');
  let isValid = true;

  inputs.forEach(input => {
    const isEmpty = !input.value.trim();

    gsap.to(input, {
      borderColor: isEmpty ? '#f44336' : '#4caf50',
      duration: 0.3,
      ease: 'power2.out'
    });

    if (isEmpty) isValid = false;
  });

  return isValid;
}

// ====================================
// 13. Inicialización principal después de cargar DOM
// ====================================
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar loader (asumo que tienes esta función definida)
  initLoader();

  // Retrasar inicialización para que loader termine (3.2 seg)
  setTimeout(() => {
    initAOS();
    initScrollAnimations();
    initButtonAnimations();
    initImageEffects();
    initNavigation();
    initScrollToTop();
    initMobileOptimizations();

    // Mostrar notificación de bienvenida después de 4 seg
    setTimeout(() => {
      showNotification('¡Bienvenido a ASLA GROUP!', 'success');
    }, 4000);
  }, 3200);
});
// ====================================
// 14. EVENTOS GLOBALES
// ====================================

// Evitar selección y arrastre no deseado excepto en inputs y textareas
window.addEventListener('dragstart', e => e.preventDefault());

window.addEventListener('selectstart', e => {
  const tag = e.target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA') return;
  e.preventDefault();
});

// Optimización de rendimiento en redimensionamiento
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (typeof ScrollTrigger !== 'undefined' && ScrollTrigger.refresh) {
      ScrollTrigger.refresh();
    }
  }, 250);
});

// ====================================
// 15. EXPORTAR FUNCIONES AL OBJETO GLOBAL (OPCIONAL)
// ====================================

// Exponer funciones para uso externo o debugging
window.ASLA = {
  showNotification,
  validateForm,
  initTypewriter
};
document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    navbar.classList.add("show"); // Puedes definir .show en CSS para animaciones
  } else {
    console.warn("❗ No se encontró el elemento con clase .navbar");
  }

  console.log("🌿 ASLA GROUP - Script cargado exitosamente");
  console.log("🚀 Animaciones profesionales inicializadas");
});
