// Perform install steps
var CACHE_NAME = 'bestchair-v1';
var urlsToCache = [
    'images/storeLogo.png',
    'images/ico512.png',
    'images/ico192.png',
    'models/bestchair.glb',
    'models/bluechair.glb',
    'models/whitechair.glb',
    'scripts/model3d.js',
    'scripts/aframe.min.js',
    'styles/beststore.css',
    'aframe.html'
];

self.addEventListener('install', function(event) {
// Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('Opened cache');
        return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', function(event) {

  var cacheWhitelist = ['bestchair-v1'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});