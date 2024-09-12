self.addEventListener('install',event => {
    event.waitUntil(
        caches.open('v1').then(cache => {
            return cache.addAll([
                '/Speedcare/', // Update this path
                '/Speedcare/index.html', // Update this path
                '/Speedcare/styles/style.css', // Update this path
                '/Speedcare/scripts/script.js', // Update this path
                '/Speedcare/favicon/favicon-32x32.png', // Update this path
                '/Speedcare/favicon/favicon-16x16.png', // Update this path

            ])
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);

        })
    );
});

