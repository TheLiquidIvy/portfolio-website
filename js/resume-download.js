// ==================== RESUME DOWNLOAD FUNCTIONALITY ====================
// Separate download functionality for Themed and ATS versions

class ResumeDownload {
    constructor() {
        this.resumeData = {
            name: 'Maya Smith',
            title: 'Full Stack Developer',
            email: 'maya.smith@email.com',
            phone: '+27 123 456 789',
            location: 'Cape Town, South Africa',
            github: 'github.com/TheLiquidIvy',
            linkedin: 'linkedin.com/in/mayasmith',
            website: 'theliquidivyfile.github.io/portfolio-website',
            summary: 'Creative and detail-oriented Full Stack Developer with 5+ years of experience building responsive web applications. Proficient in React, Node.js, Python, and cloud technologies. Passionate about creating elegant solutions to complex problems and delivering exceptional user experiences.',
            skills: {
                'Frontend': ['React', 'Vue.js', 'TypeScript', 'HTML5', 'CSS3'],
                'Backend': ['Node.js', 'Express', 'Python', 'Django', 'RESTful APIs'],
                'Database & DevOps': ['MongoDB', 'PostgreSQL', 'Docker', 'AWS', 'Git', 'CI/CD']
            },
            experience: [
                {
                    title: 'Senior Full Stack Developer',
                    company: 'TechCorp Solutions',
                    location: 'Cape Town, South Africa',
                    period: '2024 - Present',
                    achievements: [
                        'Led development of enterprise-scale applications serving 100,000+ users',
                        'Architected microservices infrastructure using Node.js and Docker',
                        'Mentored team of 5 junior developers, improving code quality by 40%',
                        'Implemented CI/CD pipelines reducing deployment time by 60%'
                    ],
                    tech: ['React', 'Node.js', 'AWS', 'Docker']
                },
                {
                    title: 'Full Stack Developer',
                    company: 'StartupXYZ',
                    location: 'Remote',
                    period: '2022 - 2024',
                    achievements: [
                        'Built real-time collaboration platform with React and WebSockets',
                        'Developed RESTful APIs handling 1M+ daily requests',
                        'Optimized database queries improving performance by 50%',
                        'Integrated third-party payment systems (Stripe, PayPal)'
                    ],
                    tech: ['React', 'MongoDB', 'Socket.io']
                }
            ],
            education: [
                {
                    degree: 'Bachelor of Science in Computer Science',
                    school: 'University of Cape Town',
                    period: '2020',
                    details: 'GPA: 3.8/4.0 • Dean\'s List • Focus: Software Engineering'
                }
            ]
        };

        this.init();
    }

    init() {
        this.createDownloadButtons();
        console.log('[Resume Download] Download functionality initialized');
    }

    createDownloadButtons() {
        // Check if buttons already exist
        if (document.querySelector('.resume-download-options')) {
            return;
        }

        // Create download buttons container
        const downloadContainer = document.createElement('div');
        downloadContainer.className = 'resume-download-options';
        downloadContainer.innerHTML = `
            <button class="btn-download-themed" id="btnDownloadThemed" aria-label="Download human-friendly themed resume">
                <span class="icon" aria-hidden="true">📥</span>
                <span>Download Human-Friendly Version</span>
            </button>
            <button class="btn-download-ats" id="btnDownloadATS" aria-label="Download ATS-optimized resume">
                <span class="icon" aria-hidden="true">📥</span>
                <span>Download ATS-Optimized Version</span>
            </button>
        `;

        // Insert after header or at the beginning
        const header = document.querySelector('.resume-header');
        if (header) {
            header.parentNode.insertBefore(downloadContainer, header.nextSibling);
        } else {
            document.body.insertBefore(downloadContainer, document.body.firstChild);
        }

        // Add event listeners
        document.getElementById('btnDownloadThemed').addEventListener('click', () => {
            this.downloadThemed();
        });

        document.getElementById('btnDownloadATS').addEventListener('click', () => {
            this.downloadATS();
        });
    }

    async downloadThemed() {
        if (typeof jsPDF === 'undefined') {
            console.error('[Resume Download] jsPDF library not loaded');
            this.showNotification('Error: PDF library not loaded', 'error');
            return;
        }

        const btn = document.getElementById('btnDownloadThemed');
        this.setLoading(btn, true);

        try {
            await new Promise(resolve => setTimeout(resolve, 500));

            const doc = new jsPDF();
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            let yPos = 20;

            // Cyberpunk color scheme
            const cyan = [0, 243, 255];
            const magenta = [255, 0, 255];
            const purple = [176, 38, 255];
            const dark = [10, 10, 20];
            const white = [255, 255, 255];
            const gray = [160, 160, 176];

            // Background with gradient effect (dark)
            doc.setFillColor(...dark);
            doc.rect(0, 0, pageWidth, pageHeight, 'F');

            // Header Section with colored background
            doc.setFillColor(15, 15, 25);
            doc.rect(0, 0, pageWidth, 55, 'F');

            // Name (Cyan, Bold, Large)
            doc.setTextColor(...cyan);
            doc.setFontSize(28);
            doc.setFont(undefined, 'bold');
            doc.text(this.resumeData.name.toUpperCase(), pageWidth / 2, yPos, { align: 'center' });
            yPos += 10;

            // Title (Magenta)
            doc.setTextColor(...magenta);
            doc.setFontSize(14);
            doc.setFont(undefined, 'normal');
            doc.text(this.resumeData.title, pageWidth / 2, yPos, { align: 'center' });
            yPos += 10;

            // Contact Info (White, smaller)
            doc.setTextColor(...white);
            doc.setFontSize(9);
            const contact = `${this.resumeData.email} | ${this.resumeData.phone} | ${this.resumeData.location}`;
            doc.text(contact, pageWidth / 2, yPos, { align: 'center' });
            yPos += 5;
            const links = `${this.resumeData.github} | ${this.resumeData.linkedin}`;
            doc.text(links, pageWidth / 2, yPos, { align: 'center' });
            yPos += 15;

            // Professional Summary
            yPos = this.addThemedSection(doc, 'PROFESSIONAL SUMMARY', yPos, cyan, pageWidth, pageHeight);
            doc.setTextColor(...white);
            doc.setFontSize(10);
            const summaryLines = doc.splitTextToSize(this.resumeData.summary, pageWidth - 40);
            doc.text(summaryLines, 20, yPos);
            yPos += summaryLines.length * 5 + 12;

            // Technical Skills
            yPos = this.addThemedSection(doc, 'TECHNICAL SKILLS', yPos, cyan, pageWidth, pageHeight);
            Object.entries(this.resumeData.skills).forEach(([category, skills]) => {
                doc.setTextColor(...purple);
                doc.setFontSize(11);
                doc.setFont(undefined, 'bold');
                doc.text(`${category}:`, 20, yPos);
                
                doc.setTextColor(...gray);
                doc.setFont(undefined, 'normal');
                doc.setFontSize(10);
                const skillsText = skills.join(' • ');
                const skillLines = doc.splitTextToSize(skillsText, pageWidth - 75);
                doc.text(skillLines, 65, yPos);
                yPos += Math.max(6, skillLines.length * 5);
            });
            yPos += 10;

            // Check page break
            if (yPos > pageHeight - 60) {
                doc.addPage();
                doc.setFillColor(...dark);
                doc.rect(0, 0, pageWidth, pageHeight, 'F');
                yPos = 20;
            }

            // Professional Experience
            yPos = this.addThemedSection(doc, 'PROFESSIONAL EXPERIENCE', yPos, cyan, pageWidth, pageHeight);
            this.resumeData.experience.forEach(exp => {
                if (yPos > pageHeight - 70) {
                    doc.addPage();
                    doc.setFillColor(...dark);
                    doc.rect(0, 0, pageWidth, pageHeight, 'F');
                    yPos = 20;
                }

                // Job title (Magenta, bold)
                doc.setTextColor(...magenta);
                doc.setFontSize(12);
                doc.setFont(undefined, 'bold');
                doc.text(exp.title, 20, yPos);
                yPos += 6;

                // Company & period
                doc.setTextColor(...white);
                doc.setFontSize(10);
                doc.setFont(undefined, 'normal');
                doc.text(`${exp.company} | ${exp.location}`, 20, yPos);
                doc.setTextColor(...gray);
                doc.text(exp.period, pageWidth - 25, yPos, { align: 'right' });
                yPos += 7;

                // Achievements
                doc.setTextColor(...white);
                doc.setFontSize(9);
                exp.achievements.forEach(achievement => {
                    const lines = doc.splitTextToSize(`• ${achievement}`, pageWidth - 50);
                    doc.text(lines, 25, yPos);
                    yPos += lines.length * 4.5;
                });

                // Tech used
                doc.setTextColor(...purple);
                doc.setFontSize(8);
                doc.text(`Tech: ${exp.tech.join(' • ')}`, 25, yPos);
                yPos += 10;
            });

            // Education
            if (yPos > pageHeight - 40) {
                doc.addPage();
                doc.setFillColor(...dark);
                doc.rect(0, 0, pageWidth, pageHeight, 'F');
                yPos = 20;
            }

            yPos = this.addThemedSection(doc, 'EDUCATION', yPos, cyan, pageWidth, pageHeight);
            this.resumeData.education.forEach(edu => {
                doc.setTextColor(...magenta);
                doc.setFontSize(11);
                doc.setFont(undefined, 'bold');
                doc.text(edu.degree, 20, yPos);
                yPos += 6;

                doc.setTextColor(...white);
                doc.setFontSize(10);
                doc.setFont(undefined, 'normal');
                doc.text(`${edu.school} | ${edu.period}`, 20, yPos);
                yPos += 6;

                doc.setTextColor(...gray);
                doc.setFontSize(9);
                doc.text(edu.details, 20, yPos);
                yPos += 8;
            });

            // Footer
            doc.setTextColor(...gray);
            doc.setFontSize(8);
            doc.text('Portfolio: ' + this.resumeData.website, pageWidth / 2, pageHeight - 10, { align: 'center' });

            // Save
            doc.save('Resume_TheLiquidIvy_Themed.pdf');

            this.setLoading(btn, false);
            this.showNotification('Themed resume downloaded successfully!', 'success');
            console.log('[Resume Download] Themed PDF generated successfully');

        } catch (error) {
            console.error('[Resume Download] Themed PDF generation failed:', error);
            this.setLoading(btn, false);
            this.showNotification('Failed to generate themed PDF', 'error');
        }
    }

    async downloadATS() {
        if (typeof jsPDF === 'undefined') {
            console.error('[Resume Download] jsPDF library not loaded');
            this.showNotification('Error: PDF library not loaded', 'error');
            return;
        }

        const btn = document.getElementById('btnDownloadATS');
        this.setLoading(btn, true);

        try {
            await new Promise(resolve => setTimeout(resolve, 500));

            const doc = new jsPDF();
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            let yPos = 20;

            // ATS-Optimized: Black text on white background only
            const black = [0, 0, 0];
            const white = [255, 255, 255];

            // White background
            doc.setFillColor(...white);
            doc.rect(0, 0, pageWidth, pageHeight, 'F');

            // Name (Black, Bold, Centered)
            doc.setTextColor(...black);
            doc.setFontSize(22);
            doc.setFont('helvetica', 'bold');
            doc.text(this.resumeData.name.toUpperCase(), pageWidth / 2, yPos, { align: 'center' });
            yPos += 8;

            // Title
            doc.setFontSize(12);
            doc.setFont('helvetica', 'normal');
            doc.text(this.resumeData.title, pageWidth / 2, yPos, { align: 'center' });
            yPos += 8;

            // Contact Info
            doc.setFontSize(10);
            doc.text(this.resumeData.email, pageWidth / 2, yPos, { align: 'center' });
            yPos += 5;
            doc.text(`${this.resumeData.phone} | ${this.resumeData.location}`, pageWidth / 2, yPos, { align: 'center' });
            yPos += 5;
            doc.text(`${this.resumeData.github} | ${this.resumeData.linkedin}`, pageWidth / 2, yPos, { align: 'center' });
            yPos += 5;
            doc.text(this.resumeData.website, pageWidth / 2, yPos, { align: 'center' });
            yPos += 12;

            // Separator line
            doc.setDrawColor(...black);
            doc.setLineWidth(0.5);
            doc.line(20, yPos, pageWidth - 20, yPos);
            yPos += 10;

            // Professional Summary
            yPos = this.addATSSection(doc, 'PROFESSIONAL SUMMARY', yPos, black);
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            const summaryLines = doc.splitTextToSize(this.resumeData.summary, pageWidth - 40);
            doc.text(summaryLines, 20, yPos);
            yPos += summaryLines.length * 5 + 10;

            // Technical Skills
            yPos = this.addATSSection(doc, 'TECHNICAL SKILLS', yPos, black);
            Object.entries(this.resumeData.skills).forEach(([category, skills]) => {
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(10);
                doc.text(`${category}:`, 20, yPos);
                
                doc.setFont('helvetica', 'normal');
                const skillsText = skills.join(', ');
                const skillLines = doc.splitTextToSize(skillsText, pageWidth - 70);
                doc.text(skillLines, 60, yPos);
                yPos += Math.max(6, skillLines.length * 5);
            });
            yPos += 8;

            // Check page break
            if (yPos > pageHeight - 60) {
                doc.addPage();
                yPos = 20;
            }

            // Professional Experience
            yPos = this.addATSSection(doc, 'PROFESSIONAL EXPERIENCE', yPos, black);
            this.resumeData.experience.forEach(exp => {
                if (yPos > pageHeight - 60) {
                    doc.addPage();
                    yPos = 20;
                }

                // Job title (bold)
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(11);
                doc.text(exp.title, 20, yPos);
                yPos += 6;

                // Company & period
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(10);
                doc.text(`${exp.company}, ${exp.location}`, 20, yPos);
                doc.text(exp.period, pageWidth - 25, yPos, { align: 'right' });
                yPos += 7;

                // Achievements (bullet points)
                doc.setFontSize(10);
                exp.achievements.forEach(achievement => {
                    const lines = doc.splitTextToSize(`• ${achievement}`, pageWidth - 50);
                    doc.text(lines, 25, yPos);
                    yPos += lines.length * 5;
                });

                // Technologies
                doc.setFontSize(9);
                doc.text(`Technologies: ${exp.tech.join(', ')}`, 25, yPos);
                yPos += 10;
            });

            // Education
            if (yPos > pageHeight - 35) {
                doc.addPage();
                yPos = 20;
            }

            yPos = this.addATSSection(doc, 'EDUCATION', yPos, black);
            this.resumeData.education.forEach(edu => {
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(11);
                doc.text(edu.degree, 20, yPos);
                yPos += 6;

                doc.setFont('helvetica', 'normal');
                doc.setFontSize(10);
                doc.text(`${edu.school}, ${edu.period}`, 20, yPos);
                yPos += 6;

                doc.setFontSize(9);
                doc.text(edu.details, 20, yPos);
                yPos += 8;
            });

            // Save
            doc.save('Resume_TheLiquidIvy_ATS.pdf');

            this.setLoading(btn, false);
            this.showNotification('ATS-optimized resume downloaded successfully!', 'success');
            console.log('[Resume Download] ATS PDF generated successfully');

        } catch (error) {
            console.error('[Resume Download] ATS PDF generation failed:', error);
            this.setLoading(btn, false);
            this.showNotification('Failed to generate ATS PDF', 'error');
        }
    }

    addThemedSection(doc, title, yPos, color, pageWidth, pageHeight) {
        if (yPos > pageHeight - 30) {
            doc.addPage();
            doc.setFillColor(10, 10, 20);
            doc.rect(0, 0, pageWidth, pageHeight, 'F');
            yPos = 20;
        }

        doc.setTextColor(...color);
        doc.setFontSize(13);
        doc.setFont(undefined, 'bold');
        doc.text(title, 20, yPos);
        
        // Neon underline
        doc.setDrawColor(...color);
        doc.setLineWidth(1);
        doc.line(20, yPos + 2, pageWidth - 20, yPos + 2);
        
        return yPos + 10;
    }

    addATSSection(doc, title, yPos, color) {
        doc.setTextColor(...color);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(title, 20, yPos);
        
        // Simple underline
        doc.setDrawColor(...color);
        doc.setLineWidth(0.5);
        doc.line(20, yPos + 2, 190, yPos + 2);
        
        return yPos + 8;
    }

    setLoading(button, isLoading) {
        if (isLoading) {
            button.classList.add('loading');
            button.disabled = true;
            const icon = button.querySelector('.icon');
            if (icon) {
                icon.textContent = '⏳';
            }
        } else {
            button.classList.remove('loading');
            button.disabled = false;
            const icon = button.querySelector('.icon');
            if (icon) {
                icon.textContent = '📥';
            }
        }
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `resume-notification ${type}`;
        notification.innerHTML = `
            <span class="notification-icon">${type === 'success' ? '✅' : '❌'}</span>
            <span class="notification-message">${message}</span>
        `;
        
        // Add styles if not present
        this.injectNotificationStyles();
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Auto hide after 4 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 500);
        }, 4000);
    }

    injectNotificationStyles() {
        if (document.getElementById('resume-notification-styles')) {
            return;
        }

        const styles = document.createElement('style');
        styles.id = 'resume-notification-styles';
        styles.textContent = `
            .resume-notification {
                position: fixed;
                bottom: 2rem;
                right: 2rem;
                display: flex;
                align-items: center;
                gap: 0.75rem;
                padding: 1rem 1.5rem;
                background: rgba(10, 10, 20, 0.95);
                border: 2px solid;
                border-radius: 8px;
                color: #ffffff;
                font-family: 'Rajdhani', sans-serif;
                font-size: 1rem;
                font-weight: 500;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
                z-index: 10000;
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.3s ease;
            }

            .resume-notification.show {
                opacity: 1;
                transform: translateY(0);
            }

            .resume-notification.success {
                border-color: #00ff41;
                box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
            }

            .resume-notification.error {
                border-color: #ff0041;
                box-shadow: 0 0 20px rgba(255, 0, 65, 0.3);
            }

            .notification-icon {
                font-size: 1.5rem;
            }

            .notification-message {
                font-size: 0.95rem;
            }

            @media (max-width: 768px) {
                .resume-notification {
                    right: 1rem;
                    left: 1rem;
                    bottom: 1rem;
                }
            }
        `;
        
        document.head.appendChild(styles);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.resumeDownload = new ResumeDownload();
    });
} else {
    window.resumeDownload = new ResumeDownload();
}

console.log('[Resume Download] Module loaded');
