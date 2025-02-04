import BeachMap from "@/components/surf/BeachMap";
import { useBeachData } from "@/lib/hooks/useBeachData";
import { LoadingScreen } from "@/components/ui/loading";
import { Beach } from "@/types/beach";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import BeachDetails from "@/components/surf/BeachDetails";
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Map } from "lucide-react";
import { useFavorites } from "@/lib/hooks/useFavorites";

export default function MapView() {
  const { beaches, loading } = useBeachData();
  const [selectedBeach, setSelectedBeach] = useState<Beach | null>(null);
  const { favorites, toggleFavorite } = useFavorites();

  if (loading) return <LoadingScreen />;

  const locations = beaches.map((beach) => ({
    id: beach.id,
    name: beach.name,
    lat: 32.0853 + parseFloat(beach.id) * 0.01, // Simulated coordinates
    lng: 34.7818 + parseFloat(beach.id) * 0.005, // Simulated coordinates
    waveHeight: beach.waveHeight,
    windSpeed: beach.windSpeed,
  }));

  return (
    <Layout>
      <div className="py-6 space-y-6">
        <div className="flex items-center gap-2">
          <Map className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">מפת חופים</h1>
        </div>

        <div className="rounded-3xl overflow-hidden">
          <BeachMap
            locations={locations}
            onLocationSelect={(location) => {
              const beach = beaches.find((b) => b.id === location.id);
              if (beach) {
                setSelectedBeach({
                  ...beach,
                  isFavorite: favorites.includes(beach.id),
                });
              }
            }}
          />
        </div>
      </div>

      <Dialog
        open={!!selectedBeach}
        onOpenChange={() => setSelectedBeach(null)}
      >
        <DialogContent>
          {selectedBeach && (
            <BeachDetails
              beach={selectedBeach}
              onFavoriteToggle={toggleFavorite}
            />
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
