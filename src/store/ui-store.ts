'use client';

import { create } from 'zustand';

type UiState = {
  isMobileNavOpen: boolean;
  isCommandOpen: boolean;
  openMobileNav: () => void;
  closeMobileNav: () => void;
  toggleMobileNav: () => void;
  setCommandOpen: (open: boolean) => void;
};

/**
 * Tiny global UI store — intentionally scoped to ephemeral UI concerns only.
 * Server state lives in TanStack Query, business state in feature-local stores.
 */
export const useUiStore = create<UiState>((set) => ({
  isMobileNavOpen: false,
  isCommandOpen: false,
  openMobileNav: () => set({ isMobileNavOpen: true }),
  closeMobileNav: () => set({ isMobileNavOpen: false }),
  toggleMobileNav: () => set((s) => ({ isMobileNavOpen: !s.isMobileNavOpen })),
  setCommandOpen: (open) => set({ isCommandOpen: open }),
}));
