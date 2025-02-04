import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Waves, Wind, Thermometer, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Beach } from "@/types/beach";

interface BeachCardProps extends Partial<Beach> {
  onFavoriteToggle?: (beachId: string) => void;
}

export default function BeachCard({
  id = "1",
  name = "חוף הצוק",
  waveHeight = "1.5m",
  windSpeed = '12 קמ"ש',
  temperature = "25°C",
  isFavorite = false,
  onFavoriteToggle = () => {},
}: BeachCardProps) {
  return (
    <Card className="w-full bg-gradient-to-br from-[#006daa]/90 to-[#31b9d2]/90 text-white backdrop-blur-md border border-white/20 rounded-3xl transition-all duration-500 ease-in-out cursor-pointer hover:shadow-[0_8px_32px_rgba(0,141,218,0.3)] hover:scale-[1.02] transform hover:-translate-y-1 group overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-bold text-right">{name}</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="transition-transform duration-300 hover:scale-110 active:scale-95 transition-all duration-200"
            onClick={(e) => {
              e.stopPropagation();
              onFavoriteToggle(id);
            }}
          >
            <Heart
              className={`h-5 w-5 transition-colors duration-300 ${isFavorite ? "fill-red-500 text-red-500" : "text-white/70 hover:text-white"}`}
            />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 justify-end">
          <div className="flex items-center gap-2 text-white/80">
            <Waves className="h-4 w-4" />
            <span className="text-sm font-medium">{waveHeight}</span>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <Wind className="h-4 w-4" />
            <span className="text-sm font-medium">{windSpeed}</span>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <Thermometer className="h-4 w-4" />
            <span className="text-sm font-medium">{temperature}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
