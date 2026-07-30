const CACHE_NAME = "learnify-elite-v8";
const APP_SHELL = [
  "/",
  "/index.html",
  "/dashboard.html",
  "/calendar.html",
  "/subjects.html",
  "/lectures.html",
  "/friends.html",
  "/chat.html",
  "/leaderboard.html",
  "/settings.html",
  "/insights.html",
  "/planner.html",
  "/admin.html",
  "/styles.css",
  "/app.js",
  "/analytics.js",
  "/calendar-scroll.js",
  "/react-insights.js",
  "/chat.css",
  "/chat.js",
  "/favicon.svg",
  "/favicon.png",
  "/site.webmanifest"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => Promise.allSettled(APP_SHELL.map((path) => cache.add(path))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

async function cacheSuccessfulResponse(request, response) {
  if (response?.ok) {
    const cache = await caches.open(CACHE_NAME);
    await cache.put(request, response.clone());
  }
  return response;
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    return await cacheSuccessfulResponse(request, response);
  } catch (error) {
    return (await caches.match(request, { ignoreSearch: true }))
      || (await caches.match("/index.html"));
  }
}

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin || requestUrl.pathname.startsWith("/api/") || requestUrl.pathname.startsWith("/socket.io/")) {
    return;
  }

  if (event.request.mode === "navigate") {
    event.respondWith(networkFirst(event.request));
    return;
  }

  const refreshedResponse = fetch(event.request)
    .then((response) => cacheSuccessfulResponse(event.request, response))
    .catch(() => undefined);

  event.waitUntil(refreshedResponse);
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        return cached;
      }
      return refreshedResponse.then((response) => response || new Response("", {
        status: 504,
        statusText: "Offline"
      }));
    })
  );
});
