import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || "";

export function useMapbox(
  container: HTMLDivElement | null,
  center: [number, number],
  zoom: number,
) {
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!container || !MAPBOX_TOKEN) return;

    // Initialize Mapbox
    mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container,
      style: "mapbox://styles/mapbox/navigation-night-v1",
      center,
      zoom,
      attributionControl: false,
    });

    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    mapRef.current = map;

    return () => {
      map.remove();
    };
  }, [container, center, zoom]);

  return mapRef;
}
