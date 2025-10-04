// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.borderBottomColor = 'rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.8)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.borderBottomColor = 'rgba(0, 0, 0, 0.05)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all glass cards for scroll animations
document.querySelectorAll('.glass-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const titleLines = document.querySelectorAll('.title-line');
    const texts = ['Think like a founder.', 'Build like an engineer.'];
    
    titleLines.forEach((line, index) => {
        setTimeout(() => {
            typeWriter(line, texts[index], 100);
        }, index * 1500);
    });
});

// Parallax effect for background orbs
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    document.querySelectorAll('.gradient-orb').forEach((orb, index) => {
        const speed = (index + 1) * 0.3;
        orb.style.transform = `translateY(${rate * speed}px)`;
    });
});

// Dynamic particle system
function createParticles() {
    const particlesContainer = document.querySelector('.floating-particles');
    if (!particlesContainer) {
        console.log('Particles container not found');
        return;
    }
    
    // Clear existing particles completely
    while (particlesContainer.firstChild) {
        particlesContainer.removeChild(particlesContainer.firstChild);
    }
    
    // Check current theme - add debug logging
    const currentTheme = document.documentElement.getAttribute('data-theme');
    console.log('Current theme:', currentTheme);
    
    const isDarkMode = currentTheme === 'dark';
    const particleColor = isDarkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.4)';
    
    console.log('Creating particles with color:', particleColor);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const animationDuration = Math.random() * 10 + 15; // 15-25 seconds
        const animationDelay = Math.random() * 10;
        const leftPosition = Math.random() * 100;
        const topPosition = Math.random() * 100;
        
        particle.style.cssText = `
            position: absolute;
            width: 3px;
            height: 3px;
            background: ${particleColor};
            border-radius: 50%;
            pointer-events: none;
            left: ${leftPosition}%;
            top: ${topPosition}%;
            animation: particleFloat ${animationDuration}s linear infinite;
            animation-delay: ${animationDelay}s;
            opacity: 0;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    console.log('Created', particlesContainer.children.length, 'particles');
}

// Add particle animation CSS
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Initialize particles after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure theme is set
    setTimeout(() => {
        createParticles();
    }, 100);
});

// Also initialize immediately in case DOMContentLoaded already fired
if (document.readyState === 'loading') {
    // DOM is still loading
} else {
    // DOM is already loaded
    setTimeout(() => {
        createParticles();
    }, 100);
}

// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);

// Update icon based on current theme
function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-moon';
    } else {
        themeIcon.className = 'fas fa-sun';
    }
}

// Initialize icon
updateThemeIcon(currentTheme);

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    console.log('Switching theme from', currentTheme, 'to', newTheme);
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Add a subtle animation to the toggle button
    themeToggle.style.transform = 'scale(0.95)';
    setTimeout(() => {
        themeToggle.style.transform = 'scale(1)';
    }, 150);
    
    // Recreate particles with new theme colors after a small delay
    setTimeout(() => {
        createParticles();
    }, 100);
});

// Philosophy principles interaction
document.querySelectorAll('.principle').forEach(principle => {
    principle.addEventListener('mouseenter', () => {
        principle.style.transform = 'translateY(-3px)';
    });
    
    principle.addEventListener('mouseleave', () => {
        principle.style.transform = 'translateY(0)';
    });
});

// Form submission handling
const contactForm = document.querySelector('.form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('.btn-primary');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            contactForm.reset();
            showNotification('Message sent successfully!', 'success');
        }, 2000);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(52, 199, 89, 0.95)' : 'rgba(255, 59, 48, 0.95)'};
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        backdrop-filter: blur(20px);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
        font-size: 14px;
        font-weight: 500;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 400);
    }, 3000);
}

// Skill tags hover effect
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        tag.style.background = '#1d1d1f';
        tag.style.color = 'white';
        tag.style.transform = 'translateY(-1px) scale(1.02)';
    });
    
    tag.addEventListener('mouseleave', () => {
        tag.style.background = '#f5f5f7';
        tag.style.color = '#1d1d1f';
        tag.style.transform = 'translateY(0) scale(1)';
    });
});

// Project links functionality
document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        showNotification('Project links coming soon!', 'info');
    });
});

// Neural network connection animation
function animateConnections() {
    const connections = document.querySelectorAll('.connection');
    connections.forEach((conn, index) => {
        const nodes = document.querySelectorAll('.node');
        if (nodes.length >= 2) {
            // Calculate connection positions dynamically
            const startNode = nodes[index % nodes.length];
            const endNode = nodes[(index + 1) % nodes.length];
            
            if (startNode && endNode) {
                const startRect = startNode.getBoundingClientRect();
                const endRect = endNode.getBoundingClientRect();
                const parentRect = startNode.parentElement.getBoundingClientRect();
                
                const startX = startRect.left - parentRect.left + startRect.width / 2;
                const startY = startRect.top - parentRect.top + startRect.height / 2;
                const endX = endRect.left - parentRect.left + endRect.width / 2;
                const endY = endRect.top - parentRect.top + endRect.height / 2;
                
                const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
                const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
                
                conn.style.width = `${length}px`;
                conn.style.left = `${startX}px`;
                conn.style.top = `${startY}px`;
                conn.style.transform = `rotate(${angle}deg)`;
                conn.style.transformOrigin = '0 50%';
            }
        }
    });
}

// Initialize neural network connections
window.addEventListener('load', animateConnections);
window.addEventListener('resize', animateConnections);

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Parallax and navbar effects are already defined above
}, 16)); // ~60fps

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.length === konamiSequence.length && 
        konamiCode.every((code, index) => code === konamiSequence[index])) {
        
        // Activate subtle animation mode
        document.body.style.filter = 'none';
        const cards = document.querySelectorAll('.glass-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    card.style.transform = 'scale(1)';
                }, 200);
            }, index * 100);
        });
        showNotification('✨ Subtle mode activated!', 'success');
        
        konamiCode = [];
    }
});

console.log('Personal website loaded successfully.');
console.log('Try the Konami code: ↑↑↓↓←→←→BA');
