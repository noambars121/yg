import { Card } from "@/components/ui/card";
import { Beach } from "@/types/beach";
import { Waves, Wind, Users, ArrowUp, ArrowDown } from "lucide-react";

interface BeachStatsProps {
  beaches: Beach[];
}

export default function BeachStats({ beaches }: BeachStatsProps) {
  const stats = {
    avgWaveHeight: (
      beaches.reduce((acc, beach) => acc + parseFloat(beach.waveHeight), 0) /
      beaches.length
    ).toFixed(1),
    avgWindSpeed: (
      beaches.reduce((acc, beach) => acc + parseFloat(beach.windSpeed), 0) /
      beaches.length
    ).toFixed(1),
    bestBeach: beaches.sort(
      (a, b) => parseFloat(b.waveHeight) - parseFloat(a.waveHeight),
    )[0],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="p-6 flex items-center justify-between bg-gradient-to-br from-card/80 to-card/60 border border-white/5 rounded-3xl hover:shadow-[0_0_25px_rgba(139,92,246,0.2)] transition-all group relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
          <Waves className="h-6 w-6 text-primary" />
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">ממוצע גובה גלים</p>
          <h3 className="text-2xl font-bold mt-1">{stats.avgWaveHeight}m</h3>
        </div>
      </Card>
      <Card className="p-6 flex items-center justify-between bg-gradient-to-br from-card/80 to-card/60 border border-white/5 rounded-3xl hover:shadow-[0_0_25px_rgba(139,92,246,0.2)] transition-all group relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
          <Wind className="h-6 w-6 text-primary" />
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">ממוצע מהירות רוח</p>
          <h3 className="text-2xl font-bold mt-1">{stats.avgWindSpeed} קמ"ש</h3>
        </div>
      </Card>
      <Card className="p-6 flex items-center justify-between bg-gradient-to-br from-card/80 to-card/60 border border-white/5 rounded-3xl hover:shadow-[0_0_25px_rgba(139,92,246,0.2)] transition-all group relative overflow-hidden">
        <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
          <Users className="h-6 w-6 text-primary" />
        </div>

        <div className="text-right">
          <p className="text-sm text-muted-foreground">החוף המומלץ</p>
          <h3 className="text-xl font-bold mt-1 truncate max-w-[160px]">
            {stats.bestBeach?.name}
          </h3>
        </div>
      </Card>
    </div>
  );
}
