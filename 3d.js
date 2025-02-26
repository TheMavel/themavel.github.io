// 3D.js - Three.js implementation for Startplatz AI Hub
// Featuring holographic structures, neon accents, and glitch effects

// Main initialization function
document.addEventListener('DOMContentLoaded', function() {
    // Initialize 3D backgrounds if containers exist
    if (document.getElementById('hero-canvas-container')) {
        initHeroBackground();
    }
    
    if (document.getElementById('project-canvas-container')) {
        initProjectBackground();
    }
    
    if (document.getElementById('contact-canvas-container')) {
        initContactBackground();
    }
    
    // Initialize parallax effect for elements with class 'parallax-element'
    initParallaxEffect();
    
    // Initialize 3D effect for images
    init3DImageEffect();
});

// Hero section background - Holographic particle system
function initHeroBackground() {
    const container = document.getElementById('hero-canvas-container');
    
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Camera position
    camera.position.z = 30;
    
    // Create particle system
    const particleCount = 1500;
    const particles = new THREE.BufferGeometry();
    
    // Create arrays for particle positions, colors, and sizes
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    // Define colors from the Startplatz AI Hub color palette
    const neonBlue = new THREE.Color(0x00FFFF);
    const lightPurple = new THREE.Color(0x9535FF);
    const deepPurple = new THREE.Color(0x36036C);
    
    // Fill the arrays with random values
    for (let i = 0; i < particleCount; i++) {
        // Position
        const i3 = i * 3;
        positions[i3] = (Math.random() - 0.5) * 100; // x
        positions[i3 + 1] = (Math.random() - 0.5) * 50; // y
        positions[i3 + 2] = (Math.random() - 0.5) * 50; // z
        
        // Color - interpolate between the three colors
        const colorChoice = Math.random();
        let particleColor;
        
        if (colorChoice < 0.33) {
            particleColor = neonBlue;
        } else if (colorChoice < 0.66) {
            particleColor = lightPurple;
        } else {
            particleColor = deepPurple;
        }
        
        colors[i3] = particleColor.r;
        colors[i3 + 1] = particleColor.g;
        colors[i3 + 2] = particleColor.b;
        
        // Size - vary the particle sizes
        sizes[i] = Math.random() * 2 + 0.5;
    }
    
    // Add attributes to the geometry
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    // Create shader material for particles
    const particleMaterial = new THREE.ShaderMaterial({
        vertexShader: `
            attribute float size;
            varying vec3 vColor;
            
            void main() {
                vColor = color;
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                gl_PointSize = size * (300.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            varying vec3 vColor;
            
            void main() {
                // Create a circular particle with soft edges
                float r = 0.5;
                vec2 uv = gl_PointCoord - vec2(0.5);
                float d = length(uv);
                float c = smoothstep(r, r - 0.1, d);
                
                if (d > r) discard;
                
                // Add glow effect
                float glow = exp(-d * 3.0);
                vec3 finalColor = vColor * (1.0 + glow * 0.5);
                
                gl_FragColor = vec4(finalColor, c);
            }
        `,
        transparent: true,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    
    // Create the particle system
    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);
    
    // Add subtle ambient light
    const ambientLight = new THREE.AmbientLight(0x9535FF, 0.2);
    scene.add(ambientLight);
    
    // Add directional light for highlights
    const directionalLight = new THREE.DirectionalLight(0x00FFFF, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Smooth mouse movement
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;
        
        // Rotate the particle system based on mouse position
        particleSystem.rotation.x = targetY * 0.2;
        particleSystem.rotation.y = targetX * 0.2;
        
        // Add subtle movement to particles
        const positions = particleSystem.geometry.attributes.position.array;
        const count = positions.length / 3;
        
        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            positions[i3 + 1] += Math.sin(Date.now() * 0.001 + i * 0.1) * 0.01;
        }
        
        particleSystem.geometry.attributes.position.needsUpdate = true;
        
        // Add occasional glitch effect
        if (Math.random() < 0.005) {
            particleSystem.position.x += (Math.random() - 0.5) * 0.5;
            setTimeout(() => {
                particleSystem.position.x = 0;
            }, 100);
        }
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// Project section background - Grid helper with holographic effect
function initProjectBackground() {
    const container = document.getElementById('project-canvas-container');
    
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Camera position
    camera.position.z = 30;
    camera.position.y = 10;
    camera.rotation.x = -Math.PI / 6;
    
    // Create grid helper with custom colors
    const gridSize = 50;
    const gridDivisions = 50;
    const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x9535FF, 0x00FFFF);
    gridHelper.position.y = -10;
    scene.add(gridHelper);
    
    // Add holographic planes
    const planeGeometry = new THREE.PlaneGeometry(100, 100, 20, 20);
    const planeMaterial = new THREE.MeshBasicMaterial({
        color: 0x00FFFF,
        wireframe: true,
        transparent: true,
        opacity: 0.2
    });
    
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -10;
    scene.add(plane);
    
    // Add floating cubes
    const cubeCount = 20;
    const cubes = [];
    
    for (let i = 0; i < cubeCount; i++) {
        const size = Math.random() * 2 + 0.5;
        const geometry = new THREE.BoxGeometry(size, size, size);
        
        // Create holographic material
        const material = new THREE.MeshPhongMaterial({
            color: Math.random() < 0.5 ? 0x00FFFF : 0x9535FF,
            transparent: true,
            opacity: 0.7,
            specular: 0xffffff,
            shininess: 100,
            side: THREE.DoubleSide
        });
        
        const cube = new THREE.Mesh(geometry, material);
        
        // Random position
        cube.position.x = (Math.random() - 0.5) * 40;
        cube.position.y = Math.random() * 20 - 5;
        cube.position.z = (Math.random() - 0.5) * 40;
        
        // Store initial position for animation
        cube.userData.initialY = cube.position.y;
        cube.userData.speed = Math.random() * 0.02 + 0.01;
        cube.userData.rotationSpeed = {
            x: Math.random() * 0.02 - 0.01,
            y: Math.random() * 0.02 - 0.01,
            z: Math.random() * 0.02 - 0.01
        };
        
        scene.add(cube);
        cubes.push(cube);
    }
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0x36036C, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0x00FFFF, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate grid
        gridHelper.rotation.y += 0.002;
        plane.rotation.z += 0.001;
        
        // Animate cubes
        cubes.forEach(cube => {
            // Float up and down
            cube.position.y = cube.userData.initialY + Math.sin(Date.now() * cube.userData.speed) * 2;
            
            // Rotate
            cube.rotation.x += cube.userData.rotationSpeed.x;
            cube.rotation.y += cube.userData.rotationSpeed.y;
            cube.rotation.z += cube.userData.rotationSpeed.z;
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// Contact section background - Wave effect
function initContactBackground() {
    const container = document.getElementById('contact-canvas-container');
    
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Camera position
    camera.position.z = 30;
    
    // Create wave plane
    const planeGeometry = new THREE.PlaneGeometry(60, 30, 50, 30);
    
    // Create custom shader material for the wave effect
    const waveMaterial = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0 },
            color1: { value: new THREE.Color(0x00FFFF) },
            color2: { value: new THREE.Color(0x9535FF) }
        },
        vertexShader: `
            uniform float time;
            varying vec2 vUv;
            varying float vElevation;
            
            void main() {
                vUv = uv;
                
                // Create wave effect
                float elevation = sin(position.x * 0.2 + time) * 2.0 +
                                 sin(position.y * 0.2 + time) * 2.0;
                
                vElevation = elevation;
                
                // Apply elevation to vertex
                vec3 newPosition = position;
                newPosition.z += elevation;
                
                gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
            }
        `,
        fragmentShader: `
            uniform vec3 color1;
            uniform vec3 color2;
            varying vec2 vUv;
            varying float vElevation;
            
            void main() {
                // Mix colors based on elevation and UV coordinates
                float mixFactor = (vElevation + 4.0) / 8.0;
                mixFactor = clamp(mixFactor, 0.0, 1.0);
                
                vec3 color = mix(color1, color2, mixFactor + vUv.x * 0.5);
                
                // Add glow effect
                float glow = smoothstep(0.4, 0.6, abs(vUv.y - 0.5) * 2.0);
                color = mix(color, vec3(1.0), glow * 0.3);
                
                gl_FragColor = vec4(color, 0.7);
            }
        `,
        transparent: true,
        side: THREE.DoubleSide
    });
    
    const wavePlane = new THREE.Mesh(planeGeometry, waveMaterial);
    wavePlane.rotation.x = -Math.PI / 6;
    scene.add(wavePlane);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0x00FFFF, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Update time uniform for wave animation
        waveMaterial.uniforms.time.value = Date.now() * 0.001;
        
        // Rotate plane slightly
        wavePlane.rotation.z = Math.sin(Date.now() * 0.0005) * 0.1;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// Parallax effect for elements with class 'parallax-element'
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    if (parallaxElements.length > 0) {
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;
            
            parallaxElements.forEach(element => {
                const depth = element.getAttribute('data-depth') || 0.2;
                const moveX = mouseX * depth * 100;
                const moveY = mouseY * depth * 100;
                
                element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
            });
        });
    }
}

// 3D effect for images in containers with class 'image-3d-container'
function init3DImageEffect() {
    const containers = document.querySelectorAll('.image-3d-container');
    
    containers.forEach(container => {
        const image = container.querySelector('img');
        const layer = container.querySelector('.image-3d-layer');
        
        if (image && layer) {
            container.addEventListener('mousemove', (e) => {
                // Calculate mouse position relative to the container
                const rect = container.getBoundingClientRect();
                const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
                const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
                
                // Apply 3D rotation to the image
                image.style.transform = `perspective(1000px) rotateX(${mouseY * -10}deg) rotateY(${mouseX * 10}deg) scale3d(1.05, 1.05, 1.05)`;
                
                // Move the layer for parallax effect
                layer.style.opacity = '0.4';
                layer.style.transform = `translateX(${mouseX * -20}px) translateY(${mouseY * -20}px)`;
            });
            
            // Reset on mouse leave
            container.addEventListener('mouseleave', () => {
                image.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
                layer.style.opacity = '0';
                layer.style.transform = 'translateX(0) translateY(0)';
            });
        }
    });
} 