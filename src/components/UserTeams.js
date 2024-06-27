import React, { useEffect } from 'react';
import useTeamStore from '../store/teamStore';

const UserTeams = () => {
  const { teams, fetchTeams } = useTeamStore();
  const userId = JSON.parse(localStorage.getItem('user'))?.id;

  useEffect(() => {
    if (userId) {
      fetchTeams(userId);
    }
  }, [fetchTeams, userId]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 text-center">My Teams</h2>
      <ul className="mt-6">
        {teams.map((team) => (
          <li key={team.id} className="mt-2 p-2 bg-gray-100 rounded-md shadow-sm">
            {team.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserTeams;
