// Service worker logic for caching and handling notifications
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('location-tracker-cache').then((cache) => {
            return cache.addAll([
                '/',
                'index.html',
                'styles.css',
                'app.js',
                // Add other static assets here
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('notificationclick', (event) => {
    // Handle notification click event here
    event.notification.close();
    // Add your custom logic for handling the notification click
});

self.addEventListener('push', (event) => {
    // Handle push notifications here (if applicable)
    // Add your custom logic for handling push notifications
});
