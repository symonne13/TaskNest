const CACHE_NAME = "tasknest-v1";

const urlsToCache = [

"/",

"index.html",

"login.html",

"signup.html",

"dashboard.html",

"css/style.css",

"css/auth.css",

"css/dashboard.css",

"js/auth.js",

"js/dashboard.js",

"js/tasks.js",

"js/storage.js",

"js/calendar.js",

"js/reminders.js",

"js/settings.js",

"js/analytics.js"

];


self.addEventListener("install",event=>{

event.waitUntil(

caches.open(CACHE_NAME)

.then(cache=>{

return cache.addAll(urlsToCache);

})

);

});


self.addEventListener("fetch",event=>{

event.respondWith(

caches.match(event.request)

.then(response=>{

return response || fetch(event.request);

})

);

});