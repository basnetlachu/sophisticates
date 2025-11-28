// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Performance and mobile detection
const isMobile = window.innerWidth <= 768;
const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    console.log('Initializing website...');

    initializeMobileNavigation();
    initializeScrollNavigation();
    initializeAnimations();
    initializeInteractions();
    initializeNeuralNetwork();
    initializeScrollAnimations();
    initializeMobileFeatures();
    initializeAccessibility();
    initializePerformanceOptimizations();
    initializeOptimizationAnimation();
});

// FIXED MOBILE NAVIGATION - GUARANTEED CLICKABLE
function initializeMobileNavigation() {
    const mobileHamburger = document.getElementById('mobileHamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    console.log('Hamburger element:', mobileHamburger);
    console.log('Menu element:', mobileMenu);

    if (!mobileHamburger || !mobileMenu) {
        console.log('Mobile navigation elements not found!');
        return;
    }

    // FORCE CLICKABILITY - Multiple methods to ensure it works
    mobileHamburger.style.zIndex = '10003';
    mobileHamburger.style.pointerEvents = 'auto';
    mobileHamburger.style.position = 'relative';
    mobileHamburger.style.cursor = 'pointer';

    // Method 1: Direct onclick assignment
    mobileHamburger.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Hamburger clicked via onclick!');

        mobileHamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');

        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            console.log('Mobile menu opened');
        } else {
            document.body.style.overflow = '';
            console.log('Mobile menu closed');
        }
    };

    // Method 2: addEventListener as backup
    mobileHamburger.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Hamburger clicked via event listener!');
    }, { passive: false });

    // Method 3: Touch events for mobile
    mobileHamburger.addEventListener('touchstart', function (e) {
        e.preventDefault();
        console.log('Hamburger touched!');

        mobileHamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');

        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, { passive: false });

    // Handle mobile nav link clicks
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            console.log('Mobile nav link clicked:', this.getAttribute('href'));

            // Close mobile menu
            mobileHamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';

            // Scroll to section
            scrollToSection(this.getAttribute('href'));
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
        if (mobileMenu.classList.contains('active')) {
            if (!mobileHamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileHamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
                console.log('Menu closed by clicking outside');
            }
        }
    });

    // Close mobile menu with escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            mobileHamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
            console.log('Menu closed with escape key');
        }
    });

    console.log('Mobile navigation initialized successfully with multiple click methods');
}

// COMPLETE SCROLL NAVIGATION FOR ALL LINKS
function initializeScrollNavigation() {
    // Handle ALL navigation links (desktop + mobile)
    const allNavLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    allNavLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            console.log('Navigation link clicked:', this.getAttribute('href'));
            scrollToSection(this.getAttribute('href'));
        });
    });
}

// COMPLETE SCROLL TO SECTION FUNCTION
function scrollToSection(href) {
    const targetId = href.substring(1);
    let targetElement = document.getElementById(targetId);

    console.log('Scrolling to:', targetId);

    // Special handling for purpose section
    if (targetId === 'purpose') {
        targetElement = document.querySelector('.purpose-content');
    }

    if (targetElement) {
        const headerOffset = 100;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        console.log('Scrolled to:', targetId);
    } else {
        console.log('Target element not found:', targetId);
    }
}

// COMPLETE ANIMATIONS INITIALIZATION
function initializeAnimations() {
    if (prefersReducedMotion) return;

    console.log('Initializing animations...');

    // Hero section entrance animations
    const heroTimeline = gsap.timeline({ delay: 0.5 });

    heroTimeline
        .to('.hero-title', {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: 'power3.out'
        })
        .to('.hero-subtitle', {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out'
        }, '-=0.8');

    // Sequential timeline animation - ENABLED FOR ALL DEVICES
    gsap.set('.timeline-item', { opacity: 0, x: -50 });
    gsap.set('.timeline-item:nth-child(even)', { x: 50 });

    ScrollTrigger.create({
        trigger: '.personality-sequential',
        start: 'top 80%',
        onEnter: () => {
            gsap.to('.timeline-item', {
                opacity: 1,
                x: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
                onComplete: () => {
                    document.querySelectorAll('.timeline-item').forEach(item => {
                        item.classList.add('animate');
                    });
                }
            });
        }
    });
}

// COMPLETE SCROLL ANIMATIONS
function initializeScrollAnimations() {
    if (prefersReducedMotion) return;

    console.log('Initializing scroll animations...');

    // Morphing section animation - ENABLED FOR ALL DEVICES
    ScrollTrigger.create({
        trigger: '.morphing-section',
        start: 'top 50%',
        end: 'bottom 50%',
        onUpdate: (self) => {
            const progress = self.progress;
            const visionContent = document.querySelector('.vision-content');
            const purposeContent = document.querySelector('.purpose-content');

            if (visionContent && purposeContent) {
                if (progress < 0.5) {
                    visionContent.classList.add('active');
                    purposeContent.classList.remove('active');
                } else {
                    visionContent.classList.remove('active');
                    purposeContent.classList.add('active');
                }
            }
        }
    });

    // Value proposition showcase
    ScrollTrigger.create({
        trigger: '.value-prop-showcase',
        start: 'top 80%',
        onEnter: () => {
            gsap.to('.showcase-left', {
                opacity: 1,
                x: 0,
                duration: isMobile ? 1 : 1.5,
                ease: 'power3.out'
            });
            gsap.to('.showcase-right', {
                opacity: 1,
                x: 0,
                duration: isMobile ? 1 : 1.5,
                ease: 'power3.out',
                delay: isMobile ? 0.1 : 0.3
            });
        }
    });

    // Orbital values animation
    ScrollTrigger.create({
        trigger: '.values-orbital',
        start: 'top 80%',
        onEnter: () => {
            gsap.fromTo('.orbital-system',
                { opacity: 0, scale: 0.5 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: isMobile ? 1.5 : 2,
                    ease: 'power3.out'
                }
            );
        }
    });

    // CTA section animation
    ScrollTrigger.create({
        trigger: '.cta-immersive',
        start: 'top 80%',
        onEnter: () => {
            gsap.fromTo('.cta-content',
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: isMobile ? 1 : 1.5,
                    ease: 'power3.out'
                }
            );
        }
    });

    // Parallax effect for hero section - ENABLED FOR ALL DEVICES
    if (!prefersReducedMotion) {
        ScrollTrigger.create({
            trigger: '.hero-immersive',
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress;
                gsap.set('.floating-particles', {
                    y: progress * 100,
                    opacity: 1 - progress * 0.5
                });
                gsap.set('.hero-content', {
                    y: progress * 50,
                    opacity: 1 - progress * 0.8
                });
            }
        });
    }

    // Add section reveal animations on scroll
    addScrollRevealAnimations();
}

// COMPLETE INTERACTIONS INITIALIZATION
function initializeInteractions() {
    console.log('Initializing interactions...');

    // Enhanced navigation interactions
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (!isMobile) {
            link.addEventListener('mouseenter', () => {
                gsap.to(link, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            link.addEventListener('mouseleave', () => {
                gsap.to(link, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        }
    });

    // Enhanced timeline items interaction
    const timelineItems = document.querySelectorAll('.timeline-content');

    timelineItems.forEach((item, index) => {
        if (!isMobile) {
            item.addEventListener('mouseenter', () => {
                gsap.to(item, {
                    scale: 1.02,
                    y: -8,
                    duration: 0.4,
                    ease: 'power2.out'
                });

                createRippleEffect(item, 'rgba(255, 255, 255, 0.1)');
            });

            item.addEventListener('mouseleave', () => {
                gsap.to(item, {
                    scale: 1,
                    y: 0,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            });
        }

        // Click animation for all devices
        item.addEventListener('click', () => {
            gsap.fromTo(item,
                { scale: isMobile ? 1 : 1.02 },
                {
                    scale: isMobile ? 1.02 : 1.05,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1,
                    ease: 'power2.inOut'
                }
            );
        });
    });

    // Enhanced orbital items interaction
    initializeOrbitalInteractions();

    // Central hub interaction
    const centralHub = document.querySelector('.central-hub');
    if (centralHub) {
        if (!isMobile) {
            centralHub.addEventListener('mouseenter', () => {
                gsap.to(centralHub, {
                    scale: 1.05,
                    rotation: 5,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            });

            centralHub.addEventListener('mouseleave', () => {
                gsap.to(centralHub, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            });
        }

        centralHub.addEventListener('click', () => {
            gsap.fromTo(centralHub,
                { scale: isMobile ? 1 : 1.05 },
                {
                    scale: isMobile ? 1.05 : 1.1,
                    duration: 0.2,
                    yoyo: true,
                    repeat: 3,
                    ease: 'power2.inOut'
                }
            );
        });
    }
}

// COMPLETE ORBITAL INTERACTIONS
// COMPLETE ORBITAL INTERACTIONS
function initializeOrbitalInteractions() {
    const orbitalItems = document.querySelectorAll('.orbital-item');
    const overlay = document.getElementById('orbital-overlay');
    const overlayBody = document.querySelector('.orbital-body');
    const closeBtn = document.querySelector('.orbital-close');
    let activeItem = null;

    // Close overlay function
    function closeOverlay() {
        if (overlay) {
            overlay.classList.remove('active');
            activeItem = null;

            // Resume animations
            document.querySelectorAll('.orbital-ring').forEach(ring => {
                ring.style.animationPlayState = 'running';
            });
        }
    }

    // Close button click
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeOverlay();
        });
    }

    // Close on clicking outside content
    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeOverlay();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && overlay.classList.contains('active')) {
                closeOverlay();
            }
        });
    }

    orbitalItems.forEach((item, index) => {
        if (!isMobile) {
            // Enhanced hover animation for desktop
            item.addEventListener('mouseenter', () => {
                gsap.to(item, {
                    scale: 1.15,
                    rotation: 360,
                    duration: 0.6,
                    ease: 'power2.out'
                });

                // Pause orbital animation for better interaction
                const ring = item.closest('.orbital-ring');
                if (ring) ring.style.animationPlayState = 'paused';

                // Add glow effect
                gsap.to(item, {
                    boxShadow: '0 15px 40px rgba(255, 255, 255, 0.4), 0 0 30px rgba(255, 255, 255, 0.2)',
                    duration: 0.3
                });
            });

            item.addEventListener('mouseleave', () => {
                gsap.to(item, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.4,
                    ease: 'power2.out'
                });

                // Resume orbital animation ONLY if overlay is not active
                if (!overlay || !overlay.classList.contains('active')) {
                    const ring = item.closest('.orbital-ring');
                    if (ring) {
                        setTimeout(() => {
                            ring.style.animationPlayState = 'running';
                        }, 500);
                    }
                }

                // Remove glow effect
                gsap.to(item, {
                    boxShadow: '0 0 0px rgba(255, 255, 255, 0)',
                    duration: 0.3
                });
            });
        }

        // Click interaction for all devices
        item.addEventListener('click', (e) => {
            e.stopPropagation();

            // Get content from the hidden child element
            const hiddenContent = item.querySelector('.orbital-content');
            if (hiddenContent && overlay && overlayBody) {
                // Populate overlay
                overlayBody.innerHTML = hiddenContent.innerHTML;

                // Show overlay
                overlay.classList.add('active');
                activeItem = item;

                // Pause all rings
                document.querySelectorAll('.orbital-ring').forEach(ring => {
                    ring.style.animationPlayState = 'paused';
                });

                createExplosionEffect(item);

                // Typewriter effect for text
                const contentText = overlayBody.querySelector('p');
                if (contentText && !prefersReducedMotion) {
                    typewriterEffect(contentText);
                }
            }
        });
    });
}

// COMPLETE MOBILE FEATURES
function initializeMobileFeatures() {
    if (!isMobile) return;

    console.log('Initializing mobile features...');

    // Optimize touch interactions
    document.addEventListener('touchstart', function () { }, { passive: true });
    document.addEventListener('touchmove', function () { }, { passive: true });

    // Prevent zoom on double tap for iOS
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    // Add haptic feedback for mobile interactions
    const addHapticFeedback = (element) => {
        element.addEventListener('click', () => {
            if ('vibrate' in navigator) {
                navigator.vibrate(50);
            }
        });
    };

    document.querySelectorAll('.orbital-item, .timeline-content, .nav-link, .mobile-nav-link, .mobile-hamburger').forEach(addHapticFeedback);

    // Handle orientation change
    window.addEventListener('orientationchange', function () {
        setTimeout(() => {
            ScrollTrigger.refresh();
            window.scrollTo(0, window.scrollY);
        }, 100);
    });
}

// COMPLETE ACCESSIBILITY FEATURES
function initializeAccessibility() {
    console.log('Initializing accessibility...');

    // Add focus indicators for keyboard navigation
    const focusableElements = document.querySelectorAll('.nav-link, .mobile-nav-link, .mobile-hamburger, .orbital-item, .timeline-content, .central-hub');

    focusableElements.forEach(element => {
        element.addEventListener('focus', (e) => {
            e.target.style.outline = '2px solid rgba(255, 255, 255, 0.8)';
            e.target.style.outlineOffset = '2px';
        });

        element.addEventListener('blur', (e) => {
            e.target.style.outline = 'none';
        });
    });

    // Add ARIA labels for better screen reader support
    const orbitalItems = document.querySelectorAll('.orbital-item');
    orbitalItems.forEach((item, index) => {
        item.setAttribute('role', 'button');
        item.setAttribute('tabindex', '0');
        item.setAttribute('aria-label', `Value ${index + 1}: Click to learn more`);

        // Add keyboard support
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.click();
            }
        });
    });

    // Add mobile hamburger accessibility
    const mobileHamburger = document.getElementById('mobileHamburger');
    if (mobileHamburger) {
        mobileHamburger.setAttribute('aria-label', 'Toggle mobile navigation menu');
        mobileHamburger.setAttribute('role', 'button');
        mobileHamburger.setAttribute('tabindex', '0');

        mobileHamburger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                mobileHamburger.click();
            }
        });
    }
}

// COMPLETE PERFORMANCE OPTIMIZATIONS
function initializePerformanceOptimizations() {
    console.log('Initializing performance optimizations...');

    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    if (images.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Reduce animations on mobile for better performance
    if (isMobile) {
        // ScrollTrigger.getAll().forEach(trigger => {
        //     if (trigger.vars.scrub) {
        //         trigger.kill();
        //     }
        // });

        // Disable some heavy animations on very small screens - REMOVED per user request
        /* if (window.innerWidth <= 480) {
            const heavyAnimations = document.querySelectorAll('.floating-particles, .particle-burst');
            heavyAnimations.forEach(el => {
                el.style.animation = 'none';
                el.style.opacity = '0.1';
            });
        } */
    }

    // Optimize scroll performance
    let ticking = false;
    function updateScrollPosition() {
        ticking = false;
    }

    document.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollPosition);
            ticking = true;
        }
    }, { passive: true });
}

// COMPLETE NEURAL NETWORK ANIMATION
function initializeNeuralNetwork() {
    const canvas = document.getElementById('neuralCanvas');
    if (!canvas) return;

    console.log('Initializing neural network...');

    const ctx = canvas.getContext('2d');

    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Neural network nodes
    const nodes = [];
    const nodeCount = isMobile ? 25 : 50; // Reduce nodes on mobile

    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5),
            vy: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5),
            radius: Math.random() * 3 + 1,
            opacity: Math.random() * 0.5 + 0.3
        });
    }

    let animationId;

    // Animation loop
    function animate() {
        if (prefersReducedMotion) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw nodes
        nodes.forEach((node, i) => {
            // Update position
            node.x += node.vx;
            node.y += node.vy;

            // Bounce off edges
            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

            // Draw node with gray color
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(128, 128, 128, ${node.opacity})`;
            ctx.fill();

            // Draw connections to nearby nodes (reduced on mobile)
            const maxDistance = isMobile ? 100 : 150;
            nodes.forEach((otherNode, j) => {
                if (i !== j) {
                    const dx = node.x - otherNode.x;
                    const dy = node.y - otherNode.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(otherNode.x, otherNode.y);
                        ctx.strokeStyle = `rgba(128, 128, 128, ${0.1 * (1 - distance / maxDistance)})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            });
        });

        animationId = requestAnimationFrame(animate);
    }

    // Start animation only if reduced motion is not preferred
    if (!prefersReducedMotion) {
        animate();
    }

    // Pause animation when page is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else if (!prefersReducedMotion) {
            animate();
        }
    });
}

// COMPLETE UTILITY FUNCTIONS

// Create ripple effect
function createRippleEffect(element, color) {
    if (prefersReducedMotion) return;

    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: ${color};
        transform: scale(0);
        pointer-events: none;
        z-index: 1;
    `;

    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.transform = 'translate(-50%, -50%) scale(0)';

    element.style.position = 'relative';
    element.appendChild(ripple);

    gsap.to(ripple, {
        scale: 2,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => ripple.remove()
    });
}

// Create explosion effect
function createExplosionEffect(element) {
    if (prefersReducedMotion) return;

    const particles = [];
    const particleCount = 8;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #ffffff;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
        `;

        const rect = element.getBoundingClientRect();
        particle.style.left = (rect.left + rect.width / 2) + 'px';
        particle.style.top = (rect.top + rect.height / 2) + 'px';

        document.body.appendChild(particle);
        particles.push(particle);

        const angle = (i / particleCount) * Math.PI * 2;
        const distance = 50 + Math.random() * 30;

        gsap.to(particle, {
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            opacity: 0,
            scale: 0,
            duration: 0.8,
            ease: 'power2.out',
            onComplete: () => particle.remove()
        });
    }
}

// Typewriter effect
function typewriterEffect(element) {
    if (prefersReducedMotion) return;

    const text = element.textContent;
    element.textContent = '';
    element.style.opacity = '1';

    let i = 0;
    const timer = setInterval(() => {
        element.textContent += text.charAt(i);
        i++;
        if (i >= text.length) {
            clearInterval(timer);
        }
    }, 30);
}

// Add scroll reveal animations
function addScrollRevealAnimations() {
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        ScrollTrigger.create({
            trigger: section,
            start: 'top 80%',
            onEnter: () => {
                gsap.fromTo(section,
                    { opacity: 0.7, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: isMobile ? 0.8 : 1,
                        ease: 'power2.out'
                    }
                );
            }
        });
    });
}

// Mouse cursor effect with gray color (desktop only)
if (!isMobile) {
    document.addEventListener('mousemove', (e) => {
        let cursor = document.querySelector('.cursor');
        if (!cursor) {
            cursor = document.createElement('div');
            cursor.className = 'cursor';
            cursor.style.cssText = `
                position: fixed;
                width: 20px;
                height: 20px;
                background: radial-gradient(circle, rgba(128, 128, 128, 0.8), transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                mix-blend-mode: difference;
                transition: transform 0.1s ease;
            `;
            document.body.appendChild(cursor);
        }

        gsap.to(cursor, {
            x: e.clientX - 10,
            y: e.clientY - 10,
            duration: 0.1,
            ease: 'power2.out'
        });
    });
}

// COMPLETE EVENT LISTENERS

// Window load event
window.addEventListener('load', () => {
    console.log('Window loaded');
    document.body.classList.add('loaded');
});

// Window resize handler
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        console.log('Window resized');
        ScrollTrigger.refresh();

        // Update mobile detection
        const newIsMobile = window.innerWidth <= 768;
        if (newIsMobile !== isMobile) {
            console.log('Mobile state changed, reloading...');
            location.reload();
        }
    }, 250);
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // Fallback behavior if animations fail
    document.querySelectorAll('[style*="opacity: 0"]').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
    });
});

// Export functions for debugging
window.WebsiteAPI = {
    isMobile,
    prefersReducedMotion,
    scrollToSection,
    initializeAnimations,
    initializeInteractions,
    createRippleEffect,
    createExplosionEffect,
    typewriterEffect
};

console.log('Complete JavaScript loaded successfully - Hamburger menu should be clickable!');

// COMPLETE OPTIMIZATION ANIMATION
function initializeOptimizationAnimation() {
    const canvas = document.getElementById('optimizationCanvas');
    if (!canvas) return;

    console.log('Initializing optimization animation...');

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let grid = [];
    let animationFrameId;
    let isOptimized = false;
    let scanLineY = 0;

    // Resize handler
    function resize() {
        width = canvas.width = canvas.parentElement.offsetWidth;
        height = canvas.height = canvas.parentElement.offsetHeight;
        initGrid();
        initParticles();
    }

    // Initialize Grid (Neural Chip Structure)
    function initGrid() {
        grid = [];
        const cols = Math.floor(width / 40);
        const rows = Math.floor(height / 40);

        for (let i = 0; i <= cols; i++) {
            for (let j = 0; j <= rows; j++) {
                if (Math.random() > 0.7) {
                    grid.push({
                        x: i * 40,
                        y: j * 40,
                        active: Math.random() > 0.5
                    });
                }
            }
        }
    }

    // Initialize Particles
    function initParticles() {
        particles = [];
        const count = isMobile ? 30 : 60;

        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 2 + 1,
                color: '#888888',
                speed: Math.random() * 1 + 0.5,
                path: [],
                targetIndex: 0
            });
        }
    }

    // Animation Loop
    function animate() {
        if (prefersReducedMotion) return;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, width, height);

        // Draw Grid
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        grid.forEach(point => {
            ctx.fillRect(point.x - 1, point.y - 1, 2, 2);
        });

        // Scanline Effect
        if (!isOptimized) {
            scanLineY += 2;
            if (scanLineY > height + 100) scanLineY = -100;

            ctx.beginPath();
            ctx.moveTo(0, scanLineY);
            ctx.lineTo(width, scanLineY);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.lineWidth = 2;
            ctx.stroke();
        } else {
            // Optimized State: Glowing Pulse
            const time = Date.now() * 0.001;
            ctx.strokeStyle = `rgba(255, 255, 255, ${Math.sin(time) * 0.1 + 0.1})`;
            ctx.lineWidth = 1;

            // Draw connections
            ctx.beginPath();
            grid.forEach((p1, i) => {
                if (i % 5 === 0) { // Limit connections
                    grid.forEach((p2, j) => {
                        if (i !== j && Math.abs(p1.x - p2.x) < 50 && Math.abs(p1.y - p2.y) < 50) {
                            ctx.moveTo(p1.x, p1.y);
                            ctx.lineTo(p2.x, p2.y);
                        }
                    });
                }
            });
            ctx.stroke();
        }

        // Update and Draw Particles
        particles.forEach(p => {
            if (!isOptimized) {
                // Chaos Mode
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                ctx.fillStyle = '#888888';
            } else {
                // Optimized Mode: Flow along grid lines
                p.x += p.speed * 2;
                if (p.x > width) p.x = 0;

                // Snap to Y grid
                const snapY = Math.round(p.y / 40) * 40;
                p.y += (snapY - p.y) * 0.1;

                ctx.fillStyle = '#ffffff';
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#ffffff';
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
        });

        animationFrameId = requestAnimationFrame(animate);
    }

    // ScrollTrigger to toggle state
    ScrollTrigger.create({
        trigger: '#optimization',
        start: 'top 60%',
        onEnter: () => {
            isOptimized = true;
            gsap.to('.optimization-visual', {
                boxShadow: '0 0 80px rgba(255, 255, 255, 0.2)',
                borderColor: 'rgba(255, 255, 255, 0.3)',
                duration: 1.5
            });
        },
        onLeaveBack: () => {
            isOptimized = false;
            gsap.to('.optimization-visual', {
                boxShadow: '0 0 50px rgba(0, 0, 0, 0.5)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                duration: 1.5
            });
        }
    });

    // Initial setup
    resize();
    window.addEventListener('resize', resize);
    animate();
}

