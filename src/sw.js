// for some reason config functions are now located in workbox.core
workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.routing.registerRoute(
  new RegExp("https:.*min.(css|js)"),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "cdn-cache"
  })
);

// strategy for caching API server data responses
// workbox.routing.registerRoute(
//   new RegExp("/*.json"),
//   new workbox.strategies.NetworkFirst()
// );

self.addEventListener("install", e => {
  console.log("install");
});
self.addEventListener("activate", e => {
  console.log("activate");
});

workbox.precaching.precacheAndRoute(self.__precacheManifest || []);
