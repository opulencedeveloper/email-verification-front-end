(function() {
    'use strict';

    const AuthAnimation = {
        getCSSVariable: function(variable) {
            return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
        },

        init: function() {
            this.handleFormValidation();
            this.handleFormSubmit();
            this.handleInputFocus();
            this.handleSpinner();
            this.handlePasswordToggle();
        },

        handleSpinner: function() {
            const spinner = document.getElementById('spinner-body');
            if (!spinner) return;

            window.addEventListener('load', () => {
                setTimeout(() => {
                    spinner.style.opacity = '0';
                    spinner.style.transition = 'opacity 0.3s ease-out';
                    setTimeout(() => {
                        spinner.style.display = 'none';
                    }, 300);
                }, 500);
            });
        },

        handleFormValidation: function() {
            const form = document.querySelector('.login-form');
            if (!form) return;

            const inputs = form.querySelectorAll('.form-input');
            
            inputs.forEach(input => {
                input.addEventListener('blur', () => {
                    this.validateField(input);
                    
                    if (input.id === 'signup-password') {
                        const retypeField = document.getElementById('signup-retype-password');
                        if (retypeField && retypeField.value) {
                            this.validateField(retypeField);
                        }
                    }
                });

                input.addEventListener('input', () => {
                    if (input.classList.contains('error')) {
                        this.clearError(input);
                    }
                    
                    if (input.id === 'signup-password') {
                        const retypeField = document.getElementById('signup-retype-password');
                        if (retypeField && retypeField.value) {
                            this.clearError(retypeField);
                            if (retypeField.value === input.value) {
                                this.clearError(retypeField);
                            }
                        }
                    }
                });
            });
        },

        validateField: function(field) {
            const value = field.value.trim();
            let isValid = true;

            if (field.hasAttribute('required') && !value) {
                isValid = false;
            }

            if (field.type === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                }
            }

            if (field.type === 'password' && value && value.length < 6) {
                isValid = false;
            }

            if (field.id === 'signup-retype-password' && value) {
                const passwordField = document.getElementById('signup-password');
                if (passwordField && passwordField.value && passwordField.value !== value) {
                    isValid = false;
                    const existingError = field.parentNode.querySelector('.error-message');
                    if (!existingError) {
                        const errorMsg = document.createElement('span');
                        errorMsg.className = 'error-message';
                        errorMsg.style.cssText = 'display: block; color: ' + this.getCSSVariable('--color-error') + '; font-size: 12px; margin-top: 4px; font-family: SFProDisplayRegular, sans-serif;';
                        errorMsg.textContent = 'Passwords do not match';
                        field.parentNode.appendChild(errorMsg);
                    }
                } else if (passwordField && passwordField.value === value) {
                    const existingError = field.parentNode.querySelector('.error-message');
                    if (existingError) {
                        existingError.remove();
                    }
                }
            }

            if (!isValid) {
                this.showError(field);
            } else {
                this.clearError(field);
            }

            return isValid;
        },

        showError: function(field) {
            field.classList.add('error');
            const errorColor = this.getCSSVariable('--color-error');
            field.style.borderColor = errorColor;
            
            const formGroup = field.closest('.form-group');
            const existingError = formGroup ? formGroup.querySelector('.error-message') : field.parentNode.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
            
            const errorMsg = document.createElement('span');
            errorMsg.className = 'error-message';
            errorMsg.style.cssText = `display: block; color: ${errorColor}; font-size: 12px; margin-top: 4px; font-family: SFProDisplayRegular, sans-serif;`;
            
            let message = 'This field is required';
            if (field.type === 'email' && field.value.trim()) {
                message = 'Please enter a valid email address';
            } else if (field.type === 'password' && field.value.trim()) {
                message = 'Password must be at least 6 characters';
            }
            
            errorMsg.textContent = message;
            const container = formGroup || field.parentNode;
            container.appendChild(errorMsg);
        },

        clearError: function(field) {
            field.classList.remove('error');
            field.style.borderColor = '';
            
            const formGroup = field.closest('.form-group');
            const container = formGroup || field.parentNode;
            const errorMsg = container.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.remove();
            }
        },

        handleFormSubmit: function() {
            const form = document.querySelector('.login-form');
            if (!form) return;

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const inputs = form.querySelectorAll('.form-input');
                let isValid = true;

                inputs.forEach(input => {
                    if (!this.validateField(input)) {
                        isValid = false;
                    }
                });

                if (isValid) {
                    this.submitForm(form);
                } else {
                    const firstError = form.querySelector('.form-input.error');
                    if (firstError) {
                        firstError.focus();
                        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }
            });
        },

        submitForm: function(form) {
            const submitButton = form.querySelector('.login-button');
            if (!submitButton) return;

            submitButton.classList.add('loading');
            submitButton.disabled = true;
            submitButton.textContent = '';

            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            setTimeout(() => {
                console.log('Form submitted with data:', data);
                
                submitButton.classList.remove('loading');
                submitButton.disabled = false;
                submitButton.textContent = 'Login';
                
                this.showSuccessMessage();
            }, 2000);
        },

        showSuccessMessage: function() {
            const card = document.querySelector('.login-card');
            if (!card) return;

            const form = document.querySelector('.login-form');
            const isSignup = form && form.classList.contains('signup-form');
            const messageText = isSignup ? 'Account created successfully!' : 'Login successful!';

            const successBgColor = this.getCSSVariable('--color-success');
            const successTextColor = this.getCSSVariable('--color-white');
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.style.cssText = `
                position: absolute;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: ${successBgColor};
                color: ${successTextColor};
                padding: 12px 24px;
                border-radius: 8px;
                font-family: SFProDisplayRegular, sans-serif;
                font-size: 14px;
                opacity: 0;
                animation: slideDownFadeIn 0.4s ease-out forwards;
                z-index: 1000;
            `;
            successMsg.textContent = messageText;

            if (!document.querySelector('.success-message')) {
                card.style.position = 'relative';
                card.appendChild(successMsg);

                setTimeout(() => {
                    successMsg.style.opacity = '0';
                    successMsg.style.transition = 'opacity 0.3s ease-out';
                    setTimeout(() => {
                        successMsg.remove();
                    }, 300);
                }, 3000);
            }
        },

        handleInputFocus: function() {
            const inputs = document.querySelectorAll('.form-input');
            
            inputs.forEach(input => {
                input.addEventListener('focus', function() {
                    const formGroup = this.closest('.form-group');
                    if (formGroup) {
                        formGroup.style.transform = 'scale(1.01)';
                        formGroup.style.transition = 'transform 0.2s ease-out';
                    }
                });

                input.addEventListener('blur', function() {
                    const formGroup = this.closest('.form-group');
                    if (formGroup) {
                        formGroup.style.transform = 'scale(1)';
                    }
                });
            });
        },

        handlePasswordToggle: function() {
            const toggles = document.querySelectorAll('.password-toggle');
            
            toggles.forEach(toggle => {
                toggle.addEventListener('click', function(e) {
                    e.preventDefault();
                    const wrapper = this.closest('.password-input-wrapper');
                    const input = wrapper.querySelector('.form-input');
                    const hideIcon = wrapper.querySelector('.password-icon--hide');
                    const showIcon = wrapper.querySelector('.password-icon--show');
                    
                    if (input.type === 'password') {
                        input.type = 'text';
                        if (hideIcon) hideIcon.style.display = 'none';
                        if (showIcon) showIcon.style.display = 'block';
                    } else {
                        input.type = 'password';
                        if (hideIcon) hideIcon.style.display = 'block';
                        if (showIcon) showIcon.style.display = 'none';
                    }
                });
            });
        }
    };

    window.addEventListener('load', () => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideDownFadeIn {
                from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
        AuthAnimation.init();
    });
})();

