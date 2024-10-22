const CACHE_NAME = 'calculadora-cache-v1';
const urlsToCache = [
  '/index.html',
  //'/style.css',  // Si tienes CSS externo
  //'/script.js',  // Si tienes un archivo JS separado
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;  // Si el archivo está en cache, lo devuelve.
        }
        return fetch(event.request);  // Si no, lo descarga de la red.
      })
  );
});
