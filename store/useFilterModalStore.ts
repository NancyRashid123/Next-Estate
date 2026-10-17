import { create } from "zustand";


interface FilterModalState {
    isOpen: boolean;
    openFilterModal: () => void;
    closeFilterModal: () => void;
}
export const useFilterModalStore = create<FilterModalState>((set) => ({
    isOpen: false,
    openFilterModal: () => set({ isOpen: true }),
    closeFilterModal: () => set({ isOpen: false }),
}))