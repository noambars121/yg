import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useNotificationPermission } from "./useNotificationPermission";
import type { Beach } from "@/types/beach";
import { useAuth } from "./useAuth";

export function useNotifications(beaches: Beach[]) {
  const { toast } = useToast();
  const { permission, sendNotification } = useNotificationPermission();
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.preferences?.notifications) return;

    const checkConditions = (beach: Beach) => {
      const waveHeight = parseFloat(beach.waveHeight);
      const windSpeed = parseFloat(beach.windSpeed);

      // Check for good surfing conditions
      if (waveHeight >= 1.5 && waveHeight <= 2.5 && windSpeed < 15) {
        // In-app notification
        toast({
          title: "תנאי גלישה מעולים! 🏄‍♂️",
          description: `גלים בגובה ${beach.waveHeight} ב${beach.name}`,
          variant: "default",
        });

        // Mobile notification
        if (permission === "granted") {
          sendNotification(`תנאי גלישה מעולים ב${beach.name}! 🏄‍♂️`, {
            body: `גלים בגובה ${beach.waveHeight}\nרוח: ${beach.windSpeed}`,
            icon: "/vite.svg",
            vibrate: user.preferences.vibration ? [200, 100, 200] : undefined,
            tag: `surf-conditions-${beach.id}`, // Prevent duplicate notifications
            data: { beachId: beach.id },
            actions: [
              {
                action: "open",
                title: "פתח פרטים",
              },
            ],
          });
        }
      }

      // Check for dangerous conditions
      if (windSpeed >= 20 || waveHeight > 3) {
        // In-app notification
        toast({
          title: "תנאים מסוכנים! ⚠️",
          description: `רוח חזקה של ${beach.windSpeed} ב${beach.name}`,
          variant: "destructive",
        });

        // Mobile notification
        if (permission === "granted") {
          sendNotification(`אזהרה: תנאים מסוכנים ב${beach.name}! ⚠️`, {
            body: `רוח: ${beach.windSpeed}\nגלים: ${beach.waveHeight}`,
            icon: "/vite.svg",
            vibrate: user.preferences.vibration
              ? [200, 100, 200, 100, 200]
              : undefined,
            tag: `dangerous-conditions-${beach.id}`,
            data: { beachId: beach.id },
            requireInteraction: true,
          });
        }
      }
    };

    // Check conditions for each beach
    beaches.forEach(checkConditions);

    // Set up service worker for handling notification clicks
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", (event) => {
        if (event.data?.type === "NOTIFICATION_CLICK") {
          const beachId = event.data.beachId;
          window.location.href = `/?beach=${beachId}`;
        }
      });
    }
  }, [beaches, permission, user?.preferences]);
}
