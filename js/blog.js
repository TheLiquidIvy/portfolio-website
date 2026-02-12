// ==================== BLOG/DEVLOG FUNCTIONALITY ====================

class BlogManager {
    constructor() {
        this.searchInput = document.getElementById('blog-search-input');
        this.searchClear = document.getElementById('search-clear');
        this.filterButtons = document.querySelectorAll('.blog-filters .filter-btn');
        this.blogCards = document.querySelectorAll('.blog-card');
        this.noResults = document.getElementById('no-results');
        this.currentFilter = 'all';
        this.searchTerm = '';
        
        this.init();
    }

    init() {
        if (!this.searchInput) return;

        // Search functionality
        this.searchInput.addEventListener('input', this.debounce(() => {
            this.searchTerm = this.searchInput.value.toLowerCase();
            this.updateSearchClear();
            this.filterPosts();
        }, 300));

        // Clear search
        this.searchClear.addEventListener('click', () => {
            this.searchInput.value = '';
            this.searchTerm = '';
            this.updateSearchClear();
            this.filterPosts();
        });

        // Filter buttons
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.setActiveFilter(btn);
                this.currentFilter = btn.dataset.filter;
                this.filterPosts();
            });
        });

        // Keyboard navigation
        this.setupKeyboardNavigation();
    }

    updateSearchClear() {
        if (this.searchTerm.length > 0) {
            this.searchClear.classList.add('active');
        } else {
            this.searchClear.classList.remove('active');
        }
    }

    setActiveFilter(activeBtn) {
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }

    filterPosts() {
        let visibleCount = 0;

        this.blogCards.forEach(card => {
            const category = card.dataset.category;
            const title = card.dataset.title.toLowerCase();
            const tags = card.dataset.tags.toLowerCase();
            const excerpt = card.querySelector('.blog-excerpt').textContent.toLowerCase();

            // Check category filter
            const categoryMatch = this.currentFilter === 'all' || category === this.currentFilter;

            // Check search term
            const searchMatch = this.searchTerm === '' ||
                title.includes(this.searchTerm) ||
                tags.includes(this.searchTerm) ||
                excerpt.includes(this.searchTerm);

            // Show or hide card
            if (categoryMatch && searchMatch) {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });

        // Show/hide no results message
        if (visibleCount === 0) {
            this.noResults.style.display = 'block';
        } else {
            this.noResults.style.display = 'none';
        }

        // Update filter counts
        this.updateFilterCounts();
    }

    updateFilterCounts() {
        // Count posts for each category
        const counts = {
            'all': 0,
            'web-development': 0,
            'frontend': 0,
            'backend': 0,
            'career': 0
        };

        this.blogCards.forEach(card => {
            const category = card.dataset.category;
            const title = card.dataset.title.toLowerCase();
            const tags = card.dataset.tags.toLowerCase();
            const excerpt = card.querySelector('.blog-excerpt').textContent.toLowerCase();

            // Check if card matches search
            const searchMatch = this.searchTerm === '' ||
                title.includes(this.searchTerm) ||
                tags.includes(this.searchTerm) ||
                excerpt.includes(this.searchTerm);

            if (searchMatch) {
                counts['all']++;
                counts[category]++;
            }
        });

        // Update count displays
        this.filterButtons.forEach(btn => {
            const filter = btn.dataset.filter;
            const countSpan = btn.querySelector('.filter-count');
            if (countSpan && counts[filter] !== undefined) {
                countSpan.textContent = counts[filter];
            }
        });
    }

    setupKeyboardNavigation() {
        // Allow Enter key to trigger filter buttons
        this.filterButtons.forEach(btn => {
            btn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    btn.click();
                }
            });
        });

        // Allow Escape key to clear search
        this.searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.searchClear.click();
            }
        });
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize blog manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new BlogManager();
});
