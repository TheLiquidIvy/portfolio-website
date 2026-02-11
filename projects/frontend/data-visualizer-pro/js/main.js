// Data Visualizer Pro - Main JavaScript
// Advanced interactive data visualization with real-time updates

class DataVisualizer {
    constructor() {
        this.data = this.generateInitialData();
        this.currentTheme = 'cyber';
        this.isRealtime = false;
        this.realtimeInterval = null;
        this.charts = {};
        this.init();
    }

    init() {
        this.createUI();
        this.renderAllCharts();
        this.attachEventListeners();
        this.startAnimations();
    }

    generateInitialData() {
        return {
            revenue: Array.from({ length: 12 }, () => Math.floor(Math.random() * 100000) + 50000),
            categories: [
                { name: 'Products', value: 40, color: '#00ffff' },
                { name: 'Services', value: 30, color: '#ff00ff' },
                { name: 'Subscriptions', value: 20, color: '#00ff41' },
                { name: 'Other', value: 10, color: '#ffa502' }
            ],
            heatmap: Array.from({ length: 7 }, () => 
                Array.from({ length: 12 }, () => Math.floor(Math.random() * 100))
            ),
            timeSeries: Array.from({ length: 30 }, (_, i) => ({
                date: i,
                value: Math.sin(i / 5) * 30 + 50 + Math.random() * 10
            })),
            radar: [
                { axis: 'Performance', value: 85 },
                { axis: 'Reliability', value: 92 },
                { axis: 'Security', value: 78 },
                { axis: 'Scalability', value: 88 },
                { axis: 'UX', value: 95 },
                { axis: 'Cost', value: 70 }
            ],
            flow: [
                { source: 'Website', target: 'Leads', value: 100 },
                { source: 'Social', target: 'Leads', value: 80 },
                { source: 'Leads', target: 'Trials', value: 120 },
                { source: 'Trials', target: 'Customers', value: 60 }
            ]
        };
    }

    createUI() {
        const container = document.getElementById('demo');
        container.innerHTML = `
            <div class="visualizer-container">
                <div class="control-panel">
                    <div class="controls-grid">
                        <div class="control-group">
                            <label class="control-label">Chart Type</label>
                            <select id="chartTypeSelect" class="control-select">
                                <option value="all">All Charts</option>
                                <option value="bar3d">3D Bar Chart</option>
                                <option value="donut">Donut Chart</option>
                                <option value="heatmap">Heat Map</option>
                                <option value="line">Line Chart</option>
                                <option value="radar">Radar Chart</option>
                                <option value="flow">Flow Diagram</option>
                            </select>
                        </div>
                        <div class="control-group">
                            <label class="control-label">Color Scheme</label>
                            <select id="colorSchemeSelect" class="control-select">
                                <option value="cyber">Cyber (Default)</option>
                                <option value="ocean">Ocean Blue</option>
                                <option value="sunset">Sunset</option>
                                <option value="forest">Forest</option>
                                <option value="neon">Neon Party</option>
                            </select>
                        </div>
                        <div class="control-group">
                            <label class="control-label">Data Range</label>
                            <input type="range" id="dataRange" class="control-input" min="10" max="100" value="50">
                        </div>
                        <div class="control-group">
                            <label class="control-label">Actions</label>
                            <div class="control-buttons">
                                <button id="realtimeToggle" class="ctrl-btn">
                                    <span class="realtime-indicator">
                                        <span class="realtime-dot"></span>
                                        Start Live
                                    </span>
                                </button>
                                <button id="exportBtn" class="ctrl-btn">Export Data</button>
                                <button id="refreshBtn" class="ctrl-btn">Refresh</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-value" id="totalRevenue">$0</div>
                        <div class="stat-label">Total Revenue</div>
                        <div class="stat-change positive" id="revenueChange">+0%</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value" id="avgValue">0</div>
                        <div class="stat-label">Average Value</div>
                        <div class="stat-change positive" id="avgChange">+0%</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value" id="peakValue">0</div>
                        <div class="stat-label">Peak Value</div>
                        <div class="stat-change positive" id="peakChange">+0%</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value" id="dataPoints">0</div>
                        <div class="stat-label">Data Points</div>
                        <div class="stat-change positive">Active</div>
                    </div>
                </div>

                <div id="chartsContainer" class="charts-grid"></div>

                <div class="data-table-container">
                    <div class="chart-header">
                        <h3 class="chart-title">📊 Real-time Data Stream</h3>
                    </div>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Timestamp</th>
                                <th>Category</th>
                                <th>Value</th>
                                <th>Change</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody id="dataTableBody"></tbody>
                    </table>
                </div>
            </div>

            <div id="exportModal" class="modal-overlay">
                <div class="modal-content">
                    <h2 class="modal-header">Export Data</h2>
                    <div class="modal-options">
                        <label class="modal-option">
                            <input type="radio" name="exportFormat" value="json" checked>
                            <span>JSON Format (.json)</span>
                        </label>
                        <label class="modal-option">
                            <input type="radio" name="exportFormat" value="csv">
                            <span>CSV Format (.csv)</span>
                        </label>
                        <label class="modal-option">
                            <input type="radio" name="exportFormat" value="all">
                            <span>All Formats (ZIP)</span>
                        </label>
                    </div>
                    <div class="modal-actions">
                        <button class="modal-btn modal-btn-secondary" id="cancelExport">Cancel</button>
                        <button class="modal-btn modal-btn-primary" id="confirmExport">Export</button>
                    </div>
                </div>
            </div>
        `;

        this.updateStats();
    }

    renderAllCharts() {
        const container = document.getElementById('chartsContainer');
        container.innerHTML = `
            <div class="chart-container" data-chart="bar3d">
                <div class="chart-header">
                    <h3 class="chart-title">📊 3D Bar Chart</h3>
                    <div class="chart-actions">
                        <button class="chart-action-btn" title="Zoom In">🔍</button>
                        <button class="chart-action-btn" title="Download">💾</button>
                    </div>
                </div>
                <div class="chart-canvas" id="bar3dChart"></div>
                <div class="chart-legend" id="bar3dLegend"></div>
            </div>

            <div class="chart-container" data-chart="donut">
                <div class="chart-header">
                    <h3 class="chart-title">🍩 Revenue Distribution</h3>
                    <div class="chart-actions">
                        <button class="chart-action-btn" title="Zoom In">🔍</button>
                        <button class="chart-action-btn" title="Download">💾</button>
                    </div>
                </div>
                <div class="chart-canvas" id="donutChart"></div>
                <div class="chart-legend" id="donutLegend"></div>
            </div>

            <div class="chart-container" data-chart="heatmap">
                <div class="chart-header">
                    <h3 class="chart-title">🔥 Activity Heat Map</h3>
                    <div class="chart-actions">
                        <button class="chart-action-btn" title="Zoom In">🔍</button>
                        <button class="chart-action-btn" title="Download">💾</button>
                    </div>
                </div>
                <div class="chart-canvas" id="heatmapChart"></div>
            </div>

            <div class="chart-container" data-chart="line">
                <div class="chart-header">
                    <h3 class="chart-title">📈 Time Series Analysis</h3>
                    <div class="chart-actions">
                        <button class="chart-action-btn" title="Zoom In">🔍</button>
                        <button class="chart-action-btn" title="Download">💾</button>
                    </div>
                </div>
                <div class="chart-canvas" id="lineChart"></div>
            </div>

            <div class="chart-container" data-chart="radar">
                <div class="chart-header">
                    <h3 class="chart-title">🎯 Performance Radar</h3>
                    <div class="chart-actions">
                        <button class="chart-action-btn" title="Zoom In">🔍</button>
                        <button class="chart-action-btn" title="Download">💾</button>
                    </div>
                </div>
                <div class="chart-canvas" id="radarChart"></div>
            </div>

            <div class="chart-container" data-chart="flow">
                <div class="chart-header">
                    <h3 class="chart-title">🔄 Data Flow Diagram</h3>
                    <div class="chart-actions">
                        <button class="chart-action-btn" title="Zoom In">🔍</button>
                        <button class="chart-action-btn" title="Download">💾</button>
                    </div>
                </div>
                <div class="chart-canvas" id="flowChart"></div>
            </div>
        `;

        this.render3DBarChart();
        this.renderDonutChart();
        this.renderHeatMap();
        this.renderLineChart();
        this.renderRadarChart();
        this.renderFlowDiagram();
        this.updateDataTable();
    }

    render3DBarChart() {
        const container = document.getElementById('bar3dChart');
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const maxValue = Math.max(...this.data.revenue);
        
        container.innerHTML = '<div class="bar-3d-container">' +
            this.data.revenue.slice(0, 12).map((value, i) => {
                const height = (value / maxValue) * 100;
                return `<div class="bar-3d" style="height: ${height}%" data-value="${this.formatCurrency(value)}" title="${months[i]}"></div>`;
            }).join('') +
            '</div>';
    }

    renderDonutChart() {
        const container = document.getElementById('donutChart');
        const total = this.data.categories.reduce((sum, cat) => sum + cat.value, 0);
        
        let currentAngle = 0;
        const segments = this.data.categories.map(cat => {
            const angle = (cat.value / total) * 360;
            const segment = `
                <div class="donut-segment" style="
                    background: conic-gradient(from ${currentAngle}deg, ${cat.color} 0deg ${angle}deg, transparent ${angle}deg 360deg);
                "></div>
            `;
            currentAngle += angle;
            return segment;
        }).join('');

        container.innerHTML = `
            <div class="donut-chart">
                ${segments}
                <div class="donut-center">
                    <div class="donut-total">${total}%</div>
                    <div class="donut-label">Total</div>
                </div>
            </div>
        `;

        const legend = document.getElementById('donutLegend');
        legend.innerHTML = this.data.categories.map(cat => `
            <div class="legend-item">
                <div class="legend-color" style="background: ${cat.color};"></div>
                <span>${cat.name} ${cat.value}%</span>
            </div>
        `).join('');
    }

    renderHeatMap() {
        const container = document.getElementById('heatmapChart');
        const allValues = this.data.heatmap.flat();
        const maxValue = Math.max(...allValues);
        
        container.innerHTML = '<div class="heatmap-grid">' +
            this.data.heatmap.flat().map(value => {
                const intensity = value / maxValue;
                const color = this.getHeatMapColor(intensity);
                return `<div class="heatmap-cell" style="background: ${color};" data-value="${value}"></div>`;
            }).join('') +
            '</div>';
    }

    getHeatMapColor(intensity) {
        const colors = [
            { stop: 0, color: [0, 0, 50] },
            { stop: 0.5, color: [0, 255, 255] },
            { stop: 1, color: [255, 0, 255] }
        ];
        
        let lower = colors[0];
        let upper = colors[1];
        
        if (intensity > 0.5) {
            lower = colors[1];
            upper = colors[2];
            intensity = (intensity - 0.5) * 2;
        } else {
            intensity = intensity * 2;
        }
        
        const r = Math.round(lower.color[0] + (upper.color[0] - lower.color[0]) * intensity);
        const g = Math.round(lower.color[1] + (upper.color[1] - lower.color[1]) * intensity);
        const b = Math.round(lower.color[2] + (upper.color[2] - lower.color[2]) * intensity);
        
        return `rgb(${r}, ${g}, ${b})`;
    }

    renderLineChart() {
        const container = document.getElementById('lineChart');
        const width = container.offsetWidth;
        const height = container.offsetHeight;
        const padding = 40;
        
        const maxValue = Math.max(...this.data.timeSeries.map(d => d.value));
        const minValue = Math.min(...this.data.timeSeries.map(d => d.value));
        
        const xScale = (width - padding * 2) / (this.data.timeSeries.length - 1);
        const yScale = (height - padding * 2) / (maxValue - minValue);
        
        let pathData = '';
        let areaData = '';
        let dots = '';
        
        this.data.timeSeries.forEach((point, i) => {
            const x = padding + i * xScale;
            const y = height - padding - (point.value - minValue) * yScale;
            
            if (i === 0) {
                pathData = `M ${x} ${y}`;
                areaData = `M ${x} ${height - padding} L ${x} ${y}`;
            } else {
                pathData += ` L ${x} ${y}`;
                areaData += ` L ${x} ${y}`;
            }
            
            dots += `<circle class="chart-dot" cx="${x}" cy="${y}" r="5" data-value="${point.value.toFixed(1)}"/>`;
        });
        
        areaData += ` L ${width - padding} ${height - padding} Z`;
        
        container.innerHTML = `
            <svg class="line-chart-svg" viewBox="0 0 ${width} ${height}">
                <defs>
                    <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:#00ffff;stop-opacity:0.6" />
                        <stop offset="100%" style="stop-color:#00ffff;stop-opacity:0.1" />
                    </linearGradient>
                </defs>
                <path class="area-path" d="${areaData}" />
                <path class="line-path" d="${pathData}" style="stroke-dasharray: 2000; stroke-dashoffset: 0;"/>
                ${dots}
            </svg>
        `;
    }

    renderRadarChart() {
        const container = document.getElementById('radarChart');
        const width = container.offsetWidth;
        const height = container.offsetHeight;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 2 - 40;
        const levels = 5;
        
        const angleStep = (Math.PI * 2) / this.data.radar.length;
        
        let gridPaths = '';
        for (let i = 1; i <= levels; i++) {
            const r = (radius / levels) * i;
            let points = '';
            this.data.radar.forEach((_, index) => {
                const angle = angleStep * index - Math.PI / 2;
                const x = centerX + Math.cos(angle) * r;
                const y = centerY + Math.sin(angle) * r;
                points += `${x},${y} `;
            });
            gridPaths += `<polygon class="radar-grid" points="${points}" />`;
        }
        
        let dataPoints = '';
        let labels = '';
        this.data.radar.forEach((item, index) => {
            const angle = angleStep * index - Math.PI / 2;
            const value = (item.value / 100) * radius;
            const x = centerX + Math.cos(angle) * value;
            const y = centerY + Math.sin(angle) * value;
            dataPoints += `${x},${y} `;
            
            const labelX = centerX + Math.cos(angle) * (radius + 25);
            const labelY = centerY + Math.sin(angle) * (radius + 25);
            labels += `<text x="${labelX}" y="${labelY}" fill="#00ffff" text-anchor="middle" font-size="12">${item.axis}</text>`;
        });
        
        container.innerHTML = `
            <svg class="radar-svg" viewBox="0 0 ${width} ${height}">
                ${gridPaths}
                <polygon class="radar-area" points="${dataPoints}" />
                ${labels}
            </svg>
        `;
    }

    renderFlowDiagram() {
        const container = document.getElementById('flowChart');
        const nodes = ['Website', 'Social', 'Leads', 'Trials', 'Customers'];
        const positions = {
            'Website': { x: 30, y: 30 },
            'Social': { x: 30, y: 120 },
            'Leads': { x: 200, y: 75 },
            'Trials': { x: 370, y: 75 },
            'Customers': { x: 540, y: 75 }
        };
        
        let html = '<div class="flow-diagram">';
        
        this.data.flow.forEach(flow => {
            const source = positions[flow.source];
            const target = positions[flow.target];
            const width = Math.sqrt(Math.pow(target.x - source.x, 2) + Math.pow(target.y - source.y, 2));
            const angle = Math.atan2(target.y - source.y, target.x - source.x) * 180 / Math.PI;
            
            html += `<div class="flow-connection" style="
                left: ${source.x + 80}px;
                top: ${source.y + 20}px;
                width: ${width - 80}px;
                transform: rotate(${angle}deg);
            "></div>`;
        });
        
        Object.entries(positions).forEach(([name, pos]) => {
            html += `<div class="flow-node" style="left: ${pos.x}px; top: ${pos.y}px;">${name}</div>`;
        });
        
        html += '</div>';
        container.innerHTML = html;
    }

    updateDataTable() {
        const tbody = document.getElementById('dataTableBody');
        const categories = ['Products', 'Services', 'Subscriptions', 'Support', 'Marketing'];
        const rows = Array.from({ length: 10 }, (_, i) => {
            const category = categories[Math.floor(Math.random() * categories.length)];
            const value = Math.floor(Math.random() * 10000) + 1000;
            const change = (Math.random() * 20 - 10).toFixed(1);
            const status = change > 0 ? 'Active' : 'Stable';
            const changeClass = change > 0 ? 'positive' : 'negative';
            
            return `
                <tr>
                    <td>${new Date(Date.now() - i * 60000).toLocaleTimeString()}</td>
                    <td>${category}</td>
                    <td>${this.formatCurrency(value)}</td>
                    <td class="stat-change ${changeClass}">${change > 0 ? '+' : ''}${change}%</td>
                    <td>${status}</td>
                </tr>
            `;
        });
        
        tbody.innerHTML = rows.join('');
    }

    updateStats() {
        const total = this.data.revenue.reduce((sum, val) => sum + val, 0);
        const avg = total / this.data.revenue.length;
        const peak = Math.max(...this.data.revenue);
        const dataPoints = this.data.revenue.length + this.data.timeSeries.length + this.data.heatmap.flat().length;
        
        document.getElementById('totalRevenue').textContent = this.formatCurrency(total);
        document.getElementById('avgValue').textContent = this.formatCurrency(avg);
        document.getElementById('peakValue').textContent = this.formatCurrency(peak);
        document.getElementById('dataPoints').textContent = dataPoints;
        
        const change = ((Math.random() * 20) - 5).toFixed(1);
        document.getElementById('revenueChange').textContent = `${change > 0 ? '+' : ''}${change}%`;
        document.getElementById('avgChange').textContent = `${change > 0 ? '+' : ''}${(change * 0.8).toFixed(1)}%`;
        document.getElementById('peakChange').textContent = `${change > 0 ? '+' : ''}${(change * 1.2).toFixed(1)}%`;
    }

    attachEventListeners() {
        // Chart type filter
        document.getElementById('chartTypeSelect').addEventListener('change', (e) => {
            const selected = e.target.value;
            document.querySelectorAll('.chart-container').forEach(chart => {
                const chartType = chart.getAttribute('data-chart');
                chart.style.display = (selected === 'all' || selected === chartType) ? 'block' : 'none';
            });
        });

        // Color scheme
        document.getElementById('colorSchemeSelect').addEventListener('change', (e) => {
            this.applyColorScheme(e.target.value);
        });

        // Data range
        document.getElementById('dataRange').addEventListener('input', (e) => {
            const range = parseInt(e.target.value);
            this.adjustDataRange(range);
        });

        // Real-time toggle
        document.getElementById('realtimeToggle').addEventListener('click', () => {
            this.toggleRealtime();
        });

        // Refresh
        document.getElementById('refreshBtn').addEventListener('click', () => {
            this.refreshData();
        });

        // Export
        document.getElementById('exportBtn').addEventListener('click', () => {
            document.getElementById('exportModal').classList.add('active');
        });

        document.getElementById('cancelExport').addEventListener('click', () => {
            document.getElementById('exportModal').classList.remove('active');
        });

        document.getElementById('confirmExport').addEventListener('click', () => {
            this.exportData();
        });

        // Chart download buttons
        document.querySelectorAll('.chart-action-btn[title="Download"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const chart = e.target.closest('.chart-container');
                this.downloadChart(chart);
            });
        });
    }

    toggleRealtime() {
        this.isRealtime = !this.isRealtime;
        const btn = document.getElementById('realtimeToggle');
        
        if (this.isRealtime) {
            btn.innerHTML = '<span class="realtime-indicator"><span class="realtime-dot"></span>Stop Live</span>';
            btn.classList.add('active');
            this.startRealtimeUpdates();
        } else {
            btn.innerHTML = '<span class="realtime-indicator"><span class="realtime-dot"></span>Start Live</span>';
            btn.classList.remove('active');
            this.stopRealtimeUpdates();
        }
    }

    startRealtimeUpdates() {
        this.realtimeInterval = setInterval(() => {
            this.data.revenue = this.data.revenue.map(v => 
                Math.max(10000, v + (Math.random() * 10000 - 5000))
            );
            
            this.data.timeSeries.shift();
            this.data.timeSeries.push({
                date: this.data.timeSeries[this.data.timeSeries.length - 1].date + 1,
                value: Math.sin(Date.now() / 1000) * 30 + 50 + Math.random() * 10
            });
            
            this.render3DBarChart();
            this.renderLineChart();
            this.updateStats();
            this.updateDataTable();
            
            this.addGlitchEffect();
        }, 2000);
    }

    stopRealtimeUpdates() {
        if (this.realtimeInterval) {
            clearInterval(this.realtimeInterval);
            this.realtimeInterval = null;
        }
    }

    refreshData() {
        this.data = this.generateInitialData();
        this.renderAllCharts();
        this.updateStats();
        
        const btn = document.getElementById('refreshBtn');
        btn.textContent = 'Refreshing...';
        btn.classList.add('loading');
        
        setTimeout(() => {
            btn.textContent = 'Refresh';
            btn.classList.remove('loading');
        }, 1000);
    }

    applyColorScheme(scheme) {
        const schemes = {
            cyber: ['#00ffff', '#ff00ff', '#00ff41', '#ffa502'],
            ocean: ['#0077be', '#00a8e8', '#00dcff', '#48e5c2'],
            sunset: ['#ff6b6b', '#ff8787', '#ffa07a', '#ffbe7a'],
            forest: ['#2ecc71', '#27ae60', '#1abc9c', '#16a085'],
            neon: ['#ff00ff', '#00ffff', '#ffff00', '#ff00aa']
        };
        
        const colors = schemes[scheme] || schemes.cyber;
        this.data.categories.forEach((cat, i) => {
            cat.color = colors[i % colors.length];
        });
        
        this.renderDonutChart();
        document.documentElement.style.setProperty('--primary', colors[0]);
        document.documentElement.style.setProperty('--secondary', colors[1]);
    }

    adjustDataRange(range) {
        const scale = range / 50;
        this.data.revenue = this.data.revenue.map(v => v * scale);
        this.render3DBarChart();
        this.updateStats();
    }

    exportData() {
        const format = document.querySelector('input[name="exportFormat"]:checked').value;
        
        if (format === 'json' || format === 'all') {
            const json = JSON.stringify(this.data, null, 2);
            this.downloadFile('visualizer-data.json', json, 'application/json');
        }
        
        if (format === 'csv' || format === 'all') {
            const csv = this.convertToCSV();
            this.downloadFile('visualizer-data.csv', csv, 'text/csv');
        }
        
        document.getElementById('exportModal').classList.remove('active');
    }

    convertToCSV() {
        let csv = 'Month,Revenue\n';
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        this.data.revenue.forEach((value, i) => {
            csv += `${months[i % 12]},${value}\n`;
        });
        
        csv += '\nCategory,Value\n';
        this.data.categories.forEach(cat => {
            csv += `${cat.name},${cat.value}\n`;
        });
        
        return csv;
    }

    downloadFile(filename, content, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    downloadChart(chartElement) {
        // Simulate chart download
        const chartTitle = chartElement.querySelector('.chart-title').textContent;
        const notification = document.createElement('div');
        notification.textContent = `Downloading ${chartTitle}...`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 255, 255, 0.9);
            color: #000;
            padding: 1rem 2rem;
            border-radius: 8px;
            font-weight: 600;
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2000);
    }

    addGlitchEffect() {
        const charts = document.querySelectorAll('.chart-container');
        const randomChart = charts[Math.floor(Math.random() * charts.length)];
        randomChart.classList.add('glitch-effect');
        setTimeout(() => randomChart.classList.remove('glitch-effect'), 200);
    }

    startAnimations() {
        setInterval(() => {
            if (!this.isRealtime && Math.random() > 0.7) {
                this.addGlitchEffect();
            }
        }, 5000);
    }

    formatCurrency(value) {
        return '$' + Math.round(value).toLocaleString();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait for the demo section to be available
    if (document.getElementById('demo')) {
        new DataVisualizer();
    }
});
