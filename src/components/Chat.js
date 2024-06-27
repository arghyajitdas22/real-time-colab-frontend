import React from 'react';
import { useParams } from 'react-router-dom';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import useAuthStore from '../store/authStore';

const Chat = () => {
  const { user } = useAuthStore();
  const { teamId } = useParams();

  // Ensure user is defined before accessing user.id
  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 text-center">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 text-center">Chat</h2>
      {teamId && (
        <>
          <MessageList from={user.id} to={teamId} />
          <MessageInput from={user.id} to={teamId} />
        </>
      )}
    </div>
  );
};

export default Chat;
