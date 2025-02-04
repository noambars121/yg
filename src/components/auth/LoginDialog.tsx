import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/hooks/useAuth";
import { Loader2 } from "lucide-react";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    login(username);
    setIsLoading(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-card text-card-foreground p-6 rounded-3xl border border-white/10">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-right">
            התחברות
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleLogin} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="username">שם משתמש</Label>
            <Input
              id="username"
              placeholder="הכנס שם משתמש"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12 text-lg"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full h-12 text-lg mt-4 bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:from-primary/90 hover:to-primary transition-all duration-300"
            disabled={isLoading || !username.trim()}
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "התחבר"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
