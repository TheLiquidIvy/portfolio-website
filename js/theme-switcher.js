// ==================== THEME SWITCHER ====================

class ThemeSwitcher {
    constructor() {
        this.themes = {
            cyberpunk: {
                name: 'Cyberpunk',
                icon: '🌆',
                description: 'Neon lights and futuristic vibes'
            },
            dark: {
                name: 'Dark Minimal',
                icon: '🌙',
                description: 'Clean and professional'
            },
            'neon-light': {
                name: 'Neon Light',
                icon: '☀️',
                description: 'Bright with neon accents'
            },
            matrix: {
                name: 'Matrix',
                icon: '💚',
                description: 'Green terminal aesthetic'
            },
            synthwave: {
                name: 'Synthwave',
                icon: '🌸',
                description: 'Retro 80s vibes'
            }
        };

        this.currentTheme = this.loadTheme();
        this.init();
    }

    init() {
        this.createThemeSwitcher();
        this.applyTheme(this.currentTheme);
        
        // Make theme switcher available globally
        window.themeSwitcher = this;
    }

    loadTheme() {
        return localStorage.getItem('portfolio-theme') || 'cyberpunk';
    }

    saveTheme(theme) {
        localStorage.setItem('portfolio-theme', theme);
    }

    createThemeSwitcher() {
        // Create theme button in navbar
        const nav = document.querySelector('.nav-container');
        if (!nav) return;

        const themeButton = document.createElement('div');
        themeButton.className = 'theme-switcher-btn';
        themeButton.innerHTML = '🎨';
        themeButton.title = 'Switch Theme';
        
        // Insert before hamburger menu or at the end
        const hamburger = nav.querySelector('.hamburger');
        if (hamburger) {
            nav.insertBefore(themeButton, hamburger);
        } else {
            nav.appendChild(themeButton);
        }

        // Create dropdown menu
        const dropdown = document.createElement('div');
        dropdown.className = 'theme-dropdown';
        dropdown.innerHTML = this.createDropdownHTML();
        document.body.appendChild(dropdown);

        // Event listeners
        themeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('active');
            this.positionDropdown(themeButton, dropdown);
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target) && e.target !== themeButton) {
                dropdown.classList.remove('active');
            }
        });

        // Theme selection
        dropdown.querySelectorAll('.theme-option').forEach(option => {
            option.addEventListener('click', () => {
                const theme = option.dataset.theme;
                this.switchTheme(theme);
                dropdown.classList.remove('active');
            });
        });

        // Add styles
        this.addStyles();
    }

    createDropdownHTML() {
        let html = '<div class="theme-dropdown-header">Choose Theme</div>';
        
        Object.entries(this.themes).forEach(([key, theme]) => {
            const isActive = key === this.currentTheme ? 'active' : '';
            html += `
                <div class="theme-option ${isActive}" data-theme="${key}">
                    <span class="theme-icon">${theme.icon}</span>
                    <div class="theme-info">
                        <div class="theme-name">${theme.name}</div>
                        <div class="theme-description">${theme.description}</div>
                    </div>
                    ${isActive ? '<span class="theme-check">✓</span>' : ''}
                </div>
            `;
        });

        return html;
    }

    positionDropdown(button, dropdown) {
        const rect = button.getBoundingClientRect();
        dropdown.style.top = (rect.bottom + 10) + 'px';
        dropdown.style.right = (window.innerWidth - rect.right) + 'px';
    }

    switchTheme(theme) {
        if (!this.themes[theme]) return;

        this.currentTheme = theme;
        this.applyTheme(theme);
        this.saveTheme(theme);
        this.updateDropdown();
        
        // Show notification
        this.showNotification(`Switched to ${this.themes[theme].name} theme`);
    }

    applyTheme(theme) {
        if (theme === 'cyberpunk') {
            document.documentElement.removeAttribute('data-theme');
        } else {
            document.documentElement.setAttribute('data-theme', theme);
        }
    }

    updateDropdown() {
        const dropdown = document.querySelector('.theme-dropdown');
        if (!dropdown) return;

        dropdown.querySelectorAll('.theme-option').forEach(option => {
            const theme = option.dataset.theme;
            const existingCheck = option.querySelector('.theme-check');
            
            if (theme === this.currentTheme) {
                option.classList.add('active');
                if (!existingCheck) {
                    const checkSpan = document.createElement('span');
                    checkSpan.className = 'theme-check';
                    checkSpan.textContent = '✓';
                    option.appendChild(checkSpan);
                }
            } else {
                option.classList.remove('active');
                if (existingCheck) {
                    existingCheck.remove();
                }
            }
        });
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'theme-notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .theme-switcher-btn {
                font-size: 24px;
                cursor: pointer;
                padding: 8px;
                margin-left: auto;
                margin-right: 15px;
                transition: transform 0.3s ease;
                user-select: none;
            }

            .theme-switcher-btn:hover {
                transform: scale(1.2) rotate(15deg);
            }

            .theme-dropdown {
                position: fixed;
                background: var(--bg-dark);
                border: 2px solid var(--primary);
                border-radius: 8px;
                padding: 10px;
                min-width: 300px;
                box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
                z-index: 10000;
                opacity: 0;
                transform: translateY(-10px);
                pointer-events: none;
                transition: all 0.3s ease;
            }

            .theme-dropdown.active {
                opacity: 1;
                transform: translateY(0);
                pointer-events: all;
            }

            .theme-dropdown-header {
                color: var(--primary);
                font-size: 14px;
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-bottom: 10px;
                padding-bottom: 10px;
                border-bottom: 1px solid var(--primary);
            }

            .theme-option {
                display: flex;
                align-items: center;
                padding: 12px;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.2s ease;
                margin-bottom: 5px;
                position: relative;
            }

            .theme-option:hover {
                background: rgba(0, 255, 255, 0.1);
                transform: translateX(5px);
            }

            .theme-option.active {
                background: rgba(0, 255, 255, 0.15);
                border: 1px solid var(--primary);
            }

            .theme-icon {
                font-size: 24px;
                margin-right: 12px;
            }

            .theme-info {
                flex: 1;
            }

            .theme-name {
                color: var(--text);
                font-weight: 600;
                font-size: 14px;
                margin-bottom: 2px;
            }

            .theme-description {
                color: var(--text-dim);
                font-size: 12px;
            }

            .theme-check {
                color: var(--neon-green);
                font-size: 18px;
                font-weight: bold;
                margin-left: 10px;
            }

            .theme-notification {
                position: fixed;
                top: 80px;
                right: -300px;
                background: rgba(0, 0, 0, 0.95);
                color: var(--neon-green);
                padding: 15px 25px;
                border: 2px solid var(--neon-green);
                border-radius: 4px;
                font-family: 'Courier New', monospace;
                font-size: 14px;
                z-index: 10001;
                box-shadow: 0 0 20px rgba(0, 255, 65, 0.5);
                transition: right 0.3s ease;
            }

            .theme-notification.show {
                right: 20px;
            }

            @media (max-width: 768px) {
                .theme-switcher-btn {
                    margin-right: 10px;
                    font-size: 20px;
                }

                .theme-dropdown {
                    min-width: 250px;
                    right: 10px !important;
                    left: auto !important;
                }

                .theme-option {
                    padding: 10px;
                }

                .theme-icon {
                    font-size: 20px;
                    margin-right: 10px;
                }

                .theme-name {
                    font-size: 13px;
                }

                .theme-description {
                    font-size: 11px;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize theme switcher
let themeSwitcher;
document.addEventListener('DOMContentLoaded', () => {
    themeSwitcher = new ThemeSwitcher();
});
