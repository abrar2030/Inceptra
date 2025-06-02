// Modern Portfolio Script
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Initialize page loader
    initPageLoader();
    
    // Initialize custom cursor
    initCustomCursor();
    
    // Initialize theme toggle
    initThemeToggle();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize skill tabs and progress bars
    initSkillsSection();
    
    // Initialize projects filter
    initProjectsFilter();
    
    // Initialize testimonials slider
    initTestimonialsSlider();
    
    // Initialize contact form validation
    initContactForm();
    
    // Initialize project modal
    initProjectModal();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize particles.js for hero section
    initParticles();
    
    // Initialize typing effect
    initTypingEffect();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize stats counter
    initStatsCounter();
    
    // Skills chart initialization removed as per user request
    
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// Page Loader
function initPageLoader() {
    const loader = document.querySelector('.page-loader');
    const loaderProgress = document.querySelector('.loader-progress');
    
    if (!loader || !loaderProgress) return;
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 100) progress = 100;
        
        loaderProgress.style.width = `${progress}%`;
        
        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';
                
                // Trigger entrance animations after loader is hidden
                document.querySelectorAll('.hero .intro-text > *').forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add('fade-in');
                    }, 300 + (index * 200));
                });
                
                document.querySelector('.hero-3d-element').classList.add('scale-in');
            }, 500);
        }
    }, 200);
}

// Custom Cursor
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    // Only enable custom cursor on desktop
    if (window.innerWidth > 992) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.opacity = '1';
            cursorFollower.style.opacity = '1';
            
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        });
        
        // Cursor hover effect for links and buttons
        const links = document.querySelectorAll('a, button, .project-card, .skill-item, .education-item, .contact-card');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                cursor.style.width = '60px';
                cursor.style.height = '60px';
                cursor.style.borderColor = 'var(--accent-color)';
                cursorFollower.style.width = '4px';
                cursorFollower.style.height = '4px';
            });
            
            link.addEventListener('mouseleave', () => {
                cursor.style.width = '40px';
                cursor.style.height = '40px';
                cursor.style.borderColor = 'var(--cursor-color)';
                cursorFollower.style.width = '8px';
                cursorFollower.style.height = '8px';
            });
        });
        
        // Hide cursor when leaving window
        document.addEventListener('mouseout', (e) => {
            if (e.relatedTarget === null) {
                cursor.style.opacity = '0';
                cursorFollower.style.opacity = '0';
            }
        });
    }
}

// Theme Toggle
function initThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
    
    if (!themeToggleBtn || !themeIcon) return;
    
    // Check for saved theme preference or use device preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.setAttribute('name', 'sun');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.setAttribute('name', 'moon');
    }
    
    // Toggle theme on button click
    themeToggleBtn.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon
        themeIcon.setAttribute('name', newTheme === 'dark' ? 'sun' : 'moon');
    });
}

// Mobile Menu
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    
    if (!mobileMenuBtn || !mobileMenu) return;
    
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking on a nav item
    mobileNavItems.forEach(item => {
        item.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeElements = document.querySelectorAll('.about-content, .skills-container, .experience-item, .education-item, .project-card, .blog-post, .testimonial-item, .contact-card, .contact-form-container');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
    
    // Progress bar for scrolling
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollProgress = (scrollTop / scrollHeight) * 100;
            
            progressBar.style.width = `${scrollProgress}%`;
        });
    }
}

// Skills Section
function initSkillsSection() {
    const skillTabs = document.querySelectorAll('.skill-tab');
    const skillCategories = document.querySelectorAll('.skill-category');
    const skillProgress = document.querySelectorAll('.skill-progress');
    
    if (!skillTabs.length || !skillCategories.length) return;
    
    // Tab switching
    skillTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const target = this.getAttribute('data-tab');
            
            // Update active tab
            skillTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding category
            skillCategories.forEach(category => {
                category.classList.remove('active');
                if (category.id === target) {
                    category.classList.add('active');
                }
            });
        });
    });
    
    // Animate skill progress bars when they come into view
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = `${progress}%`;
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillProgress.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// Projects Filter
function initProjectsFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!filterBtns.length || !projectCards.length) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Testimonials Slider
function initTestimonialsSlider() {
    const track = document.querySelector('.testimonials-track');
    const items = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.testimonial-dot');
    const prevBtn = document.querySelector('.testimonial-arrow.prev');
    const nextBtn = document.querySelector('.testimonial-arrow.next');
    
    if (!track || !items.length) return;
    
    let currentIndex = 0;
    const itemWidth = 100; // 100%
    
    // Update slider position
    function updateSlider() {
        track.style.transform = `translateX(-${currentIndex * itemWidth}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Event listeners for controls
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
            updateSlider();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
            updateSlider();
        });
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
        });
    });
    
    // Auto slide
    let interval = setInterval(() => {
        currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
        updateSlider();
    }, 5000);
    
    // Pause auto slide on hover
    track.addEventListener('mouseenter', () => {
        clearInterval(interval);
    });
    
    track.addEventListener('mouseleave', () => {
        interval = setInterval(() => {
            currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
            updateSlider();
        }, 5000);
    });
}

// Contact Form Validation
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Reset error messages
        document.querySelectorAll('.error-message').forEach(error => {
            error.style.display = 'none';
        });
        
        // Validate fields
        let isValid = true;
        
        if (!name) {
            document.getElementById('name-error').textContent = 'Please enter your name';
            document.getElementById('name-error').style.display = 'block';
            isValid = false;
        }
        
        if (!email) {
            document.getElementById('email-error').textContent = 'Please enter your email';
            document.getElementById('email-error').style.display = 'block';
            isValid = false;
        } else if (!isValidEmail(email)) {
            document.getElementById('email-error').textContent = 'Please enter a valid email address';
            document.getElementById('email-error').style.display = 'block';
            isValid = false;
        }
        
        if (!subject) {
            document.getElementById('subject-error').textContent = 'Please enter a subject';
            document.getElementById('subject-error').style.display = 'block';
            isValid = false;
        }
        
        if (!message) {
            document.getElementById('message-error').textContent = 'Please enter your message';
            document.getElementById('message-error').style.display = 'block';
            isValid = false;
        }
        
        if (isValid) {
            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoader = submitBtn.querySelector('.btn-loader');
            
            btnText.style.display = 'none';
            btnLoader.style.display = 'block';
            
            // Simulate form submission (replace with actual form submission)
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Show success message
                alert('Thank you for your message! I will get back to you soon.');
                
                // Reset button state
                btnText.style.display = 'block';
                btnLoader.style.display = 'none';
            }, 1500);
        }
    });
    
    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Project Modal
function initProjectModal() {
    const modal = document.querySelector('.project-modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalClose = document.querySelector('.modal-close');
    const modalBody = document.querySelector('.modal-body');
    const viewButtons = document.querySelectorAll('.view-project-btn');
    
    if (!modal || !modalBody) return;
    
    // Project details data
    const projectDetails = {
        finovabank: {
            title: 'FinovaBank - Digital Banking Platform',
            description: `
                <div class="modal-project-header">
                    <img src="assets/images/finovabank.jpg" alt="FinovaBank" class="modal-project-image">
                </div>
                <div class="modal-project-content">
                    <h3>Project Overview</h3>
                    <p>FinovaBank is a comprehensive digital banking platform designed to provide users with a secure, intuitive, and feature-rich banking experience. The platform includes advanced security features, real-time transaction processing, and AI-powered financial insights.</p>
                    
                    <h3>Key Features</h3>
                    <ul>
                        <li>Secure authentication system with biometric verification</li>
                        <li>Real-time transaction processing and notifications</li>
                        <li>AI-powered financial insights and spending analysis</li>
                        <li>Bill payment and recurring transaction management</li>
                        <li>Investment portfolio tracking and recommendations</li>
                    </ul>
                    
                    <h3>Technologies Used</h3>
                    <div class="modal-tech-stack">
                        <span class="tech-tag">Angular</span>
                        <span class="tech-tag">Java Spring</span>
                        <span class="tech-tag">PostgreSQL</span>
                        <span class="tech-tag">Kubernetes</span>
                        <span class="tech-tag">Docker</span>
                        <span class="tech-tag">Redis</span>
                        <span class="tech-tag">JWT</span>
                    </div>
                    
                    <h3>My Role</h3>
                    <p>As the lead software engineer, I was responsible for designing the system architecture, implementing core banking features, and ensuring the security and performance of the platform. I worked closely with the UX team to create an intuitive user interface and with the data science team to integrate AI-powered insights.</p>
                    
                    <div class="modal-project-links">
                        <a href="https://github.com/abrar2030/FinovaBank" target="_blank" class="modal-project-link">
                            <i data-lucide="github"></i> View on GitHub
                        </a>
                        <a href="#" target="_blank" class="modal-project-link">
                            <i data-lucide="external-link"></i> Visit Website
                        </a>
                    </div>
                </div>
            `
        },
        blockguardian: {
            title: 'BlockGuardian - Blockchain Security Platform',
            description: `
                <div class="modal-project-header">
                    <img src="assets/images/blockguardian.jpg" alt="BlockGuardian" class="modal-project-image">
                </div>
                <div class="modal-project-content">
                    <h3>Project Overview</h3>
                    <p>BlockGuardian is a blockchain security platform that monitors transactions, detects anomalies, and provides real-time alerts for suspicious activities. The platform helps cryptocurrency users and businesses protect their digital assets from fraud and security threats.</p>
                    
                    <h3>Key Features</h3>
                    <ul>
                        <li>Real-time blockchain transaction monitoring</li>
                        <li>Advanced anomaly detection using machine learning</li>
                        <li>Customizable security rules and alerts</li>
                        <li>Comprehensive dashboard with visualization tools</li>
                        <li>Integration with major cryptocurrency wallets and exchanges</li>
                    </ul>
                    
                    <h3>Technologies Used</h3>
                    <div class="modal-tech-stack">
                        <span class="tech-tag">React</span>
                        <span class="tech-tag">Node.js</span>
                        <span class="tech-tag">Solidity</span>
                        <span class="tech-tag">Web3.js</span>
                        <span class="tech-tag">MongoDB</span>
                        <span class="tech-tag">TensorFlow</span>
                        <span class="tech-tag">D3.js</span>
                    </div>
                    
                    <h3>My Role</h3>
                    <p>As a frontend developer, I was responsible for building the user interface and data visualization components. I implemented real-time data updates using WebSockets, created interactive charts for transaction analysis, and developed the security alert system. I also collaborated with the blockchain team to integrate Web3.js for wallet connections.</p>
                    
                    <div class="modal-project-links">
                        <a href="https://github.com/abrar2030/BlockGuardian" target="_blank" class="modal-project-link">
                            <i data-lucide="github"></i> View on GitHub
                        </a>
                        <a href="#" target="_blank" class="modal-project-link">
                            <i data-lucide="external-link"></i> Visit Website
                        </a>
                    </div>
                </div>
            `
        },
        carbonxchange: {
            title: 'CarbonXchange - Carbon Credit Trading Platform',
            description: `
                <div class="modal-project-header">
                    <img src="assets/images/carbonxchange.jpg" alt="CarbonXchange" class="modal-project-image">
                </div>
                <div class="modal-project-content">
                    <h3>Project Overview</h3>
                    <p>CarbonXchange is a carbon credit trading platform that connects businesses and individuals to offset their carbon footprint through verified environmental projects. The platform provides transparency, traceability, and verification for carbon credit transactions.</p>
                    
                    <h3>Key Features</h3>
                    <ul>
                        <li>Marketplace for buying and selling carbon credits</li>
                        <li>Carbon footprint calculator for individuals and businesses</li>
                        <li>Verification system for environmental projects</li>
                        <li>Interactive data visualization for impact metrics</li>
                        <li>Automated reporting for regulatory compliance</li>
                    </ul>
                    
                    <h3>Technologies Used</h3>
                    <div class="modal-tech-stack">
                        <span class="tech-tag">Vue.js</span>
                        <span class="tech-tag">Express</span>
                        <span class="tech-tag">PostgreSQL</span>
                        <span class="tech-tag">D3.js</span>
                        <span class="tech-tag">Node.js</span>
                        <span class="tech-tag">AWS</span>
                    </div>
                    
                    <h3>My Role</h3>
                    <p>As a full stack developer intern, I contributed to both frontend and backend development. I implemented the carbon footprint calculator, created data visualization components for environmental impact metrics, and assisted in database design and optimization. I also participated in Agile development processes and daily stand-ups.</p>
                    
                    <div class="modal-project-links">
                        <a href="https://github.com/abrar2030/CarbonXchange" target="_blank" class="modal-project-link">
                            <i data-lucide="github"></i> View on GitHub
                        </a>
                        <a href="#" target="_blank" class="modal-project-link">
                            <i data-lucide="external-link"></i> Visit Website
                        </a>
                    </div>
                </div>
            `
        },
        alphamind: {
            title: 'AlphaMind - AI-Powered Learning Platform',
            description: `
                <div class="modal-project-header">
                    <img src="assets/images/alphamind.jpg" alt="AlphaMind" class="modal-project-image">
                </div>
                <div class="modal-project-content">
                    <h3>Project Overview</h3>
                    <p>AlphaMind is an AI-powered learning platform that adapts to individual learning styles and provides personalized educational content. The platform uses machine learning algorithms to analyze user behavior and optimize the learning experience.</p>
                    
                    <h3>Key Features</h3>
                    <ul>
                        <li>Personalized learning paths based on user preferences and performance</li>
                        <li>Adaptive quizzes and assessments</li>
                        <li>Content recommendation engine</li>
                        <li>Progress tracking and analytics</li>
                        <li>Collaborative learning tools and community features</li>
                    </ul>
                    
                    <h3>Technologies Used</h3>
                    <div class="modal-tech-stack">
                        <span class="tech-tag">Python</span>
                        <span class="tech-tag">TensorFlow</span>
                        <span class="tech-tag">React</span>
                        <span class="tech-tag">FastAPI</span>
                        <span class="tech-tag">PostgreSQL</span>
                        <span class="tech-tag">Redis</span>
                    </div>
                    
                    <h3>My Role</h3>
                    <p>I led the development of the recommendation engine using TensorFlow and collaborated with data scientists to implement the adaptive learning algorithms. I also built the API layer using FastAPI and integrated it with the React frontend. The project required extensive work with machine learning models and data processing pipelines.</p>
                    
                    <div class="modal-project-links">
                        <a href="https://github.com/abrar2030/AlphaMind" target="_blank" class="modal-project-link">
                            <i data-lucide="github"></i> View on GitHub
                        </a>
                        <a href="#" target="_blank" class="modal-project-link">
                            <i data-lucide="external-link"></i> Visit Website
                        </a>
                    </div>
                </div>
            `
        },
        fluxora: {
            title: 'Fluxora - Mobile Productivity App',
            description: `
                <div class="modal-project-header">
                    <img src="assets/images/fluxora.jpg" alt="Fluxora" class="modal-project-image">
                </div>
                <div class="modal-project-content">
                    <h3>Project Overview</h3>
                    <p>Fluxora is a mobile productivity app that helps users manage tasks, track habits, and improve focus through gamification techniques. The app combines task management with habit tracking and focus tools to create a comprehensive productivity solution.</p>
                    
                    <h3>Key Features</h3>
                    <ul>
                        <li>Task management with priority levels and deadlines</li>
                        <li>Habit tracking with streaks and statistics</li>
                        <li>Pomodoro timer with customizable work/break intervals</li>
                        <li>Gamification elements (points, levels, achievements)</li>
                        <li>Data visualization for productivity insights</li>
                    </ul>
                    
                    <h3>Technologies Used</h3>
                    <div class="modal-tech-stack">
                        <span class="tech-tag">React Native</span>
                        <span class="tech-tag">Firebase</span>
                        <span class="tech-tag">Redux</span>
                        <span class="tech-tag">Expo</span>
                        <span class="tech-tag">Node.js</span>
                    </div>
                    
                    <h3>My Role</h3>
                    <p>I designed and developed the mobile app using React Native and Expo, implemented the state management system with Redux, and integrated Firebase for authentication and data storage. I also created the gamification system and designed the UI/UX with a focus on user engagement and retention.</p>
                    
                    <div class="modal-project-links">
                        <a href="https://github.com/abrar2030/Fluxora" target="_blank" class="modal-project-link">
                            <i data-lucide="github"></i> View on GitHub
                        </a>
                        <a href="#" target="_blank" class="modal-project-link">
                            <i data-lucide="external-link"></i> Visit App Store
                        </a>
                    </div>
                </div>
            `
        },
        finflow: {
            title: 'FinFlow - Financial Management Dashboard',
            description: `
                <div class="modal-project-header">
                    <img src="assets/images/finflow.jpg" alt="FinFlow" class="modal-project-image">
                </div>
                <div class="modal-project-content">
                    <h3>Project Overview</h3>
                    <p>FinFlow is a financial management dashboard that visualizes spending patterns, predicts future expenses, and provides budget recommendations. The platform helps users gain insights into their financial behavior and make informed decisions.</p>
                    
                    <h3>Key Features</h3>
                    <ul>
                        <li>Expense tracking and categorization</li>
                        <li>Interactive charts and graphs for financial analysis</li>
                        <li>Budget planning and monitoring</li>
                        <li>Predictive analytics for future expenses</li>
                        <li>Personalized financial recommendations</li>
                    </ul>
                    
                    <h3>Technologies Used</h3>
                    <div class="modal-tech-stack">
                        <span class="tech-tag">React</span>
                        <span class="tech-tag">Node.js</span>
                        <span class="tech-tag">MongoDB</span>
                        <span class="tech-tag">Chart.js</span>
                        <span class="tech-tag">Express</span>
                        <span class="tech-tag">Plaid API</span>
                    </div>
                    
                    <h3>My Role</h3>
                    <p>I developed the frontend interface using React and implemented the data visualization components with Chart.js. I also built the backend API with Node.js and Express, integrated the Plaid API for bank account connections, and designed the database schema in MongoDB. The project required extensive work with financial data processing and visualization.</p>
                    
                    <div class="modal-project-links">
                        <a href="https://github.com/abrar2030/FinFlow" target="_blank" class="modal-project-link">
                            <i data-lucide="github"></i> View on GitHub
                        </a>
                        <a href="#" target="_blank" class="modal-project-link">
                            <i data-lucide="external-link"></i> Visit Website
                        </a>
                    </div>
                </div>
            `
        }
    };
    
    // Open modal with project details
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const project = projectDetails[projectId];
            
            if (project) {
                document.querySelector('.modal-title').textContent = project.title;
                modalBody.innerHTML = project.description;
                
                // Initialize Lucide icons in modal content
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
                
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                
                // Animate modal entrance
                setTimeout(() => {
                    modalOverlay.style.opacity = '1';
                    document.querySelector('.modal-container').style.opacity = '1';
                    document.querySelector('.modal-container').style.transform = 'translate(-50%, -50%) scale(1)';
                }, 10);
            }
        });
    });
    
    // Close modal
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }
    
    function closeModal() {
        modalOverlay.style.opacity = '0';
        document.querySelector('.modal-container').style.opacity = '0';
        document.querySelector('.modal-container').style.transform = 'translate(-50%, -50%) scale(0.9)';
        
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top-btn');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.parentElement.classList.add('visible');
        } else {
            backToTopBtn.parentElement.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Particles.js
function initParticles() {
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 50,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#3cb371'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#3cb371',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Typing Effect
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    
    if (!typingElement) return;
    
    const phrases = [
        'Software Engineer',
        'Frontend Developer',
        'Backend Developer',
        'Full Stack Developer',
        'UI/UX Enthusiast'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 1000; // Pause at end of phrase
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before starting new phrase
        }
        
        setTimeout(type, typingSpeed);
    }
    
    setTimeout(type, 1000);
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Stats Counter
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (!statNumbers.length) return;
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = parseInt(target.getAttribute('data-count'));
                let count = 0;
                const interval = setInterval(() => {
                    if (count < countTo) {
                        count++;
                        target.textContent = count;
                    } else {
                        clearInterval(interval);
                    }
                }, 2000 / countTo);
                
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Skills Chart function removed as per user request

// Project links data
const projectLinks = {
    'FinovaBank': 'https://github.com/abrar2030/FinovaBank',
    'BlockGuardian': 'https://github.com/abrar2030/BlockGuardian',
    'CarbonXchange': 'https://github.com/abrar2030/CarbonXchange',
    'AlphaMind': 'https://github.com/abrar2030/AlphaMind',
    'Fluxora': 'https://github.com/abrar2030/Fluxora',
    'FinFlow': 'https://github.com/abrar2030/FinFlow'
};

// Social media links
const socialLinks = {
    'github': 'https://github.com/abrar2030',
    'instagram': 'https://www.instagram.com/abrar2o3o/',
    'linkedin': 'https://www.linkedin.com/in/abrar2030/',
    'facebook': 'https://www.facebook.com/abrar2O3O',
    'email': 'mailto:abrarahmedpei@gmail.com'
};
