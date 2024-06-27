import create from 'zustand';
import axios from 'axios';
import { persist } from 'zustand/middleware';

const useMessageStore = create(
  persist(
    (set) => ({
      messages: [],
      fetchMessages: async (from, to) => {
        try {
          const response = await axios.post('http://localhost:8000/api/messages/getmsg/', { from, to });
          set({ messages: response.data });
        } catch (error) {
          console.error(error);
        }
      },
      addMessage: async (from, to, message) => {
        try {
          await axios.post('http://localhost:8000/api/messages/addmsg/', { from, to, message });
          set((state) => ({
            messages: [...state.messages, { fromSelf: true, message }],
          }));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    {
      name: 'message-store', 
    }
  )
);

export default useMessageStore;
