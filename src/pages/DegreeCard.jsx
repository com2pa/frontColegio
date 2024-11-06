import { DeleteIcon } from '@chakra-ui/icons';
import {  Button, ButtonGroup, Card, Flex, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, } from '@chakra-ui/react';


export const DegreeCard = ({degree,handleDeleteDegree}) => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
    
      <Card 
        key={degree.id} 
        // mt={5} 
        p={7}
        w='100%'
        bgGradient={'linear(to-l, #6066FA, yellow)'}
       
      >
        <Flex 
          justifyContent='space-between'
          alignItems='center'
         
          
        > 
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
                color="white"
                bg="red.600"
              />

            </ButtonGroup>
          </Flex>
        </Flex>

      </Card>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={'2rem'}
            fontWeight={'bold'}
            color={'red'}
            shadow={'dark-lg'}
            textAlign={'center'}

          >¡ Advertencia !</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text
              fontSize={'1.2rem'}
              fontWeight={'bold'}
              textAlign={'center'}
              mt={4}

            >¿Estas seguro de eliminar el grado de {degree.degree}?</Text>
          </ModalBody>

          <ModalFooter>
            <Button 
              colorScheme='green' 
              mr={3}
              onClick={() => handleDeleteDegree(degree)}
            >
                Borrar
            </Button>
            <Button 
              onClick={onClose}
              colorScheme='red'
            >Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};


export default DegreeCard;