// AI Content Generator - Main JavaScript

class AIContentGenerator {
    constructor() {
        this.currentTemplate = 'blog';
        this.history = [];
        this.currentContent = '';
        this.init();
    }

    init() {
        this.loadHistory();
        this.initEventListeners();
        this.updateWordCount();
    }

    loadHistory() {
        this.history = JSON.parse(localStorage.getItem('ai_history') || '[]');
        this.renderHistory();
    }

    initEventListeners() {
        // Template selection
        document.querySelectorAll('.template-item').forEach(item => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.template-item').forEach(t => t.classList.remove('active'));
                item.classList.add('active');
                this.currentTemplate = item.dataset.template;
                this.updateTemplateTitle();
            });
        });

        // Word counter
        const input = document.getElementById('prompt-input');
        input.addEventListener('input', () => this.updateWordCount());

        // Generate button
        document.getElementById('generate-btn').addEventListener('click', () => this.generate());
    }

    updateTemplateTitle() {
        const titles = {
            blog: 'Blog Post Generator',
            social: 'Social Media Generator',
            email: 'Email Generator',
            product: 'Product Description Generator',
            code: 'Code Comment Generator'
        };
        document.getElementById('template-title').textContent = titles[this.currentTemplate];
    }

    updateWordCount() {
        const text = document.getElementById('prompt-input').value;
        const charCount = text.length;
        const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
        
        document.getElementById('char-count').textContent = charCount;
        document.getElementById('word-count').textContent = wordCount;
    }

    async generate() {
        const prompt = document.getElementById('prompt-input').value.trim();
        
        if (!prompt) {
            alert('Please enter a topic or description');
            return;
        }

        const outputDiv = document.getElementById('output-content');
        
        // Show loading state
        outputDiv.innerHTML = `
            <div class="generating">
                <div class="generating-spinner"></div>
                <div class="generating-text">Generating content...</div>
            </div>
        `;

        // Simulate AI generation delay
        await this.delay(2000);

        // Generate content based on template
        const content = this.generateContent(prompt);
        this.currentContent = content;

        // Display content
        outputDiv.innerHTML = `<div class="generated-content">${content}</div>`;

        // Save to history
        this.saveToHistory(prompt, content);
    }

    generateContent(prompt) {
        const templates = {
            blog: this.generateBlogPost(prompt),
            social: this.generateSocialPost(prompt),
            email: this.generateEmail(prompt),
            product: this.generateProductDesc(prompt),
            code: this.generateCodeComment(prompt)
        };
        return templates[this.currentTemplate];
    }

    generateBlogPost(prompt) {
        const variations = [
            {
                title: `The Ultimate Guide to ${prompt}`,
                intro: `In today's fast-paced digital world, understanding ${prompt} has become more important than ever. This comprehensive guide will walk you through everything you need to know.`,
                sections: [
                    { heading: 'What is it?', content: `${prompt} represents a breakthrough in modern technology and innovation. It combines cutting-edge solutions with practical applications that benefit businesses and individuals alike.` },
                    { heading: 'Why it Matters', content: `The significance of ${prompt} cannot be overstated. Organizations worldwide are adopting this approach to stay competitive and meet evolving customer demands.` },
                    { heading: 'Key Benefits', content: `• Increased efficiency and productivity\n• Cost savings and resource optimization\n• Enhanced user experience\n• Scalability for future growth\n• Competitive advantage in the market` },
                    { heading: 'Getting Started', content: `Beginning your journey with ${prompt} is easier than you might think. Start by assessing your current needs, researching available solutions, and implementing a phased approach.` }
                ],
                conclusion: `As we've explored, ${prompt} offers tremendous potential for transformation. By following the strategies outlined in this guide, you'll be well-equipped to leverage these opportunities and drive meaningful results.`
            },
            {
                title: `Mastering ${prompt}: A Deep Dive`,
                intro: `${prompt} is revolutionizing the way we approach modern challenges. Let's explore the essential aspects that make it a game-changer.`,
                sections: [
                    { heading: 'The Foundation', content: `Understanding the fundamentals of ${prompt} is crucial for success. It's built on principles of innovation, efficiency, and user-centric design.` },
                    { heading: 'Implementation Strategy', content: `A successful rollout requires careful planning. Consider your team's capabilities, timeline constraints, and desired outcomes when designing your approach.` },
                    { heading: 'Best Practices', content: `• Start with clear objectives\n• Involve stakeholders early\n• Iterate based on feedback\n• Monitor metrics consistently\n• Document lessons learned` },
                    { heading: 'Common Pitfalls', content: `Avoid rushing implementation, neglecting training needs, or underestimating resource requirements. These mistakes can derail even the best-planned initiatives.` }
                ],
                conclusion: `With the right approach, ${prompt} can deliver exceptional results. Stay focused on your goals, remain adaptable, and embrace continuous improvement.`
            }
        ];

        const template = variations[Math.floor(Math.random() * variations.length)];
        
        let html = `<div class="content-section">`;
        html += `<h4>${template.title}</h4>`;
        html += `<p>${template.intro}</p>`;
        html += `</div>`;

        template.sections.forEach(section => {
            html += `<div class="content-section">`;
            html += `<h4>${section.heading}</h4>`;
            html += `<p>${section.content}</p>`;
            html += `</div>`;
        });

        html += `<div class="content-section">`;
        html += `<h4>Conclusion</h4>`;
        html += `<p>${template.conclusion}</p>`;
        html += `</div>`;

        return html;
    }

    generateSocialPost(prompt) {
        const variations = [
            `🚀 Exciting news about ${prompt}!\n\nWe're thrilled to share our latest insights on this game-changing topic. Swipe through to learn more! 👉\n\n✨ Key takeaways:\n• Innovation at its finest\n• Results you can measure\n• Future-ready solutions\n\n💬 What's your experience with ${prompt}? Drop a comment below!\n\n#Innovation #TechTrends #Digital #Future #${prompt.replace(/\s+/g, '')}`,
            
            `💡 Let's talk about ${prompt}!\n\nThis is transforming the way we work, create, and innovate. Here's what you need to know:\n\n🎯 Why it matters\n🔥 How to get started\n💪 Impact on your business\n\nLink in bio for our complete guide! 📚\n\n👉 Tag someone who needs to see this!\n\n#Technology #Innovation #Business #Growth #${prompt.replace(/\s+/g, '')}`,
            
            `🌟 THREAD: Everything about ${prompt} 🧵\n\n1/5 Understanding the basics:\n${prompt} is revolutionizing our industry in ways we never imagined. Let's break it down...\n\n2/5 The benefits:\n• Increased efficiency\n• Better outcomes\n• Cost savings\n• Scalability\n\n3/5 Real-world applications are already showing incredible results across multiple sectors.\n\n4/5 Getting started is easier than you think. Begin with small steps and scale gradually.\n\n5/5 The future is here, and ${prompt} is leading the way. Are you ready?\n\n#Thread #Innovation #${prompt.replace(/\s+/g, '')}`
        ];

        return `<div class="content-section">${variations[Math.floor(Math.random() * variations.length)]}</div>`;
    }

    generateEmail(prompt) {
        const variations = [
            {
                subject: `Introducing ${prompt} - Transform Your Workflow`,
                body: `Hi there,\n\nI hope this email finds you well. I wanted to reach out personally to share something exciting with you.\n\nWe've been working on ${prompt}, and the results have exceeded our expectations. This solution addresses the challenges you've mentioned in our previous conversations.\n\nHere's what makes it special:\n\n• Seamless integration with your existing tools\n• Immediate impact on productivity\n• Scalable to grow with your needs\n• Backed by our dedicated support team\n\nI'd love to schedule a quick call to show you how ${prompt} can benefit your team. Are you available for a 15-minute demo this week?\n\nLooking forward to hearing from you!\n\nBest regards,\n[Your Name]`
            },
            {
                subject: `Important Update: ${prompt} Launch`,
                body: `Dear Team,\n\nI'm excited to announce that we're officially launching ${prompt} next week!\n\nThis has been a labor of love for our entire team, and we're confident it will make a significant impact on how we work together.\n\nKey features include:\n\n✓ User-friendly interface\n✓ Advanced automation capabilities\n✓ Real-time collaboration tools\n✓ Comprehensive analytics dashboard\n\nTraining sessions will be held on:\n• Monday at 2 PM EST\n• Wednesday at 10 AM EST\n• Friday at 3 PM EST\n\nPlease RSVP to secure your spot. Attendance is highly encouraged as we want everyone to hit the ground running.\n\nQuestions? Feel free to reach out to the team at [email].\n\nExcited for this new chapter!\n\n[Your Name]`
            }
        ];

        const template = variations[Math.floor(Math.random() * variations.length)];
        return `<div class="content-section"><h4>Subject: ${template.subject}</h4><p>${template.body.replace(/\n/g, '<br>')}</p></div>`;
    }

    generateProductDesc(prompt) {
        const variations = [
            `<div class="content-section">
                <h4>Introducing ${prompt}</h4>
                <p>Experience the next generation of innovation with ${prompt}. Designed for professionals who demand excellence, this cutting-edge solution combines premium quality with unmatched performance.</p>
            </div>
            <div class="content-section">
                <h4>Features</h4>
                <p>
                • State-of-the-art technology<br>
                • Intuitive user interface<br>
                • Robust and reliable construction<br>
                • Energy-efficient design<br>
                • Compatible with all major platforms
                </p>
            </div>
            <div class="content-section">
                <h4>Why Choose ${prompt}?</h4>
                <p>Our commitment to quality and customer satisfaction sets us apart. With ${prompt}, you're not just getting a product – you're investing in a solution that will serve you for years to come.</p>
            </div>
            <div class="content-section">
                <h4>Perfect For</h4>
                <p>• Professionals seeking efficiency<br>
                • Teams requiring collaboration<br>
                • Anyone who values quality<br>
                • Forward-thinking organizations</p>
            </div>`,
            
            `<div class="content-section">
                <h4>${prompt} - Reimagined</h4>
                <p>Transform your workflow with ${prompt}. We've taken everything you love and made it better, faster, and more powerful than ever before.</p>
            </div>
            <div class="content-section">
                <h4>What's New</h4>
                <p>
                ⚡ 50% faster processing<br>
                🎨 Sleek, modern design<br>
                🔒 Enhanced security features<br>
                🌍 Multi-language support<br>
                📱 Mobile-optimized experience
                </p>
            </div>
            <div class="content-section">
                <h4>Technical Specifications</h4>
                <p>Built with cutting-edge technology and premium materials, ${prompt} delivers exceptional performance in any environment. Whether you're a beginner or an expert, you'll appreciate the attention to detail in every aspect.</p>
            </div>
            <div class="content-section">
                <h4>Get Started Today</h4>
                <p>Join thousands of satisfied customers who have already discovered the ${prompt} difference. Order now and experience the future of innovation.</p>
            </div>`
        ];

        return variations[Math.floor(Math.random() * variations.length)];
    }

    generateCodeComment(prompt) {
        const variations = [
            `/**
 * ${prompt}
 * 
 * This function implements ${prompt} functionality with optimized performance
 * and error handling. It follows best practices for maintainability and
 * scalability.
 * 
 * @param {Object} config - Configuration object for ${prompt}
 * @param {string} config.mode - Operation mode ('standard' | 'advanced')
 * @param {number} config.timeout - Timeout in milliseconds (default: 5000)
 * @param {Function} config.callback - Callback function on completion
 * 
 * @returns {Promise<Object>} Resolves with result object containing:
 *   - success: boolean indicating operation status
 *   - data: processed data from ${prompt}
 *   - timestamp: operation completion time
 * 
 * @throws {Error} If configuration is invalid or operation fails
 * 
 * @example
 * const result = await ${prompt.replace(/\s+/g, '')}({
 *   mode: 'advanced',
 *   timeout: 3000,
 *   callback: (data) => console.log(data)
 * });
 * 
 * @see https://docs.example.com/${prompt.replace(/\s+/g, '-').toLowerCase()}
 * @since 1.0.0
 */`,
            
            `/*
 * ${prompt} Implementation
 * ========================
 * 
 * Purpose:
 * Provides core functionality for ${prompt} with emphasis on
 * performance, reliability, and ease of use.
 * 
 * Architecture:
 * - Uses async/await for clean asynchronous flow
 * - Implements error boundaries for graceful degradation
 * - Supports both callback and promise-based patterns
 * 
 * Performance Considerations:
 * - Memoization for frequently accessed data
 * - Lazy loading of heavy dependencies
 * - Efficient memory management
 * 
 * Security:
 * - Input validation and sanitization
 * - Protection against common vulnerabilities
 * - Secure data handling throughout lifecycle
 * 
 * TODO:
 * - Add comprehensive unit tests
 * - Implement caching layer
 * - Optimize for mobile devices
 * 
 * Last updated: ${new Date().toLocaleDateString()}
 * Author: Development Team
 */`
        ];

        return `<div class="content-section"><pre style="white-space: pre-wrap; font-family: 'Courier New', monospace;">${variations[Math.floor(Math.random() * variations.length)]}</pre></div>`;
    }

    saveToHistory(prompt, content) {
        const historyItem = {
            id: Date.now(),
            template: this.currentTemplate,
            prompt: prompt.substring(0, 50) + (prompt.length > 50 ? '...' : ''),
            content,
            date: new Date().toISOString()
        };

        this.history.unshift(historyItem);
        if (this.history.length > 20) {
            this.history = this.history.slice(0, 20);
        }

        localStorage.setItem('ai_history', JSON.stringify(this.history));
        this.renderHistory();
    }

    renderHistory() {
        const container = document.getElementById('history-list');
        
        if (this.history.length === 0) {
            container.innerHTML = '<div style="color: #666; font-family: Rajdhani; padding: 1rem; text-align: center;">No history yet</div>';
            return;
        }

        container.innerHTML = this.history.map(item => `
            <div class="history-item" onclick="app.loadFromHistory(${item.id})">
                <div class="history-title">${item.prompt}</div>
                <div class="history-date">${this.formatDate(item.date)}</div>
            </div>
        `).join('');
    }

    loadFromHistory(id) {
        const item = this.history.find(h => h.id === id);
        if (!item) return;

        document.getElementById('output-content').innerHTML = `<div class="generated-content">${item.content}</div>`;
        this.currentContent = item.content;
    }

    formatDate(isoString) {
        const date = new Date(isoString);
        const now = new Date();
        const diff = Math.floor((now - date) / 1000);
        
        if (diff < 60) return 'Just now';
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        return date.toLocaleDateString();
    }

    copyToClipboard() {
        if (!this.currentContent) {
            alert('No content to copy');
            return;
        }

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = this.currentContent;
        const text = tempDiv.textContent || tempDiv.innerText;
        
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                alert('Content copied to clipboard!');
            }).catch(() => {
                alert('Failed to copy content');
            });
        } else {
            alert('Clipboard API not supported in this browser');
        }
    }

    downloadContent() {
        if (!this.currentContent) {
            alert('No content to download');
            return;
        }

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = this.currentContent;
        const text = tempDiv.textContent || tempDiv.innerText;
        
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `generated-content-${Date.now()}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

const app = new AIContentGenerator();
