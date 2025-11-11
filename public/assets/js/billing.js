(function() {
    'use strict';

    const Billing = {
        init: function() {
            this.initDarkMode();
            this.handlePlanSelection();
            this.handleMobileMenu();
            this.handleDarkModeToggle();
            this.initAnimations();
        },

        initDarkMode: function() {
            const savedDarkMode = localStorage.getItem('darkMode') === 'true';
            const body = document.body;
            
            if (savedDarkMode) {
                body.classList.add('dark-mode');
                
                const toggleThumb = document.querySelector('.toggle-thumb');
                const toggleSwitch = document.querySelector('.toggle-switch');
                
                if (toggleThumb && toggleSwitch) {
                    toggleThumb.style.transform = 'translateX(20px)';
                    toggleSwitch.style.background = '#F59D00';
                }
            }
        },

        toggleDarkMode: function() {
            const body = document.body;
            const isDarkMode = body.classList.toggle('dark-mode');
            
            localStorage.setItem('darkMode', isDarkMode);
            
            const toggleThumb = document.querySelector('.toggle-thumb');
            const toggleSwitch = document.querySelector('.toggle-switch');
            
            if (toggleThumb && toggleSwitch) {
                if (isDarkMode) {
                    toggleThumb.style.transform = 'translateX(20px)';
                    toggleSwitch.style.background = '#F59D00';
                } else {
                    toggleThumb.style.transform = 'translateX(0)';
                    toggleSwitch.style.background = 'var(--color-border)';
                }
            }
        },

        handleDarkModeToggle: function() {
            const darkModeToggle = document.querySelector('.dark-mode-toggle');
            
            if (darkModeToggle) {
                darkModeToggle.addEventListener('click', function(e) {
                    e.preventDefault();
                    Billing.toggleDarkMode();
                });
            }
        },

        handlePlanSelection: function() {
            const planForms = document.querySelectorAll('.pricing-card');
            const planButtons = document.querySelectorAll('.choose-plan-btn');

            planForms.forEach((form, index) => {
                form.addEventListener('click', (e) => {
                    if (e.target.classList.contains('choose-plan-btn') || e.target.closest('.choose-plan-btn')) {
                        return;
                    }

                    planForms.forEach(f => {
                        f.classList.remove('pricing-card--active');
                    });

                    planButtons.forEach(btn => {
                        btn.classList.remove('choose-plan-btn--active');
                    });

                    form.classList.add('pricing-card--active');
                    planButtons[index].classList.add('choose-plan-btn--active');
                });

                form.addEventListener('submit', (e) => {
                    e.preventDefault();

                    planForms.forEach(f => {
                        f.classList.remove('pricing-card--active');
                    });

                    planButtons.forEach(btn => {
                        btn.classList.remove('choose-plan-btn--active');
                    });

                    form.classList.add('pricing-card--active');
                    planButtons[index].classList.add('choose-plan-btn--active');

                    // Here you can add your form submission logic
                    // For example: submit the selected plan to your backend
                });
            });

            planButtons.forEach((button, index) => {
                button.addEventListener('click', (e) => {
                    e.stopPropagation();
                    e.preventDefault();

                    planForms.forEach(f => {
                        f.classList.remove('pricing-card--active');
                    });

                    planButtons.forEach(btn => {
                        btn.classList.remove('choose-plan-btn--active');
                    });

                    planForms[index].classList.add('pricing-card--active');
                    button.classList.add('choose-plan-btn--active');

                    // Trigger form submission
                    planForms[index].dispatchEvent(new Event('submit'));
                });
            });
        },

        initAnimations: function() {
            const greeting = document.querySelector('.dashboard-greeting');
            const pricingCards = document.querySelectorAll('.pricing-card');
            const billingHistory = document.querySelector('.billing-history-section');

            if (greeting) {
                greeting.style.opacity = '0';
                greeting.style.transform = 'translateY(-10px)';
                greeting.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

                setTimeout(() => {
                    greeting.style.opacity = '1';
                    greeting.style.transform = 'translateY(0)';
                }, 100);
            }

            if (pricingCards.length > 0) {
                pricingCards.forEach((card, index) => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 200 + (index * 100));
                });
            }

            if (billingHistory) {
                billingHistory.style.opacity = '0';
                billingHistory.style.transform = 'translateY(20px)';
                billingHistory.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

                setTimeout(() => {
                    billingHistory.style.opacity = '1';
                    billingHistory.style.transform = 'translateY(0)';
                }, 600);
            }
        },

        handleMobileMenu: function() {
            const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
            const sidebar = document.getElementById('dashboard-sidebar');
            const overlay = document.getElementById('sidebar-overlay');

            if (!mobileMenuToggle || !sidebar) return;

            mobileMenuToggle.addEventListener('click', function(e) {
                e.preventDefault();
                sidebar.classList.toggle('sidebar-visible');
                
                if (overlay) {
                    overlay.classList.toggle('active');
                }
            });

            if (overlay) {
                overlay.addEventListener('click', function() {
                    sidebar.classList.remove('sidebar-visible');
                    overlay.classList.remove('active');
                });
            }

            // Close sidebar when clicking on nav items in mobile
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach(item => {
                item.addEventListener('click', function() {
                    if (window.innerWidth <= 768) {
                        sidebar.classList.remove('sidebar-visible');
                        if (overlay) {
                            overlay.classList.remove('active');
                        }
                    }
                });
            });
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            Billing.init();
        });
    } else {
        Billing.init();
    }
})();


