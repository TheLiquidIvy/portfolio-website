// ==================== SERVICE WORKER ====================

const CACHE_NAME = 'portfolio-cache-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './css/style.css',
    './css/themes.css',
    './css/terminal.css',
    './css/loading.css',
    './css/certifications.css',
    './css/enhanced-projects.css',
    './css/timeline.css',
    './css/blog.css',
    './css/testimonials.css',
    './css/music-player.css',
    './css/social-feed.css',
    './css/print.css',
    './js/main.js',
    './js/loading.js',
    './js/accessibility.js',
    './js/theme-switcher.js',
    './js/terminal.js',
    './js/cursor.js',
    './js/easter-eggs.js',
    './js/certifications.js',
    './js/project-enhancements.js',
    './js/contact-form.js',
    './js/timeline.js',
    './js/blog.js',
    './js/testimonials.js',
    './js/analytics.js',
    './js/music-player.js',
    './js/social-feed.js',
    './js/lazy-loading.js',
    './js/console-easter-egg.js',
    './js/performance-monitor.js',
    './js/polish-features.js'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] Caching assets');
                // Don't fail if some assets can't be cached
                return Promise.allSettled(
                    ASSETS_TO_CACHE.map(url => {
                        return cache.add(url).catch(err => {
                            console.warn('[Service Worker] Failed to cache:', url, err);
                        });
                    })
                );
            })
            .then(() => {
                console.log('[Service Worker] All assets cached');
                return self.skipWaiting();
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== CACHE_NAME) {
                            console.log('[Service Worker] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('[Service Worker] Activated');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip cross-origin requests
    if (url.origin !== location.origin) {
        // For API calls (like GitHub), use network-first strategy
        if (url.hostname.includes('api.github.com')) {
            event.respondWith(networkFirst(request));
            return;
        }
        
        // For external resources (fonts, etc.), try network first
        event.respondWith(
            fetch(request)
                .catch(() => {
                    // Return a basic response if offline
                    return new Response('Offline', {
                        status: 503,
                        statusText: 'Service Unavailable'
                    });
                })
        );
        return;
    }
    
    // For same-origin requests, use cache-first strategy
    event.respondWith(cacheFirst(request));
});

// Cache-first strategy (good for static assets)
async function cacheFirst(request) {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);
    
    if (cached) {
        console.log('[Service Worker] Serving from cache:', request.url);
        return cached;
    }
    
    try {
        const response = await fetch(request);
        
        // Cache the new response if it's successful
        if (response.ok) {
            const clonedResponse = response.clone();
            cache.put(request, clonedResponse);
        }
        
        return response;
    } catch (error) {
        console.error('[Service Worker] Fetch failed:', error);
        
        // Return offline page if available
        const offlinePage = await cache.match('./offline.html');
        if (offlinePage) {
            return offlinePage;
        }
        
        // Return a basic offline response
        return new Response(
            '<html><body><h1>You are offline</h1><p>Please check your internet connection.</p></body></html>',
            {
                headers: { 'Content-Type': 'text/html' }
            }
        );
    }
}

// Network-first strategy (good for API calls)
async function networkFirst(request) {
    const cache = await caches.open(CACHE_NAME);
    
    try {
        const response = await fetch(request);
        
        // Cache the response if successful
        if (response.ok) {
            const clonedResponse = response.clone();
            cache.put(request, clonedResponse);
        }
        
        return response;
    } catch (error) {
        console.log('[Service Worker] Network failed, trying cache:', request.url);
        
        // Try to return cached version
        const cached = await cache.match(request);
        if (cached) {
            return cached;
        }
        
        // Return error response
        return new Response(
            JSON.stringify({ error: 'Network error and no cached data available' }),
            {
                status: 503,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}

// Listen for messages from the main thread
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        caches.delete(CACHE_NAME).then(() => {
            console.log('[Service Worker] Cache cleared');
            event.ports[0].postMessage({ success: true });
        });
    }
});

// Periodic sync (if supported)
if ('periodicSync' in self.registration) {
    self.addEventListener('periodicsync', (event) => {
        if (event.tag === 'update-cache') {
            event.waitUntil(updateCache());
        }
    });
}

async function updateCache() {
    const cache = await caches.open(CACHE_NAME);
    
    return Promise.allSettled(
        ASSETS_TO_CACHE.map(url => {
            return fetch(url)
                .then(response => {
                    if (response.ok) {
                        return cache.put(url, response);
                    }
                })
                .catch(err => {
                    console.warn('[Service Worker] Failed to update cache for:', url, err);
                });
        })
    );
}

console.log('[Service Worker] Loaded');
