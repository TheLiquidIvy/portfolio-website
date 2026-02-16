// ==================== ADVANCED CURSOR EFFECTS ====================
class MagneticCursor {
    constructor() {
        this.cursor = document.querySelector('.cursor');
        this.cursorinner = document.querySelector('.cursor-inner');
        this.magneticElements = document.querySelectorAll('[data-magnetic]');
        
        if (!this.cursor || !this.cursorinner) return;
        
        this.setupCursor();
    }
    
    setupCursor() {
        let x = 0, y = 0;
        let targetX = 0, targetY = 0;
        
        document.addEventListener('mousemove', (e) => {
            x = e.clientX;
            y = e.clientY;
            
            this.cursor.style.left = x + 'px';
            this.cursor.style.top = y + 'px';
            
            // Smooth inner cursor
            targetX += (x - targetX) * 0.3;
            targetY += (y - targetY) * 0.3;
            this.cursorinner.style.left = targetX + 'px';
            this.cursorinner.style.top = targetY + 'px';
            
            // Magnetic effect on hover
            this.magneticElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                const elCenterX = rect.left + rect.width / 2;
                const elCenterY = rect.top + rect.height / 2;
                const distance = Math.sqrt((x - elCenterX) ** 2 + (y - elCenterY) ** 2);
                
                if (distance < 100) {
                    const angle = Math.atan2(y - elCenterY, x - elCenterX);
                    const tx = Math.cos(angle) * (100 - distance);
                    const ty = Math.sin(angle) * (100 - distance);
                    
                    el.style.transform = `translate(${-tx * 0.2}px, ${-ty * 0.2}px)`;
                } else {
                    el.style.transform = 'translate(0, 0)';
                }
            });
        });
        
        // Scale cursor on hover
        document.addEventListener('mouseenter', () => {
            this.cursor.classList.add('active');
            this.cursorinner.classList.add('active');
        });
        
        document.addEventListener('mouseleave', () => {
            this.cursor.classList.remove('active');
            this.cursorinner.classList.remove('active');
        });
    }
}

// ==================== SCROLL PROGRESS INDICATOR ====================
class ScrollProgress {
    constructor() {
        this.progressBar = document.querySelector('.scroll-progress');
        if (!this.progressBar) {
            this.createProgressBar();
        }
        this.init();
    }
    
    createProgressBar() {
        const bar = document.createElement('div');
        bar.className = 'scroll-progress';
        bar.innerHTML = '<div class="scroll-progress-fill"></div>';
        document.body.prepend(bar);
        this.progressBar = bar;
    }
    
    init() {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            
            const fill = this.progressBar.querySelector('.scroll-progress-fill');
            if (fill) {
                fill.style.width = scrolled + '%';
            }
        });
    }
}

// ==================== DYNAMIC PARTICLE BACKGROUND ====================
class ParticleBackground {
    constructor(container, options = {}) {
        this.container = container;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = options.particleCount || 50;
        this.color = options.color || 'rgba(0, 255, 255, 0.5)';
        this.speed = options.speed || 0.5;
        
        this.setup();
    }
    
    setup() {
        this.canvas.width = this.container.clientWidth;
        this.canvas.height = this.container.clientHeight;
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.pointerEvents = 'none';
        this.container.appendChild(this.canvas);
        
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * this.speed,
                vy: (Math.random() - 0.5) * this.speed,
                size: Math.random() * 2 + 1
            });
        }
        
        window.addEventListener('resize', () => this.handleResize());
        this.animate();
    }
    
    handleResize() {
        this.canvas.width = this.container.clientWidth;
        this.canvas.height = this.container.clientHeight;
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            
            if (p.x < 0) p.x = this.canvas.width;
            if (p.x > this.canvas.width) p.x = 0;
            if (p.y < 0) p.y = this.canvas.height;
            if (p.y > this.canvas.height) p.y = 0;
            
            this.ctx.fillStyle = this.color;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// ==================== REVEAL ON SCROLL ====================
class RevealOnScroll {
    constructor() {
        this.elements = document.querySelectorAll('[data-reveal]');
        if (this.elements.length === 0) return;
        
        this.setupIntersectionObserver();
    }
    
    setupIntersectionObserver() {
        const options = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        
        this.elements.forEach(el => observer.observe(el));
    }
}

// ==================== FLOATING ELEMENTS ====================
class FloatingElements {
    constructor() {
        this.floatingElements = document.querySelectorAll('[data-float]');
        if (this.floatingElements.length === 0) return;
        
        this.init();
    }
    
    init() {
        this.floatingElements.forEach((el, index) => {
            const delay = index * 0.2;
            const duration = 3 + Math.random() * 2;
            
            el.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
        });
    }
}

// ==================== TILT EFFECT ON HOVER ====================
class TiltEffect {
    constructor() {
        this.elements = document.querySelectorAll('[data-tilt]');
        this.setupTilt();
    }
    
    setupTilt() {
        this.elements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            });
        });
    }
}

// ==================== TYPEWRITER EFFECT ====================
class TypewriterEffect {
    constructor() {
        this.elements = document.querySelectorAll('[data-typewriter]');
        this.init();
    }
    
    init() {
        this.elements.forEach(el => {
            const text = el.textContent;
            el.textContent = '';
            el.classList.add('typewriter-active');
            
            let index = 0;
            const speed = parseInt(el.dataset.typewriterSpeed) || 50;
            
            const type = () => {
                if (index < text.length) {
                    el.textContent += text.charAt(index);
                    index++;
                    setTimeout(type, speed);
                }
            };
            
            // Start when element is in view
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && index === 0) {
                        type();
                        observer.unobserve(el);
                    }
                });
            });
            
            observer.observe(el);
        });
    }
}

// ==================== GOOEY EFFECT ====================
class GooeyEffect {
    constructor() {
        this.elements = document.querySelectorAll('[data-gooey]');
        if (this.elements.length === 0) return;
        
        // Add SVG filter to body if not exists
        this.addGooeyFilter();
    }
    
    addGooeyFilter() {
        const existingFilter = document.querySelector('#gooey-filter');
        if (existingFilter) return;
        
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.innerHTML = `
            <defs>
                <filter id="gooey-filter">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
        `;
        svg.style.display = 'none';
        document.body.appendChild(svg);
        
        this.elements.forEach(el => {
            el.style.filter = 'url(#gooey-filter)';
        });
    }
}

// ==================== INIT ALL ENHANCED INTERACTIONS ====================
document.addEventListener('DOMContentLoaded', () => {
    new MagneticCursor();
    new ScrollProgress();
    new RevealOnScroll();
    new FloatingElements();
    new TiltEffect();
    new TypewriterEffect();
    new GooeyEffect();
    
    // Add particle background to hero sections
    const heroSection = document.querySelector('.hero, [data-section="hero"]');
    if (heroSection) {
        heroSection.style.position = 'relative';
        new ParticleBackground(heroSection, {
            particleCount: 30,
            color: 'rgba(0, 255, 255, 0.3)',
            speed: 0.3
        });
    }
});
