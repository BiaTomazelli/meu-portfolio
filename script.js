document.addEventListener('DOMContentLoaded', function() {
    // Lottie Animation
    async function initHeroLottieAnimation() {
        const animationContainer = document.getElementById('hero-animation');

        if (!animationContainer) {
            console.error('Animation container not found');
            return;
        }

        console.log('Loading Lottie animation...');

        try {
            // First try to fetch the JSON file
            const response = await fetch('./images/heroanimation.json');

            if (!response.ok) {
                throw new Error(`Failed to load animation: ${response.status} ${response.statusText}`);
            }

            const animationData = await response.json();
            console.log('Animation JSON loaded successfully');

            // Load animation with the fetched data
            const animation = lottie.loadAnimation({
                container: animationContainer,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: animationData
            });

            animation.addEventListener('complete', function() {
                console.log('Lottie animation loaded and playing');
            });

            animation.addEventListener('loopComplete', function() {
                console.log('Lottie animation loop completed');
            });

            console.log('Lottie animation initialized successfully');

        } catch (error) {
            console.error('Error loading Lottie animation:', error);

            // Try alternative path in case of relative path issues
            try {
                console.log('Trying alternative loading method...');
                const animation = lottie.loadAnimation({
                    container: animationContainer,
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    path: 'images/heroanimation.json'
                });

                animation.addEventListener('complete', function() {
                    console.log('Lottie animation loaded successfully (alternative method)');
                });

            } catch (fallbackError) {
                console.error('Alternative loading method also failed:', fallbackError);
                showFallbackContent(animationContainer);
            }
        }

        // Fallback timeout in case animation doesn't load
        setTimeout(() => {
            if (animationContainer.children.length === 0 || animationContainer.innerHTML.trim() === '') {
                console.warn('Animation not loaded after 5 seconds, showing fallback');
                showFallbackContent(animationContainer);
            }
        }, 5000);
    }

    function showFallbackContent(container) {
        container.innerHTML = '<h1 style="font-family: Montserrat, sans-serif; color: #161616; font-size: 4rem; font-weight: 600; margin: 0; text-align: center;">Hello, I\'m<br>Bia Tomazelli</h1>';
    }

    // Mobile Navigation Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const navLinks = document.querySelectorAll('a[href^="#"]');

    // Toggle mobile menu
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.remove('hidden');
        });
    }

    // Close mobile menu
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenu && !mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
            mobileMenu.classList.add('hidden');
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingNavLink = document.querySelector(`a[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }

    // Navbar background on scroll (updated for new design)
    function updateNavbarBackground() {
        const navbar = document.querySelector('header');
        if (navbar && window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else if (navbar) {
            navbar.style.background = 'transparent';
            navbar.style.backdropFilter = 'none';
        }
    }

    // Scroll animations
    function animateOnScroll() {
        const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }

    // Initialize scroll animations
    function initScrollAnimations() {
        // Add animation classes to elements
        const aboutSection = document.querySelector('.about-content');
        if (aboutSection) {
            aboutSection.classList.add('fade-in');
        }

        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            card.classList.add('fade-in');
            card.style.transitionDelay = `${index * 0.1}s`;
        });

        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
            item.classList.add('fade-in');
            item.style.transitionDelay = `${index * 0.05}s`;
        });

        const statItems = document.querySelectorAll('.stat-item');
        statItems.forEach((item, index) => {
            item.classList.add('slide-in-right');
            item.style.transitionDelay = `${index * 0.1}s`;
        });

        const contactInfo = document.querySelector('.contact-info');
        if (contactInfo) {
            contactInfo.classList.add('slide-in-left');
        }

        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.classList.add('slide-in-right');
        }
    }


    // Form handling
    function initFormHandling() {
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();

                // Get form data
                const formData = new FormData(this);
                const name = formData.get('name');
                const email = formData.get('email');
                const subject = formData.get('subject');
                const message = formData.get('message');

                // Simple validation
                if (!name || !email || !subject || !message) {
                    showNotification('Por favor, preencha todos os campos.', 'error');
                    return;
                }

                if (!isValidEmail(email)) {
                    showNotification('Por favor, insira um email válido.', 'error');
                    return;
                }

                // Simulate form submission
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Enviando...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    showNotification('Mensagem enviada com sucesso! Retornarei em breve.', 'success');
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            });
        }
    }

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
        `;

        notification.querySelector('.notification-content').style.cssText = `
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        `;

        notification.querySelector('.notification-close').style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove after 5 seconds
        const autoRemove = setTimeout(() => {
            removeNotification(notification);
        }, 5000);

        // Close button functionality
        notification.querySelector('.notification-close').addEventListener('click', () => {
            clearTimeout(autoRemove);
            removeNotification(notification);
        });
    }

    function removeNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // Parallax effect for hero section
    function initParallaxEffect() {
        const hero = document.querySelector('.hero');
        if (hero) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                hero.style.transform = `translateY(${rate}px)`;
            });
        }
    }

    // Counter animation for stats
    function animateCounters() {
        const statItems = document.querySelectorAll('.stat-item h3');

        statItems.forEach(stat => {
            const finalNumber = parseInt(stat.textContent);
            const increment = finalNumber / 100;
            let currentNumber = 0;

            const counter = setInterval(() => {
                currentNumber += increment;
                if (currentNumber >= finalNumber) {
                    stat.textContent = stat.textContent; // Keep original text (e.g., "2+", "100%")
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(currentNumber);
                }
            }, 20);
        });
    }

    // Skill items hover effect
    function initSkillHoverEffects() {
        const skillItems = document.querySelectorAll('.skill-item');

        skillItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.05)';
            });

            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }


    // Initialize everything
    function init() {
        initHeroLottieAnimation();
        initScrollAnimations();
        initFormHandling();
        initSkillHoverEffects();

        // Initial calls
        updateActiveNavLink();
        updateNavbarBackground();
        animateOnScroll();


        // Scroll event listeners
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(function() {
                    updateActiveNavLink();
                    updateNavbarBackground();
                    animateOnScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Animate counters when stats section comes into view
        const statsSection = document.querySelector('.about-stats');
        if (statsSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounters();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(statsSection);
        }
    }

    // Start the magic
    init();

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');

        // Add a subtle fade-in effect to the whole page
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';

        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu) {
            mobileMenu.classList.add('hidden');
        }
    });

    // Add smooth hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});