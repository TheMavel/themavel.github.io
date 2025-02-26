// Main JavaScript file for the Startplatz AI Hub website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize header scroll effect
    initHeaderScroll();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize smooth scrolling for anchor links
    initSmoothScroll();
    
    // Initialize form validation
    initFormValidation();
    
    // Initialize cookie consent
    initCookieConsent();
    
    // Initialize scroll to top button
    initScrollToTop();
    
    // Initialize scroll progress indicator
    initScrollProgress();
    
    // Initialize custom cursor
    initCustomCursor();
    
    // Initialize typed text effect
    initTypedText();
    
    // Initialize counters animation
    initCounters();
    
    // Initialize parallax scrolling effect
    initParallaxScrolling();
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Load 3D.js script
    loadThreeJS();
    
    // Initialize glitch effect
    initGlitchEffect();
});

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

// Mobile menu functionality
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuBtn && mobileMenu) {
        // Initially hide the mobile menu
        mobileMenu.style.display = 'none';
        
        menuBtn.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                mobileMenu.style.display = 'none';
                menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                menuBtn.setAttribute('aria-expanded', 'false');
            } else {
                mobileMenu.classList.add('active');
                mobileMenu.style.display = 'block';
                menuBtn.innerHTML = '<i class="fas fa-times"></i>';
                menuBtn.setAttribute('aria-expanded', 'true');
            }
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                mobileMenu.style.display = 'none';
                menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                menuBtn.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('active');
                mobileMenu.style.display = 'none';
                menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                menuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

// Scroll animations using Intersection Observer
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-slide-left, .animate-slide-right, .animate-scale-in');
    
    if (animatedElements.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'none';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            
            if (element.classList.contains('animate-fade-in')) {
                element.style.transform = 'translateY(20px)';
            } else if (element.classList.contains('animate-slide-left')) {
                element.style.transform = 'translateX(-50px)';
            } else if (element.classList.contains('animate-slide-right')) {
                element.style.transform = 'translateX(50px)';
            } else if (element.classList.contains('animate-scale-in')) {
                element.style.transform = 'scale(0.9)';
            }
            
            observer.observe(element);
        });
    }
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL hash without scrolling
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Form validation
function initFormValidation() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            const gdprCheckbox = document.getElementById('gdpr-consent');
            
            // Reset previous error messages
            const errorMessages = contactForm.querySelectorAll('.error-message');
            errorMessages.forEach(message => message.remove());
            
            // Validate name
            if (!nameInput.value.trim()) {
                showError(nameInput, 'Bitte geben Sie Ihren Namen ein');
                isValid = false;
            }
            
            // Validate email
            if (!validateEmail(emailInput.value)) {
                showError(emailInput, 'Bitte geben Sie eine gültige E-Mail-Adresse ein');
                isValid = false;
            }
            
            // Validate message
            if (!messageInput.value.trim()) {
                showError(messageInput, 'Bitte geben Sie Ihre Nachricht ein');
                isValid = false;
            }
            
            // Validate GDPR consent
            if (gdprCheckbox && !gdprCheckbox.checked) {
                showError(gdprCheckbox.parentElement, 'Bitte stimmen Sie der Datenschutzerklärung zu');
                isValid = false;
            }
            
            if (isValid) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Vielen Dank für Ihre Nachricht! Wir werden uns in Kürze bei Ihnen melden.';
                successMessage.style.color = '#10b981';
                successMessage.style.padding = '1rem';
                successMessage.style.marginTop = '1rem';
                successMessage.style.backgroundColor = '#f0fdf4';
                successMessage.style.borderRadius = '0.5rem';
                successMessage.style.fontWeight = 'bold';
                
                contactForm.reset();
                contactForm.appendChild(successMessage);
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
    }
}

// Helper function to validate email
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Helper function to show error messages
function showError(inputElement, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = '#ef4444';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
    
    inputElement.parentElement.appendChild(errorElement);
    inputElement.style.borderColor = '#ef4444';
    
    // Remove error styling when input changes
    inputElement.addEventListener('input', function() {
        const errorMsg = inputElement.parentElement.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
        inputElement.style.borderColor = '';
    });
}

// GDPR Cookie Consent
function initCookieConsent() {
    const cookieConsent = document.getElementById('cookie-consent');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    const rejectCookiesBtn = document.getElementById('reject-cookies');
    
    if (cookieConsent && (acceptCookiesBtn || rejectCookiesBtn)) {
        // Check if user has already made a choice
        const cookieChoice = localStorage.getItem('cookieConsent');
        
        if (!cookieChoice) {
            // Show cookie consent banner
            cookieConsent.style.display = 'block';
            
            // Accept cookies
            if (acceptCookiesBtn) {
                acceptCookiesBtn.addEventListener('click', () => {
                    localStorage.setItem('cookieConsent', 'accepted');
                    cookieConsent.style.display = 'none';
                });
            }
            
            // Reject cookies
            if (rejectCookiesBtn) {
                rejectCookiesBtn.addEventListener('click', () => {
                    localStorage.setItem('cookieConsent', 'rejected');
                    cookieConsent.style.display = 'none';
                });
            }
        }
    }
}

// Scroll to top button
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    if (scrollToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top when button is clicked
        scrollToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Scroll progress indicator
function initScrollProgress() {
    // Create scroll progress element if it doesn't exist
    let progressBar = document.querySelector('.scroll-progress');
    
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
    }
    
    // Update progress bar width on scroll
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        
        progressBar.style.width = `${scrollPercentage}%`;
    });
}

// Custom cursor
function initCustomCursor() {
    // Create custom cursor element if it doesn't exist
    let cursor = document.querySelector('.custom-cursor');
    
    if (!cursor) {
        cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);
    }
    
    // Update cursor position on mouse move
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });
    
    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .project-card, .social-icon');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
        });
    });
}

// Typed text effect
function initTypedText() {
    const typedElement = document.getElementById('typed-text');
    
    if (typedElement && typeof Typed !== 'undefined') {
        new Typed(typedElement, {
            strings: [
                'KI-Strategieberatung',
                'Individuelle KI-Lösungen',
                'KI-Workshops & Trainings',
                'Startups & Corporate Matchmaking',
                'KI-Inkubator & Accelerator',
                'Data Science & ML Projekte'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 1500,
            startDelay: 500,
            loop: true,
            smartBackspace: true
        });
    }
}

// Load 3D.js script
function loadThreeJS() {
    if (document.querySelector('#hero-canvas-container') || 
        document.querySelector('#project-canvas-container') || 
        document.querySelector('#contact-canvas-container')) {
        
        // Create script element for 3D.js
        const script = document.createElement('script');
        script.src = '3d.js';
        script.async = true;
        
        // Add error handling
        script.onerror = function() {
            console.error('Failed to load 3d.js. Please check if the file exists.');
        };
        
        document.body.appendChild(script);
        
        console.log('3D.js script loaded');
    }
}

// Initialize counters animation
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.dataset.target);
                    let count = 0;
                    const duration = 2000; // 2 seconds
                    const interval = Math.floor(duration / target);
                    
                    const timer = setInterval(() => {
                        count += 1;
                        counter.textContent = count;
                        
                        if (count >= target) {
                            clearInterval(timer);
                        }
                    }, interval);
                    
                    observer.unobserve(counter);
                }
            });
        }, {
            threshold: 0.5
        });
        
        counters.forEach(counter => {
            observer.observe(counter);
        });
    }
}

// Initialize parallax scrolling effect
function initParallaxScrolling() {
    const parallaxElements = document.querySelectorAll('.parallax-scroll');
    
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                element.style.transform = `translateY(${scrollTop * speed}px)`;
            });
        });
    }
}

// Initialize glitch effect
function initGlitchEffect() {
    const glitchElements = document.querySelectorAll('.glitch-effect');
    
    glitchElements.forEach(element => {
        if (!element.hasAttribute('data-text')) {
            element.setAttribute('data-text', element.textContent);
        }
        
        // Add random glitch animation
        setInterval(() => {
            element.classList.add('active-glitch');
            
            setTimeout(() => {
                element.classList.remove('active-glitch');
            }, 200);
        }, Math.random() * 5000 + 3000); // Random interval between 3-8 seconds
    });
} 