// ==================== PARALLAX SCROLLING EFFECTS ====================

class ParallaxEffects {
    constructor() {
        this.parallaxElements = [];
        this.scrollY = 0;
        this.init();
    }

    init() {
        this.setupParallax();
        this.setupScrollListener();
        this.addParallaxStyles();
    }

    setupParallax() {
        // Add parallax to hero section
        const heroVisual = document.querySelector('.hero-visual');
        if (heroVisual) {
            this.parallaxElements.push({
                element: heroVisual,
                speed: 0.5,
                type: 'background'
            });
            heroVisual.classList.add('parallax-element');
        }

        // Add parallax to project cards
        document.querySelectorAll('.project-card').forEach((card, index) => {
            card.classList.add('parallax-element');
            this.parallaxElements.push({
                element: card,
                speed: 0.3 + (index % 3) * 0.1,
                type: 'transform'
            });
        });

        // Add parallax to section backgrounds
        document.querySelectorAll('section').forEach(section => {
            if (!section.classList.contains('hero')) {
                this.parallaxElements.push({
                    element: section,
                    speed: 0.2,
                    type: 'background'
                });
            }
        });
    }

    setupScrollListener() {
        window.addEventListener('scroll', () => {
            this.scrollY = window.pageYOffset;
            this.updateParallax();
        }, { passive: true });
    }

    updateParallax() {
        this.parallaxElements.forEach(item => {
            const rect = item.element.getBoundingClientRect();
            const elementY = rect.top + this.scrollY;
            const distance = this.scrollY - elementY;
            const offset = distance * item.speed;

            if (item.type === 'transform') {
                item.element.style.transform = `translateY(${offset}px)`;
            } else if (item.type === 'background') {
                item.element.style.backgroundPosition = `0 ${offset * 0.5}px`;
            }
        });
    }

    addParallaxStyles() {
        if (document.getElementById('parallax-styles')) return;

        const style = document.createElement('style');
        style.id = 'parallax-styles';
        style.textContent = `
            .parallax-element {
                will-change: transform;
                transform-gpu: translate3d(0, 0, 0);
            }

            .hero-visual {
                background-attachment: fixed;
                background-size: cover;
                background-position: center;
                transition: background-position 0.1s ease-out;
            }

            section {
                background-attachment: fixed;
            }

            .project-card {
                transition: transform 0.1s ease-out;
            }

            @media (prefers-reduced-motion: reduce) {
                .parallax-element {
                    will-change: auto;
                    transform: none !important;
                }
            }

            @media (max-width: 768px) {
                .parallax-element {
                    transform: none !important;
                }
            }
        `;

        document.head.appendChild(style);
    }
}

// Initialize parallax
document.addEventListener('DOMContentLoaded', () => {
    new ParallaxEffects();
});
