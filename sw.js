const CACHE_NAME = 'digital-library-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './books/config.json',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Installation - Cache basic assets only
// Audio files will be cached on-demand when users download books
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE).catch(err => {
          console.log('Cache failed for some assets:', err);
          // Continue even if some assets fail to cache
        });
      })
  );
});

// Activation - Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => {
          return name !== CACHE_NAME;
        }).map((name) => {
          return caches.delete(name);
        })
      );
    })
  );
});

// Fetch - Serve from cache, fall back to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        
        // Fetch from network
        return fetch(event.request).then((fetchResponse) => {
          // Cache audio files when they're fetched
          if (event.request.url.includes('.mp3') || 
              event.request.url.includes('/books/')) {
            const responseClone = fetchResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return fetchResponse;
        });
      })
      .catch(() => {
        // Fallback for offline experience
        if (event.request.url.includes('.mp3')) {
          return new Response('Audio file not available offline', { 
            status: 404,
            statusText: 'Audio file not cached' 
          });
        }
        
        // For other requests, return a basic offline response
        return new Response('Offline', { 
          status: 503,
          statusText: 'Service Unavailable' 
        });
      })
  );
}); 