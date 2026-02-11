// ==================== SOCIAL FEED ====================

class SocialFeed {
    constructor() {
        this.username = 'TheLiquidIvy';
        this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
        this.cache = {};
        this.init();
    }
    
    init() {
        this.createFeedSection();
        this.attachEventListeners();
        this.loadAllFeeds();
    }
    
    createFeedSection() {
        const contactSection = document.querySelector('#contact');
        if (!contactSection) return;
        
        const feedHTML = `
            <section id="social-feed" class="social-feed">
                <div class="container">
                    <div class="feed-header">
                        <h2 class="section-title glitch" data-text="CONNECT & FOLLOW">CONNECT & FOLLOW</h2>
                        <button class="refresh-btn" id="refreshFeeds" aria-label="Refresh feeds">
                            <span class="refresh-icon">🔄</span>
                            <span>Refresh</span>
                        </button>
                    </div>
                    
                    <div class="feed-grid">
                        <!-- GitHub Contribution Graph -->
                        <div class="feed-card github">
                            <div class="card-header">
                                <div class="card-title">
                                    <span class="platform-icon">🐙</span>
                                    <h3>GitHub Activity</h3>
                                </div>
                            </div>
                            <div class="card-content" id="githubActivity">
                                <div class="loading-skeleton">
                                    <div class="skeleton-line"></div>
                                    <div class="skeleton-line"></div>
                                    <div class="skeleton-line"></div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- GitHub Repositories -->
                        <div class="feed-card github">
                            <div class="card-header">
                                <div class="card-title">
                                    <span class="platform-icon">📦</span>
                                    <h3>Recent Repositories</h3>
                                </div>
                            </div>
                            <div class="card-content" id="githubRepos">
                                <div class="loading-skeleton">
                                    <div class="skeleton-line"></div>
                                    <div class="skeleton-line"></div>
                                    <div class="skeleton-line"></div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Dev.to Articles -->
                        <div class="feed-card devto">
                            <div class="card-header">
                                <div class="card-title">
                                    <span class="platform-icon">📝</span>
                                    <h3>Dev.to Articles</h3>
                                </div>
                            </div>
                            <div class="card-content" id="devtoArticles">
                                <div class="article-item">
                                    <h4 class="article-title">
                                        <a href="https://dev.to" target="_blank" rel="noopener noreferrer">
                                            Building Cyberpunk UI with CSS
                                        </a>
                                    </h4>
                                    <p class="article-excerpt">
                                        A deep dive into creating futuristic user interfaces with modern CSS techniques...
                                    </p>
                                    <div class="article-stats">
                                        <span class="stat-item">❤️ 124 reactions</span>
                                        <span class="stat-item">💬 18 comments</span>
                                        <span class="stat-item">📅 2 days ago</span>
                                    </div>
                                </div>
                                <div class="article-item">
                                    <h4 class="article-title">
                                        <a href="https://dev.to" target="_blank" rel="noopener noreferrer">
                                            Web Audio API: Creating Soundscapes
                                        </a>
                                    </h4>
                                    <p class="article-excerpt">
                                        Learn how to use the Web Audio API to create immersive audio experiences...
                                    </p>
                                    <div class="article-stats">
                                        <span class="stat-item">❤️ 89 reactions</span>
                                        <span class="stat-item">💬 12 comments</span>
                                        <span class="stat-item">📅 1 week ago</span>
                                    </div>
                                </div>
                                <div class="article-item">
                                    <h4 class="article-title">
                                        <a href="https://dev.to" target="_blank" rel="noopener noreferrer">
                                            Performance Optimization Tips
                                        </a>
                                    </h4>
                                    <p class="article-excerpt">
                                        Essential techniques for optimizing web application performance...
                                    </p>
                                    <div class="article-stats">
                                        <span class="stat-item">❤️ 156 reactions</span>
                                        <span class="stat-item">💬 24 comments</span>
                                        <span class="stat-item">📅 2 weeks ago</span>
                                    </div>
                                </div>
                                <a href="https://dev.to" class="external-link-btn" target="_blank" rel="noopener noreferrer">
                                    Read on Dev.to →
                                </a>
                            </div>
                        </div>
                        
                        <!-- LinkedIn Profile -->
                        <div class="feed-card linkedin">
                            <div class="card-header">
                                <div class="card-title">
                                    <span class="platform-icon">💼</span>
                                    <h3>LinkedIn</h3>
                                </div>
                            </div>
                            <div class="card-content">
                                <div class="profile-stats">
                                    <div class="stat-box">
                                        <div class="stat-value">500+</div>
                                        <div class="stat-label">Connections</div>
                                    </div>
                                    <div class="stat-box">
                                        <div class="stat-value">12</div>
                                        <div class="stat-label">Posts This Month</div>
                                    </div>
                                    <div class="stat-box">
                                        <div class="stat-value">89</div>
                                        <div class="stat-label">Profile Views</div>
                                    </div>
                                </div>
                                <p style="color: rgba(255, 255, 255, 0.7); margin: 15px 0;">
                                    Full Stack Developer passionate about creating innovative web solutions. 
                                    Let's connect and collaborate on exciting projects!
                                </p>
                                <a href="https://linkedin.com" class="external-link-btn" target="_blank" rel="noopener noreferrer">
                                    Connect on LinkedIn →
                                </a>
                            </div>
                        </div>
                        
                        <!-- Twitter/X Feed -->
                        <div class="feed-card twitter">
                            <div class="card-header">
                                <div class="card-title">
                                    <span class="platform-icon">🐦</span>
                                    <h3>Twitter / X</h3>
                                </div>
                            </div>
                            <div class="card-content">
                                <div class="activity-item">
                                    <p class="activity-description">
                                        Just deployed a new feature to production! 🚀 The cyberpunk-themed portfolio 
                                        now has an interactive music player with Web Audio API visualization. 
                                        Check it out! #WebDev #JavaScript
                                    </p>
                                    <div class="article-stats">
                                        <span class="stat-item">❤️ 45</span>
                                        <span class="stat-item">🔄 12</span>
                                        <span class="stat-item">📅 3 hours ago</span>
                                    </div>
                                </div>
                                <div class="activity-item">
                                    <p class="activity-description">
                                        Working on some exciting performance optimizations. Every millisecond counts! ⚡
                                        #WebPerformance #Optimization
                                    </p>
                                    <div class="article-stats">
                                        <span class="stat-item">❤️ 32</span>
                                        <span class="stat-item">🔄 8</span>
                                        <span class="stat-item">📅 1 day ago</span>
                                    </div>
                                </div>
                                <a href="https://twitter.com" class="external-link-btn" target="_blank" rel="noopener noreferrer">
                                    Follow on Twitter →
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
        
        contactSection.insertAdjacentHTML('beforebegin', feedHTML);
    }
    
    attachEventListeners() {
        const refreshBtn = document.getElementById('refreshFeeds');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => this.refreshFeeds());
        }
    }
    
    async loadAllFeeds() {
        await Promise.all([
            this.loadGitHubActivity(),
            this.loadGitHubRepos()
        ]);
    }
    
    async refreshFeeds() {
        const refreshBtn = document.getElementById('refreshFeeds');
        if (refreshBtn) {
            refreshBtn.classList.add('loading');
        }
        
        // Clear cache
        this.cache = {};
        
        await this.loadAllFeeds();
        
        if (refreshBtn) {
            refreshBtn.classList.remove('loading');
        }
        
        this.showToast('Feeds refreshed successfully!');
    }
    
    async loadGitHubActivity() {
        const container = document.getElementById('githubActivity');
        if (!container) return;
        
        try {
            const events = await this.fetchWithCache(
                `https://api.github.com/users/${this.username}/events/public`,
                'githubEvents'
            );
            
            if (!events || events.length === 0) {
                container.innerHTML = '<p class="error-text">No recent activity found.</p>';
                return;
            }
            
            // Filter and display relevant events
            const relevantEvents = events
                .filter(event => ['PushEvent', 'CreateEvent', 'IssuesEvent', 'PullRequestEvent', 'WatchEvent'].includes(event.type))
                .slice(0, 5);
            
            const activitiesHTML = relevantEvents.map(event => {
                const icon = this.getEventIcon(event.type);
                const description = this.getEventDescription(event);
                const time = this.getTimeAgo(new Date(event.created_at));
                
                return `
                    <div class="activity-item">
                        <span class="activity-type">${icon}</span>
                        <p class="activity-description">
                            ${description}
                            <span class="activity-repo">${event.repo.name}</span>
                        </p>
                        <p class="activity-time">${time}</p>
                    </div>
                `;
            }).join('');
            
            container.innerHTML = `
                ${activitiesHTML}
                <a href="https://github.com/${this.username}" class="external-link-btn" target="_blank" rel="noopener noreferrer">
                    View on GitHub →
                </a>
            `;
        } catch (error) {
            console.error('Error loading GitHub activity:', error);
            container.innerHTML = `
                <div class="error-message">
                    <div class="error-icon">⚠️</div>
                    <p class="error-text">Failed to load GitHub activity</p>
                    <p style="font-size: 12px; opacity: 0.6;">API rate limit may be exceeded</p>
                </div>
            `;
        }
    }
    
    async loadGitHubRepos() {
        const container = document.getElementById('githubRepos');
        if (!container) return;
        
        try {
            const repos = await this.fetchWithCache(
                `https://api.github.com/users/${this.username}/repos?sort=updated&per_page=5`,
                'githubRepos'
            );
            
            if (!repos || repos.length === 0) {
                container.innerHTML = '<p class="error-text">No repositories found.</p>';
                return;
            }
            
            const reposHTML = repos.map(repo => `
                <div class="repo-item">
                    <h4 class="repo-name">
                        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
                            ${repo.name}
                        </a>
                    </h4>
                    <p class="repo-description">
                        ${repo.description || 'No description available'}
                    </p>
                    <div class="repo-stats">
                        <span class="stat-item">⭐ ${repo.stargazers_count}</span>
                        <span class="stat-item">🍴 ${repo.forks_count}</span>
                        ${repo.language ? `<span class="language-badge">${repo.language}</span>` : ''}
                        <span class="stat-item">📅 ${this.getTimeAgo(new Date(repo.updated_at))}</span>
                    </div>
                </div>
            `).join('');
            
            container.innerHTML = `
                ${reposHTML}
                <a href="https://github.com/${this.username}?tab=repositories" class="external-link-btn" target="_blank" rel="noopener noreferrer">
                    View all repositories →
                </a>
            `;
        } catch (error) {
            console.error('Error loading GitHub repos:', error);
            container.innerHTML = `
                <div class="error-message">
                    <div class="error-icon">⚠️</div>
                    <p class="error-text">Failed to load repositories</p>
                    <p style="font-size: 12px; opacity: 0.6;">API rate limit may be exceeded</p>
                </div>
            `;
        }
    }
    
    async fetchWithCache(url, cacheKey) {
        const now = Date.now();
        
        // Check cache
        if (this.cache[cacheKey] && (now - this.cache[cacheKey].timestamp) < this.cacheTimeout) {
            return this.cache[cacheKey].data;
        }
        
        // Fetch data
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Store in cache
        this.cache[cacheKey] = {
            data: data,
            timestamp: now
        };
        
        return data;
    }
    
    getEventIcon(type) {
        const icons = {
            'PushEvent': '📤',
            'CreateEvent': '✨',
            'IssuesEvent': '🐛',
            'PullRequestEvent': '🔀',
            'WatchEvent': '⭐'
        };
        return icons[type] || '📌';
    }
    
    getEventDescription(event) {
        switch (event.type) {
            case 'PushEvent':
                const commits = event.payload.commits?.length || 0;
                return `Pushed ${commits} commit${commits !== 1 ? 's' : ''} to`;
            case 'CreateEvent':
                return `Created ${event.payload.ref_type} in`;
            case 'IssuesEvent':
                return `${event.payload.action} an issue in`;
            case 'PullRequestEvent':
                return `${event.payload.action} a pull request in`;
            case 'WatchEvent':
                return `Starred`;
            default:
                return `Activity in`;
        }
    }
    
    getTimeAgo(date) {
        const seconds = Math.floor((new Date() - date) / 1000);
        
        const intervals = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60
        };
        
        for (const [unit, secondsInUnit] of Object.entries(intervals)) {
            const interval = Math.floor(seconds / secondsInUnit);
            if (interval >= 1) {
                return `${interval} ${unit}${interval !== 1 ? 's' : ''} ago`;
            }
        }
        
        return 'just now';
    }
    
    showToast(message) {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 243, 255, 0.9);
            color: #0a0a14;
            padding: 15px 30px;
            border-radius: 8px;
            font-family: 'Rajdhani', sans-serif;
            font-weight: 600;
            font-size: 16px;
            z-index: 10000;
            animation: slideUp 0.3s ease;
            box-shadow: 0 5px 20px rgba(0, 243, 255, 0.5);
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideDown 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// Add toast animations to document
if (!document.getElementById('toastAnimations')) {
    const style = document.createElement('style');
    style.id = 'toastAnimations';
    style.textContent = `
        @keyframes slideUp {
            from {
                transform: translateX(-50%) translateY(100px);
                opacity: 0;
            }
            to {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
        }
        
        @keyframes slideDown {
            from {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
            to {
                transform: translateX(-50%) translateY(100px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize social feed when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.socialFeed = new SocialFeed();
    });
} else {
    window.socialFeed = new SocialFeed();
}
