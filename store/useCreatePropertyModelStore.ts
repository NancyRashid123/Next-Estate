import { create } from "zustand";


interface CreatePropertyModalState {
    isOpen: boolean;
    openPropertyModal: () => void;
    closePropertyModal: () => void;
}

export const useCreatePropertyModalStore = create<CreatePropertyModalState>((set) => ({
    isOpen: false,
    openPropertyModal: () => set({ isOpen: true }),
    closePropertyModal: () => set({ isOpen: false }),
  }));