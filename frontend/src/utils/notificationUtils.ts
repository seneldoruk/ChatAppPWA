export function setupNotification() {
  if (!Notification) {
    console.log("Desktop notifications are not available in your browser.");
    return;
  }

  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }
}

export function showNotification(title: string, body: string) {
  if (Notification.permission === "granted") {
    navigator.serviceWorker.ready.then(function (registration) {
      registration.showNotification(title, {
        body: body,
        icon: "/favicon.png",
      });
    });
  }
}
