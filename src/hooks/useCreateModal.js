import { create } from "zustand";

const useCreateModal = create((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  type: "task",
  toogleType: (type) => set({ type: type }),
}));

export default useCreateModal;
