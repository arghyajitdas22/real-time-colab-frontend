import React, { useEffect, useState } from 'react';
import api from '../api'; // Import your axios instance

const TeamsList = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await api.get('/team/allteam', {headers: {
          'Authorization': `Bearer ${token}`
        }});
        setTeams(response.data.teams);
        console.log(response.data.teams.first_name)
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, []);

  return (
    <div>
      <h1>Teams</h1>
      {teams.map((team) => (
        <div key={team.id}>
          <h2>{team.title}</h2>
          <ul>
            {team.members.map((member) => (
              <li key={member.id}>{member.first_name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TeamsList;
