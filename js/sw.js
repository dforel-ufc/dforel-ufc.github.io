var nameOfCache = 'dforel-ufc-v1';
var appShellFiles = [
    'index.html',
    'produits.csv',
    'style.css',
    'favicon.ico',
    'icons/icon-32.png',
    'icons/icon-64.png',
    'icons/icon-96.png',
    'icons/icon-128.png',
    'icons/icon-168.png',
    'icons/icon-192.png',
    'icons/icon-256.png',
    'icons/icon-512.png',
    'images/barcode-scanner.png',
    'images/icon-cart.png',
    'images/icon-setup.png',
    'images/icon-transmit.png',
    'images/logo.png',
    'js/app.js',
    'js/DecoderWorker.js',
    'js/exif.js',
    'js/job.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(nameOfCache).then((cache) => {
      return cache.addAll(appShellFiles);
    })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
          return Promise.all(keyList.map((key) => {
        if(appShellFiles.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => {
      return r || fetch(e.request).then((response) => {
                return caches.open(nameOfCache).then((cache) => {
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});
