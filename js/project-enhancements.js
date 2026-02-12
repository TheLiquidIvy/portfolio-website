// ==================== ENHANCED PROJECT CARDS ====================

class ProjectEnhancements {
    constructor() {
        this.favorites = this.loadFavorites();
        this.projects = [
            {
                id: 'neon-dashboard',
                name: 'Neon Dashboard',
                category: 'frontend',
                description: 'A futuristic analytics dashboard with real-time data visualization and interactive charts.',
                fullDescription: 'An advanced analytics dashboard featuring real-time data updates, interactive charts, and a sleek cyberpunk design. Perfect for monitoring metrics and visualizing complex data sets.',
                features: [
                    'Real-time data synchronization',
                    'Interactive D3.js charts and graphs',
                    'Responsive design for all devices',
                    'Customizable dashboard widgets',
                    'Dark mode with neon accents'
                ],
                tech: [
                    { name: 'React', icon: '⚛️', version: 'v18.2' },
                    { name: 'D3.js', icon: '📊', version: 'v7.8' },
                    { name: 'SCSS', icon: '🎨', version: 'v1.62' }
                ],
                stats: {
                    stars: 245,
                    forks: 67,
                    language: 'JavaScript',
                    linesOfCode: '15.2k',
                    lastUpdated: '2 days ago'
                },
                symbol: '</>'
            },
            {
                id: 'crypto-tracker',
                name: 'Crypto Tracker',
                category: 'frontend',
                description: 'Real-time cryptocurrency price tracking app with portfolio management and market analytics.',
                fullDescription: 'Track cryptocurrency prices in real-time, manage your portfolio, and analyze market trends with beautiful charts and detailed statistics.',
                features: [
                    'Live price updates from multiple exchanges',
                    'Portfolio tracking and management',
                    'Historical price charts',
                    'Market cap and volume analysis',
                    'Price alerts and notifications'
                ],
                tech: [
                    { name: 'Vue.js', icon: '💚', version: 'v3.3' },
                    { name: 'Chart.js', icon: '📈', version: 'v4.2' },
                    { name: 'API', icon: '🔌', version: 'REST' }
                ],
                stats: {
                    stars: 189,
                    forks: 42,
                    language: 'JavaScript',
                    linesOfCode: '12.8k',
                    lastUpdated: '5 days ago'
                },
                symbol: '{ }'
            },
            {
                id: 'task-matrix',
                name: 'Task Matrix',
                category: 'frontend',
                description: 'Advanced task management system with drag-and-drop, kanban boards, and team collaboration.',
                fullDescription: 'A powerful task management application with kanban boards, drag-and-drop functionality, and real-time team collaboration features.',
                features: [
                    'Drag-and-drop task management',
                    'Kanban and list view modes',
                    'Team collaboration features',
                    'Due dates and priorities',
                    'Progress tracking and analytics'
                ],
                tech: [
                    { name: 'React', icon: '⚛️', version: 'v18.2' },
                    { name: 'Redux', icon: '🔄', version: 'v4.2' },
                    { name: 'DnD Kit', icon: '🎯', version: 'v6.0' }
                ],
                stats: {
                    stars: 312,
                    forks: 89,
                    language: 'TypeScript',
                    linesOfCode: '22.5k',
                    lastUpdated: '1 day ago'
                },
                symbol: '[ ]'
            },
            {
                id: 'social-nexus',
                name: 'Social Nexus',
                category: 'fullstack',
                description: 'Full-featured social media platform with real-time messaging, posts, likes, and user authentication.',
                fullDescription: 'A complete social media platform with real-time features including messaging, posts, comments, likes, and comprehensive user profiles.',
                features: [
                    'Real-time messaging with Socket.io',
                    'Post creation with media uploads',
                    'Like, comment, and share functionality',
                    'User authentication and profiles',
                    'Notification system'
                ],
                tech: [
                    { name: 'React', icon: '⚛️', version: 'v18.2' },
                    { name: 'Node.js', icon: '🟢', version: 'v18.16' },
                    { name: 'Socket.io', icon: '🔌', version: 'v4.6' },
                    { name: 'MongoDB', icon: '🍃', version: 'v6.0' }
                ],
                stats: {
                    stars: 567,
                    forks: 134,
                    language: 'JavaScript',
                    linesOfCode: '45.3k',
                    lastUpdated: '3 hours ago'
                },
                symbol: '⚡'
            },
            {
                id: 'ecommerce-engine',
                name: 'E-Commerce Engine',
                category: 'fullstack',
                description: 'Complete e-commerce solution with product catalog, shopping cart, and secure payment integration.',
                fullDescription: 'A full-featured e-commerce platform with product management, shopping cart, secure checkout, and payment processing.',
                features: [
                    'Product catalog with search and filters',
                    'Shopping cart and wishlist',
                    'Secure payment integration',
                    'Order tracking and history',
                    'Admin dashboard for management'
                ],
                tech: [
                    { name: 'Next.js', icon: '▲', version: 'v13.4' },
                    { name: 'Node.js', icon: '🟢', version: 'v18.16' },
                    { name: 'Stripe', icon: '💳', version: 'v12.10' },
                    { name: 'PostgreSQL', icon: '🐘', version: 'v15.3' }
                ],
                stats: {
                    stars: 423,
                    forks: 98,
                    language: 'TypeScript',
                    linesOfCode: '38.7k',
                    lastUpdated: '1 week ago'
                },
                symbol: '🛒'
            },
            {
                id: 'cloud-storage-pro',
                name: 'Cloud Storage Pro',
                category: 'fullstack',
                description: 'Secure cloud storage solution with file sharing, encryption, and multi-device sync capabilities.',
                fullDescription: 'A secure cloud storage platform with file sharing, end-to-end encryption, and seamless multi-device synchronization.',
                features: [
                    'End-to-end file encryption',
                    'Multi-device synchronization',
                    'Team file sharing and permissions',
                    'Version history and recovery',
                    'Automated backup scheduling'
                ],
                tech: [
                    { name: 'React', icon: '⚛️', version: 'v18.2' },
                    { name: 'Python', icon: '🐍', version: 'v3.11' },
                    { name: 'AWS S3', icon: '☁️', version: 'v3.0' },
                    { name: 'Docker', icon: '🐳', version: 'v24.0' }
                ],
                stats: {
                    stars: 178,
                    forks: 45,
                    language: 'Python',
                    linesOfCode: '24.1k',
                    lastUpdated: '3 days ago'
                },
                symbol: '☁️'
            },
            {
                id: 'neural-game-hub',
                name: 'Neural Game Hub',
                category: 'frontend',
                description: 'Interactive gaming platform with WebGL graphics, real-time multiplayer capabilities, and leaderboards.',
                fullDescription: 'An interactive gaming platform featuring WebGL-powered graphics, real-time multiplayer gameplay, and competitive leaderboards.',
                features: [
                    'WebGL-powered 3D graphics',
                    'Real-time multiplayer gameplay',
                    'Global leaderboards and rankings',
                    'Custom game room creation',
                    'Cross-platform compatibility'
                ],
                tech: [
                    { name: 'Three.js', icon: '🎮', version: 'v0.155' },
                    { name: 'WebGL', icon: '🖥️', version: 'v2.0' },
                    { name: 'React', icon: '⚛️', version: 'v18.2' },
                    { name: 'WebSocket', icon: '🔌', version: 'v8.13' }
                ],
                stats: {
                    stars: 356,
                    forks: 78,
                    language: 'JavaScript',
                    linesOfCode: '19.6k',
                    lastUpdated: '2 days ago'
                },
                symbol: '🎮'
            },
            {
                id: 'ai-content-generator',
                name: 'AI Content Generator',
                category: 'fullstack',
                description: 'AI-powered content creation platform with natural language processing, image generation, and API integration.',
                fullDescription: 'An AI-powered content creation platform leveraging natural language processing and image generation for automated content workflows.',
                features: [
                    'AI text generation with GPT models',
                    'Image generation and editing',
                    'Content scheduling and publishing',
                    'SEO optimization suggestions',
                    'Multi-language support'
                ],
                tech: [
                    { name: 'Next.js', icon: '▲', version: 'v13.4' },
                    { name: 'OpenAI', icon: '🤖', version: 'v4.0' },
                    { name: 'Python', icon: '🐍', version: 'v3.11' },
                    { name: 'FastAPI', icon: '⚡', version: 'v0.100' }
                ],
                stats: {
                    stars: 489,
                    forks: 112,
                    language: 'TypeScript',
                    linesOfCode: '32.1k',
                    lastUpdated: '1 day ago'
                },
                symbol: '🤖'
            },
            {
                id: 'data-visualizer-pro',
                name: 'Data Visualizer Pro',
                category: 'frontend',
                description: 'Advanced data visualization tool with interactive charts, real-time updates, and customizable dashboards.',
                fullDescription: 'An advanced data visualization tool with interactive charts, real-time data updates, and fully customizable dashboard layouts.',
                features: [
                    'Interactive chart types and graphs',
                    'Real-time data streaming',
                    'Custom dashboard builder',
                    'Data import from multiple sources',
                    'Export to PDF and image formats'
                ],
                tech: [
                    { name: 'Vue.js', icon: '💚', version: 'v3.3' },
                    { name: 'D3.js', icon: '📊', version: 'v7.8' },
                    { name: 'Plotly', icon: '📈', version: 'v2.24' },
                    { name: 'WebGL', icon: '🖥️', version: 'v2.0' }
                ],
                stats: {
                    stars: 267,
                    forks: 63,
                    language: 'JavaScript',
                    linesOfCode: '18.3k',
                    lastUpdated: '5 days ago'
                },
                symbol: '📊'
            },
            {
                id: 'streaming-platform',
                name: 'Streaming Platform',
                category: 'fullstack',
                description: 'Full-featured music streaming service with playlists, recommendations, and social features for music lovers.',
                fullDescription: 'A full-featured music streaming service with playlist management, personalized recommendations, and social features.',
                features: [
                    'Music streaming with adaptive quality',
                    'Personalized recommendations',
                    'Playlist creation and sharing',
                    'Social features and followers',
                    'Offline download support'
                ],
                tech: [
                    { name: 'React', icon: '⚛️', version: 'v18.2' },
                    { name: 'Node.js', icon: '🟢', version: 'v18.16' },
                    { name: 'GraphQL', icon: '◆', version: 'v16.7' },
                    { name: 'Redis', icon: '🔴', version: 'v7.0' }
                ],
                stats: {
                    stars: 398,
                    forks: 87,
                    language: 'TypeScript',
                    linesOfCode: '41.2k',
                    lastUpdated: '6 hours ago'
                },
                symbol: '🎵'
            },
            {
                id: 'portfolio-builder',
                name: 'Portfolio Builder',
                category: 'frontend',
                description: 'Drag-and-drop portfolio website builder with templates, animations, and one-click deployment.',
                fullDescription: 'A drag-and-drop portfolio website builder with customizable templates, animations, and one-click deployment to popular hosting platforms.',
                features: [
                    'Drag-and-drop page builder',
                    'Customizable templates library',
                    'Animation and transition editor',
                    'One-click deployment',
                    'Custom domain support'
                ],
                tech: [
                    { name: 'React', icon: '⚛️', version: 'v18.2' },
                    { name: 'DnD Kit', icon: '🎯', version: 'v6.0' },
                    { name: 'Framer Motion', icon: '🎬', version: 'v10.12' },
                    { name: 'SCSS', icon: '🎨', version: 'v1.62' }
                ],
                stats: {
                    stars: 215,
                    forks: 52,
                    language: 'JavaScript',
                    linesOfCode: '16.7k',
                    lastUpdated: '1 week ago'
                },
                symbol: '🌐'
            },
            {
                id: 'devops-dashboard',
                name: 'DevOps Dashboard',
                category: 'fullstack',
                description: 'Comprehensive DevOps monitoring platform with CI/CD pipeline visualization, logs, and alerts.',
                fullDescription: 'Monitor your entire DevOps infrastructure with real-time metrics, CI/CD pipeline status, and deployment tracking.',
                features: [
                    'CI/CD pipeline monitoring',
                    'Server and container metrics',
                    'Deployment history and rollback',
                    'Log aggregation and search',
                    'Alert management'
                ],
                tech: [
                    { name: 'React', icon: '⚛️', version: 'v18.2' },
                    { name: 'Go', icon: '🔵', version: 'v1.21' },
                    { name: 'Prometheus', icon: '🔥', version: 'v2.45' },
                    { name: 'K8s', icon: '☸️', version: 'v1.27' }
                ],
                stats: {
                    stars: 201,
                    forks: 56,
                    language: 'Go',
                    linesOfCode: '28.4k',
                    lastUpdated: '4 days ago'
                },
                symbol: '🔐'
            },
            {
                id: 'team-collaboration-hub',
                name: 'Team Collaboration Hub',
                category: 'fullstack',
                description: 'Real-time team collaboration tool with video calls, screen sharing, whiteboard, and project management.',
                fullDescription: 'A real-time team collaboration platform with video conferencing, screen sharing, interactive whiteboard, and project management tools.',
                features: [
                    'HD video conferencing',
                    'Screen sharing and recording',
                    'Interactive whiteboard',
                    'Project and task management',
                    'Real-time document editing'
                ],
                tech: [
                    { name: 'Next.js', icon: '▲', version: 'v13.4' },
                    { name: 'WebRTC', icon: '📹', version: 'v1.0' },
                    { name: 'Socket.io', icon: '🔌', version: 'v4.6' },
                    { name: 'MongoDB', icon: '🍃', version: 'v6.0' }
                ],
                stats: {
                    stars: 334,
                    forks: 76,
                    language: 'TypeScript',
                    linesOfCode: '35.8k',
                    lastUpdated: '12 hours ago'
                },
                symbol: '💬'
            },
            {
                id: 'design-system-studio',
                name: 'Design System Studio',
                category: 'frontend',
                description: 'Component library and design system builder with live preview, code generation, and theming.',
                fullDescription: 'A comprehensive design system builder with component library management, live preview, automatic code generation, and theming support.',
                features: [
                    'Component library management',
                    'Live preview and editing',
                    'Automatic code generation',
                    'Theme customization engine',
                    'Design token management'
                ],
                tech: [
                    { name: 'React', icon: '⚛️', version: 'v18.2' },
                    { name: 'Storybook', icon: '📖', version: 'v7.0' },
                    { name: 'TypeScript', icon: '🔷', version: 'v5.1' },
                    { name: 'CSS-in-JS', icon: '💅', version: 'v6.0' }
                ],
                stats: {
                    stars: 287,
                    forks: 69,
                    language: 'TypeScript',
                    linesOfCode: '21.5k',
                    lastUpdated: '3 days ago'
                },
                symbol: '🎨'
            }
        ];
        
        this.init();
    }

    init() {
        this.enhanceProjectCards();
        this.addFavoritesFilter();
        this.updateFavoritesCount();
        this.setupProjectFilters();
    }

    loadFavorites() {
        const stored = localStorage.getItem('project-favorites');
        return stored ? JSON.parse(stored) : [];
    }

    saveFavorites() {
        localStorage.setItem('project-favorites', JSON.stringify(this.favorites));
    }

    enhanceProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach((card, index) => {
            const project = this.projects[index];
            if (!project) return;
            
            // Add project ID
            card.dataset.projectId = project.id;
            
            // Add favorite button
            this.addFavoriteButton(card, project.id);
            
            // Add GitHub stats
            this.addGitHubStats(card, project.stats);
            
            // Add Quick View button
            this.addQuickViewButton(card, project);
            
            // Replace tech tags with icons
            this.replaceTechTags(card, project.tech);
        });
    }

    addFavoriteButton(card, projectId) {
        const isFavorited = this.favorites.includes(projectId);
        
        const favoriteBtn = document.createElement('div');
        favoriteBtn.className = `favorite-btn ${isFavorited ? 'favorited' : ''}`;
        favoriteBtn.innerHTML = `<span class="heart">${isFavorited ? '❤️' : '🤍'}</span>`;
        
        favoriteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleFavorite(projectId, favoriteBtn);
        });
        
        card.querySelector('.project-image').appendChild(favoriteBtn);
    }

    toggleFavorite(projectId, btn) {
        const index = this.favorites.indexOf(projectId);
        
        if (index > -1) {
            // Remove from favorites
            this.favorites.splice(index, 1);
            btn.classList.remove('favorited');
            btn.querySelector('.heart').textContent = '🤍';
        } else {
            // Add to favorites
            this.favorites.push(projectId);
            btn.classList.add('favorited');
            btn.querySelector('.heart').textContent = '❤️';
        }
        
        this.saveFavorites();
        this.updateFavoritesCount();
        
        // Update filter if active
        const favoritesFilter = document.querySelector('.favorites-filter');
        if (favoritesFilter && favoritesFilter.classList.contains('active')) {
            this.filterFavorites();
        }
    }

    addGitHubStats(card, stats) {
        const statsDiv = document.createElement('div');
        statsDiv.className = 'github-stats';
        statsDiv.innerHTML = `
            <div class="stat-item">
                <div class="stat-icon">⭐</div>
                <span class="stat-value">${stats.stars}</span>
                <span class="stat-label">Stars</span>
            </div>
            <div class="stat-item">
                <div class="stat-icon">🍴</div>
                <span class="stat-value">${stats.forks}</span>
                <span class="stat-label">Forks</span>
            </div>
            <div class="stat-item">
                <div class="stat-icon">💻</div>
                <span class="stat-value">${stats.language}</span>
                <span class="stat-label">Language</span>
            </div>
            <div class="stat-item">
                <div class="stat-icon">📊</div>
                <span class="stat-value">${stats.linesOfCode}</span>
                <span class="stat-label">LOC</span>
            </div>
            <div class="stat-item">
                <div class="stat-icon">📅</div>
                <span class="stat-value">${stats.lastUpdated}</span>
                <span class="stat-label">Updated</span>
            </div>
        `;
        
        card.querySelector('.project-image').appendChild(statsDiv);
    }

    addQuickViewButton(card, project) {
        const quickViewBtn = document.createElement('button');
        quickViewBtn.className = 'quick-view-btn';
        quickViewBtn.textContent = 'Quick View';
        
        quickViewBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.showQuickView(project);
        });
        
        card.querySelector('.project-overlay').appendChild(quickViewBtn);
    }

    replaceTechTags(card, techStack) {
        const techContainer = card.querySelector('.project-tech');
        if (!techContainer) return;
        
        techContainer.innerHTML = '';
        
        techStack.forEach(tech => {
            const techIcon = document.createElement('span');
            techIcon.className = 'tech-icon';
            techIcon.innerHTML = `
                ${tech.icon}
                <span class="tech-tooltip">${tech.name} ${tech.version}</span>
            `;
            techContainer.appendChild(techIcon);
        });
    }

    showQuickView(project) {
        const modal = document.createElement('div');
        modal.className = 'quick-view-modal';
        
        const relatedProjects = this.projects
            .filter(p => p.id !== project.id && p.category === project.category)
            .slice(0, 3);
        
        modal.innerHTML = `
            <div class="quick-view-content">
                <button class="modal-close">×</button>
                
                <div class="modal-header">
                    <h2 class="modal-project-name">${project.name}</h2>
                    <p class="modal-project-subtitle">${project.description}</p>
                </div>
                
                <div class="modal-body">
                    <div class="modal-preview">${project.symbol}</div>
                    
                    <div class="modal-section">
                        <h3 class="modal-section-title">📝 About</h3>
                        <p class="modal-description">${project.fullDescription}</p>
                    </div>
                    
                    <div class="modal-section">
                        <h3 class="modal-section-title">✨ Key Features</h3>
                        <ul class="modal-features">
                            ${project.features.map(f => `<li>${f}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="modal-section">
                        <h3 class="modal-section-title">🛠️ Tech Stack</h3>
                        <div class="modal-tech-stack">
                            ${project.tech.map(t => `
                                <div class="modal-tech-item">
                                    <span class="modal-tech-icon">${t.icon}</span>
                                    <span class="modal-tech-name">${t.name}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="modal-links">
                        <a href="#" class="modal-link-btn">🚀 Live Demo</a>
                        <a href="#" class="modal-link-btn github">💻 View Code</a>
                    </div>
                    
                    ${relatedProjects.length > 0 ? `
                        <div class="related-projects">
                            <h3 class="modal-section-title">🔗 Related Projects</h3>
                            <div class="related-projects-grid">
                                ${relatedProjects.map(p => `
                                    <div class="related-project-card" data-project-id="${p.id}">
                                        <div class="related-project-icon">${p.symbol}</div>
                                        <div class="related-project-name">${p.name}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => this.closeQuickView(modal));
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeQuickView(modal);
        });
        
        // Related project click handlers
        modal.querySelectorAll('.related-project-card').forEach(card => {
            card.addEventListener('click', () => {
                const relatedProjectId = card.dataset.projectId;
                const relatedProject = this.projects.find(p => p.id === relatedProjectId);
                if (relatedProject) {
                    this.closeQuickView(modal);
                    setTimeout(() => this.showQuickView(relatedProject), 300);
                }
            });
        });
        
        // Show modal with animation
        setTimeout(() => modal.classList.add('active'), 10);
    }

    closeQuickView(modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    }

    addFavoritesFilter() {
        const filtersContainer = document.querySelector('.project-filters');
        if (!filtersContainer) return;
        
        const favoritesBtn = document.createElement('button');
        favoritesBtn.className = 'filter-btn favorites-filter';
        favoritesBtn.innerHTML = 'Favorites <span class="favorites-count">0</span>';
        
        favoritesBtn.addEventListener('click', () => {
            this.filterFavorites();
            
            // Update active state
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            favoritesBtn.classList.add('active');
        });
        
        filtersContainer.appendChild(favoritesBtn);
    }

    updateFavoritesCount() {
        const countElement = document.querySelector('.favorites-count');
        if (countElement) {
            countElement.textContent = this.favorites.length;
        }
    }

    filterFavorites() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            const projectId = card.dataset.projectId;
            const isFavorited = this.favorites.includes(projectId);
            
            if (isFavorited) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    setupProjectFilters() {
        const existingFilters = document.querySelectorAll('.project-filters .filter-btn:not(.favorites-filter)');
        
        existingFilters.forEach(filter => {
            filter.addEventListener('click', () => {
                const filterValue = filter.dataset.filter;
                const projectCards = document.querySelectorAll('.project-card');
                
                projectCards.forEach(card => {
                    const category = card.dataset.category;
                    
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
}

// Initialize project enhancements
let projectEnhancements;
document.addEventListener('DOMContentLoaded', () => {
    projectEnhancements = new ProjectEnhancements();
});
