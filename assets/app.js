(function () {
    "use strict";

    const countdownSection = document.getElementById("countdown-timer-section");
    const stopwatchSection = document.getElementById("stopwatch-section");
    const navCountdown = document.getElementById("nav-countdown");
    const navStopwatch = document.getElementById("nav-stopwatch");
    const hamburger = document.querySelector(".hamburger-menu");
    const topNav = document.querySelector(".top-nav");

    hamburger.addEventListener("click", () => {
        topNav.classList.toggle("active");
    });

    function showCountdown() {
        countdownSection.style.display = "flex";
        stopwatchSection.style.display = "none";
        navCountdown.classList.add("active");
        navStopwatch.classList.remove("active");
    }

    function showStopwatch() {
        countdownSection.style.display = "none";
        stopwatchSection.style.display = "flex";
        navCountdown.classList.remove("active");
        navStopwatch.classList.add("active");
    }

    navCountdown.addEventListener("click", (e) => {
        e.preventDefault();
        showCountdown();
    });

    navStopwatch.addEventListener("click", (e) => {
        e.preventDefault();
        showStopwatch();
    });

    // Show countdown by default
    showCountdown();
})();
