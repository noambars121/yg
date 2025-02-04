import { useState, useEffect } from "react";
import { useNotifications } from "@/lib/hooks/useNotifications";
import { Toaster } from "@/components/ui/toaster";
import { LoadingScreen } from "@/components/ui/loading";
import { Onboarding } from "@/components/ui/onboarding";
import BottomNav from "./layout/BottomNav";
import BeachStats from "./surf/BeachStats";
import Header from "./layout/Header";
import RecommendedBeach from "./surf/RecommendedBeach";
import BeachGrid from "./surf/BeachGrid";
import BeachDetails from "./surf/BeachDetails";
import BeachSearch from "./surf/BeachSearch";
import WeatherAlert, { WeatherAlertInfo } from "./surf/WeatherAlert";
import { Beach } from "@/types/beach";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useFavorites } from "@/lib/hooks/useFavorites";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HomeProps {
  initialBeaches?: Beach[];
  userName?: string;
  userAvatar?: string;
  isAuthenticated?: boolean;
}

import { useBeachData } from "@/lib/hooks/useBeachData";

export default function Home({
  userName = "גולש אנונימי",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=surfing",
  isAuthenticated = true,
}: HomeProps) {
  const [selectedBeach, setSelectedBeach] = useState<Beach | null>(null);
  const { favorites, toggleFavorite } = useFavorites();
  const [showDetails, setShowDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"waves" | "wind" | "updated">("waves");

  const [weatherAlerts] = useState<WeatherAlertInfo[]>([
    {
      title: "גלים גבוהים",
      description: "צפויים גלים בגובה 2-3 מטר בחוף הצוק",
      type: "warning",
    },
    {
      title: "תנאים מצוינים",
      description: "תנאים מעולים לגלישה בחוף גורדון",
      type: "info",
    },
  ]);

  const { beaches, loading, refetch } = useBeachData();

  // Force refresh every 5 seconds
  useEffect(() => {
    const interval = setInterval(refetch, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [refetch]);

  useNotifications(beaches);

  const filteredAndSortedBeaches = beaches
    .map((beach) => ({
      ...beach,
      isFavorite: favorites.includes(beach.id),
    }))
    .filter((beach) =>
      beach.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "waves") {
        return parseFloat(b.waveHeight) - parseFloat(a.waveHeight);
      } else if (sortBy === "wind") {
        return parseFloat(b.windSpeed) - parseFloat(a.windSpeed);
      }
      return 0;
    });

  const favoriteBeachesData = filteredAndSortedBeaches.filter(
    (beach) => beach.isFavorite,
  );

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen pb-16 bg-gradient-to-b from-background via-background to-background relative overflow-hidden animated-bg">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-cyan-400/5" />
      <Header
        userName={userName}
        userAvatar={userAvatar}
        isAuthenticated={isAuthenticated}
      />

      <main className="pt-16 container mx-auto px-4 pb-16">
        <div className="py-6 space-y-6">
          <BeachStats beaches={filteredAndSortedBeaches} />
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            <BeachSearch onSearch={setSearchQuery} />
            <Select
              value={sortBy}
              onValueChange={(value: "waves" | "wind" | "updated") =>
                setSortBy(value)
              }
            >
              <SelectTrigger className="w-full sm:w-[180px] h-12 bg-white/10 backdrop-blur-md border-white/20 focus:border-white/40 transition-all duration-300 text-white rounded-2xl">
                <SelectValue placeholder="מיין לפי..." />
              </SelectTrigger>
              <SelectContent className="bg-card/95 backdrop-blur-md border-white/10">
                <SelectItem value="waves" className="focus:bg-white/10">
                  גובה גלים
                </SelectItem>
                <SelectItem value="wind" className="focus:bg-white/10">
                  מהירות רוח
                </SelectItem>
                <SelectItem value="updated" className="focus:bg-white/10">
                  עדכון אחרון
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {weatherAlerts.map((alert, index) => (
            <WeatherAlert key={index} alert={alert} />
          ))}

          <BeachGrid
            beaches={filteredAndSortedBeaches}
            onBeachSelect={(beach) => {
              setSelectedBeach(beach);
              setShowDetails(true);
            }}
            onFavoriteToggle={toggleFavorite}
          />
        </div>
        {favoriteBeachesData.length > 0 && (
          <div className="py-6">
            <h2 className="text-2xl font-bold mb-4">חופים מועדפים</h2>
            <BeachGrid
              beaches={favoriteBeachesData}
              onBeachSelect={(beach) => {
                setSelectedBeach(beach);
                setShowDetails(true);
              }}
              onFavoriteToggle={toggleFavorite}
            />
          </div>
        )}

        <Dialog open={showDetails} onOpenChange={setShowDetails}>
          <DialogContent>
            {selectedBeach && (
              <BeachDetails
                beach={selectedBeach}
                onFavoriteToggle={toggleFavorite}
              />
            )}
          </DialogContent>
        </Dialog>
      </main>
      <Toaster />
      <BottomNav />
      <Onboarding />
    </div>
  );
}
