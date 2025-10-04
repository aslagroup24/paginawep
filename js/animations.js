/* ===================================
   ASLA GROUP - ANIMATIONS
   Author: Cristian Quispe Lucas
   Description: GSAP animations and scroll effects
   =================================== */

// Wait for GSAP to load
document.addEventListener('DOMContentLoaded', () => {
  // Check if GSAP is loaded
  if (typeof gsap === 'undefined') {
    console.warn('GSAP not loaded. Animations will not work.');
    return;
  }

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // ===================================
  // HERO SECTION ANIMATIONS
  // ===================================
  
  // Hero Badge Animation
  gsap.from('.hero-badge', {
    y: -50,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: 'power3.out'
  });

  // Hero Title Top Animation
  gsap.from('.hero-title-top', {
    x: -100,
    opacity: 0,
    duration: 1,
    delay: 0.5,
    ease: 'power3.out'
  });

  // Hero Title Main Animation
  gsap.from('.hero-title-main', {
    x: 100,
    opacity: 0,
    duration: 1,
    delay: 0.7,
    ease: 'power3.out'
  });

  // Hero Subtitle Animation
  gsap.from('.hero-subtitle', {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.9,
    ease: 'power3.out'
  });

  // Hero Buttons Animation
  gsap.from('.hero-buttons', {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 1.1,
    ease: 'power3.out'
  });

  // Hero Stats Animation
  gsap.from('.hero-stats', {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 1.3,
    ease: 'power3.out'
  });

  // Scroll Indicator Animation
  gsap.from('.scroll-indicator', {
    opacity: 0,
    duration: 1,
    delay: 1.5,
    ease: 'power3.out'
  });

  // ===================================
  // PARALLAX EFFECT FOR HERO
  // ===================================
  gsap.to('.hero-content', {
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    },
    y: 300,
    opacity: 0,
    ease: 'none'
  });

  // ===================================
  // SECTION HEADERS ANIMATION
  // ===================================
  gsap.utils.toArray('.section-header').forEach(header => {
    gsap.from(header, {
      scrollTrigger: {
        trigger: header,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });
  });
// ===================================
// SERVICE CARDS ANIMATION
// ===================================
gsap.from('.service-grid.active', {
  scrollTrigger: {
    trigger: '.services',
    start: 'top 80%',
    toggleActions: 'restart none restart reverse'
  },
  y: 100,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2,
  ease: 'power3.out'
});

  // ===================================
  // ABOUT SECTION ANIMATIONS
  // ===================================
  
  // About Content Animation
  gsap.from('.about-content', {
    scrollTrigger: {
      trigger: '.about',
      start: 'top 70%',
      toggleActions: 'restart none restart reverse'
    },
    x: -100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  });

  // About Images Animation
  gsap.from('.about-images', {
    scrollTrigger: {
      trigger: '.about',
      start: 'top 70%',
      toggleActions: 'restart none restart reverse'
    },
    x: 100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  });

  // About Features Animation
  gsap.from('.about-feature', {
    scrollTrigger: {
      trigger: '.about-features',
      start: 'top 80%',
      toggleActions: 'restart none restart reverse'
    },
    y: 50,
    opacity: 0,
    duration: 0.6,
    stagger: 0.2,
    ease: 'power3.out'
  });

  // About Badge Animation
  gsap.from('.about-badge', {
    scrollTrigger: {
      trigger: '.about-badge',
      start: 'top 90%',
      toggleActions: 'restart none restart reverse'
    },
    scale: 0,
    opacity: 0,
    rotation: -180,
    duration: 0.8,
    ease: 'back.out(1.7)'
  });

  // ===================================
  // GALLERY ANIMATION
  // ===================================
  gsap.from('.gallery-item', {
    scrollTrigger: {
      trigger: '.gallery',
      start: 'top 70%',
      toggleActions: 'restart none restart reverse'
    },
    scale: 0.8,
    opacity: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: 'power3.out'
  });

  // ===================================
  // CONTACT SECTION ANIMATIONS
  // ===================================
  
  // Contact Info Animation
  gsap.from('.contact-info', {
    scrollTrigger: {
      trigger: '.contact',
      start: 'top 70%',
      toggleActions: 'restart none restart reverse'
    },
    x: -80,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  });

  // Contact Form Animation
  gsap.from('.contact-form', {
    scrollTrigger: {
      trigger: '.contact',
      start: 'top 70%',
      toggleActions: 'restart none restart reverse'
    },
    x: 80,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  });

  // Contact Cards Stagger Animation
  gsap.from('.contact-card', {
    scrollTrigger: {
      trigger: '.contact-info',
      start: 'top 80%',
      toggleActions: 'restart none restart reverse'
    },
    y: 40,
    opacity: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: 'power3.out'
  });

  // Form Groups Animation
  gsap.from('.form-group', {
    scrollTrigger: {
      trigger: '.contact-form',
      start: 'top 80%',
      toggleActions: 'restart none restart reverse'
    },
    y: 30,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power3.out'
  });

  // ===================================
  // FOOTER ANIMATION
  // ===================================
  gsap.from('.footer-content > *', {
    scrollTrigger: {
      trigger: '.footer',
      start: 'top 90%',
      toggleActions: 'restart none restart reverse'
    },
    y: 50,
    opacity: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: 'power3.out'
  });

  // ===================================
  // FLOATING ANIMATION FOR SERVICE ICONS
  // ===================================
  gsap.to('.service-icon', {
    y: -15,
    duration: 2,
    ease: 'power1.inOut',
    repeat: -1,
    yoyo: true,
    stagger: {
      each: 0.3,
      from: 'random'
    }
  });

  // ===================================
  // SCROLL LINE ANIMATION
  // ===================================
  gsap.to('.scroll-line', {
    scaleY: 0,
    duration: 1.5,
    ease: 'power1.inOut',
    repeat: -1,
    transformOrigin: 'top center'
  });

  // ===================================
  // MOUSE PARALLAX EFFECT ON HERO
  // ===================================
  const hero = document.querySelector('.hero-content');
  
  if (hero) {
    document.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX / window.innerWidth - 0.5;
      const mouseY = e.clientY / window.innerHeight - 0.5;
      
      gsap.to(hero, {
        x: mouseX * 20,
        y: mouseY * 20,
        duration: 0.5,
        ease: 'power2.out'
      });
    });
  }

  // ===================================
  // IMAGE REVEAL ANIMATION
  // ===================================
  gsap.utils.toArray('.about-image-main, .about-image-secondary').forEach(img => {
    gsap.from(img, {
      scrollTrigger: {
        trigger: img,
        start: 'top 85%',
        toggleActions: 'restart none restart reverse'
      },
      clipPath: 'inset(0 100% 0 0)',
      duration: 1.2,
      ease: 'power3.out'
    });
  });

  // ===================================
  // TEXT REVEAL ANIMATION
  // ===================================
  gsap.utils.toArray('.section-title').forEach(title => {
    const words = title.textContent.split(' ');
    title.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');
    
    gsap.from(title.querySelectorAll('.word'), {
      scrollTrigger: {
        trigger: title,
        start: 'top 85%',
        toggleActions: 'restart none restart reverse'
      },
      y: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out'
    });
  });

  // ===================================
  // SCROLL PROGRESS BAR (OPTIONAL)
  // ===================================
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0;
    height: 4px;
    background: linear-gradient(90deg, #10b981, #3b82f6);
    z-index: 9999;
    transition: width 0.1s ease;
  `;
  document.body.appendChild(progressBar);

  gsap.to('.scroll-progress', {
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3,
      onUpdate: (self) => {
        progressBar.style.width = `${self.progress * 100}%`;
      }
    }
  });

  // ===================================
  // INTERSECTION OBSERVER FOR FADE-IN
  // ===================================
  const fadeElements = document.querySelectorAll('.fade-in-element');
  
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        gsap.to(entry.target, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out'
        });
        fadeObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  fadeElements.forEach(el => {
    gsap.set(el, { opacity: 0, y: 50 });
    fadeObserver.observe(el);
  });

  // ===================================
  // CUSTOM CURSOR EFFECT (OPTIONAL)
  // ===================================
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid #10b981;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.2s ease;
    display: none;
  `;
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
      x: e.clientX - 10,
      y: e.clientY - 10,
      duration: 0.3,
      ease: 'power2.out'
    });
  });

  // Show cursor on desktop only
  if (window.innerWidth > 768) {
    cursor.style.display = 'block';
  }

  // Scale cursor on hover over interactive elements
  const hoverElements = document.querySelectorAll('a, button, .service-card, .gallery-item');
  
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(cursor, {
        scale: 1.5,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    el.addEventListener('mouseleave', () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });

  // ===================================
  // SMOOTH SCROLL WITH GSAP
  // ===================================
  /*
  // Uncomment if you want GSAP smooth scroll instead of CSS
  gsap.registerPlugin(ScrollSmoother);
  
  ScrollSmoother.create({
    smooth: 1,
    effects: true,
    smoothTouch: 0.1
  });
  */

  // ===================================
  // REFRESH SCROLLTRIGGER ON RESIZE
  // ===================================
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);
  });

  // ===================================
  // KILL ANIMATIONS ON MOBILE (PERFORMANCE)
  // ===================================
  if (window.innerWidth < 768) {
    // Disable heavy animations on mobile
    gsap.globalTimeline.timeScale(2); // Speed up animations
  }

  // ===================================
  // CONSOLE LOG
  // ===================================
  console.log('%c GSAP Animations Loaded ', 'background: #10b981; color: white; padding: 5px 10px; font-size: 12px;');

}); // End DOMContentLoaded

// ===================================
// UTILITY: Create Stagger Animation
// ===================================
function createStaggerAnimation(selector, triggerSelector, options = {}) {
  const defaults = {
    y: 50,
    opacity: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: 'power3.out',
    start: 'top 80%'
  };

  const settings = { ...defaults, ...options };

  gsap.from(selector, {
    scrollTrigger: {
      trigger: triggerSelector,
      start: settings.start,
      toggleActions: 'restart none restart reverse'
    },
    y: settings.y,
    opacity: settings.opacity,
    duration: settings.duration,
    stagger: settings.stagger,
    ease: settings.ease
  });
}

// ===================================
// UTILITY: Create Parallax Animation
// ===================================
function createParallax(selector, speed = 0.5) {
  gsap.to(selector, {
    scrollTrigger: {
      trigger: selector,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    },
    y: (i, target) => -target.offsetHeight * speed,
    ease: 'none'
  });
}

// ===================================
// EXPORT FUNCTIONS (IF USING MODULES)
// ===================================
// export { createStaggerAnimation, createParallax };