// Service worker: maakt de tool offline bruikbaar.
// Verhoog het versienummer als je bestanden aanpast, dan haalt de iPad de nieuwe versie op.
const CACHE = "verkeersexamen-v1";
const BESTANDEN = [
  ".",
  "index.html",
  "css/styles.css",
  "js/vragen.js",
  "js/app.js",
  "manifest.webmanifest",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-180.png",
  "icons/borden/voorrang_verlenen.svg",
  "icons/borden/stop.svg",
  "icons/borden/voorrangsweg.svg",
  "icons/borden/verplicht_fietspad.svg",
  "icons/borden/gesloten_alle.svg",
  "icons/borden/verboden_fietsers.svg",
  "icons/borden/inrijden_verboden.svg",
  "icons/borden/rotonde.svg"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(BESTANDEN)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((namen) =>
      Promise.all(namen.filter((n) => n !== CACHE).map((n) => caches.delete(n)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  // Alleen eigen bestanden uit de cache halen. Het versturen naar Google gaat altijd via internet.
  if (url.origin !== self.location.origin) return;

  e.respondWith(
    caches.match(e.request).then((gevonden) => {
      return (
        gevonden ||
        fetch(e.request).then((resp) => {
          const kopie = resp.clone();
          caches.open(CACHE).then((c) => c.put(e.request, kopie)).catch(() => {});
          return resp;
        }).catch(() => gevonden)
      );
    })
  );
});
