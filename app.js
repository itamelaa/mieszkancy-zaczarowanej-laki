// =========================
// PWA — SERVICE WORKER
// =========================

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./service-worker.js")
            .then(() => {
                console.log("Aplikacja PWA została uruchomiona.");
            })
            .catch(error => {
                console.error("Błąd Service Workera:", error);
            });
    });
}


// =========================
// AKTYWNA SEKCJA W MENU
// =========================

const sections = document.querySelectorAll(
    "#about, #meetings, #parents, #calendar, #social, #contact"
);

const navItems = document.querySelectorAll(".nav-item");


function updateActiveSection() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop;

        if (window.scrollY >= sectionTop - 180) {
            currentSection = section.getAttribute("id");
        }

    });

    navItems.forEach(item => {

        item.classList.remove("active");

        const link = item.getAttribute("href");

        if (link === "#" + currentSection) {
            item.classList.add("active");
        }

    });

}


// Aktualizujemy menu podczas przewijania
window.addEventListener("scroll", updateActiveSection);

// Aktualizujemy również po uruchomieniu strony
updateActiveSection();