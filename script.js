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
    if (themeToggle) themeToggle.textContent = "☀️";
}

// Toggle dark / light mode and persist the choice
themeToggle?.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
});

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


// =========================
// WELCOME SCREEN
// =========================

window.addEventListener("load", () => {
    document.body.classList.add("welcome-open");
});

openHome?.addEventListener("click", () => {
    welcomeOverlay?.classList.add("hidden");
    document.body.classList.remove("welcome-open");

    document.querySelector("#home")
        ?.scrollIntoView({
            behavior: "smooth"
        });
});


// =========================
// BUTTON NAVIGATION
// =========================

openDashboard?.addEventListener("click", () => {
    document.querySelector("#dashboard")
        ?.scrollIntoView({
            behavior: "smooth"
        });
});

openResources?.addEventListener("click", () => {
    document.querySelector("#resources")
        ?.scrollIntoView({
            behavior: "smooth"
        });
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mainNav = document.getElementById('mainNav');

menuToggle?.addEventListener('click', () => {
    if (!mobileMenu) return;
    const isOpen = mobileMenu.classList.toggle('hidden') === false;
    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
});

// Active link highlight on scroll
const navLinks = document.querySelectorAll('.nav-link');
const sections = Array.from(document.querySelectorAll('main section'));

function setActiveLink() {
    const scrollPos = window.scrollY + 120; // offset for header
    let current = sections[0];

    sections.forEach(section => {

        if (
            section.offsetTop <= scrollPos
        ) {
            current = section;
        }

    });

    navLinks.forEach(link =>
        link.classList.remove("active")
    );

    const activeLink =
        document.querySelector(
            `.nav-link[href="#${current.id}"]`
        );

    activeLink?.classList.add("active");
}

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);

// Close mobile menu when a mobile link is clicked
document.querySelectorAll('.mobile-link').forEach(l => {
    l.addEventListener('click', () => {
        mobileMenu?.classList.add('hidden');
        menuToggle?.classList.remove('open');
        menuToggle?.setAttribute('aria-expanded', 'false');
    });
});

cgpaForm.addEventListener("submit", async (event) => {
    event.preventDefault();

        const scores = [
            marks1.value,
            marks2.value,
            marks3.value
        ].map(Number);

        if (
            scores.some(
                score =>
                    isNaN(score) ||
                    score < 0 ||
                    score > 100
            )
        ) {

            calculatorMessage.textContent =
                "❌ Please enter valid marks between 0 and 100.";

            calculatorMessage.style.color =
                "#dc2626";

            return;
        }

        calculatorMessage.textContent =
            "⏳ Calculating...";

        calculatorMessage.style.color =
            "#2563eb";

        try {

            const response =
                await fetch(
                    "/api/calculate-cgpa",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json"
                        },
                        body: JSON.stringify({
                            marks: scores
                        })
                    }
                );

            const result =
                await response.json();

            if (!result.success) {
                throw new Error(
                    result.message ||
                    "Unable to calculate CGPA."
                );
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

        if (
            !contactName.value.trim() ||
            !contactEmail.value.trim() ||
            !contactMessage.value.trim()
        ) {

            contactFeedback.textContent =
                "❌ Please fill in all fields.";

            contactFeedback.style.color =
                "#dc2626";

            return;
        }

        contactFeedback.textContent =
            "⏳ Sending message...";

        contactFeedback.style.color =
            "#2563eb";

        try {

            const response =
                await fetch("/api/contact", {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify({
                        name:
                            contactName.value.trim(),
                        email:
                            contactEmail.value.trim(),
                        message:
                            contactMessage.value.trim()
                    })
                });

            const result =
                await response.json();

            if (!result.success) {
                throw new Error(
                    result.message ||
                    "Unable to send message."
                );
            }

        contactFeedback.textContent = `✅ ${result.message}`;
        contactFeedback.style.color = "#10b981";
        contactForm.reset();
    } catch (error) {
        contactFeedback.textContent = `❌ ${error.message}`;
        contactFeedback.style.color = "#dc2626";
    }
});

// =========================
// SCROLL PROGRESS BAR
// =========================

const progressBar = document.querySelector(".progress-bar");

function updateProgressBar() {
    if (!progressBar) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateProgressBar);
window.addEventListener("load", updateProgressBar);

// =========================
// BACK TO TOP BUTTON
// =========================

const backToTop = document.getElementById("backToTop");

function toggleBackToTop() {
    if (!backToTop) return;
    backToTop.classList.toggle("visible", window.scrollY > 400);
}

backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", toggleBackToTop);
window.addEventListener("load", toggleBackToTop);

// =========================
// ANIMATED COUNTERS
// =========================

function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    if (Number.isNaN(target)) return;

    const isDecimal = !Number.isInteger(target);
    const duration = 1500;
    const start = performance.now();

    function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const value = target * progress;
        el.textContent = isDecimal ? value.toFixed(1) : Math.round(value).toString();
        if (progress < 1) {
            requestAnimationFrame(tick);
        } else {
            el.textContent = isDecimal ? target.toFixed(1) : Math.round(target).toString();
        }
    }

    requestAnimationFrame(tick);
}

// =========================
// REVEAL ON SCROLL + COUNTERS
// =========================

const revealEls = document.querySelectorAll(".fade-in-on-scroll");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("visible");
            entry.target.querySelectorAll(".counter").forEach(animateCounter);
            obs.unobserve(entry.target);
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

    revealEls.forEach((el) => observer.observe(el));
} else {
    // Fallback: reveal everything and run counters immediately
    revealEls.forEach((el) => {
        el.classList.add("visible");
        el.querySelectorAll(".counter").forEach(animateCounter);
    });
}
