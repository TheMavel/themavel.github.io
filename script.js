// Main JavaScript file for the modern website with 3D elements

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
    
    // Initialize dark mode toggle if present
    initDarkModeToggle();
    
    // Initialize lazy loading for images
    initLazyLoading();
    
    // Initialize GDPR cookie consent
    initCookieConsent();
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
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            menuBtn.classList.toggle('active');
            
            // Toggle aria-expanded for accessibility
            const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
            menuBtn.setAttribute('aria-expanded', !isExpanded);
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('active');
                menuBtn.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

// Scroll animations using Intersection Observer
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-slide-left, .animate-slide-right, .animate-scale-in');
    
    if (animatedElements.length > 0) {
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
                showError(nameInput, 'Please enter your name');
                isValid = false;
            }
            
            // Validate email
            if (!validateEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate message
            if (!messageInput.value.trim()) {
                showError(messageInput, 'Please enter your message');
                isValid = false;
            }
            
            // Validate GDPR consent
            if (gdprCheckbox && !gdprCheckbox.checked) {
                showError(gdprCheckbox.parentElement, 'Please agree to the privacy policy');
                isValid = false;
            }
            
            if (isValid) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
                
                contactForm.reset();
                contactForm.appendChild(successMessage);
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
                
                // Here you would typically send the form data to a server
                // For demonstration, we're just showing a success message
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
        errorElement.remove();
        inputElement.style.borderColor = '';
    });
}

// Dark mode toggle
function initDarkModeToggle() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    
    if (darkModeToggle) {
        // Check for saved user preference
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        
        // Set initial state
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            darkModeToggle.checked = true;
        }
        
        // Toggle dark mode
        darkModeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('darkMode', 'true');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('darkMode', 'false');
            }
        });
    }
}

// Lazy loading for images
function initLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support native lazy loading
        const lazyImageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove('lazy');
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('.lazy');
        lazyImages.forEach(image => {
            lazyImageObserver.observe(image);
        });
    }
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
                    
                    // Here you would initialize analytics and other cookie-based services
                });
            }
            
            // Reject cookies
            if (rejectCookiesBtn) {
                rejectCookiesBtn.addEventListener('click', () => {
                    localStorage.setItem('cookieConsent', 'rejected');
                    cookieConsent.style.display = 'none';
                    
                    // Here you would ensure no tracking cookies are set
                });
            }
        }
    }
}

// Initialize custom cursor if enabled
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });
        
        // Add hover effect for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .interactive');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
            });
        });
    }
}

// Initialize scroll progress indicator
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercentage = (scrollTop / scrollHeight) * 100;
            
            progressBar.style.width = `${scrollPercentage}%`;
        });
    }
}

// Initialize typed text effect
function initTypedText() {
    const typedElements = document.querySelectorAll('.typed-text');
    
    typedElements.forEach(element => {
        const text = element.dataset.text.split(',');
        let currentIndex = 0;
        let currentText = '';
        let isDeleting = false;
        
        function type() {
            const fullText = text[currentIndex];
            
            if (isDeleting) {
                currentText = fullText.substring(0, currentText.length - 1);
            } else {
                currentText = fullText.substring(0, currentText.length + 1);
            }
            
            element.textContent = currentText;
            
            let typeSpeed = isDeleting ? 50 : 150;
            
            if (!isDeleting && currentText === fullText) {
                typeSpeed = 2000; // Pause at the end of typing
                isDeleting = true;
            } else if (isDeleting && currentText === '') {
                isDeleting = false;
                currentIndex = (currentIndex + 1) % text.length;
                typeSpeed = 500; // Pause before typing next word
            }
            
            setTimeout(type, typeSpeed);
        }
        
        type();
    });
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

// Load 3D.js script after DOM is loaded
function loadThreeJS() {
    if (document.querySelector('#hero-canvas-container') || 
        document.querySelector('#project-canvas-container') || 
        document.querySelector('#contact-canvas-container')) {
        
        // Create script element for 3D.js
        const script = document.createElement('script');
        script.src = '3d.js';
        script.async = true;
        document.body.appendChild(script);
    }
}

// Call loadThreeJS after DOM is loaded
document.addEventListener('DOMContentLoaded', loadThreeJS); 