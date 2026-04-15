const CACHE_NAME = "learnify-elite-v1";
const APP_SHELL = [
  "/",
  "/index.html",
  "/dashboard.html",
  "/subjects.html",
  "/lectures.html",
  "/friends.html",
  "/leaderboard.html",
  "/settings.html",
  "/insights.html",
  "/planner.html",
  "/admin.html",
  "/styles.css",
  "/app.js",
  "/analytics.js",
  "/react-insights.js",
  "/favicon.png",
  "/site.webmanifest"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).catch(() => undefined)
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const cloned = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cloned)).catch(() => undefined);
        return response;
      })
      .catch(() => caches.match(event.request).then((cached) => cached || caches.match("/index.html")))
  );
});
