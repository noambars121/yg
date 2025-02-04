import { MapPin } from "lucide-react";

export function MapMarker() {
  return (
    <div className="w-8 h-8 rounded-full bg-primary hover:bg-primary/90 transition-all hover:scale-110 shadow-lg flex items-center justify-center cursor-pointer">
      <MapPin className="h-4 w-4 text-white" />
    </div>
  );
}
