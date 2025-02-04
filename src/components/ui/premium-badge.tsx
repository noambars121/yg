import { Crown } from "lucide-react";

export function PremiumBadge() {
  return (
    <div className="inline-flex items-center px-2 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs font-medium shadow-lg">
      <Crown className="w-3 h-3 mr-1" />
      Premium
    </div>
  );
}
