/* ===================================
   ASLA GROUP - THREE.JS 3D SCENE
   Author: Cristian Quispe Lucas
   Description: 3D elements and animations
   =================================== */

// Wait for Three.js to load
window.addEventListener('load', () => {
  if (typeof THREE === 'undefined') {
    console.warn('Three.js not loaded. 3D features will not work.');
    return;
  }

  // ===================================
  // OPTION 1: 3D ROTATING PLANT POT
  // ===================================
  function create3DPlantPot(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.offsetWidth / container.offsetHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create plant pot (cylinder for pot)
    const potGeometry = new THREE.CylinderGeometry(1, 0.8, 1.5, 32);
    const potMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x8b4513,
      roughness: 0.7,
      metalness: 0.2
    });
    const pot = new THREE.Mesh(potGeometry, potMaterial);
    pot.position.y = -0.5;
    scene.add(pot);

    // Create plant (multiple spheres for leaves)
    const leafMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x10b981,
      roughness: 0.5
    });

    const leaves = [];
    for (let i = 0; i < 8; i++) {
      const leafGeometry = new THREE.SphereGeometry(0.3, 16, 16);
      const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
      
      const angle = (i / 8) * Math.PI * 2;
      leaf.position.x = Math.cos(angle) * 0.8;
      leaf.position.y = Math.sin(angle) * 0.5 + 0.5;
      leaf.position.z = Math.sin(angle) * 0.8;
      
      scene.add(leaf);
      leaves.push(leaf);
    }

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    container.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / container.offsetWidth) * 2 - 1;
      mouseY = -((e.clientY - rect.top) / container.offsetHeight) * 2 + 1;
    });

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);

      // Rotate pot
      pot.rotation.y += 0.01;

      // Animate leaves
      leaves.forEach((leaf, i) => {
        leaf.position.y += Math.sin(Date.now() * 0.001 + i) * 0.002;
        leaf.rotation.z += 0.01;
      });

      // Camera follow mouse
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 2 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }

    animate();

    // Handle resize
    window.addEventListener('resize', () => {
      camera.aspect = container.offsetWidth / container.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.offsetWidth, container.offsetHeight);
    });

    return { scene, camera, renderer };
  }

  // ===================================
  // OPTION 2: 3D FLOATING LEAVES
  // ===================================
  function create3DFloatingLeaves(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.offsetWidth / container.offsetHeight,
      0.1,
      1000
    );
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    // Lighting
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(0, 0, 10);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Create leaves
    const leaves = [];
    const leafGeometry = new THREE.PlaneGeometry(0.5, 1);
    
    for (let i = 0; i < 50; i++) {
      const leafMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color().setHSL(0.3, 0.7, Math.random() * 0.3 + 0.4),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
      });

      const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
      
      leaf.position.x = (Math.random() - 0.5) * 20;
      leaf.position.y = (Math.random() - 0.5) * 20;
      leaf.position.z = (Math.random() - 0.5) * 20;
      
      leaf.rotation.x = Math.random() * Math.PI;
      leaf.rotation.y = Math.random() * Math.PI;
      
      leaf.userData = {
        speedX: (Math.random() - 0.5) * 0.02,
        speedY: (Math.random() - 0.5) * 0.02,
        speedZ: (Math.random() - 0.5) * 0.02,
        rotationSpeed: (Math.random() - 0.5) * 0.05
      };
      
      scene.add(leaf);
      leaves.push(leaf);
    }

    // Animation
    function animate() {
      requestAnimationFrame(animate);

      leaves.forEach(leaf => {
        leaf.position.x += leaf.userData.speedX;
        leaf.position.y += leaf.userData.speedY;
        leaf.position.z += leaf.userData.speedZ;
        
        leaf.rotation.x += leaf.userData.rotationSpeed;
        leaf.rotation.y += leaf.userData.rotationSpeed;

        // Wrap around
        if (leaf.position.x > 10) leaf.position.x = -10;
        if (leaf.position.x < -10) leaf.position.x = 10;
        if (leaf.position.y > 10) leaf.position.y = -10;
        if (leaf.position.y < -10) leaf.position.y = 10;
        if (leaf.position.z > 10) leaf.position.z = -10;
        if (leaf.position.z < -10) leaf.position.z = 10;
      });

      renderer.render(scene, camera);
    }

    animate();

    // Handle resize
    window.addEventListener('resize', () => {
      camera.aspect = container.offsetWidth / container.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.offsetWidth, container.offsetHeight);
    });
  }

  // ===================================
  // OPTION 3: 3D TEXT LOGO
  // ===================================
  function create3DTextLogo(containerId, text = 'ASLA') {
    const container = document.getElementById(containerId);
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.offsetWidth / container.offsetHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    // Lighting
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Load font and create 3D text
    const loader = new THREE.FontLoader();
    
    // Create simple 3D boxes as letters (fallback if font doesn't load)
    const createTextBoxes = () => {
      const geometry = new THREE.BoxGeometry(1, 1.5, 0.5);
      const material = new THREE.MeshStandardMaterial({
        color: 0x10b981,
        metalness: 0.5,
        roughness: 0.2
      });

      const letters = text.split('');
      const meshes = [];

      letters.forEach((letter, index) => {
        const mesh = new THREE.Mesh(geometry, material.clone());
        mesh.position.x = (index - letters.length / 2) * 1.5;
        scene.add(mesh);
        meshes.push(mesh);
      });

      return meshes;
    };

    const textMeshes = createTextBoxes();

    // Animation
    function animate() {
      requestAnimationFrame(animate);

      textMeshes.forEach((mesh, index) => {
        mesh.rotation.y += 0.01;
        mesh.position.y = Math.sin(Date.now() * 0.001 + index) * 0.2;
      });

      renderer.render(scene, camera);
    }

    animate();

    // Handle resize
    window.addEventListener('resize', () => {
      camera.aspect = container.offsetWidth / container.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.offsetWidth, container.offsetHeight);
    });
  }

  // ===================================
  // OPTION 4: 3D PARTICLES SPHERE
  // ===================================
  function create3DParticlesSphere(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.offsetWidth / container.offsetHeight,
      0.1,
      1000
    );
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 20;
    }

    particlesGeometry.setAttribute('position', 
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x10b981,
      transparent: true,
      opacity: 0.8
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // Animation
    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      particlesMesh.rotation.y = elapsedTime * 0.05;
      particlesMesh.rotation.x = mouseY * 0.5;
      particlesMesh.rotation.y = mouseX * 0.5;

      renderer.render(scene, camera);
    }

    animate();

    // Handle resize
    window.addEventListener('resize', () => {
      camera.aspect = container.offsetWidth / container.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.offsetWidth, container.offsetHeight);
    });
  }

  // ===================================
  // INITIALIZE 3D SCENES
  // ===================================
  
  // Uncomment the ones you want to use:
  
  // create3DPlantPot('plant-3d-container');
  // create3DFloatingLeaves('leaves-3d-container');
  // create3DTextLogo('logo-3d-container', 'ASLA');
  // create3DParticlesSphere('particles-3d-container');

  console.log('%c Three.js 3D Loaded ', 'background: #10b981; color: white; padding: 5px 10px;');
});

// ===================================
// UTILITY: Create 3D Background
// ===================================
function create3DBackground() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ 
    alpha: true,
    canvas: document.querySelector('#bg-3d')
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Create geometry
  const geometry = new THREE.IcosahedronGeometry(1, 0);
  const material = new THREE.MeshStandardMaterial({
    color: 0x10b981,
    wireframe: true
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Lighting
  const light = new THREE.PointLight(0xffffff, 1);
  light.position.set(5, 5, 5);
  scene.add(light);

  // Animation
  function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  animate();
}

// Export functions if using modules
// export { create3DPlantPot, create3DFloatingLeaves, create3DTextLogo, create3DParticlesSphere };