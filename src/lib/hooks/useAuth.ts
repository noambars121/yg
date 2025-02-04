import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  username: string;
  avatar?: string;
  preferences?: {
    notifications: boolean;
    vibration: boolean;
    darkMode: boolean;
    language: "he" | "en";
  };
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string) => void;
  logout: () => void;
  updatePreferences: (preferences: Partial<User["preferences"]>) => void;
}

export const useAuth = create<AuthStore>(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (username) =>
        set({
          user: {
            id: Math.random().toString(36).substr(2, 9),
            username,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
            preferences: {
              notifications: true,
              vibration: true,
              darkMode: true,
              language: "he",
            },
          },
          isAuthenticated: true,
        }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updatePreferences: (preferences) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                preferences: { ...state.user.preferences, ...preferences },
              }
            : null,
        })),
    }),
    {
      name: "auth-storage",
    },
  ),
);
