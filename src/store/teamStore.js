import create from 'zustand';
import axios from 'axios';
import { persist } from 'zustand/middleware';

const useTeamStore = create(
  persist(
    (set) => ({
      teams: [],
      members: [],
      fetchTeams: async (userId) => {
        try {
          const response = await axios.get(`http://localhost:8000/api/team/${userId}/teams`);
          set({ teams: response.data.teams });
        } catch (error) {
          console.error(error);
        }
      },
      fetchMembers: async (teamId) => {
        try {
          const response = await axios.get(`http://localhost:8000/api/team/${teamId}/members`);
          set({ members: response.data.members });
        } catch (error) {
          console.error(error);
        }
      },
      createTeam: async (title, creatorId) => {
        try {
          const response = await axios.post('http://localhost:8000/api/team/create', { title, creatorId });
          set((state) => ({
            teams: [...state.teams, response.data.team],
          }));
        } catch (error) {
          console.error(error);
        }
      },
      addMember: async (teamId, username) => {
        try {
          const response = await axios.post('http://localhost:8000/api/team/add-member', { teamId, username });
          set((state) => ({
            members: [...state.members, response.data.teamMember],
          }));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    {
      name: 'team-store', // unique name for local storage key
    }
  )
);

export default useTeamStore;
