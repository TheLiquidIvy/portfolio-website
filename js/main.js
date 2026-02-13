// ==================== MATRIX RAIN EFFECT ====================
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;

if (canvas && ctx) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
const matrixArray = matrix.split("");

const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = [];

for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

function drawMatrix() {
    if (!canvas || !ctx) {
        return;
    }

    ctx.fillStyle = 'rgba(5, 5, 8, 0.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ffff';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

if (canvas && ctx) {
    setInterval(drawMatrix, 35);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ==================== SECTION SWITCHING ====================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveNav(targetId) {
    if (!navLinks.length) {
        return;
    }

    navLinks.forEach(link => link.classList.remove('active'));
    const targetLink = document.querySelector(`.nav-link[href="${targetId}"]`);
    if (targetLink) {
        targetLink.classList.add('active');
    }
}

// Function to show specific section or scroll to anchor
function showSection(targetId, options = { scroll: true }) {
    const target = document.querySelector(targetId);
    if (!target) {
        return;
    }

    const isSection = target.tagName && target.tagName.toLowerCase() === 'section';

    if (isSection) {
        sections.forEach(section => {
            section.classList.remove('active');
        });

        target.classList.add('active');
        setActiveNav(targetId);

        if (options.scroll) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
    }

    if (options.scroll) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Show correct section by default (supports hash links)
const homeSection = document.querySelector('#home');
const initialHash = window.location.hash;

if (initialHash && document.querySelector(initialHash)) {
    showSection(initialHash, { scroll: false });
} else if (homeSection) {
    homeSection.classList.add('active');
    setActiveNav('#home');
}

// ==================== MOBILE MENU ====================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (!targetId || !targetId.startsWith('#')) {
            return;
        }

        e.preventDefault();
        showSection(targetId);

        if (navMenu) {
            navMenu.classList.remove('active');
        }
    });
});

// Handle dropdown links
document.querySelectorAll('.dropdown-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (!targetId || !targetId.startsWith('#')) {
            return;
        }
        e.preventDefault();
        showSection(targetId);
        // Highlight parent nav-link for dropdown items
        const parentNavLink = link.closest('.nav-dropdown')?.querySelector('.nav-link');
        if (parentNavLink) {
            navLinks.forEach(nl => nl.classList.remove('active'));
            parentNavLink.classList.add('active');
        }
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    });
});

// ==================== TYPING EFFECT ====================
const typingText = document.querySelector('.typing-text');
const phrases = [
    'Building Modern Web Applications',
    'Creating Scalable Solutions',
    'Full Stack Development Expert',
    'Cloud Architecture Specialist'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

if (typingText) {
    setTimeout(typeEffect, 1000);
}

// ==================== SCROLL ANIMATIONS ====================
// Animations now handled by section switching and CSS animations

// ==================== COUNTER ANIMATION ====================
const counters = document.querySelectorAll('.stat-number');
let counterAnimated = false;

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counterAnimated) {
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.ceil(current);
                        setTimeout(updateCounter, 20);
                    } else {
                        counter.textContent = target + '+';
                    }
                };

                updateCounter();
            });
            counterAnimated = true;
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    counterObserver.observe(statsSection);
}

// ==================== SKILL BARS ANIMATION ====================
const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progress = entry.target.getAttribute('data-progress');
            entry.target.style.width = progress + '%';
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// ==================== PROJECT FILTERING ====================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    // Skip if it's already a nav-link (already handled)
    if (!anchor.classList.contains('nav-link')) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            showSection(targetId);
        });
    }
});

// ==================== NAVBAR SCROLL EFFECT ====================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

if (navbar) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.background = 'rgba(10, 10, 15, 0.98)';
            navbar.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.7)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.5)';
        }

        lastScroll = currentScroll;
    });
}

// ==================== CONTACT FORM ====================
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(contactForm);
        
        // Show success message (you would typically send this to a server)
        alert('Message sent successfully! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// ==================== CURSOR EFFECTS ====================
document.addEventListener('mousemove', (e) => {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    cursor.style.cssText = `
        position: fixed;
        width: 5px;
        height: 5px;
        background: var(--primary);
        border-radius: 50%;
        pointer-events: none;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        animation: fadeOut 1s forwards;
        box-shadow: 0 0 10px var(--primary);
        z-index: 9999;
    `;
    
    document.body.appendChild(cursor);
    
    setTimeout(() => {
        cursor.remove();
    }, 1000);
});

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: scale(2);
        }
    }
`;
document.head.appendChild(style);

// ==================== PARALLAX EFFECT ====================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-visual');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ==================== PRELOADER ====================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
});

console.log('%c🌟 Welcome to the Cyberpunk Portfolio! 🌟', 'color: #00ffff; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with ❤️ and lots of ☕', 'color: #ff00ff; font-size: 14px;');
