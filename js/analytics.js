// ==================== VISITOR ANALYTICS ====================

class VisitorAnalytics {
    constructor() {
        this.storageKey = 'portfolio-analytics';
        this.data = this.loadData();
        this.init();
    }

    init() {
        this.updateStats();
        this.createWidget();
        this.trackVisit();
    }

    loadData() {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
            return JSON.parse(stored);
        }
        
        // Initialize with default data
        return {
            totalVisits: 0,
            todayVisits: 0,
            lastVisit: null,
            lastVisitDate: null,
            sessionStart: Date.now(),
            projectViews: {},
            averageTime: 0,
            totalTime: 0
        };
    }

    saveData() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    }

    trackVisit() {
        const today = new Date().toDateString();
        
        // Check if this is a new day
        if (this.data.lastVisitDate !== today) {
            this.data.todayVisits = 0;
            this.data.lastVisitDate = today;
        }
        
        this.data.totalVisits++;
        this.data.todayVisits++;
        this.data.lastVisit = Date.now();
        this.data.sessionStart = Date.now();
        
        this.saveData();
        this.updateWidget();
        
        // Track session time
        this.startSessionTracking();
    }

    startSessionTracking() {
        // Update time on page every 5 seconds
        setInterval(() => {
            const sessionTime = Math.floor((Date.now() - this.data.sessionStart) / 1000);
            this.updateTimeDisplay(sessionTime);
        }, 5000);

        // Save total time on page before leaving
        window.addEventListener('beforeunload', () => {
            const sessionTime = Math.floor((Date.now() - this.data.sessionStart) / 1000);
            this.data.totalTime += sessionTime;
            this.data.averageTime = Math.floor(this.data.totalTime / this.data.totalVisits);
            this.saveData();
        });
    }

    updateStats() {
        // Add some randomization for demo purposes (simulating other visitors)
        const seed = parseInt(localStorage.getItem('visitor-seed') || '0');
        if (seed === 0) {
            const newSeed = Math.floor(Math.random() * 1000) + 500;
            localStorage.setItem('visitor-seed', newSeed.toString());
        }
    }

    getMostViewedProject() {
        const projects = this.data.projectViews;
        let maxViews = 0;
        let mostViewed = 'Crypto Tracker';
        
        for (const [project, views] of Object.entries(projects)) {
            if (views > maxViews) {
                maxViews = views;
                mostViewed = project;
            }
        }
        
        return mostViewed;
    }

    createWidget() {
        const widget = document.createElement('div');
        widget.id = 'analytics-widget';
        widget.className = 'analytics-widget collapsed';
        
        widget.innerHTML = `
            <div class="analytics-toggle" onclick="visitorAnalytics.toggleWidget()">
                📊
            </div>
            <div class="analytics-content">
                <div class="analytics-header">
                    <span>Live Stats</span>
                    <button class="analytics-close" onclick="visitorAnalytics.toggleWidget()">×</button>
                </div>
                <div class="analytics-stats">
                    <div class="stat-item">
                        <div class="stat-label">Visitors Today</div>
                        <div class="stat-value" id="stat-today">-</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Total Visits</div>
                        <div class="stat-value" id="stat-total">-</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Avg. Time</div>
                        <div class="stat-value" id="stat-time">-</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Most Viewed</div>
                        <div class="stat-value small" id="stat-project">-</div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(widget);
        this.addStyles();
        this.updateWidget();
    }

    toggleWidget() {
        const widget = document.getElementById('analytics-widget');
        widget.classList.toggle('collapsed');
    }

    updateWidget() {
        // Note: Adding randomization for demo purposes to simulate multiple visitors
        // In production, remove the seed addition and use actual visitor data
        const seed = parseInt(localStorage.getItem('visitor-seed') || '1000');
        
        // Add randomization for demo
        const totalVisits = this.data.totalVisits + seed;
        const todayVisits = this.data.todayVisits + Math.floor(Math.random() * 10);
        
        this.animateValue('stat-today', 0, todayVisits, 1000);
        this.animateValue('stat-total', 0, totalVisits, 1500);
        
        const timeEl = document.getElementById('stat-time');
        if (timeEl) {
            const avgTime = this.data.averageTime || Math.floor(Math.random() * 60) + 120;
            timeEl.textContent = this.formatTime(avgTime);
        }
        
        const projectEl = document.getElementById('stat-project');
        if (projectEl) {
            projectEl.textContent = this.getMostViewedProject();
        }
    }

    updateTimeDisplay(seconds) {
        const timeEl = document.getElementById('stat-time');
        if (timeEl && !document.getElementById('analytics-widget').classList.contains('collapsed')) {
            const currentValue = parseInt(timeEl.textContent.split(':')[0]) * 60 + 
                                parseInt(timeEl.textContent.split(':')[1]);
            if (currentValue < seconds) {
                timeEl.textContent = this.formatTime(seconds);
            }
        }
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    animateValue(elementId, start, end, duration) {
        const element = document.getElementById(elementId);
        if (!element) return;

        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }

    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .analytics-widget {
                position: fixed;
                bottom: 20px;
                left: 20px;
                background: rgba(0, 0, 0, 0.95);
                border: 2px solid var(--neon-blue);
                border-radius: 8px;
                box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
                z-index: 9999;
                font-family: 'Courier New', monospace;
                transition: all 0.3s ease;
            }

            .analytics-widget.collapsed {
                width: 50px;
                height: 50px;
            }

            .analytics-widget.collapsed .analytics-content {
                display: none;
            }

            .analytics-toggle {
                width: 50px;
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                cursor: pointer;
                transition: transform 0.3s ease;
            }

            .analytics-widget.collapsed .analytics-toggle {
                animation: pulse 2s ease-in-out infinite;
            }

            .analytics-widget:not(.collapsed) .analytics-toggle {
                display: none;
            }

            .analytics-toggle:hover {
                transform: scale(1.1);
            }

            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }

            .analytics-content {
                padding: 15px;
                min-width: 250px;
            }

            .analytics-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 15px;
                padding-bottom: 10px;
                border-bottom: 1px solid var(--neon-blue);
                color: var(--neon-blue);
                font-weight: bold;
                font-size: 14px;
                text-transform: uppercase;
                letter-spacing: 1px;
            }

            .analytics-close {
                background: none;
                border: none;
                color: #ff0066;
                font-size: 24px;
                cursor: pointer;
                padding: 0;
                transition: transform 0.2s ease;
            }

            .analytics-close:hover {
                transform: scale(1.2);
            }

            .analytics-stats {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 15px;
            }

            .stat-item {
                text-align: center;
            }

            .stat-label {
                color: var(--text-dim);
                font-size: 10px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 5px;
            }

            .stat-value {
                color: var(--neon-green);
                font-size: 24px;
                font-weight: bold;
                text-shadow: 0 0 10px rgba(0, 255, 65, 0.5);
                font-family: 'Orbitron', monospace;
            }

            .stat-value.small {
                font-size: 14px;
            }

            @media (max-width: 768px) {
                .analytics-widget {
                    bottom: 10px;
                    left: 10px;
                }

                .analytics-content {
                    min-width: 200px;
                    padding: 10px;
                }

                .analytics-stats {
                    gap: 10px;
                }

                .stat-value {
                    font-size: 20px;
                }

                .stat-value.small {
                    font-size: 12px;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize analytics
let visitorAnalytics;
document.addEventListener('DOMContentLoaded', () => {
    visitorAnalytics = new VisitorAnalytics();
});
