// ==================== CONSOLE EASTER EGG ====================

(function() {
    'use strict';
    
    // Main cyberpunk banner
    console.log(
        '%c' +
        '╔═══════════════════════════════════════╗\n' +
        '║                                       ║\n' +
        '║     WELCOME TO THE CYBERPUNK         ║\n' +
        '║          PORTFOLIO MATRIX            ║\n' +
        '║                                       ║\n' +
        '║   Built with ❤️  by Maya Smith       ║\n' +
        '║                                       ║\n' +
        '╚═══════════════════════════════════════╝',
        'color: #00f3ff; font-family: monospace; font-size: 14px; font-weight: bold; text-shadow: 0 0 10px #00f3ff;'
    );
    
    // Interested message
    console.log(
        '%cInterested in how this was built? 🤔',
        'color: #ff00ff; font-size: 16px; font-weight: bold; text-shadow: 0 0 10px #ff00ff; margin-top: 10px;'
    );
    
    // GitHub link
    console.log(
        '%cCheck out the code on GitHub! 🚀\n' +
        'https://github.com/TheLiquidIvy/portfolio-website',
        'color: #7b00ff; font-size: 14px; text-shadow: 0 0 5px #7b00ff;'
    );
    
    // Tech stack
    console.log(
        '%cTech Stack:',
        'color: #00ff00; font-size: 14px; font-weight: bold; margin-top: 10px;'
    );
    
    console.table({
        'Frontend': 'Vanilla JavaScript (ES6+)',
        'Styling': 'CSS3 with custom properties',
        'Audio': 'Web Audio API',
        'Animations': 'CSS Animations + Canvas',
        'API Integration': 'GitHub REST API',
        'Performance': 'Lazy Loading + Service Worker',
        'Accessibility': 'WCAG 2.1 AA compliant'
    });
    
    // Joke
    console.log(
        '%cWhy do programmers prefer dark mode? 🌙\n' +
        'Because light attracts bugs! 🐛😄',
        'color: #00ff00; font-size: 12px; font-style: italic; margin-top: 10px;'
    );
    
    // Hidden commands
    console.log(
        '%cHidden Features:',
        'color: #ff00ff; font-size: 14px; font-weight: bold; margin-top: 10px;'
    );
    
    console.log(
        '%c' +
        '• Press ~ to open the interactive terminal\n' +
        '• Press CTRL+P to toggle cursor effects\n' +
        '• Press CTRL+SHIFT+P for performance monitor\n' +
        '• Try the Konami Code: ↑↑↓↓←→←→BA\n' +
        '• Click the logo 10 times for a surprise\n' +
        '• Type "matrix" in terminal for full-screen effect',
        'color: #00f3ff; font-size: 12px; line-height: 1.6;'
    );
    
    // Fun ASCII art
    console.log(
        '%c' +
        '    __  ___                ____            _ __  __\n' +
        '   /  |/  /___ ___  ____ _/ __/___  ____  (_) /_/ /_\n' +
        '  / /|_/ / __ `/ / / / __ `\\__ \\/ _ \\/ __ \\/ / __/ __ \\\n' +
        ' / /  / / /_/ / /_/ / /_/ /__/ /  __/ / / / / /_/ / / /\n' +
        '/_/  /_/\\__,_/\\__, /\\__,_/____/\\___/_/ /_/_/\\__/_/ /_/\n' +
        '             /____/',
        'color: #7b00ff; font-family: monospace; font-size: 10px; line-height: 1.2;'
    );
    
    // Contact info
    console.log(
        '%cWant to collaborate? Let\'s connect! 🤝',
        'color: #ff00ff; font-size: 14px; font-weight: bold; margin-top: 10px;'
    );
    
    console.log(
        '%c' +
        '📧 Email: developer@cyberpunk.dev\n' +
        '💼 LinkedIn: linkedin.com/in/mayasmith\n' +
        '🐙 GitHub: github.com/TheLiquidIvy\n' +
        '🐦 Twitter: twitter.com/mayasmith',
        'color: #00f3ff; font-size: 12px; line-height: 1.8;'
    );
    
    // Performance tip
    console.log(
        '%cPerformance Tip:',
        'color: #00ff00; font-size: 14px; font-weight: bold; margin-top: 10px;'
    );
    
    console.log(
        '%cThis site uses lazy loading and service workers for optimal performance.\n' +
        'Check the Network tab to see it in action! ⚡',
        'color: #00ff00; font-size: 12px;'
    );
    
    // Fun developer greeting
    const hour = new Date().getHours();
    let greeting = 'Hello';
    
    if (hour < 12) {
        greeting = 'Good morning';
    } else if (hour < 18) {
        greeting = 'Good afternoon';
    } else {
        greeting = 'Good evening';
    }
    
    console.log(
        `%c${greeting}, fellow developer! 👨‍💻👩‍💻`,
        'color: #ff00ff; font-size: 16px; font-weight: bold; margin-top: 10px; text-shadow: 0 0 10px #ff00ff;'
    );
    
    // Add custom console commands
    window.portfolioCommands = {
        help: function() {
            console.log(
                '%cAvailable Console Commands:',
                'color: #00f3ff; font-size: 14px; font-weight: bold;'
            );
            console.table({
                'portfolioCommands.help()': 'Show this help message',
                'portfolioCommands.about()': 'About Maya Smith',
                'portfolioCommands.skills()': 'List technical skills',
                'portfolioCommands.contact()': 'Contact information',
                'portfolioCommands.projects()': 'Featured projects',
                'portfolioCommands.theme(name)': 'Change theme (cyberpunk, dark, neon, matrix, synthwave)',
                'portfolioCommands.credits()': 'Show credits'
            });
        },
        
        about: function() {
            console.log(
                '%cAbout Maya Smith',
                'color: #ff00ff; font-size: 16px; font-weight: bold;'
            );
            console.log(
                '%cFull Stack Developer specializing in creating innovative web experiences\n' +
                'with modern technologies and cutting-edge design.',
                'color: #ffffff; font-size: 14px;'
            );
        },
        
        skills: function() {
            console.log(
                '%cTechnical Skills:',
                'color: #00f3ff; font-size: 14px; font-weight: bold;'
            );
            console.table({
                'Frontend': 'React, Vue, JavaScript (ES6+), HTML5, CSS3',
                'Backend': 'Node.js, Python, Express, Django',
                'Database': 'MongoDB, PostgreSQL, Redis',
                'DevOps': 'Docker, Kubernetes, AWS, CI/CD',
                'Tools': 'Git, VS Code, Figma, Webpack'
            });
        },
        
        contact: function() {
            console.log(
                '%cContact Information:',
                'color: #ff00ff; font-size: 14px; font-weight: bold;'
            );
            console.log(
                '%c📧 Email: developer@cyberpunk.dev\n' +
                '📱 Phone: +27 652 460 760\n' +
                '📍 Location: Cape Town, WC',
                'color: #00f3ff; font-size: 12px; line-height: 1.8;'
            );
        },
        
        projects: function() {
            console.log(
                '%cFeatured Projects:',
                'color: #00ff00; font-size: 14px; font-weight: bold;'
            );
            console.table([
                { name: 'Crypto Tracker Pro', tech: 'React, Node.js, WebSocket', status: 'Live' },
                { name: 'Neon Dashboard', tech: 'Vue, D3.js, Express', status: 'Live' },
                { name: 'Neural Game Hub', tech: 'JavaScript, Canvas, AI', status: 'Live' },
                { name: 'Data Visualizer Pro', tech: 'React, Three.js, WebGL', status: 'Development' }
            ]);
        },
        
        theme: function(themeName) {
            const validThemes = ['cyberpunk', 'dark', 'neon', 'matrix', 'synthwave'];
            if (!themeName) {
                console.log(
                    '%cAvailable themes: ' + validThemes.join(', '),
                    'color: #00f3ff; font-size: 12px;'
                );
                return;
            }
            
            if (validThemes.includes(themeName.toLowerCase())) {
                if (window.themeManager) {
                    window.themeManager.setTheme(themeName.toLowerCase());
                    console.log(
                        `%cTheme changed to: ${themeName}`,
                        'color: #00ff00; font-size: 12px;'
                    );
                } else {
                    console.log(
                        '%cTheme manager not available',
                        'color: #ff0000; font-size: 12px;'
                    );
                }
            } else {
                console.log(
                    '%cInvalid theme. Available: ' + validThemes.join(', '),
                    'color: #ff0000; font-size: 12px;'
                );
            }
        },
        
        credits: function() {
            console.log(
                '%cCredits:',
                'color: #ff00ff; font-size: 14px; font-weight: bold;'
            );
            console.log(
                '%c' +
                '🎨 Design & Development: Maya Smith\n' +
                '🎵 Music System: Web Audio API\n' +
                '⚡ Performance: Service Workers & Lazy Loading\n' +
                '♿ Accessibility: WCAG 2.1 AA\n' +
                '🔤 Fonts: Orbitron & Rajdhani (Google Fonts)\n' +
                '🎉 Special thanks to the open source community!',
                'color: #00f3ff; font-size: 12px; line-height: 1.8;'
            );
        }
    };
    
    // Let users know about the custom commands
    console.log(
        '%cTry typing portfolioCommands.help() for custom commands! 🎮',
        'color: #ff00ff; font-size: 14px; font-weight: bold; margin-top: 15px; padding: 10px; background: rgba(255, 0, 255, 0.1); border-radius: 5px;'
    );
    
    // Easter egg counter
    let easterEggCount = 0;
    window.foundEasterEgg = function(name) {
        easterEggCount++;
        console.log(
            `%c🥚 Easter Egg Found: ${name} (${easterEggCount} total)`,
            'color: #ffff00; font-size: 14px; font-weight: bold; background: rgba(255, 255, 0, 0.2); padding: 5px;'
        );
    };
    
})();
