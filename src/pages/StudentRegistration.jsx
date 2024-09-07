import React, { useState } from 'react';
import SidebarWithHeader from '../pagesPrivate/LayoutPrivate/SidebarWithHeader';
import { Button, ButtonGroup, Card, Flex, FormControl, FormLabel, Heading, Icon, IconButton, Input,  } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import FormRegistrationStudent from './FormRegistrationStudent';

export const StudentRegistration = () => {
  const [numHijos ,setNumHijos]= useState(0);

  const [showCard, setShowCard] =  useState([]);

  const handleAddIconClick = () => {
    setShowCard([...showCard,true]);
  };
 
  return (
    <SidebarWithHeader>
      <Flex 
        justifyContent={{base:'center',md:'center'}}
        p={{base:'1rem',md:'1rem'}}
      >
        <Heading>Inscripcion</Heading>
      </Flex>      
      {/* <Card >
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
      </Card> */}
      {showCard.map((_, index)=>(
        <FormRegistrationStudent key={index}/>
      ))}
    

      <Flex
        justifyContent={'end'}
      >
        <ButtonGroup>
          <Button>Obtener Planilla </Button>  
          <IconButton 
            icon={<AddIcon/> }
            onClick={handleAddIconClick}
          />
        </ButtonGroup>
      </Flex>
      <Flex 
        justifyContent={{base:'center',md:'center'}}
        p={{base:'1rem',md:'1rem'}}
      >
        <Button size="md" colorScheme="blue">Enviar</Button>
      </Flex>
        
  
    </SidebarWithHeader>
  );
};

export default StudentRegistration;
