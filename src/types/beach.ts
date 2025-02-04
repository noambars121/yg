export interface RecommendedTime {
  time: string;
  quality: "poor" | "fair" | "good" | "excellent";
  reason: string;
}

export interface Beach {
  id: string;
  name: string;
  waveHeight: string;
  windSpeed: string;
  temperature?: string;
  waterTemp?: string;
  forecast?: {
    time: string;
    waveHeight: string;
    windSpeed: string;
  }[];
  crowdLevel?: "low" | "medium" | "high";
  lastUpdated?: string;
  isFavorite?: boolean;
  recommendedTimes?: RecommendedTime[];
  rating?: number;
  reviews?: {
    rating: number;
    text: string;
    author: string;
    date: string;
  }[];
  images?: string[];
}
