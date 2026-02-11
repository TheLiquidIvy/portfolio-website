// ==================== EMBEDDABLE PORTFOLIO WIDGET ====================
// Usage: <script src="https://theliquidivyfile.github.io/portfolio-website/embed.js"></script>
// Then add: <div id="portfolio-widget" data-theme="dark" data-style="card"></div>

(function() {
    'use strict';
    
    const WIDGET_VERSION = '1.0.0';
    const API_BASE = 'https://theliquidivyfile.github.io/portfolio-website/api/';
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }
    
    function initWidget() {
        const containers = document.querySelectorAll('#portfolio-widget');
        
        containers.forEach(container => {
            const theme = container.getAttribute('data-theme') || 'dark';
            const style = container.getAttribute('data-style') || 'card';
            
            loadPortfolioData().then(data => {
                renderWidget(container, data, theme, style);
            }).catch(error => {
                console.error('[Portfolio Widget] Failed to load:', error);
                container.innerHTML = '<p style="color: red;">Failed to load portfolio widget</p>';
            });
        });
    }
    
    async function loadPortfolioData() {
        const response = await fetch(`${API_BASE}portfolio.json`);
        if (!response.ok) {
            throw new Error('Failed to fetch portfolio data');
        }
        return response.json();
    }
    
    function renderWidget(container, data, theme, style) {
        // Inject styles
        injectStyles(theme);
        
        // Render based on style
        if (style === 'card') {
            renderCard(container, data, theme);
        } else if (style === 'minimal') {
            renderMinimal(container, data, theme);
        } else if (style === 'stats') {
            renderStats(container, data, theme);
        }
        
        console.log(`[Portfolio Widget] v${WIDGET_VERSION} loaded successfully`);
    }
    
    function renderCard(container, data, theme) {
        const isDark = theme === 'dark';
        const bgColor = isDark ? '#0a0a0f' : '#ffffff';
        const textColor = isDark ? '#ffffff' : '#000000';
        const accentColor = isDark ? '#00ffff' : '#0066cc';
        const borderColor = isDark ? 'rgba(0, 255, 255, 0.3)' : '#e0e0e0';
        
        container.innerHTML = `
            <div class="portfolio-widget-card" style="
                background: ${bgColor};
                color: ${textColor};
                padding: 30px;
                border-radius: 12px;
                border: 2px solid ${borderColor};
                max-width: 400px;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
            ">
                <div style="text-align: center; margin-bottom: 20px;">
                    <div style="
                        width: 80px;
                        height: 80px;
                        background: linear-gradient(135deg, #00ffff, #ff00ff);
                        border-radius: 50%;
                        margin: 0 auto 15px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 36px;
                    ">👨‍💻</div>
                    <h3 style="margin: 0 0 5px 0; color: ${accentColor}; font-size: 1.5em;">${data.name}</h3>
                    <p style="margin: 0; color: ${textColor}; opacity: 0.8;">${data.title}</p>
                </div>
                
                <p style="text-align: center; margin: 15px 0; line-height: 1.6; opacity: 0.9;">
                    ${data.about.summary.substring(0, 120)}...
                </p>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0;">
                    <div style="text-align: center; padding: 15px; background: ${isDark ? 'rgba(0, 255, 255, 0.1)' : '#f5f5f5'}; border-radius: 8px;">
                        <div style="font-size: 1.8em; font-weight: bold; color: ${accentColor};">${data.stats.projects_completed}</div>
                        <div style="font-size: 0.85em; opacity: 0.8;">Projects</div>
                    </div>
                    <div style="text-align: center; padding: 15px; background: ${isDark ? 'rgba(0, 255, 255, 0.1)' : '#f5f5f5'}; border-radius: 8px;">
                        <div style="font-size: 1.8em; font-weight: bold; color: ${accentColor};">${data.stats.years_experience}+</div>
                        <div style="font-size: 0.85em; opacity: 0.8;">Years Exp</div>
                    </div>
                </div>
                
                <div style="display: flex; justify-content: center; gap: 10px; margin-top: 20px;">
                    <a href="${data.contact.website}" target="_blank" style="
                        padding: 10px 20px;
                        background: linear-gradient(45deg, #00ffff, #ff00ff);
                        color: #000;
                        text-decoration: none;
                        border-radius: 6px;
                        font-weight: 600;
                        display: inline-block;
                    ">View Portfolio</a>
                </div>
                
                <div style="text-align: center; margin-top: 15px; font-size: 0.75em; opacity: 0.6;">
                    Powered by <a href="${data.contact.website}" target="_blank" style="color: ${accentColor};">Portfolio Widget</a>
                </div>
            </div>
        `;
    }
    
    function renderMinimal(container, data, theme) {
        const isDark = theme === 'dark';
        const textColor = isDark ? '#ffffff' : '#000000';
        const accentColor = isDark ? '#00ffff' : '#0066cc';
        
        container.innerHTML = `
            <div class="portfolio-widget-minimal" style="
                color: ${textColor};
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                padding: 15px;
            ">
                <div style="display: flex; align-items: center; gap: 15px;">
                    <div style="
                        width: 50px;
                        height: 50px;
                        background: linear-gradient(135deg, #00ffff, #ff00ff);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 24px;
                    ">👨‍💻</div>
                    <div style="flex: 1;">
                        <h4 style="margin: 0; color: ${accentColor};">${data.name}</h4>
                        <p style="margin: 5px 0 0 0; font-size: 0.9em; opacity: 0.8;">${data.title}</p>
                    </div>
                    <a href="${data.contact.website}" target="_blank" style="
                        padding: 8px 16px;
                        background: ${accentColor};
                        color: white;
                        text-decoration: none;
                        border-radius: 5px;
                        font-size: 0.85em;
                        font-weight: 600;
                    ">Visit →</a>
                </div>
            </div>
        `;
    }
    
    function renderStats(container, data, theme) {
        const isDark = theme === 'dark';
        const bgColor = isDark ? '#0a0a0f' : '#f8f8f8';
        const textColor = isDark ? '#ffffff' : '#000000';
        const accentColor = isDark ? '#00ffff' : '#0066cc';
        
        container.innerHTML = `
            <div class="portfolio-widget-stats" style="
                background: ${bgColor};
                color: ${textColor};
                padding: 20px;
                border-radius: 10px;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            ">
                <h4 style="margin: 0 0 15px 0; color: ${accentColor};">${data.name} - Portfolio Stats</h4>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
                    <div style="padding: 10px; text-align: center; background: ${isDark ? 'rgba(0, 255, 255, 0.1)' : '#ffffff'}; border-radius: 6px;">
                        <div style="font-size: 1.5em; font-weight: bold; color: ${accentColor};">${data.stats.projects_completed}</div>
                        <div style="font-size: 0.8em; opacity: 0.8;">Projects</div>
                    </div>
                    <div style="padding: 10px; text-align: center; background: ${isDark ? 'rgba(0, 255, 255, 0.1)' : '#ffffff'}; border-radius: 6px;">
                        <div style="font-size: 1.5em; font-weight: bold; color: ${accentColor};">${data.stats.blog_posts}</div>
                        <div style="font-size: 0.8em; opacity: 0.8;">Blog Posts</div>
                    </div>
                    <div style="padding: 10px; text-align: center; background: ${isDark ? 'rgba(0, 255, 255, 0.1)' : '#ffffff'}; border-radius: 6px;">
                        <div style="font-size: 1.5em; font-weight: bold; color: ${accentColor};">${data.stats.github_stars}</div>
                        <div style="font-size: 0.8em; opacity: 0.8;">GitHub Stars</div>
                    </div>
                    <div style="padding: 10px; text-align: center; background: ${isDark ? 'rgba(0, 255, 255, 0.1)' : '#ffffff'}; border-radius: 6px;">
                        <div style="font-size: 1.5em; font-weight: bold; color: ${accentColor};">${data.stats.years_experience}+</div>
                        <div style="font-size: 0.8em; opacity: 0.8;">Years</div>
                    </div>
                </div>
                <div style="text-align: center; margin-top: 15px;">
                    <a href="${data.contact.website}" target="_blank" style="
                        color: ${accentColor};
                        text-decoration: none;
                        font-size: 0.85em;
                    ">View Full Portfolio →</a>
                </div>
            </div>
        `;
    }
    
    function injectStyles(theme) {
        if (document.getElementById('portfolio-widget-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'portfolio-widget-styles';
        style.textContent = `
            .portfolio-widget-card:hover {
                transform: translateY(-5px);
                transition: transform 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Export for direct use
    window.PortfolioWidget = {
        version: WIDGET_VERSION,
        init: initWidget
    };
    
    console.log(`[Portfolio Widget] v${WIDGET_VERSION} initialized`);
})();
