import create from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const useAuthStore = create(persist(
  (set) => ({
    user: null,
    error: null,
    loading: false,

    login: async (email, password) => {
      set({ loading: true });
      try {
        const response = await axios.post('http://localhost:8000/api/auth/login', { email, password });
        set({ user: response.data.user, error: null });
      } catch (error) {
        set({ error: error.response ? error.response.data.msg : 'Login failed' });
      } finally {
        set({ loading: false });
      }
    },

    register: async (username, email, password) => {
      set({ loading: true });
      try {
        const response = await axios.post('http://localhost:8000/api/auth/register', { username, email, password });
        set({ user: response.data.user, error: null });
      } catch (error) {
        set({ error: error.response ? error.response.data.msg : 'Registration failed' });
      } finally {
        set({ loading: false });
      }
    },

    logout: () => set({ user: null }),
  }),
  {
    name: 'auth-storage', // unique name for storage
    getStorage: () => localStorage, // use local storage
  }
));

export default useAuthStore;
