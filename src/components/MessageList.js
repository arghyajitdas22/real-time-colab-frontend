import React, { useEffect } from 'react';
import useMessageStore from '../store/messageStore';

const MessageList = ({ from, to }) => {
  const { messages, fetchMessages } = useMessageStore();

  useEffect(() => {
    fetchMessages(from, to);
  }, [from, to, fetchMessages]);

  return (
    <div className="flex flex-col space-y-2 p-4 bg-gray-100 rounded-lg overflow-y-scroll h-64">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`p-2 rounded-lg ${msg.fromSelf ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 self-start'}`}
        >
          {msg.message}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
