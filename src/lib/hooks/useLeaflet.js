import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export function useLeaflet(container, center, zoom) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!container) return;

    const map = L.map(container, {
      minZoom: 7,
      maxZoom: 13,
      maxBounds: [
        [29.5, 33], // Southwest coordinates
        [33.5, 36], // Northeast coordinates
      ],
    }).setView(center, zoom);

    L.tileLayer(
      "https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=YOUR_MAPTILER_KEY",
      {
        attribution:
          '\u003ca href="https://www.maptiler.com/copyright/" target="_blank"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href="https://www.openstreetmap.org/copyright" target="_blank"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e',
        maxZoom: 20,
      },
    ).addTo(map);

    // Custom marker icon
    const markerIcon = L.divIcon({
      className: "custom-marker",
      html: '<div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg transform -translate-x-1/2 -translate-y-1/2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg></div>',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    mapRef.current = map;

    return () => {
      map.remove();
    };
  }, [container, center, zoom]);

  return mapRef;
}
