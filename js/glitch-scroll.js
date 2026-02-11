// ==================== GLITCH SCROLL SYSTEM ====================

class GlitchScroll {
    constructor() {
        this.sections = document.querySelectorAll('section');
        this.currentSection = 0;
        this.isAnimating = false;
        this.touchStartY = 0;
        this.touchEndY = 0;
        this.minSwipeDistance = 50;
        
        // Check for reduced motion preference
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        this.init();
    }
    
    init() {
        if (this.sections.length === 0) {
            console.warn('GlitchScroll: No sections found');
            return;
        }
        
        // Setup event listeners
        this.setupScrollListener();
        this.setupClickListeners();
        this.setupKeyboardNav();
        this.setupTouchGestures();
        this.createNavigationDots();
        this.createScrollDownArrow();
        
        // Set initial section
        this.updateCurrentSection();
        
        // Listen for hash changes
        window.addEventListener('hashchange', () => this.handleHashChange());
    }
    
    updateCurrentSection() {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        
        this.sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                this.currentSection = index;
            }
        });
        
        this.updateNavigationDots();
        this.updateScrollArrow();
    }
    
    setupScrollListener() {
        let scrollTimeout;
        
        // Only track scroll position for navigation dots and current section
        // Let browser handle normal scrolling - no wheel event hijacking
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            
            scrollTimeout = setTimeout(() => {
                this.updateCurrentSection();
            }, 100);
        }, { passive: true });
        
        // REMOVED: Aggressive wheel event listener
        // Normal scrolling now works smoothly without hijacking
        // Glitch transitions only triggered by intentional navigation:
        // - Clicking navigation dots
        // - Clicking scroll down arrow
        // - Keyboard shortcuts (PageDown, Space, etc.)
    }
    
    setupClickListeners() {
        // Handle navigation dots clicks
        document.addEventListener('click', (e) => {
            const dot = e.target.closest('.nav-dot');
            if (dot) {
                const index = parseInt(dot.dataset.section);
                this.navigateToSection(index);
            }
        });
    }
    
    setupKeyboardNav() {
        document.addEventListener('keydown', (e) => {
            // Don't interfere if user is typing
            if (e.target.tagName === 'INPUT' || 
                e.target.tagName === 'TEXTAREA' || 
                e.target.isContentEditable) {
                return;
            }
            
            switch(e.key) {
                case 'PageDown':
                case ' ': // Space
                    e.preventDefault();
                    this.navigateToSection(this.currentSection + 1);
                    break;
                case 'PageUp':
                    e.preventDefault();
                    this.navigateToSection(this.currentSection - 1);
                    break;
                case 'ArrowDown':
                    if (e.ctrlKey) {
                        e.preventDefault();
                        this.navigateToSection(this.currentSection + 1);
                    }
                    break;
                case 'ArrowUp':
                    if (e.ctrlKey) {
                        e.preventDefault();
                        this.navigateToSection(this.currentSection - 1);
                    }
                    break;
                case 'Home':
                    if (e.ctrlKey) {
                        e.preventDefault();
                        this.navigateToSection(0);
                    }
                    break;
                case 'End':
                    if (e.ctrlKey) {
                        e.preventDefault();
                        this.navigateToSection(this.sections.length - 1);
                    }
                    break;
            }
        });
    }
    
    setupTouchGestures() {
        document.addEventListener('touchstart', (e) => {
            this.touchStartY = e.touches[0].clientY;
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            this.touchEndY = e.changedTouches[0].clientY;
            this.handleSwipe();
        }, { passive: true });
    }
    
    handleSwipe() {
        const swipeDistance = this.touchStartY - this.touchEndY;
        
        if (Math.abs(swipeDistance) > this.minSwipeDistance) {
            if (swipeDistance > 0) {
                // Swipe up - go to next section
                this.navigateToSection(this.currentSection + 1);
            } else {
                // Swipe down - go to previous section
                this.navigateToSection(this.currentSection - 1);
            }
        }
    }
    
    navigateToSection(targetIndex) {
        // Boundary checks
        if (targetIndex < 0 || targetIndex >= this.sections.length) {
            return;
        }
        
        if (this.isAnimating || targetIndex === this.currentSection) {
            return;
        }
        
        const toSection = this.sections[targetIndex];
        
        if (this.prefersReducedMotion) {
            // Simple scroll without glitch effect for reduced motion
            toSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            this.currentSection = targetIndex;
            this.updateNavigationDots();
            this.updateScrollArrow();
            this.announceSection(toSection);
            return;
        }
        
        // Glitch effect only when explicitly triggered (arrow/dots/keyboard)
        const fromSection = this.sections[this.currentSection];
        this.glitchTransition(fromSection, toSection, targetIndex);
    }
    
    glitchTransition(fromSection, toSection, targetIndex) {
        this.isAnimating = true;
        
        // Mark sections as transitioning
        fromSection.classList.add('glitch-transitioning');
        toSection.classList.add('glitch-transitioning');
        
        // Phase 1: Glitch out current section
        this.glitchOut(fromSection);
        
        // Phase 2: Glitch in new section with smooth scroll
        setTimeout(() => {
            this.glitchIn(toSection);
            this.currentSection = targetIndex;
            this.updateNavigationDots();
            this.updateScrollArrow();
            this.announceSection(toSection);
            
            // Smooth scroll to new section for better UX
            toSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
        
        // Cleanup - reduced from longer blocking time (was 600ms+)
        setTimeout(() => {
            fromSection.classList.remove('glitch-out', 'glitch-transitioning');
            toSection.classList.remove('glitch-in', 'glitch-transitioning');
            this.isAnimating = false;
        }, 900); // Reduced animation blocking time for better responsiveness
    }
    
    glitchOut(section) {
        section.classList.add('glitch-out');
        this.createDisplacementBars(section);
        this.addScanLines(section);
    }
    
    glitchIn(section) {
        section.classList.add('glitch-in');
        this.createStaticNoise(section);
        
        setTimeout(() => {
            this.neonFlash(section);
        }, 200);
    }
    
    createDisplacementBars(section) {
        const barCount = 3 + Math.floor(Math.random() * 3);
        
        for (let i = 0; i < barCount; i++) {
            const bar = document.createElement('div');
            bar.className = 'glitch-bar';
            bar.style.top = `${Math.random() * 100}%`;
            bar.style.height = `${10 + Math.random() * 20}px`;
            bar.style.animationDelay = `${i * 0.05}s`;
            
            section.style.position = 'relative';
            section.appendChild(bar);
            
            setTimeout(() => {
                if (bar.parentNode === section) {
                    bar.remove();
                }
            }, 400);
        }
    }
    
    addScanLines(section) {
        const scanLines = document.createElement('div');
        scanLines.className = 'scan-lines';
        
        section.style.position = 'relative';
        section.appendChild(scanLines);
        
        setTimeout(() => {
            if (scanLines.parentNode === section) {
                scanLines.remove();
            }
        }, 300);
    }
    
    createStaticNoise(section) {
        const noise = document.createElement('div');
        noise.className = 'static-noise';
        
        section.style.position = 'relative';
        section.appendChild(noise);
        
        setTimeout(() => {
            if (noise.parentNode === section) {
                noise.remove();
            }
        }, 100);
    }
    
    neonFlash(section) {
        section.style.boxShadow = '0 0 30px rgba(0, 243, 255, 0.5), inset 0 0 20px rgba(0, 243, 255, 0.2)';
        
        setTimeout(() => {
            section.style.boxShadow = '';
        }, 200);
    }
    
    createNavigationDots() {
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'nav-dots';
        dotsContainer.setAttribute('role', 'navigation');
        dotsContainer.setAttribute('aria-label', 'Section navigation');
        
        this.sections.forEach((section, index) => {
            const dot = document.createElement('button');
            dot.className = 'nav-dot';
            dot.dataset.section = index;
            dot.setAttribute('aria-label', `Navigate to ${section.id || 'section ' + (index + 1)}`);
            dot.setAttribute('data-tooltip', this.getSectionName(section));
            dot.setAttribute('tabindex', '0');
            
            // Keyboard support for dots
            dot.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.navigateToSection(index);
                }
            });
            
            dotsContainer.appendChild(dot);
        });
        
        document.body.appendChild(dotsContainer);
    }
    
    getSectionName(section) {
        if (section.id) {
            return section.id.charAt(0).toUpperCase() + section.id.slice(1);
        }
        const heading = section.querySelector('h1, h2');
        if (heading) {
            return heading.textContent.trim();
        }
        return 'Section';
    }
    
    updateNavigationDots() {
        const dots = document.querySelectorAll('.nav-dot');
        dots.forEach((dot, index) => {
            if (index === this.currentSection) {
                dot.classList.add('active');
                dot.setAttribute('aria-current', 'true');
            } else {
                dot.classList.remove('active');
                dot.removeAttribute('aria-current');
            }
        });
    }
    
    createScrollDownArrow() {
        const arrow = document.createElement('div');
        arrow.className = 'scroll-down-arrow';
        arrow.innerHTML = `
            <div class="arrow-container" role="button" tabindex="0" aria-label="Scroll to next section">
                <div class="arrow-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                    </svg>
                </div>
                <span class="arrow-text">Scroll</span>
            </div>
        `;
        
        const arrowContainer = arrow.querySelector('.arrow-container');
        
        // Click handler
        arrowContainer.addEventListener('click', () => {
            if (this.currentSection < this.sections.length - 1) {
                this.navigateToSection(this.currentSection + 1);
            } else {
                this.navigateToSection(0);
            }
        });
        
        // Keyboard support
        arrowContainer.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                arrowContainer.click();
            }
        });
        
        document.body.appendChild(arrow);
        this.scrollArrow = arrow;
    }
    
    updateScrollArrow() {
        if (!this.scrollArrow) return;
        
        const arrowText = this.scrollArrow.querySelector('.arrow-text');
        
        if (this.currentSection === this.sections.length - 1) {
            this.scrollArrow.classList.add('at-bottom');
            arrowText.textContent = 'Back to Top';
        } else {
            this.scrollArrow.classList.remove('at-bottom');
            arrowText.textContent = 'Scroll';
        }
        
        // Hide arrow during animation
        if (this.isAnimating) {
            this.scrollArrow.classList.add('hidden');
        } else {
            this.scrollArrow.classList.remove('hidden');
        }
    }
    
    handleHashChange() {
        const hash = window.location.hash;
        if (!hash) return;
        
        const targetSection = document.querySelector(hash);
        if (!targetSection) return;
        
        const targetIndex = Array.from(this.sections).indexOf(targetSection);
        if (targetIndex !== -1 && targetIndex !== this.currentSection) {
            this.navigateToSection(targetIndex);
        }
    }
    
    announceSection(section) {
        // Create or update live region for screen readers
        let liveRegion = document.getElementById('section-announcer');
        
        if (!liveRegion) {
            liveRegion = document.createElement('div');
            liveRegion.id = 'section-announcer';
            liveRegion.className = 'sr-only';
            liveRegion.setAttribute('role', 'status');
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            document.body.appendChild(liveRegion);
        }
        
        const sectionName = this.getSectionName(section);
        liveRegion.textContent = `Navigated to ${sectionName} section`;
        
        // Move focus to section heading for keyboard users
        const heading = section.querySelector('h1, h2, h3');
        if (heading) {
            heading.setAttribute('tabindex', '-1');
            heading.focus();
            
            // Remove tabindex after focus to avoid tab order issues
            setTimeout(() => {
                heading.removeAttribute('tabindex');
            }, 1000);
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.glitchScroll = new GlitchScroll();
    });
} else {
    window.glitchScroll = new GlitchScroll();
}

// Add screen reader only class to styles if not present
if (!document.querySelector('style[data-sr-only]')) {
    const srStyle = document.createElement('style');
    srStyle.setAttribute('data-sr-only', 'true');
    srStyle.textContent = `
        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border-width: 0;
        }
    `;
    document.head.appendChild(srStyle);
}
