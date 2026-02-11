// ==================== RESUME TOGGLE FUNCTIONALITY ====================
// Toggle between Themed and ATS versions of the resume

class ResumeToggle {
    constructor() {
        this.modes = {
            THEMED: 'themed',
            ATS: 'ats'
        };
        
        this.currentMode = this.modes.THEMED;
        this.storageKey = 'resumeViewMode';
        
        this.init();
    }

    init() {
        // Load saved preference from localStorage
        this.loadPreference();
        
        // Create toggle button
        this.createToggleButton();
        
        // Apply initial mode
        this.applyMode(this.currentMode, false);
        
        console.log('[Resume Toggle] Initialized with mode:', this.currentMode);
    }

    createToggleButton() {
        // Check if button already exists
        if (document.querySelector('.resume-toggle-container')) {
            return;
        }

        // Create toggle container
        const toggleContainer = document.createElement('div');
        toggleContainer.className = 'resume-toggle-container';
        toggleContainer.innerHTML = `
            <button class="resume-toggle-btn" id="resumeToggleBtn" aria-label="Toggle resume style">
                <span class="toggle-icon" aria-hidden="true">🎨</span>
                <span class="toggle-text">Switch to ATS Version</span>
            </button>
            <div class="mode-indicator" aria-live="polite" aria-atomic="true">
                <span class="indicator-dot"></span>
                <span class="indicator-text">Themed Version</span>
            </div>
        `;

        // Insert at the top of the page (after header or at beginning of body)
        const header = document.querySelector('.resume-header') || document.body;
        if (header === document.body) {
            document.body.insertBefore(toggleContainer, document.body.firstChild);
        } else {
            header.parentNode.insertBefore(toggleContainer, header);
        }

        // Add event listener
        const toggleBtn = document.getElementById('resumeToggleBtn');
        toggleBtn.addEventListener('click', () => this.toggle());

        // Add CSS for the toggle button if not already present
        this.injectToggleStyles();
    }

    toggle() {
        const newMode = this.currentMode === this.modes.THEMED ? this.modes.ATS : this.modes.THEMED;
        this.applyMode(newMode, true);
        this.savePreference(newMode);
        
        // Announce change to screen readers
        this.announceChange(newMode);
    }

    applyMode(mode, animated = true) {
        this.currentMode = mode;
        
        const body = document.body;
        const linkId = 'resume-style-link';
        let styleLink = document.getElementById(linkId);

        // Add fade effect if animated
        if (animated) {
            body.style.opacity = '0';
            body.style.transition = 'opacity 0.3s ease';
        }

        setTimeout(() => {
            // Remove existing dynamic style link if present
            if (styleLink) {
                styleLink.remove();
            }

            // Create new style link
            styleLink = document.createElement('link');
            styleLink.id = linkId;
            styleLink.rel = 'stylesheet';
            styleLink.href = mode === this.modes.ATS ? 'css/resume-ats.css' : 'css/resume-themed.css';
            
            // Insert before any existing style tags
            const firstStyle = document.querySelector('link[rel="stylesheet"]');
            if (firstStyle) {
                firstStyle.parentNode.insertBefore(styleLink, firstStyle);
            } else {
                document.head.appendChild(styleLink);
            }

            // Update UI elements
            this.updateUI(mode);

            // Fade back in
            if (animated) {
                setTimeout(() => {
                    body.style.opacity = '1';
                }, 50);
            }
        }, animated ? 150 : 0);
    }

    updateUI(mode) {
        const toggleBtn = document.getElementById('resumeToggleBtn');
        const toggleText = toggleBtn.querySelector('.toggle-text');
        const toggleIcon = toggleBtn.querySelector('.toggle-icon');
        const indicatorText = document.querySelector('.indicator-text');
        const indicatorDot = document.querySelector('.indicator-dot');

        if (mode === this.modes.ATS) {
            toggleText.textContent = 'Switch to Themed Version';
            toggleIcon.textContent = '🎨';
            indicatorText.textContent = 'ATS Version';
            indicatorDot.style.background = '#00ff41';
            toggleBtn.classList.add('ats-mode');
            toggleBtn.classList.remove('themed-mode');
        } else {
            toggleText.textContent = 'Switch to ATS Version';
            toggleIcon.textContent = '📋';
            indicatorText.textContent = 'Themed Version';
            indicatorDot.style.background = '#00f3ff';
            toggleBtn.classList.add('themed-mode');
            toggleBtn.classList.remove('ats-mode');
        }

        // Update aria-label
        toggleBtn.setAttribute('aria-label', 
            mode === this.modes.ATS ? 
            'Switch to themed version' : 
            'Switch to ATS optimized version'
        );
    }

    savePreference(mode) {
        try {
            localStorage.setItem(this.storageKey, mode);
            console.log('[Resume Toggle] Preference saved:', mode);
        } catch (error) {
            console.warn('[Resume Toggle] Failed to save preference:', error);
        }
    }

    loadPreference() {
        try {
            const savedMode = localStorage.getItem(this.storageKey);
            if (savedMode && (savedMode === this.modes.THEMED || savedMode === this.modes.ATS)) {
                this.currentMode = savedMode;
                console.log('[Resume Toggle] Loaded preference:', savedMode);
            }
        } catch (error) {
            console.warn('[Resume Toggle] Failed to load preference:', error);
        }
    }

    announceChange(mode) {
        const announcement = document.createElement('div');
        announcement.className = 'sr-only';
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.textContent = `Switched to ${mode === this.modes.ATS ? 'ATS optimized' : 'themed'} version`;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            announcement.remove();
        }, 1000);
    }

    injectToggleStyles() {
        // Check if styles already injected
        if (document.getElementById('resume-toggle-styles')) {
            return;
        }

        const styles = document.createElement('style');
        styles.id = 'resume-toggle-styles';
        styles.textContent = `
            /* Resume Toggle Styles */
            .resume-toggle-container {
                position: sticky;
                top: 0;
                z-index: 1000;
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 1rem;
                padding: 1rem;
                background: rgba(10, 10, 20, 0.95);
                backdrop-filter: blur(10px);
                border-bottom: 2px solid rgba(0, 243, 255, 0.3);
                margin-bottom: 2rem;
            }

            .resume-toggle-btn {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.75rem 1.5rem;
                font-family: 'Orbitron', sans-serif;
                font-size: 0.9rem;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                color: #ffffff;
                background: linear-gradient(135deg, #00f3ff, #ff00ff);
                border: 2px solid transparent;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
            }

            .resume-toggle-btn::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
                transition: left 0.5s ease;
            }

            .resume-toggle-btn:hover::before {
                left: 100%;
            }

            .resume-toggle-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 0 20px rgba(0, 243, 255, 0.5);
            }

            .resume-toggle-btn:active {
                transform: translateY(0);
            }

            .resume-toggle-btn:focus {
                outline: 3px solid #00f3ff;
                outline-offset: 3px;
            }

            .resume-toggle-btn.ats-mode {
                background: linear-gradient(135deg, #00ff41, #00aa2a);
            }

            .toggle-icon {
                font-size: 1.2rem;
            }

            .toggle-text {
                position: relative;
                z-index: 1;
            }

            .mode-indicator {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.5rem 1rem;
                background: rgba(0, 0, 0, 0.5);
                border: 1px solid rgba(0, 243, 255, 0.3);
                border-radius: 20px;
                font-size: 0.85rem;
                color: #a0a0b0;
            }

            .indicator-dot {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: #00f3ff;
                animation: pulse 2s ease-in-out infinite;
            }

            @keyframes pulse {
                0%, 100% {
                    opacity: 1;
                    transform: scale(1);
                }
                50% {
                    opacity: 0.6;
                    transform: scale(0.9);
                }
            }

            .indicator-text {
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: 0.05em;
            }

            /* Responsive */
            @media (max-width: 768px) {
                .resume-toggle-container {
                    flex-direction: column;
                    gap: 0.75rem;
                    padding: 0.75rem;
                }

                .resume-toggle-btn {
                    width: 100%;
                    justify-content: center;
                }

                .mode-indicator {
                    font-size: 0.8rem;
                }
            }

            @media (max-width: 480px) {
                .resume-toggle-btn {
                    padding: 0.6rem 1rem;
                    font-size: 0.8rem;
                }

                .toggle-icon {
                    font-size: 1rem;
                }
            }

            /* Print - hide toggle */
            @media print {
                .resume-toggle-container {
                    display: none !important;
                }
            }

            /* ATS Mode Overrides */
            body.ats-mode .resume-toggle-container {
                background: #ffffff;
                border-bottom: 2px solid #000000;
            }

            body.ats-mode .resume-toggle-btn {
                background: #000000;
                color: #ffffff;
            }

            body.ats-mode .mode-indicator {
                background: #f5f5f5;
                border-color: #000000;
                color: #000000;
            }
        `;
        
        document.head.appendChild(styles);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.resumeToggle = new ResumeToggle();
    });
} else {
    window.resumeToggle = new ResumeToggle();
}

console.log('[Resume Toggle] Module loaded');
