// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const moonIcon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
    if (savedTheme === 'dark-mode') {
        moonIcon.classList.remove('fa-moon');
        moonIcon.classList.add('fa-sun');
    }
}

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        moonIcon.classList.remove('fa-moon');
        moonIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark-mode');
    } else {
        moonIcon.classList.remove('fa-sun');
        moonIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light-mode');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active section highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

const observerOptions = {
    threshold: 0.3
};

const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const currentId = entry.target.id;
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

// Contact Form Validation and Submission
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Basic form validation
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Here you would typically send the form data to a server
    // For demonstration, we'll just log it and show a success message
    console.log({
        name,
        email,
        message
    });
    
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// Fade-in animation for sections
const fadeElements = document.querySelectorAll('.about, .experience, .projects, .contact');

const fadeObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeObserverCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
};

const fadeObserver = new IntersectionObserver(fadeObserverCallback, fadeObserverOptions);
fadeElements.forEach(element => fadeObserver.observe(element));

// Progressive image loading
const projectImages = document.querySelectorAll('.project-image img');

projectImages.forEach(img => {
    img.addEventListener('load', () => {
        img.classList.add('loaded');
    });
});

// Mobile navigation toggle (if needed)
const createMobileNav = () => {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    
    const toggleButton = document.createElement('button');
    toggleButton.classList.add('mobile-nav-toggle');
    toggleButton.innerHTML = '<i class="fas fa-bars"></i>';
    
    toggleButton.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        const icon = toggleButton.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
    
    if (window.innerWidth <= 768) {
        navbar.insertBefore(toggleButton, navbar.querySelector('#theme-toggle'));
    }
};

// Initialize mobile navigation
window.addEventListener('load', createMobileNav);
window.addEventListener('resize', () => {
    const existingToggle = document.querySelector('.mobile-nav-toggle');
    if (window.innerWidth <= 768 && !existingToggle) {
        createMobileNav();
    } else if (window.innerWidth > 768 && existingToggle) {
        existingToggle.remove();
    }
});