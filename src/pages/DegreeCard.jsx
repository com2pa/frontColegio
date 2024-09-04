import { DeleteIcon } from '@chakra-ui/icons';
import {  Button, ButtonGroup, Card, Flex, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, } from '@chakra-ui/react';
import { useState } from 'react';


// import React, { useState } from 'react';

export const DegreeCard = ({degree,handleDeleteDegree}) => {
  const [isInputActive, ]= useState(false);
  const [degreee ,setDegree]= useState(degree.degree);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
    
      <Card key={degree.id} mt={5} p={7} >
        <Flex justifyContent={{md:'space-evenly'}}  > 
          {/* <Input 
            type='number'
            value={degreee}
            borderWidth={isInputActive ?'2px' : '0px'}
            onChange={({target})=>setDegree(target.value)}        
          /> */}
          <Text>{degree.degree}° Grado</Text>
          <Flex>
            <ButtonGroup>
              <IconButton 
                icon={<DeleteIcon/>}
                //   onClick={()=>handleDeleteDegree(degree)}
                onClick={onOpen}
              />

            </ButtonGroup>
          </Flex>
        </Flex>

      </Card>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>¡ Advertencia !</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text>¿Estas seguro de eliminar el grado de {degree.degree}?</Text>
          </ModalBody>

          <ModalFooter>
            <Button 
              colorScheme='blue' 
              mr={3}
              onClick={() => handleDeleteDegree(degree)}
            >
                Borrar
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};


export default DegreeCard;