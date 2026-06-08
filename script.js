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

// Check for saved theme preference
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
}

openDashboard.addEventListener("click", () => {
    document.querySelector("#dashboard").scrollIntoView({ behavior: "smooth" });
});

openResources.addEventListener("click", () => {
    document.querySelector("#resources").scrollIntoView({ behavior: "smooth" });
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

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mainNav = document.getElementById('mainNav');

menuToggle?.addEventListener('click', () => {
    if (mobileMenu) mobileMenu.classList.toggle('hidden');
});

// Active link highlight on scroll
const navLinks = document.querySelectorAll('.nav-link');
const sections = Array.from(document.querySelectorAll('main section'));

function setActiveLink() {
    const scrollPos = window.scrollY + 120; // offset for header
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

// Close mobile menu when a mobile link is clicked
document.querySelectorAll('.mobile-link').forEach(l => {
    l.addEventListener('click', () => mobileMenu?.classList.add('hidden'));
});

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
