// Neon Dashboard - Interactive Charts and Data Visualization

// ==================== DATA GENERATION ====================
function generateRandomData(count, min = 0, max = 100) {
    return Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

function generateTrendingData(count, base = 50, variance = 20) {
    const data = [];
    let current = base;
    for (let i = 0; i < count; i++) {
        current += (Math.random() - 0.4) * variance;
        current = Math.max(min, Math.min(max, current));
        data.push(Math.round(current));
    }
    return data;
}

// ==================== STAT COUNTERS WITH ANIMATION ====================
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        
        // Format number with commas
        const formatted = Math.round(current).toLocaleString();
        if (element.textContent.includes('$')) {
            element.textContent = `$${formatted}`;
        } else if (element.textContent.includes('%')) {
            element.textContent = `${Math.round(current)}%`;
        } else {
            element.textContent = formatted;
        }
    }, 16);
}

// Animate all stat values on page load
document.addEventListener('DOMContentLoaded', () => {
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(stat => {
        const text = stat.textContent;
        const numericValue = parseInt(text.replace(/[^0-9]/g, ''));
        if (numericValue) {
            stat.textContent = text.includes('$') ? '$0' : (text.includes('%') ? '0%' : '0');
            setTimeout(() => {
                animateValue(stat, 0, numericValue, 2000);
            }, 300);
        }
    });
});

// ==================== CHART CONFIGURATIONS ====================
const chartColors = {
    primary: '#00ffff',
    secondary: '#ff00ff',
    success: '#00ff41',
    warning: '#ffa502',
    error: '#ff4757',
    gradient1: ['rgba(0, 255, 255, 0.8)', 'rgba(0, 255, 255, 0.1)'],
    gradient2: ['rgba(255, 0, 255, 0.8)', 'rgba(255, 0, 255, 0.1)']
};

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            labels: {
                color: '#a8b2d1',
                font: {
                    family: "'Rajdhani', sans-serif",
                    size: 12
                }
            }
        },
        tooltip: {
            backgroundColor: 'rgba(10, 10, 15, 0.9)',
            titleColor: chartColors.primary,
            bodyColor: '#a8b2d1',
            borderColor: chartColors.primary,
            borderWidth: 1,
            padding: 12,
            displayColors: true,
            callbacks: {
                label: function(context) {
                    let label = context.dataset.label || '';
                    if (label) {
                        label += ': ';
                    }
                    if (context.parsed.y !== null) {
                        label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                    }
                    return label;
                }
            }
        }
    },
    scales: {
        x: {
            grid: {
                color: 'rgba(0, 255, 255, 0.1)',
                borderColor: 'rgba(0, 255, 255, 0.3)'
            },
            ticks: {
                color: '#a8b2d1',
                font: {
                    family: "'Rajdhani', sans-serif"
                }
            }
        },
        y: {
            grid: {
                color: 'rgba(0, 255, 255, 0.1)',
                borderColor: 'rgba(0, 255, 255, 0.3)'
            },
            ticks: {
                color: '#a8b2d1',
                font: {
                    family: "'Rajdhani', sans-serif"
                },
                callback: function(value) {
                    return '$' + value.toLocaleString();
                }
            }
        }
    }
};

// ==================== INITIALIZE CHARTS ====================
// Revenue Line Chart
if (document.getElementById('revenueChart')) {
    const ctx = document.getElementById('revenueChart').getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 250);
    gradient.addColorStop(0, chartColors.gradient1[0]);
    gradient.addColorStop(1, chartColors.gradient1[1]);
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Revenue',
                data: generateTrendingData(12, 45000, 8000),
                borderColor: chartColors.primary,
                backgroundColor: gradient,
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: chartColors.primary,
                pointBorderColor: '#0a0a0f',
                pointBorderWidth: 2
            }]
        },
        options: chartOptions
    });
}

// User Growth Bar Chart
if (document.getElementById('usersChart')) {
    const ctx = document.getElementById('usersChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'New Users',
                data: generateRandomData(12, 1200, 3500),
                backgroundColor: chartColors.primary,
                borderColor: chartColors.primary,
                borderWidth: 1,
                borderRadius: 6,
                hoverBackgroundColor: chartColors.secondary
            }]
        },
        options: {
            ...chartOptions,
            plugins: {
                ...chartOptions.plugins,
                tooltip: {
                    ...chartOptions.plugins.tooltip,
                    callbacks: {
                        label: function(context) {
                            return 'Users: ' + context.parsed.y.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

// Traffic Sources Doughnut Chart
if (document.getElementById('trafficChart')) {
    const ctx = document.getElementById('trafficChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Direct', 'Social Media', 'Search', 'Referral', 'Email'],
            datasets: [{
                data: [35, 25, 20, 12, 8],
                backgroundColor: [
                    chartColors.primary,
                    chartColors.secondary,
                    chartColors.success,
                    chartColors.warning,
                    chartColors.error
                ],
                borderColor: '#0a0a0f',
                borderWidth: 2,
                hoverOffset: 10
            }]
        },
        options: {
            ...chartOptions,
            plugins: {
                ...chartOptions.plugins,
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#a8b2d1',
                        font: {
                            family: "'Rajdhani', sans-serif",
                            size: 12
                        },
                        padding: 15
                    }
                },
                tooltip: {
                    ...chartOptions.plugins.tooltip,
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    });
}

// Conversion Rate Area Chart
if (document.getElementById('conversionChart')) {
    const ctx = document.getElementById('conversionChart').getContext('2d');
    const gradient1 = ctx.createLinearGradient(0, 0, 0, 250);
    gradient1.addColorStop(0, chartColors.gradient2[0]);
    gradient1.addColorStop(1, chartColors.gradient2[1]);
    
    const gradient2 = ctx.createLinearGradient(0, 0, 0, 250);
    gradient2.addColorStop(0, chartColors.gradient1[0]);
    gradient2.addColorStop(1, chartColors.gradient1[1]);
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
            datasets: [
                {
                    label: 'Conversion Rate',
                    data: generateTrendingData(6, 3.5, 0.8),
                    borderColor: chartColors.secondary,
                    backgroundColor: gradient1,
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointBackgroundColor: chartColors.secondary,
                    pointBorderColor: '#0a0a0f',
                    pointBorderWidth: 2
                },
                {
                    label: 'Click Rate',
                    data: generateTrendingData(6, 8.5, 1.5),
                    borderColor: chartColors.primary,
                    backgroundColor: gradient2,
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointBackgroundColor: chartColors.primary,
                    pointBorderColor: '#0a0a0f',
                    pointBorderWidth: 2
                }
            ]
        },
        options: {
            ...chartOptions,
            plugins: {
                ...chartOptions.plugins,
                tooltip: {
                    ...chartOptions.plugins.tooltip,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y.toFixed(1) + '%';
                        }
                    }
                }
            },
            scales: {
                ...chartOptions.scales,
                y: {
                    ...chartOptions.scales.y,
                    ticks: {
                        ...chartOptions.scales.y.ticks,
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

// ==================== REAL-TIME DATA UPDATES ====================
let updateInterval;

function startRealtimeUpdates() {
    updateInterval = setInterval(() => {
        // Update stat values with small random changes
        const statValues = document.querySelectorAll('.stat-value');
        statValues.forEach(stat => {
            const currentText = stat.textContent;
            const currentValue = parseInt(currentText.replace(/[^0-9]/g, ''));
            if (currentValue) {
                const change = Math.floor(Math.random() * 20) - 10;
                const newValue = Math.max(0, currentValue + change);
                
                if (currentText.includes('$')) {
                    stat.textContent = `$${newValue.toLocaleString()}`;
                } else if (currentText.includes('%')) {
                    stat.textContent = `${newValue}%`;
                } else {
                    stat.textContent = newValue.toLocaleString();
                }
            }
        });
    }, 3000);
}

// Start updates after page load
setTimeout(startRealtimeUpdates, 5000);

// ==================== DASHBOARD CONTROLS ====================
if (document.getElementById('timeRange')) {
    document.getElementById('timeRange').addEventListener('change', (e) => {
        console.log('Time range changed to:', e.target.value);
        // In a real app, this would fetch new data
        // For demo, we'll just log it
    });
}

if (document.getElementById('refreshData')) {
    document.getElementById('refreshData').addEventListener('click', () => {
        // Trigger animation on all stat values
        const statValues = document.querySelectorAll('.stat-value');
        statValues.forEach(stat => {
            stat.style.transform = 'scale(1.1)';
            setTimeout(() => {
                stat.style.transform = 'scale(1)';
            }, 200);
        });
        
        console.log('Data refreshed!');
    });
}
