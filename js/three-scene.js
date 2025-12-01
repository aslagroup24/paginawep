/* ===================================
   ASLA GROUP - THREE.JS 3D SCENE (OPTIMIZED CORE)
   Author: Cristian Quispe Lucas (Optimized by AI)
   Description: High-performance 3D elements with visibility culling
   =================================== */

(function() {
  // Configuración Global de Rendimiento
  const CONFIG = {
    // Limitar pixel ratio a 2 ahorra mucha batería en móviles de alta gama
    pixelRatio: Math.min(window.devicePixelRatio, 2),
    // Pausar renderizado si no está en pantalla
    useVisibilityCulling: true
  };

  /**
   * Helper para configuración común de escenas
   * Evita duplicar código y maneja el redimensionamiento y limpieza
   */
  function initScene(containerId, cameraZ = 5) {
    const container = document.getElementById(containerId);
    if (!container) return null;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.offsetWidth / container.offsetHeight,
      0.1,
      1000
    );
    camera.position.z = cameraZ;

    // 2. Renderer Optimizado
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: CONFIG.pixelRatio < 2, // Desactivar antialias en pantallas de alta densidad para rendimiento
      powerPreference: "high-performance"
    });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setPixelRatio(CONFIG.pixelRatio);
    container.appendChild(renderer.domElement);

    // 3. Manejo inteligente de resize (ResizeObserver es más eficiente que window.resize)
    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    resizeObserver.observe(container);

    // 4. Sistema de Pausa/Play según visibilidad
    let isVisible = true;
    if (CONFIG.useVisibilityCulling && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        isVisible = entries[0].isIntersecting;
      });
      observer.observe(renderer.domElement);
    }

    return { scene, camera, renderer, container, isVisible: () => isVisible };
  }

  // ===================================
  // OPTION 1: 3D ROTATING PLANT POT
  // ===================================
  window.create3DPlantPot = function(containerId) {
    const setup = initScene(containerId, 5);
    if (!setup) return;
    const { scene, camera, renderer, isVisible } = setup;

    // Lighting (Shared for efficiency)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // Group to rotate everything together
    const group = new THREE.Group();
    scene.add(group);

    // Optimization: Low poly counts where possible
    const potGeo = new THREE.CylinderGeometry(1, 0.8, 1.5, 32);
    const potMat = new THREE.MeshStandardMaterial({ 
      color: 0x8b4513, roughness: 0.7, metalness: 0.2 
    });
    const pot = new THREE.Mesh(potGeo, potMat);
    pot.position.y = -0.5;
    group.add(pot);

    // Leaves
    const leafGeo = new THREE.SphereGeometry(0.3, 16, 16); // Reutilizamos geometría
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.5 });
    
    const leaves = [];
    for (let i = 0; i < 8; i++) {
      const leaf = new THREE.Mesh(leafGeo, leafMat);
      const angle = (i / 8) * Math.PI * 2;
      leaf.position.set(
        Math.cos(angle) * 0.8,
        Math.sin(angle) * 0.5 + 0.5,
        Math.sin(angle) * 0.8
      );
      group.add(leaf);
      leaves.push(leaf);
    }

    // Mouse Interaction (Damped)
    let targetX = 0, targetY = 0;
    setup.container.addEventListener('mousemove', (e) => {
      const rect = setup.container.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / setup.container.offsetWidth) * 2 - 1;
      targetY = -((e.clientY - rect.top) / setup.container.offsetHeight) * 2 + 1;
    });

    // Loop
    function animate() {
      requestAnimationFrame(animate);
      if (!isVisible()) return; // PAUSA INTELIGENTE

      group.rotation.y += 0.005;
      
      // Gentle leaf movement
      const time = Date.now() * 0.001;
      leaves.forEach((leaf, i) => {
        leaf.position.y += Math.sin(time + i) * 0.002;
      });

      // Smooth camera follow
      camera.position.x += (targetX * 2 - camera.position.x) * 0.05;
      camera.position.y += (targetY * 2 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }
    animate();
  };

  // ===================================
  // OPTION 2: 3D FLOATING LEAVES (Optimized Geometry)
  // ===================================
  window.create3DFloatingLeaves = function(containerId) {
    const setup = initScene(containerId, 10);
    if (!setup) return;
    const { scene, camera, renderer, isVisible } = setup;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const light = new THREE.PointLight(0xffffff, 1, 50);
    light.position.set(0, 0, 10);
    scene.add(light);

    // CRITICAL OPTIMIZATION: Create Geometry ONCE, reuse 50 times
    const geometry = new THREE.PlaneGeometry(0.5, 1);
    const leaves = [];
    const count = 40; // Reduced slightly for mobile performance

    for (let i = 0; i < count; i++) {
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color().setHSL(0.35, 0.8, Math.random() * 0.4 + 0.3),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
      });

      const leaf = new THREE.Mesh(geometry, material);
      
      // Random spread
      leaf.position.set(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10
      );
      
      leaf.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);

      // Store physics data in user data
      leaf.userData = {
        speed: Math.random() * 0.02 + 0.005,
        rotSpeed: Math.random() * 0.02 + 0.005,
        yBase: leaf.position.y
      };
      
      scene.add(leaf);
      leaves.push(leaf);
    }

    function animate() {
      requestAnimationFrame(animate);
      if (!isVisible()) return;

      leaves.forEach(leaf => {
        // Organic floating movement
        leaf.position.y += leaf.userData.speed;
        leaf.rotation.x += leaf.userData.rotSpeed;
        leaf.rotation.y += leaf.userData.rotSpeed;

        // Reset if goes too high
        if (leaf.position.y > 8) {
          leaf.position.y = -8;
          leaf.position.x = (Math.random() - 0.5) * 15;
        }
      });

      renderer.render(scene, camera);
    }
    animate();
  };

  // ===================================
  // OPTION 3: 3D TEXT (Optimized Fallback)
  // ===================================
  window.create3DTextLogo = function(containerId, text = 'ASLA') {
    const setup = initScene(containerId, 6);
    if (!setup) return;
    const { scene, camera, renderer, isVisible } = setup;

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 10);
    scene.add(pointLight);
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    // Simple geometric letters (Performant & Modern)
    const geometry = new THREE.BoxGeometry(1, 1.5, 0.2);
    const material = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x0a7a4a,
      emissiveIntensity: 0.2
    });

    const group = new THREE.Group();
    const letters = text.split('');
    const meshes = [];

    letters.forEach((letter, index) => {
      // Reusing geometry and material
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = (index - (letters.length - 1) / 2) * 1.4;
      group.add(mesh);
      meshes.push(mesh);
    });

    scene.add(group);

    function animate() {
      requestAnimationFrame(animate);
      if (!isVisible()) return;

      const time = Date.now() * 0.002;
      
      // Wave animation
      meshes.forEach((mesh, i) => {
        mesh.position.y = Math.sin(time + i * 0.5) * 0.3;
        mesh.rotation.y = Math.sin(time * 0.5 + i * 0.2) * 0.3;
      });
      
      // Gentle global float
      group.rotation.x = Math.sin(time * 0.2) * 0.1;

      renderer.render(scene, camera);
    }
    animate();
  };

  // ===================================
  // OPTION 4: 3D PARTICLES (BufferGeometry Optimized)
  // ===================================
  window.create3DParticlesSphere = function(containerId) {
    const setup = initScene(containerId, 12);
    if (!setup) return;
    const { scene, camera, renderer, isVisible, container } = setup;

    // BufferGeometry is crucial for particle performance
    const geometry = new THREE.BufferGeometry();
    const count = window.innerWidth < 768 ? 2000 : 4000; // Menos partículas en móvil
    const posArray = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 25;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const material = new THREE.PointsMaterial({
      size: 0.08,
      color: 0x7FFFD4, // Aquamarine accent
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let mouseX = 0, mouseY = 0;
    if (!('ontouchstart' in window)) { // Only track mouse on desktop
      document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      });
    }

    function animate() {
      requestAnimationFrame(animate);
      if (!isVisible()) return;

      particles.rotation.y += 0.001;
      particles.rotation.x += mouseY * 0.02;
      particles.rotation.y += mouseX * 0.02;

      renderer.render(scene, camera);
    }
    animate();
  };

  // Init logic on load
  window.addEventListener('load', () => {
    if (typeof THREE !== 'undefined') {
      console.log('✅ Three.js Optimized Core Loaded');
    } else {
      console.warn('⚠️ Three.js missing');
    }
  });

})();