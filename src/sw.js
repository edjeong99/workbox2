// import { Workbox } from 'workbox-window';
//import { BroadcastUpdatePlugin } from 'workbox-broadcast-update';

//import { ww } from 'workbox-window';

//get workbox from CDN
importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js'
);

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  // cache files in the manifest.
  // it is an empty [] now but will be filled by workbox-config.js
  workbox.precaching.precacheAndRoute([]);

  //add route and use broadcastUpdatePlugin to update cache
  workbox.routing.registerRoute(
    /(.*)\.(?:html|css|js)/,
    new workbox.strategies.StaleWhileRevalidate({
      // plugins: [
      //   new workbox.broadcastUpdate.Plugin({
      //     channelName: 'cache-update',
      //   }),
      //   //new workbox.broadcast.update.BroadcastUpdatePlugin()
      // ],
    })
  );
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
