import React, { useState } from 'react';
import SidebarWithHeader from '../pagesPrivate/LayoutPrivate/SidebarWithHeader';
import { Button, ButtonGroup, Flex,  Heading,  IconButton, } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import FormRegistrationStudent from './FormRegistrationStudent';

export const StudentRegistration = ({handleAddStudent}) => {
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
     
      {showCard.map((_, index)=>(
        
        <FormRegistrationStudent 
          key={index}
          handleAddStudent={handleAddStudent}
        
        />
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
  
    </SidebarWithHeader>
  );
};

export default StudentRegistration;
