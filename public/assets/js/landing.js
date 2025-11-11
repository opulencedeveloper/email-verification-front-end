// Landing Page JavaScript

(function() {
    'use strict';

    const Landing = {
        init: function() {
            this.handleSmoothScroll();
            this.handleHeaderScroll();
            this.handleMobileMenu();
            this.handlePricingToggle();
            this.handleFAQ();
            this.initParallaxEffects();
            this.initHoverAnimations();
            this.scrollToHash();
            // Delay scroll animations until page is fully loaded to prevent shaking
            this.initScrollAnimationsDelayed();
        },
        
        initScrollAnimationsDelayed: function() {
            // Wait for page to be fully loaded before initializing scroll animations
            if (document.readyState === 'complete') {
                // Page already loaded, wait a bit for layout to stabilize
                setTimeout(() => {
                    this.initScrollAnimations();
                }, 300);
            } else {
                // Wait for window load event
                window.addEventListener('load', () => {
                    // Additional delay to ensure layout is stable
                    setTimeout(() => {
                        this.initScrollAnimations();
                    }, 300);
                });
            }
        },

        handleSmoothScroll: function() {
            // Smooth scroll for anchor links with header offset
            const header = document.querySelector('.landing-header');
            const headerHeight = header ? header.offsetHeight : 108;
            const anchorLinks = document.querySelectorAll('a[href^="#"]');
            const isHomePage = window.location.pathname === '/' || window.location.pathname === '/index.html' || window.location.pathname.endsWith('/');
            
            anchorLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    if (href !== '#' && href.length > 1) {
                        e.preventDefault();
                        
                        // If not on home page, navigate to home page with hash
                        if (!isHomePage) {
                            window.location.href = '/' + href;
                            return;
                        }
                        
                        // If on home page, smooth scroll to section
                        const target = document.querySelector(href);
                        if (target) {
                            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                            const offsetPosition = targetPosition - headerHeight;
                            
                            window.scrollTo({
                                top: offsetPosition,
                                behavior: 'smooth'
                            });
                            
                            // Update URL hash without triggering scroll
                            history.pushState(null, null, href);
                            
                            // Close mobile menu if open
                            const mobileNav = document.querySelector('.header-nav');
                            if (mobileNav && mobileNav.classList.contains('mobile-nav-open')) {
                                const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
                                if (mobileMenuToggle) {
                                    mobileMenuToggle.click();
                                }
                            }
                        }
                    }
                });
            });
        },
        
        scrollToHash: function() {
            // Scroll to hash section if present in URL (for navigation from other pages)
            const hash = window.location.hash;
            if (hash && hash.length > 1) {
                const header = document.querySelector('.landing-header');
                const headerHeight = header ? header.offsetHeight : 108;
                const target = document.querySelector(hash);
                
                if (target) {
                    // Wait for page to fully load and render
                    const scrollToSection = () => {
                        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                        const offsetPosition = targetPosition - headerHeight;
                        
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    };
                    
                    // Try immediately, then with delays to ensure page is loaded
                    if (document.readyState === 'complete') {
                        setTimeout(scrollToSection, 200);
                    } else {
                        window.addEventListener('load', () => {
                            setTimeout(scrollToSection, 200);
                        });
                    }
                }
            }
        },

        handleHeaderScroll: function() {
            // Add scroll effect to header - make it transparent until scrolled
            const header = document.querySelector('.landing-header');
            if (!header) return;
            
            window.addEventListener('scroll', function() {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        },

        handleMobileMenu: function() {
            const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
            const headerNav = document.querySelector('.header-nav');
            const headerActions = headerNav ? headerNav.querySelector('.header-actions') : null;
            const body = document.body;
            
            if (!mobileMenuToggle || !headerNav) return;
            
            // Create overlay
            const overlay = document.createElement('div');
            overlay.className = 'mobile-menu-overlay';
            body.appendChild(overlay);
            
            const openMenu = () => {
                // First show the overlay
                overlay.classList.add('active');
                
                // Then trigger the sidebar animation after a tiny delay to ensure overlay is visible
                requestAnimationFrame(() => {
                    headerNav.classList.add('mobile-nav-open');
                    mobileMenuToggle.classList.add('active');
                    mobileMenuToggle.setAttribute('aria-expanded', 'true');
                    body.style.overflow = 'hidden';
                    
                    // Add staggered animation delays to nav links
                    const navLinks = headerNav.querySelectorAll('.nav-link');
                    navLinks.forEach((link, index) => {
                        link.style.setProperty('--nav-item-index', index);
                    });
                    
                    // Add delay to header actions
                    if (headerActions) {
                        headerActions.style.setProperty('--nav-item-index', navLinks.length);
                    }
                });
            };
            
            const closeMenu = () => {
                // Remove sidebar first
                headerNav.classList.remove('mobile-nav-open');
                mobileMenuToggle.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                
                // Then remove overlay after transition
                setTimeout(() => {
                    overlay.classList.remove('active');
                    body.style.overflow = '';
                }, 400); // Match the transition duration
            };
            
            mobileMenuToggle.addEventListener('click', function() {
                const isOpen = headerNav.classList.contains('mobile-nav-open');
                if (isOpen) {
                    closeMenu();
                } else {
                    openMenu();
                }
            });
            
            // Close menu when clicking overlay
            overlay.addEventListener('click', closeMenu);
            
            // Close menu when clicking on nav links
            const navLinks = headerNav.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    closeMenu();
                });
            });
            
            // Close menu when clicking action buttons
            if (headerActions) {
                const actionButtons = headerActions.querySelectorAll('.btn');
                actionButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        closeMenu();
                    });
                });
            }
        },

        handlePricingToggle: function() {
            const toggleButtons = document.querySelectorAll('.pricing-toggle-btn');
            const pricingPeriods = document.querySelectorAll('.pricing-period');
            const toggleSlider = document.querySelector('.pricing-toggle-slider');
            const toggleContainer = document.querySelector('.pricing-toggle');
            
            if (!toggleButtons.length || !pricingPeriods.length || !toggleSlider) return;
            
            // Function to update slider position
            const updateSliderPosition = (activeButton) => {
                const buttonWidth = activeButton.offsetWidth;
                const buttonLeft = activeButton.offsetLeft;
                
                // Set slider width to match button width
                toggleSlider.style.width = `${buttonWidth}px`;
                // Position slider to align with button (offsetLeft already accounts for container padding)
                // Since slider starts at left: 12px, we need to subtract that from buttonLeft
                const containerPadding = 12;
                const translateX = buttonLeft - containerPadding;
                toggleSlider.style.transform = `translateX(${translateX}px) translateY(-50%)`;
            };
            
            // Initialize slider position on page load
            const initializeSlider = () => {
                const activeButton = document.querySelector('.pricing-toggle-btn.pricing-toggle-active');
                if (activeButton) {
                    // Small delay to ensure layout is calculated
                    setTimeout(() => {
                        updateSliderPosition(activeButton);
                    }, 10);
                }
            };
            
            // Initialize on load
            initializeSlider();
            
            // Also initialize on window resize to handle responsive changes
            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    const activeButton = document.querySelector('.pricing-toggle-btn.pricing-toggle-active');
                    if (activeButton) {
                        updateSliderPosition(activeButton);
                    }
                }, 100);
            });
            
            toggleButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remove active class from all buttons
                    toggleButtons.forEach(btn => btn.classList.remove('pricing-toggle-active'));
                    
                    // Add active class to clicked button
                    this.classList.add('pricing-toggle-active');
                    
                    // Update slider position
                    updateSliderPosition(this);
                    
                    // Update pricing periods and data
                    const isYearly = this.getAttribute('data-period') === 'yearly';
                    updatePricingData(isYearly);
                });
            });
            
            // Function to update pricing data based on period
            const updatePricingData = (isYearly) => {
                const pricingCards = document.querySelectorAll('.pricing-card');
                
                pricingCards.forEach(card => {
                    const amountEl = card.querySelector('.pricing-amount');
                    const periodEl = card.querySelector('.pricing-period');
                    const featuresList = card.querySelector('.pricing-features');
                    
                    if (isYearly) {
                        // Update price
                        const yearlyPrice = card.getAttribute('data-yearly-price');
                        if (yearlyPrice && amountEl) {
                            amountEl.textContent = yearlyPrice;
                        }
                        if (periodEl) {
                            periodEl.textContent = '/year';
                        }
                        
                        // Update features
                        const yearlyFeatures = JSON.parse(card.getAttribute('data-yearly-features') || '[]');
                        updateFeaturesList(featuresList, yearlyFeatures);
                    } else {
                        // Update price
                        const monthlyPrice = card.getAttribute('data-monthly-price');
                        if (monthlyPrice && amountEl) {
                            amountEl.textContent = monthlyPrice;
                        }
                        if (periodEl) {
                            periodEl.textContent = '/month';
                        }
                        
                        // Update features
                        const monthlyFeatures = JSON.parse(card.getAttribute('data-monthly-features') || '[]');
                        updateFeaturesList(featuresList, monthlyFeatures);
                    }
                });
            };
            
            // Function to update features list
            const updateFeaturesList = (featuresList, features) => {
                if (!featuresList || !features.length) return;
                
                const featureItems = featuresList.querySelectorAll('.pricing-feature');
                featureItems.forEach((item, index) => {
                    const span = item.querySelector('span');
                    if (span && features[index]) {
                        span.textContent = features[index];
                    }
                });
            };
            
            // Handle "Choose Plan" button clicks to select the card
            const pricingCtaButtons = document.querySelectorAll('.pricing-cta');
            pricingCtaButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    const card = this.closest('.pricing-card');
                    if (card) {
                        // Remove selected class from all cards
                        const allCards = document.querySelectorAll('.pricing-card');
                        allCards.forEach(c => {
                            c.classList.remove('pricing-card-selected');
                            // Reset all buttons to secondary
                            const cta = c.querySelector('.pricing-cta');
                            if (cta) {
                                cta.classList.remove('pricing-cta-primary');
                                cta.classList.add('pricing-cta-secondary');
                            }
                        });
                        
                        // Add selected class to the clicked card
                        card.classList.add('pricing-card-selected');
                        
                        // Change button to primary style
                        this.classList.remove('pricing-cta-secondary');
                        this.classList.add('pricing-cta-primary');
                    }
                });
            });
            
            // Handle card clicks to add/remove featured border
            const pricingCards = document.querySelectorAll('.pricing-card');
            pricingCards.forEach(card => {
                card.addEventListener('click', function(e) {
                    // Don't trigger if clicking the button
                    if (e.target.closest('.pricing-cta')) return;
                    
                    // Remove featured class from all cards
                    pricingCards.forEach(c => {
                        c.classList.remove('pricing-card-featured');
                        const cta = c.querySelector('.pricing-cta');
                        if (cta) {
                            cta.classList.remove('pricing-cta-primary');
                            cta.classList.add('pricing-cta-secondary');
                        }
                    });
                    
                    // Add featured class to clicked card
                    this.classList.add('pricing-card-featured');
                    const cta = this.querySelector('.pricing-cta');
                    if (cta) {
                        cta.classList.remove('pricing-cta-secondary');
                        cta.classList.add('pricing-cta-primary');
                    }
                });
            });
        },

        handleFAQ: function() {
            // Handle FAQ item expand/collapse
            const faqItems = document.querySelectorAll('.faq-item');
            const faqToggles = document.querySelectorAll('.faq-toggle');
            
            faqToggles.forEach((toggle, index) => {
                toggle.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const faqItem = this.closest('.faq-item');
                    const iconWrapper = this.querySelector('.faq-icon-wrapper');
                    
                    // Close all other items
                    faqItems.forEach(item => {
                        if (item !== faqItem) {
                            item.classList.remove('faq-item-expanded');
                            const otherIconWrapper = item.querySelector('.faq-icon-wrapper');
                            if (otherIconWrapper) {
                                otherIconWrapper.classList.remove('faq-icon-expanded');
                            }
                        }
                    });
                    
                    // Toggle current item
                    faqItem.classList.toggle('faq-item-expanded');
                    if (iconWrapper) {
                        iconWrapper.classList.toggle('faq-icon-expanded');
                    }
                });
            });
            
            // Handle FAQ question click (also toggles)
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                if (question) {
                    question.addEventListener('click', function() {
                        const toggle = item.querySelector('.faq-toggle');
                        if (toggle) {
                            toggle.click();
                        }
                    });
                }
            });
            
            // Handle filter buttons
            const filterButtons = document.querySelectorAll('.faq-filter-btn');
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remove active class from all buttons
                    filterButtons.forEach(btn => btn.classList.remove('faq-filter-active'));
                    
                    // Add active class to clicked button
                    this.classList.add('faq-filter-active');
                    
                    // Here you can add logic to filter FAQ items based on category
                    // For now, we'll just update the active state
                });
            });
        },

        initScrollAnimations: function() {
            // Use requestAnimationFrame to ensure layout is stable before observing
            requestAnimationFrame(() => {
                // Intersection Observer for scroll-triggered animations
                const observerOptions = {
                    threshold: 0.1,
                    rootMargin: '0px 0px -100px 0px'
                };
            
            // More strict observer for feature cards to trigger later
            const featureCardObserverOptions = {
                threshold: 0.9,
                rootMargin: '0px 0px -600px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                        
                        // Special handling for feature-card-item stagger (prioritize this)
                        const featureItems = entry.target.querySelectorAll('.feature-card-item.stagger-item');
                        if (featureItems.length > 0) {
                            featureItems.forEach((item, index) => {
                                setTimeout(() => {
                                    item.classList.add('animate-in');
                                }, index * 80);
                            });
                        } else {
                            // Stagger animation for other child elements
                            const children = entry.target.querySelectorAll('.stagger-item');
                            children.forEach((child, index) => {
                                setTimeout(() => {
                                    child.classList.add('animate-in');
                                }, index * 100);
                            });
                        }
                    }
                });
            }, observerOptions);

            // Observe sections
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                section.classList.add('fade-in-up');
                observer.observe(section);
            });

            // Trigger hero animations immediately on load with smooth timing
            const heroDescription = document.querySelector('.hero-description');
            const heroCta = document.querySelector('.hero-cta');
            const featureItems = document.querySelectorAll('.feature-item');
            
            // Hero description fades in
            if (heroDescription) {
                setTimeout(() => {
                    heroDescription.classList.add('animate-in');
                }, 500);
            }
            
            // Hero CTA fades in
            if (heroCta) {
                setTimeout(() => {
                    heroCta.classList.add('animate-in');
                }, 1000);
            }
            
            // Feature items fade in with smooth stagger
            featureItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('animate-in');
                }, 900 + (index * 100));
            });

            // Observe cards with stagger effect
            const cardContainers = document.querySelectorAll('.validation-cards, .pricing-cards');
            cardContainers.forEach(container => {
                const cards = container.querySelectorAll('.validation-card, .pricing-card');
                cards.forEach((card, index) => {
                    card.classList.add('stagger-item', 'fade-in-up');
                    setTimeout(() => {
                        observer.observe(card);
                    }, index * 50);
                });
            });
            
            // Create separate observer for feature list items - triggers when all items are in view
            const featureListObserverOptions = {
                threshold: 0.95,
                rootMargin: '0px 0px 0px 0px'
            };
            
            const featureListObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Check if all items are visible before animating
                        const featureItems = entry.target.querySelectorAll('.feature-card-item.stagger-item');
                        if (featureItems.length > 0) {
                            // Check if the last item is in view
                            const lastItem = featureItems[featureItems.length - 1];
                            const lastItemRect = lastItem.getBoundingClientRect();
                            const isLastItemVisible = lastItemRect.top < window.innerHeight && lastItemRect.bottom > 0;
                            
                            if (isLastItemVisible) {
                                // Animate all items when the last one is visible
                                featureItems.forEach((item, index) => {
                                    setTimeout(() => {
                                        item.classList.add('animate-in');
                                    }, index * 80);
                                });
                            }
                        }
                    }
                });
            }, featureListObserverOptions);
            
            // Observe feature cards separately to handle feature items
            const featureCards = document.querySelectorAll('.feature-card-light, .feature-card-dark');
            featureCards.forEach((card, index) => {
                // Mark feature items as stagger items
                const featureItems = card.querySelectorAll('.feature-card-item');
                featureItems.forEach(item => {
                    item.classList.add('stagger-item');
                });
                
                // Mark content elements for animation (for feature-card-dark)
                if (card.classList.contains('feature-card-dark')) {
                    const brand = card.querySelector('.feature-card-brand');
                    const title = card.querySelector('.feature-card-title');
                    const description = card.querySelector('.feature-card-description');
                    
                    if (brand) brand.classList.add('stagger-item');
                    if (title) title.classList.add('stagger-item');
                    if (description) description.classList.add('stagger-item');
                }
                
                // Observe the feature list directly instead of the card
                const featureList = card.querySelector('.feature-card-list');
                if (featureList) {
                    setTimeout(() => {
                        featureListObserver.observe(featureList);
                    }, index * 50);
                }
                
                // Also observe the card itself to animate content
                setTimeout(() => {
                    observer.observe(card);
                }, index * 50);
            });

            // Special animation for features-row-dark
            const featuresRowDark = document.querySelector('.features-row-dark');
            if (featuresRowDark) {
                observer.observe(featuresRowDark);
                
                // Animate feature list items when parent comes into view
                const featureListItems = featuresRowDark.querySelectorAll('.feature-card-item');
                featureListItems.forEach((item, index) => {
                    item.classList.add('stagger-item');
                });
            }
            
            // Animate footer sections
            const footerHeroCta = document.querySelector('.footer-hero-cta');
            const footerNewsletter = document.querySelector('.footer-newsletter');
            const footerMain = document.querySelector('.footer-main');
            const footerCopyright = document.querySelector('.footer-copyright');
            
            if (footerHeroCta) {
                observer.observe(footerHeroCta);
            }
            if (footerNewsletter) {
                observer.observe(footerNewsletter);
            }
            if (footerMain) {
                observer.observe(footerMain);
            }
            if (footerCopyright) {
                observer.observe(footerCopyright);
            }
            }); // Close requestAnimationFrame
        },

        initParallaxEffects: function() {
            // Removed parallax effect to prevent overlap issues
            // Hero section will remain static on scroll
        },

        initHoverAnimations: function() {
            // Enhanced card hover effects with 3D transforms (only for validation cards)
            const cards = document.querySelectorAll('.validation-card');
            cards.forEach(card => {
                card.addEventListener('mousemove', function(e) {
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateX = (y - centerY) / 10;
                    const rotateY = (centerX - x) / 10;
                    
                    this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.03)`;
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
                });
            });

            // Enhanced button effects with ripple
            const buttons = document.querySelectorAll('.btn, .pricing-cta, .hero-cta, .footer-hero-cta-button');
            buttons.forEach(button => {
                button.addEventListener('click', function(e) {
                    const ripple = document.createElement('span');
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;
                    
                    ripple.style.width = ripple.style.height = size + 'px';
                    ripple.style.left = x + 'px';
                    ripple.style.top = y + 'px';
                    ripple.classList.add('ripple-effect');
                    
                    this.appendChild(ripple);
                    
                    setTimeout(() => {
                        ripple.remove();
                    }, 600);
                });
            });
        }
    };

    // Disable scroll restoration immediately
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    // Ensure page starts at the top - run immediately
    (function() {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    })();

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        const isHomePage = window.location.pathname === '/' || window.location.pathname === '/index.html' || window.location.pathname.endsWith('/');
        const hasHash = window.location.hash && window.location.hash.length > 1;
        
        // Only scroll to top if there's no hash (not navigating from another page)
        if (!hasHash) {
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }
        
        Landing.init();
        console.log('Landing page loaded successfully.');
    });

    // Also ensure scroll to top on page load (only if no hash)
    window.addEventListener('load', function() {
        const hasHash = window.location.hash && window.location.hash.length > 1;
        if (!hasHash) {
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }
    });
})();

