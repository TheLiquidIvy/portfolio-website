// ==================== RESUME THEME SWITCHER ====================

class ResumeThemeManager {
  constructor() {
    this.currentTheme = 'human'; // Default theme
    this.init();
  }
  
  init() {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('resumeTheme');
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else {
      this.setTheme('human');
    }
    
    // Setup event listeners
    this.setupEventListeners();
  }
  
  setupEventListeners() {
    // Theme buttons
    const humanBtn = document.getElementById('theme-human');
    const atsBtn = document.getElementById('theme-ats');
    const downloadBtn = document.getElementById('download-resume');
    
    if (humanBtn) {
      humanBtn.addEventListener('click', () => this.setTheme('human'));
    }
    
    if (atsBtn) {
      atsBtn.addEventListener('click', () => this.setTheme('ats'));
    }
    
    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => this.downloadResume());
    }
  }
  
  setTheme(theme) {
    this.currentTheme = theme;
    
    // Remove all theme classes
    document.body.classList.remove('theme-human', 'theme-ats');
    
    // Add new theme class
    document.body.classList.add(`theme-${theme}`);
    
    // Update active button states
    const allButtons = document.querySelectorAll('.theme-btn');
    allButtons.forEach(btn => btn.classList.remove('active'));
    
    const activeButton = document.getElementById(`theme-${theme}`);
    if (activeButton) {
      activeButton.classList.add('active');
    }
    
    // Save to localStorage
    localStorage.setItem('resumeTheme', theme);
    
    // Announce theme change
    this.announceThemeChange(theme);
  }
  
  announceThemeChange(theme) {
    const themeName = theme === 'human' ? 'Human-Readable' : 'ATS-Optimized';
    console.log(`✨ Theme switched to: ${themeName}`);
    
    // Optional: Show a brief toast notification
    this.showToast(`Theme: ${themeName}`);
  }
  
  showToast(message) {
    // Create toast element
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      padding: 12px 24px;
      background: rgba(0, 243, 255, 0.9);
      color: #0a0a0a;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
      font-weight: bold;
      z-index: 10000;
      animation: toastSlideIn 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    // Remove after 2 seconds
    setTimeout(() => {
      toast.style.animation = 'toastSlideOut 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }
  
  downloadResume() {
    // Switch to ATS theme for download
    const originalTheme = this.currentTheme;
    this.setTheme('ats');
    
    // Wait a moment for theme to apply
    setTimeout(() => {
      window.print();
      
      // Switch back to original theme after print dialog
      setTimeout(() => {
        this.setTheme(originalTheme);
      }, 500);
    }, 100);
  }
}

// Add toast animations to document
const style = document.createElement('style');
style.textContent = `
  @keyframes toastSlideIn {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }
  
  @keyframes toastSlideOut {
    from {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
    to {
      opacity: 0;
      transform: translateX(-50%) translateY(20px);
    }
  }
`;
document.head.appendChild(style);

// Initialize theme manager when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.resumeThemeManager = new ResumeThemeManager();
  });
} else {
  window.resumeThemeManager = new ResumeThemeManager();
}