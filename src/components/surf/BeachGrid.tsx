import BeachCard from "./BeachCard";
import type { Beach } from "../../types/beach";

interface BeachGridProps {
  beaches?: Beach[];
  onBeachSelect?: (beach: Beach) => void;
  onFavoriteToggle?: (beachId: string) => void;
}

import { LoadingSkeleton } from "@/components/ui/loading-skeleton";

export default function BeachGrid({
  beaches = [],
  onBeachSelect = () => {},
  onFavoriteToggle = () => {},
}: BeachGridProps) {
  if (!beaches.length) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-[150px] rounded-3xl overflow-hidden">
            <LoadingSkeleton className="w-full h-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full bg-background p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {beaches.map((beach) => (
          <div
            key={beach.id}
            onClick={() => onBeachSelect(beach)}
            className="cursor-pointer"
          >
            <BeachCard {...beach} onFavoriteToggle={onFavoriteToggle} />
          </div>
        ))}
      </div>
    </div>
  );
}
