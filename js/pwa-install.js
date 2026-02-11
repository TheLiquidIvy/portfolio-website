// ==================== PWA INSTALL HANDLER ====================

class PWAInstaller {
    constructor() {
        this.deferredPrompt = null;
        this.isInstalled = false;
        this.init();
    }

    init() {
        // Check if already installed
        this.checkInstallStatus();
        
        // Listen for beforeinstallprompt event
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            this.showInstallPrompt();
        });

        // Listen for app installed event
        window.addEventListener('appinstalled', () => {
            console.log('[PWA] App installed successfully');
            this.isInstalled = true;
            this.hideInstallPrompt();
            this.showInstallSuccess();
        });

        // Register service worker
        this.registerServiceWorker();

        // Monitor online/offline status
        this.monitorConnectionStatus();

        // Check for updates
        this.checkForUpdates();
    }

    checkInstallStatus() {
        // Check if running as PWA
        if (window.matchMedia('(display-mode: standalone)').matches || 
            window.navigator.standalone === true) {
            this.isInstalled = true;
            console.log('[PWA] App is running in standalone mode');
        }
    }

    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js');
                console.log('[PWA] Service Worker registered:', registration.scope);

                // Check for updates
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            this.showUpdateNotification(registration);
                        }
                    });
                });

                // Check for updates every hour
                setInterval(() => {
                    registration.update();
                }, 60 * 60 * 1000);

            } catch (error) {
                console.error('[PWA] Service Worker registration failed:', error);
            }
        }
    }

    showInstallPrompt() {
        if (this.isInstalled) return;

        // Create install prompt UI
        const prompt = document.createElement('div');
        prompt.className = 'pwa-install-prompt';
        prompt.id = 'pwaInstallPrompt';
        prompt.innerHTML = `
            <div class="pwa-prompt-content">
                <div class="pwa-icon">📱</div>
                <div class="pwa-text">
                    <h3>Install Portfolio App</h3>
                    <p>Get the full experience with offline access</p>
                </div>
                <div class="pwa-buttons">
                    <button class="pwa-btn pwa-btn-install" id="pwaInstallBtn">Install</button>
                    <button class="pwa-btn pwa-btn-dismiss" id="pwaDismissBtn">Later</button>
                </div>
            </div>
        `;

        document.body.appendChild(prompt);

        // Show prompt with delay
        setTimeout(() => {
            prompt.classList.add('show');
        }, 2000);

        // Install button click
        document.getElementById('pwaInstallBtn').addEventListener('click', () => {
            this.installApp();
        });

        // Dismiss button click
        document.getElementById('pwaDismissBtn').addEventListener('click', () => {
            this.hideInstallPrompt();
            // Remember dismissal for 7 days
            localStorage.setItem('pwa-dismissed', Date.now() + (7 * 24 * 60 * 60 * 1000));
        });

        // Add install button to navbar if not already present
        this.addNavbarInstallButton();
    }

    addNavbarInstallButton() {
        if (this.isInstalled || document.getElementById('pwaNavbarBtn')) return;

        const navMenu = document.querySelector('.nav-menu');
        if (!navMenu) return;

        const installBtn = document.createElement('li');
        installBtn.innerHTML = `
            <button class="pwa-navbar-btn" id="pwaNavbarBtn">
                <span class="icon">📱</span>
                <span>Install App</span>
            </button>
        `;

        navMenu.appendChild(installBtn);

        document.getElementById('pwaNavbarBtn').addEventListener('click', () => {
            this.installApp();
        });
    }

    async installApp() {
        if (!this.deferredPrompt) {
            console.log('[PWA] Install prompt not available');
            return;
        }

        // Show the install prompt
        this.deferredPrompt.prompt();

        // Wait for the user's response
        const { outcome } = await this.deferredPrompt.userChoice;
        console.log(`[PWA] User choice: ${outcome}`);

        if (outcome === 'accepted') {
            console.log('[PWA] User accepted the install prompt');
        } else {
            console.log('[PWA] User dismissed the install prompt');
        }

        // Clear the deferred prompt
        this.deferredPrompt = null;
        this.hideInstallPrompt();
    }

    hideInstallPrompt() {
        const prompt = document.getElementById('pwaInstallPrompt');
        if (prompt) {
            prompt.classList.remove('show');
            setTimeout(() => {
                prompt.remove();
            }, 500);
        }
    }

    showInstallSuccess() {
        const notification = document.createElement('div');
        notification.className = 'pwa-status show';
        notification.innerHTML = `
            <div class="pwa-status-content">
                <div class="pwa-status-icon">✅</div>
                <div class="pwa-status-text">
                    <h4>Successfully Installed!</h4>
                    <p>You can now use the app offline</p>
                </div>
            </div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 500);
        }, 5000);
    }

    showUpdateNotification(registration) {
        const notification = document.createElement('div');
        notification.className = 'pwa-update-notification';
        notification.innerHTML = `
            <div class="pwa-update-content">
                <div class="pwa-update-icon">🔄</div>
                <div class="pwa-update-text">
                    <h4>Update Available</h4>
                    <p>A new version is ready to install</p>
                </div>
            </div>
            <button class="pwa-update-btn" id="pwaUpdateBtn">Update Now</button>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        document.getElementById('pwaUpdateBtn').addEventListener('click', () => {
            // Tell the service worker to skip waiting
            if (registration.waiting) {
                registration.waiting.postMessage({ type: 'SKIP_WAITING' });
            }

            // Reload the page
            window.location.reload();
        });
    }

    monitorConnectionStatus() {
        let offlineIndicator = null;

        const showOfflineIndicator = (isOnline) => {
            if (!offlineIndicator) {
                offlineIndicator = document.createElement('div');
                offlineIndicator.className = 'offline-indicator';
                document.body.appendChild(offlineIndicator);
            }

            offlineIndicator.innerHTML = `
                <span class="offline-icon">${isOnline ? '🟢' : '🔴'}</span>
                <span>${isOnline ? 'Back Online' : 'You\'re Offline'}</span>
            `;

            if (isOnline) {
                offlineIndicator.classList.add('online');
            } else {
                offlineIndicator.classList.remove('online');
            }

            offlineIndicator.classList.add('show');

            if (isOnline) {
                setTimeout(() => {
                    offlineIndicator.classList.remove('show');
                }, 3000);
            }
        };

        window.addEventListener('online', () => {
            console.log('[PWA] Back online');
            showOfflineIndicator(true);
        });

        window.addEventListener('offline', () => {
            console.log('[PWA] Gone offline');
            showOfflineIndicator(false);
        });

        // Initial check
        if (!navigator.onLine) {
            showOfflineIndicator(false);
        }
    }

    checkForUpdates() {
        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
            // Check for updates every 10 minutes
            setInterval(() => {
                navigator.serviceWorker.controller.postMessage({
                    type: 'CHECK_UPDATE'
                });
            }, 10 * 60 * 1000);
        }
    }
}

// Initialize PWA installer
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new PWAInstaller();
    });
} else {
    new PWAInstaller();
}

// Export for use in other modules
window.PWAInstaller = PWAInstaller;

console.log('[PWA] PWA Install handler loaded');
