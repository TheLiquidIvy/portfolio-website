// ==================== LAZY LOADING & PERFORMANCE ====================

class LazyLoader {
    constructor() {
        this.images = [];
        this.components = new Map();
        this.observerOptions = {
            root: null,
            rootMargin: '50px',
            threshold: 0.01
        };
        this.init();
    }
    
    init() {
        this.setupImageLazyLoading();
        this.setupComponentLazyLoading();
        this.setupIntersectionObserverForAnimations();
        this.debounceScrollHandlers();
        this.throttleResizeHandlers();
    }
    
    // ==================== IMAGE LAZY LOADING ====================
    setupImageLazyLoading() {
        // Check for native lazy loading support
        if ('loading' in HTMLImageElement.prototype) {
            // Native lazy loading is supported
            this.images = document.querySelectorAll('img[data-src]');
            this.images.forEach(img => {
                img.src = img.dataset.src;
                img.loading = 'lazy';
                if (img.dataset.srcset) {
                    img.srcset = img.dataset.srcset;
                }
                img.removeAttribute('data-src');
                img.removeAttribute('data-srcset');
            });
        } else {
            // Fallback to Intersection Observer
            this.images = document.querySelectorAll('img[data-src]');
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        this.loadImage(img);
                        observer.unobserve(img);
                    }
                });
            }, this.observerOptions);
            
            this.images.forEach(img => imageObserver.observe(img));
        }
    }
    
    loadImage(img) {
        const src = img.dataset.src;
        const srcset = img.dataset.srcset;
        
        // Create a new image to preload
        const tempImg = new Image();
        
        tempImg.onload = () => {
            img.src = src;
            if (srcset) {
                img.srcset = srcset;
            }
            img.classList.add('loaded');
            img.removeAttribute('data-src');
            img.removeAttribute('data-srcset');
        };
        
        tempImg.onerror = () => {
            console.error('Failed to load image:', src);
            img.classList.add('error');
        };
        
        tempImg.src = src;
    }
    
    // ==================== COMPONENT LAZY LOADING ====================
    setupComponentLazyLoading() {
        // Lazy load heavy components
        this.registerComponent('.project-card', this.lazyLoadProjectCards.bind(this));
        this.registerComponent('.blog-post', this.lazyLoadBlogPosts.bind(this));
    }
    
    registerComponent(selector, loadFunction) {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) return;
        
        const componentObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadFunction(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);
        
        elements.forEach((el, index) => {
            // Load first 6 immediately, lazy load the rest
            if (index < 6) {
                loadFunction(el);
            } else {
                componentObserver.observe(el);
            }
        });
    }
    
    lazyLoadProjectCards(card) {
        // Add loaded class for any animations
        setTimeout(() => {
            card.classList.add('lazy-loaded');
        }, 100);
    }
    
    lazyLoadBlogPosts(post) {
        // Add loaded class for any animations
        setTimeout(() => {
            post.classList.add('lazy-loaded');
        }, 100);
    }
    
    // ==================== ANIMATION OPTIMIZATION ====================
    setupIntersectionObserverForAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll, [data-animate]');
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    // Don't unobserve so we can animate again when scrolling back
                } else {
                    // Optional: remove class when out of view to re-trigger animation
                    entry.target.classList.remove('in-view');
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        });
        
        animatedElements.forEach(el => animationObserver.observe(el));
    }
    
    // ==================== DEBOUNCING & THROTTLING ====================
    debounceScrollHandlers() {
        // Find all scroll event handlers and debounce them
        const searchInputs = document.querySelectorAll('input[type="search"], input[data-search]');
        searchInputs.forEach(input => {
            let debounceTimeout;
            const originalHandler = input.oninput;
            
            input.addEventListener('input', (e) => {
                clearTimeout(debounceTimeout);
                debounceTimeout = setTimeout(() => {
                    if (originalHandler) {
                        originalHandler.call(input, e);
                    }
                }, 300);
            });
        });
    }
    
    throttleResizeHandlers() {
        let resizeTimeout;
        let isResizing = false;
        
        const throttledResize = () => {
            if (!isResizing) {
                isResizing = true;
                
                requestAnimationFrame(() => {
                    window.dispatchEvent(new Event('throttledResize'));
                    isResizing = false;
                });
            }
        };
        
        window.addEventListener('resize', throttledResize);
    }
}

// ==================== DEBOUNCE & THROTTLE UTILITIES ====================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==================== SCROLL PERFORMANCE ====================

// Throttle scroll events
let scrollTimeout;
let isScrolling = false;

const optimizedScroll = throttle(() => {
    if (!isScrolling) {
        isScrolling = true;
        
        requestAnimationFrame(() => {
            window.dispatchEvent(new Event('optimizedScroll'));
            isScrolling = false;
        });
    }
}, 100);

window.addEventListener('scroll', optimizedScroll, { passive: true });

// ==================== CURSOR EFFECT OPTIMIZATION ====================

// Throttle mouse move for cursor effects
if (window.cursorEffects) {
    const originalMouseMove = document.onmousemove;
    let lastTime = 0;
    const fps60 = 1000 / 60; // 16ms
    
    document.addEventListener('mousemove', throttle((e) => {
        const now = Date.now();
        if (now - lastTime >= fps60) {
            lastTime = now;
            // Cursor effect will be handled by existing cursor.js
        }
    }, 16), { passive: true });
}

// ==================== PRELOAD CRITICAL ASSETS ====================

function preloadCriticalAssets() {
    // Preload critical fonts
    const fonts = [
        'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&display=swap',
        'https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap'
    ];
    
    fonts.forEach(fontUrl => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = fontUrl;
        document.head.appendChild(link);
    });
}

// ==================== CODE SPLITTING ====================

class CodeSplitter {
    constructor() {
        this.loadedModules = new Set();
    }
    
    async loadModule(moduleName) {
        if (this.loadedModules.has(moduleName)) {
            return;
        }
        
        try {
            switch (moduleName) {
                case 'terminal':
                    if (!document.getElementById('terminal-js')) {
                        await this.loadScript('js/terminal.js', 'terminal-js');
                    }
                    break;
                case 'music-player':
                    if (!document.getElementById('music-player-js')) {
                        await this.loadScript('js/music-player.js', 'music-player-js');
                        await this.loadStylesheet('css/music-player.css', 'music-player-css');
                    }
                    break;
                default:
                    console.warn('Unknown module:', moduleName);
            }
            
            this.loadedModules.add(moduleName);
        } catch (error) {
            console.error(`Error loading module ${moduleName}:`, error);
        }
    }
    
    loadScript(src, id) {
        return new Promise((resolve, reject) => {
            if (document.getElementById(id)) {
                resolve();
                return;
            }
            
            const script = document.createElement('script');
            script.id = id;
            script.src = src;
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
        });
    }
    
    loadStylesheet(href, id) {
        return new Promise((resolve, reject) => {
            if (document.getElementById(id)) {
                resolve();
                return;
            }
            
            const link = document.createElement('link');
            link.id = id;
            link.rel = 'stylesheet';
            link.href = href;
            link.onload = resolve;
            link.onerror = reject;
            document.head.appendChild(link);
        });
    }
}

// ==================== REDUCED MOTION SUPPORT ====================

function respectReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        document.documentElement.classList.add('reduce-motion');
        
        // Disable auto-playing features
        if (window.testimonialCarousel) {
            window.testimonialCarousel.stopAutoplay();
        }
    }
}

// ==================== INITIALIZE ====================

// Preload critical assets
preloadCriticalAssets();

// Initialize lazy loader
let lazyLoader;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        lazyLoader = new LazyLoader();
        respectReducedMotion();
    });
} else {
    lazyLoader = new LazyLoader();
    respectReducedMotion();
}

// Export utilities
window.performanceUtils = {
    debounce,
    throttle,
    codeSplitter: new CodeSplitter()
};

// Listen for reduced motion preference changes
window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', respectReducedMotion);
