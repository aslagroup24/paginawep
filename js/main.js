/* ==========================================================================
   ASLA GROUP - MAIN ENGINE (HIGH PERFORMANCE)
   Author: Cristian Quispe Lucas (Refactored by AI)
   Architecture: Event Delegation + IntersectionObserver + rAF
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ===================================
  // 1. CENTRAL DOM CACHE (Performance)
  // ===================================
  const UI = {
    navbar: document.getElementById('navbar'),
    hamburger: document.getElementById('hamburger'),
    navMenu: document.getElementById('nav-menu'),
    navLinks: document.querySelectorAll('.nav-link'),
    scrollTopBtn: document.getElementById('scroll-top'),
    contactForm: document.getElementById('contact-form'),
    formMessage: document.getElementById('form-message'),
    sections: document.querySelectorAll('section[id]'),
    counters: document.querySelectorAll('.stat-number'),
    body: document.body
  };

  // State Management
  let state = {
    isMenuOpen: false,
    lastScrollY: 0,
    isTicking: false
  };

  // ===================================
  // 2. SCROLL ENGINE (rAF Optimized)
  // ===================================
  const updateScrollState = () => {
    const scrollY = window.scrollY;

    // A. Navbar Glass Effect
    if (scrollY > 50) {
      if (!UI.navbar.classList.contains('scrolled')) UI.navbar.classList.add('scrolled');
    } else {
      if (UI.navbar.classList.contains('scrolled')) UI.navbar.classList.remove('scrolled');
    }

    // B. Scroll Top Button Visibility
    if (scrollY > 500) {
      if (!UI.scrollTopBtn.classList.contains('visible')) UI.scrollTopBtn.classList.add('visible');
    } else {
      if (UI.scrollTopBtn.classList.contains('visible')) UI.scrollTopBtn.classList.remove('visible');
    }

    state.lastScrollY = scrollY;
    state.isTicking = false;
  };

  window.addEventListener('scroll', () => {
    if (!state.isTicking) {
      window.requestAnimationFrame(updateScrollState);
      state.isTicking = true;
    }
  }, { passive: true }); // Critical for mobile performance

  // ===================================
  // 3. MENU SYSTEM (Interaction)
  // ===================================
  const toggleMenu = (forceClose = false) => {
    if (forceClose && !state.isMenuOpen) return;

    state.isMenuOpen = forceClose ? false : !state.isMenuOpen;
    
    UI.hamburger.classList.toggle('active', state.isMenuOpen);
    UI.navMenu.classList.toggle('active', state.isMenuOpen);
    
    // Use class for body lock instead of inline styles
    UI.body.style.overflow = state.isMenuOpen ? 'hidden' : '';
    // Optional: Add blur to main content if you have a main wrapper
    // document.querySelector('main').style.filter = state.isMenuOpen ? 'blur(5px)' : 'none';
  };

  if (UI.hamburger) {
    UI.hamburger.addEventListener('click', () => toggleMenu());
  }

  // Close on Link Click (Event Delegation)
  if (UI.navMenu) {
    UI.navMenu.addEventListener('click', (e) => {
      if (e.target.classList.contains('nav-link')) {
        toggleMenu(true);
      }
    });
  }

  // Close on Click Outside
  document.addEventListener('click', (e) => {
    if (state.isMenuOpen && 
        !UI.navMenu.contains(e.target) && 
        !UI.hamburger.contains(e.target)) {
      toggleMenu(true);
    }
  });

  // Escape Key Support
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && state.isMenuOpen) toggleMenu(true);
  });

  // ===================================
  // 4. SCROLL SPY (IntersectionObserver)
  // ===================================
  // Replaces the heavy math-based scroll calculation
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px', // Active when element is near top center
    threshold: 0
  };

  const scrollSpy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Remove active class from all
        UI.navLinks.forEach(link => link.classList.remove('active'));
        
        // Add to current
        const id = entry.target.getAttribute('id');
        const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, observerOptions);

  UI.sections.forEach(section => scrollSpy.observe(section));

  // ===================================
  // 5. SMOOTH SCROLL (Native + Fallback)
  // ===================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Offset for fixed navbar
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  if (UI.scrollTopBtn) {
    UI.scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===================================
  // 6. ANIMATED COUNTERS (Ease-Out Physics)
  // ===================================
  const easeOutQuad = t => t * (2 - t); // Math function for smooth landing

  const runCounter = (el) => {
    const target = +el.getAttribute('data-count');
    const duration = 2000; // ms
    const start = 0;
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeOutQuad(progress);
      
      const currentCount = Math.floor(ease * target);
      el.textContent = currentCount + (progress === 1 ? '+' : '');

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target + '+'; // Ensure final value
      }
    };

    requestAnimationFrame(update);
  };

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        runCounter(entry.target);
        observer.unobserve(entry.target); // Run once
      }
    });
  }, { threshold: 0.5 });

  UI.counters.forEach(counter => counterObserver.observe(counter));

  // ===================================
  // 7. FORM HANDLING & VALIDATION
  // ===================================
  if (UI.contactForm) {
    UI.contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(UI.contactForm);
      const data = Object.fromEntries(formData.entries());

      if (!validateForm(data)) {
        showFeedback('Por favor, revisa los campos marcados.', 'error');
        return;
      }

      // UX: Lock button
      const btn = UI.contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner-border"></span> Enviando...';

      try {
        // Simulate Network Request
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        showFeedback('¡Mensaje enviado correctamente!', 'success');
        UI.contactForm.reset();
        
        // Optional: WhatsApp Redirection
        // redirectToWhatsApp(data);

      } catch (err) {
        showFeedback('Error de conexión. Intenta de nuevo.', 'error');
      } finally {
        btn.disabled = false;
        btn.innerHTML = originalText;
      }
    });
  }

  // Helper: Validation Logic
  function validateForm(data) {
    const rules = {
      name: (val) => val.length >= 3,
      email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      phone: (val) => val.length >= 9,
      message: (val) => val.length >= 10
    };

    let isValid = true;
    // Simple visual feedback on inputs could be added here
    return rules.name(data.name) && 
           rules.email(data.email) && 
           rules.phone(data.phone) && 
           rules.message(data.message);
  }

  // Helper: Visual Feedback
  function showFeedback(msg, type) {
    if (!UI.formMessage) return;
    UI.formMessage.textContent = msg;
    UI.formMessage.className = `form-message ${type} fade-in`;
    UI.formMessage.style.display = 'block';

    if (type === 'success') {
      setTimeout(() => {
        UI.formMessage.style.display = 'none';
      }, 5000);
    }
  }

  // Helper: WhatsApp (Optional)
  function redirectToWhatsApp(data) {
    const number = '51900000000'; // Tu número
    const text = `Hola, soy ${data.name}. ${data.message}`;
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(text)}`, '_blank');
  }

  // ===================================
  // 8. LAZY LOADING (Native)
  // ===================================
  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      if(img.dataset.src) img.src = img.dataset.src;
    });
  } else {
    // Fallback for older browsers
    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });
    document.querySelectorAll('img[data-src]').forEach(img => lazyImageObserver.observe(img));
  }

  console.log('%c ASLA GROUP %c High Performance Core Active ', 'background:#0a7a4a; color:white; padding: 4px; border-radius: 4px 0 0 4px;', 'background:#222; color:#fff; padding: 4px; border-radius: 0 4px 4px 0;');
});