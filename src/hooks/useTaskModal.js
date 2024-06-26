import { create } from "zustand";

const useTaskModal = create((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () =>
    set({
      isOpen: false,
      mode: "create",
      status: "todo",
      content: "",
      dueDate: new Date(),
    }),
  mode: "edit",
  toogleMode: (mode) => set({ mode: mode }),
  status: "todo",
  setStatus: (status) => set({ status: status }),
  content: "",
  setContent: (content) => set({ content: content }),
  dueDate: new Date(),
  setDueDate: (date) => set({ dueDate: date }),
}));

export default useTaskModal;
