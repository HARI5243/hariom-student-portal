const openDashboard = document.getElementById("openDashboard");
const openResources = document.getElementById("openResources");
const openHome = document.getElementById("openHome");
const welcomeOverlay = document.getElementById("welcomeOverlay");
const themeToggle = document.getElementById("themeToggle");
const cgpaForm = document.getElementById("cgpaForm");
const marks1 = document.getElementById("marks1");
const marks2 = document.getElementById("marks2");
const marks3 = document.getElementById("marks3");
const calculatorMessage = document.getElementById("calculatorMessage");
const contactForm = document.getElementById("contactForm");
const contactFeedback = document.getElementById("contactFeedback");
const contactName = document.getElementById("contactName");
const contactEmail = document.getElementById("contactEmail");
const contactMessage = document.getElementById("contactMessage");

// ==================== Progress Bar ====================
function initProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scroll = window.scrollY;
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scroll / height) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// ==================== Counter Animation ====================
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseFloat(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = current.toFixed(1);
        }
    }, 30);
}

// ==================== Fade In On Scroll ====================
function initScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => observer.observe(element));
}

// ==================== Back to Top Button ====================
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ==================== Theme Toggle ====================
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
}

openDashboard.addEventListener("click", () => {
    document.querySelector("#dashboard").scrollIntoView({ behavior: "smooth" });
    closeMobileMenu();
});

openResources.addEventListener("click", () => {
    document.querySelector("#resources").scrollIntoView({ behavior: "smooth" });
    closeMobileMenu();
});

openHome?.addEventListener("click", () => {
    if (welcomeOverlay) welcomeOverlay.classList.add("hidden");
    document.body.classList.remove("welcome-open");
    document.querySelector("#home").scrollIntoView({ behavior: "smooth" });
});

window.addEventListener("load", () => {
    document.body.classList.add("welcome-open");
});

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
});

// ==================== Mobile Menu Toggle ====================
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mainNav = document.getElementById('mainNav');

menuToggle?.addEventListener('click', () => {
    if (mobileMenu) mobileMenu.classList.toggle('hidden');
});

function closeMobileMenu() {
    if (mobileMenu) mobileMenu.classList.add('hidden');
}

// ==================== Active Link Highlight ====================
const navLinks = document.querySelectorAll('.nav-link');
const sections = Array.from(document.querySelectorAll('main section'));

function setActiveLink() {
    const scrollPos = window.scrollY + 120;
    let current = sections[0];
    for (const sec of sections) {
        if (sec.offsetTop <= scrollPos) current = sec;
    }
    navLinks.forEach(link => link.classList.remove('active'));
    const active = document.querySelector(`.nav-link[href='#${current.id}']`);
    if (active) active.classList.add('active');
}

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);

// ==================== Close Mobile Menu ====================
document.querySelectorAll('.mobile-link').forEach(l => {
    l.addEventListener('click', () => closeMobileMenu());
});

// ==================== CGPA Calculator ====================
cgpaForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const scores = [marks1.value, marks2.value, marks3.value].map(Number);
    if (scores.some((value) => Number.isNaN(value) || value < 0 || value > 100)) {
        calculatorMessage.textContent = "❌ Please enter valid marks between 0 and 100.";
        calculatorMessage.style.color = "#dc2626";
        return;
    }

    calculatorMessage.textContent = "⏳ Calculating...";
    calculatorMessage.style.color = "#2563eb";

    try {
        const response = await fetch('/api/calculate-cgpa', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ marks: scores })
        });

        const result = await response.json();
        if (!result.success) {
            throw new Error(result.message || 'Unable to calculate CGPA.');
        }

        calculatorMessage.textContent = `✅ Percentage: ${result.percentage}% | Estimated CGPA: ${result.cgpa}`;
        calculatorMessage.style.color = "#10b981";
    } catch (error) {
        calculatorMessage.textContent = `❌ ${error.message}`;
        calculatorMessage.style.color = "#dc2626";
    }
});

// ==================== Contact Form ====================
contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!contactName.value.trim() || !contactEmail.value.trim() || !contactMessage.value.trim()) {
        contactFeedback.textContent = "❌ Please fill in all contact fields.";
        contactFeedback.style.color = "#dc2626";
        return;
    }

    contactFeedback.textContent = "⏳ Sending message...";
    contactFeedback.style.color = "#2563eb";

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: contactName.value.trim(),
                email: contactEmail.value.trim(),
                message: contactMessage.value.trim()
            })
        });

        const result = await response.json();
        if (!result.success) {
            throw new Error(result.message || 'Unable to send message.');
        }

        contactFeedback.textContent = `✅ ${result.message}`;
        contactFeedback.style.color = "#10b981";
        contactForm.reset();
    } catch (error) {
        contactFeedback.textContent = `❌ ${error.message}`;
        contactFeedback.style.color = "#dc2626";
    }
});

// ==================== Initialize Everything ====================
document.addEventListener('DOMContentLoaded', () => {
    initProgressBar();
    animateCounters();
    initScrollAnimations();
    initBackToTop();
    setActiveLink();
});

// Prevent zoom on double-tap for mobile
document.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, { passive: false });

// ==================== Smooth Page Transitions ====================
window.addEventListener('beforeunload', () => {
    document.body.style.opacity = '0.95';
});

window.addEventListener('load', () => {
    document.body.style.transition = 'opacity 0.3s ease';
    document.body.style.opacity = '1';
});
