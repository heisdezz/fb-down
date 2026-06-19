import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  /** True once the Facebook WebView session is established. */
  isLoggedIn: boolean;
  /** Last time the session was confirmed valid (epoch ms). */
  lastVerifiedAt: number | null;
  setLoggedIn: (loggedIn: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      lastVerifiedAt: null,
      setLoggedIn: (loggedIn) =>
        set({
          isLoggedIn: loggedIn,
          lastVerifiedAt: loggedIn ? Date.now() : null,
        }),
      logout: () => set({ isLoggedIn: false, lastVerifiedAt: null }),
    }),
    {
      name: "fb-auth",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
