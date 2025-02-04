import { Home, Heart, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "ראשי", path: "/" },
    { icon: Heart, label: "מועדפים", path: "/favorites" },
    { icon: Settings, label: "הגדרות", path: "/settings" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-gradient-to-r from-[#006daa]/95 via-[#31b9d2]/90 to-[#9cd2d1]/95 backdrop-blur-md border-t border-white/10 px-4 flex items-center justify-around z-50">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center space-y-1 transition-all duration-300 ${isActive ? "text-white scale-110" : "text-white/60 hover:text-white hover:scale-105"}`}
          >
            <item.icon
              className={`h-5 w-5 transition-transform duration-300 transform scale-x-[-1] ${isActive ? "transform scale-110" : ""}`}
            />
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
