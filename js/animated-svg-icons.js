// ==================== ANIMATED SVG ICONS ====================

class AnimatedSVGIcons {
    constructor() {
        this.init();
    }

    init() {
        this.createSkillIcons();
        this.createTechStackIcons();
        this.createFeatureIcons();
        this.addSVGStyles();
    }

    createSkillIcons() {
        // Add SVG icons to skill items
        document.querySelectorAll('.skill-item').forEach(item => {
            const skillName = item.querySelector('.skill-name')?.textContent;
            const icon = this.getSkillIcon(skillName);
            
            if (icon) {
                const iconContainer = document.createElement('span');
                iconContainer.className = 'skill-icon';
                iconContainer.innerHTML = icon;
                item.insertBefore(iconContainer, item.firstChild);
            }
        });
    }

    createTechStackIcons() {
        // Add animated icons to tech tags
        document.querySelectorAll('.tech-tag').forEach(tag => {
            const tech = tag.textContent.trim();
            const icon = this.getTechIcon(tech);
            
            if (icon) {
                tag.innerHTML = icon + ' ' + tag.textContent;
                tag.classList.add('tech-with-icon');
            }
        });
    }

    createFeatureIcons() {
        // Add icons to stat cards
        const statCards = document.querySelectorAll('.stat-card');
        const icons = ['🚀', '📝', '☕', '⭐'];
        
        statCards.forEach((card, index) => {
            const existingIcon = card.querySelector('.stat-icon');
            if (!existingIcon) {
                const iconSpan = document.createElement('span');
                iconSpan.className = 'stat-icon';
                iconSpan.textContent = icons[index] || '✨';
                card.insertBefore(iconSpan, card.firstChild);
            }
        });
    }

    getSkillIcon(skillName) {
        const iconMap = {
            'React': `<svg class="skill-svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="2" fill="currentColor"/><circle cx="12" cy="5" r="1.5" fill="currentColor" opacity="0.7"/><circle cx="19" cy="12" r="1.5" fill="currentColor" opacity="0.7"/><circle cx="12" cy="19" r="1.5" fill="currentColor" opacity="0.7"/><circle cx="5" cy="12" r="1.5" fill="currentColor" opacity="0.7"/></svg>`,
            'Vue.js': `<svg class="skill-svg" viewBox="0 0 24 24"><path d="M 12 2 L 2 7 L 2 17 L 12 22 L 22 17 L 22 7 Z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M 12 2 L 12 12" stroke="currentColor" stroke-width="1.5"/></svg>`,
            'TypeScript': `<svg class="skill-svg" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" rx="2"/><text x="12" y="16" text-anchor="middle" font-size="10" fill="currentColor">TS</text></svg>`,
            'CSS/SASS': `<svg class="skill-svg" viewBox="0 0 24 24"><path d="M 6 3 L 3 21 L 12 24 L 21 21 L 18 3 Z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M 12 3 L 12 24" stroke="currentColor" stroke-width="1.5"/></svg>`,
            'Node.js': `<svg class="skill-svg" viewBox="0 0 24 24"><path d="M 12 2 C 6.5 2 2 6.5 2 12 C 2 17.5 6.5 22 12 22 C 17.5 22 22 17.5 22 12 C 22 6.5 17.5 2 12 2 Z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="4" fill="currentColor"/></svg>`,
            'Python': `<svg class="skill-svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M 12 6 L 18 12 L 12 18 L 6 12 Z" fill="currentColor" opacity="0.3"/></svg>`,
            'PostgreSQL': `<svg class="skill-svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M 7 12 H 17 M 12 7 V 17" stroke="currentColor" stroke-width="1.5"/></svg>`,
            'MongoDB': `<svg class="skill-svg" viewBox="0 0 24 24"><path d="M 12 2 Q 18 8 18 14 Q 18 20 12 22 Q 6 20 6 14 Q 6 8 12 2 Z" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`,
            'Docker': `<svg class="skill-svg" viewBox="0 0 24 24"><rect x="4" y="6" width="4" height="4" fill="currentColor"/><rect x="10" y="6" width="4" height="4" fill="currentColor"/><rect x="16" y="6" width="4" height="4" fill="currentColor"/><rect x="4" y="12" width="4" height="4" fill="currentColor"/><rect x="10" y="12" width="4" height="4" fill="currentColor"/><rect x="16" y="12" width="4" height="4" fill="currentColor"/></svg>`,
            'AWS': `<svg class="skill-svg" viewBox="0 0 24 24"><path d="M 6 8 Q 12 4 18 8 Q 18 14 12 18 Q 6 14 6 8 Z" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`,
            'CI/CD': `<svg class="skill-svg" viewBox="0 0 24 24"><path d="M 3 12 L 9 6 L 9 10 C 15 10 15 14 9 14 L 9 18 L 3 12 Z" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`,
            'Kubernetes': `<svg class="skill-svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="7" r="1.5" fill="currentColor"/><circle cx="17" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="17" r="1.5" fill="currentColor"/><circle cx="7" cy="12" r="1.5" fill="currentColor"/></svg>`
        };
        
        return iconMap[skillName] || null;
    }

    getTechIcon(tech) {
        const iconMap = {
            'React': '⚛️',
            'Vue.js': '🖖',
            'TypeScript': '📘',
            'JavaScript': '📜',
            'Node.js': '🟢',
            'Python': '🐍',
            'AWS': '☁️',
            'Docker': '🐳',
            'Kubernetes': '⚙️',
            'MongoDB': '🍃',
            'PostgreSQL': '🐘',
            'Redis': '🔴',
            'GraphQL': '◇',
            'REST': '🔗',
            'Socket.io': '⚡',
            'FastAPI': '🚀'
        };
        
        return iconMap[tech] || null;
    }

    addSVGStyles() {
        if (document.getElementById('svg-icon-styles')) return;

        const style = document.createElement('style');
        style.id = 'svg-icon-styles';
        style.textContent = `
            .skill-icon {
                display: inline-block;
                width: 24px;
                height: 24px;
                margin-right: 8px;
                animation: icon-float 3s ease-in-out infinite;
                flex-shrink: 0;
            }

            .skill-svg {
                width: 100%;
                height: 100%;
                color: var(--primary);
                filter: drop-shadow(0 0 5px rgba(0, 255, 255, 0.3));
            }

            .skill-item:hover .skill-svg {
                filter: drop-shadow(0 0 10px rgba(0, 255, 255, 0.8));
                animation: icon-glow 0.6s ease;
            }

            .stat-icon {
                display: inline-block;
                font-size: 2.5em;
                margin-bottom: 10px;
                animation: icon-bounce 2s ease-in-out infinite;
                transform-origin: center;
            }

            .tech-with-icon {
                display: inline-flex;
                align-items: center;
                gap: 4px;
            }

            @keyframes icon-float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-5px); }
            }

            @keyframes icon-glow {
                0% { filter: drop-shadow(0 0 5px rgba(0, 255, 255, 0.3)); }
                50% { filter: drop-shadow(0 0 20px rgba(0, 255, 255, 1)); }
                100% { filter: drop-shadow(0 0 5px rgba(0, 255, 255, 0.3)); }
            }

            @keyframes icon-bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-8px); }
            }

            @media (prefers-reduced-motion: reduce) {
                .skill-icon,
                .stat-icon {
                    animation: none !important;
                }
            }
        `;

        document.head.appendChild(style);
    }
}

// Initialize animated SVG icons
document.addEventListener('DOMContentLoaded', () => {
    new AnimatedSVGIcons();
});
