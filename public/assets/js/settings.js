(function() {
    'use strict';

    const Settings = {
        init: function() {
            this.initDarkMode();
            this.handleMobileMenu();
            this.handlePersonalInfoForm();
            this.handlePasswordForm();
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
                    Settings.toggleDarkMode();
                });
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
        },

        handlePersonalInfoForm: function() {
            const form = document.getElementById('personal-info-form');
            
            if (!form) return;

            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const firstName = document.getElementById('first-name').value;
                const lastName = document.getElementById('last-name').value;
                
                // Here you can add your form submission logic
                // For example: send the data to your backend
                console.log('Personal info updated:', { firstName, lastName });
                
                // Show success feedback
                const saveBtn = form.querySelector('.settings-save-btn');
                const originalText = saveBtn.textContent;
                saveBtn.textContent = 'Saved!';
                saveBtn.style.background = '#10B981';
                
                setTimeout(() => {
                    saveBtn.textContent = originalText;
                    saveBtn.style.background = '#F59D00';
                }, 2000);
            });
        },

        handlePasswordForm: function() {
            const form = document.getElementById('password-form');
            
            if (!form) return;

            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const currentPassword = document.getElementById('current-password').value;
                const newPassword = document.getElementById('new-password').value;
                
                // Validate passwords
                if (newPassword.length < 8) {
                    alert('New password must be at least 8 characters long');
                    return;
                }
                
                // Here you can add your form submission logic
                // For example: send the data to your backend
                console.log('Password update requested');
                
                // Show success feedback
                const saveBtn = form.querySelector('.settings-save-btn');
                const originalText = saveBtn.textContent;
                saveBtn.textContent = 'Saved!';
                saveBtn.style.background = '#10B981';
                
                // Clear form
                form.reset();
                
                setTimeout(() => {
                    saveBtn.textContent = originalText;
                    saveBtn.style.background = '#F59D00';
                }, 2000);
            });
        },

        initAnimations: function() {
            const greeting = document.querySelector('.dashboard-greeting');
            const settingsCards = document.querySelectorAll('.settings-card');

            if (greeting) {
                greeting.style.opacity = '0';
                greeting.style.transform = 'translateY(-20px)';
                
                setTimeout(() => {
                    greeting.style.transition = 'all 0.5s ease';
                    greeting.style.opacity = '1';
                    greeting.style.transform = 'translateY(0)';
                }, 100);
            }

            settingsCards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    card.style.transition = 'all 0.5s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 200 + (index * 100));
            });
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            Settings.init();
        });
    } else {
        Settings.init();
    }
})();

