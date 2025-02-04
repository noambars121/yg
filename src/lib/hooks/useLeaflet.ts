import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export function useLeaflet(
  container: HTMLDivElement | null,
  center: number[],
  zoom: number,
) {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!container) return;

    const map = L.map(container).setView(center, zoom);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
    };
  }, [container, center, zoom]);

  return mapRef;
}
