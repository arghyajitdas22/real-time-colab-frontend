import React from 'react';
import { Box, Button, Heading, VStack } from '@chakra-ui/react';

const GroupList = ({ groups, onSelectGroup, selectedGroupId }) => {
  return (
    //make scroll none below
    <Box bg="gray.900" color="white" p={4} h="100%" width={600} >
      <Heading size="lg" mb={4}>Groups</Heading>
      <VStack spacing={3} align="stretch">
        {groups.map((group) => (
          <Button
            key={group.id}
            onClick={() => onSelectGroup(group)}
            w="35%"
            bg={selectedGroupId === group.id ? 'blue.600' : 'gray.700'}
            _hover={{ bg: 'blue.500' }}
            _active={{ bg: 'blue.600' }}
            rounded="md"
            py={4}
            color="white"

          >
            {group.name}
          </Button>
        ))}
      </VStack>
    </Box>
  );
};

export default GroupList;
