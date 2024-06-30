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
  mode: "create",
  toogleMode: (mode) => set({ mode: mode }),
  status: "TO_DO",
  setStatus: (status) => set({ status: status }),
  content: "",
  setContent: (content) => set({ content: content }),
  dueDate: new Date(),
  setDueDate: (date) => set({ dueDate: date }),
  task_id: null,
  setTaskId: (id) => set({ task_id: id }),
}));

export default useTaskModal;
