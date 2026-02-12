// ==================== TERMINAL SYSTEM ====================

class Terminal {
    constructor() {
        this.history = [];
        this.historyIndex = -1;
        this.isOpen = false;
        this.commands = this.initCommands();
        this.initTerminal();
        this.setupKeyboardShortcuts();
    }

    initTerminal() {
        // Create terminal overlay
        const overlay = document.createElement('div');
        overlay.className = 'terminal-overlay';
        overlay.id = 'terminal-overlay';
        
        overlay.innerHTML = `
            <div class="terminal-window" onclick="event.stopPropagation()">
                <div class="terminal-header">
                    <span class="terminal-header-title">Cyberpunk Terminal v2.0</span>
                    <button class="terminal-close" onclick="terminal.close()">&times;</button>
                </div>
                <div class="terminal-content" id="terminal-content">
                    <div class="terminal-banner">${this.getBanner()}</div>
                    <div class="terminal-line">
                        <span class="terminal-output info">Type 'help' for available commands</span>
                    </div>
                </div>
                <div class="terminal-input-line">
                    <span class="terminal-prompt">visitor@cyberpunk:~$</span>
                    <input type="text" 
                           class="terminal-input" 
                           id="terminal-input" 
                           autocomplete="off"
                           spellcheck="false">
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        // Event listeners
        const input = document.getElementById('terminal-input');
        input.addEventListener('keydown', (e) => this.handleKeydown(e));
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.close();
            }
        });
    }

    getBanner() {
        return `
   ____      _                                  _    
  / ___|   _| |__   ___ _ __ _ __  _   _ _ __ | | __
 | |  | | | | '_ \\ / _ \\ '__| '_ \\| | | | '_ \\| |/ /
 | |__| |_| | |_) |  __/ |  | |_) | |_| | | | |   < 
  \\____\\__, |_.__/ \\___|_|  | .__/ \\__,_|_| |_|_|\\_\\
       |___/                |_|                      
       
        `;
    }

    initCommands() {
        return {
            help: {
                description: 'Show all available commands',
                execute: () => this.showHelp()
            },
            ls: {
                description: 'List projects (optional: frontend, fullstack)',
                execute: (args) => this.listProjects(args[0])
            },
            cd: {
                description: 'Navigate to a project',
                execute: (args) => this.navigateToProject(args[0])
            },
            cat: {
                description: 'Display file contents (about.txt, skills.txt, contact.txt)',
                execute: (args) => this.catFile(args[0])
            },
            whoami: {
                description: 'Display developer info',
                execute: () => this.whoami()
            },
            clear: {
                description: 'Clear terminal',
                execute: () => this.clearTerminal()
            },
            matrix: {
                description: 'Trigger matrix rain animation',
                execute: () => this.triggerMatrix()
            },
            theme: {
                description: 'Switch themes (cyberpunk/dark/neon)',
                execute: (args) => this.switchTheme(args[0])
            },
            stats: {
                description: 'Show portfolio statistics',
                execute: () => this.showStats()
            },
            social: {
                description: 'Display social media links',
                execute: () => this.showSocial()
            },
            coffee: {
                description: 'Show coffee counter animation',
                execute: () => this.showCoffee()
            },
            easteregg: {
                description: 'Secret surprise',
                execute: () => this.easterEgg()
            },
            exit: {
                description: 'Close terminal',
                execute: () => this.close()
            }
        };
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // ~ key to open terminal
            if (e.key === '`' && !this.isOpen) {
                e.preventDefault();
                this.open();
            }
            // ESC to close terminal
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }

    handleKeydown(e) {
        const input = e.target;
        
        switch(e.key) {
            case 'Enter':
                e.preventDefault();
                this.executeCommand(input.value.trim());
                input.value = '';
                this.historyIndex = -1;
                break;
            
            case 'ArrowUp':
                e.preventDefault();
                this.navigateHistory('up');
                break;
            
            case 'ArrowDown':
                e.preventDefault();
                this.navigateHistory('down');
                break;
            
            case 'Tab':
                e.preventDefault();
                this.autocomplete(input.value);
                break;
        }
    }

    navigateHistory(direction) {
        const input = document.getElementById('terminal-input');
        
        if (direction === 'up') {
            if (this.historyIndex < this.history.length - 1) {
                this.historyIndex++;
                input.value = this.history[this.history.length - 1 - this.historyIndex];
            }
        } else {
            if (this.historyIndex > 0) {
                this.historyIndex--;
                input.value = this.history[this.history.length - 1 - this.historyIndex];
            } else if (this.historyIndex === 0) {
                this.historyIndex = -1;
                input.value = '';
            }
        }
    }

    autocomplete(partial) {
        if (!partial) return;
        
        const matches = Object.keys(this.commands).filter(cmd => 
            cmd.startsWith(partial.toLowerCase())
        );
        
        if (matches.length === 1) {
            document.getElementById('terminal-input').value = matches[0];
        } else if (matches.length > 1) {
            this.addOutput(`Possible commands: ${matches.join(', ')}`, 'info');
        }
    }

    executeCommand(commandStr) {
        if (!commandStr) return;
        
        // Add to history
        this.history.push(commandStr);
        
        // Display command
        this.addLine(`visitor@cyberpunk:~$ ${commandStr}`);
        
        // Parse command
        const [cmd, ...args] = commandStr.split(' ');
        const command = this.commands[cmd.toLowerCase()];
        
        if (command) {
            command.execute(args);
        } else {
            this.addOutput(`Command not found: ${cmd}. Type 'help' for available commands.`, 'error');
        }
        
        this.scrollToBottom();
    }

    addLine(text, className = '') {
        const content = document.getElementById('terminal-content');
        const line = document.createElement('div');
        line.className = `terminal-line ${className}`;
        line.textContent = text;
        content.appendChild(line);
    }

    addOutput(text, type = '') {
        const content = document.getElementById('terminal-content');
        const output = document.createElement('div');
        output.className = `terminal-line`;
        output.innerHTML = `<span class="terminal-output ${type}">${text}</span>`;
        content.appendChild(output);
    }

    scrollToBottom() {
        const content = document.getElementById('terminal-content');
        content.scrollTop = content.scrollHeight;
    }

    open() {
        const overlay = document.getElementById('terminal-overlay');
        overlay.classList.add('active');
        this.isOpen = true;
        
        setTimeout(() => {
            const input = document.getElementById('terminal-input');
            input.focus();
        }, 300);
    }

    close() {
        const overlay = document.getElementById('terminal-overlay');
        overlay.classList.remove('active');
        this.isOpen = false;
    }

    // ==================== COMMAND IMPLEMENTATIONS ====================

    showHelp() {
        this.addOutput('Available Commands:', 'info');
        this.addOutput('─'.repeat(60), 'info');
        
        Object.entries(this.commands).forEach(([cmd, info]) => {
            const spacing = ' '.repeat(20 - cmd.length);
            this.addOutput(`  ${cmd}${spacing}${info.description}`, 'success');
        });
        
        this.addOutput('─'.repeat(60), 'info');
    }

    listProjects(category) {
        const projects = {
            frontend: [
                'crypto-tracker',
                'neon-dashboard',
                'portfolio-builder',
                'data-visualizer-pro',
                'neural-game-hub',
                'task-matrix'
            ],
            fullstack: [
                'devops-dashboard',
                'social-nexus',
                'cloud-storage-pro',
                'ai-content-generator',
                'ecommerce-engine',
                'team-collaboration-hub',
                'streaming-platform'
            ]
        };
        
        if (!category) {
            this.addOutput('Projects:', 'info');
            this.addOutput(`Frontend: ${projects.frontend.length} projects`, 'success');
            this.addOutput(`Fullstack: ${projects.fullstack.length} projects`, 'success');
            this.addOutput('\nUse "ls frontend" or "ls fullstack" to see specific projects', 'warning');
        } else if (category === 'frontend') {
            this.addOutput('Frontend Projects:', 'info');
            projects.frontend.forEach(p => this.addOutput(`  📁 ${p}`, 'success'));
        } else if (category === 'fullstack') {
            this.addOutput('Fullstack Projects:', 'info');
            projects.fullstack.forEach(p => this.addOutput(`  📁 ${p}`, 'success'));
        } else {
            this.addOutput(`Unknown category: ${category}`, 'error');
        }
    }

    navigateToProject(projectName) {
        if (!projectName) {
            this.addOutput('Usage: cd <project-name>', 'error');
            return;
        }
        
        // Check if project exists
        const frontendProjects = ['crypto-tracker', 'neon-dashboard', 'portfolio-builder', 
                                  'data-visualizer-pro', 'neural-game-hub', 'task-matrix'];
        const fullstackProjects = ['devops-dashboard', 'social-nexus', 'cloud-storage-pro',
                                   'ai-content-generator', 'ecommerce-engine', 
                                   'team-collaboration-hub', 'streaming-platform'];
        
        if (frontendProjects.includes(projectName)) {
            this.addOutput(`Navigating to ${projectName}...`, 'success');
            setTimeout(() => {
                window.location.href = `projects/${projectName}.html`;
            }, 1000);
        } else if (fullstackProjects.includes(projectName)) {
            this.addOutput(`Navigating to ${projectName}...`, 'success');
            setTimeout(() => {
                window.location.href = `projects/fullstack/${projectName}/index.html`;
            }, 1000);
        } else {
            this.addOutput(`Project not found: ${projectName}`, 'error');
            this.addOutput('Use "ls" to see available projects', 'info');
        }
    }

    catFile(filename) {
        const files = {
            'about.txt': `
NAME: Maya Smith
ROLE: Full Stack Developer
LOCATION: San Francisco, CA
EXPERIENCE: 5+ years

ABOUT:
A passionate Full Stack Developer with expertise in building 
scalable web applications. Specializing in modern technologies
and creating amazing user experiences.

INTERESTS:
- Web Development
- Cloud Architecture  
- Open Source
- Cyberpunk Aesthetics
            `,
            'skills.txt': `
FRONTEND:
- React / Next.js - Expert
- Vue.js - Advanced
- HTML/CSS/JavaScript - Expert
- TypeScript - Advanced
- Tailwind CSS - Expert

BACKEND:
- Node.js / Express - Expert
- Python / Django - Advanced
- RESTful APIs - Expert
- GraphQL - Intermediate

DATABASE:
- MongoDB - Advanced
- PostgreSQL - Advanced
- Redis - Intermediate

DEVOPS:
- Docker - Advanced
- AWS / Azure - Intermediate
- CI/CD - Advanced
- Git - Expert
            `,
            'contact.txt': `
CONTACT INFORMATION:

Email: TheLiquidIvy@gmail.com
Phone: +1 (555) 123-4567
LinkedIn: linkedin.com/in/mayasmith
GitHub: github.com/mayasmith
Twitter: @mayasmith_dev

AVAILABILITY:
Open to freelance projects and full-time opportunities

LOCATION:
San Francisco Bay Area
Remote work: Available

Best time to reach: Mon-Fri, 9AM-6PM PST
            `
        };
        
        if (!filename) {
            this.addOutput('Available files: about.txt, skills.txt, contact.txt', 'info');
        } else if (files[filename]) {
            this.addOutput(files[filename], 'success');
        } else {
            this.addOutput(`File not found: ${filename}`, 'error');
        }
    }

    whoami() {
        this.addOutput(`
╔════════════════════════════════════════════════╗
║           MAYA SMITH - DEVELOPER INFO          ║
╠════════════════════════════════════════════════╣
║ Role: Full Stack Developer                     ║
║ Expertise: React, Node.js, Python              ║
║ Experience: 5+ Years                           ║
║ Projects Completed: 50+                        ║
║ Coffee Consumed: 9999+                         ║
║ Status: Available for opportunities            ║
╚════════════════════════════════════════════════╝
        `, 'info');
    }

    clearTerminal() {
        const content = document.getElementById('terminal-content');
        content.innerHTML = `
            <div class="terminal-banner">${this.getBanner()}</div>
            <div class="terminal-line">
                <span class="terminal-output info">Type 'help' for available commands</span>
            </div>
        `;
    }

    triggerMatrix() {
        this.addOutput('Initializing Matrix protocol...', 'success');
        this.close();
        
        // Trigger matrix rain effect
        if (window.matrixRain) {
            window.matrixRain.start();
        }
    }

    switchTheme(themeName) {
        const themes = ['cyberpunk', 'dark', 'neon', 'matrix', 'synthwave'];
        
        if (!themeName) {
            this.addOutput(`Available themes: ${themes.join(', ')}`, 'info');
            return;
        }
        
        if (themes.includes(themeName)) {
            this.addOutput(`Switching to ${themeName} theme...`, 'success');
            
            // Theme switching will be implemented in theme-switcher.js
            if (window.themeSwitcher) {
                window.themeSwitcher.switchTheme(themeName);
            } else {
                this.addOutput('Theme switcher not yet implemented', 'warning');
            }
        } else {
            this.addOutput(`Unknown theme: ${themeName}`, 'error');
        }
    }

    showStats() {
        this.addOutput('Portfolio Statistics:', 'info');
        this.addOutput('─'.repeat(60), 'info');
        
        const stats = [
            ['Total Projects', '50+'],
            ['Years of Experience', '5+'],
            ['Technologies Mastered', '20+'],
            ['Coffee Cups', '9999+'],
            ['Lines of Code', '500,000+'],
            ['GitHub Stars', '1,234'],
            ['Happy Clients', '25+'],
            ['Code Reviews', '1,000+']
        ];
        
        stats.forEach(([label, value]) => {
            const spacing = ' '.repeat(30 - label.length);
            this.addOutput(`  ${label}${spacing}${value}`, 'success');
        });
        
        this.addOutput('─'.repeat(60), 'info');
    }

    showSocial() {
        this.addOutput('Social Media Links:', 'info');
        this.addOutput('─'.repeat(60), 'info');
        
        const social = [
            ['GitHub', 'https://github.com/mayasmith'],
            ['LinkedIn', 'https://linkedin.com/in/mayasmith'],
            ['Twitter', 'https://twitter.com/mayasmith_dev'],
            ['Dev.to', 'https://dev.to/mayasmith'],
            ['Portfolio', 'https://mayasmith.dev']
        ];
        
        social.forEach(([platform, url]) => {
            this.addOutput(`  ${platform}: ${url}`, 'success');
        });
        
        this.addOutput('─'.repeat(60), 'info');
    }

    showCoffee() {
        const coffeeArt = `
        )  (
       (   ) )
        ) ( (
      _______)_
   .-'---------|  
  ( C|/\\/\\/\\/\\/|
   '-./\\/\\/\\/\\/|
     '_________'
      '-------'
        `;
        
        this.addOutput(coffeeArt, 'warning');
        this.addOutput('☕ Coffee Counter: 9999+ cups', 'warning');
        this.addOutput('Status: Powered by caffeine!', 'success');
        
        let count = 0;
        const interval = setInterval(() => {
            if (count < 10) {
                this.addOutput('☕', 'warning');
                count++;
            } else {
                clearInterval(interval);
                this.addOutput('\nCoffee break complete! ✨', 'success');
            }
        }, 200);
    }

    easterEgg() {
        const surprises = [
            `
    🎉 You found a secret! 🎉
    
    Did you know? This portfolio was built with:
    - 100% pure creativity
    - 9999+ cups of coffee
    - Countless hours of debugging
    - A love for cyberpunk aesthetics
    
    Keep exploring! There are more secrets... 👀
            `,
            `
    🌟 ACHIEVEMENT UNLOCKED! 🌟
    
    "Curious Explorer"
    You've discovered the easter egg command!
    
    Reward: +100 XP
    Bonus: Infinite respect from the developer
            `,
            `
    🤖 SYSTEM MESSAGE 🤖
    
    Congratulations! You've proven yourself worthy.
    
    The Matrix is real.
    The code is the way.
    Keep hacking the planet! 🌍💻
            `
        ];
        
        const surprise = surprises[Math.floor(Math.random() * surprises.length)];
        this.addOutput(surprise, 'info');
    }
}

// Initialize terminal
let terminal;
document.addEventListener('DOMContentLoaded', () => {
    terminal = new Terminal();
});
