
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
let lastScrollTop = 0;

// ====================================
// 2. LOADER INICIAL CON LOGO ASLA GROUP
// ====================================

function initLoader() {
  // Crear loader HTML dinámicamente
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
  
  // Estilos del loader
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
      color: white;
    }
    
    .loader-content {
      text-align: center;
      transform: scale(0.8);
      opacity: 0;
    }
    
    .loader-logo h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
      font-weight: 700;
      letter-spacing: 2px;
    }
    
    .loader-leaf {
      font-size: 2rem;
      animation: leafFloat 2s infinite ease-in-out;
    }
    
    .loader-progress {
      width: 200px;
      height: 4px;
      background: rgba(255,255,255,0.3);
      border-radius: 2px;
      margin: 2rem auto;
      overflow: hidden;
    }
    
    .progress-bar {
      height: 100%;
      background: white;
      border-radius: 2px;
      transform: translateX(-100%);
    }
    
    .loader-text {
      font-size: 1.1rem;
      opacity: 0.9;
      margin-top: 1rem;
    }
    
    @keyframes leafFloat {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-10px) rotate(10deg); }
    }
    
    @media (max-width: 768px) {
      .loader-logo h1 { font-size: 2rem; }
      .loader-progress { width: 150px; }
    }
  `;
  
   // Inyectar estilos
    const styleSheet = document.createElement('style');
    styleSheet.textContent = loaderStyles;
    document.head.appendChild(styleSheet);
    
    // Agregar loader al DOM
    document.body.appendChild(loader);
    
    // Animación de entrada del loader
    gsap.to('.loader-content', {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      ease: 'back.out(1.7)'
    });

    // Animación de la hoja (leaf) girando y flotando
    gsap.fromTo('.loader-leaf', 
      { rotation: -30, y: 0 }, 
      { 
        rotation: 30, 
        y: -10, 
        duration: 1.2, 
        yoyo: true, 
        repeat: -1, 
        ease: 'sine.inOut' 
      }
    );

    // Animación de la barra de progreso
    gsap.to('.progress-bar', {
      x: '0%',
      duration: 2.5,
      ease: 'power2.out',
      delay: 0.5
    });

    // Animación de aparición del texto
    gsap.from('.loader-text', {
      opacity: 0,
      y: 20,
      duration: 1,
      delay: 1.2,
      ease: 'power2.out'
    });

    // Animación de rebote del logo
    gsap.from('.loader-logo h1', {
      y: -40,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      ease: 'bounce.out'
    });
  
  // Remover loader después de 3 segundos
  setTimeout(() => {
    hideLoader();
  }, 3000);
}

function hideLoader() {
  const loader = document.getElementById('asla-loader');
  if (loader) {
    gsap.to('#asla-loader', {
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
      ease: 'power2.in',
      onComplete: () => {
        loader.remove();
        isLoading = false;
        initMainAnimations();
      }
    });
  }
}

// ====================================
// 3. ANIMACIONES PRINCIPALES AL CARGAR
// ====================================

function initMainAnimations() {
  // Animación del navbar
  gsap.from('#navbar', {
    y: -100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    delay: 0.2
  });
  
  // Animación del hero - logo y título
  gsap.from('.hero-content h1', {
    y: 80,
    opacity: 0,
    duration: 1.2,
    ease: 'power4.out',
    delay: 0.4
  });
  
  gsap.from('.hero-content p', {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    delay: 0.6
  });
  
  // Animación de botones principales
  gsap.from('.hero-content .btn', {
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: 'back.out(1.7)',
    delay: 0.8,
    stagger: 0.2
  });
  
  // Inicializar efecto typewriter
  setTimeout(() => {
    initTypewriter();
  }, 1500);
}

// ====================================
// 4. EFECTO MÁQUINA DE ESCRIBIR
// ====================================

function initTypewriter() {
  const typewriterElement = document.querySelector('.typewriter-text');
  if (!typewriterElement) return;
  
  const text = "Soluciones verdes para espacios vivos";
  const speed = 100;
  let i = 0;
  
  typewriterElement.innerHTML = '';
  
  function typeWriter() {
    if (i < text.length) {
      typewriterElement.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    } else {
      // Agregar cursor parpadeante
      typewriterElement.innerHTML += '<span class="cursor">|</span>';
      
      // Estilos del cursor
      const cursorStyles = `
        .cursor {
          animation: blink 1s infinite;
          color: #4caf50;
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `;
      
      if (!document.querySelector('#cursor-styles')) {
        const style = document.createElement('style');
        style.id = 'cursor-styles';
        style.textContent = cursorStyles;
        document.head.appendChild(style);
      }
    }
  }
  
  typeWriter();
}

// ====================================
// 5. ANIMACIONES CON SCROLL TRIGGER
// ====================================

function initScrollAnimations() {
  // Registrar plugin ScrollTrigger
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }
  
  // Animación de íconos de servicios
  gsap.utils.toArray('.service-card .service-icon').forEach((icon, index) => {
    gsap.from(icon, {
      rotation: 360,
      scale: 0,
      opacity: 0,
      duration: 1,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: icon,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      },
      delay: index * 0.1
    });
  });
  
  // Animación de tarjetas de servicios
  gsap.utils.toArray('.service-card').forEach((card, index) => {
    gsap.from(card, {
      y: 100,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        end: 'bottom 15%',
        toggleActions: 'play none none reverse'
      },
      delay: index * 0.2
    });
  });
  
  // Animación de títulos de sección
  gsap.utils.toArray('.section-title').forEach(title => {
    gsap.from(title, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: title,
        start: 'top 90%',
        end: 'bottom 10%',
        toggleActions: 'play none none reverse'
      }
    });
  });
  
  // Parallax suave en imágenes
  gsap.utils.toArray('.parallax-img').forEach(img => {
    gsap.to(img, {
      yPercent: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: img,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });
}

// ====================================
// 6. ANIMACIONES DE BOTONES
// ====================================

function initButtonAnimations() {
  // Botón principal que rebota cada 5 segundos
  const mainButton = document.querySelector('.btn-primary');
  if (mainButton) {
    setInterval(() => {
      if (!isLoading) {
        gsap.to(mainButton, {
          scale: 1.1,
          duration: 0.3,
          ease: 'power2.out',
          yoyo: true,
          repeat: 1
        });
      }
    }, 5000);
  }
  
  // Efectos hover para todos los botones
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    // Efecto de click
    btn.addEventListener('mousedown', () => {
      gsap.to(btn, {
        scale: 0.95,
        duration: 0.1,
        ease: 'power2.out'
      });
    });
    
    btn.addEventListener('mouseup', () => {
      gsap.to(btn, {
        scale: 1.05,
        duration: 0.1,
        ease: 'power2.out'
      });
    });
  });
}

// ====================================
// 7. EFECTOS DE IMÁGENES
// ====================================

function initImageEffects() {
  // Efecto 3D hover en imágenes
  document.querySelectorAll('.service-card img, .gallery-img').forEach(img => {
    img.addEventListener('mouseenter', () => {
      gsap.to(img, {
        scale: 1.1,
        rotationY: 5,
        rotationX: 5,
        duration: 0.5,
        ease: 'power2.out',
        transformPerspective: 600,
        transformOrigin: 'center center'
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
    
    // Efecto de movimiento con el mouse
    img.addEventListener('mousemove', (e) => {
      const rect = img.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      gsap.to(img, {
        rotationX: rotateX,
        rotationY: rotateY,
        duration: 0.3,
        ease: 'power1.out'
      });
    });
  });
}

// ====================================
// 8. NAVEGACIÓN INTELIGENTE
// ====================================

function initNavigation() {
  // Navbar que aparece/desaparece según scroll
  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScrollTop > lastScrollTop && currentScrollTop > 100) {
      // Scroll hacia abajo - ocultar navbar
      gsap.to(navbar, {
        y: -80,
        duration: 0.3,
        ease: 'power2.out'
      });
    } else if (currentScrollTop < lastScrollTop) {
      // Scroll hacia arriba - mostrar navbar
      gsap.to(navbar, {
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
    
    lastScrollTop = currentScrollTop;
  });
  
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
}

// ====================================
// 9. BOTÓN "VOLVER ARRIBA"
// ====================================

function initScrollToTop() {
  // Crear botón si no existe
  if (!document.querySelector('.scroll-to-top')) {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '↑';
    scrollBtn.setAttribute('aria-label', 'Volver arriba');
    document.body.appendChild(scrollBtn);
    
    // Estilos del botón
    const btnStyles = `
      .scroll-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #4caf50, #2e7d32);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
        z-index: 1000;
        transform: scale(0);
        transition: all 0.3s ease;
      }
      
      .scroll-to-top.show {
        transform: scale(1);
      }
      
      .scroll-to-top:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
      }
    `;
    
    if (!document.querySelector('#scroll-btn-styles')) {
      const style = document.createElement('style');
      style.id = 'scroll-btn-styles';
      style.textContent = btnStyles;
      document.head.appendChild(style);
    }
  }
  
  const scrollBtn = document.querySelector('.scroll-to-top');
  
  // Mostrar/ocultar botón según scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollBtn.classList.add('show');
    } else {
      scrollBtn.classList.remove('show');
    }
  });
  
  // Funcionalidad del botón
  scrollBtn.addEventListener('click', () => {
    gsap.to(window, {
      duration: 1,
      scrollTo: 0,
      ease: 'power2.inOut'
    });
  });
}

// ====================================
// 10. INICIALIZACIÓN AOS
// ====================================

function initAOS() {
  // Verificar si AOS está disponible
  if (typeof AOS !== 'undefined') {
    AOS.init(aosConfig);
  } else {
    // Fallback con IntersectionObserver
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Observar elementos con atributos data-aos
    document.querySelectorAll('[data-aos]').forEach(el => {
      observer.observe(el);
    });
  }
}

// ====================================
// 11. OPTIMIZACIÓN PARA MÓVILES
// ====================================

function initMobileOptimizations() {
  // Detectar dispositivo móvil
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    // Reducir animaciones en móviles
    gsap.globalTimeline.timeScale(0.8);
    
    // Desactivar efectos hover en móviles
    document.body.classList.add('mobile-device');
    
    // Simplificar parallax en móviles
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.scrub) {
        trigger.kill();
      }
    });
  }
}

// ====================================
// 12. FUNCIONES UTILITARIAS
// ====================================

// Función para mostrar notificaciones
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  const notificationStyles = `
    .notification {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      color: white;
      font-weight: 500;
      z-index: 10000;
      transform: translateX(100%);
      opacity: 0;
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
  `;
  
  if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = notificationStyles;
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
  
  // Remover después de 3 segundos
  setTimeout(() => {
    gsap.to(notification, {
      x: '100%',
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => notification.remove()
    });
  }, 3000);
}

// Función para validar formularios
function validateForm(formElement) {
  const inputs = formElement.querySelectorAll('input[required], textarea[required]');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!input.value.trim()) {
      gsap.to(input, {
        borderColor: '#f44336',
        duration: 0.3,
        ease: 'power2.out'
      });
      isValid = false;
    } else {
      gsap.to(input, {
        borderColor: '#4caf50',
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  });
  
  return isValid;
}

// ====================================
// 13. INICIALIZACIÓN PRINCIPAL
// ====================================

document.addEventListener('DOMContentLoaded', function() {
  // Inicializar loader
  initLoader();
  
  // Inicializar todas las funciones después del loader
  setTimeout(() => {
    initAOS();
    initScrollAnimations();
    initButtonAnimations();
    initImageEffects();
    initNavigation();
    initScrollToTop();
    initMobileOptimizations();
    
    // Mostrar notificación de bienvenida
    setTimeout(() => {
      showNotification('¡Bienvenido a ASLA GROUP!', 'success');
    }, 4000);
  }, 3200);
});

// ====================================
// 14. EVENTOS GLOBALES
// ====================================

// Prevenir comportamiento por defecto en desarrollo
window.addEventListener('dragstart', (e) => e.preventDefault());
window.addEventListener('selectstart', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  e.preventDefault();
});

// Optimización de rendimiento
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 250);
});

// ====================================
// 15. EXPORTAR FUNCIONES (OPCIONAL)
// ====================================

// Si necesitas acceder a funciones desde el exterior
window.ASLA = {
  showNotification,
  validateForm,
  initTypewriter
};

console.log('🌿 ASLA GROUP - Script cargado exitosamente');
console.log('🚀 Animaciones profesionales inicializadas');