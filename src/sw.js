var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/restaurant.html',
  '/css/styles.css',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/img/1-large.jpg', '/img/1-medium.jpg', '/img/1-small.jpg',
  '/img/2-large.jpg', '/img/2-medium.jpg', '/img/2-small.jpg',
  '/img/3-large.jpg', '/img/3-medium.jpg', '/img/3-small.jpg',
  '/img/4-large.jpg', '/img/4-medium.jpg', '/img/4-small.jpg',
  '/img/5-large.jpg', '/img/5-medium.jpg', '/img/5-small.jpg',
  '/img/6-large.jpg', '/img/6-medium.jpg', '/img/6-small.jpg',
  '/img/7-large.jpg', '/img/7-medium.jpg', '/img/7-small.jpg',
  '/img/8-large.jpg', '/img/8-medium.jpg', '/img/8-small.jpg',
  '/img/9-large.jpg', '/img/9-medium.jpg', '/img/9-small.jpg',
  '/img/10-large.jpg', '/img/10-medium.jpg', '/img/10-small.jpg',
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
  const requestUrl = new URL(event.request.url);

  // only highjack request made to our app (not mapbox maps or leaflet, for example)
  if (requestUrl.origin === location.origin) {
    // Since requests made to restaurant.html have search params (like ?id=1), the url can't be used as the
    // key to access the cache, so just respondWith restaurant.html if pathname startsWith '/restaurant.html'
    if (requestUrl.pathname.startsWith('/restaurant.html')) {
      event.respondWith(caches.match('/restaurant.html'));
      return; // Done handling request, so exit early.
    }
  }

  // Default behavior: respond with cached elements, if any, falling back to network.
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
