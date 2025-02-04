self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const beachId = event.notification.data?.beachId;
  if (beachId) {
    event.waitUntil(
      clients.matchAll({ type: "window" }).then((clientList) => {
        for (const client of clientList) {
          if (client.url === "/" && "focus" in client) {
            client.postMessage({ type: "NOTIFICATION_CLICK", beachId });
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(`/?beach=${beachId}`);
        }
      }),
    );
  }
});
