const CACHE_NAME = 'vocabatlas-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/assets/css/style.css',
    '/assets/js/app.js',
    '/assets/js/confetti.js',
    '/assets/icons/icon-192.png',
    '/assets/icons/icon-512.png',
    // We can add commonly used HTML files here or cache them dynamically
];

// Install Event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] Caching all: app shell and content');
                return cache.addAll(ASSETS);
            })
    );
});

// Activate Event
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    console.log('[Service Worker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
});

// Fetch Event (Network First, decreasing to Cache)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // Return response and clone it into cache
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }
                const responseToCache = response.clone();
                caches.open(CACHE_NAME)
                    .then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                return response;
            })
            .catch(() => {
                // If offline, try cache
                return caches.match(event.request);
            })
    );
});
