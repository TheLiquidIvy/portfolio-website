// ==================== TIMELINE/JOURNEY ANIMATIONS ====================

class TimelineAnimations {
    constructor() {
        this.timeline = document.querySelector('.timeline');
        this.timelineItems = document.querySelectorAll('.timeline-item');
        this.init();
    }

    init() {
        if (!this.timeline) return;

        // Set up Intersection Observer for scroll animations
        this.setupScrollAnimations();
    }

    setupScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                }
            });
        }, observerOptions);

        this.timelineItems.forEach(item => {
            observer.observe(item);
        });
    }
}

// Initialize timeline animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TimelineAnimations();
});
