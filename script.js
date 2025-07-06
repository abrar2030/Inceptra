// Combine script files
document.addEventListener('DOMContentLoaded', function() {
    // Include social-links.js functionality
    const projectLinks = {
        'FinovaBank': 'https://github.com/abrar2030/FinovaBank',
        'LendSmart': 'https://github.com/abrar2030/LendSmart',
        'PayNext': 'https://github.com/abrar2030/PayNext',
        'BlockGuardian': 'https://github.com/abrar2030/BlockGuardian',
        'BlockScore': 'https://github.com/abrar2030/BlockScore',
        'CarbonXchange': 'https://github.com/abrar2030/CarbonXchange',
        'FinFlow': 'https://github.com/abrar2030/FinFlow',
        'AlphaMind': 'https://github.com/abrar2030/AlphaMind',
        'Fluxora': 'https://github.com/abrar2030/Fluxora'
    };
    
    // Update project card links
    document.querySelectorAll('.project-card').forEach(card => {
        const projectTitle = card.querySelector('h3').textContent;
        const githubLink = card.querySelector('.project-links a:last-child');
        const externalLink = card.querySelector('.project-links a:first-child');
        
        if (projectLinks[projectTitle]) {
            githubLink.href = projectLinks[projectTitle];
            externalLink.href = projectLinks[projectTitle];
        }
    });
    
    // Social media links
    const socialLinks = {
        'github': 'https://github.com/abrar2030',
        'instagram': 'https://www.instagram.com/abrar2o3o/',
        'linkedin': 'https://www.linkedin.com/in/abrar2030/',
        'email': 'mailto:abrarahmedpei@gmail.com'
    };
    
    // Update social links in header
    document.querySelectorAll('.social-links a').forEach(link => {
        const icon = link.querySelector('i');
        if (icon) {
            const iconName = icon.getAttribute('data-lucide');
            if (socialLinks[iconName]) {
                link.href = socialLinks[iconName];
            }
        }
    });
    
    // Update contact section links
    document.querySelectorAll('.contact-card').forEach(card => {
        const title = card.querySelector('h4').textContent.toLowerCase();
        const link = card.querySelector('a');
        
        if (title.includes('github') && socialLinks['github']) {
            link.href = socialLinks['github'];
        } else if (title.includes('instagram') && socialLinks['instagram']) {
            link.href = socialLinks['instagram'];
        } else if (title.includes('linkedin') && socialLinks['linkedin']) {
            link.href = socialLinks['linkedin'];
        } else if (title.includes('facebook') && socialLinks['facebook']) {
            link.href = socialLinks['facebook'] || 'https://www.facebook.com/abrar2O3O';
        }
    });
    
    // Update email in contact form
    const emailLink = document.querySelector('.email-sidebar a');
    if (emailLink && socialLinks['email']) {
        emailLink.href = socialLinks['email'];
        emailLink.textContent = socialLinks['email'].replace('mailto:', '');
    }
    
    // Update resume link
    const resumeLink = document.querySelector('.resume-link');
    if (resumeLink) {
        resumeLink.href = '#'; // Update with actual resume link when available
    }

    // Theme toggle functionality
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = themeToggleBtn.querySelector('i');
    
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
    
    // Initialize Lucide icons
    lucide.createIcons();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Simulate form submission
            alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
            this.reset();
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections for scroll animations
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Add animation classes to elements
    document.querySelectorAll('.project-card, .education-item, .contact-card').forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });

    // Skills Section Functionality
    const skillTabs = document.querySelectorAll('.skill-tab');
    const skillCategories = document.querySelectorAll('.skill-category');
    const skillProgress = document.querySelectorAll('.skill-progress');
    
    if (skillTabs.length > 0 && skillCategories.length > 0) {
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

    // Testimonials Slider Functionality
    const testimonialsTrack = document.querySelector('.testimonials-track');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const prevBtn = document.querySelector('.testimonial-arrow.prev');
    const nextBtn = document.querySelector('.testimonial-arrow.next');
    const dots = document.querySelectorAll('.testimonial-dot');
    
    if (testimonialsTrack && testimonialItems.length > 0) {
        let currentIndex = 0;
        const totalItems = testimonialItems.length;
        
        function updateSlider() {
            const translateX = -currentIndex * 100;
            testimonialsTrack.style.transform = `translateX(${translateX}%)`;
            
            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
            
            // Update arrow states
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === totalItems - 1;
        }
        
        function nextTestimonial() {
            if (currentIndex < totalItems - 1) {
                currentIndex++;
                updateSlider();
            }
        }
        
        function prevTestimonial() {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        }
        
        function goToTestimonial(index) {
            currentIndex = index;
            updateSlider();
        }
        
        // Event listeners
        nextBtn.addEventListener('click', nextTestimonial);
        prevBtn.addEventListener('click', prevTestimonial);
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => goToTestimonial(index));
        });
        
        // Auto-play functionality (optional)
        let autoPlayInterval;
        
        function startAutoPlay() {
            autoPlayInterval = setInterval(() => {
                if (currentIndex < totalItems - 1) {
                    nextTestimonial();
                } else {
                    currentIndex = 0;
                    updateSlider();
                }
            }, 5000); // Change slide every 5 seconds
        }
        
        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }
        
        // Start auto-play
        startAutoPlay();
        
        // Pause auto-play on hover
        const testimonialsSlider = document.querySelector('.testimonials-slider');
        testimonialsSlider.addEventListener('mouseenter', stopAutoPlay);
        testimonialsSlider.addEventListener('mouseleave', startAutoPlay);
        
        // Initialize slider
        updateSlider();
        
        // Add testimonials to fade-in animation
        document.querySelectorAll('.testimonial-item').forEach(element => {
            element.classList.add('fade-in');
            observer.observe(element);
        });
    }
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }
    
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Particles.js
function initParticles() {
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#3cb371', '#2e8b57', '#4cd98e', '#228b22', '#32cd32']  // Green colors
                },
                shape: {
                    type: ['circle', 'triangle', 'polygon'],
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                    polygon: {
                        nb_sides: 6  // Hexagon shape
                    },
                    image: {
                        src: 'img/github.svg',
                        width: 100,
                        height: 100
                    }
                },
                opacity: {
                    value: 0.6,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 4,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 30,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#3cb371',  // Green
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2.5,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: true,
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
                        distance: 180,
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
        'Financial Engineer',
        'Quantitative Analyst',
        'Risk Management Specialist',
        'Algorithmic Trader',
        'Financial Data Scientist'
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

// Initialize particles and typing effect when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    initTypingEffect();
    
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

