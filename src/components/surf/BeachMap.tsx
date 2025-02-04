import { useEffect, useRef, useState } from "react";
import { MapPin, Navigation2, Loader2 } from "lucide-react";
import { Card } from "../ui/card";
import { useMapbox } from "@/lib/hooks/useMapbox";
import { useGeolocation } from "@/lib/hooks/useGeolocation";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface BeachLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  waveHeight: string;
  windSpeed: string;
}

interface BeachMapProps {
  locations?: BeachLocation[];
  onLocationSelect?: (location: BeachLocation) => void;
}

export default function BeachMap({
  locations = [
    {
      id: "1",
      name: "חוף הצוק",
      lat: 32.1234,
      lng: 34.7891,
      waveHeight: "1.5m",
      windSpeed: '12 קמ"ש',
    },
    {
      id: "2",
      name: "חוף גורדון",
      lat: 32.0834,
      lng: 34.7677,
      waveHeight: "0.8m",
      windSpeed: '8 קמ"ש',
    },
  ],
  onLocationSelect = () => {},
}: BeachMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { location } = useGeolocation();
  const map = useMapbox(
    mapContainerRef.current,
    [34.8, 32.0], // Center of Israel's coast (lng, lat)
    9.5, // Zoom level to show most of Israel's coastline
  );

  useEffect(() => {
    if (!map.current) return;

    // Store markers to clean up
    const markers: mapboxgl.Marker[] = [];

    // Add markers for each location
    locations.forEach((location) => {
      const markerElement = document.createElement("div");
      markerElement.className =
        "w-8 h-8 rounded-full bg-primary hover:bg-primary/90 transition-all hover:scale-110 shadow-lg flex items-center justify-center cursor-pointer";
      markerElement.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>';

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<div class="p-2 text-black"><strong>${location.name}</strong><br/>גלים: ${location.waveHeight}<br/>רוח: ${location.windSpeed}</div>`,
      );

      const marker = new mapboxgl.Marker({ element: markerElement })
        .setLngLat([location.lng, location.lat])
        .setPopup(popup)
        .addTo(map.current);

      markerElement.addEventListener("click", () => {
        onLocationSelect(location);
      });

      markers.push(marker);
    });

    return () => {
      markers.forEach((marker) => marker.remove());
    };
  }, [locations, map.current]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleLocationClick = () => {
    if (location && map.current) {
      map.current.flyTo({
        center: [location.lng, location.lat],
        zoom: 13,
        duration: 2000,
      });
    }
  };

  return (
    <Card className="w-full h-[400px] relative overflow-hidden border border-white/5 shadow-[0_0_25px_rgba(139,92,246,0.2)] bg-gradient-to-br from-card/80 to-card/60 rounded-3xl">
      <div ref={mapContainerRef} className="w-full h-full" />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      )}

      <TooltipProvider>
        {locations.map((location) => (
          <div
            key={location.id}
            className="map-marker"
            data-lat={location.lat}
            data-lng={location.lng}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Tooltip>
              <TooltipTrigger>
                <div
                  onClick={() => onLocationSelect(location)}
                  className="w-8 h-8 rounded-full bg-primary hover:bg-primary/90 transition-all hover:scale-110 shadow-lg flex items-center justify-center cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                >
                  <MapPin className="h-4 w-4 text-white" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div className="text-sm">
                  <p className="font-bold">{location.name}</p>
                  <p>גלים: {location.waveHeight}</p>
                  <p>רוח: {location.windSpeed}</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
        ))}
      </TooltipProvider>

      {location && (
        <div className="absolute top-4 right-4">
          <Button
            variant="secondary"
            size="sm"
            className="shadow-lg"
            onClick={handleLocationClick}
          >
            <Navigation2 className="h-4 w-4 mr-2" />
            מצא חופים קרובים
          </Button>
        </div>
      )}
    </Card>
  );
}
