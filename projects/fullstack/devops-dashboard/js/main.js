// DevOps Dashboard JavaScript
class DevOpsDashboard {
    static DEFAULT_ALERT_IDS = [1, 2, 3, 5];

    constructor() {
        this.metrics = {
            cpu: 45,
            memory: 68,
            disk: 52,
            network: 34
        };
        this.logs = [];
        this.deployments = [];
        this.alerts = this.loadAlerts();
        this.logFilter = 'all';
        this.init();
    }

    init() {
        this.generateInitialData();
        this.render();
        this.startRealTimeUpdates();
    }

    generateInitialData() {
        // Generate logs
        const logTypes = ['info', 'warning', 'error', 'success'];
        const messages = [
            'Service started successfully',
            'Database connection established',
            'API endpoint /api/users responded in 245ms',
            'Warning: High memory usage detected',
            'Error: Connection timeout to external service',
            'Deployment completed successfully',
            'Cache cleared',
            'SSL certificate renewed',
            'Backup completed',
            'Load balancer health check passed'
        ];

        for (let i = 0; i < 20; i++) {
            this.logs.push({
                time: this.getRandomTime(),
                level: logTypes[Math.floor(Math.random() * logTypes.length)],
                message: messages[Math.floor(Math.random() * messages.length)],
                service: ['API', 'Database', 'Cache', 'Load Balancer'][Math.floor(Math.random() * 4)]
            });
        }

        // Generate deployments
        const environments = ['Production', 'Staging', 'Development'];
        const services = ['API Server', 'Web Frontend', 'Auth Service', 'Payment Gateway', 'Analytics'];
        const statuses = ['success', 'failed', 'running'];
        const versions = ['v2.4.1', 'v2.4.0', 'v2.3.9', 'v2.3.8'];

        for (let i = 0; i < 10; i++) {
            this.deployments.push({
                id: i + 1,
                service: services[Math.floor(Math.random() * services.length)],
                version: versions[Math.floor(Math.random() * versions.length)],
                environment: environments[Math.floor(Math.random() * environments.length)],
                status: statuses[Math.floor(Math.random() * statuses.length)],
                time: this.getRandomTime(),
                duration: `${Math.floor(Math.random() * 5) + 1}m ${Math.floor(Math.random() * 60)}s`
            });
        }

        this.deployments.sort((a, b) => b.id - a.id);
    }

    render() {
        const app = document.getElementById('devops-app');
        app.innerHTML = `
            <div class="realtime-indicator">
                <div class="realtime-dot"></div>
                <span class="realtime-text">Real-time Monitoring Active</span>
            </div>

            ${this.renderStats()}
            
            <div class="dashboard-grid">
                ${this.renderPipeline()}
                ${this.renderMetrics()}
            </div>

            <div class="dashboard-grid">
                ${this.renderLogs()}
                ${this.renderAlerts()}
            </div>

            ${this.renderDeployments()}
        `;
    }

    renderStats() {
        return `
            <div class="stats-row">
                <div class="stat-card success">
                    <div class="stat-value">24</div>
                    <div class="stat-label">Successful Deploys</div>
                    <div class="stat-change up">↑ 12% from last week</div>
                </div>
                <div class="stat-card error">
                    <div class="stat-value">3</div>
                    <div class="stat-label">Failed Pipelines</div>
                    <div class="stat-change down">↓ 40% improvement</div>
                </div>
                <div class="stat-card info">
                    <div class="stat-value">98.7%</div>
                    <div class="stat-label">Uptime</div>
                    <div class="stat-change up">↑ 0.3% this month</div>
                </div>
                <div class="stat-card warning">
                    <div class="stat-value">2.1s</div>
                    <div class="stat-label">Avg Response Time</div>
                    <div class="stat-change up">↑ 15% faster</div>
                </div>
            </div>
        `;
    }

    renderPipeline() {
        const stages = [
            { name: 'Build', icon: '🔨', status: 'success' },
            { name: 'Test', icon: '🧪', status: 'success' },
            { name: 'Security', icon: '🔒', status: 'running' },
            { name: 'Deploy', icon: '🚀', status: 'pending' },
            { name: 'Verify', icon: '✓', status: 'pending' }
        ];

        return `
            <div class="dashboard-card" style="grid-column: 1 / -1;">
                <h3>⚙️ CI/CD Pipeline</h3>
                <div class="pipeline-container">
                    ${stages.map(stage => `
                        <div class="pipeline-stage">
                            <div class="stage-icon ${stage.status}">
                                ${stage.icon}
                            </div>
                            <div class="stage-name">${stage.name}</div>
                            <div class="stage-status ${stage.status}">
                                ${this.getStatusText(stage.status)}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderMetrics() {
        return `
            <div class="dashboard-card" style="grid-column: 1 / -1;">
                <h3>📊 System Metrics</h3>
                <div class="metrics-grid">
                    ${this.renderGauge('CPU', this.metrics.cpu, '#00ffff')}
                    ${this.renderGauge('Memory', this.metrics.memory, '#ff00ff')}
                    ${this.renderGauge('Disk', this.metrics.disk, '#00ff41')}
                    ${this.renderGauge('Network', this.metrics.network, '#ffff00')}
                </div>
            </div>
        `;
    }

    renderGauge(label, value, color) {
        const degrees = (value / 100) * 360;
        return `
            <div class="metric-gauge">
                <div class="gauge-container">
                    <div class="gauge-circle" style="--gauge-color: ${color}; --gauge-value: ${degrees}deg; --gauge-glow: ${color}33">
                        <div class="gauge-inner">
                            <span class="gauge-value">${value}</span>
                            <span class="gauge-unit">%</span>
                        </div>
                    </div>
                </div>
                <div class="metric-label">${label}</div>
            </div>
        `;
    }

    renderLogs() {
        const filteredLogs = this.logFilter === 'all' 
            ? this.logs 
            : this.logs.filter(log => log.level === this.logFilter);

        return `
            <div class="dashboard-card" style="grid-column: 1 / -1;">
                <h3>📝 Log Viewer</h3>
                <div class="log-controls">
                    <button class="log-filter ${this.logFilter === 'all' ? 'active' : ''}" 
                            onclick="devopsDashboard.filterLogs('all')">All</button>
                    <button class="log-filter ${this.logFilter === 'info' ? 'active' : ''}" 
                            onclick="devopsDashboard.filterLogs('info')">Info</button>
                    <button class="log-filter ${this.logFilter === 'warning' ? 'active' : ''}" 
                            onclick="devopsDashboard.filterLogs('warning')">Warning</button>
                    <button class="log-filter ${this.logFilter === 'error' ? 'active' : ''}" 
                            onclick="devopsDashboard.filterLogs('error')">Error</button>
                    <button class="log-filter ${this.logFilter === 'success' ? 'active' : ''}" 
                            onclick="devopsDashboard.filterLogs('success')">Success</button>
                </div>
                <div class="log-viewer">
                    ${filteredLogs.slice(0, 10).map(log => `
                        <div class="log-entry ${log.level}">
                            <span class="log-time">${log.time}</span>
                            <span class="log-level ${log.level}">${log.level.toUpperCase()}</span>
                            <span class="log-message">[${log.service}] ${log.message}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderAlerts() {
        const alertRules = [
            { id: 1, name: 'High CPU Usage', condition: 'CPU > 80%', active: true },
            { id: 2, name: 'Memory Leak Detection', condition: 'Memory growth > 10%/hr', active: true },
            { id: 3, name: 'API Latency', condition: 'Response time > 3s', active: true },
            { id: 4, name: 'Error Rate Spike', condition: 'Errors > 5% of requests', active: false },
            { id: 5, name: 'Disk Space Low', condition: 'Disk usage > 90%', active: true }
        ];

        return `
            <div class="dashboard-card" style="grid-column: 1 / -1;">
                <h3>🚨 Alert Configuration</h3>
                <div class="alerts-config">
                    ${alertRules.map(rule => `
                        <div class="alert-rule">
                            <div class="alert-info">
                                <h4>${rule.name}</h4>
                                <div class="alert-condition">${rule.condition}</div>
                            </div>
                            <div class="alert-toggle ${rule.active ? 'active' : ''}" 
                                 onclick="devopsDashboard.toggleAlert(${rule.id})">
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderDeployments() {
        return `
            <div class="dashboard-card" style="margin-top: 1.5rem;">
                <h3>🚀 Deployment History</h3>
                <table class="deployment-table">
                    <thead>
                        <tr>
                            <th>Service</th>
                            <th>Version</th>
                            <th>Environment</th>
                            <th>Status</th>
                            <th>Duration</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.deployments.slice(0, 8).map(deployment => `
                            <tr>
                                <td>${deployment.service}</td>
                                <td>${deployment.version}</td>
                                <td>${deployment.environment}</td>
                                <td><span class="status-badge ${deployment.status}">${deployment.status}</span></td>
                                <td>${deployment.duration}</td>
                                <td>${deployment.time}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    filterLogs(filter) {
        this.logFilter = filter;
        this.render();
    }

    toggleAlert(id) {
        const alerts = this.alerts;
        if (alerts.includes(id)) {
            this.alerts = alerts.filter(a => a !== id);
        } else {
            this.alerts.push(id);
        }
        this.saveAlerts();
        this.render();
    }

    startRealTimeUpdates() {
        // Update metrics every 3 seconds
        setInterval(() => {
            this.updateMetrics();
        }, 3000);

        // Add new log every 5 seconds
        setInterval(() => {
            this.addNewLog();
        }, 5000);

        // Update pipeline status every 10 seconds
        setInterval(() => {
            this.render();
        }, 10000);
    }

    updateMetrics() {
        // Simulate realistic metric changes
        this.metrics.cpu = Math.max(20, Math.min(90, this.metrics.cpu + (Math.random() - 0.5) * 10));
        this.metrics.memory = Math.max(30, Math.min(95, this.metrics.memory + (Math.random() - 0.5) * 8));
        this.metrics.disk = Math.max(40, Math.min(85, this.metrics.disk + (Math.random() - 0.5) * 5));
        this.metrics.network = Math.max(10, Math.min(80, this.metrics.network + (Math.random() - 0.5) * 15));

        // Update gauges
        const gauges = document.querySelectorAll('.gauge-circle');
        gauges.forEach((gauge, index) => {
            const metric = Object.values(this.metrics)[index];
            const degrees = (metric / 100) * 360;
            gauge.style.setProperty('--gauge-value', degrees + 'deg');
            const valueEl = gauge.querySelector('.gauge-value');
            if (valueEl) {
                valueEl.textContent = Math.round(metric);
            }
        });
    }

    addNewLog() {
        const logTypes = ['info', 'warning', 'error', 'success'];
        const messages = [
            'Health check completed',
            'Request processed successfully',
            'Database query executed',
            'Cache hit rate: 85%',
            'API rate limit check passed',
            'Session cleanup completed',
            'Metrics aggregated',
            'Scheduled task completed'
        ];

        const newLog = {
            time: new Date().toLocaleTimeString(),
            level: logTypes[Math.floor(Math.random() * logTypes.length)],
            message: messages[Math.floor(Math.random() * messages.length)],
            service: ['API', 'Database', 'Cache', 'Load Balancer'][Math.floor(Math.random() * 4)]
        };

        this.logs.unshift(newLog);
        if (this.logs.length > 50) {
            this.logs = this.logs.slice(0, 50);
        }

        // Update log viewer if visible
        const logViewer = document.querySelector('.log-viewer');
        if (logViewer) {
            const filteredLogs = this.logFilter === 'all' 
                ? this.logs 
                : this.logs.filter(log => log.level === this.logFilter);

            logViewer.innerHTML = filteredLogs.slice(0, 10).map(log => `
                <div class="log-entry ${log.level}">
                    <span class="log-time">${log.time}</span>
                    <span class="log-level ${log.level}">${log.level.toUpperCase()}</span>
                    <span class="log-message">[${log.service}] ${log.message}</span>
                </div>
            `).join('');
        }
    }

    getStatusText(status) {
        const statusMap = {
            success: 'Passed',
            running: 'Running',
            failed: 'Failed',
            pending: 'Pending'
        };
        return statusMap[status] || status;
    }

    getRandomTime() {
        const now = new Date();
        const minutes = Math.floor(Math.random() * 60);
        now.setMinutes(now.getMinutes() - minutes);
        return now.toLocaleTimeString();
    }

    saveAlerts() {
        localStorage.setItem('devops_alerts', JSON.stringify(this.alerts));
    }

    loadAlerts() {
        const saved = localStorage.getItem('devops_alerts');
        return saved ? JSON.parse(saved) : DevOpsDashboard.DEFAULT_ALERT_IDS;
    }
}

// Initialize dashboard when page loads
let devopsDashboard;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        devopsDashboard = new DevOpsDashboard();
    });
} else {
    devopsDashboard = new DevOpsDashboard();
}
