/* ===================================
   ASLA GROUP - PARTICLES BACKGROUND
   Author: Cristian Quispe Lucas
   Description: tsParticles configuration for animated background
   =================================== */

// Wait for tsParticles to load
window.addEventListener('load', () => {
  // Check if tsParticles is loaded
  if (typeof tsParticles === 'undefined') {
    console.warn('tsParticles library not loaded. Background animation will not work.');
    return;
  }

  // ===================================
  // TSPARTICLES CONFIGURATION
  // ===================================
  tsParticles.load("particles-js", {
    background: {
      color: {
        value: "#0f172a"
      },
      image: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      position: "50% 50%",
      repeat: "no-repeat",
      size: "cover"
    },
    
    fpsLimit: 60,
    
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800
        }
      },
      
      color: {
        value: "#34d399"
      },
      
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000"
        }
      },
      
      opacity: {
        value: 0.3,
        random: true,
        anim: {
          enable: true,
          speed: 0.5,
          opacity_min: 0.1,
          sync: false
        }
      },
      
      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 2,
          size_min: 0.5,
          sync: false
        }
      },
      
      line_linked: {
        enable: true,
        distance: 150,
        color: "#34d399",
        opacity: 0.2,
        width: 1
      },
      
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    
    interactivity: {
      detect_on: "canvas",
      
      events: {
        onhover: {
          enable: true,
          mode: "grab"
        },
        onclick: {
          enable: true,
          mode: "push"
        },
        resize: true
      },
      
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 0.5
          }
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 0.8,
          speed: 3
        },
        repulse: {
          distance: 200,
          duration: 0.4
        },
        push: {
          particles_nb: 4
        },
        remove: {
          particles_nb: 2
        }
      }
    },
    
    retina_detect: true,
    
    fullScreen: {
      enable: false,
      zIndex: -1
    }
  });

  console.log('%c Particles Background Loaded ', 'background: #10b981; color: white; padding: 5px 10px; font-size: 12px;');
});

// ===================================
// ALTERNATIVE CONFIGURATION: MINIMAL
// ===================================
/*
// Uncomment this for a minimal particles effect (better performance)
tsParticles.load("particles-js", {
  background: {
    color: "#0f172a"
  },
  fpsLimit: 60,
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: "#34d399"
    },
    opacity: {
      value: 0.3,
      random: true
    },
    size: {
      value: 3,
      random: true
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#34d399",
      opacity: 0.2,
      width: 1
    },
    move: {
      enable: true,
      speed: 1
    }
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: "grab"
      },
      onclick: {
        enable: true,
        mode: "push"
      }
    }
  }
});
*/

// ===================================
// ALTERNATIVE CONFIGURATION: SNOW EFFECT
// ===================================
/*
// Uncomment this for a snow/leaf falling effect
tsParticles.load("particles-js", {
  background: {
    color: "#0f172a"
  },
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: "#34d399"
    },
    shape: {
      type: ["circle", "triangle"],
    },
    opacity: {
      value: 0.5,
      random: true
    },
    size: {
      value: 5,
      random: true
    },
    line_linked: {
      enable: false
    },
    move: {
      enable: true,
      speed: 2,
      direction: "bottom",
      random: true,
      straight: false,
      out_mode: "out"
    }
  },
  interactivity: {
    events: {
      onhover: {
        enable: false
      },
      onclick: {
        enable: false
      }
    }
  }
});
*/

// ===================================
// ALTERNATIVE CONFIGURATION: STARS
// ===================================
/*
// Uncomment this for a starfield effect
tsParticles.load("particles-js", {
  background: {
    color: "#0f172a"
  },
  particles: {
    number: {
      value: 200,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: "#ffffff"
    },
    shape: {
      type: "circle"
    },
    opacity: {
      value: 0.8,
      random: true,
      anim: {
        enable: true,
        speed: 0.5,
        opacity_min: 0,
        sync: false
      }
    },
    size: {
      value: 2,
      random: true
    },
    line_linked: {
      enable: false
    },
    move: {
      enable: true,
      speed: 0.3,
      direction: "none",
      random: true,
      straight: false
    }
  }
});
*/

// ===================================
// ALTERNATIVE CONFIGURATION: BUBBLES
// ===================================
/*
// Uncomment this for a bubble effect
tsParticles.load("particles-js", {
  background: {
    color: "#0f172a"
  },
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: ["#34d399", "#3b82f6", "#10b981"]
    },
    shape: {
      type: "circle"
    },
    opacity: {
      value: 0.3,
      random: true
    },
    size: {
      value: 50,
      random: true,
      anim: {
        enable: true,
        speed: 2,
        size_min: 10,
        sync: false
      }
    },
    line_linked: {
      enable: false
    },
    move: {
      enable: true,
      speed: 1,
      direction: "top",
      random: true,
      straight: false,
      out_mode: "out"
    }
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: "bubble"
      }
    },
    modes: {
      bubble: {
        distance: 200,
        size: 80,
        duration: 2
      }
    }
  }
});
*/

// ===================================
// ALTERNATIVE CONFIGURATION: NASA
// ===================================
/*
// Uncomment this for a NASA/space style effect
tsParticles.load("particles-js", {
  background: {
    color: "#000000",
    image: "radial-gradient(circle, #1a1a2e 0%, #0f0f1e 100%)"
  },
  particles: {
    number: {
      value: 160,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: "#ffffff"
    },
    shape: {
      type: "circle"
    },
    opacity: {
      value: 1,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0,
        sync: false
      }
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 4,
        size_min: 0.3,
        sync: false
      }
    },
    line_linked: {
      enable: false
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out"
    }
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: "bubble"
      },
      onclick: {
        enable: true,
        mode: "repulse"
      }
    },
    modes: {
      bubble: {
        distance: 250,
        duration: 2,
        size: 0,
        opacity: 0
      },
      repulse: {
        distance: 400,
        duration: 4
      }
    }
  }
});
*/

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Reduce particles on mobile for better performance
function optimizeForDevice() {
  const particlesContainer = document.getElementById('particles-js');
  
  if (!particlesContainer) return;
  
  // Check if mobile device
  const isMobile = window.innerWidth < 768;
  
  if (isMobile) {
    // Reload with fewer particles for mobile
    tsParticles.load("particles-js", {
      background: {
        color: "#0f172a"
      },
      fpsLimit: 30, // Lower FPS on mobile
      particles: {
        number: {
          value: 30, // Fewer particles
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: "#34d399"
        },
        opacity: {
          value: 0.3,
          random: true
        },
        size: {
          value: 3,
          random: true
        },
        line_linked: {
          enable: true,
          distance: 100,
          color: "#34d399",
          opacity: 0.2,
          width: 1
        },
        move: {
          enable: true,
          speed: 0.5
        }
      },
      interactivity: {
        events: {
          onhover: {
            enable: false // Disable hover on mobile
          },
          onclick: {
            enable: false // Disable click on mobile
          }
        }
      }
    });
  }
}

// Call optimization on load and resize
window.addEventListener('load', optimizeForDevice);
window.addEventListener('resize', () => {
  // Debounce resize event
  clearTimeout(window.resizeTimeout);
  window.resizeTimeout = setTimeout(optimizeForDevice, 250);
});

// ===================================
// PAUSE PARTICLES WHEN TAB IS INACTIVE
// ===================================
document.addEventListener('visibilitychange', () => {
  const particlesContainer = document.getElementById('particles-js');
  
  if (!particlesContainer) return;
  
  if (document.hidden) {
    // Pause particles when tab is not visible
    particlesContainer.style.display = 'none';
  } else {
    // Resume particles when tab is visible
    particlesContainer.style.display = 'block';
  }
});

// ===================================
// CUSTOM PARTICLE COLORS BASED ON TIME
// ===================================
/*
// Uncomment to change particle colors based on time of day
function getTimeBasedColor() {
  const hour = new Date().getHours();
  
  if (hour >= 6 && hour < 12) {
    return "#fbbf24"; // Morning - Yellow
  } else if (hour >= 12 && hour < 18) {
    return "#34d399"; // Afternoon - Green
  } else if (hour >= 18 && hour < 21) {
    return "#f97316"; // Evening - Orange
  } else {
    return "#6366f1"; // Night - Purple
  }
}

// Apply time-based colors
const timeColor = getTimeBasedColor();
// Update your particles config with timeColor
*/

// ===================================
// EXPORT FUNCTIONS (IF USING MODULES)
// ===================================
// export { optimizeForDevice };