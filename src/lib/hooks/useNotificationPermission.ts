import { useState, useEffect } from "react";

export function useNotificationPermission() {
  const [permission, setPermission] =
    useState<NotificationPermission>("default");

  useEffect(() => {
    if (!("Notification" in window)) return;

    setPermission(Notification.permission);
  }, []);

  const requestPermission = async () => {
    if (!("Notification" in window)) return;

    const result = await Notification.requestPermission();
    setPermission(result);
    return result;
  };

  const sendNotification = (title: string, options?: NotificationOptions) => {
    if (!("Notification" in window)) return;
    if (permission !== "granted") return;

    return new Notification(title, {
      icon: "/vite.svg",
      badge: "/vite.svg",
      ...options,
    });
  };

  return {
    permission,
    requestPermission,
    sendNotification,
  };
}
