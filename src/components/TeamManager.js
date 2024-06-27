import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useTeamStore from '../store/teamStore';
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import UserTeams from './UserTeams';

const TeamManager = () => {
  const [title, setTitle] = useState('');
  const [username, setUsername] = useState('');
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { teams, members, fetchMembers, createTeam, addMember } = useTeamStore();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleCreateTeam = async () => {
    await createTeam(title, user.id);
    setTitle('');
  };

  const handleAddMember = async () => {
    await addMember(selectedTeamId, username);
    setUsername('');
  };

  const handleSelectTeam = (teamId) => {
    setSelectedTeamId(teamId);
    fetchMembers(teamId);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 text-center">Team Manager</h2>
      <div className="mt-6">
        <div className="mb-4">
          <label className="block text-gray-700">Team Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
          <button
            onClick={handleCreateTeam}
            className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Create Team
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Add Member by Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
          <button
            onClick={handleAddMember}
            className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            disabled={!selectedTeamId}
          >
            Add Member
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Select Team:</label>
          <select
            onChange={(e) => handleSelectTeam(e.target.value)}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          >
            <option value="">Select a team</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.title}
              </option>
            ))}
          </select>
        </div>

        {selectedTeamId && (
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-700">Team Members</h3>
            <ul className="mt-2">
              {members.map((member) => (
                <li key={member.id} className="mt-1">
                  {member.username}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-6">
        <UserTeams />
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-700">My Teams</h3>
        <ul className="mt-4">
          {teams.map((team) => (
            <li key={team.id} className="mt-2 p-2 bg-gray-100 rounded-md shadow-sm flex justify-between items-center">
              <span>{team.title}</span>
              <Link
                to={`/chat/${user.id}`}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Chat
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeamManager;
