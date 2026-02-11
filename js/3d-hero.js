// ==================== 3D HERO SECTION WITH THREE.JS ====================

class Hero3D {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.objects = [];
        this.particles = [];
        this.DESKTOP_WIDTH_THRESHOLD = 968; // Minimum width for desktop features
        this.isDesktop = window.innerWidth > this.DESKTOP_WIDTH_THRESHOLD;
        this.animationId = null;
        
        if (this.isDesktop && typeof THREE !== 'undefined') {
            this.init();
        } else if (!this.isDesktop) {
            console.log('[3D Hero] Mobile device detected, 3D disabled for performance');
        } else {
            console.log('[3D Hero] Three.js not loaded');
        }
    }

    init() {
        const container = document.getElementById('hero3dContainer');
        if (!container) {
            console.warn('[3D Hero] Container not found');
            return;
        }

        try {
            this.setupScene();
            this.createObjects();
            this.createParticles();
            this.setupLights();
            this.setupControls();
            this.animate();
            this.handleResize();
            
            console.log('[3D Hero] Initialized successfully');
        } catch (error) {
            console.error('[3D Hero] Initialization failed:', error);
        }
    }

    setupScene() {
        // Scene
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0x0a0a0f, 10, 50);

        // Camera
        const container = document.getElementById('hero3dContainer');
        this.camera = new THREE.PerspectiveCamera(
            75,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        this.camera.position.z = 15;

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('hero3dCanvas'),
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    createObjects() {
        // Rotating wireframe cube
        const cubeGeometry = new THREE.BoxGeometry(3, 3, 3);
        const cubeEdges = new THREE.EdgesGeometry(cubeGeometry);
        const cubeMaterial = new THREE.LineBasicMaterial({ 
            color: 0x00ffff,
            linewidth: 2
        });
        const cube = new THREE.LineSegments(cubeEdges, cubeMaterial);
        cube.position.set(-5, 2, 0);
        this.scene.add(cube);
        this.objects.push({ mesh: cube, rotationSpeed: { x: 0.01, y: 0.015, z: 0.005 } });

        // Torus
        const torusGeometry = new THREE.TorusGeometry(2, 0.5, 16, 100);
        const torusEdges = new THREE.EdgesGeometry(torusGeometry);
        const torusMaterial = new THREE.LineBasicMaterial({ 
            color: 0xff00ff,
            linewidth: 2
        });
        const torus = new THREE.LineSegments(torusEdges, torusMaterial);
        torus.position.set(5, -2, -3);
        this.scene.add(torus);
        this.objects.push({ mesh: torus, rotationSpeed: { x: 0.02, y: 0.01, z: 0.015 } });

        // Icosahedron
        const icoGeometry = new THREE.IcosahedronGeometry(2, 0);
        const icoEdges = new THREE.EdgesGeometry(icoGeometry);
        const icoMaterial = new THREE.LineBasicMaterial({ 
            color: 0xffff00,
            linewidth: 2
        });
        const icosahedron = new THREE.LineSegments(icoEdges, icoMaterial);
        icosahedron.position.set(0, -3, -5);
        this.scene.add(icosahedron);
        this.objects.push({ mesh: icosahedron, rotationSpeed: { x: 0.015, y: 0.02, z: 0.01 } });

        // Octahedron
        const octaGeometry = new THREE.OctahedronGeometry(1.5, 0);
        const octaEdges = new THREE.EdgesGeometry(octaGeometry);
        const octaMaterial = new THREE.LineBasicMaterial({ 
            color: 0x00ff41,
            linewidth: 2
        });
        const octahedron = new THREE.LineSegments(octaEdges, octaMaterial);
        octahedron.position.set(3, 4, -2);
        this.scene.add(octahedron);
        this.objects.push({ mesh: octahedron, rotationSpeed: { x: 0.018, y: 0.012, z: 0.008 } });
    }

    createParticles() {
        const particleCount = 200;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        const colorPalette = [
            new THREE.Color(0x00ffff),
            new THREE.Color(0xff00ff),
            new THREE.Color(0xffff00),
            new THREE.Color(0x00ff41)
        ];

        for (let i = 0; i < particleCount * 3; i += 3) {
            // Position
            positions[i] = (Math.random() - 0.5) * 40;
            positions[i + 1] = (Math.random() - 0.5) * 40;
            positions[i + 2] = (Math.random() - 0.5) * 40;

            // Color
            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i] = color.r;
            colors[i + 1] = color.g;
            colors[i + 2] = color.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.1,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
        });

        this.particleSystem = new THREE.Points(geometry, material);
        this.scene.add(this.particleSystem);
    }

    setupLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        // Point lights
        const light1 = new THREE.PointLight(0x00ffff, 1, 100);
        light1.position.set(10, 10, 10);
        this.scene.add(light1);

        const light2 = new THREE.PointLight(0xff00ff, 1, 100);
        light2.position.set(-10, -10, -10);
        this.scene.add(light2);
    }

    setupControls() {
        const container = document.getElementById('hero3dContainer');
        
        // Mouse movement for camera
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const mouseX = (e.clientX - rect.left) / rect.width * 2 - 1;
            const mouseY = -(e.clientY - rect.top) / rect.height * 2 + 1;
            
            this.camera.position.x = mouseX * 2;
            this.camera.position.y = mouseY * 2;
        });
    }

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());

        // Rotate objects
        this.objects.forEach(obj => {
            obj.mesh.rotation.x += obj.rotationSpeed.x;
            obj.mesh.rotation.y += obj.rotationSpeed.y;
            obj.mesh.rotation.z += obj.rotationSpeed.z;
        });

        // Rotate particle system
        if (this.particleSystem) {
            this.particleSystem.rotation.y += 0.001;
        }

        // Camera slight movement
        this.camera.position.z = 15 + Math.sin(Date.now() * 0.0005) * 2;

        this.renderer.render(this.scene, this.camera);
    }

    handleResize() {
        window.addEventListener('resize', () => {
            const container = document.getElementById('hero3dContainer');
            if (!container) return;

            const width = container.clientWidth;
            const height = container.clientHeight;

            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(width, height);
        });
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        if (this.renderer) {
            this.renderer.dispose();
        }
        
        console.log('[3D Hero] Destroyed');
    }
}

// Project Card 3D Tilt Effect
class ProjectCard3D {
    constructor() {
        this.DESKTOP_WIDTH_THRESHOLD = 968; // Minimum width for desktop features
        this.isDesktop = window.innerWidth > this.DESKTOP_WIDTH_THRESHOLD;
        if (this.isDesktop) {
            this.init();
        }
    }

    init() {
        const cards = document.querySelectorAll('.project-card');
        
        cards.forEach(card => {
            // Add 3D class
            card.classList.add('project-card-3d', 'tilt-container');
            
            // Add highlight overlay
            const highlight = document.createElement('div');
            highlight.className = 'tilt-highlight';
            card.appendChild(highlight);
            
            // Mouse move handler
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `
                    perspective(1000px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg) 
                    translateZ(20px)
                `;
                
                // Update highlight position
                card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
                card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
            });
            
            // Mouse leave handler
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
        
        console.log('[3D] Project cards enhanced with 3D tilt effect');
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Wait for Three.js to load
        setTimeout(() => {
            if (typeof THREE !== 'undefined') {
                window.hero3D = new Hero3D();
                window.projectCard3D = new ProjectCard3D();
            }
        }, 100);
    });
} else {
    setTimeout(() => {
        if (typeof THREE !== 'undefined') {
            window.hero3D = new Hero3D();
            window.projectCard3D = new ProjectCard3D();
        }
    }, 100);
}

console.log('[3D] 3D hero module loaded');
