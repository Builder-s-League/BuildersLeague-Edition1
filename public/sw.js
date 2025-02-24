console.log('Service Worker: Registered')

// https://nextjs.org/docs/app/building-your-application/caching#using-service-workers
// this service worker is used to cache the static assets of the app
// ** important: this service worker might not work in the development environment
// services workers are restricted to running across HTTPS for security reasons
// https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers#setting_up_to_play_with_service_workers

const CACHE_NAME = 'cobh-cache-v1'
const urlsToCache = [
  // Core app files

  // Static assets
  '/cobh_logo/COBH_Logo_Large.svg',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/apple-touch-icon.png',
]

// Check if we're in development mode
const isDevelopment =
  self.location.hostname === 'localhost' ||
  self.location.hostname === '127.0.0.1'

self.addEventListener('install', (event) => {
  if (isDevelopment) {
    console.log('Service Worker: Skipping cache in development')
    return
  }

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
  if (isDevelopment) {
    // Skip caching in development
    return
  }

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

          const responseToCache = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache)
          })

          return response
        })
      }),
    )
  }
})

// Add cleanup for old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Removing old cache', cacheName)
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
})
