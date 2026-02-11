// ==================== ENHANCED CURSOR EFFECTS ====================

class CursorEffects {
    constructor() {
        this.isEnabled = true;
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        this.particles = [];
        this.maxParticles = 50;
        this.canvas = null;
        this.ctx = null;
        this.mouse = { x: 0, y: 0 };
        this.lastMouse = { x: 0, y: 0 };
        this.currentSection = 'hero';
        
        if (!this.isMobile) {
            this.init();
        }
    }

    init() {
        this.createCanvas();
        this.setupEventListeners();
        this.animate();
        this.observeSections();
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'cursor-effects-canvas';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9998;
        `;
        document.body.appendChild(this.canvas);
        
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    setupEventListeners() {
        document.addEventListener('mousemove', (e) => {
            if (!this.isEnabled) return;
            
            this.lastMouse.x = this.mouse.x;
            this.lastMouse.y = this.mouse.y;
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            
            const speed = Math.sqrt(
                Math.pow(this.mouse.x - this.lastMouse.x, 2) + 
                Math.pow(this.mouse.y - this.lastMouse.y, 2)
            );
            
            // Create more particles based on speed
            const particleCount = Math.min(Math.ceil(speed / 5), 5);
            for (let i = 0; i < particleCount; i++) {
                this.createParticle(e.clientX, e.clientY);
            }
        });

        // Toggle with CTRL + P
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'p') {
                e.preventDefault();
                this.toggle();
            }
        });
    }

    observeSections() {
        const sections = document.querySelectorAll('section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.currentSection = entry.target.id || 'hero';
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(section => observer.observe(section));
    }

    getSectionColor() {
        const colors = {
            'home': { r: 0, g: 255, b: 255 },      // Cyan
            'hero': { r: 0, g: 255, b: 255 },      // Cyan
            'about': { r: 157, g: 0, b: 255 },     // Purple
            'skills': { r: 0, g: 255, b: 65 },     // Green
            'projects': { r: 255, g: 0, b: 255 },  // Pink
            'contact': { r: 255, g: 165, b: 0 }    // Orange
        };
        
        return colors[this.currentSection] || colors['hero'];
    }

    createParticle(x, y) {
        if (this.particles.length >= this.maxParticles) {
            this.particles.shift();
        }

        const color = this.getSectionColor();
        
        this.particles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            life: 1,
            decay: Math.random() * 0.02 + 0.01,
            size: Math.random() * 3 + 2,
            color: color
        });
    }

    animate() {
        if (!this.isEnabled) {
            requestAnimationFrame(() => this.animate());
            return;
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            
            // Update position
            p.x += p.vx;
            p.y += p.vy;
            p.life -= p.decay;
            
            // Remove dead particles
            if (p.life <= 0) {
                this.particles.splice(i, 1);
                continue;
            }

            // Draw particle
            this.ctx.save();
            
            // Glow effect
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.life})`;
            
            // Draw particle
            this.ctx.globalAlpha = p.life;
            this.ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.life})`;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.restore();
        }

        // Draw connecting lines between nearby particles
        this.drawConnections();

        requestAnimationFrame(() => this.animate());
    }

    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const p1 = this.particles[i];
                const p2 = this.particles[j];
                
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 50) {
                    const opacity = (1 - distance / 50) * Math.min(p1.life, p2.life);
                    const color = p1.color;
                    
                    this.ctx.save();
                    this.ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity * 0.3})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                    this.ctx.restore();
                }
            }
        }
    }

    toggle() {
        this.isEnabled = !this.isEnabled;
        
        if (!this.isEnabled) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.particles = [];
        }
        
        // Show notification
        this.showNotification(this.isEnabled ? 'Cursor effects enabled' : 'Cursor effects disabled');
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: rgba(0, 0, 0, 0.9);
            color: var(--neon-green);
            padding: 15px 25px;
            border: 2px solid var(--neon-green);
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            z-index: 10001;
            box-shadow: 0 0 20px rgba(0, 255, 65, 0.5);
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
}

// Initialize cursor effects
let cursorEffects;
document.addEventListener('DOMContentLoaded', () => {
    cursorEffects = new CursorEffects();
});

// Add notification animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);
