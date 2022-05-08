let counter = 0;

self.oninstall = () => {
  console.log("Установка сервисного исполнителя");
}

self.onactive = (event) => {
  console.log("Активация service worker");
  event.waitUntil(self.clients.claim());
}

self.onfetch = (event) => {
  console.log("Fetch", event.request.url);

  if (event.request.url.endsWith("/data.json")) {
    counter++;
    event.respondWith(
      new Response(JSON.stringify({ counter }), {
        headers: {
          "Content-Type": "application/json",
        }
      })
    );
    return;
  }

  event.respondWith(fetch(event.request));
}
