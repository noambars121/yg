import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings, LogOut, User } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";
import React from "react";
import { LoginDialog } from "@/components/auth/LoginDialog";

interface HeaderProps {
  userName?: string;
  userAvatar?: string;
  isAuthenticated?: boolean;
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="fixed top-0 w-full bg-gradient-to-r from-[#006daa]/90 via-[#31b9d2]/90 to-[#9cd2d1]/90 backdrop-blur-lg border-b border-white/10 px-6 flex items-center justify-between z-50 shadow-lg h-[49px]">
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <User className="ml-2 h-4 w-4" />
                <span>פרופיל</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="ml-2 h-4 w-4" />
                <span>הגדרות</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="ml-2 h-4 w-4" />
                <span>התנתק</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button variant="default" onClick={() => setShowLogin(true)}>
            התחבר
          </Button>
        )}
      </div>
      <div className="flex-1 text-right">
        <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-white via-white/90 to-white/80 text-transparent bg-clip-text animate-gradient relative group cursor-default">
          יש גלים? <div className="w-[800px] h-[600px]"></div>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/20 group-hover:w-full transition-all duration-300"></span>
        </h1>
      </div>
      <LoginDialog open={showLogin} onOpenChange={setShowLogin} />
    </header>
  );
}
