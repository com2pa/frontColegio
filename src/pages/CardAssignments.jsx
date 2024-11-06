import { Button,Card,List,} from '@chakra-ui/react';
import React from 'react';

export const CardAssignments = ({assignment,handleDelete}) => {
  // console.log('Assignment.....', assignment);
  return (
    <>      
      {/* <Card
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
          <ButtonGroup>
            <Button 
              onClick={() => handleDelete(assignment.id)}
              colorScheme="red"
              size="sm"
              isDisabled={assignment.isAssigned}
            >Borrar</Button>          
          </ButtonGroup>
        </Flex>
      </Card> */}
      <Card
        // maxW={"100%"}
        w={"100%"}
        borderRadius={8}
        boxShadow="lg"
        mt={4}
        p={4}
        bgGradient={'linear(to-l, #6066FA, yellow)'}
        
      >
        <List>
          <li 
            key={assignment._id}
          >
            <p>Tema:{assignment.name}</p>
            <p>Tipo: {assignment.tipo}</p>
            <p>Lapso: {assignment.lapso}</p>
            <p>Grado: {assignment.degree.degree}</p>
            <p>Asignatura: {assignment.subjects.name}</p>
          </li>
        </List>
        <Button 
          onClick={() => handleDelete(assignment._id)}
          colorScheme="red"
          size="sm"
          isDisabled={assignment.isAssigned}
          
        >Borrar</Button>
      </Card>
    </>
  );
};

export default CardAssignments;