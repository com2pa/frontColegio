import { Card, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react';
import React from 'react';

export const FormRegistrationStudent = () => {
  return (
    <Card >
      <FormControl>
        <Flex flexDir={{base:'column',md:'row'}} p={{base:15}} gap={{base:4}}>
           
          <FormControl>
            <Flex flexDir={{base:'column', }}>
              <FormLabel fontSize={{base:12}} w="100%">Nombre Primer Niño/a </FormLabel>
              <Input 
                placeholder="Ingrese nombre del alumno"
                size="sm"
              />
            </Flex>
          </FormControl>
            
            
          <FormControl>
            <Flex flexDir={{base:'column'}}>
              <FormLabel fontSize={{base:12}} w="100%">Apellido del Primer Niño/a</FormLabel>
              <Input 
                placeholder="Ingrese apellido del alumno"
                size="sm" 
              />
            </Flex>
          </FormControl>
            
        </Flex>         
        <Flex flexDir={{base:'column',md:'row'}} p={{base:15}} gap={{base:4}}>
          <FormControl>
            <Flex flexDir={{base:'column',}}>
              <FormLabel fontSize={{base:12}} w="100%">Sexo </FormLabel>
              <Input 
                type='text' 
                placeholder="ingrese el sexo" 
                size="sm"    
              />
            </Flex>
          </FormControl>
           
          <FormControl>
            <Flex flexDir={{base:'column',}}>
              <FormLabel fontSize={{base:12}} w="100%">Edad</FormLabel>
              <Input 
                type='number' 
                placeholder="Ingrese edad del alumno" 
                size="sm"
              />
            </Flex>
          </FormControl>
        </Flex>
        <Flex flexDir={{base:'column',md:'row'}} p={{base:15}} gap={{base:4}}>
          <FormControl>
            <Flex flexDir={'column'}>
              <FormLabel 
                fontSize={{base:12}} 
                w="100%"
                display={'flex'}
                justifyContent={'center'}
              >Grado del Primer niño/a</FormLabel>
              <Input placeholder="ingrese el grado" />
            </Flex>
          </FormControl>
        </Flex> 
      </FormControl>
    </Card>
  );
};

export default FormRegistrationStudent;
