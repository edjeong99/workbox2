// get workbox from CDN
importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js'
);

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  // cache files in the manifest.
  // it is an empty [] now but will be filled by workbox-config.js
  workbox.precaching.precacheAndRoute([]);

  //add route
  workbox.routing.registerRoute(
    /(.*)\.(?:html|css|js)/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'source-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }),
      ],
    })
  );
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
