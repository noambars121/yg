import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesStore {
  favorites: string[];
  toggleFavorite: (beachId: string) => void;
  isFavorite: (beachId: string) => boolean;
}

export const useFavorites = create<FavoritesStore>(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (beachId) =>
        set((state) => ({
          favorites: state.favorites.includes(beachId)
            ? state.favorites.filter((id) => id !== beachId)
            : [...state.favorites, beachId],
        })),
      isFavorite: (beachId) => get().favorites.includes(beachId),
    }),
    {
      name: "favorites-storage",
    },
  ),
);
