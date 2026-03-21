document.addEventListener("DOMContentLoaded", function () {
    const reveals = document.querySelectorAll(".reveal");
    const hero = document.getElementById("hero");
    const header = document.querySelector("header");
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links a");

    function revealOnScroll() {
        const windowHeight = window.innerHeight;

        reveals.forEach(function (element) {
            const elementTop = element.getBoundingClientRect().top;
            const revealPoint = 120;

            if (elementTop < windowHeight - revealPoint) {
                element.classList.add("active");
            }
        });
    }

    function heroParallax() {
        if (!hero) return;

        const offset = window.pageYOffset;
        hero.style.backgroundPositionY = offset * 0.25 + "px";
    }

    function handleHeaderScroll() {
        if (!header) return;

        if (window.pageYOffset > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            navLinks.classList.toggle("active");
        });
    }

    if (navItems.length > 0 && navLinks) {
        navItems.forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("active");
            });
        });
    }

    window.addEventListener("scroll", function () {
        revealOnScroll();
        heroParallax();
        handleHeaderScroll();
    });

    revealOnScroll();
    handleHeaderScroll();
});