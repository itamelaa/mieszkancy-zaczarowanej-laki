// ===============================
// SERVICE WORKER
// Mieszkańcy Zaczarowanej Łąki
// ===============================

// Przy większej aktualizacji możesz zmienić v2 na v3, v4 itd.
const CACHE_NAME = "zaczarowana-laka-v2";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./style.css",
    "./app.js",
    "./manifest.json",
    "./logo.png",
    "./icon-192.png",
    "./icon-512.png"
];


// ===============================
// INSTALACJA
// ===============================

self.addEventListener("install", event => {

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(FILES_TO_CACHE))
    );

    // Nowy Service Worker nie czeka na zamknięcie starej aplikacji
    self.skipWaiting();
});


// ===============================
// AKTYWACJA
// ===============================

self.addEventListener("activate", event => {

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {

                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }

                })
            );
        })
    );

    // Nowa wersja od razu przejmuje otwarte strony
    self.clients.claim();
});


// ===============================
// POBIERANIE PLIKÓW
// ===============================

self.addEventListener("fetch", event => {

    // Obsługujemy tylko zwykłe żądania GET
    if (event.request.method !== "GET") {
        return;
    }

    event.respondWith(

        fetch(event.request)

            // Najpierw próbujemy pobrać najnowszą wersję z internetu
            .then(response => {

                const responseCopy = response.clone();

                caches.open(CACHE_NAME)
                    .then(cache => {
                        cache.put(event.request, responseCopy);
                    });

                return response;
            })

            // Jeśli nie ma internetu, korzystamy z zapisanej wersji
            .catch(() => {
                return caches.match(event.request);
            })

    );

});