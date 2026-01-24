// Mobile Optimization Script for Shine POS Website
(function() {
    'use strict';

    // Mobile detection
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Viewport height fix for mobile browsers
    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
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
    }

    // Optimize images for mobile
    function optimizeImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // Add loading="lazy" if not present
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
            
            // Add proper alt text if missing
            if (!img.hasAttribute('alt') || img.alt === '') {
                img.setAttribute('alt', 'Shine POS System');
            }
        });
    }

    // Touch gesture enhancements
    function initTouchEnhancements() {
        if (!isTouch) return;

        // Add touch feedback to buttons
        const buttons = document.querySelectorAll('.btn, .nav-link, .card');
        buttons.forEach(button => {
            button.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            button.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });

        // Prevent zoom on input focus (iOS)
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                if (input.style.fontSize !== '16px') {
                    input.style.fontSize = '16px';
                }
            });
        });
    }

    // Mobile navigation enhancements
    function initMobileNavigation() {
        const navToggle = document.querySelector('.navbar-toggler');
        const navCollapse = document.querySelector('.navbar-collapse');
        const navLinks = document.querySelectorAll('.nav-link');

        if (navToggle && navCollapse) {
            // Close mobile menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!navToggle.contains(e.target) && !navCollapse.contains(e.target)) {
                    if (navCollapse.classList.contains('show')) {
                        navToggle.click();
                    }
                }
            });

            // Close mobile menu when clicking on nav links
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    if (navCollapse.classList.contains('show')) {
                        navToggle.click();
                    }
                });
            });

            // Prevent body scroll when mobile menu is open
            navToggle.addEventListener('click', function() {
                setTimeout(() => {
                    if (navCollapse.classList.contains('show')) {
                        document.body.style.overflow = 'hidden';
                    } else {
                        document.body.style.overflow = '';
                    }
                }, 100);
            });
        }
    }

    // Performance optimizations
    function initPerformanceOptimizations() {
        // Lazy load background images
        const elementsWithBg = document.querySelectorAll('[data-bg]');
        if ('IntersectionObserver' in window) {
            const bgObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        element.style.backgroundImage = `url(${element.dataset.bg})`;
                        bgObserver.unobserve(element);
                    }
                });
            });

            elementsWithBg.forEach(el => bgObserver.observe(el));
        }

        // Preload critical resources
        const criticalImages = [
            'assets/img/logo.png',
            'assets/img/hero_img.png'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    // Form enhancements for mobile
    function initFormEnhancements() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                // Add proper input types for mobile keyboards
                if (input.name && input.name.includes('email')) {
                    input.type = 'email';
                }
                if (input.name && input.name.includes('phone')) {
                    input.type = 'tel';
                }
                
                // Add autocomplete attributes
                if (input.name && input.name.includes('name')) {
                    input.setAttribute('autocomplete', 'name');
                }
                if (input.name && input.name.includes('email')) {
                    input.setAttribute('autocomplete', 'email');
                }
            });
        });
    }

    // Orientation change handler
    function handleOrientationChange() {
        setTimeout(() => {
            setViewportHeight();
            // Trigger resize event for other components
            window.dispatchEvent(new Event('resize'));
        }, 100);
    }

    // Initialize all mobile optimizations
    function init() {
        // Set initial viewport height
        setViewportHeight();
        
        // Initialize features
        initSmoothScrolling();
        optimizeImages();
        initTouchEnhancements();
        initMobileNavigation();
        initPerformanceOptimizations();
        initFormEnhancements();

        // Event listeners
        window.addEventListener('resize', setViewportHeight);
        window.addEventListener('orientationchange', handleOrientationChange);
        
        // Add mobile class to body if on mobile device
        if (isMobile) {
            document.body.classList.add('mobile-device');
        }
        
        if (isTouch) {
            document.body.classList.add('touch-device');
        }

        console.log('Mobile optimizations initialized');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose some functions globally if needed
    window.ShinePosMobile = {
        setViewportHeight,
        isMobile,
        isTouch
    };

})();