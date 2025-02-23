console.log('Service Worker: Registered')

const CACHE_NAME = 'cobh-cache-v1'
const urlsToCache = [
  // Core app files
  '/',
  '/manifest.webmanifest',

  // Static assets
  '/cobh_logo/COBH_Logo_Large.svg',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/apple-touch-icon.png',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        urlsToCache.map((url) => {
          return cache
            .add(url)
            .then(() => {
              console.log('Successfully cached:', url)
            })
            .catch((error) => {
              console.error('Failed to cache:', url, error)
              return Promise.resolve()
            })
        }),
      )
    }),
  )
})

self.addEventListener('fetch', (event) => {
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response
        }

        return fetch(event.request).then((response) => {
          if (
            !response ||
            response.status !== 200 ||
            response.type !== 'basic'
          ) {
            return response
          }

          if (response.type === 'basic') {
            const responseToCache = response.clone()
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache)
            })
          }

          return response
        })
      }),
    )
  }
})
