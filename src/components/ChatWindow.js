import React, { useState } from 'react';
import { Box, Button, Flex, Input, Text, VStack } from '@chakra-ui/react';

const ChatWindow = ({ group }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'User1', text: 'Hello!' },
    { sender: 'User2', text: 'Hi!' },
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { sender: 'You', text: message }]);
      setMessage('');
    }
  };

  return (
    <Flex direction="column" h="100%" bg="gray.50" >
      <Box bg="white" p={4} shadow="md" borderBottom="1px" borderColor="gray.200">
        <Text fontSize="xl" fontWeight="bold">{group.name}</Text>
      </Box>
      <Box flexGrow={1} p={4} overflowY="auto">
        <VStack spacing={4} align="stretch">
          {messages.map((msg, index) => (
            <Box
              key={index}
              bg={msg.sender === 'You' ? 'blue.100' : 'white'}
              p={3}
              rounded="md"
              alignSelf={msg.sender === 'You' ? 'flex-end' : 'flex-start'}
              shadow="sm"
              maxWidth="70%"
            >
              <Text fontWeight="bold">{msg.sender}</Text>
              <Text>{msg.text}</Text>
            </Box>
          ))}
        </VStack>
      </Box>
      <Flex p={4} bg="white" borderTop="1px" borderColor="gray.200">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          mr={2}
          bg="gray.100"
          border="none"
          _focus={{ bg: 'gray.200' }}
        />
        <Button onClick={handleSendMessage} colorScheme="blue">
          Send
        </Button>
      </Flex>
    </Flex>
  );
};

export default ChatWindow;
