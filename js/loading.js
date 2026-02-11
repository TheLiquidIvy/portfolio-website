// ==================== LOADING SCREEN ====================

class LoadingScreen {
    constructor() {
        this.minDisplayTime = 2000; // 2 seconds minimum
        this.maxDisplayTime = 4000; // 4 seconds maximum
        this.startTime = Date.now();
        this.init();
    }

    init() {
        this.createLoadingScreen();
        this.startBootSequence();
    }

    createLoadingScreen() {
        const loadingScreen = document.createElement('div');
        loadingScreen.className = 'loading-screen';
        loadingScreen.id = 'loading-screen';
        
        loadingScreen.innerHTML = `
            <div class="loading-particles" id="loading-particles"></div>
            <div class="loading-content">
                <div class="loading-logo loading-logo-glitch" data-text="CYBERPUNK">
${this.getASCIILogo()}
                </div>
                <div class="boot-sequence" id="boot-sequence"></div>
                <div class="loading-bar-container">
                    <div class="loading-bar" id="loading-bar"></div>
                    <div class="loading-percentage" id="loading-percentage">0%</div>
                </div>
                <div class="loading-text" id="loading-text">Initializing...</div>
                <div class="loading-welcome" id="loading-welcome" style="opacity: 0;"></div>
            </div>
        `;
        
        document.body.insertBefore(loadingScreen, document.body.firstChild);
        this.createParticles();
    }

    getASCIILogo() {
        return `
   ____      _                                  _    
  / ___|   _| |__   ___ _ __ _ __  _   _ _ __ | | __
 | |  | | | | '_ \\ / _ \\ '__| '_ \\| | | | '_ \\| |/ /
 | |__| |_| | |_) |  __/ |  | |_) | |_| | | | |   < 
  \\____\\__, |_.__/ \\___|_|  | .__/ \\__,_|_| |_|_|\\_\\
       |___/                |_|                      
        `;
    }

    createParticles() {
        const container = document.getElementById('loading-particles');
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 5 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
            container.appendChild(particle);
        }
    }

    startBootSequence() {
        const bootSteps = [
            { text: '[INITIALIZING CYBERPUNK PROTOCOL]', status: '', delay: 0 },
            { text: '> Loading neural network.............', status: 'loading', delay: 500 },
            { text: '> Loading neural network.............', status: 'ok', delay: 1000 },
            { text: '> Connecting to mainframe............', status: 'loading', delay: 1200 },
            { text: '> Connecting to mainframe............', status: 'ok', delay: 1800 },
            { text: '> Decrypting portfolio data..........', status: 'loading', delay: 2000 },
            { text: '> Decrypting portfolio data..........', status: 'ok', delay: 2600 },
            { text: '> Rendering holographic interface....', status: 'loading', delay: 2800 },
            { text: '> Rendering holographic interface....', status: 'ok', delay: 3400 },
            { text: '> System ready. Welcome.', status: 'ok', delay: 3600 }
        ];

        const bootSequence = document.getElementById('boot-sequence');
        let currentLineElement = null;
        
        bootSteps.forEach((step, index) => {
            setTimeout(() => {
                if (step.status === 'loading' && currentLineElement) {
                    // Update existing line with loading status
                    const statusSpan = currentLineElement.querySelector('.boot-status');
                    statusSpan.textContent = '[...]';
                    statusSpan.className = 'boot-status loading';
                } else if (step.status === 'ok' && currentLineElement) {
                    // Update existing line with OK status
                    const statusSpan = currentLineElement.querySelector('.boot-status');
                    statusSpan.textContent = '[OK]';
                    statusSpan.className = 'boot-status ok';
                } else {
                    // Create new line
                    const line = document.createElement('div');
                    line.className = 'boot-line';
                    line.style.animationDelay = '0s';
                    
                    if (step.status) {
                        line.innerHTML = `${step.text} <span class="boot-status ${step.status}">${step.status === 'ok' ? '[OK]' : '[...]'}</span>`;
                    } else {
                        line.textContent = step.text;
                    }
                    
                    bootSequence.appendChild(line);
                    currentLineElement = line;
                }
                
                // Update progress bar
                const progress = ((index + 1) / bootSteps.length) * 100;
                this.updateProgress(progress);
            }, step.delay);
        });

        // Show welcome message and complete
        setTimeout(() => {
            const welcomeEl = document.getElementById('loading-welcome');
            welcomeEl.textContent = 'System ready. Welcome.';
            welcomeEl.style.opacity = '1';
            
            // Ensure minimum display time
            const elapsed = Date.now() - this.startTime;
            const remainingTime = Math.max(0, this.minDisplayTime - elapsed);
            
            setTimeout(() => {
                this.complete();
            }, remainingTime);
        }, 3800);
    }

    updateProgress(percentage) {
        const bar = document.getElementById('loading-bar');
        const percentageEl = document.getElementById('loading-percentage');
        const textEl = document.getElementById('loading-text');
        
        // Check if elements still exist (may have been removed)
        if (!bar || !percentageEl || !textEl) return;
        
        bar.style.width = percentage + '%';
        percentageEl.textContent = Math.round(percentage) + '%';
        
        // Update loading text based on progress
        if (percentage < 25) {
            textEl.textContent = 'Initializing systems...';
        } else if (percentage < 50) {
            textEl.textContent = 'Loading components...';
        } else if (percentage < 75) {
            textEl.textContent = 'Establishing connections...';
        } else if (percentage < 100) {
            textEl.textContent = 'Finalizing setup...';
        } else {
            textEl.textContent = 'Ready!';
        }
    }

    complete() {
        const loadingScreen = document.getElementById('loading-screen');
        
        if (loadingScreen) {
            loadingScreen.classList.add('fade-out');
            
            setTimeout(() => {
                loadingScreen.remove();
                
                // Dispatch custom event for when loading is complete
                const event = new CustomEvent('loadingComplete');
                document.dispatchEvent(event);
            }, 500);
        }
    }
}

// Auto-initialize loading screen
let loadingScreen;
if (document.readyState === 'loading') {
    loadingScreen = new LoadingScreen();
} else {
    // If DOM is already loaded, show loading briefly
    document.addEventListener('DOMContentLoaded', () => {
        loadingScreen = new LoadingScreen();
    });
}
