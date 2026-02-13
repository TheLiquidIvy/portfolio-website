// ==================== PROJECT CAROUSEL/SLIDER ====================

class ProjectCarousel {
    constructor() {
        this.carousel = null;
        this.slides = [];
        this.currentIndex = 0;
        this.autoplayInterval = null;
        this.init();
    }

    init() {
        // Check if carousel element exists
        this.carousel = document.querySelector('.projects-grid');
        if (!this.carousel) return;

        // Convert grid to carousel
        this.setupCarousel();
        this.setupControls();
        this.setupKeyboardNav();
        this.setupTouchGestures();
        this.startAutoplay();
        this.addCarouselStyles();
    }

    setupCarousel() {
        const cards = Array.from(this.carousel.querySelectorAll('.project-card'));
        if (cards.length === 0) return;

        this.slides = cards;

        // Wrap carousel
        this.carousel.classList.add('carousel-enabled');
        
        // Create carousel container
        const carouselContainer = document.createElement('div');
        carouselContainer.className = 'carousel-container';
        
        // Create slides wrapper
        const slidesWrapper = document.createElement('div');
        slidesWrapper.className = 'carousel-slides';
        
        // Move cards into wrapper
        cards.forEach((card, index) => {
            card.classList.add('carousel-slide');
            card.style.opacity = index === 0 ? '1' : '0';
            slidesWrapper.appendChild(card);
        });

        carouselContainer.appendChild(slidesWrapper);
        this.carousel.innerHTML = '';
        this.carousel.appendChild(carouselContainer);

        // Create navigation
        const nav = document.createElement('div');
        nav.className = 'carousel-nav';
        nav.innerHTML = `
            <button class="carousel-btn prev" aria-label="Previous project">←</button>
            <div class="carousel-indicators"></div>
            <button class="carousel-btn next" aria-label="Next project">→</button>
        `;
        carouselContainer.appendChild(nav);

        // Create indicators
        const indicators = nav.querySelector('.carousel-indicators');
        cards.forEach((_, index) => {
            const indicator = document.createElement('span');
            indicator.className = `carousel-indicator ${index === 0 ? 'active' : ''}`;
            indicator.dataset.index = index;
            indicator.addEventListener('click', () => this.goToSlide(index));
            indicators.appendChild(indicator);
        });

        // Add event listeners
        nav.querySelector('.prev').addEventListener('click', () => this.prevSlide());
        nav.querySelector('.next').addEventListener('click', () => this.nextSlide());
    }

    setupControls() {
        const prevBtn = this.carousel.querySelector('.carousel-btn.prev');
        const nextBtn = this.carousel.querySelector('.carousel-btn.next');
        
        if (prevBtn) prevBtn.addEventListener('click', () => this.prevSlide());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextSlide());

        // Pause autoplay on hover
        this.carousel.addEventListener('mouseenter', () => this.pauseAutoplay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoplay());
    }

    setupKeyboardNav() {
        document.addEventListener('keydown', (e) => {
            if (this.carousel.querySelector('.carousel-slides:hover')) {
                if (e.key === 'ArrowLeft') this.prevSlide();
                if (e.key === 'ArrowRight') this.nextSlide();
            }
        });
    }

    setupTouchGestures() {
        let touchStart = 0;
        let touchEnd = 0;

        this.carousel.addEventListener('touchstart', (e) => {
            touchStart = e.changedTouches[0].clientX;
            this.pauseAutoplay();
        });

        this.carousel.addEventListener('touchend', (e) => {
            touchEnd = e.changedTouches[0].clientX;
            if (touchStart - touchEnd > 50) this.nextSlide();
            if (touchEnd - touchStart > 50) this.prevSlide();
            this.startAutoplay();
        });
    }

    nextSlide() {
        this.goToSlide((this.currentIndex + 1) % this.slides.length);
    }

    prevSlide() {
        this.goToSlide((this.currentIndex - 1 + this.slides.length) % this.slides.length);
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }

    updateCarousel() {
        this.slides.forEach((slide, index) => {
            slide.style.opacity = index === this.currentIndex ? '1' : '0';
            slide.style.transform = index === this.currentIndex ? 'scale(1)' : 'scale(0.95)';
            slide.style.pointerEvents = index === this.currentIndex ? 'auto' : 'none';
        });

        // Update indicators
        document.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
    }

    startAutoplay() {
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    pauseAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
        }
    }

    addCarouselStyles() {
        if (document.getElementById('carousel-styles')) return;

        const style = document.createElement('style');
        style.id = 'carousel-styles';
        style.textContent = `
            .projects-grid.carousel-enabled {
                display: block;
                max-width: 900px;
                margin: 0 auto;
            }

            .carousel-container {
                position: relative;
                overflow: hidden;
                border-radius: 15px;
            }

            .carousel-slides {
                position: relative;
                width: 100%;
                aspect-ratio: 16 / 10;
            }

            .carousel-slide {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                opacity: 0;
                transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                transform: scale(0.95);
            }

            .carousel-slide.active {
                opacity: 1;
                transform: scale(1);
                z-index: 10;
            }

            .carousel-nav {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 20px;
                background: rgba(0, 0, 0, 0.3);
                gap: 20px;
            }

            .carousel-btn {
                background: rgba(0, 255, 255, 0.1);
                border: 2px solid var(--primary);
                color: var(--primary);
                padding: 10px 15px;
                cursor: pointer;
                border-radius: 8px;
                font-size: 1.2rem;
                font-weight: bold;
                transition: all 0.3s ease;
            }

            .carousel-btn:hover {
                background: var(--primary);
                color: var(--bg-dark);
                box-shadow: 0 0 15px var(--primary);
                transform: scale(1.1);
            }

            .carousel-indicators {
                display: flex;
                gap: 10px;
                flex: 1;
                justify-content: center;
            }

            .carousel-indicator {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: rgba(0, 255, 255, 0.3);
                cursor: pointer;
                transition: all 0.3s ease;
                border: 2px solid transparent;
            }

            .carousel-indicator:hover {
                background: rgba(0, 255, 255, 0.6);
            }

            .carousel-indicator.active {
                background: var(--primary);
                box-shadow: 0 0 10px var(--primary);
                transform: scale(1.3);
            }

            @media (max-width: 768px) {
                .carousel-slides {
                    aspect-ratio: 4 / 5;
                }

                .carousel-btn {
                    padding: 8px 12px;
                    font-size: 1rem;
                }
            }
        `;

        document.head.appendChild(style);
    }
}

// Initialize carousel
document.addEventListener('DOMContentLoaded', () => {
    new ProjectCarousel();
});
