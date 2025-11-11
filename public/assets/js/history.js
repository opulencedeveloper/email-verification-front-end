(function() {
    'use strict';

    const History = {
        init: function() {
            this.initDarkMode();
            this.handleSeeResults();
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
                    History.toggleDarkMode();
                });
            }
        },

        handleSeeResults: function() {
            const seeResultsButtons = document.querySelectorAll('.see-results-btn');
            
            seeResultsButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    window.location.href = '/dashboard/dashboard-details.html';
                });
            });
        },

        initAnimations: function() {
            const cards = document.querySelectorAll('.dashboard-card');
            const greeting = document.querySelector('.dashboard-greeting');
            
            if (greeting) {
                greeting.style.opacity = '0';
                greeting.style.transform = 'translateY(-20px)';
                
                setTimeout(() => {
                    greeting.style.transition = 'all 0.5s ease';
                    greeting.style.opacity = '1';
                    greeting.style.transform = 'translateY(0)';
                }, 100);
            }

            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    card.style.transition = 'all 0.5s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 200 + (index * 100));
            });

            const historyItems = document.querySelectorAll('.history-item');
            historyItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(-20px)';
                
                setTimeout(() => {
                    item.style.transition = 'all 0.4s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, 400 + (index * 100));
            });
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

    window.addEventListener('load', function() {
        History.init();
    });
})();


