// Gacha Mod · Service Worker (funciona sin conexión tras la 1ª visita)
const CACHE = "gachamod-v2";
const FILES = ["./", "./index.html", "./css/styles.css", "./js/avatar.js", "./js/app.js", "./manifest.webmanifest", "./icon.svg"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => { if (e.request.method === "GET") e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))); });
