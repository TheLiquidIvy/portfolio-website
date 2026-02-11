// ==================== RESUME PDF GENERATOR ====================

class ResumeGenerator {
    constructor() {
        this.portfolioData = {
            name: 'Maya Smith',
            title: 'Full Stack Developer',
            email: 'maya.smith@example.com',
            phone: '+1 (555) 123-4567',
            location: 'Cape Town, South Africa',
            website: 'https://theliquidivyfile.github.io/portfolio-website/',
            github: 'github.com/TheLiquidIvy',
            linkedin: 'linkedin.com/in/mayasmith',
            summary: 'Passionate Full Stack Developer with 5+ years of experience building scalable web applications. Specialized in React, Node.js, Python, and cloud technologies. Strong problem-solver with a focus on clean code and user experience.',
            skills: {
                frontend: ['React', 'Vue.js', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind'],
                backend: ['Node.js', 'Python', 'Express', 'Django', 'RESTful APIs', 'GraphQL'],
                database: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis'],
                devops: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Git'],
                tools: ['VS Code', 'Figma', 'Postman', 'Jira']
            },
            experience: [
                {
                    title: 'Senior Full Stack Developer',
                    company: 'TechCorp Solutions',
                    location: 'Cape Town',
                    period: '2024 - Present',
                    responsibilities: [
                        'Leading development of enterprise-scale applications with React and Node.js',
                        'Mentoring junior developers and conducting code reviews',
                        'Architecting cloud solutions on AWS with focus on scalability',
                        'Implementing CI/CD pipelines and DevOps best practices'
                    ]
                },
                {
                    title: 'Full Stack Developer',
                    company: 'Innovation Labs',
                    location: 'Remote',
                    period: '2022 - 2024',
                    responsibilities: [
                        'Developed and maintained multiple client projects using MERN stack',
                        'Collaborated with designers to implement pixel-perfect UIs',
                        'Optimized application performance and implemented caching strategies',
                        'Built RESTful APIs and integrated third-party services'
                    ]
                },
                {
                    title: 'Junior Developer',
                    company: 'StartUp Ventures',
                    location: 'Cape Town',
                    period: '2020 - 2022',
                    responsibilities: [
                        'Contributed to frontend development using React and Vue.js',
                        'Worked on bug fixes and feature implementations',
                        'Participated in agile development processes and daily standups',
                        'Learned best practices for clean code and testing'
                    ]
                }
            ],
            education: [
                {
                    degree: 'Bachelor of Science in Computer Science',
                    school: 'University of Cape Town',
                    period: '2016 - 2020',
                    achievements: 'Graduated with Honors, GPA: 3.8/4.0'
                }
            ],
            certifications: [
                'AWS Certified Solutions Architect - Associate (2024)',
                'Meta Front-End Developer Professional Certificate (2023)',
                'MongoDB Certified Developer (2022)'
            ]
        };
        
        this.init();
    }

    init() {
        // Add download buttons to navbar and hero
        this.addDownloadButtons();
        console.log('[Resume] Resume generator initialized');
    }

    addDownloadButtons() {
        // Add to navbar
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu && !document.getElementById('resumeNavBtn')) {
            const navItem = document.createElement('li');
            navItem.innerHTML = `
                <button class="resume-download-btn" id="resumeNavBtn">
                    <span class="icon">📄</span>
                    <span>Download Resume</span>
                </button>
            `;
            navMenu.appendChild(navItem);
            
            document.getElementById('resumeNavBtn').addEventListener('click', () => {
                this.generatePDF();
            });
        }

        // Add to hero section
        const ctaButtons = document.querySelector('.cta-buttons');
        if (ctaButtons && !document.getElementById('resumeHeroBtn')) {
            const heroBtn = document.createElement('button');
            heroBtn.className = 'btn btn-secondary resume-download-btn';
            heroBtn.id = 'resumeHeroBtn';
            heroBtn.innerHTML = `
                <span class="icon">📄</span>
                <span>Download Resume</span>
            `;
            ctaButtons.appendChild(heroBtn);
            
            heroBtn.addEventListener('click', () => {
                this.generatePDF();
            });
        }
    }

    async generatePDF() {
        if (typeof jsPDF === 'undefined') {
            console.error('[Resume] jsPDF library not loaded');
            this.showToast('Error', 'PDF library not loaded', 'error');
            return;
        }

        // Show loading
        this.showLoading();

        try {
            // Small delay to show loading animation
            await new Promise(resolve => setTimeout(resolve, 500));

            const doc = new jsPDF();
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            let yPos = 20;

            // Cyberpunk color scheme
            const cyan = [0, 255, 255];
            const magenta = [255, 0, 255];
            const dark = [10, 10, 15];
            const white = [255, 255, 255];

            // Header Background
            doc.setFillColor(...dark);
            doc.rect(0, 0, pageWidth, 50, 'F');

            // Name
            doc.setTextColor(...cyan);
            doc.setFontSize(24);
            doc.setFont(undefined, 'bold');
            doc.text(this.portfolioData.name.toUpperCase(), 20, yPos);
            yPos += 8;

            // Title
            doc.setTextColor(...magenta);
            doc.setFontSize(14);
            doc.text(this.portfolioData.title, 20, yPos);
            yPos += 15;

            // Contact Info
            doc.setTextColor(...white);
            doc.setFontSize(9);
            doc.text([
                this.portfolioData.email,
                this.portfolioData.phone,
                this.portfolioData.location,
                this.portfolioData.website
            ], 20, yPos);
            yPos += 25;

            // Summary Section
            doc.setTextColor(0, 0, 0);
            this.addSection(doc, 'PROFESSIONAL SUMMARY', yPos, cyan);
            yPos += 10;
            
            doc.setFontSize(10);
            const summaryLines = doc.splitTextToSize(this.portfolioData.summary, pageWidth - 40);
            doc.text(summaryLines, 20, yPos);
            yPos += summaryLines.length * 5 + 10;

            // Skills Section
            this.addSection(doc, 'TECHNICAL SKILLS', yPos, cyan);
            yPos += 10;

            Object.entries(this.portfolioData.skills).forEach(([category, skills]) => {
                doc.setFont(undefined, 'bold');
                doc.text(`${category.charAt(0).toUpperCase() + category.slice(1)}:`, 20, yPos);
                doc.setFont(undefined, 'normal');
                doc.text(skills.join(', '), 55, yPos);
                yPos += 6;
            });
            yPos += 5;

            // Check if we need a new page
            if (yPos > pageHeight - 60) {
                doc.addPage();
                yPos = 20;
            }

            // Experience Section
            this.addSection(doc, 'PROFESSIONAL EXPERIENCE', yPos, cyan);
            yPos += 10;

            this.portfolioData.experience.forEach((exp, index) => {
                // Check page break
                if (yPos > pageHeight - 50) {
                    doc.addPage();
                    yPos = 20;
                }

                doc.setFont(undefined, 'bold');
                doc.setFontSize(11);
                doc.text(exp.title, 20, yPos);
                
                doc.setFont(undefined, 'normal');
                doc.setFontSize(10);
                doc.text(`${exp.company} | ${exp.location}`, 20, yPos + 5);
                doc.text(exp.period, pageWidth - 60, yPos + 5);
                yPos += 12;

                doc.setFontSize(9);
                exp.responsibilities.forEach(resp => {
                    const lines = doc.splitTextToSize(`• ${resp}`, pageWidth - 50);
                    doc.text(lines, 25, yPos);
                    yPos += lines.length * 4 + 1;
                });
                yPos += 5;
            });

            // Education Section
            if (yPos > pageHeight - 40) {
                doc.addPage();
                yPos = 20;
            }

            this.addSection(doc, 'EDUCATION', yPos, cyan);
            yPos += 10;

            this.portfolioData.education.forEach(edu => {
                doc.setFont(undefined, 'bold');
                doc.setFontSize(11);
                doc.text(edu.degree, 20, yPos);
                
                doc.setFont(undefined, 'normal');
                doc.setFontSize(10);
                doc.text(`${edu.school} | ${edu.period}`, 20, yPos + 5);
                yPos += 10;
                
                doc.setFontSize(9);
                doc.text(edu.achievements, 20, yPos);
                yPos += 10;
            });

            // Certifications Section
            this.addSection(doc, 'CERTIFICATIONS', yPos, cyan);
            yPos += 10;

            doc.setFontSize(9);
            this.portfolioData.certifications.forEach(cert => {
                doc.text(`• ${cert}`, 20, yPos);
                yPos += 5;
            });

            // Footer with QR code placeholder
            const footerY = pageHeight - 15;
            doc.setFontSize(8);
            doc.setTextColor(100, 100, 100);
            doc.text('Generated from: ' + this.portfolioData.website, pageWidth / 2, footerY, { align: 'center' });

            // Save the PDF
            doc.save(`${this.portfolioData.name.replace(' ', '_')}_Resume.pdf`);

            // Hide loading
            this.hideLoading();

            // Show success notification
            this.showToast('Success!', 'Resume downloaded successfully', 'success');
            this.createConfetti();

            console.log('[Resume] PDF generated successfully');
        } catch (error) {
            console.error('[Resume] PDF generation failed:', error);
            this.hideLoading();
            this.showToast('Error', 'Failed to generate PDF', 'error');
        }
    }

    addSection(doc, title, yPos, color) {
        doc.setTextColor(...color);
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.text(title, 20, yPos);
        
        // Underline
        doc.setDrawColor(...color);
        doc.setLineWidth(0.5);
        doc.line(20, yPos + 2, 190, yPos + 2);
    }

    showLoading() {
        let overlay = document.getElementById('resumeLoadingOverlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'resumeLoadingOverlay';
            overlay.className = 'resume-loading-overlay';
            overlay.innerHTML = `
                <div class="resume-loading-content">
                    <div class="resume-loading-spinner"></div>
                    <div class="resume-loading-text">Generating Resume</div>
                    <div class="resume-loading-subtext">Please wait...</div>
                </div>
            `;
            document.body.appendChild(overlay);
        }
        overlay.classList.add('active');
    }

    hideLoading() {
        const overlay = document.getElementById('resumeLoadingOverlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
    }

    showToast(title, message, type = 'success') {
        const icons = {
            success: '✅',
            error: '❌',
            info: 'ℹ️'
        };

        const toast = document.createElement('div');
        toast.className = 'resume-toast';
        toast.innerHTML = `
            <div class="resume-toast-icon">${icons[type]}</div>
            <div class="resume-toast-content">
                <div class="resume-toast-title">${title}</div>
                <div class="resume-toast-message">${message}</div>
            </div>
            <button class="resume-toast-close">×</button>
        `;

        document.body.appendChild(toast);

        // Show toast
        setTimeout(() => toast.classList.add('show'), 100);

        // Close button
        toast.querySelector('.resume-toast-close').addEventListener('click', () => {
            this.hideToast(toast);
        });

        // Auto hide after 5 seconds
        setTimeout(() => {
            this.hideToast(toast);
        }, 5000);
    }

    hideToast(toast) {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 500);
    }

    createConfetti() {
        const colors = ['#00ffff', '#ff00ff', '#ffff00', '#00ff41'];
        const confettiCount = 50;

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 2 + 's';
            confetti.style.animationDuration = Math.random() * 2 + 2 + 's';
            
            document.body.appendChild(confetti);

            // Remove after animation
            setTimeout(() => confetti.remove(), 5000);
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Wait for jsPDF to load
        setTimeout(() => {
            window.resumeGenerator = new ResumeGenerator();
        }, 100);
    });
} else {
    setTimeout(() => {
        window.resumeGenerator = new ResumeGenerator();
    }, 100);
}

console.log('[Resume] Resume generator module loaded');
