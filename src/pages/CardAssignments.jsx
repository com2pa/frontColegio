import { Button, ButtonGroup, Card,  Flex, Text } from '@chakra-ui/react';
import React from 'react';

export const CardAssignments = ({assignment,handleDelete}) => {
//   console.log('Assignment.....', assignment);
  return (
    <>      
      <Card
        maxW={"100%"}
        w={"100%"}
        borderRadius={8}
        boxShadow="lg"
        bg={"white"}
        overflow="hidden"
        p={8}
        mb={4}
      >
      
     
        <Flex
          w={"100%"}
          gap={4}
        // flexDir="column"
        // justifyContent="space-between"
        // flexDirection={{ base: 'column', md: 'row' }}    
        >
       
      
          <Flex
            w={"50%"}
          >
        
            <Text>Grado: {assignment.degree}</Text>        
          </Flex>
          <Flex
            w={"50%"}
          >
            <Text>Lapso: {assignment.lapso}</Text>
          </Flex>
        </Flex>
        {/* <Divider
        borderColor="gray.200"
        w={"100%"}
        my={3}
        borderStyle="solid"
        borderTopWidth={1}
        borderBottomWidth={1}
        borderLeftWidth={0}
        borderRightWidth={0}
        flexBasis="auto"
      /> */}
        <Flex
          w={"100%"}
          gap={8}
          flexDir="column"
          justifyContent="space-between"
          flexDirection={{ base: 'column', md: 'row' }}
        >
          <Flex
            w={"50%"}
          >
            <Text>Asignatura: {assignment.subjects}</Text>        
          </Flex>
       
        </Flex>
        <Flex
          w={"100%"}
          gap={8}
          flexDir="column"
          justifyContent="space-between"
          flexDirection={{ base: 'column', md: 'row' }}
        >
       
      
          <Flex
            w={"50%"}
          >
        
            <Text>Tema: {assignment.name}</Text>        
          </Flex>
          <Flex
            w={"50%"}
          >
            <Text>Actidad: {assignment.tipo}</Text>
          </Flex>
        </Flex>
        <Flex
          w={"100%"}
          gap={8}
          flexDir="column"
          justifyContent="center"
          flexDirection={{ base: 'column', md: 'row' }}

        >
       
      
          {/* <Flex
            w={"50%"}
          >
        
            <Text>Tema: {assignment.name}</Text>        
          </Flex>
          <Flex
            w={"50%"}
          >
            <Text>Actidad: {assignment.tipo}</Text>
          </Flex> */}
          <ButtonGroup>
            <Button 
              onClick={() => handleDelete(assignment.id)}
              colorScheme="red"
              size="sm"
              isDisabled={assignment.isAssigned}
            >Borrar</Button>          
          </ButtonGroup>
        </Flex>
      </Card>
    </>
  );
};

export default CardAssignments;