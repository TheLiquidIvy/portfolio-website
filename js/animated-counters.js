// ==================== ANIMATED NUMBER COUNTERS ====================

class AnimatedCounters {
    constructor() {
        this.counters = [];
        this.isAnimating = false;
        this.animationDuration = 2000; // 2 seconds
        this.init();
    }

    init() {
        // Find all stat cards with data-target attributes
        document.querySelectorAll('.stat-number[data-target], .stat-number[id]').forEach(element => {
            const target = parseInt(element.getAttribute('data-target') || element.dataset.target) || this.extractTargetFromId(element.id);
            
            if (target) {
                this.counters.push({
                    element: element,
                    target: target,
                    current: 0,
                    duration: this.animationDuration,
                    startTime: null
                });
            }
        });

        // Set up Intersection Observer to trigger animation when visible
        this.setupIntersectionObserver();
    }

    extractTargetFromId(id) {
        // Map ID to target values
        const targetMap = {
            'projectsCount': 50,
            'blogPostsCount': 12,
            'coffeeCount': 1000,
            'githubStarsCount': 250
        };
        return targetMap[id] || 0;
    }

    setupIntersectionObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isAnimating) {
                    this.isAnimating = true;
                    this.animateAllCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe the first counter or stats section
        const statsSection = document.getElementById('stats') || document.querySelector('.about-stats');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }

    animateAllCounters() {
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / this.animationDuration, 1);

            // Easing function (easeOutQuad)
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            this.counters.forEach(counter => {
                const newValue = Math.floor(counter.target * easeProgress);
                counter.element.textContent = this.formatNumber(newValue);

                // Add visual feedback
                if (progress < 0.5) {
                    counter.element.style.transform = `scale(${1 + (progress * 0.1)})`;
                } else {
                    counter.element.style.transform = `scale(${1 + ((1 - progress) * 0.1)})`;
                }
            });

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Final update with proper formatting
                this.counters.forEach(counter => {
                    counter.element.textContent = this.formatNumber(counter.target);
                    counter.element.style.transform = 'scale(1)';
                });
                this.isAnimating = false;
            }
        };

        requestAnimationFrame(animate);
    }

    formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'K+';
        }
        return num + '+';
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new AnimatedCounters();
});
