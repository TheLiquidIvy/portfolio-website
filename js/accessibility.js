// ==================== ACCESSIBILITY IMPROVEMENTS ====================

class AccessibilityEnhancements {
    constructor() {
        this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.init();
    }

    init() {
        this.addARIALabels();
        this.addSkipLink();
        this.setupKeyboardNavigation();
        this.setupReducedMotion();
        this.addFocusIndicators();
        this.improveFormAccessibility();
        this.addScreenReaderAnnouncements();
    }

    // Add ARIA labels to interactive elements
    addARIALabels() {
        // Navigation links
        document.querySelectorAll('.nav-link').forEach((link, index) => {
            if (!link.getAttribute('aria-label')) {
                const text = link.textContent.trim();
                link.setAttribute('aria-label', `Navigate to ${text} section`);
            }
        });

        // Buttons
        document.querySelectorAll('button:not([aria-label])').forEach(button => {
            const text = button.textContent.trim();
            if (text) {
                button.setAttribute('aria-label', text);
            }
        });

        // Logo
        const logo = document.querySelector('.logo');
        if (logo && !logo.getAttribute('aria-label')) {
            logo.setAttribute('aria-label', 'Maya Smith - Developer Portfolio Home');
            logo.setAttribute('role', 'button');
            logo.setAttribute('tabindex', '0');
        }

        // Project cards
        document.querySelectorAll('.project-card').forEach(card => {
            const title = card.querySelector('h3');
            if (title && !card.getAttribute('aria-label')) {
                card.setAttribute('aria-label', `Project: ${title.textContent}`);
            }
        });

        // Social links
        document.querySelectorAll('.social-link').forEach(link => {
            if (!link.getAttribute('aria-label')) {
                const href = link.getAttribute('href');
                const platform = href.includes('github') ? 'GitHub' :
                                href.includes('linkedin') ? 'LinkedIn' :
                                href.includes('twitter') ? 'Twitter' : 'Social Media';
                link.setAttribute('aria-label', `Visit my ${platform} profile`);
            }
        });

        // Terminal
        const terminal = document.getElementById('terminal-overlay');
        if (terminal) {
            terminal.setAttribute('role', 'dialog');
            terminal.setAttribute('aria-modal', 'true');
            terminal.setAttribute('aria-label', 'Interactive Terminal');
        }

        // Theme switcher
        const themeSwitcher = document.querySelector('.theme-switcher-btn');
        if (themeSwitcher) {
            themeSwitcher.setAttribute('role', 'button');
            themeSwitcher.setAttribute('aria-label', 'Change theme');
            themeSwitcher.setAttribute('tabindex', '0');
        }
    }

    // Add skip to content link
    addSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        skipLink.setAttribute('aria-label', 'Skip to main content');
        
        skipLink.style.cssText = `
            position: fixed;
            top: -100px;
            left: 10px;
            z-index: 100000;
            padding: 10px 20px;
            background: var(--neon-blue);
            color: var(--bg-dark);
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            transition: top 0.3s ease;
        `;

        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '10px';
        });

        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-100px';
        });

        document.body.insertBefore(skipLink, document.body.firstChild);

        // Add ID to main content if not exists
        const heroSection = document.getElementById('home');
        if (heroSection && !document.getElementById('main-content')) {
            heroSection.id = 'main-content';
        }
    }

    // Enhanced keyboard navigation
    setupKeyboardNavigation() {
        // Logo keyboard interaction
        const logo = document.querySelector('.logo');
        if (logo) {
            logo.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    logo.click();
                }
            });
        }

        // Theme switcher keyboard interaction
        const themeSwitcher = document.querySelector('.theme-switcher-btn');
        if (themeSwitcher) {
            themeSwitcher.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    themeSwitcher.click();
                }
            });
        }

        // Improve focus trap in modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                const modal = document.querySelector('.terminal-overlay.active, .contact-modal, .loading-screen');
                if (modal) {
                    this.trapFocus(e, modal);
                }
            }
        });

        // Escape key handling
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Close any open modals
                const modals = document.querySelectorAll('.contact-modal, .theme-dropdown.active');
                modals.forEach(modal => {
                    if (modal.classList.contains('theme-dropdown')) {
                        modal.classList.remove('active');
                    } else {
                        modal.remove();
                    }
                });
            }
        });
    }

    // Trap focus within modal
    trapFocus(e, modal) {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }

    // Reduced motion support
    setupReducedMotion() {
        if (this.reducedMotion) {
            document.documentElement.classList.add('reduced-motion');
            
            // Add reduced motion styles
            const style = document.createElement('style');
            style.textContent = `
                .reduced-motion *,
                .reduced-motion *::before,
                .reduced-motion *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
                
                .reduced-motion .cursor-trail,
                .reduced-motion #cursor-effects-canvas {
                    display: none !important;
                }
                
                .reduced-motion .loading-particles {
                    display: none !important;
                }
            `;
            document.head.appendChild(style);

            // Disable cursor effects
            if (window.cursorEffects) {
                window.cursorEffects.isEnabled = false;
            }

            // Show notification
            this.announceToScreenReader('Reduced motion mode is active');
        }

        // Listen for changes
        window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
            if (e.matches) {
                location.reload();
            }
        });
    }

    // Enhanced focus indicators
    addFocusIndicators() {
        const style = document.createElement('style');
        style.textContent = `
            *:focus {
                outline: 2px solid var(--neon-blue);
                outline-offset: 2px;
            }

            *:focus:not(:focus-visible) {
                outline: none;
            }

            *:focus-visible {
                outline: 2px solid var(--neon-blue);
                outline-offset: 2px;
                box-shadow: 0 0 0 4px rgba(0, 255, 255, 0.2);
            }

            .btn:focus-visible {
                box-shadow: 
                    0 0 0 4px rgba(0, 255, 255, 0.2),
                    0 0 20px var(--primary);
            }

            .nav-link:focus-visible {
                background: rgba(0, 255, 255, 0.1);
                border-radius: 4px;
            }
        `;
        document.head.appendChild(style);
    }

    // Improve form accessibility
    improveFormAccessibility() {
        const form = document.querySelector('.contact-form');
        if (!form) return;

        // Add aria-required to required fields
        form.querySelectorAll('input[required], textarea[required]').forEach(field => {
            field.setAttribute('aria-required', 'true');
        });

        // Add aria-invalid for error states
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                if (mutation.attributeName === 'class') {
                    const target = mutation.target;
                    if (target.classList.contains('error')) {
                        target.setAttribute('aria-invalid', 'true');
                        const error = target.parentElement.querySelector('.field-error');
                        if (error) {
                            const errorId = `error-${target.name}`;
                            error.id = errorId;
                            target.setAttribute('aria-describedby', errorId);
                        }
                    } else {
                        target.setAttribute('aria-invalid', 'false');
                        target.removeAttribute('aria-describedby');
                    }
                }
            });
        });

        form.querySelectorAll('input, textarea').forEach(field => {
            observer.observe(field, { attributes: true });
        });

        // Add labels if missing
        form.querySelectorAll('input, textarea').forEach(field => {
            if (!field.id) {
                field.id = `field-${field.name}`;
            }
            
            let label = form.querySelector(`label[for="${field.id}"]`);
            if (!label) {
                label = document.createElement('label');
                label.setAttribute('for', field.id);
                label.textContent = field.placeholder || field.name;
                label.style.cssText = 'position: absolute; left: -10000px;';
                field.parentElement.insertBefore(label, field);
            }
        });
    }

    // Screen reader announcements
    addScreenReaderAnnouncements() {
        // Create live region for announcements
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.style.cssText = `
            position: absolute;
            left: -10000px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
        document.body.appendChild(liveRegion);
        window.screenReaderAnnounce = liveRegion;

        // Announce page load completion
        window.addEventListener('load', () => {
            this.announceToScreenReader('Page loaded successfully. Press tilde key to open terminal.');
        });

        // Announce section changes
        const sections = document.querySelectorAll('section');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionName = entry.target.querySelector('h2')?.textContent || 
                                      entry.target.id || 'Section';
                    this.announceToScreenReader(`Viewing ${sectionName}`);
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(section => observer.observe(section));
    }

    announceToScreenReader(message) {
        const liveRegion = window.screenReaderAnnounce;
        if (liveRegion) {
            liveRegion.textContent = '';
            setTimeout(() => {
                liveRegion.textContent = message;
            }, 100);
        }
    }
}

// Initialize accessibility enhancements
document.addEventListener('DOMContentLoaded', () => {
    new AccessibilityEnhancements();
});

// Add alt text checker for development
if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'development') {
    document.addEventListener('DOMContentLoaded', () => {
        const images = document.querySelectorAll('img:not([alt])');
        if (images.length > 0) {
            console.warn('⚠️ Found images without alt text:', images);
        }
    });
}
