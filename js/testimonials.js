// ==================== TESTIMONIALS CAROUSEL ====================

class TestimonialsCarousel {
    constructor() {
        this.carousel = document.querySelector('.testimonials-carousel');
        this.slides = document.querySelectorAll('.testimonial-slide');
        this.prevBtn = document.querySelector('.carousel-arrow.prev');
        this.nextBtn = document.querySelector('.carousel-arrow.next');
        this.dots = document.querySelectorAll('.pagination-dot');
        this.progressBar = document.querySelector('.progress-bar');
        
        this.currentIndex = 0;
        this.autoRotateInterval = null;
        this.progressInterval = null;
        this.autoRotateDelay = 6000; // 6 seconds
        this.isPaused = false;
        
        this.init();
    }

    init() {
        if (!this.carousel) return;

        // Navigation buttons
        this.prevBtn.addEventListener('click', () => this.goToPrevSlide());
        this.nextBtn.addEventListener('click', () => this.goToNextSlide());

        // Pagination dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.isInViewport()) return;
            
            if (e.key === 'ArrowLeft') {
                this.goToPrevSlide();
            } else if (e.key === 'ArrowRight') {
                this.goToNextSlide();
            }
        });

        // Touch/swipe support
        this.setupTouchSupport();

        // Pause on hover
        this.carousel.addEventListener('mouseenter', () => this.pause());
        this.carousel.addEventListener('mouseleave', () => this.resume());

        // Start auto-rotation
        this.startAutoRotate();

        // Pause when not visible
        this.setupVisibilityObserver();
    }

    goToSlide(index) {
        // Remove active class from current slide
        this.slides[this.currentIndex].classList.remove('active');
        this.dots[this.currentIndex].classList.remove('active');

        // Update index
        this.currentIndex = index;

        // Add active class to new slide
        this.slides[this.currentIndex].classList.add('active');
        this.dots[this.currentIndex].classList.add('active');

        // Reset progress
        this.resetProgress();
    }

    goToNextSlide() {
        const nextIndex = (this.currentIndex + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }

    goToPrevSlide() {
        const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }

    startAutoRotate() {
        this.stopAutoRotate(); // Clear any existing intervals
        
        this.autoRotateInterval = setInterval(() => {
            if (!this.isPaused) {
                this.goToNextSlide();
            }
        }, this.autoRotateDelay);

        this.startProgress();
    }

    stopAutoRotate() {
        if (this.autoRotateInterval) {
            clearInterval(this.autoRotateInterval);
            this.autoRotateInterval = null;
        }
        this.stopProgress();
    }

    startProgress() {
        this.stopProgress();
        
        let progress = 0;
        const increment = 100 / (this.autoRotateDelay / 100);
        
        this.progressInterval = setInterval(() => {
            if (!this.isPaused) {
                progress += increment;
                if (progress >= 100) {
                    progress = 0;
                }
                this.progressBar.style.width = progress + '%';
            }
        }, 100);
    }

    stopProgress() {
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
            this.progressInterval = null;
        }
    }

    resetProgress() {
        this.progressBar.style.width = '0%';
        this.startProgress();
    }

    pause() {
        this.isPaused = true;
    }

    resume() {
        this.isPaused = false;
    }

    setupTouchSupport() {
        let startX = 0;
        let endX = 0;

        this.carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        this.carousel.addEventListener('touchmove', (e) => {
            endX = e.touches[0].clientX;
        });

        this.carousel.addEventListener('touchend', () => {
            const diff = startX - endX;
            const threshold = 50; // Minimum swipe distance

            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    // Swipe left - next slide
                    this.goToNextSlide();
                } else {
                    // Swipe right - previous slide
                    this.goToPrevSlide();
                }
            }
        });
    }

    setupVisibilityObserver() {
        const options = {
            root: null,
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    this.pause();
                } else {
                    this.resume();
                }
            });
        }, options);

        observer.observe(this.carousel);
    }

    isInViewport() {
        const rect = this.carousel.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
}

// Initialize testimonials carousel when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TestimonialsCarousel();
});
