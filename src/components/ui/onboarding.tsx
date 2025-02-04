import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNotificationPermission } from "@/lib/hooks/useNotificationPermission";

export function Onboarding() {
  const [isOpen, setIsOpen] = useState(false);
  const { requestPermission } = useNotificationPermission();

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");
    if (!hasSeenOnboarding) {
      setIsOpen(true);
      localStorage.setItem("hasSeenOnboarding", "true");
    }
  }, []);

  const handleEnableNotifications = async () => {
    await requestPermission();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px] bg-card text-card-foreground p-6 rounded-3xl border border-white/10">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-right mb-2">
            ברוכים הבאים ליש גלים! 🏄‍♂️
          </DialogTitle>
          <DialogDescription className="text-right text-lg">
            אפליקציה לבדיקת תנאי גלישה בחופי ישראל
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <p className="text-muted-foreground text-right">
            נשמח לעדכן אותך כשיש תנאי גלישה טובים בחופים המועדפים עליך.
          </p>
          <div className="flex flex-col gap-2">
            <Button
              onClick={handleEnableNotifications}
              className="w-full h-12 text-lg bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:from-primary/90 hover:to-primary transition-all duration-300"
            >
              אפשר התראות
            </Button>
            <Button
              variant="ghost"
              onClick={() => setIsOpen(false)}
              className="w-full h-12 text-lg"
            >
              אולי מאוחר יותר
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
