import { useState } from "react";
import { useBeachData } from "@/lib/hooks/useBeachData";
import { LoadingScreen } from "@/components/ui/loading";
import BeachGrid from "@/components/surf/BeachGrid";
import BeachDetails from "@/components/surf/BeachDetails";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Beach } from "@/types/beach";
import { Heart } from "lucide-react";

import Layout from "@/components/layout/Layout";
import { useFavorites } from "@/lib/hooks/useFavorites";

export default function Favorites() {
  const { beaches, loading } = useBeachData();
  const [selectedBeach, setSelectedBeach] = useState<Beach | null>(null);
  const { favorites, toggleFavorite } = useFavorites();

  if (loading) return <LoadingScreen />;

  const favoriteBeachesData = beaches
    .map((beach) => ({
      ...beach,
      isFavorite: favorites.includes(beach.id),
    }))
    .filter((beach) => beach.isFavorite);

  return (
    <Layout>
      <div className="py-6 space-y-6">
        <div className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">חופים מועדפים</h1>
        </div>

        {favoriteBeachesData.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-12 w-12 mx-auto mb-4 text-primary/50" />
            <p className="text-lg text-muted-foreground">
              עדיין לא הוספת חופים מועדפים
            </p>
          </div>
        ) : (
          <BeachGrid
            beaches={favoriteBeachesData}
            onBeachSelect={(beach) => setSelectedBeach(beach)}
            onFavoriteToggle={toggleFavorite}
          />
        )}
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
