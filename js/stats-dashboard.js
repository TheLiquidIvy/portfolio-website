// ==================== ANIMATED STATISTICS DASHBOARD ====================

class StatsDashboard {
    constructor() {
        this.stats = {
            projects: 14,
            blogPosts: 6,
            coffee: 1247,
            githubStars: 89
        };
        
        this.charts = {};
        this.isVisible = false;
        
        if (typeof Chart !== 'undefined') {
            this.init();
        } else {
            console.log('[Stats] Chart.js not loaded');
        }
    }

    init() {
        this.setupIntersectionObserver();
        console.log('[Stats] Dashboard initialized');
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isVisible) {
                    this.isVisible = true;
                    this.animateStats();
                    this.createCharts();
                }
            });
        }, { threshold: 0.2 });

        const dashboard = document.querySelector('.stats-dashboard');
        if (dashboard) {
            observer.observe(dashboard);
        }

        // Animate cards and charts on scroll
        const cards = document.querySelectorAll('.stat-card, .chart-container');
        cards.forEach(card => {
            const cardObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                    }
                });
            }, { threshold: 0.1 });
            
            cardObserver.observe(card);
        });
    }

    animateStats() {
        // Animate odometer counters
        this.animateCounter('projectsCount', 0, this.stats.projects, 2000);
        this.animateCounter('blogPostsCount', 0, this.stats.blogPosts, 1500);
        this.animateCounter('coffeeCount', 0, this.stats.coffee, 3000);
        this.animateCounter('githubStarsCount', 0, this.stats.githubStars, 2000);
    }

    animateCounter(elementId, start, end, duration) {
        const element = document.getElementById(elementId);
        if (!element) return;

        const startTime = performance.now();
        const range = end - start;

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + range * easeOutQuart);
            
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = end.toLocaleString();
            }
        };

        requestAnimationFrame(animate);
    }

    createCharts() {
        // Only create charts if Chart.js is available
        if (typeof Chart === 'undefined') return;

        this.createRadarChart();
        this.createDoughnutChart();
        this.createLineChart();
    }

    createRadarChart() {
        const canvas = document.getElementById('skillsRadarChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        this.charts.radar = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['JavaScript', 'React', 'Node.js', 'Python', 'Docker', 'AWS'],
                datasets: [{
                    label: 'Skill Level',
                    data: [90, 85, 88, 75, 80, 70],
                    backgroundColor: 'rgba(0, 255, 255, 0.2)',
                    borderColor: '#00ffff',
                    borderWidth: 2,
                    pointBackgroundColor: '#00ffff',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#00ffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(0, 255, 255, 0.2)'
                        },
                        grid: {
                            color: 'rgba(0, 255, 255, 0.2)'
                        },
                        pointLabels: {
                            color: '#ffffff',
                            font: {
                                size: 14,
                                family: 'Rajdhani'
                            }
                        },
                        ticks: {
                            color: '#888888',
                            backdropColor: 'transparent'
                        },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }

    createDoughnutChart() {
        const canvas = document.getElementById('techStackChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        this.charts.doughnut = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Frontend', 'Backend', 'DevOps', 'Database', 'Cloud'],
                datasets: [{
                    data: [30, 25, 20, 15, 10],
                    backgroundColor: [
                        'rgba(0, 255, 255, 0.8)',
                        'rgba(255, 0, 255, 0.8)',
                        'rgba(255, 255, 0, 0.8)',
                        'rgba(0, 255, 65, 0.8)',
                        'rgba(255, 100, 100, 0.8)'
                    ],
                    borderColor: [
                        '#00ffff',
                        '#ff00ff',
                        '#ffff00',
                        '#00ff41',
                        '#ff6464'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#ffffff',
                            padding: 15,
                            font: {
                                size: 12,
                                family: 'Rajdhani'
                            }
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }

    createLineChart() {
        const canvas = document.getElementById('projectTimelineChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        // Generate sample data for the last 12 months
        const months = [];
        const projectData = [];
        const date = new Date();
        
        for (let i = 11; i >= 0; i--) {
            const month = new Date(date.getFullYear(), date.getMonth() - i, 1);
            months.push(month.toLocaleDateString('en-US', { month: 'short' }));
            projectData.push(Math.floor(Math.random() * 5) + 1);
        }
        
        this.charts.line = new Chart(ctx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [{
                    label: 'Projects Completed',
                    data: projectData,
                    borderColor: '#00ffff',
                    backgroundColor: 'rgba(0, 255, 255, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#00ffff',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#00ffff',
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#888888',
                            stepSize: 1
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(0, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#888888'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }

    createActivityGraph() {
        const container = document.getElementById('activityGraph');
        if (!container) return;

        const weeks = 12;
        const daysPerWeek = 7;

        for (let week = 0; week < weeks; week++) {
            const weekDiv = document.createElement('div');
            weekDiv.className = 'activity-week';

            for (let day = 0; day < daysPerWeek; day++) {
                const dayDiv = document.createElement('div');
                const level = Math.floor(Math.random() * 5);
                dayDiv.className = `activity-day${level > 0 ? ` level-${level}` : ''}`;
                dayDiv.title = `${level} contributions`;
                weekDiv.appendChild(dayDiv);
            }

            container.appendChild(weekDiv);
        }
    }

    destroy() {
        // Destroy all charts
        Object.values(this.charts).forEach(chart => {
            if (chart) {
                chart.destroy();
            }
        });
        
        console.log('[Stats] Dashboard destroyed');
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Wait for Chart.js to load
        setTimeout(() => {
            window.statsDashboard = new StatsDashboard();
        }, 100);
    });
} else {
    setTimeout(() => {
        window.statsDashboard = new StatsDashboard();
    }, 100);
}

console.log('[Stats] Stats dashboard module loaded');
