import { Button, ButtonGroup, Card, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react';
import React from 'react';
import { LuNewspaper } from 'react-icons/lu';

export const ListNote = () => {


  return (
    <Card>
      <Flex
        w="100%"
        p={8}
        gap={8}
      >
        <Flex
          w="50%"
         
        >

          <FormControl>
            <FormLabel>Alumno :</FormLabel>
            <Input 
              type="text" 
              placeholder="Ingrese la Asignatura" 
            />
          </FormControl>
        </Flex>
        <Flex
          w="50%"
         
        >

          <FormControl>
            <FormLabel>Tema:</FormLabel>
            <Input 
              type="text" 
              placeholder="Ingrese la Asignatura" 
            />
          </FormControl>
        </Flex>
      </Flex>

      <Flex
        w="100%"
        p={8}
        gap={8}
      >
        <Flex
          w="50%"
         
        >

          <FormControl>
            <FormLabel>Asignatura :</FormLabel>
            <Input 
              type="text" 
              placeholder="Ingrese la Asignatura" 
            />
          </FormControl>
        </Flex>
        <Flex
          w="50%"
         
        >

          <FormControl>
            <FormLabel>Actividad:</FormLabel>
            <Input 
              type="text" 
              placeholder="Ingrese la Asignatura" 
            />
          </FormControl>
        </Flex>
      </Flex>
      <Flex
        w="100%"
        p={8}
        gap={8}
                    
        
      >
      

        <FormControl>
          <Flex
            flexDir={{sm:'row',md:'row'}}
            justifyContent={'center'}
          >
            <FormLabel>Nota :</FormLabel>
            <Input 
              type="Number" 
              placeholder="nota"
              width="25" 
            />
          </Flex> 
        </FormControl>
      </Flex>
      <ButtonGroup>    
        <Button
          bgColor={'yellow'}   
          variant="ghost"
          w={'100%'}
          leftIcon={<LuNewspaper  />}
        >Agregar</Button>
      </ButtonGroup>
      

    </Card>
  );
};
export default ListNote;
