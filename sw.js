"use strict";
"function" == typeof importScripts && importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"),
console.log("Was Workbox able to load?"),
workbox ? console.log("Yay! Workbox is loaded!") : console.log("Boo! Workbox didn't load."),
workbox.googleAnalytics.initialize(),
workbox.routing.registerRoute(
  // Cache JS, CSS, JSON files
  /.*\.(?:css|js|json)/,
  // Use cache but update in the background ASAP
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'filetype-cache',
  })
);
workbox.routing.registerRoute(/.*\.pdf|doc|docx|mp4|ogg/, workbox.strategies.staleWhileRevalidate({
    cacheName: "files"
})),
workbox.routing.registerRoute(/.*\.(?:png|jpg|jpe|jpeg|svg|svg2|gif|ico|bmp)/, workbox.strategies.cacheFirst({
    cacheName: "image-cache",
    plugins: [new workbox.expiration.Plugin({
        maxEntries: 100,
        maxAgeSeconds: 604800,
        purgeOnQuotaError: true
    })]
})),
workbox.routing.registerRoute(/.*(?:experiments.towardsai)\.net.*$/, workbox.strategies.staleWhileRevalidate({
    cacheName: "towardsai-cache"
})),
workbox.routing.registerRoute(/.*(?:fonts.googleapis|cdn-images-1.medium|google-analytics|googletagmanager|gstatic|feedgrabbr|cloudflare)\.com.*$/, workbox.strategies.staleWhileRevalidate({
    cacheName: "external-cache"
})),
workbox.routing.registerRoute(/.*(?:connect.facebook)\.net.*$/, workbox.strategies.staleWhileRevalidate({
    cacheName: "external-cache-1"
}));
