import { useState, useEffect } from "react";
import { Beach } from "@/types/beach";

const POLLING_INTERVAL = 30000; // Update every 30 seconds

const ISRAEL_BEACHES = [
  // תל אביב צפון
  { id: "1", name: "חוף הצוק צפון" },
  { id: "2", name: "חוף הצוק דרום" },
  { id: "3", name: "חוף תל ברוך צפון" },
  { id: "4", name: "חוף תל ברוך דרום" },
  { id: "5", name: "חוף מנדרין" },

  // תל אביב מרכז
  { id: "6", name: "חוף הילטון" },
  { id: "7", name: "חוף גורדון" },
  { id: "8", name: "חוף פרישמן" },
  { id: "9", name: "חוף מציצים" },
  { id: "10", name: "חוף בוגרשוב" },
  { id: "11", name: "חוף ירושלים" },
  { id: "12", name: "חוף אביב" },
  { id: "13", name: "חוף צ'רלס קלור" },
  { id: "14", name: "חוף הדולפינריום" },

  // תל אביב דרום ויפו
  { id: "15", name: "חוף גבעת העלייה" },
  { id: "16", name: "חוף יפו" },
  { id: "17", name: "חוף מרידיאן" },
  { id: "18", name: "חוף סי אנד סאן" },

  // הרצליה
  { id: "19", name: "חוף הרצליה" },
  { id: "20", name: "חוף אכדיה צפון" },
  { id: "21", name: "חוף אכדיה דרום" },
  { id: "22", name: "חוף סידני עלי" },
  { id: "23", name: "חוף השרון" },
  { id: "24", name: "חוף זבולון" },
  { id: "25", name: "חוף הנכים" },
];

import {
  getWavePattern,
  getWindPattern,
  getTemperaturePattern,
  predictCrowdLevel,
} from "../utils/waveSimulation";

export function useBeachData() {
  const [beaches, setBeaches] = useState<Beach[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBeachData = async () => {
    try {
      const now = new Date();
      const currentHour = now.getHours();

      const data = ISRAEL_BEACHES.map((beach) => {
        // Base values unique to each beach
        const baseWaveHeight = 1 + Math.sin(parseFloat(beach.id) * 0.5) * 0.5;
        const baseWindSpeed = 10 + Math.cos(parseFloat(beach.id) * 0.3) * 3;
        const baseTemp = 25 + Math.sin(parseFloat(beach.id) * 0.2) * 2;

        // Get current conditions using patterns
        const waveHeight = getWavePattern(currentHour, baseWaveHeight);
        const windSpeed = getWindPattern(currentHour, baseWindSpeed);
        const temperature = getTemperaturePattern(currentHour, baseTemp);

        // Generate forecast
        const forecast = Array.from({ length: 8 }, (_, i) => {
          const forecastHour = (currentHour + i * 3) % 24;
          return {
            time: `${forecastHour.toString().padStart(2, "0")}:00`,
            waveHeight:
              getWavePattern(forecastHour, baseWaveHeight).toFixed(1) + "m",
            windSpeed:
              Math.round(getWindPattern(forecastHour, baseWindSpeed)) + ' קמ"ש',
          };
        });

        // Generate recommended times
        const recommendedTimes = [
          {
            time: "06:00-09:00",
            quality: waveHeight > 1.5 ? "excellent" : "good",
            reason: "גלים נוחים ורוח מתונה בשעות הבוקר",
          },
          {
            time: "15:00-17:00",
            quality: windSpeed < 15 ? "good" : "fair",
            reason: "תנאים טובים אחר הצהריים",
          },
          {
            time: "17:00-19:00",
            quality: temperature > 25 ? "fair" : "good",
            reason: "שעות הערב הנעימות",
          },
        ] as const;

        // Simulated Google reviews
        const reviews = [
          {
            rating: 4,
            text: "חוף מעולה לגלישה, תנאים מצוינים בבוקר",
            author: "רון כהן",
            date: "לפני שבוע",
          },
          {
            rating: 5,
            text: "המקום האהוב עליי לגלישה",
            author: "מאיה לוי",
            date: "לפני חודש",
          },
        ];

        // Beach images
        const images = [
          "https://images.unsplash.com/photo-1505459668311-8dfac7952bf0",
          "https://images.unsplash.com/photo-1502680390469-be75c86b636f",
          "https://images.unsplash.com/photo-1520942702018-0862200e6873",
        ];

        return {
          ...beach,
          waveHeight: waveHeight.toFixed(1) + "m",
          windSpeed: Math.round(windSpeed) + ' קמ"ש',
          temperature: Math.round(temperature) + "°C",
          waterTemp: (temperature - 3).toFixed(1) + "°C",
          crowdLevel: predictCrowdLevel(currentHour, waveHeight, temperature),
          lastUpdated: "עכשיו",
          forecast,
          recommendedTimes,
          rating: 4.5,
          reviews,
          images,
        };
      });

      setBeaches(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch beach data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBeachData();
    const interval = setInterval(fetchBeachData, POLLING_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return { beaches, loading, error, refetch: fetchBeachData };
}
