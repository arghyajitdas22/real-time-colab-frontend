import React, { useState } from 'react';
import useMessageStore from '../store/messageStore';

const MessageInput = ({ from, to }) => {
  const [message, setMessage] = useState('');
  const { addMessage } = useMessageStore();

  const handleSendMessage = async () => {
    if (message.trim()) {
      await addMessage(from, to, message);
      setMessage('');
    }
  };

  return (
    <div className="flex items-center space-x-2 mt-4">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
        placeholder="Type a message..."
      />
      <button
        onClick={handleSendMessage}
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
