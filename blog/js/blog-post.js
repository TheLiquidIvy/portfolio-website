// ==================== BLOG POST FUNCTIONALITY ====================

// Scroll Progress Bar
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (!scrollProgress) return;
    
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / documentHeight) * 100;
    
    scrollProgress.style.transform = `scaleX(${progress / 100})`;
}

// Copy Code Functionality
function setupCodeCopy() {
    const copyButtons = document.querySelectorAll('.copy-code');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const codeBlock = button.closest('.code-block');
            const code = codeBlock.querySelector('code');
            
            try {
                await navigator.clipboard.writeText(code.textContent);
                button.textContent = '✓ Copied!';
                button.classList.add('copied');
                
                setTimeout(() => {
                    button.textContent = 'Copy';
                    button.classList.remove('copied');
                }, 2000);
            } catch (err) {
                button.textContent = 'Failed';
                setTimeout(() => {
                    button.textContent = 'Copy';
                }, 2000);
            }
        });
    });
}

// Back to Top Button
function setupBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (!backToTop) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Share Functionality
function setupShareButtons() {
    const shareButtons = document.querySelectorAll('.share-button');
    const pageUrl = window.location.href;
    const pageTitle = document.querySelector('.hero-title')?.textContent || document.title;
    
    shareButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (button.classList.contains('twitter')) {
                const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(pageTitle)}`;
                window.open(twitterUrl, '_blank', 'width=550,height=420');
            } else if (button.classList.contains('linkedin')) {
                const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`;
                window.open(linkedinUrl, '_blank', 'width=550,height=420');
            } else if (button.classList.contains('copy')) {
                copyLink(button, pageUrl);
            }
        });
    });
}

async function copyLink(button, url) {
    try {
        await navigator.clipboard.writeText(url);
        const originalText = button.textContent;
        button.textContent = '✓ Link Copied!';
        
        setTimeout(() => {
            button.textContent = originalText;
        }, 2000);
    } catch (err) {
        console.error('Failed to copy link:', err);
    }
}

// Smooth Scroll for Anchor Links
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize all blog post features
function initBlogPost() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        updateScrollProgress();
        setupCodeCopy();
        setupBackToTop();
        setupShareButtons();
        setupSmoothScroll();
        
        // Update scroll progress on scroll
        window.addEventListener('scroll', updateScrollProgress, { passive: true });
        
        // Update scroll progress on resize
        window.addEventListener('resize', updateScrollProgress, { passive: true });
    }
}

// Initialize
initBlogPost();
