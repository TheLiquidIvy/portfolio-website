// ==================== ADDITIONAL POLISH FEATURES ====================

// ==================== BACK TO TOP BUTTON ====================
class BackToTopButton {
    constructor() {
        this.button = null;
        this.scrollThreshold = 500;
        this.init();
    }
    
    init() {
        this.createButton();
        this.attachEventListeners();
    }
    
    createButton() {
        const buttonHTML = `
            <button class="back-to-top" id="backToTop" aria-label="Back to top" title="Back to top">
                ▲
            </button>
        `;
        
        document.body.insertAdjacentHTML('beforeend', buttonHTML);
        this.button = document.getElementById('backToTop');
        
        this.addStyles();
    }
    
    addStyles() {
        if (document.getElementById('backToTopStyles')) return;
        
        const style = document.createElement('style');
        style.id = 'backToTopStyles';
        style.textContent = `
            .back-to-top {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                background: rgba(0, 243, 255, 0.1);
                backdrop-filter: blur(10px);
                border: 2px solid var(--primary-color, #00f3ff);
                border-radius: 50%;
                color: var(--primary-color, #00f3ff);
                font-size: 20px;
                cursor: pointer;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                z-index: 9998;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .back-to-top.visible {
                opacity: 1;
                visibility: visible;
            }
            
            .back-to-top:hover {
                transform: translateY(-5px);
                box-shadow: 0 5px 20px rgba(0, 243, 255, 0.5);
                background: rgba(0, 243, 255, 0.2);
            }
            
            .back-to-top:focus {
                outline: 2px solid var(--primary-color, #00f3ff);
                outline-offset: 2px;
            }
            
            @media (max-width: 768px) {
                .back-to-top {
                    bottom: 20px;
                    right: 20px;
                    width: 45px;
                    height: 45px;
                }
            }
            
            @media (prefers-reduced-motion: reduce) {
                .back-to-top {
                    transition: none !important;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
    
    attachEventListeners() {
        // Show/hide based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > this.scrollThreshold) {
                this.button.classList.add('visible');
            } else {
                this.button.classList.remove('visible');
            }
        }, { passive: true });
        
        // Scroll to top on click
        this.button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ==================== SCROLL PROGRESS BAR ====================
class ScrollProgressBar {
    constructor() {
        this.bar = null;
        this.init();
    }
    
    init() {
        this.createBar();
        this.attachEventListeners();
    }
    
    createBar() {
        const barHTML = `
            <div class="scroll-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
                <div class="progress-fill" id="progressFill"></div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('afterbegin', barHTML);
        this.bar = document.getElementById('progressFill');
        
        this.addStyles();
    }
    
    addStyles() {
        if (document.getElementById('scrollProgressStyles')) return;
        
        const style = document.createElement('style');
        style.id = 'scrollProgressStyles';
        style.textContent = `
            .scroll-progress {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 4px;
                background: rgba(0, 0, 0, 0.3);
                z-index: 100000;
                overflow: hidden;
            }
            
            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, 
                    #00f3ff 0%, 
                    #ff00ff 25%, 
                    #7b00ff 50%, 
                    #ff006e 75%, 
                    #00f3ff 100%
                );
                width: 0%;
                transition: width 0.1s ease;
                box-shadow: 0 0 10px rgba(0, 243, 255, 0.8);
            }
            
            @media (prefers-reduced-motion: reduce) {
                .progress-fill {
                    transition: none !important;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
    
    attachEventListeners() {
        window.addEventListener('scroll', () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
            const clampedProgress = Math.min(100, Math.max(0, progress));
            
            this.bar.style.width = `${clampedProgress}%`;
            this.bar.parentElement.setAttribute('aria-valuenow', Math.round(clampedProgress));
        }, { passive: true });
    }
}

// ==================== SHARE PORTFOLIO BUTTON ====================
class ShareButton {
    constructor() {
        this.button = null;
        this.init();
    }
    
    init() {
        this.createButton();
        this.attachEventListeners();
    }
    
    createButton() {
        // Add share button to footer
        const footer = document.querySelector('.footer .container');
        if (!footer) return;
        
        const buttonHTML = `
            <button class="share-btn" id="shareBtn" aria-label="Share portfolio" title="Share this portfolio">
                <span class="share-icon">🔗</span>
                <span class="share-text">Share Portfolio</span>
            </button>
        `;
        
        footer.insertAdjacentHTML('beforeend', buttonHTML);
        this.button = document.getElementById('shareBtn');
        
        this.addStyles();
    }
    
    addStyles() {
        if (document.getElementById('shareButtonStyles')) return;
        
        const style = document.createElement('style');
        style.id = 'shareButtonStyles';
        style.textContent = `
            .share-btn {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                background: rgba(0, 243, 255, 0.1);
                border: 2px solid var(--primary-color, #00f3ff);
                color: var(--primary-color, #00f3ff);
                padding: 12px 24px;
                border-radius: 8px;
                font-family: 'Rajdhani', sans-serif;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                margin-top: 20px;
            }
            
            .share-btn:hover {
                background: rgba(0, 243, 255, 0.2);
                box-shadow: 0 5px 20px rgba(0, 243, 255, 0.4);
                transform: translateY(-2px);
            }
            
            .share-btn:focus {
                outline: 2px solid var(--primary-color, #00f3ff);
                outline-offset: 2px;
            }
            
            .share-icon {
                font-size: 18px;
            }
            
            @media (max-width: 768px) {
                .share-btn {
                    width: 100%;
                    justify-content: center;
                }
            }
            
            @media (prefers-reduced-motion: reduce) {
                .share-btn {
                    transition: none !important;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
    
    attachEventListeners() {
        if (!this.button) return;
        
        this.button.addEventListener('click', async () => {
            const shareData = {
                title: 'Maya Smith | Full Stack Developer Portfolio',
                text: 'Check out this amazing cyberpunk-themed portfolio!',
                url: window.location.href
            };
            
            // Try Web Share API first
            if (navigator.share) {
                try {
                    await navigator.share(shareData);
                    this.showToast('Thanks for sharing! 🎉');
                } catch (err) {
                    if (err.name !== 'AbortError') {
                        this.fallbackCopyLink();
                    }
                }
            } else {
                // Fallback to copy link
                this.fallbackCopyLink();
            }
        });
    }
    
    fallbackCopyLink() {
        const url = window.location.href;
        
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(url)
                .then(() => {
                    this.showToast('Link copied to clipboard! 📋');
                })
                .catch(err => {
                    console.error('Failed to copy:', err);
                    this.showToast('Failed to copy link', 'error');
                });
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = url;
            textArea.style.position = 'fixed';
            textArea.style.left = '-9999px';
            document.body.appendChild(textArea);
            textArea.select();
            
            try {
                document.execCommand('copy');
                this.showToast('Link copied to clipboard! 📋');
            } catch (err) {
                this.showToast('Failed to copy link', 'error');
            }
            
            document.body.removeChild(textArea);
        }
    }
    
    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `share-toast ${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === 'success' ? 'rgba(0, 243, 255, 0.9)' : 'rgba(255, 0, 110, 0.9)'};
            color: ${type === 'success' ? '#0a0a14' : '#ffffff'};
            padding: 15px 30px;
            border-radius: 8px;
            font-family: 'Rajdhani', sans-serif;
            font-weight: 600;
            font-size: 16px;
            z-index: 100001;
            animation: toastSlideUp 0.3s ease;
            box-shadow: 0 5px 20px ${type === 'success' ? 'rgba(0, 243, 255, 0.5)' : 'rgba(255, 0, 110, 0.5)'};
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'toastSlideDown 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// Add toast animations if not already present
if (!document.getElementById('shareToastAnimations')) {
    const style = document.createElement('style');
    style.id = 'shareToastAnimations';
    style.textContent = `
        @keyframes toastSlideUp {
            from {
                transform: translateX(-50%) translateY(100px);
                opacity: 0;
            }
            to {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
        }
        
        @keyframes toastSlideDown {
            from {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
            to {
                transform: translateX(-50%) translateY(100px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ==================== INITIALIZE ALL POLISH FEATURES ====================

let backToTopButton, scrollProgressBar, shareButton;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        backToTopButton = new BackToTopButton();
        scrollProgressBar = new ScrollProgressBar();
        shareButton = new ShareButton();
        
        window.polishFeatures = {
            backToTop: backToTopButton,
            scrollProgress: scrollProgressBar,
            share: shareButton
        };
    });
} else {
    backToTopButton = new BackToTopButton();
    scrollProgressBar = new ScrollProgressBar();
    shareButton = new ShareButton();
    
    window.polishFeatures = {
        backToTop: backToTopButton,
        scrollProgress: scrollProgressBar,
        share: shareButton
    };
}
