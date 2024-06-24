import React, { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import GroupList from '../components/GroupList';
import ChatWindow from '../components/ChatWindow';
import Projectlayout from "../components/common/layouts/Project.layout";

const ProjectChat = () => {

  const [groups] = useState([
    { id: 1, name: 'Project A' },
    { id: 2, name: 'Project B' },
    { id: 3, name: 'Project C' },
  ]);
  const [selectedGroup, setSelectedGroup] = useState(null);
 
  return (
    <Projectlayout>
        <Flex direction="column" minH="90vh">
      <Box bg="blue.700" color="white" p={4}>
        <Box fontSize="2xl">Team Chat</Box>
      </Box>
      <Flex flexGrow={1} overflow="hidden">
        <Box w={{ base: '100%', md: '25%' }} borderRight="1px" borderColor="gray.700" overflowY="auto">
          <GroupList
            groups={groups}
            onSelectGroup={setSelectedGroup}
            selectedGroupId={selectedGroup ? selectedGroup.id : null}
          />
        </Box>
        <Box w={{ base: '100%', md: '75%' }} overflow="hidden">
          {selectedGroup ? (
            <ChatWindow group={selectedGroup} />
          ) : (
            <Flex align="center" justify="center" h="100%">
              <Box fontSize="lg">Select a group to start chatting</Box>
            </Flex>
          )}
        </Box>
      </Flex>
    </Flex>
    </Projectlayout>
  );
};

export default ProjectChat;
