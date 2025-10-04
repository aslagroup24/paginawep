/* ===================================
   ASLA GROUP - MAIN JAVASCRIPT
   Author: Cristian Quispe Lucas
   Description: Navigation, form handling, and general functionality
   =================================== */

// ===================================
// DOM ELEMENTS
// ===================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollTopBtn = document.getElementById('scroll-top');
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

// ===================================
// MOBILE MENU TOGGLE
// ===================================
if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });
}

// ===================================
// CLOSE MENU WHEN CLICKING NAV LINKS
// ===================================
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// ===================================
// CLOSE MENU WHEN CLICKING OUTSIDE
// ===================================
document.addEventListener('click', (e) => {
  if (navMenu.classList.contains('active')) {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
});

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  // Add scrolled class
  if (currentScroll > 100) {
    navbar.classList.add('scrolled');
    scrollTopBtn.classList.add('visible');
  } else {
    navbar.classList.remove('scrolled');
    scrollTopBtn.classList.remove('visible');
  }
  
  // Hide/show navbar on scroll (optional)
  // Uncomment if you want navbar to hide on scroll down
  /*
  if (currentScroll > lastScroll && currentScroll > 100) {
    navbar.style.transform = 'translateY(-100%)';
  } else {
    navbar.style.transform = 'translateY(0)';
  }
  */
  
  lastScroll = currentScroll;
});

// ===================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Ignore empty hash or just "#"
    if (!href || href === '#') return;
    
    e.preventDefault();
    
    const target = document.querySelector(href);
    
    if (target) {
      const headerOffset = 80; // Navbar height
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===================================
// SCROLL TO TOP BUTTON
// ===================================
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ===================================
// COUNTER ANIMATION FOR STATS
// ===================================
const counters = document.querySelectorAll('.stat-number');

const animateCounter = (counter) => {
  const target = parseInt(counter.getAttribute('data-count'));
  const duration = 2000; // 2 seconds
  const increment = target / (duration / 16); // 60fps
  let current = 0;
  
  const updateCounter = () => {
    current += increment;
    if (current < target) {
      counter.textContent = Math.ceil(current);
      requestAnimationFrame(updateCounter);
    } else {
      counter.textContent = target + '+';
    }
  };
  
  updateCounter();
};

// Intersection Observer for counters
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.5
});

counters.forEach(counter => {
  counterObserver.observe(counter);
});

// ===================================
// CONTACT FORM HANDLING
// ===================================
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      service: formData.get('service'),
      message: formData.get('message')
    };
    
    // Validate form
    if (!validateForm(data)) {
      showFormMessage('Por favor, completa todos los campos correctamente.', 'error');
      return;
    }
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Enviando...</span>';
    
    showFormMessage('Enviando mensaje...', 'info');
    
    // Simulate form submission (Replace with actual API call)
    setTimeout(() => {
      // Success
      showFormMessage('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.', 'success');
      contactForm.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
      
      // Hide message after 5 seconds
      setTimeout(() => {
        hideFormMessage();
      }, 5000);
      
      // Optional: Send to WhatsApp
      // sendToWhatsApp(data);
      
    }, 2000);
    
    // For real implementation, use fetch:
    /*
    try {
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        showFormMessage('¡Mensaje enviado con éxito!', 'success');
        contactForm.reset();
      } else {
        showFormMessage('Error al enviar el mensaje. Intenta nuevamente.', 'error');
      }
    } catch (error) {
      showFormMessage('Error de conexión. Intenta nuevamente.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
    */
  });
}

// ===================================
// FORM VALIDATION
// ===================================
function validateForm(data) {
  // Validate name
  if (!data.name || data.name.trim().length < 3) {
    return false;
  }
  
  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    return false;
  }
  
  // Validate phone
  const phoneRegex = /^[\d\s\+\-\(\)]+$/;
  if (!data.phone || !phoneRegex.test(data.phone) || data.phone.length < 9) {
    return false;
  }
  
  // Validate service
  if (!data.service) {
    return false;
  }
  
  // Validate message
  if (!data.message || data.message.trim().length < 10) {
    return false;
  }
  
  return true;
}

// ===================================
// SHOW FORM MESSAGE
// ===================================
function showFormMessage(message, type) {
  if (formMessage) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
  }
}

// ===================================
// HIDE FORM MESSAGE
// ===================================
function hideFormMessage() {
  if (formMessage) {
    formMessage.style.display = 'none';
  }
}

// ===================================
// SEND TO WHATSAPP (OPTIONAL)
// ===================================
function sendToWhatsApp(data) {
  const phone = '51967328938'; // WhatsApp number
  const message = `
*Nuevo mensaje desde la web ASLA GROUP*

*Nombre:* ${data.name}
*Email:* ${data.email}
*Teléfono:* ${data.phone}
*Servicio:* ${data.service}
*Mensaje:* ${data.message}
  `.trim();
  
  const whatsappURL = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, '_blank');
}

// ===================================
// LAZY LOADING FOR IMAGES
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });
  
  lazyImages.forEach(img => imageObserver.observe(img));
});

// ===================================
// ACTIVE LINK HIGHLIGHT ON SCROLL
// ===================================
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
  const scrollPosition = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightNavLink);

// ===================================
// KEYBOARD NAVIGATION
// ===================================
document.addEventListener('keydown', (e) => {
  // Escape key closes mobile menu
  if (e.key === 'Escape' && navMenu.classList.contains('active')) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  // Ctrl/Cmd + K for quick search (if implemented)
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    // Open search modal or focus search input
    console.log('Search shortcut pressed');
  }
});

// ===================================
// PERFORMANCE MONITORING (OPTIONAL)
// ===================================
if ('performance' in window) {
  window.addEventListener('load', () => {
    const perfData = performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`Page load time: ${pageLoadTime}ms`);
  });
}

// ===================================
// SERVICE WORKER REGISTRATION (OPTIONAL)
// ===================================
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Uncomment to enable service worker
    /*
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registered:', registration);
      })
      .catch(error => {
        console.log('ServiceWorker registration failed:', error);
      });
    */
  });
}

// ===================================
// COPY TO CLIPBOARD FUNCTION (UTILITY)
// ===================================
function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Copied to clipboard');
    });
  } else {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
}

// ===================================
// DEBOUNCE FUNCTION (UTILITY)
// ===================================
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ===================================
// THROTTLE FUNCTION (UTILITY)
// ===================================
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ===================================
// CONSOLE LOG (OPTIONAL - REMOVE IN PRODUCTION)
// ===================================
console.log('%c ASLA GROUP ', 'background: #10b981; color: white; padding: 10px 20px; font-size: 16px; font-weight: bold;');
console.log('%c Website desarrollado por Cristian Quispe Lucas ', 'color: #6b7280; font-size: 12px;');

// ===================================
// EXPORT FUNCTIONS (IF USING MODULES)
// ===================================
// export { copyToClipboard, debounce, throttle, sendToWhatsApp };