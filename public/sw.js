const staticFiles = 'myFiles_19'

const assets = [
    '/',
    'index.html',
    'app.js',
    'main.js',
    'main.css',
    'img/9524dc88844e809ad8fc41d52db74937.jpg',


]

self.addEventListener('install', evt => {
    // console.log('instaled');
    evt.waitUntil(
        caches.open(staticFiles).then(cache => {
            cache.addAll(assets);
            // console.log('caching items');
        })
    )
})



self.addEventListener('activate', evt => {
    // console.log('activated')
    evt.waitUntil(
        caches.keys().then(keys =>{
            return Promise.all(keys
                .filter(key => key !== staticFiles)
                .map(key => caches.delete(key))
                )
        })
    )
})


self.addEventListener('fetch', evt => {
    // console.log('fetched')
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request)
        })
    )
})