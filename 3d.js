// 3D.js - Handles all Three.js 3D elements and animations

document.addEventListener('DOMContentLoaded', () => {
    // Hero Section 3D Background
    const heroCanvas = document.getElementById('hero-canvas-container');
    if (heroCanvas) {
        initHeroBackground();
    }

    // Project Section 3D Background
    const projectCanvas = document.getElementById('project-canvas-container');
    if (projectCanvas) {
        initProjectBackground();
    }

    // Contact Section 3D Background
    const contactCanvas = document.getElementById('contact-canvas-container');
    if (contactCanvas) {
        initContactBackground();
    }

    // Initialize 3D parallax effect for images
    initParallaxEffect();
    
    // Initialize 3D image effect
    init3DImageEffect();
});

// Hero Section 3D Background
function initHeroBackground() {
    const container = document.getElementById('hero-canvas-container');
    
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    // Set renderer size and append to container
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    
    const posArray = new Float32Array(particlesCount * 3);
    const scaleArray = new Float32Array(particlesCount);
    
    // Fill arrays with random positions and scales
    for (let i = 0; i < particlesCount * 3; i += 3) {
        // Position
        posArray[i] = (Math.random() - 0.5) * 10;
        posArray[i + 1] = (Math.random() - 0.5) * 10;
        posArray[i + 2] = (Math.random() - 0.5) * 10;
        
        // Scale
        scaleArray[i / 3] = Math.random();
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));
    
    // Create material
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x2563eb, // Primary color
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    // Create points
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Position camera
    camera.position.z = 5;
    
    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate particles
        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.0005;
        
        // Move particles based on mouse position
        particlesMesh.rotation.x += mouseY * 0.0005;
        particlesMesh.rotation.y += mouseX * 0.0005;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Project Section 3D Background
function initProjectBackground() {
    const container = document.getElementById('project-canvas-container');
    
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    // Set renderer size and append to container
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Create a grid
    const size = 10;
    const divisions = 50;
    const gridHelper = new THREE.GridHelper(size, divisions, 0x2563eb, 0x60a5fa);
    scene.add(gridHelper);
    
    // Position camera
    camera.position.y = 1;
    camera.position.z = 5;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate grid
        gridHelper.rotation.y += 0.002;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Contact Section 3D Background
function initContactBackground() {
    const container = document.getElementById('contact-canvas-container');
    
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    // Set renderer size and append to container
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Create a wave effect
    const planeGeometry = new THREE.PlaneGeometry(15, 15, 50, 50);
    const planeMaterial = new THREE.MeshBasicMaterial({
        color: 0x10b981, // Secondary color
        wireframe: true,
        transparent: true,
        opacity: 0.2
    });
    
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    planeMesh.rotation.x = -Math.PI / 2;
    scene.add(planeMesh);
    
    // Position camera
    camera.position.y = 2;
    camera.position.z = 5;
    
    // Animation loop
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        
        time += 0.01;
        
        // Create wave effect
        const positions = planeGeometry.attributes.position;
        
        for (let i = 0; i < positions.count; i++) {
            const x = positions.getX(i);
            const y = positions.getY(i);
            
            // Calculate wave height
            const waveX = 0.2 * Math.sin(x + time);
            const waveY = 0.2 * Math.cos(y + time);
            
            positions.setZ(i, waveX + waveY);
        }
        
        positions.needsUpdate = true;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Parallax Effect for Images
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    if (parallaxElements.length > 0) {
        window.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            parallaxElements.forEach(element => {
                const offsetX = (mouseX - 0.5) * 30;
                const offsetY = (mouseY - 0.5) * 30;
                
                gsap.to(element, {
                    x: offsetX,
                    y: offsetY,
                    duration: 1,
                    ease: 'power2.out'
                });
            });
        });
    }
}

// 3D Image Effect
function init3DImageEffect() {
    const imageContainers = document.querySelectorAll('.image-3d-container');
    
    imageContainers.forEach(container => {
        const image = container.querySelector('img');
        const layer = container.querySelector('.image-3d-layer');
        
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xPercent = x / rect.width;
            const yPercent = y / rect.height;
            
            const rotateY = (xPercent - 0.5) * 20;
            const rotateX = (0.5 - yPercent) * 20;
            
            gsap.to(container, {
                rotationY: rotateY,
                rotationX: rotateX,
                transformPerspective: 1000,
                duration: 0.5,
                ease: 'power2.out'
            });
            
            gsap.to(layer, {
                opacity: 0.7,
                x: (xPercent - 0.5) * 30,
                y: (yPercent - 0.5) * 30,
                duration: 0.5
            });
        });
        
        container.addEventListener('mouseleave', () => {
            gsap.to(container, {
                rotationY: 0,
                rotationX: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
            
            gsap.to(layer, {
                opacity: 0,
                x: 0,
                y: 0,
                duration: 0.5
            });
        });
    });
} 