// ==================== PERFORMANCE MONITOR ====================

class PerformanceMonitor {
    constructor() {
        this.isActive = false;
        this.fps = 0;
        this.lastFrameTime = performance.now();
        this.frameCount = 0;
        this.animationId = null;
        this.panel = null;
        
        this.metrics = {
            fcp: 0,
            lcp: 0,
            cls: 0,
            pageSize: 0,
            requests: 0,
            images: 0
        };
        
        this.init();
    }
    
    init() {
        this.setupKeyboardShortcut();
        this.collectInitialMetrics();
    }
    
    setupKeyboardShortcut() {
        document.addEventListener('keydown', (e) => {
            // CTRL+SHIFT+P or CMD+SHIFT+P
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'P') {
                e.preventDefault();
                this.toggle();
            }
        });
    }
    
    toggle() {
        if (this.isActive) {
            this.hide();
        } else {
            this.show();
        }
    }
    
    show() {
        if (this.isActive) return;
        
        this.isActive = true;
        this.createPanel();
        this.startMonitoring();
        
        // Announce to screen readers
        this.announce('Performance monitor activated');
    }
    
    hide() {
        if (!this.isActive) return;
        
        this.isActive = false;
        this.stopMonitoring();
        
        if (this.panel) {
            this.panel.remove();
            this.panel = null;
        }
        
        this.announce('Performance monitor deactivated');
    }
    
    createPanel() {
        const panelHTML = `
            <div class="performance-monitor" id="perfMonitor" role="complementary" aria-label="Performance Monitor">
                <div class="monitor-header">
                    <span class="monitor-title">⚡ DEBUG MODE</span>
                    <button class="monitor-close" aria-label="Close monitor">×</button>
                </div>
                <div class="monitor-content">
                    <div class="metric-row">
                        <span class="metric-label">FPS:</span>
                        <span class="metric-value" id="fpsValue">--</span>
                    </div>
                    <div class="metric-row">
                        <span class="metric-label">Memory:</span>
                        <span class="metric-value" id="memoryValue">--</span>
                    </div>
                    <div class="metric-row">
                        <span class="metric-label">FCP:</span>
                        <span class="metric-value" id="fcpValue">--</span>
                    </div>
                    <div class="metric-row">
                        <span class="metric-label">LCP:</span>
                        <span class="metric-value" id="lcpValue">--</span>
                    </div>
                    <div class="metric-row">
                        <span class="metric-label">CLS:</span>
                        <span class="metric-value" id="clsValue">--</span>
                    </div>
                    <div class="metric-row">
                        <span class="metric-label">Page Size:</span>
                        <span class="metric-value" id="sizeValue">--</span>
                    </div>
                    <div class="metric-row">
                        <span class="metric-label">Requests:</span>
                        <span class="metric-value" id="requestsValue">--</span>
                    </div>
                    <div class="metric-row">
                        <span class="metric-label">Connection:</span>
                        <span class="metric-value" id="connectionValue">--</span>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', panelHTML);
        this.panel = document.getElementById('perfMonitor');
        
        // Attach close button handler
        const closeBtn = this.panel.querySelector('.monitor-close');
        closeBtn.addEventListener('click', () => this.hide());
        
        // Add styles if not already present
        this.addStyles();
    }
    
    addStyles() {
        if (document.getElementById('perfMonitorStyles')) return;
        
        const style = document.createElement('style');
        style.id = 'perfMonitorStyles';
        style.textContent = `
            .performance-monitor {
                position: fixed;
                top: 80px;
                right: 20px;
                width: 250px;
                background: rgba(0, 10, 0, 0.95);
                backdrop-filter: blur(10px);
                border: 2px solid #00ff00;
                border-radius: 8px;
                padding: 0;
                z-index: 99999;
                font-family: 'Courier New', monospace;
                color: #00ff00;
                box-shadow: 0 0 20px rgba(0, 255, 0, 0.5);
                animation: slideInRight 0.3s ease;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(300px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            .monitor-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 15px;
                background: rgba(0, 255, 0, 0.1);
                border-bottom: 1px solid #00ff00;
            }
            
            .monitor-title {
                font-size: 12px;
                font-weight: bold;
                letter-spacing: 1px;
                text-shadow: 0 0 5px #00ff00;
            }
            
            .monitor-close {
                background: none;
                border: none;
                color: #00ff00;
                font-size: 24px;
                cursor: pointer;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
            }
            
            .monitor-close:hover {
                color: #ff0000;
                transform: rotate(90deg);
            }
            
            .monitor-content {
                padding: 15px;
            }
            
            .metric-row {
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;
                font-size: 13px;
            }
            
            .metric-row:last-child {
                margin-bottom: 0;
            }
            
            .metric-label {
                color: rgba(0, 255, 0, 0.7);
            }
            
            .metric-value {
                color: #00ff00;
                font-weight: bold;
                text-shadow: 0 0 5px #00ff00;
            }
            
            @media (max-width: 768px) {
                .performance-monitor {
                    top: 70px;
                    right: 10px;
                    width: 220px;
                    font-size: 11px;
                }
            }
            
            @media (prefers-reduced-motion: reduce) {
                .performance-monitor {
                    animation: none !important;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
    
    startMonitoring() {
        this.updateMetrics();
        this.measureFPS();
    }
    
    stopMonitoring() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
    
    measureFPS() {
        if (!this.isActive) return;
        
        const now = performance.now();
        this.frameCount++;
        
        if (now >= this.lastFrameTime + 1000) {
            this.fps = Math.round((this.frameCount * 1000) / (now - this.lastFrameTime));
            this.frameCount = 0;
            this.lastFrameTime = now;
            
            this.updateFPSDisplay();
        }
        
        this.animationId = requestAnimationFrame(() => this.measureFPS());
    }
    
    updateFPSDisplay() {
        const fpsElement = document.getElementById('fpsValue');
        if (fpsElement) {
            fpsElement.textContent = this.fps;
            
            // Color code based on FPS
            if (this.fps >= 50) {
                fpsElement.style.color = '#00ff00';
            } else if (this.fps >= 30) {
                fpsElement.style.color = '#ffff00';
            } else {
                fpsElement.style.color = '#ff0000';
            }
        }
    }
    
    updateMetrics() {
        if (!this.isActive) return;
        
        // Memory usage (if available)
        if (performance.memory) {
            const usedMemory = (performance.memory.usedJSHeapSize / 1048576).toFixed(2);
            const totalMemory = (performance.memory.totalJSHeapSize / 1048576).toFixed(2);
            const memoryElement = document.getElementById('memoryValue');
            if (memoryElement) {
                memoryElement.textContent = `${usedMemory}/${totalMemory} MB`;
            }
        } else {
            const memoryElement = document.getElementById('memoryValue');
            if (memoryElement) {
                memoryElement.textContent = 'N/A';
            }
        }
        
        // Page load metrics
        this.updateLoadMetrics();
        
        // Resource metrics
        this.updateResourceMetrics();
        
        // Connection info
        this.updateConnectionInfo();
        
        // Update every second
        setTimeout(() => this.updateMetrics(), 1000);
    }
    
    updateLoadMetrics() {
        try {
            // Performance observer for paint metrics
            const paintEntries = performance.getEntriesByType('paint');
            
            paintEntries.forEach(entry => {
                if (entry.name === 'first-contentful-paint') {
                    const fcpElement = document.getElementById('fcpValue');
                    if (fcpElement) {
                        fcpElement.textContent = `${(entry.startTime / 1000).toFixed(2)}s`;
                    }
                }
            });
            
            // LCP (if available via PerformanceObserver)
            if ('PerformanceObserver' in window) {
                try {
                    const lcpObserver = new PerformanceObserver((list) => {
                        const entries = list.getEntries();
                        const lastEntry = entries[entries.length - 1];
                        const lcpElement = document.getElementById('lcpValue');
                        if (lcpElement && lastEntry) {
                            lcpElement.textContent = `${(lastEntry.startTime / 1000).toFixed(2)}s`;
                        }
                    });
                    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
                } catch (e) {
                    // LCP not supported
                }
            }
            
            // Navigation timing
            const navTiming = performance.getEntriesByType('navigation')[0];
            if (navTiming) {
                const loadTime = navTiming.loadEventEnd - navTiming.loadEventStart;
                // Could display this if needed
            }
        } catch (e) {
            console.error('Error updating load metrics:', e);
        }
    }
    
    updateResourceMetrics() {
        try {
            const resources = performance.getEntriesByType('resource');
            
            let totalSize = 0;
            let imageCount = 0;
            
            resources.forEach(resource => {
                if (resource.transferSize) {
                    totalSize += resource.transferSize;
                }
                if (resource.initiatorType === 'img') {
                    imageCount++;
                }
            });
            
            const sizeElement = document.getElementById('sizeValue');
            if (sizeElement) {
                const sizeMB = (totalSize / 1048576).toFixed(2);
                sizeElement.textContent = `${sizeMB} MB`;
            }
            
            const requestsElement = document.getElementById('requestsValue');
            if (requestsElement) {
                requestsElement.textContent = `${resources.length} (${imageCount} imgs)`;
            }
        } catch (e) {
            console.error('Error updating resource metrics:', e);
        }
    }
    
    updateConnectionInfo() {
        const connectionElement = document.getElementById('connectionValue');
        if (!connectionElement) return;
        
        if ('connection' in navigator) {
            const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            if (conn) {
                connectionElement.textContent = conn.effectiveType || conn.type || 'Unknown';
            } else {
                connectionElement.textContent = 'Unknown';
            }
        } else {
            connectionElement.textContent = 'N/A';
        }
    }
    
    collectInitialMetrics() {
        // CLS tracking
        if ('PerformanceObserver' in window) {
            try {
                let clsValue = 0;
                const clsObserver = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        if (!entry.hadRecentInput) {
                            clsValue += entry.value;
                            const clsElement = document.getElementById('clsValue');
                            if (clsElement) {
                                clsElement.textContent = clsValue.toFixed(3);
                                
                                // Color code
                                if (clsValue < 0.1) {
                                    clsElement.style.color = '#00ff00';
                                } else if (clsValue < 0.25) {
                                    clsElement.style.color = '#ffff00';
                                } else {
                                    clsElement.style.color = '#ff0000';
                                }
                            }
                        }
                    }
                });
                clsObserver.observe({ entryTypes: ['layout-shift'] });
            } catch (e) {
                // CLS not supported
            }
        }
    }
    
    announce(message) {
        // Create live region for screen reader announcements
        let liveRegion = document.getElementById('perfMonitorAnnounce');
        if (!liveRegion) {
            liveRegion = document.createElement('div');
            liveRegion.id = 'perfMonitorAnnounce';
            liveRegion.className = 'sr-only';
            liveRegion.setAttribute('role', 'status');
            liveRegion.setAttribute('aria-live', 'polite');
            document.body.appendChild(liveRegion);
        }
        
        liveRegion.textContent = message;
    }
}

// Initialize performance monitor
let performanceMonitor;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        performanceMonitor = new PerformanceMonitor();
        window.performanceMonitor = performanceMonitor;
    });
} else {
    performanceMonitor = new PerformanceMonitor();
    window.performanceMonitor = performanceMonitor;
}

// Add hint in console
console.log(
    '%cPress CTRL+SHIFT+P to toggle the performance monitor',
    'color: #00ff00; font-size: 12px; font-weight: bold;'
);
