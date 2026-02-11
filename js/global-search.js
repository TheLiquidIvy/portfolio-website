// ==================== GLOBAL SEARCH FUNCTIONALITY ====================

class GlobalSearch {
    constructor() {
        this.isOpen = false;
        this.selectedIndex = 0;
        this.searchResults = [];
        this.searchData = null;
        
        this.init();
    }

    init() {
        // Create search overlay
        this.createSearchOverlay();
        
        // Bind keyboard shortcuts
        this.bindKeyboardShortcuts();
        
        // Load search data
        this.loadSearchData();
    }

    createSearchOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'search-overlay';
        overlay.id = 'globalSearchOverlay';
        overlay.innerHTML = `
            <div class="search-container">
                <div class="search-box">
                    <div class="search-input-wrapper">
                        <span class="search-icon">🔍</span>
                        <input 
                            type="text" 
                            class="search-input" 
                            id="globalSearchInput"
                            placeholder="Search projects, blog posts, skills..."
                            autocomplete="off"
                            spellcheck="false"
                        >
                        <span class="search-shortcut">ESC</span>
                        <button class="search-close" id="searchCloseBtn">Close</button>
                    </div>
                </div>
                <div class="search-results" id="searchResults">
                    <div class="search-tips">
                        <div class="search-tips-title">Search Tips:</div>
                        <ul class="search-tips-list">
                            <li><kbd>/</kbd> or <kbd>⌘K</kbd> Open search</li>
                            <li><kbd>↑</kbd> <kbd>↓</kbd> Navigate results</li>
                            <li><kbd>↵</kbd> Open selected result</li>
                            <li><kbd>ESC</kbd> Close search</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Event listeners
        const input = document.getElementById('globalSearchInput');
        const closeBtn = document.getElementById('searchCloseBtn');
        
        input.addEventListener('input', (e) => this.handleSearch(e.target.value));
        input.addEventListener('keydown', (e) => this.handleKeyNavigation(e));
        closeBtn.addEventListener('click', () => this.close());
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.close();
            }
        });
    }

    bindKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Open search with / or Cmd+K or Ctrl+K
            if ((e.key === '/' && !this.isInputFocused()) ||
                ((e.metaKey || e.ctrlKey) && e.key === 'k')) {
                e.preventDefault();
                this.open();
            }
            
            // Close with ESC
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }

    isInputFocused() {
        const activeElement = document.activeElement;
        return activeElement && (
            activeElement.tagName === 'INPUT' ||
            activeElement.tagName === 'TEXTAREA' ||
            activeElement.isContentEditable
        );
    }

    async loadSearchData() {
        // Build searchable data from page content
        this.searchData = {
            projects: this.extractProjects(),
            blog: this.extractBlogPosts(),
            skills: this.extractSkills(),
            sections: this.extractSections()
        };
    }

    extractProjects() {
        const projects = [];
        const projectCards = document.querySelectorAll('.project-card, .project-item');
        
        projectCards.forEach((card, index) => {
            const title = card.querySelector('h3, .project-title')?.textContent || '';
            const description = card.querySelector('p, .project-description')?.textContent || '';
            const tags = Array.from(card.querySelectorAll('.tech-tag, .project-tag')).map(tag => tag.textContent);
            const link = card.querySelector('a')?.href || `#projects`;
            
            if (title) {
                projects.push({
                    type: 'project',
                    title: title.trim(),
                    description: description.trim(),
                    tags: tags,
                    link: link,
                    icon: '🚀'
                });
            }
        });
        
        return projects;
    }

    extractBlogPosts() {
        const posts = [];
        const blogItems = document.querySelectorAll('.blog-card, .blog-item');
        
        blogItems.forEach((item) => {
            const title = item.querySelector('h3, .blog-title')?.textContent || '';
            const description = item.querySelector('p, .blog-excerpt')?.textContent || '';
            const link = item.querySelector('a')?.href || '#blog';
            
            if (title) {
                posts.push({
                    type: 'blog',
                    title: title.trim(),
                    description: description.trim(),
                    link: link,
                    icon: '📝'
                });
            }
        });
        
        return posts;
    }

    extractSkills() {
        const skills = [];
        const skillItems = document.querySelectorAll('.skill-item, .skill-bar');
        
        skillItems.forEach((item) => {
            const name = item.querySelector('.skill-name, h4')?.textContent || item.textContent;
            const percentage = item.querySelector('.skill-percentage, [data-percentage]')?.textContent || '';
            
            if (name) {
                skills.push({
                    type: 'skill',
                    title: name.trim(),
                    description: `Proficiency: ${percentage}`,
                    link: '#skills',
                    icon: '💡'
                });
            }
        });
        
        return skills;
    }

    extractSections() {
        const sections = [];
        const sectionElements = document.querySelectorAll('section[id]');
        
        sectionElements.forEach((section) => {
            const id = section.id;
            const title = section.querySelector('h2, .section-title')?.textContent || id;
            const description = section.querySelector('.section-subtitle, p')?.textContent || '';
            
            sections.push({
                type: 'section',
                title: title.trim(),
                description: description.trim().substring(0, 100),
                link: `#${id}`,
                icon: '📍'
            });
        });
        
        return sections;
    }

    handleSearch(query) {
        if (!query || query.length < 2) {
            this.showDefaultResults();
            return;
        }

        // Perform fuzzy search
        const results = this.fuzzySearch(query);
        
        // Group results by type
        const groupedResults = this.groupResults(results);
        
        // Display results
        this.displayResults(groupedResults, query);
        
        // Reset selection
        this.selectedIndex = 0;
    }

    fuzzySearch(query) {
        const lowerQuery = query.toLowerCase();
        const results = [];
        
        // Search all data types
        Object.values(this.searchData).forEach(items => {
            items.forEach(item => {
                const score = this.calculateMatchScore(item, lowerQuery);
                if (score > 0) {
                    results.push({ ...item, score });
                }
            });
        });
        
        // Sort by score (highest first)
        results.sort((a, b) => b.score - a.score);
        
        // Return top 20 results
        return results.slice(0, 20);
    }

    calculateMatchScore(item, query) {
        // NOTE: This fuzzy search algorithm could benefit from unit tests
        // to verify search accuracy, score calculation correctness,
        // and edge cases like empty queries or special characters
        let score = 0;
        const title = item.title.toLowerCase();
        const description = item.description.toLowerCase();
        const tags = item.tags ? item.tags.join(' ').toLowerCase() : '';
        
        // Exact match in title (highest score)
        if (title === query) {
            score += 100;
        }
        // Title starts with query
        else if (title.startsWith(query)) {
            score += 50;
        }
        // Title includes query
        else if (title.includes(query)) {
            score += 30;
        }
        // Fuzzy match in title
        else if (this.fuzzyMatch(title, query)) {
            score += 20;
        }
        
        // Description includes query
        if (description.includes(query)) {
            score += 15;
        }
        
        // Tags include query
        if (tags.includes(query)) {
            score += 25;
        }
        
        // Word boundary matches get bonus
        const words = query.split(' ');
        words.forEach(word => {
            if (word.length > 2 && title.includes(word)) {
                score += 5;
            }
        });
        
        return score;
    }

    fuzzyMatch(text, query) {
        let textIndex = 0;
        let queryIndex = 0;
        
        while (textIndex < text.length && queryIndex < query.length) {
            if (text[textIndex] === query[queryIndex]) {
                queryIndex++;
            }
            textIndex++;
        }
        
        return queryIndex === query.length;
    }

    groupResults(results) {
        const grouped = {
            projects: [],
            blog: [],
            skills: [],
            sections: []
        };
        
        results.forEach(result => {
            if (grouped[result.type]) {
                grouped[result.type].push(result);
            }
        });
        
        return grouped;
    }

    displayResults(groupedResults, query) {
        const container = document.getElementById('searchResults');
        
        // Count total results
        const totalResults = Object.values(groupedResults).reduce((sum, arr) => sum + arr.length, 0);
        
        if (totalResults === 0) {
            container.innerHTML = `
                <div class="search-empty">
                    <div class="search-empty-icon">🔍</div>
                    <h3>No results found</h3>
                    <p>Try different keywords or check your spelling</p>
                </div>
            `;
            return;
        }
        
        let html = '';
        
        // Display each group
        const groupNames = {
            projects: 'Projects',
            blog: 'Blog Posts',
            skills: 'Skills',
            sections: 'Sections'
        };
        
        Object.entries(groupedResults).forEach(([type, items]) => {
            if (items.length > 0) {
                html += `
                    <div class="search-result-group">
                        <div class="search-group-title">
                            <span class="search-group-icon">${items[0].icon}</span>
                            <span>${groupNames[type]}</span>
                            <span class="search-group-count">${items.length}</span>
                        </div>
                        ${items.map((item, index) => this.renderResultItem(item, index, query)).join('')}
                    </div>
                `;
            }
        });
        
        container.innerHTML = html;
        
        // Store results for navigation
        this.searchResults = [];
        Object.values(groupedResults).forEach(items => {
            this.searchResults.push(...items);
        });
        
        // Add click handlers
        this.bindResultClickHandlers();
        
        // Highlight first result
        this.updateSelection();
    }

    renderResultItem(item, index, query) {
        const highlightedTitle = this.highlightMatch(item.title, query);
        const highlightedDesc = this.highlightMatch(item.description.substring(0, 150), query);
        
        return `
            <div class="search-result-item" data-index="${index}" data-link="${item.link}">
                <div class="search-result-header">
                    <span class="search-result-icon">${item.icon}</span>
                    <div class="search-result-title">${highlightedTitle}</div>
                    <span class="search-result-type">${item.type}</span>
                </div>
                ${item.description ? `<div class="search-result-description">${highlightedDesc}...</div>` : ''}
                ${item.tags && item.tags.length > 0 ? `
                    <div class="search-result-meta">
                        ${item.tags.slice(0, 3).map(tag => `<span class="search-result-tag">${tag}</span>`).join('')}
                    </div>
                ` : ''}
            </div>
        `;
    }

    highlightMatch(text, query) {
        if (!query) return text;
        
        const regex = new RegExp(`(${query.split(' ').join('|')})`, 'gi');
        return text.replace(regex, '<span class="search-highlight">$1</span>');
    }

    showDefaultResults() {
        const container = document.getElementById('searchResults');
        container.innerHTML = `
            <div class="search-tips">
                <div class="search-tips-title">Search Tips:</div>
                <ul class="search-tips-list">
                    <li><kbd>/</kbd> or <kbd>⌘K</kbd> Open search</li>
                    <li><kbd>↑</kbd> <kbd>↓</kbd> Navigate results</li>
                    <li><kbd>↵</kbd> Open selected result</li>
                    <li><kbd>ESC</kbd> Close search</li>
                </ul>
            </div>
        `;
        this.searchResults = [];
    }

    bindResultClickHandlers() {
        const items = document.querySelectorAll('.search-result-item');
        items.forEach((item, index) => {
            item.addEventListener('click', () => {
                const link = item.getAttribute('data-link');
                this.navigateTo(link);
            });
        });
    }

    handleKeyNavigation(e) {
        if (this.searchResults.length === 0) return;
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            this.selectedIndex = Math.min(this.selectedIndex + 1, this.searchResults.length - 1);
            this.updateSelection();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
            this.updateSelection();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (this.searchResults[this.selectedIndex]) {
                this.navigateTo(this.searchResults[this.selectedIndex].link);
            }
        }
    }

    updateSelection() {
        const items = document.querySelectorAll('.search-result-item');
        items.forEach((item, index) => {
            if (index === this.selectedIndex) {
                item.classList.add('selected');
                item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            } else {
                item.classList.remove('selected');
            }
        });
    }

    navigateTo(link) {
        this.close();
        
        // Small delay for smooth transition
        setTimeout(() => {
            if (link.startsWith('#')) {
                const element = document.querySelector(link);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                window.location.href = link;
            }
        }, 300);
    }

    open() {
        const overlay = document.getElementById('globalSearchOverlay');
        const input = document.getElementById('globalSearchInput');
        
        overlay.classList.add('active');
        this.isOpen = true;
        
        // Focus input
        setTimeout(() => {
            input.focus();
        }, 300);
        
        // Reload search data
        this.loadSearchData();
        
        console.log('[Search] Global search opened');
    }

    close() {
        const overlay = document.getElementById('globalSearchOverlay');
        const input = document.getElementById('globalSearchInput');
        
        overlay.classList.remove('active');
        this.isOpen = false;
        
        // Clear search
        input.value = '';
        this.showDefaultResults();
        this.selectedIndex = 0;
        
        console.log('[Search] Global search closed');
    }
}

// Initialize global search
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.globalSearch = new GlobalSearch();
    });
} else {
    window.globalSearch = new GlobalSearch();
}

console.log('[Search] Global search module loaded');
