(function() {
    'use strict';

    const Dashboard = {
        animationsInitialized: false,
        
        init: function() {
            this.initDarkMode();
            this.handleOptionButtons();
            this.handleTextarea();
            this.handleNavItems();
            this.handleButtons();
            this.handleApiKey();
            this.handleLanguageTabs();
            this.handleFileUpload();
            this.handleEmailValidation();
            this.handleIntegrations();
            this.handleBackButton();
            this.handleSeeResults();
            this.handleMobileMenu();
            this.initAnimations();
        },

        handleOptionButtons: function() {
            const optionButtons = document.querySelectorAll('.option-btn');
            const tabPanes = document.querySelectorAll('.tab-pane');
            const historyCard = document.querySelector('.history-card');
            const resultsPlaceholder = document.getElementById('results-placeholder');
            const resultsSection = document.getElementById('results-section');
            
            optionButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    const option = button.getAttribute('data-option');
                    
                    optionButtons.forEach(btn => {
                        btn.classList.remove('option-btn--active');
                        btn.style.transform = 'scale(1)';
                    });
                    
                    tabPanes.forEach(pane => {
                        pane.classList.remove('tab-pane--active');
                    });
                    
                    button.classList.add('option-btn--active');
                    button.style.transform = 'scale(0.98)';
                    
                    const targetPane = document.querySelector(`.tab-pane[data-tab="${option}"]`);
                    if (targetPane) {
                        targetPane.classList.add('tab-pane--active');
                    }
                    
                    if (historyCard) {
                        if (option === 'single-email' || option === 'api' || option === 'integrations') {
                            historyCard.style.display = 'none';
                        } else {
                            historyCard.style.display = 'block';
                        }
                    }
                    
                    if (resultsPlaceholder) {
                        if (option === 'single-email') {
                            resultsPlaceholder.style.display = 'block';
                        } else {
                            resultsPlaceholder.style.display = 'none';
                        }
                    }
                    
                    if (resultsSection) {
                        if (option === 'api') {
                            const apiKeyDisplay = document.getElementById('api-key-display');
                            if (apiKeyDisplay && apiKeyDisplay.style.display === 'flex') {
                                resultsSection.style.display = 'block';
                            } else {
                                resultsSection.style.display = 'none';
                            }
                        } else {
                            resultsSection.style.display = 'none';
                        }
                    }
                    
                    setTimeout(() => {
                        button.style.transform = 'scale(1)';
                    }, 150);
                });

                button.addEventListener('mouseenter', function() {
                    if (!this.classList.contains('option-btn--active')) {
                        this.style.transform = 'translateY(-2px)';
                    }
                });

                button.addEventListener('mouseleave', function() {
                    if (!this.classList.contains('option-btn--active')) {
                        this.style.transform = 'translateY(0)';
                    }
                });
            });
        },

        handleTextarea: function() {
            const textarea = document.getElementById('email-list-textarea');
            const dimensionLabel = document.querySelector('.dimension-label');
            
            if (!textarea) return;

            textarea.addEventListener('input', function() {
                const lines = this.value.split('\n').filter(line => line.trim() !== '');
                const charCount = this.value.length;
                
                if (dimensionLabel) {
                    dimensionLabel.textContent = `${charCount} Fill × ${lines.length}`;
                    dimensionLabel.style.opacity = '0';
                    dimensionLabel.style.transform = 'scale(0.95)';
                    
                    setTimeout(() => {
                        dimensionLabel.style.transition = 'all 0.2s ease';
                        dimensionLabel.style.opacity = '1';
                        dimensionLabel.style.transform = 'scale(1)';
                    }, 10);
                }
            });

            textarea.addEventListener('focus', function() {
                this.style.transform = 'scale(1.002)';
                
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
            });
        },

        handleNavItems: function() {
            const navItems = document.querySelectorAll('.nav-item');
            
            navItems.forEach(item => {
                item.addEventListener('mouseenter', function() {
                    if (!this.classList.contains('nav-item--active')) {
                        this.style.transform = 'translateX(4px)';
                    }
                });

                item.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateX(0)';
                });

                item.addEventListener('click', function(e) {
                    if (!this.href || this.href === '#') {
                        e.preventDefault();
                    }
                    
                    navItems.forEach(nav => nav.classList.remove('nav-item--active'));
                    this.classList.add('nav-item--active');
                    
                    this.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                    }, 150);
                });
            });
        },

        handleButtons: function() {
            const seeResultsButtons = document.querySelectorAll('.see-results-btn');
            const upgradeButton = document.querySelector('.upgrade-button');
            const darkModeToggle = document.querySelector('.dark-mode-toggle');
            
            seeResultsButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                    }, 150);
                });
            });

            if (upgradeButton) {
                upgradeButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    this.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                    }, 150);
                });
            }

            if (darkModeToggle) {
                darkModeToggle.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                    }, 150);
                    
                    Dashboard.toggleDarkMode();
                });
            }
        },

        handleBackButton: function() {
            const backButton = document.querySelector('.back-button');
            
            if (backButton) {
                backButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    window.history.back();
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
            if (this.animationsInitialized) {
                return;
            }
            
            this.animationsInitialized = true;
            
            const cards = document.querySelectorAll('.dashboard-card');
            const greeting = document.querySelector('.dashboard-greeting');
            const navItems = document.querySelectorAll('.nav-item');
            const creditCard = document.querySelector('.credit-card');
            
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

            navItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(-20px)';
                
                setTimeout(() => {
                    item.style.transition = 'all 0.3s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, 100 + (index * 50));
            });

            if (creditCard) {
                creditCard.style.opacity = '0';
                creditCard.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    creditCard.style.transition = 'all 0.5s ease';
                    creditCard.style.opacity = '1';
                    creditCard.style.transform = 'translateY(0)';
                }, 400);
            }

            const historyItems = document.querySelectorAll('.history-item');
            historyItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(-20px)';
                
                setTimeout(() => {
                    item.style.transition = 'all 0.4s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, 600 + (index * 100));
            });
        },

        handleApiKey: function() {
            const generateBtn = document.querySelector('.generate-api-btn');
            const apiKeySection = document.getElementById('api-key-section');
            const apiKeyDisplay = document.getElementById('api-key-display');
            const copyBtn = document.querySelector('.copy-api-btn');
            const apiKeyInput = document.querySelector('.api-key-input');
            const resultsSection = document.getElementById('results-section');

            if (generateBtn && apiKeySection && apiKeyDisplay) {
                const apiContent = document.querySelector('.api-content');
                generateBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    apiKeySection.style.display = 'none';
                    apiKeyDisplay.style.display = 'flex';
                    
                    if (apiContent) {
                        apiContent.classList.add('api-key-generated');
                    }
                    
                    if (resultsSection) {
                        resultsSection.style.display = 'block';
                    }
                    
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                    }, 150);
                });
            }

            if (copyBtn) {
                copyBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const apiKeyText = document.querySelector('.api-key-field .api-key-text');
                    const apiKeyValue = apiKeyText ? apiKeyText.textContent.trim() : '';
                    const copyTextSpan = this.querySelector('span');
                    
                    if (apiKeyValue && copyTextSpan) {
                        navigator.clipboard.writeText(apiKeyValue).then(() => {
                            const originalText = copyTextSpan.textContent;
                            copyTextSpan.textContent = 'Copied';
                            
                            setTimeout(() => {
                                copyTextSpan.textContent = originalText;
                            }, 2000);
                        }).catch(err => {
                            console.error('Failed to copy:', err);
                        });
                    }
                });
            }

            const copyCodeBtn = document.querySelector('.copy-code-btn');
            if (copyCodeBtn) {
                copyCodeBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const codeContent = document.querySelector('.code-content code');
                    const codeText = codeContent ? codeContent.textContent : '';
                    const copyTextSpan = this.querySelector('span');
                    
                    if (codeText && copyTextSpan) {
                        navigator.clipboard.writeText(codeText).then(() => {
                            const originalText = copyTextSpan.textContent;
                            copyTextSpan.textContent = 'Copied';
                            
                            setTimeout(() => {
                                copyTextSpan.textContent = originalText;
                            }, 2000);
                        }).catch(err => {
                            console.error('Failed to copy:', err);
                        });
                    }
                });
            }
        },

        handleLanguageTabs: function() {
            const languageTabs = document.querySelectorAll('.language-tab');
            const codeContent = document.querySelector('.code-content code');
            
            const codeSnippets = {
                nodejs: `<span class="keyword">import</span> <span class="variable">fetch</span> <span class="keyword">from</span> <span class="string">'node-fetch'</span>;
<span class="keyword">import</span> <span class="variable">createHttpsProxyAgent</span> <span class="keyword">from</span> <span class="string">'https-proxy-agent'</span>;

<span class="keyword">const</span> <span class="variable">username</span> = <span class="string">'USER'</span>;
<span class="keyword">const</span> <span class="variable">password</span> = <span class="string">'PASS'</span>;
<span class="keyword">const</span> <span class="variable">proxy</span> = <span class="string">'us1.proximy.io:1111'</span>

<span class="keyword">const</span> <span class="variable">agent</span> = <span class="function">createHttpsProxyAgent</span>(
    <span class="template-string">\`http://\${<span class="variable">username</span>}:\${<span class="variable">password</span>}@\${<span class="variable">proxy</span>}\`</span>
);

<span class="keyword">const</span> <span class="variable">response</span> = <span class="keyword">await</span> <span class="function">fetch</span>(<span class="string">'https://google.com'</span>, {
    <span class="property">method</span>: <span class="string">'get'</span>,
    <span class="property">agent</span>: <span class="variable">agent</span>,
});

<span class="variable">console</span>.<span class="function">log</span>(<span class="keyword">await</span> <span class="variable">response</span>.<span class="function">text</span>());`,
                curl: `<span class="variable">curl</span> -x <span class="string">http://USER:PASS@us1.proximy.io:1111</span> <span class="string">https://google.com</span>`,
                python: `<span class="keyword">import</span> <span class="variable">requests</span>

<span class="variable">proxies</span> = {
    <span class="string">'http'</span>: <span class="string">'http://USER:PASS@us1.proximy.io:1111'</span>,
    <span class="string">'https'</span>: <span class="string">'http://USER:PASS@us1.proximy.io:1111'</span>
}

<span class="variable">response</span> = <span class="function">requests</span>.<span class="function">get</span>(<span class="string">'https://google.com'</span>, <span class="property">proxies</span>=<span class="variable">proxies</span>)
<span class="function">print</span>(<span class="variable">response</span>.<span class="property">text</span>)`,
                php: `<span class="variable">$ch</span> = <span class="function">curl_init</span>(<span class="string">'https://google.com'</span>);
<span class="function">curl_setopt</span>(<span class="variable">$ch</span>, <span class="constant">CURLOPT_PROXY</span>, <span class="string">'us1.proximy.io:1111'</span>);
<span class="function">curl_setopt</span>(<span class="variable">$ch</span>, <span class="constant">CURLOPT_PROXYUSERPWD</span>, <span class="string">'USER:PASS'</span>);
<span class="function">curl_setopt</span>(<span class="variable">$ch</span>, <span class="constant">CURLOPT_RETURNTRANSFER</span>, <span class="constant">true</span>);
<span class="variable">$response</span> = <span class="function">curl_exec</span>(<span class="variable">$ch</span>);
<span class="function">curl_close</span>(<span class="variable">$ch</span>);
<span class="function">echo</span> <span class="variable">$response</span>;`,
                go: `<span class="keyword">package</span> <span class="variable">main</span>

<span class="keyword">import</span> (
    <span class="string">"net/http"</span>
    <span class="string">"net/url"</span>
)

<span class="keyword">func</span> <span class="function">main</span>() {
    <span class="variable">proxyURL</span>, <span class="variable">_</span> := <span class="function">url</span>.<span class="function">Parse</span>(<span class="string">"http://USER:PASS@us1.proximy.io:1111"</span>)
    <span class="variable">client</span> := &<span class="function">http</span>.<span class="function">Client</span>{
        <span class="property">Transport</span>: &<span class="function">http</span>.<span class="function">Transport</span>{
            <span class="property">Proxy</span>: <span class="function">http</span>.<span class="function">ProxyURL</span>(<span class="variable">proxyURL</span>),
        },
    }
    <span class="variable">resp</span>, <span class="variable">_</span> := <span class="variable">client</span>.<span class="function">Get</span>(<span class="string">"https://google.com"</span>)
    <span class="keyword">defer</span> <span class="variable">resp</span>.<span class="function">Body</span>.<span class="function">Close</span>()
}`,
                java: `<span class="keyword">import</span> <span class="variable">java</span>.<span class="variable">net</span>.<span class="variable">*</span>;
<span class="keyword">import</span> <span class="variable">java</span>.<span class="variable">io</span>.<span class="variable">*</span>;

<span class="keyword">public</span> <span class="keyword">class</span> <span class="variable">Main</span> {
    <span class="keyword">public</span> <span class="keyword">static</span> <span class="keyword">void</span> <span class="function">main</span>(<span class="variable">String</span>[] <span class="variable">args</span>) {
        <span class="variable">System</span>.<span class="function">setProperty</span>(<span class="string">"http.proxyHost"</span>, <span class="string">"us1.proximy.io"</span>);
        <span class="variable">System</span>.<span class="function">setProperty</span>(<span class="string">"http.proxyPort"</span>, <span class="string">"1111"</span>);
        <span class="variable">URL</span> <span class="variable">url</span> = <span class="keyword">new</span> <span class="function">URL</span>(<span class="string">"https://google.com"</span>);
        <span class="variable">HttpURLConnection</span> <span class="variable">conn</span> = (<span class="variable">HttpURLConnection</span>) <span class="variable">url</span>.<span class="function">openConnection</span>();
    }
}`,
                csharp: `<span class="keyword">using</span> <span class="variable">System</span>.<span class="variable">Net</span>;

<span class="keyword">var</span> <span class="variable">proxy</span> = <span class="keyword">new</span> <span class="function">WebProxy</span>(<span class="string">"http://us1.proximy.io:1111"</span>)
{
    <span class="property">Credentials</span> = <span class="keyword">new</span> <span class="function">NetworkCredential</span>(<span class="string">"USER"</span>, <span class="string">"PASS"</span>)
};

<span class="keyword">var</span> <span class="variable">handler</span> = <span class="keyword">new</span> <span class="function">HttpClientHandler</span>()
{
    <span class="property">Proxy</span> = <span class="variable">proxy</span>
};

<span class="keyword">var</span> <span class="variable">client</span> = <span class="keyword">new</span> <span class="function">HttpClient</span>(<span class="variable">handler</span>);
<span class="keyword">var</span> <span class="variable">response</span> = <span class="keyword">await</span> <span class="variable">client</span>.<span class="function">GetAsync</span>(<span class="string">"https://google.com"</span>);
<span class="keyword">var</span> <span class="variable">content</span> = <span class="keyword">await</span> <span class="variable">response</span>.<span class="function">Content</span>.<span class="function">ReadAsStringAsync</span>();`
            };
            
            languageTabs.forEach(tab => {
                tab.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    languageTabs.forEach(t => {
                        t.classList.remove('language-tab--active');
                    });
                    
                    this.classList.add('language-tab--active');
                    
                    const lang = this.getAttribute('data-lang');
                    
                    if (codeContent && codeSnippets[lang]) {
                        codeContent.innerHTML = codeSnippets[lang];
                    }
                    
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                    }, 150);
                });
            });
        },

        handleFileUpload: function() {
            const uploadArea = document.querySelector('.upload-area');
            const selectFileBtn = document.querySelector('.select-file-btn');
            const selectedFileName = document.querySelector('.selected-file-name');
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = '.txt,.csv,.xlsx';
            fileInput.style.display = 'none';
            document.body.appendChild(fileInput);

            const displayFileName = function(file) {
                if (selectedFileName && file) {
                    selectedFileName.textContent = file.name;
                    selectedFileName.style.display = 'block';
                }
            };

            if (uploadArea) {
                uploadArea.addEventListener('dragover', function(e) {
                    e.preventDefault();
                    this.style.borderColor = 'var(--color-icon-primary)';
                    this.style.background = '#FFF7ED';
                });

                uploadArea.addEventListener('dragleave', function(e) {
                    e.preventDefault();
                    this.style.borderColor = 'var(--color-border)';
                    this.style.background = 'var(--color-bg-light)';
                });

                uploadArea.addEventListener('drop', function(e) {
                    e.preventDefault();
                    this.style.borderColor = 'var(--color-border)';
                    this.style.background = 'var(--color-bg-light)';
                    
                    const files = e.dataTransfer.files;
                    if (files.length > 0) {
                        displayFileName(files[0]);
                        console.log('Files dropped:', files);
                    }
                });
            }

            if (selectFileBtn) {
                selectFileBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    fileInput.click();
                    
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                    }, 150);
                });
            }

            fileInput.addEventListener('change', function(e) {
                const files = e.target.files;
                if (files.length > 0) {
                    displayFileName(files[0]);
                    console.log('Files selected:', files);
                }
            });
        },

        handleEmailValidation: function() {
            const validateBtn = document.querySelector('.validate-email-btn');
            const emailInput = document.querySelector('.single-email-input');
            const recentLinks = document.querySelectorAll('.recent-email-link');

            if (validateBtn && emailInput) {
                validateBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const email = emailInput.value.trim();
                    if (email && email.includes('@')) {
                        console.log('Validating email:', email);
                        
                        this.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                            this.style.transform = 'scale(1)';
                        }, 150);
                    } else {
                        emailInput.style.borderColor = 'var(--color-error)';
                        setTimeout(() => {
                            emailInput.style.borderColor = '';
                        }, 2000);
                    }
                });
            }

            recentLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    if (emailInput) {
                        emailInput.value = this.textContent;
                        emailInput.focus();
                    }
                });
            });
        },

        handleIntegrations: function() {
            const connectButtons = document.querySelectorAll('.connect-btn');
            
            connectButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const card = this.closest('.integration-card');
                    if (card) {
                        card.style.borderColor = 'var(--color-icon-primary)';
                        card.style.borderWidth = '2px';
                        
                        const originalText = this.querySelector('span').textContent;
                        this.querySelector('span').textContent = 'Connected';
                        this.style.background = '#FFF7ED';
                        this.style.borderColor = 'var(--color-icon-primary)';
                        
                        setTimeout(() => {
                            this.querySelector('span').textContent = originalText;
                            this.style.background = '';
                            this.style.borderColor = '';
                            card.style.borderWidth = '';
                        }, 2000);
                    }
                    
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                    }, 150);
                });
            });
        },

        toggleDarkMode: function() {
            const body = document.body;
            const isDarkMode = body.classList.toggle('dark-mode');
            
            // Save preference to localStorage
            localStorage.setItem('darkMode', isDarkMode);
            
            // Update toggle switch position
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

        initDarkMode: function() {
            // Check localStorage for saved preference
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
        document.addEventListener('DOMContentLoaded', function() {
            Dashboard.init();
        });
    } else {
        Dashboard.init();
    }

    window.addEventListener('load', function() {
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            const width = progressFill.style.width;
            progressFill.style.width = '0%';
            
            setTimeout(() => {
                progressFill.style.transition = 'width 1s ease';
                progressFill.style.width = width;
            }, 500);
        }
    });
})();

