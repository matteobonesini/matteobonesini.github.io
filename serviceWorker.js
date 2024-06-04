const staticNote = "note-site-v1"
const assets = [
    "/",
    "/index.html",
    "/style.css",
    "/script.js",
    "/icons8-note-26.png",
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticNote).then(cache => {
            cache.addAll(assets)
        })
    )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
})