const CACHE_NAME = "upprime-static-v2";
const APP_SCOPE = "/upprime/";
const OFFLINE_URL = "/upprime/offline.html";
const STATIC_PUBLIC_ASSETS = new Set([
  "/upprime/favicon.svg",
  "/upprime/favicon-32.png",
  "/upprime/favicon-180.png",
  "/upprime/favicon-192.svg",
  "/upprime/favicon-512.png"
]);

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.add(OFFLINE_URL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key.startsWith("upprime-static-") && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (!url.pathname.startsWith(APP_SCOPE)) return;

  // Keep navigations network-only; show a generic offline page only on network failure.
  // This avoids caching admin, customer, authentication, and payment pages or responses.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() => caches.match(OFFLINE_URL))
    );
    return;
  }

  if (url.pathname === "/upprime/sw.js") return;

  // Cache only immutable Next.js build assets and explicitly approved public icons.
  // Do not cache arbitrary extension-matching URLs or application/API endpoints.
  const isNextAsset = url.pathname.startsWith("/upprime/_next/static/");
  const isApprovedPublicAsset = STATIC_PUBLIC_ASSETS.has(url.pathname);
  if (!isNextAsset && !isApprovedPublicAsset) return;

  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;

    const response = await fetch(request);
    if (response.ok && response.type === "basic") {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, response.clone());
    }
    return response;
  })());
});
