// ==================== INTERACTIVE SKILL BARS ====================

class InteractiveSkillBars {
    constructor() {
        this.skillBars = [];
        this.isAnimating = false;
        this.init();
    }

    init() {
        // Collect all skill bars
        document.querySelectorAll('.skill-item').forEach(item => {
            const progressElement = item.querySelector('.skill-progress');
            const nameElement = item.querySelector('.skill-name');
            
            if (progressElement && nameElement) {
                const progress = parseInt(progressElement.getAttribute('data-progress')) || 0;
                
                this.skillBars.push({
                    container: item,
                    progressBar: progressElement,
                    skillName: nameElement,
                    targetProgress: progress,
                    currentProgress: 0
                });

                // Add hover effects
                this.addHoverEffects(item, progress);
            }
        });

        // Set up Intersection Observer to trigger animation when visible
        this.setupSkillAnimationObserver();

        // Add CSS for skill bars
        this.addSkillBarStyles();
    }

    setupSkillAnimationObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '-50px',
            threshold: 0.3
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const skillItem = entry.target;
                
                if (entry.isIntersecting && !skillItem.dataset.animated) {
                    skillItem.dataset.animated = 'true';
                    
                    // Find corresponding skill bar
                    const progressBar = skillItem.querySelector('.skill-progress');
                    if (progressBar) {
                        const targetProgress = parseInt(progressBar.getAttribute('data-progress')) || 0;
                        this.animateSkillBar(progressBar, targetProgress);
                    }
                }
            });
        }, observerOptions);

        // Observe all skill items
        document.querySelectorAll('.skill-item').forEach(item => {
            observer.observe(item);
        });
    }

    animateSkillBar(progressBar, targetProgress) {
        const duration = 1500; // 1.5 seconds
        const startTime = performance.now();
        const skillItem = progressBar.closest('.skill-item');

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (easeOutCubic)
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentWidth = targetProgress * easeProgress;

            progressBar.style.width = currentWidth + '%';

            // Update percentage label
            const percentageLabel = skillItem.querySelector('.skill-percentage');
            if (percentageLabel) {
                percentageLabel.textContent = Math.floor(currentWidth) + '%';
                percentageLabel.style.opacity = progress;
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                progressBar.style.width = targetProgress + '%';
                if (percentageLabel) {
                    percentageLabel.textContent = targetProgress + '%';
                }
            }
        };

        requestAnimationFrame(animate);
    }

    addHoverEffects(skillItem, progress) {
        // Create percentage display
        const percentageLabel = document.createElement('span');
        percentageLabel.className = 'skill-percentage';
        percentageLabel.textContent = '0%';
        percentageLabel.style.opacity = '0';
        
        const skillBar = skillItem.querySelector('.skill-bar');
        if (skillBar) {
            skillBar.appendChild(percentageLabel);
        }

        // Add hover event listeners
        skillItem.addEventListener('mouseenter', () => {
            const progressBar = skillItem.querySelector('.skill-progress');
            if (progressBar) {
                skillItem.classList.add('skill-hover');
                this.showSkillTooltip(skillItem, progress);
            }
        });

        skillItem.addEventListener('mouseleave', () => {
            skillItem.classList.remove('skill-hover');
            const tooltip = skillItem.querySelector('.skill-tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    }

    showSkillTooltip(skillItem, progress) {
        // Create tooltip if it doesn't exist
        let tooltip = skillItem.querySelector('.skill-tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.className = 'skill-tooltip';
            tooltip.innerHTML = `
                <div class="tooltip-content">
                    <div class="proficiency-level">${this.getProficiencyLevel(progress)}</div>
                    <div class="proficiency-bar">
                        <div class="proficiency-fill" style="width: ${progress}%"></div>
                    </div>
                </div>
            `;
            skillItem.appendChild(tooltip);
        }
        
        // Trigger animation
        setTimeout(() => {
            tooltip.classList.add('show');
        }, 10);
    }

    getProficiencyLevel(progress) {
        if (progress >= 90) return '🔥 Expert';
        if (progress >= 80) return '⭐ Advanced';
        if (progress >= 70) return '👍 Intermediate';
        if (progress >= 50) return '📚 Beginner';
        return '🌱 Learning';
    }

    addSkillBarStyles() {
        if (document.getElementById('skill-bar-styles')) {
            return; // Already added
        }

        const style = document.createElement('style');
        style.id = 'skill-bar-styles';
        style.textContent = `
            .skill-item {
                position: relative;
                margin-bottom: 1.5rem;
                transition: all 0.3s ease;
            }

            .skill-name {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 0.5rem;
                font-weight: 600;
                color: var(--primary);
                font-size: 0.95rem;
                letter-spacing: 1px;
            }

            .skill-bar {
                position: relative;
                height: 8px;
                background: rgba(0, 255, 255, 0.1);
                border-radius: 10px;
                border: 1px solid rgba(0, 255, 255, 0.2);
                overflow: hidden;
                box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
                transition: all 0.3s ease;
            }

            .skill-item.skill-hover .skill-bar {
                box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3), 0 0 15px rgba(0, 255, 255, 0.4);
                border-color: var(--primary);
            }

            .skill-progress {
                height: 100%;
                background: linear-gradient(
                    90deg,
                    var(--primary),
                    var(--secondary)
                );
                border-radius: 10px;
                width: 0%;
                transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                position: relative;
                overflow: hidden;
                box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
            }

            .skill-progress::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                background: linear-gradient(
                    90deg,
                    transparent,
                    rgba(255, 255, 255, 0.3),
                    transparent
                );
                animation: shimmer 2s infinite;
            }

            @keyframes shimmer {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
            }

            .skill-item.skill-hover .skill-progress {
                box-shadow: 0 0 20px rgba(0, 255, 255, 0.8), 0 0 30px rgba(255, 0, 255, 0.3);
                filter: brightness(1.2);
            }

            .skill-percentage {
                position: absolute;
                right: 8px;
                top: 50%;
                transform: translateY(-50%);
                color: var(--text);
                font-size: 0.75rem;
                font-weight: 700;
                background: rgba(0, 0, 0, 0.5);
                padding: 2px 6px;
                border-radius: 4px;
                transition: all 0.3s ease;
                pointer-events: none;
            }

            .skill-tooltip {
                position: absolute;
                bottom: 100%;
                left: 50%;
                transform: translateX(-50%) translateY(-10px);
                background: linear-gradient(135deg, rgba(0, 255, 255, 0.15), rgba(255, 0, 255, 0.15));
                border: 1px solid var(--primary);
                border-radius: 8px;
                padding: 12px 16px;
                margin-bottom: 8px;
                white-space: nowrap;
                opacity: 0;
                pointer-events: none;
                transition: all 0.2s ease;
                z-index: 100;
                backdrop-filter: blur(10px);
                box-shadow: 0 8px 32px rgba(0, 255, 255, 0.2);
            }

            .skill-tooltip.show {
                opacity: 1;
                transform: translateX(-50%) translateY(-15px);
            }

            .tooltip-content {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }

            .proficiency-level {
                color: var(--primary);
                font-weight: 700;
                font-size: 0.9rem;
            }

            .proficiency-bar {
                width: 100px;
                height: 4px;
                background: rgba(0, 255, 255, 0.2);
                border-radius: 2px;
                overflow: hidden;
            }

            .proficiency-fill {
                height: 100%;
                background: linear-gradient(90deg, var(--primary), var(--secondary));
                border-radius: 2px;
                box-shadow: 0 0 8px var(--primary);
                transition: width 0.3s ease;
            }

            @media (max-width: 768px) {
                .skill-tooltip {
                    display: none;
                }

                .skill-item {
                    margin-bottom: 1rem;
                }
            }
        `;

        document.head.appendChild(style);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new InteractiveSkillBars();
});
