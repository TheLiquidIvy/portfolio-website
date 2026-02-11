// ==================== ENHANCED SERVICE WORKER FOR PWA ====================

const CACHE_VERSION = 'v2';
const CACHE_NAME = `portfolio-cache-${CACHE_VERSION}`;
const OFFLINE_CACHE = `offline-${CACHE_VERSION}`;
const API_CACHE = `api-${CACHE_VERSION}`;

const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './offline.html',
    './manifest.json',
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
    './css/glitch-transitions.css',
    './css/section-navigation.css',
    './css/print.css',
    './css/pwa.css',
    './css/global-search.css',
    './css/3d-elements.css',
    './css/stats-dashboard.css',
    './css/resume.css',
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
    './js/polish-features.js',
    './js/glitch-scroll.js',
    './js/pwa-install.js',
    './js/global-search.js',
    './js/3d-hero.js',
    './js/stats-dashboard.js',
    './js/resume-generator.js',
    './js/portfolio-api.js'
];

const API_ENDPOINTS = [
    './api/portfolio.json',
    './api/projects.json',
    './api/blog.json',
    './api/skills.json',
    './api/stats.json'
];

// Install event - cache all assets
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing...');
    
    event.waitUntil(
        Promise.all([
            caches.open(CACHE_NAME).then((cache) => {
                console.log('[Service Worker] Caching app shell');
                return cache.addAll(ASSETS_TO_CACHE.filter(url => {
                    // Filter out files that might not exist yet
                    return true;
                })).catch(err => {
                    console.warn('[Service Worker] Some assets failed to cache:', err);
                });
            }),
            caches.open(OFFLINE_CACHE).then((cache) => {
                return cache.add('./offline.html');
            }),
            caches.open(API_CACHE).then((cache) => {
                console.log('[Service Worker] Caching API endpoints');
                return Promise.allSettled(
                    API_ENDPOINTS.map(url => cache.add(url).catch(e => console.warn('Failed to cache:', url)))
                );
            })
        ]).then(() => {
            console.log('[Service Worker] Installation complete');
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
                        if (!cacheName.includes(CACHE_VERSION)) {
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

// Fetch event - advanced caching strategies
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip cross-origin requests (except CDN resources)
    if (url.origin !== location.origin) {
        // Network-only for external resources
        event.respondWith(
            fetch(request).catch(() => {
                return new Response('Offline', {
                    status: 503,
                    statusText: 'Service Unavailable'
                });
            })
        );
        return;
    }
    
    // API endpoints - network first, cache fallback
    if (request.url.includes('/api/')) {
        event.respondWith(networkFirst(request, API_CACHE));
        return;
    }
    
    // HTML pages - network first with cache fallback
    if (request.destination === 'document') {
        event.respondWith(networkFirst(request, CACHE_NAME));
        return;
    }
    
    // Static assets - cache first
    event.respondWith(cacheFirst(request));
});

// Cache-first strategy
async function cacheFirst(request) {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);
    
    if (cached) {
        return cached;
    }
    
    try {
        const response = await fetch(request);
        
        if (response.ok) {
            cache.put(request, response.clone());
        }
        
        return response;
    } catch (error) {
        console.error('[Service Worker] Fetch failed:', error);
        
        // Return offline page for navigation requests
        if (request.destination === 'document') {
            const offlineCache = await caches.open(OFFLINE_CACHE);
            const offlinePage = await offlineCache.match('./offline.html');
            if (offlinePage) {
                return offlinePage;
            }
        }
        
        return new Response('Offline', {
            status: 503,
            statusText: 'Service Unavailable'
        });
    }
}

// Network-first strategy
async function networkFirst(request, cacheName = CACHE_NAME) {
    const cache = await caches.open(cacheName);
    
    try {
        const response = await fetch(request);
        
        if (response.ok) {
            cache.put(request, response.clone());
        }
        
        return response;
    } catch (error) {
        console.log('[Service Worker] Network failed, trying cache');
        
        const cached = await cache.match(request);
        if (cached) {
            return cached;
        }
        
        // Return offline page for navigation
        if (request.destination === 'document') {
            const offlineCache = await caches.open(OFFLINE_CACHE);
            return offlineCache.match('./offline.html');
        }
        
        return new Response('Offline', {
            status: 503,
            statusText: 'Service Unavailable'
        });
    }
}

// Background Sync for contact form
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-contact-form') {
        event.waitUntil(syncContactForm());
    }
});

async function syncContactForm() {
    try {
        // Get pending form submissions from IndexedDB
        const db = await openDB();
        const submissions = await getAllSubmissions(db);
        
        for (const submission of submissions) {
            try {
                // Attempt to submit the form
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(submission.data)
                });
                
                if (response.ok) {
                    // Remove from pending queue
                    await deleteSubmission(db, submission.id);
                    
                    // Notify the client
                    const clients = await self.clients.matchAll();
                    clients.forEach(client => {
                        client.postMessage({
                            type: 'SYNC_SUCCESS',
                            submissionId: submission.id
                        });
                    });
                }
            } catch (error) {
                console.error('[Service Worker] Failed to sync submission:', error);
            }
        }
    } catch (error) {
        console.error('[Service Worker] Background sync failed:', error);
    }
}

// IndexedDB helpers (simplified - actual implementation would be more robust)
function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('portfolio-db', 1);
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
        
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('submissions')) {
                db.createObjectStore('submissions', { keyPath: 'id', autoIncrement: true });
            }
        };
    });
}

function getAllSubmissions(db) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['submissions'], 'readonly');
        const store = transaction.objectStore('submissions');
        const request = store.getAll();
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
    });
}

function deleteSubmission(db, id) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['submissions'], 'readwrite');
        const store = transaction.objectStore('submissions');
        const request = store.delete(id);
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
    });
}

// Message handler
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        Promise.all([
            caches.delete(CACHE_NAME),
            caches.delete(OFFLINE_CACHE),
            caches.delete(API_CACHE)
        ]).then(() => {
            console.log('[Service Worker] All caches cleared');
            if (event.ports && event.ports[0]) {
                event.ports[0].postMessage({ success: true });
            }
        });
    }
});

console.log('[Service Worker] Enhanced PWA Service Worker loaded');
