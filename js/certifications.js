// ==================== CERTIFICATIONS & ACHIEVEMENTS SYSTEM ====================

class CertificationSystem {
    constructor() {
        this.currentTab = 'certifications';
        this.currentFilter = 'all';
        this.achievements = [
            {
                id: 'code-master',
                name: 'Code Master',
                description: '100+ Projects Completed',
                icon: '🏆',
                unlocked: true,
                progress: 100,
                story: 'After countless hours of coding, debugging, and pushing commits, you\'ve reached the milestone of 100 completed projects. Your dedication to building quality software is truly remarkable!'
            },
            {
                id: 'open-source-hero',
                name: 'Open Source Hero',
                description: '50+ GitHub Contributions',
                icon: '⭐',
                unlocked: true,
                progress: 100,
                story: 'Your contributions to open source projects have made a real impact on the developer community. Keep sharing your knowledge and code with the world!'
            },
            {
                id: 'bug-slayer',
                name: 'Bug Slayer',
                description: '1000+ Commits',
                icon: '⚔️',
                unlocked: true,
                progress: 100,
                story: 'With over 1000 commits under your belt, you\'ve proven that persistence and attention to detail are your superpowers. Every bug defeated makes you stronger!'
            },
            {
                id: 'stackoverflow-champion',
                name: 'Stack Overflow Champion',
                description: '500+ Reputation',
                icon: '💬',
                unlocked: false,
                progress: 78,
                story: 'You\'re well on your way to becoming a Stack Overflow legend! Keep helping fellow developers solve their problems.'
            },
            {
                id: 'coffee-addict',
                name: 'Coffee Addict',
                description: '1000+ Cups of Coffee',
                icon: '☕',
                unlocked: true,
                progress: 100,
                story: 'Coffee isn\'t just a beverage for you - it\'s the fuel that powers your coding marathons. 1000 cups later, you\'re still going strong!'
            },
            {
                id: 'night-owl',
                name: 'Night Owl',
                description: '100+ Late Night Commits',
                icon: '🦉',
                unlocked: true,
                progress: 100,
                story: 'While others sleep, you code. Your late-night commits have produced some of your best work. The quiet hours are when magic happens!'
            }
        ];
        
        this.init();
    }

    init() {
        this.setupTabs();
        this.setupFilters();
        this.renderAchievements();
        this.setupAchievementCards();
        this.setupScrollAnimations();
    }

    setupTabs() {
        const tabs = document.querySelectorAll('.cert-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                this.switchTab(tab.dataset.tab);
            });
        });
    }

    switchTab(tabName) {
        this.currentTab = tabName;
        
        // Update tab buttons
        document.querySelectorAll('.cert-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabName);
        });
        
        // Update content
        document.querySelectorAll('.certifications-content').forEach(content => {
            content.classList.toggle('active', content.dataset.content === tabName);
        });
    }

    setupFilters() {
        const filters = document.querySelectorAll('.filter-btn');
        filters.forEach(filter => {
            filter.addEventListener('click', () => {
                this.filterAchievements(filter.dataset.filter);
                
                // Update active filter
                filters.forEach(f => f.classList.remove('active'));
                filter.classList.add('active');
            });
        });
    }

    filterAchievements(filter) {
        this.currentFilter = filter;
        const cards = document.querySelectorAll('.achievement-card');
        
        cards.forEach(card => {
            const isUnlocked = card.classList.contains('unlocked');
            const isLocked = card.classList.contains('locked');
            
            let show = true;
            if (filter === 'unlocked' && !isUnlocked) {
                show = false;
            } else if (filter === 'in-progress' && !isLocked) {
                show = false;
            }
            
            card.style.display = show ? 'block' : 'none';
        });
    }

    renderAchievements() {
        const grid = document.querySelector('.achievements-grid');
        if (!grid) return;
        
        grid.innerHTML = '';
        
        this.achievements.forEach((achievement, index) => {
            const card = this.createAchievementCard(achievement);
            grid.appendChild(card);
            
            // Stagger animation
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 100);
        });
    }

    createAchievementCard(achievement) {
        const card = document.createElement('div');
        card.className = `achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`;
        card.dataset.achievementId = achievement.id;
        
        const progressHTML = !achievement.unlocked ? `
            <div class="achievement-progress">
                <div class="progress-label">
                    <span>Progress</span>
                    <span>${achievement.progress}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${achievement.progress}%"></div>
                </div>
            </div>
        ` : '';
        
        card.innerHTML = `
            <div class="achievement-header">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-info">
                    <h3 class="achievement-name">${achievement.name}</h3>
                    <p class="achievement-desc">${achievement.description}</p>
                </div>
            </div>
            ${progressHTML}
            <span class="achievement-status">${achievement.unlocked ? '✓ Unlocked' : 'In Progress'}</span>
        `;
        
        return card;
    }

    setupAchievementCards() {
        const cards = document.querySelectorAll('.achievement-card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const achievementId = card.dataset.achievementId;
                const achievement = this.achievements.find(a => a.id === achievementId);
                if (achievement && achievement.unlocked) {
                    this.showAchievementModal(achievement);
                }
            });
        });
    }

    showAchievementModal(achievement) {
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'achievement-modal';
        
        modal.innerHTML = `
            <div class="achievement-modal-content">
                <button class="modal-close">×</button>
                <div class="modal-achievement-icon">${achievement.icon}</div>
                <h2 class="modal-achievement-name">${achievement.name}</h2>
                <p class="modal-achievement-story">${achievement.story}</p>
                <p class="modal-achievement-date">Unlocked on ${this.getRandomPastDate()}</p>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add event listeners
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                setTimeout(() => modal.remove(), 300);
            }
        });
        
        // Show modal with animation
        setTimeout(() => modal.classList.add('active'), 10);
        
        // Create confetti
        this.createConfetti();
    }

    createConfetti() {
        const colors = ['#00ffff', '#ff00ff', '#00ff41', '#ffff00'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animation = `confettiFall ${2 + Math.random() * 2}s linear forwards`;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 4000);
        }
    }

    getRandomPastDate() {
        const monthsAgo = Math.floor(Math.random() * 12) + 1;
        const date = new Date();
        date.setMonth(date.getMonth() - monthsAgo);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll('.achievement-card').forEach(card => {
            observer.observe(card);
        });

        document.querySelectorAll('.cert-badge').forEach(badge => {
            observer.observe(badge);
        });
    }
}

// Add confetti animation to global styles
const confettiStyles = document.createElement('style');
confettiStyles.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyles);

// Initialize certification system
let certificationSystem;
document.addEventListener('DOMContentLoaded', () => {
    certificationSystem = new CertificationSystem();
});
