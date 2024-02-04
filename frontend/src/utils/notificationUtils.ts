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
    const notification = new Notification(title, { body });
    notification.onclick = () => {
      window.focus();
    };
  }
}
