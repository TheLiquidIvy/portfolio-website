// ==================== EASTER EGGS & HIDDEN FEATURES ====================

class EasterEggs {
    constructor() {
        this.konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        this.konamiIndex = 0;
        this.logoClickCount = 0;
        this.matrixActive = false;
        this.debugMode = false;
        this.audioContext = null;
        
        this.init();
    }

    init() {
        this.setupKonamiCode();
        this.setupLogoClicks();
        this.setupDeveloperConsole();
        this.setupMatrixRain();
    }

    // ==================== KONAMI CODE ====================
    setupKonamiCode() {
        document.addEventListener('keydown', (e) => {
            if (e.key === this.konamiCode[this.konamiIndex]) {
                this.konamiIndex++;
                
                if (this.konamiIndex === this.konamiCode.length) {
                    this.activateUltraMode();
                    this.konamiIndex = 0;
                }
            } else {
                this.konamiIndex = 0;
            }
        });
    }

    activateUltraMode() {
        // Add ultra mode class to body
        document.body.classList.add('ultra-mode');
        
        // Show achievement
        this.showAchievement('ULTRA MODE ACTIVATED!', '🎮 Konami Code Master');
        
        // Play sound effect (optional - using Web Audio API)
        this.playSuccessSound();
        
        // Create confetti
        this.createConfetti();
        
        // Intensify effects
        this.intensifyEffects();
        
        // Show notification
        this.showNotification('⚡ ULTRA MODE ACTIVATED! ⚡', 'success');
        
        // Auto-disable after 10 seconds
        setTimeout(() => {
            document.body.classList.remove('ultra-mode');
            this.showNotification('Ultra Mode deactivated', 'info');
        }, 10000);
    }

    intensifyEffects() {
        // Add ultra mode styles dynamically
        const style = document.createElement('style');
        style.id = 'ultra-mode-styles';
        style.textContent = `
            .ultra-mode {
                animation: screenShake 0.5s infinite;
            }
            
            .ultra-mode .glitch {
                animation: glitch-skew 0.3s infinite !important;
            }
            
            .ultra-mode .hero-visual {
                animation: pulse 1s ease-in-out infinite;
            }
            
            .ultra-mode * {
                text-shadow: 0 0 20px var(--neon-blue) !important;
            }
            
            @keyframes screenShake {
                0%, 100% { transform: translate(0, 0); }
                25% { transform: translate(-2px, 2px); }
                50% { transform: translate(2px, -2px); }
                75% { transform: translate(-2px, -2px); }
            }
            
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
        `;
        
        // Remove existing ultra mode styles if any
        const existing = document.getElementById('ultra-mode-styles');
        if (existing) existing.remove();
        
        document.head.appendChild(style);
    }

    // ==================== LOGO CLICKS ====================
    setupLogoClicks() {
        const logo = document.querySelector('.logo');
        
        if (logo) {
            logo.addEventListener('click', () => {
                this.logoClickCount++;
                
                if (this.logoClickCount === 10) {
                    this.showSecretMessage();
                    this.logoClickCount = 0;
                }
            });
        }
    }

    showSecretMessage() {
        const modal = this.createModal(`
            <div style="text-align: center;">
                <h2 style="color: var(--neon-green); margin-bottom: 20px;">🎉 You Found a Secret! 🎉</h2>
                <p style="color: var(--text); font-size: 18px; margin-bottom: 20px;">
                    Here's a joke for you:
                </p>
                <p style="color: var(--neon-blue); font-size: 16px; margin-bottom: 10px; font-style: italic;">
                    "Why do programmers prefer dark mode?"
                </p>
                <p style="color: var(--neon-green); font-size: 20px; font-weight: bold;">
                    "Because light attracts bugs! 🐛"
                </p>
            </div>
        `);
        
        this.createConfetti();
        this.showAchievement('Secret Finder', '🔍 Clicked the logo 10 times');
    }

    // ==================== MATRIX RAIN ====================
    setupMatrixRain() {
        window.matrixRain = {
            active: false,
            start: () => this.startMatrixRain(),
            stop: () => this.stopMatrixRain()
        };
    }

    startMatrixRain() {
        if (this.matrixActive) return;
        
        this.matrixActive = true;
        
        // Create full-screen matrix overlay
        const overlay = document.createElement('div');
        overlay.id = 'matrix-rain-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #000;
            z-index: 99998;
            opacity: 0;
            transition: opacity 0.5s;
        `;
        
        const canvas = document.createElement('canvas');
        canvas.id = 'matrix-rain-canvas';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.cssText = 'display: block;';
        
        overlay.appendChild(canvas);
        document.body.appendChild(overlay);
        
        // Fade in
        setTimeout(() => overlay.style.opacity = '1', 10);
        
        // Start animation
        const ctx = canvas.getContext('2d');
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
        const fontSize = 16;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);
        
        const draw = () => {
            if (!this.matrixActive) return;
            
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#0F0';
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
            
            requestAnimationFrame(draw);
        };
        
        draw();
        
        // Auto-stop after 10 seconds or on ESC
        const stopHandler = (e) => {
            if (e.key === 'Escape') {
                this.stopMatrixRain();
                document.removeEventListener('keydown', stopHandler);
            }
        };
        
        document.addEventListener('keydown', stopHandler);
        
        setTimeout(() => {
            if (this.matrixActive) {
                this.stopMatrixRain();
                document.removeEventListener('keydown', stopHandler);
            }
        }, 10000);
    }

    stopMatrixRain() {
        this.matrixActive = false;
        const overlay = document.getElementById('matrix-rain-overlay');
        
        if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 500);
        }
    }

    // ==================== DEVELOPER CONSOLE ====================
    setupDeveloperConsole() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'D') {
                e.preventDefault();
                this.toggleDebugMode();
            }
        });
    }

    toggleDebugMode() {
        this.debugMode = !this.debugMode;
        
        if (this.debugMode) {
            this.showDeveloperConsole();
        } else {
            this.hideDeveloperConsole();
        }
    }

    showDeveloperConsole() {
        const console = document.createElement('div');
        console.id = 'developer-console';
        console.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 300px;
            background: rgba(0, 0, 0, 0.95);
            border: 2px solid var(--neon-green);
            border-radius: 8px;
            padding: 15px;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            color: var(--neon-green);
            z-index: 10000;
            box-shadow: 0 0 20px rgba(0, 255, 65, 0.5);
        `;
        
        console.innerHTML = `
            <div style="margin-bottom: 10px; color: var(--neon-blue); font-weight: bold; border-bottom: 1px solid var(--neon-green); padding-bottom: 5px;">
                🔧 DEVELOPER CONSOLE
            </div>
            <div id="debug-info">
                <div>FPS: <span id="fps-counter">--</span></div>
                <div>Memory: <span id="memory-usage">--</span></div>
                <div>Load Time: <span id="load-time">--</span></div>
                <div>Viewport: <span id="viewport-size">--</span></div>
                <div>Scroll: <span id="scroll-position">--</span></div>
                <div style="margin-top: 10px; color: var(--accent);">Debug Mode Active</div>
            </div>
        `;
        
        document.body.appendChild(console);
        
        // Start updating stats
        this.updateDebugStats();
    }

    hideDeveloperConsole() {
        const console = document.getElementById('developer-console');
        if (console) console.remove();
    }

    updateDebugStats() {
        if (!this.debugMode) return;
        
        // FPS Counter
        let lastTime = performance.now();
        let frames = 0;
        
        const updateFPS = () => {
            if (!this.debugMode) return;
            
            frames++;
            const currentTime = performance.now();
            
            if (currentTime >= lastTime + 1000) {
                const fps = Math.round((frames * 1000) / (currentTime - lastTime));
                const fpsEl = document.getElementById('fps-counter');
                if (fpsEl) fpsEl.textContent = fps;
                
                frames = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(updateFPS);
        };
        
        updateFPS();
        
        // Memory Usage (if available)
        if (performance.memory) {
            setInterval(() => {
                if (!this.debugMode) return;
                const memoryEl = document.getElementById('memory-usage');
                if (memoryEl) {
                    const usedMB = (performance.memory.usedJSHeapSize / 1048576).toFixed(2);
                    memoryEl.textContent = `${usedMB} MB`;
                }
            }, 1000);
        }
        
        // Load Time
        window.addEventListener('load', () => {
            const loadTimeEl = document.getElementById('load-time');
            if (loadTimeEl) {
                const loadTime = (performance.now() / 1000).toFixed(2);
                loadTimeEl.textContent = `${loadTime}s`;
            }
        });
        
        // Viewport Size
        const updateViewport = () => {
            if (!this.debugMode) return;
            const viewportEl = document.getElementById('viewport-size');
            if (viewportEl) {
                viewportEl.textContent = `${window.innerWidth}x${window.innerHeight}`;
            }
        };
        
        updateViewport();
        window.addEventListener('resize', updateViewport);
        
        // Scroll Position
        const updateScroll = () => {
            if (!this.debugMode) return;
            const scrollEl = document.getElementById('scroll-position');
            if (scrollEl) {
                scrollEl.textContent = `${Math.round(window.pageYOffset)}px`;
            }
        };
        
        window.addEventListener('scroll', updateScroll);
        updateScroll();
    }

    // ==================== HELPER FUNCTIONS ====================

    createModal(content) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: var(--bg-dark);
            border: 2px solid var(--neon-green);
            border-radius: 8px;
            padding: 40px;
            max-width: 500px;
            box-shadow: 0 0 40px rgba(0, 255, 65, 0.5);
            position: relative;
        `;
        
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '×';
        closeBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: none;
            border: none;
            color: #ff0066;
            font-size: 30px;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
        `;
        
        closeBtn.onclick = () => modal.remove();
        modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
        
        modalContent.innerHTML = content;
        modalContent.appendChild(closeBtn);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        return modal;
    }

    showNotification(message, type = 'info') {
        const colors = {
            info: 'var(--neon-blue)',
            success: 'var(--neon-green)',
            warning: 'var(--accent)',
            error: '#ff0066'
        };
        
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: rgba(0, 0, 0, 0.95);
            color: ${colors[type]};
            padding: 15px 25px;
            border: 2px solid ${colors[type]};
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            z-index: 10001;
            box-shadow: 0 0 20px ${colors[type]}80;
            animation: slideInRight 0.3s ease;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    showAchievement(title, description) {
        const achievement = document.createElement('div');
        achievement.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            background: var(--bg-dark);
            border: 3px solid var(--neon-green);
            border-radius: 12px;
            padding: 30px;
            text-align: center;
            z-index: 10002;
            box-shadow: 0 0 50px rgba(0, 255, 65, 0.8);
            animation: achievementPop 0.5s ease forwards;
        `;
        
        achievement.innerHTML = `
            <div style="font-size: 48px; margin-bottom: 15px;">🏆</div>
            <div style="color: var(--neon-green); font-size: 24px; font-weight: bold; margin-bottom: 10px;">${title}</div>
            <div style="color: var(--text); font-size: 16px;">${description}</div>
        `;
        
        document.body.appendChild(achievement);
        
        setTimeout(() => {
            achievement.style.animation = 'achievementOut 0.5s ease forwards';
            setTimeout(() => achievement.remove(), 500);
        }, 3000);
    }

    createConfetti() {
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${['var(--neon-blue)', 'var(--neon-pink)', 'var(--neon-green)', 'var(--accent)'][Math.floor(Math.random() * 4)]};
                top: -10px;
                left: ${Math.random() * 100}%;
                opacity: 1;
                z-index: 10003;
                animation: confettiFall ${2 + Math.random() * 2}s linear forwards;
                transform: rotate(${Math.random() * 360}deg);
            `;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 4000);
        }
    }

    playSuccessSound() {
        // Simple success sound using Web Audio API
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.5);
    }
}

// Add animations
const easterEggStyles = document.createElement('style');
easterEggStyles.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @keyframes achievementPop {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
        }
        50% {
            transform: translate(-50%, -50%) scale(1.1);
        }
        100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
    }
    
    @keyframes achievementOut {
        to {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(easterEggStyles);

// Initialize Easter Eggs
let easterEggs;
document.addEventListener('DOMContentLoaded', () => {
    easterEggs = new EasterEggs();
});
