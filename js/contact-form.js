// ==================== CONTACT FORM VALIDATION & INTEGRATION ====================

class ContactFormHandler {
    constructor() {
        this.form = document.querySelector('.contact-form');
        this.submitCount = 0;
        this.lastSubmitTime = 0;
        this.rateLimit = 60000; // 1 minute between submissions
        
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.setupValidation();
        this.setupSubmitHandler();
    }

    setupValidation() {
        const inputs = this.form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            // Real-time validation on blur
            input.addEventListener('blur', () => this.validateField(input));
            
            // Remove error on input
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    setupSubmitHandler() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    validateField(field) {
        const value = field.value.trim();
        const name = field.name;
        let error = '';

        switch(name) {
            case 'name':
                if (!value) {
                    error = 'Name is required';
                } else if (value.length < 2) {
                    error = 'Name must be at least 2 characters';
                }
                break;
            
            case 'email':
                if (!value) {
                    error = 'Email is required';
                } else if (!this.isValidEmail(value)) {
                    error = 'Please enter a valid email address';
                }
                break;
            
            case 'subject':
                if (!value) {
                    error = 'Subject is required';
                } else if (value.length < 5) {
                    error = 'Subject must be at least 5 characters';
                }
                break;
            
            case 'message':
                if (!value) {
                    error = 'Message is required';
                } else if (value.length < 20) {
                    error = 'Message must be at least 20 characters';
                }
                break;
        }

        if (error) {
            this.showFieldError(field, error);
            return false;
        } else {
            this.clearFieldError(field);
            return true;
        }
    }

    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        
        field.classList.add('error');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #ff0066;
            font-size: 12px;
            margin-top: 5px;
            animation: slideInDown 0.3s ease;
        `;
        
        field.parentElement.appendChild(errorElement);
    }

    clearFieldError(field) {
        field.classList.remove('error');
        
        const errorElement = field.parentElement.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    validateForm() {
        const inputs = this.form.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    checkRateLimit() {
        const now = Date.now();
        const timeSinceLastSubmit = now - this.lastSubmitTime;
        
        if (timeSinceLastSubmit < this.rateLimit && this.lastSubmitTime !== 0) {
            const remainingTime = Math.ceil((this.rateLimit - timeSinceLastSubmit) / 1000);
            return {
                allowed: false,
                remainingTime: remainingTime
            };
        }
        
        return { allowed: true };
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        // Validate form
        if (!this.validateForm()) {
            this.showNotification('Please fix the errors in the form', 'error');
            return;
        }

        // Check rate limit
        const rateLimitCheck = this.checkRateLimit();
        if (!rateLimitCheck.allowed) {
            this.showNotification(
                `Please wait ${rateLimitCheck.remainingTime} seconds before submitting again`,
                'warning'
            );
            return;
        }

        // Get form data
        const formData = new FormData(this.form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        // Show loading state
        this.setLoadingState(true);

        try {
            // For demo purposes, simulate API call
            // In production, you would use Formspree or EmailJS
            await this.submitToService(data);
            
            this.lastSubmitTime = Date.now();
            this.submitCount++;
            
            // Show success
            this.showSuccessModal(data);
            
            // Reset form
            this.form.reset();
            
        } catch (error) {
            this.showErrorModal(error.message);
        } finally {
            this.setLoadingState(false);
        }
    }

    async submitToService(data) {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // 90% success rate for demo
                if (Math.random() > 0.1) {
                    resolve({ success: true });
                } else {
                    reject(new Error('Network error. Please try again.'));
                }
            }, 2000);
        });

        // For production with Formspree:
        /*
        const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to send message');
        }

        return await response.json();
        */

        // For production with EmailJS:
        /*
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', data)
            .then(response => resolve(response))
            .catch(error => reject(error));
        */
    }

    setLoadingState(loading) {
        const submitBtn = this.form.querySelector('button[type="submit"]');
        
        if (loading) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <span class="spinner"></span>
                Sending...
            `;
            submitBtn.classList.add('loading');
        } else {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Send Message';
            submitBtn.classList.remove('loading');
        }
    }

    showSuccessModal(data) {
        const modal = document.createElement('div');
        modal.className = 'contact-modal success-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;

        modal.innerHTML = `
            <div class="modal-content" style="
                background: var(--bg-dark);
                border: 2px solid var(--neon-green);
                border-radius: 8px;
                padding: 40px;
                max-width: 500px;
                text-align: center;
                box-shadow: 0 0 40px rgba(0, 255, 65, 0.5);
                animation: modalBounceIn 0.5s ease;
            ">
                <div class="success-checkmark" style="
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    border: 4px solid var(--neon-green);
                    margin: 0 auto 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 50px;
                    color: var(--neon-green);
                    animation: checkmarkPop 0.6s ease 0.3s backwards;
                ">✓</div>
                <h2 style="color: var(--neon-green); margin-bottom: 15px; font-size: 28px;">Message Sent Successfully!</h2>
                <p style="color: var(--text); margin-bottom: 20px; font-size: 16px;">
                    Thank you for reaching out, ${data.name}!<br>
                    I'll get back to you at ${data.email} as soon as possible.
                </p>
                <button onclick="this.closest('.contact-modal').remove()" style="
                    background: var(--neon-green);
                    color: var(--bg-dark);
                    border: none;
                    padding: 12px 30px;
                    border-radius: 4px;
                    font-size: 16px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.3s ease;
                ">Close</button>
            </div>
        `;

        document.body.appendChild(modal);

        // Create confetti
        this.createConfetti();

        // Auto-close after 5 seconds
        setTimeout(() => {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => modal.remove(), 300);
        }, 5000);
    }

    showErrorModal(message) {
        const modal = document.createElement('div');
        modal.className = 'contact-modal error-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;

        modal.innerHTML = `
            <div class="modal-content" style="
                background: var(--bg-dark);
                border: 2px solid #ff0066;
                border-radius: 8px;
                padding: 40px;
                max-width: 500px;
                text-align: center;
                box-shadow: 0 0 40px rgba(255, 0, 102, 0.5);
            ">
                <div class="error-icon" style="
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    border: 4px solid #ff0066;
                    margin: 0 auto 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 50px;
                    color: #ff0066;
                ">✗</div>
                <h2 style="color: #ff0066; margin-bottom: 15px; font-size: 28px;">Oops! Something went wrong</h2>
                <p style="color: var(--text); margin-bottom: 20px; font-size: 16px;">
                    ${message}
                </p>
                <div style="display: flex; gap: 10px; justify-content: center;">
                    <button onclick="this.closest('.contact-modal').remove()" style="
                        background: transparent;
                        color: var(--text);
                        border: 2px solid var(--text);
                        padding: 12px 30px;
                        border-radius: 4px;
                        font-size: 16px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    ">Cancel</button>
                    <button onclick="this.closest('.contact-modal').remove(); document.querySelector('.contact-form').dispatchEvent(new Event('submit'))" style="
                        background: #ff0066;
                        color: white;
                        border: none;
                        padding: 12px 30px;
                        border-radius: 4px;
                        font-size: 16px;
                        font-weight: bold;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    ">Retry</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    showNotification(message, type = 'info') {
        const colors = {
            info: 'var(--neon-blue)',
            success: 'var(--neon-green)',
            warning: 'var(--accent)',
            error: '#ff0066'
        };

        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: rgba(0, 0, 0, 0.95);
            color: ${colors[type]};
            padding: 15px 25px;
            border: 2px solid ${colors[type]};
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            z-index: 10001;
            box-shadow: 0 0 20px ${colors[type]}80;
            animation: slideInRight 0.3s ease;
        `;

        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    createConfetti() {
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: ${['var(--neon-blue)', 'var(--neon-pink)', 'var(--neon-green)', 'var(--accent)'][Math.floor(Math.random() * 4)]};
                top: -10px;
                left: ${Math.random() * 100}%;
                opacity: 1;
                z-index: 10003;
                animation: confettiFall ${2 + Math.random() * 2}s linear forwards;
                transform: rotate(${Math.random() * 360}deg);
            `;

            document.body.appendChild(confetti);

            setTimeout(() => confetti.remove(), 4000);
        }
    }
}

// Add animations
const formStyles = document.createElement('style');
formStyles.textContent = `
    .contact-form input.error,
    .contact-form textarea.error {
        border-color: #ff0066 !important;
        box-shadow: 0 0 10px rgba(255, 0, 102, 0.5) !important;
    }

    .contact-form button.loading {
        opacity: 0.7;
        cursor: not-allowed;
    }

    .spinner {
        display: inline-block;
        width: 12px;
        height: 12px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
        margin-right: 8px;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }

    @keyframes slideInDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes modalBounceIn {
        0% {
            opacity: 0;
            transform: scale(0.3);
        }
        50% {
            transform: scale(1.05);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }

    @keyframes checkmarkPop {
        0% {
            opacity: 0;
            transform: scale(0);
        }
        50% {
            transform: scale(1.2);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }

    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(formStyles);

// Initialize contact form handler
let contactFormHandler;
document.addEventListener('DOMContentLoaded', () => {
    contactFormHandler = new ContactFormHandler();
});
