document.addEventListener('DOMContentLoaded', function() {
    // Hero Lottie Animation
    function initHeroLottieAnimation() {
        const animationContainer = document.getElementById('hero-lottie-animation');

        if (!animationContainer) {
            console.error('Lottie animation container not found');
            return;
        }

        console.log('Loading Lottie animation...');

        try {
            const animation = lottie.loadAnimation({
                container: animationContainer,
                renderer: 'svg',
                loop: false,             // Play only once
                autoplay: true,          // Autoplay
                path: 'images/heroanimation.json',
                rendererSettings: {
                    preserveAspectRatio: 'xMidYMid meet',
                    clearCanvas: false,
                    progressiveLoad: true,
                    hideOnTransparent: true
                }
            });

            animation.addEventListener('complete', function() {
                console.log('Lottie animation completed');
            });

            animation.addEventListener('loopComplete', function() {
                console.log('Lottie animation loop completed');
            });

            animation.addEventListener('error', function(error) {
                console.error('Lottie animation error:', error);
                showLottieFallback(animationContainer);
            });

            console.log('Lottie animation initialized with infinite loop');

        } catch (error) {
            console.error('Error initializing Lottie animation:', error);
            showLottieFallback(animationContainer);
        }
    }

    function showLottieFallback(container) {
        container.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 400px; font-family: Montserrat, sans-serif; font-size: 3rem; font-weight: 700; color: #161616;">Hello, I\'m<br>Bia Tomazelli</div>';
    }

    // Initialize Letter Animations
    function initLetterAnimations() {
        const letterH = document.querySelector('.letter-h');
        const letterOs = document.querySelectorAll('.letter-o');

        console.log('Letter H found:', letterH);
        console.log('Letter Os found:', letterOs.length);

        if (letterH) {
            letterH.style.display = 'inline-block';
            letterH.style.animation = 'bounce-h 2.5s ease-in-out infinite';
            letterH.style.color = '#6366f1';
            letterH.style.transformOrigin = 'center bottom';
            console.log('H animation applied');
        }

        letterOs.forEach((letterO, index) => {
            letterO.style.display = 'inline-block';
            letterO.style.animation = 'pulse-o 1.8s ease-in-out infinite';
            letterO.style.color = '#8b5cf6';
            letterO.style.transformOrigin = 'center';
            console.log(`O animation applied to letter ${index + 1}`);
        });
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
        initLetterAnimations();
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

    // Interactive Skills Bars System - Simplified and Fixed
    function initInteractiveSkillsBars() {
        console.log('🔧 Starting skills bars initialization...');

        const skillBars = document.querySelectorAll('.experience-item');
        console.log('📊 Found', skillBars.length, 'skill bars');

        skillBars.forEach((skillBar, index) => {
            const handle = skillBar.querySelector('.skill-handle');
            const fill = skillBar.querySelector('.skill-fill');
            const percentageSpan = skillBar.querySelector('.skill-percentage');
            const container = skillBar.querySelector('.skill-bar-container');
            const skillName = skillBar.querySelector('h4').textContent;

            console.log(`📈 Initializing ${skillName} skill bar...`);

            if (!handle || !fill || !percentageSpan || !container) {
                console.error('❌ Missing elements for skill bar:', skillName);
                return;
            }

            // Get initial percentage and store it
            const currentText = percentageSpan.textContent;
            const originalPercentage = parseInt(currentText.replace('%', ''));
            console.log(`🎯 ${skillName} original percentage:`, originalPercentage);

            let isDragging = false;
            let containerRect = null;

            function updateSkillBar(newPercentage) {
                // Check if trying to decrease
                if (newPercentage < originalPercentage) {
                    console.log('🚫 Attempted to decrease', skillName, 'from', originalPercentage, 'to', newPercentage);

                    // Show playful message above this specific handle
                    showPlayfulToast(handle);

                    // Snap back to original
                    fill.style.width = originalPercentage + '%';
                    handle.style.left = originalPercentage + '%';
                    percentageSpan.textContent = originalPercentage + '%';

                    // Add bounce effect
                    handle.style.transform = 'translateY(-50%) scale(1.3)';
                    setTimeout(() => {
                        handle.style.transform = 'translateY(-50%) scale(1)';
                    }, 200);

                    return false;
                }

                // Allow increase
                fill.style.width = newPercentage + '%';
                handle.style.left = newPercentage + '%';
                percentageSpan.textContent = Math.round(newPercentage) + '%';
                console.log('✅ Updated', skillName, 'to', newPercentage + '%');
                return true;
            }

            function getPercentageFromPosition(clientX) {
                if (!containerRect) return originalPercentage;

                const relativeX = clientX - containerRect.left;
                const percentage = Math.max(0, Math.min(100, (relativeX / containerRect.width) * 100));
                return percentage;
            }

            // Mouse down - start dragging
            handle.addEventListener('mousedown', function(e) {
                console.log('🖱️ Mouse down on', skillName);
                isDragging = true;
                containerRect = container.getBoundingClientRect();
                handle.style.transform = 'translateY(-50%) scale(1.2)';
                document.body.style.cursor = 'grabbing';
                e.preventDefault();
            });

            // Mouse move - update position
            document.addEventListener('mousemove', function(e) {
                if (!isDragging) return;

                const newPercentage = getPercentageFromPosition(e.clientX);
                updateSkillBar(newPercentage);
            });

            // Mouse up - stop dragging
            document.addEventListener('mouseup', function() {
                if (!isDragging) return;

                console.log('🖱️ Mouse up');
                isDragging = false;
                handle.style.transform = 'translateY(-50%) scale(1)';
                document.body.style.cursor = 'default';
                containerRect = null;
            });

            // Touch events for mobile
            handle.addEventListener('touchstart', function(e) {
                console.log('👆 Touch start on', skillName);
                isDragging = true;
                containerRect = container.getBoundingClientRect();
                handle.style.transform = 'translateY(-50%) scale(1.2)';
                e.preventDefault();
            });

            document.addEventListener('touchmove', function(e) {
                if (!isDragging || !e.touches[0]) return;

                const newPercentage = getPercentageFromPosition(e.touches[0].clientX);
                updateSkillBar(newPercentage);
                e.preventDefault();
            });

            document.addEventListener('touchend', function() {
                if (!isDragging) return;

                console.log('👆 Touch end');
                isDragging = false;
                handle.style.transform = 'translateY(-50%) scale(1)';
                containerRect = null;
            });

            console.log(`✅ ${skillName} skill bar initialized successfully`);
        });

        console.log('🎉 All skill bars initialized!');
    }

    // Toast System - Positioned Bottom Right Below Skill Bars
    function showPlayfulToast(orangeBall) {
        console.log('🍞 Showing playful toast at bottom right below skill bars...');

        // Remove existing toast
        const existing = document.querySelector('.playful-toast');
        if (existing) {
            existing.remove();
            console.log('🗑️ Removed existing toast');
        }

        // Find the skill bars container
        const skillBarsContainer = document.querySelector('.experience-item').closest('.space-y-8');
        if (!skillBarsContainer) {
            console.error('❌ Could not find skill bars container');
            return;
        }

        // Get position of the skill bars container
        const containerRect = skillBarsContainer.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

        // Position to match the full width of the skill bars container
        const toastLeft = containerRect.left + scrollLeft; // Align with left edge of skill bars
        const toastTop = containerRect.bottom + scrollTop + 10; // 10px below the container
        const toastWidth = containerRect.width; // Match the width of the skill bars container

        console.log('📍 Positioning toast to match skill bars width at:', { left: toastLeft, top: toastTop, width: toastWidth });

        // Create toast
        const toast = document.createElement('div');
        toast.className = 'playful-toast';
        toast.style.cssText = `
            position: absolute;
            left: ${toastLeft}px;
            top: ${toastTop}px;
            width: ${toastWidth}px;
            z-index: 999999;
            background: #f3f4f6;
            color: #374151;
            border: 1px solid #d1d5db;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 16px rgba(0,0,0,0.15);
            font-family: 'Montserrat', sans-serif;
            font-weight: 500;
            font-size: 14px;
            text-align: center;
            transform: translateY(-20px);
            opacity: 0;
            transition: all 0.3s ease;
            pointer-events: none;
        `;

        // Add content without arrow (positioned below bars)
        const currentLanguage = localStorage.getItem('selectedLanguage') || 'en';
        const toastText = currentLanguage === 'pt' ?
            'Aha! Você realmente achou que poderia diminuir minhas habilidades?' :
            'Aha! Did you really think you could decrease my skills?';

        toast.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;">
                <span style="font-size: 20px;">🤡</span>
                <span>${toastText}</span>
            </div>
        `;

        // Add to page
        document.body.appendChild(toast);
        console.log('📌 Toast added at bottom right of skill bars');

        // Animate in
        setTimeout(() => {
            toast.style.transform = 'translateY(0)';
            toast.style.opacity = '1';
            console.log('🎬 Toast animated in');
        }, 50);

        // Remove after delay
        setTimeout(() => {
            console.log('⏰ Removing toast...');
            toast.style.transform = 'translateY(-20px)';
            toast.style.opacity = '0';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                    console.log('🗑️ Toast removed');
                }
            }, 300);
        }, 2500);
    }

    // Test function for debugging (can be called from browser console)
    window.testPlayfulToast = function() {
        console.log('Testing toast function...');
        showPlayfulToast();
    };

    // Initialize About Me Accordion - WORKING VERSION
    function initAboutAccordion() {
        console.log('🎯 Initializing About Me accordion...');

        const header = document.getElementById('aboutAccordionHeader');
        const content = document.getElementById('aboutAccordionContent');
        const arrow = header?.querySelector('.accordion-arrow-clean');

        if (!header || !content) {
            console.error('❌ Missing elements:', { header: !!header, content: !!content });
            return;
        }

        let isExpanded = true; // Content starts OPEN by default

        function toggle() {
            console.log('🔄 Toggling accordion. Current state:', isExpanded ? 'EXPANDED' : 'COLLAPSED');

            isExpanded = !isExpanded;

            if (isExpanded) {
                // EXPAND - content visible, arrow points UP (rotated)
                content.classList.remove('collapsed');
                if (arrow) arrow.classList.add('rotated');
                header.setAttribute('aria-expanded', 'true');
                console.log('✅ EXPANDED - Content visible, arrow pointing UP');
            } else {
                // COLLAPSE - content hidden, arrow points DOWN (normal)
                content.classList.add('collapsed');
                if (arrow) arrow.classList.remove('rotated');
                header.setAttribute('aria-expanded', 'false');
                console.log('✅ COLLAPSED - Content hidden, arrow pointing DOWN');
            }
        }

        // Click handler
        header.addEventListener('click', function(e) {
            console.log('🖱️ HEADER CLICKED!');
            toggle();
        });

        // Keyboard handler
        header.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                console.log('⌨️ KEYBOARD ACTIVATED');
                toggle();
            }
        });

        // Accessibility setup
        header.setAttribute('tabindex', '0');
        header.setAttribute('role', 'button');
        header.setAttribute('aria-expanded', 'true'); // Start open

        // Test function
        window.testAccordion = toggle;

        // Ensure content starts OPEN and arrow pointing UP
        content.classList.remove('collapsed'); // Ensure content is visible
        if (arrow) arrow.classList.add('rotated'); // Arrow points up when expanded

        console.log('✅ About Me accordion initialized! Content starts OPEN.');
        console.log('📋 Arrow pointing UP. Click to collapse.');
    }

    // Initialize Experience Accordion (Where the magic happened)
    function initExperienceAccordion() {
        console.log('🎯 Initializing Experience accordion...');

        const header = document.getElementById('experienceAccordionHeader');
        const content = document.getElementById('experienceAccordionContent');
        const arrow = header?.querySelector('.accordion-arrow-clean');

        if (!header || !content) {
            console.error('❌ Missing experience elements:', { header: !!header, content: !!content });
            return;
        }

        let isExpanded = true; // Content starts OPEN by default

        function toggle() {
            console.log('🔄 Toggling experience accordion. Current state:', isExpanded ? 'EXPANDED' : 'COLLAPSED');

            isExpanded = !isExpanded;

            if (isExpanded) {
                // EXPAND - timeline visible, arrow points UP (rotated)
                content.classList.remove('collapsed');
                if (arrow) arrow.classList.add('rotated');
                header.setAttribute('aria-expanded', 'true');
                console.log('✅ EXPANDED - Experience timeline visible, arrow pointing UP');
            } else {
                // COLLAPSE - timeline hidden, arrow points DOWN (normal)
                content.classList.add('collapsed');
                if (arrow) arrow.classList.remove('rotated');
                header.setAttribute('aria-expanded', 'false');
                console.log('✅ COLLAPSED - Experience timeline hidden, arrow pointing DOWN');
            }
        }

        // Click handler
        header.addEventListener('click', function(e) {
            console.log('🖱️ EXPERIENCE HEADER CLICKED!');
            toggle();
        });

        // Keyboard handler
        header.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                console.log('⌨️ EXPERIENCE KEYBOARD ACTIVATED');
                toggle();
            }
        });

        // Accessibility setup
        header.setAttribute('tabindex', '0');
        header.setAttribute('role', 'button');
        header.setAttribute('aria-expanded', 'true'); // Start open

        // Test function
        window.testExperienceAccordion = toggle;

        // Ensure content starts OPEN and arrow pointing UP
        content.classList.remove('collapsed'); // Ensure content is visible
        if (arrow) arrow.classList.add('rotated'); // Arrow points up when expanded

        console.log('✅ Experience accordion initialized! Timeline starts OPEN.');
        console.log('📋 Arrow pointing UP. Click to collapse.');
    }

    // Initialize Projects Accordion - USING ABOUT ME PATTERN
    function initProjectsAccordion() {
        console.log('🎯 Initializing Projects accordion...');

        const header = document.getElementById('projectsAccordionHeader');
        const content = document.getElementById('projectsAccordionContent');
        const arrow = header?.querySelector('.accordion-arrow-clean');

        if (!header || !content) {
            console.error('❌ Missing projects elements:', { header: !!header, content: !!content });
            return;
        }

        let isExpanded = true; // Content starts OPEN (visible by default)

        function toggle() {
            console.log('🔄 Toggling projects accordion. Current state:', isExpanded ? 'EXPANDED' : 'COLLAPSED');

            isExpanded = !isExpanded;

            if (isExpanded) {
                // EXPAND - content visible, arrow points UP (rotated)
                content.classList.remove('collapsed');
                if (arrow) arrow.classList.add('rotated');
                header.setAttribute('aria-expanded', 'true');
                console.log('✅ EXPANDED - Projects visible, arrow pointing UP');
            } else {
                // COLLAPSE - content hidden, arrow points DOWN (normal)
                content.classList.add('collapsed');
                if (arrow) arrow.classList.remove('rotated');
                header.setAttribute('aria-expanded', 'false');
                console.log('✅ COLLAPSED - Projects hidden, arrow pointing DOWN');
            }
        }

        // Click handler
        header.addEventListener('click', function(e) {
            console.log('🖱️ PROJECTS HEADER CLICKED!');
            toggle();
        });

        // Keyboard handler
        header.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                console.log('⌨️ PROJECTS KEYBOARD ACTIVATED');
                toggle();
            }
        });

        // Accessibility setup
        header.setAttribute('tabindex', '0');
        header.setAttribute('role', 'button');
        header.setAttribute('aria-expanded', 'true'); // Start as expanded

        // Test function
        window.testProjectsAccordion = toggle;

        // Ensure content starts OPEN and arrow pointing UP
        content.classList.remove('collapsed'); // Ensure content is visible
        if (arrow) arrow.classList.add('rotated'); // Arrow points up when expanded

        console.log('✅ Projects accordion initialized! Content starts OPEN.');
        console.log('📋 Arrow pointing UP. Click to collapse.');
    }

    // Initialize About Me accordion
    console.log('About to initialize About Me accordion...');
    initAboutAccordion();

    // Initialize Experience accordion
    console.log('About to initialize Experience accordion...');
    initExperienceAccordion();

    // Initialize Projects accordion
    initProjectsAccordion();


    // Initialize interactive skills bars
    console.log('Initializing interactive skills bars...');
    initInteractiveSkillsBars();

    // Initialize mobile menu
    function initMobileMenu() {
        const mobileMenuButton = document.querySelector('.mobile-menu-button');
        const mobileMenu = document.querySelector('.mobile-menu');

        if (!mobileMenuButton || !mobileMenu) {
            console.error('Mobile menu elements not found');
            return;
        }

        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking on a link
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Initialize smooth scrolling for navigation links
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');

        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const headerOffset = 80; // Account for fixed header
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    console.log('Initializing mobile menu...');
    initMobileMenu();

    console.log('Initializing smooth scrolling...');
    initSmoothScrolling();

    // Initialize language selector
    function initLanguageSelector() {
        console.log('🔧 Starting language selector initialization...');

        const desktopButton = document.querySelector('.language-selector-button');
        const desktopDropdown = document.querySelector('.language-dropdown');
        const mobileButton = document.querySelector('.language-selector-mobile-button');
        const mobileDropdown = document.querySelector('.language-dropdown-mobile');

        if (!desktopButton || !desktopDropdown) {
            return;
        }

        const languageData = {
            en: {
                flag: 'images/flag-us.svg',
                short: 'EN',
                full: 'English'
            },
            pt: {
                flag: 'images/flag-brazil.svg',
                short: 'PT',
                full: 'Português'
            }
        };

        // Translation data
        const translations = {
            en: {
                // Header
                'header-name': 'Beatriz Tomazelli',
                'nav-home': 'Home',
                'nav-about': 'About',
                'nav-career': 'Career',
                'nav-projects': 'Projects',
                'contact-me': 'Contact me',

                // Hero section
                'design-adventures': 'Design adventures at',

                // About section
                'about-title': 'About me',
                'about-intro': 'Hey! I\'m Beatriz, a designer who believes that great design is invisible—it just works. My specialty? Building Design Systems that help teams create faster, better, and more consistently.',
                'about-experience': 'I\'ve spent years turning complex problems into simple, elegant solutions. Whether it\'s designing for startups or established companies, my goal is always the same: create experiences that users love and teams can scale.',
                'about-passion': 'Beyond pixels and prototypes, I\'m passionate about understanding what makes people tick and using that insight to design products that truly make a difference. I love flexing my creativity in everything I do—whether it\'s crafting unique design solutions or geeking out over pop culture and the latest sci-fi series. For me, creativity isn\'t just part of my work; it\'s how I explore and connect with the world.',

                // Career section
                'career-title': 'Career',
                'dex-title': 'Dex',
                'dex-description': 'Product Designer',
                'dex-period': '2025 - Present',
                'dex-details': 'Led the platform redesign, building a new Design System from the ground up with established patterns and consistency standards. Created a scalable foundation that enables the design of new user journeys and features across the platform.',

                'santander-title': 'Santander',
                'santander-description': 'UX/UI Designer',
                'santander-period': '2021-2022',
                'santander-details': 'Collaborated with Santander\'s global team to design and document new components for the design system. Led the creation and adaptation of app illustrations for the Brazilian market, developing characters and scenarios that resonated with local audiences.',

                'cea-title': 'C&A',
                'cea-description': 'UX Designer',
                'cea-period': '2022-2024',
                'cea-details': 'Led Design System maintenance and served as one of the lead designers for the company\'s new app and website redesign. Created and documented new components while developing comprehensive illustration guidelines. Conducted accessibility audits for web and mobile platforms ensuring WCAG compliance. Designed key app features including the Notification Center, Free Shipping experience, and product Showcase.',

                'itau-title': 'Itaú',
                'itau-description': 'Junior Designer',
                'itau-period': '2018-2021',
                'itau-details': 'Started my UX career in the UX Engineering squad, managing UI Kits for the Cards, Rede, and Corporate Banking teams. Contributed to documentation efforts and the early development of the company\'s Design System. Later transitioned to the Digital Client Acquisition team, where I designed end-to-end journeys for Microcredit and Loan products targeting non-account holders.',

                // Skills
                'figma-skill': 'Figma',
                'sketch-skill': 'Sketch',
                'prototyping-skill': 'Prototyping',
                'user-research-skill': 'User Research',
                'design-systems-skill': 'Design Systems',
                'vscode-skill': 'VS Code',
                'skills-hint': '✨ Try dragging the orange circles',
                'toast-message': 'Aha! Did you really think you could decrease my skills?',

                // Projects section
                'projects-title': 'Projects',
                'dex-project-title': 'Dex UI Revamp',
                'dex-project-description': 'Redesigning the user experience and building scalable foundation.',

                'cea-project-title': 'C&A New App Design System',
                'cea-project-description': 'Building a new app experience.',

                'santander-project-title': 'Santander Illustration Guide',
                'santander-project-description': 'Illustration guideline for the Brazil team',

                'cea-illustrations-title': 'C&A Illustrations',
                'cea-illustrations-description': 'illustration lib for the e-commerce',

                // Contact section
                'contact-title': 'Let\'s work together',
                'contact-subtitle': 'Have a project in mind? I\'d love to hear about it and discuss how we can bring your ideas to life.',
                'contact-direct': 'Or reach out directly:',
                'linkedin-text': 'LinkedIn',
                'form-name-label': 'Your Name *',
                'form-name-placeholder': 'Enter your full name',
                'form-email-label': 'Your Email *',
                'form-email-placeholder': 'your.email@example.com',
                'form-project-label': 'Project Type *',
                'form-project-placeholder': 'Select project type',
                'form-project-design-system': 'Design System',
                'form-project-mobile-app': 'Mobile App Design',
                'form-project-web-design': 'Web Design',
                'form-project-ux-research': 'UX Research',
                'form-project-consulting': 'UX Consulting',
                'form-project-other': 'Other',
                'form-message-label': 'Tell me about your project',
                'form-message-placeholder': 'Share details about your project, timeline, budget, and any specific requirements...',
                'form-submit-button': 'Send Message',
                'form-success-message': 'Thank you! Your message has been sent successfully. I\'ll get back to you soon!',
                'form-error-message': 'Sorry, there was an error sending your message. Please try again or email me directly.',

                // C&A Project Page
                'ca-project-title': 'C&A New App Design System',
                'ca-context': 'C&A faced a critical challenge: the fashion retail industry was rapidly digitalizing, and their existing digital experience was falling behind. Competitors were offering sleek, modern interfaces while C&A\'s fragmented design patterns created inconsistent user experiences and slowed development cycles.',
                'ca-context-2': 'Recognizing that incremental updates wouldn\'t suffice, we needed to rebuild the design system entirely. This wasn\'t just about aesthetics—it was about creating a scalable foundation that would enable the company to compete in the modern digital retail landscape. A comprehensive design system would ensure consistency across all touchpoints, accelerate feature development, and deliver the intuitive, contemporary experience customers expected from a leading fashion brand.',
                'problems-intro': 'The existing C&A mobile app faced critical usability and business challenges.',
                'process-intro': 'A comprehensive design approach focusing on user research, modern interface design, and seamless shopping experience.',
                'research-analysis-title': 'Research & Analysis',
                'ia-redesign-title': 'Information Architecture Redesign',
                'design-system-title': 'Building a Design System for Modern Retail: Strategy, Structure, and Impact',
                'why-ds-essential-title': 'Why a New Design System Was Essential',
                'ds-strategy-title': 'Design System Strategy and Philosophy',
                'system-structure-title': 'System Structure and Components',
                'documentation-title': 'Documentation: The Key to Adoption',
                'measuring-impact-title': 'Measuring Impact: The Business Case for Design Systems',
                'strategic-value-title': 'Long-Term Strategic Value',
                'core-principles-title': 'Core Principles:',
                'simplicity-principle-title': 'Simplicity Over Complexity',
                'footer-text': '© 2024 Beatriz Tomazelli. All rights reserved.',

                // Dex Project Page
                'project-context': 'Context',
                'dex-context': 'Data Engineering is inherently hard, complex, technical, and inaccessible to most companies and teams. While dex is a data engineering tool, over 60% of users lack deep technical knowledge, creating a usability gap. The mission was to obsessively pursue simplicity, transforming complex data engineering workflows into intuitive experiences that empowered all users—from seasoned engineers to business analysts.',
                'legacy-interface-title': 'Legacy interface',
                'legacy-interface-intro': 'Our legacy interface was hindering both user success and team productivity.',
                'problems-title': 'Problems',
                'problem-1': '<strong style="color: #57A2B8;">Users struggled with an outdated interface</strong>, inconsistent compared to modern competitors.',
                'problem-2': '<strong style="color: #57A2B8;">Inconsistent UI patterns across flows</strong> created confusion and reduced task completion rates.',
                'problem-3': '<strong style="color: #57A2B8;">No centralized design system</strong> led to fragmented experiences',
                'problem-4': '<strong style="color: #57A2B8;">Product team unable to deliver cohesive experiences</strong> due to design debt',
                'problem-5': '<strong style="color: #57A2B8;">Dev team wasting time rebuilding components</strong> instead of focusing on features',
                'legacy-interface-caption': 'Inconsistent button styles and poor visual hierarchy throughout the interface',
                'process-title': 'Process',
                'process-intro': 'A systematic approach to transforming complex data engineering workflows into intuitive user experiences.',
                'process-1': 'Competitors benchmarking and customer discovery',
                'process-2': 'Wireframes → low fidelity → high fidelity',
                'process-3': 'Validations with dev and product team',
                'process-4': 'Design System creation',
                'research-title': 'Research & Benchs',
                'ui-audit-title': 'UI audit of the platform',
                'ui-audit-description': 'Led a collaborative UI audit alongside product and development teams to assess the current state of the platform. Identified critical pain points, UI inconsistencies, and usability issues, gathering valuable insights and suggestions from cross-functional stakeholders to drive design improvements.',
                'competitors-title': 'Competitors Benchmarks',
                'competitors-description': 'Led a comprehensive competitive analysis studying major competitors and aspirational industry leaders including Brex, dbt, Databricks, and Snowflake. Identified design patterns, user experience best practices, and innovative features to inform strategic design decisions.',
                'priorities-title': 'Priorities',
                'priorities-description': 'Established a prioritization framework centered on the platform\'s three most critical workflows: Transformation (enabling users to clean, structure, and prepare data), Ingestion (facilitating seamless data import from various sources), and Orchestration (automating and managing complex pipeline execution). These workflows represent the core of the user\'s daily activities and directly impact their ability to deliver value. Focusing on these high-frequency, high-stakes areas ensured maximum impact on user productivity and platform adoption.',
                'transformation-title': 'Transformation',
                'ingestion-title': 'Ingestion',
                'orchestration-title': 'Orchestration',
                'execution-title': 'Execution and Deliverables',
                'execution-1': 'Validated concepts through wireframes and low-fidelity testing',
                'execution-2': 'Built scalable design system with tokens and component standards',
                'execution-3': 'Prototyped high-fidelity interfaces for core user flows',
                'execution-4': 'Facilitated iterative feedback through structured design sessions',
                'execution-5': 'Validated technical stack using Radix UI and React components',
                'execution-6': 'Documented component library with usage guidelines and specs',
                'execution-7': 'Delivered seamless handoff with detailed implementation guidelines',
                'handoff-caption': 'Notification Center project handoff',
                'solutions-title': 'Solutions',
                'run-button-title': 'Run button improvements x dbt',
                'run-button-p1': 'In data engineering platforms, the Run button represents the most frequent and critical user interaction—it executes data transformations, validates logic, and delivers results. This seemingly simple component carries immense weight: users need confidence that their pipelines will run correctly, clear feedback on execution status, and quick access to results or error logs.',
                'run-button-p2': 'We studied industry leader dbt (valued at over $4 billion) and discovered their Run functionality, while powerful, presented users with overwhelming choices and unclear execution states. Multiple run options, inconsistent feedback patterns, and complex modal interactions created unnecessary cognitive load during a high-stakes moment.',
                'run-button-p3': 'Leveraging our restructured Design System, we designed a reimagined Run button that prioritized clarity and simplicity. Our solution consolidated execution options into an intuitive interface, provided clear visual feedback throughout the process, and reduced steps to value. This case study exemplifies how a well-implemented design system empowers smaller companies to outperform billion-dollar competitors through superior user experience design.',
                'git-experience-title': 'Git Experience',
                'git-exp-1': 'Essential for engineers, intimidating for non-technical users',
                'git-exp-2': 'Replaced command-line complexity with visual workflows',
                'git-exp-3': 'Removed technical jargon like "unstaged" and "staged"',
                'git-exp-4': 'Simplified push/pull actions into guided flows',
                'git-exp-5': 'Increased accessibility and reduced user errors',
                'before-after-title': 'Before & After',
                'before-caption': 'Orchestration before the UI Revamp',
                'after-caption': 'Orchestration after the UI Revamp',
                'results-title': 'Results',
                'result-1-desc': 'implementation',
                'result-2-metric': 'Higher',
                'result-2-desc': 'sales conversion from<br>demo to contract',
                'result-3-metric': 'Less',
                'result-3-desc': 'bugs and UI rework',
                'result-4-metric': 'Solid',
                'result-4-desc': 'foundation and<br>documentation'
            },
            pt: {
                // Header
                'header-name': 'Beatriz Tomazelli',
                'nav-home': 'Início',
                'nav-about': 'Sobre',
                'nav-career': 'Carreira',
                'nav-projects': 'Projetos',
                'contact-me': 'Fale comigo',

                // Hero section
                'design-adventures': 'Aventuras de design em',

                // About section
                'about-title': 'Sobre mim',
                'about-intro': 'Oi! Eu sou a Beatriz, uma designer que acredita que um bom design é invisível—ele simplesmente funciona. Minha especialidade? Construir Design Systems que ajudam equipes a criar mais rápido, melhor e com mais consistência.',
                'about-experience': 'Passei anos transformando problemas complexos em soluções simples e elegantes. Seja projetando para startups ou empresas estabelecidas, meu objetivo é sempre o mesmo: criar experiências que os usuários adoram e que as equipes podem escalar.',
                'about-passion': 'Além de pixels e protótipos, sou apaixonada por entender o que faz as pessoas funcionarem e usar essa percepção para projetar produtos que realmente fazem a diferença. Adoro exercitar minha criatividade em tudo que faço—seja criando soluções de design únicas ou me empolgando com cultura pop e as últimas séries de ficção científica. Para mim, criatividade não é apenas parte do meu trabalho; é como eu exploro e me conecto com o mundo.',

                // Career section
                'career-title': 'Carreira',
                'dex-title': 'Dex',
                'dex-description': 'Product Designer',
                'dex-period': '2025 - Presente',
                'dex-details': 'Liderei o redesign da plataforma, construindo um novo Design System do zero com padrões estabelecidos e consistência. Criei uma base escalável que permite o design de novas jornadas de usuário e funcionalidades em toda a plataforma.',

                'santander-title': 'Santander',
                'santander-description': 'UX/UI Designer',
                'santander-period': '2021-2022',
                'santander-details': 'Colaborei com a equipe global do Santander para projetar e documentar novos componentes para o design system. Liderei a criação e adaptação de ilustrações do app para o mercado brasileiro, desenvolvendo personagens e cenários que ressoavam com o público local.',

                'cea-title': 'C&A',
                'cea-description': 'UX Designer',
                'cea-period': '2022-2024',
                'cea-details': 'Liderei a manutenção do Design System e fui uma das designers principais no redesign do novo app e website da empresa. Criei e documentei novos componentes desenvolvendo diretrizes abrangentes de ilustração. Conduzi auditorias de acessibilidade para plataformas web e mobile garantindo conformidade com WCAG. Projetei funcionalidades-chave do app incluindo Central de Notificações, experiência de Frete Grátis e Showcase de produtos.',

                'itau-title': 'Itaú',
                'itau-description': 'Designer Júnior',
                'itau-period': '2018-2021',
                'itau-details': 'Iniciei minha carreira de UX no squad de UX Engineering, gerenciando UI Kits para as equipes de Cartões, Rede e Corporate Banking. Contribuí para esforços de documentação e desenvolvimento inicial do Design System da empresa. Posteriormente fiz transição para a equipe de Aquisição Digital de Clientes, onde projetei jornadas end-to-end para produtos de Microcrédito e Empréstimo direcionados a não-correntistas.',

                // Skills
                'figma-skill': 'Figma',
                'sketch-skill': 'Sketch',
                'prototyping-skill': 'Prototipagem',
                'user-research-skill': 'Pesquisa de Usuário',
                'design-systems-skill': 'Design Systems',
                'vscode-skill': 'VS Code',
                'skills-hint': '✨ Tente arrastar os círculos laranjas',
                'toast-message': 'Aha! Você realmente achou que poderia diminuir minhas habilidades?',

                // Projects section
                'projects-title': 'Projetos',
                'dex-project-title': 'Dex UI Revamp',
                'dex-project-description': 'Redesenhando a experiência do usuário e construindo uma base escalável.',

                'cea-project-title': 'Novo Design System App C&A',
                'cea-project-description': 'Construindo uma nova experiência de aplicativo.',

                'santander-project-title': 'Guia de Ilustração Santander',
                'santander-project-description': 'Diretrizes de ilustração para o time do Brasil',

                'cea-illustrations-title': 'Ilustrações C&A',
                'cea-illustrations-description': 'biblioteca de ilustrações para o e-commerce',

                // Contact section
                'contact-title': 'Vamos trabalhar juntos',
                'contact-subtitle': 'Tem um projeto em mente? Adoraria ouvir sobre ele e discutir como podemos dar vida às suas ideias.',
                'contact-direct': 'Ou entre em contato diretamente:',
                'linkedin-text': 'LinkedIn',
                'form-name-label': 'Seu Nome *',
                'form-name-placeholder': 'Digite seu nome completo',
                'form-email-label': 'Seu Email *',
                'form-email-placeholder': 'seu.email@exemplo.com',
                'form-project-label': 'Tipo de Projeto *',
                'form-project-placeholder': 'Selecione o tipo de projeto',
                'form-project-design-system': 'Design System',
                'form-project-mobile-app': 'Design de App Mobile',
                'form-project-web-design': 'Web Design',
                'form-project-ux-research': 'Pesquisa UX',
                'form-project-consulting': 'Consultoria UX',
                'form-project-other': 'Outro',
                'form-message-label': 'Conte-me sobre seu projeto',
                'form-message-placeholder': 'Compartilhe detalhes sobre seu projeto, cronograma, orçamento e quaisquer requisitos específicos...',
                'form-submit-button': 'Enviar Mensagem',
                'form-success-message': 'Obrigada! Sua mensagem foi enviada com sucesso. Retornarei em breve!',
                'form-error-message': 'Desculpe, houve um erro ao enviar sua mensagem. Tente novamente ou me envie um email diretamente.',

                // C&A Project Page
                'ca-project-title': 'Novo Design System App C&A',
                'ca-context': 'A C&A enfrentou um desafio crítico: a indústria da moda estava se digitalizando rapidamente, e sua experiência digital existente estava ficando para trás. Concorrentes ofereciam interfaces elegantes e modernas enquanto os padrões de design fragmentados da C&A criavam experiências inconsistentes para o usuário e atrasavam os ciclos de desenvolvimento.',
                'ca-context-2': 'Reconhecendo que atualizações incrementais não seriam suficientes, precisávamos reconstruir o design system inteiramente. Isso não era apenas sobre estética—era sobre criar uma base escalável que permitiria à empresa competir no cenário moderno do varejo digital. Um design system abrangente garantiria consistência em todos os pontos de contato, aceleraria o desenvolvimento de funcionalidades e entregaria a experiência intuitiva e contemporânea que clientes esperavam de uma marca de moda líder.',
                'problems-title': 'Problemas',
                'problems-intro': 'O aplicativo móvel existente da C&A enfrentava desafios críticos de usabilidade e negócios.',
                'process-intro': 'Uma abordagem abrangente de design focando em pesquisa do usuário, design de interface moderno e experiência de compra perfeita.',
                'research-analysis-title': 'Pesquisa e Análise',
                'ia-redesign-title': 'Redesign da Arquitetura da Informação',
                'design-system-title': 'Construindo um Design System para Varejo Moderno: Estratégia, Estrutura e Impacto',
                'why-ds-essential-title': 'Por que um Novo Design System era Essencial',
                'ds-strategy-title': 'Estratégia e Filosofia do Design System',
                'system-structure-title': 'Estrutura e Componentes do Sistema',
                'documentation-title': 'Documentação: A Chave para Adoção',
                'measuring-impact-title': 'Medindo Impacto: O Business Case para Design Systems',
                'strategic-value-title': 'Valor Estratégico de Longo Prazo',
                'core-principles-title': 'Princípios Fundamentais:',
                'simplicity-principle-title': 'Simplicidade Sobre Complexidade',
                'footer-text': '© 2024 Beatriz Tomazelli. Todos os direitos reservados.',

                // Dex Project Page
                'project-context': 'Contexto',
                'dex-context': 'Engenharia de Dados é inerentemente difícil, complexa, técnica e não acessível para a maioria das empresas e equipes. Embora o dex seja uma ferramenta de engenharia de dados, mais de 60% dos usuários não possuem conhecimento técnico profundo, criando uma lacuna de usabilidade. A missão era buscar obsessivamente a simplicidade, transformando fluxos de trabalho complexos de engenharia de dados em experiências intuitivas que capacitassem todos os usuários - desde engenheiros experientes até analistas de negócios.',
                'legacy-interface-title': 'Interface legada',
                'legacy-interface-intro': 'Nossa interface legada estava prejudicando tanto o sucesso dos usuários quanto a produtividade da equipe.',
                'problems-title': 'Problemas',
                'problem-1': '<strong style="color: #57A2B8;">Usuários lutavam com uma interface desatualizada</strong>, inconsistente comparada aos concorrentes modernos.',
                'problem-2': '<strong style="color: #57A2B8;">Padrões de UI inconsistentes entre fluxos</strong> criavam confusão e reduziam as taxas de conclusão de tarefas.',
                'problem-3': '<strong style="color: #57A2B8;">Nenhum design system centralizado</strong> levava a experiências fragmentadas',
                'problem-4': '<strong style="color: #57A2B8;">Equipe de produto incapaz de entregar experiências coesas</strong> devido ao débito de design',
                'problem-5': '<strong style="color: #57A2B8;">Equipe de dev perdendo tempo reconstruindo componentes</strong> ao invés de focar em funcionalidades',
                'legacy-interface-caption': 'Estilos de botão inconsistentes e hierarquia visual ruim por toda a interface',
                'process-title': 'Processo',
                'process-intro': 'Uma abordagem sistemática para transformar fluxos de trabalho complexos de engenharia de dados em experiências de usuário intuitivas.',
                'process-1': 'Benchmark de concorrentes e descoberta do cliente',
                'process-2': 'Wireframes → baixa fidelidade → alta fidelidade',
                'process-3': 'Validações com equipe de dev e produto',
                'process-4': 'Criação do Design System',
                'research-title': 'Pesquisa & Benchmarks',
                'ui-audit-title': 'Auditoria de UI da plataforma',
                'ui-audit-description': 'Liderei uma auditoria colaborativa de UI ao lado das equipes de produto e desenvolvimento para avaliar o estado atual da plataforma. Identifiquei pontos críticos de dor, inconsistências de UI e problemas de usabilidade, coletando insights valiosos e sugestões de stakeholders multifuncionais para impulsionar melhorias de design.',
                'competitors-title': 'Benchmarks de Concorrentes',
                'competitors-description': 'Liderei uma análise competitiva abrangente estudando principais concorrentes e líderes aspiracionais da indústria incluindo Brex, dbt, Databricks e Snowflake. Identifiquei padrões de design, melhores práticas de experiência do usuário e recursos inovadores para informar decisões estratégicas de design.',
                'priorities-title': 'Prioridades',
                'priorities-description': 'Estabeleci um framework de priorização centrado nos três fluxos de trabalho mais críticos da plataforma: Transformação (permitindo que usuários limpem, estruturem e preparem dados), Ingestão (facilitando a importação perfeita de dados de várias fontes) e Orquestração (automatizando e gerenciando execução complexa de pipelines). Esses fluxos representam o núcleo das atividades diárias do usuário e impactam diretamente sua capacidade de entregar valor. Focar nessas áreas de alta frequência e alto impacto garantiu máximo impacto na produtividade do usuário e adoção da plataforma.',
                'transformation-title': 'Transformação',
                'ingestion-title': 'Ingestão',
                'orchestration-title': 'Orquestração',
                'execution-title': 'Execução e Entregas',
                'execution-1': 'Validei conceitos através de wireframes e testes de baixa fidelidade',
                'execution-2': 'Construí design system escalável com tokens e padrões de componentes',
                'execution-3': 'Prototipei interfaces de alta fidelidade para fluxos centrais do usuário',
                'execution-4': 'Facilitei feedback iterativo através de sessões estruturadas de design',
                'execution-5': 'Validei stack técnica usando componentes Radix UI e React',
                'execution-6': 'Documentei biblioteca de componentes com diretrizes de uso e especificações',
                'execution-7': 'Entreguei handoff perfeito com diretrizes detalhadas de implementação',
                'handoff-caption': 'Handoff do projeto Notification Center',
                'solutions-title': 'Soluções',
                'run-button-title': 'Melhorias do botão Run x dbt',
                'run-button-p1': 'Em plataformas de engenharia de dados, o botão Run representa a interação do usuário mais frequente e crítica—executa transformações de dados, valida lógica e entrega resultados. Este componente aparentemente simples carrega imenso peso: usuários precisam de confiança de que seus pipelines executarão corretamente, feedback claro sobre status de execução e acesso rápido a resultados ou logs de erro.',
                'run-button-p2': 'Estudamos a líder da indústria dbt (avaliada em mais de $4 bilhões) e descobrimos que sua funcionalidade Run, embora poderosa, apresentava aos usuários escolhas opressivas e estados de execução pouco claros. Múltiplas opções de execução, padrões de feedback inconsistentes e interações modais complexas criavam carga cognitiva desnecessária durante um momento de alto risco.',
                'run-button-p3': 'Aproveitando nosso Design System reestruturado, projetamos um botão Run reimaginado que priorizou clareza e simplicidade. Nossa solução consolidou opções de execução em uma interface intuitiva, forneceu feedback visual claro durante todo o processo e reduziu passos para valor. Este estudo de caso exemplifica como um design system bem implementado capacita empresas menores a superar concorrentes de bilhões de dólares através de design superior de experiência do usuário.',
                'git-experience-title': 'Experiência Git',
                'git-exp-1': 'Essencial para engenheiros, intimidante para usuários não técnicos',
                'git-exp-2': 'Substituí complexidade de linha de comando com fluxos visuais',
                'git-exp-3': 'Removi jargão técnico como "unstaged" e "staged"',
                'git-exp-4': 'Simplifiquei ações push/pull em fluxos guiados',
                'git-exp-5': 'Aumentei acessibilidade e reduzi erros do usuário',
                'before-after-title': 'Antes & Depois',
                'before-caption': 'Orquestração antes do UI Revamp',
                'after-caption': 'Orquestração depois do UI Revamp',
                'results-title': 'Resultados',
                'result-1-desc': 'implementação',
                'result-2-metric': 'Maior',
                'result-2-desc': 'conversão de vendas de<br>demo para contrato',
                'result-3-metric': 'Menos',
                'result-3-desc': 'bugs e retrabalho de UI',
                'result-4-metric': 'Sólida',
                'result-4-desc': 'base e<br>documentação'
            }
        };

        // Translate page content
        function translatePage(selectedLanguage) {
            console.log('🌐 Translating to:', selectedLanguage);
            const currentTranslations = translations[selectedLanguage];
            console.log('📖 Translation keys available:', currentTranslations ? Object.keys(currentTranslations).length : 0);

            // Translate all elements with data-translate attribute
            const elementsToTranslate = document.querySelectorAll('[data-translate]');
            console.log('🔍 Elements to translate:', elementsToTranslate.length);

            let translatedCount = 0;
            elementsToTranslate.forEach(element => {
                const key = element.getAttribute('data-translate');
                if (currentTranslations && currentTranslations[key]) {
                    // Use innerHTML for content that contains HTML tags, textContent otherwise
                    if (currentTranslations[key].includes('<br>') || currentTranslations[key].includes('<strong>')) {
                        element.innerHTML = currentTranslations[key];
                    } else {
                        element.textContent = currentTranslations[key];
                    }
                    translatedCount++;
                } else {
                    console.log('❌ No translation for:', key);
                }
            });

            // Translate placeholders
            const placeholderElements = document.querySelectorAll('[data-translate-placeholder]');
            placeholderElements.forEach(element => {
                const key = element.getAttribute('data-translate-placeholder');
                if (currentTranslations && currentTranslations[key]) {
                    element.placeholder = currentTranslations[key];
                    translatedCount++;
                }
            });

            console.log(`✅ Translated ${translatedCount} elements`);
        }

        // Update UI based on selected language
        function updateLanguageUI(selectedLanguage) {
            const lang = languageData[selectedLanguage];

            // Update desktop selector
            const desktopFlag = desktopButton.querySelector('.language-flag');
            const desktopText = desktopButton.querySelector('.language-text');
            if (desktopFlag && desktopText) {
                desktopFlag.src = lang.flag;
                desktopFlag.alt = `${selectedLanguage.toUpperCase()} Flag`;
                desktopText.textContent = lang.full;
                console.log('✅ Desktop UI updated');
            }

            // Update mobile selector if it exists
            if (mobileButton && mobileDropdown) {
                const mobileFlag = mobileButton.querySelector('.language-flag-mobile');
                const mobileText = mobileButton.querySelector('.language-text-mobile');
                if (mobileFlag && mobileText) {
                    mobileFlag.src = lang.flag;
                    mobileFlag.alt = `${selectedLanguage.toUpperCase()} Flag`;
                    mobileText.textContent = lang.full;
                    console.log('✅ Mobile UI updated');
                }
            }

            // Translate page content
            translatePage(selectedLanguage);
        }

        // Handle language change
        function handleLanguageChange(selectedLanguage) {
            updateLanguageUI(selectedLanguage);

            // Store the selected language in localStorage
            localStorage.setItem('selectedLanguage', selectedLanguage);

            // Close dropdowns
            desktopDropdown.classList.add('hidden');
            if (mobileDropdown) {
                mobileDropdown.classList.add('hidden');
            }
        }

        // Toggle dropdown visibility
        function toggleDropdown(dropdown) {
            dropdown.classList.toggle('hidden');
        }

        // Close dropdown when clicking outside
        function closeDropdowns() {
            desktopDropdown.classList.add('hidden');
            if (mobileDropdown) {
                mobileDropdown.classList.add('hidden');
            }
        }

        // Desktop dropdown events
        desktopButton.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleDropdown(desktopDropdown);
            if (mobileDropdown) {
                mobileDropdown.classList.add('hidden');
            }
        });

        // Mobile dropdown events (if mobile elements exist)
        if (mobileButton && mobileDropdown) {
            mobileButton.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleDropdown(mobileDropdown);
                desktopDropdown.classList.add('hidden');
            });
        }

        // Language option events
        document.querySelectorAll('.language-option, .language-option-mobile').forEach(option => {
            option.addEventListener('click', function() {
                const selectedLang = this.getAttribute('data-lang');
                handleLanguageChange(selectedLang);
            });
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', closeDropdowns);

        // Load saved language preference
        const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
        updateLanguageUI(savedLanguage);

        // Force update to ensure English is displayed
        setTimeout(() => {
            const desktopText = document.querySelector('.language-text');
            if (desktopText && savedLanguage === 'en') {
                desktopText.textContent = 'English';
            }
        }, 100);

    }

    initLanguageSelector();

    // Contact Form Functionality
    function initContactForm() {
        console.log('🔧 Starting contact form initialization...');

        const contactForm = document.getElementById('contact-form');
        if (!contactForm) {
            console.log('ℹ️ Contact form not found on this page');
            return;
        }

        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const projectType = formData.get('project-type');
            const message = formData.get('message');

            // Simple form validation
            if (!name || !email || !projectType) {
                showFormMessage('error', 'Please fill in all required fields.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('error', 'Please enter a valid email address.');
                return;
            }

            // Prepare email content
            const subject = `New Project Inquiry: ${projectType}`;
            const emailBody = `
Name: ${name}
Email: ${email}
Project Type: ${projectType}

Message:
${message || 'No additional message provided.'}

---
This message was sent from your portfolio contact form.
            `.trim();

            // Create mailto link
            const mailtoLink = `mailto:beatriz.tomazellioliveira@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

            // Open email client
            window.location.href = mailtoLink;

            // Show success message and reset form
            showFormMessage('success', '');
            contactForm.reset();
        });

        function showFormMessage(type, customMessage = '') {
            const successDiv = document.getElementById('form-success');
            const errorDiv = document.getElementById('form-error');

            // Hide both first
            successDiv.classList.add('hidden');
            errorDiv.classList.add('hidden');

            if (type === 'success') {
                successDiv.classList.remove('hidden');

                // Auto-hide after 5 seconds
                setTimeout(() => {
                    successDiv.classList.add('hidden');
                }, 5000);
            } else if (type === 'error') {
                if (customMessage) {
                    const errorMessage = errorDiv.querySelector('p');
                    errorMessage.textContent = customMessage;
                }
                errorDiv.classList.remove('hidden');

                // Auto-hide after 5 seconds
                setTimeout(() => {
                    errorDiv.classList.add('hidden');
                }, 5000);
            }
        }

        console.log('✅ Contact form initialized successfully');
    }

    initContactForm();

    // Image Zoom Functionality
    function initImageZoom() {
        const heroImage = document.getElementById('hero-image');
        const zoomInBtn = document.getElementById('zoom-in-btn');
        const zoomOutBtn = document.getElementById('zoom-out-btn');
        const resetZoomBtn = document.getElementById('reset-zoom-btn');

        if (!heroImage || !zoomInBtn || !zoomOutBtn || !resetZoomBtn) {
            console.log('Zoom controls not found on this page');
            return;
        }

        let currentZoom = 1;
        const zoomStep = 0.2;
        const minZoom = 0.5;
        const maxZoom = 3;

        function updateZoom(newZoom) {
            currentZoom = Math.max(minZoom, Math.min(maxZoom, newZoom));
            heroImage.style.transform = `scale(${currentZoom})`;

            // Update button states
            zoomInBtn.disabled = currentZoom >= maxZoom;
            zoomOutBtn.disabled = currentZoom <= minZoom;

            // Update button appearance based on state
            if (currentZoom >= maxZoom) {
                zoomInBtn.style.opacity = '0.5';
                zoomInBtn.style.cursor = 'not-allowed';
            } else {
                zoomInBtn.style.opacity = '1';
                zoomInBtn.style.cursor = 'pointer';
            }

            if (currentZoom <= minZoom) {
                zoomOutBtn.style.opacity = '0.5';
                zoomOutBtn.style.cursor = 'not-allowed';
            } else {
                zoomOutBtn.style.opacity = '1';
                zoomOutBtn.style.cursor = 'pointer';
            }
        }

        // Zoom In
        zoomInBtn.addEventListener('click', function() {
            updateZoom(currentZoom + zoomStep);
        });

        // Zoom Out
        zoomOutBtn.addEventListener('click', function() {
            updateZoom(currentZoom - zoomStep);
        });

        // Reset Zoom
        resetZoomBtn.addEventListener('click', function() {
            updateZoom(1);
        });

        // Initialize
        updateZoom(1);

        console.log('✅ Image zoom functionality initialized');
    }

    // Initialize zoom functionality
    initImageZoom();


});