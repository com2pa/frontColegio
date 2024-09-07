import { DeleteIcon } from '@chakra-ui/icons';
import { Button, ButtonGroup, Card, Checkbox, CheckboxGroup, Flex, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, useDisclosure, useToast,  } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ImPencil2 } from 'react-icons/im';


export const ListSubjects = ({subject,handleDelete,handleEditSubject}) => {
  
  const [name , setName]=useState(subject.name);
  const [isInputActive, setIsInputActive]=useState(false);
  const [degree,setDegree] =useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDegree,setSelectedDegrees]=useState([]);
  const toast=useToast()

  const handleEdit=()=>{
    if(!isInputActive){
      setIsInputActive(true);
    }else{
      // console.log('Nombre antes: ',subject);
      const handlEditando={...subject, name:name}; 
      // actualizar la lista
      if(handleEditSubject !== subject){
        // console.log('despues ** ', handlEditando);
        handleEditSubject(handlEditando);
      }

      setIsInputActive(false); 
    }
  };
  // mostrando todos los grados
  useEffect(()=>{
    const fetchDegree =async()=>{
      
      try {
        const response = await axios.get('/api/degrees');
        setDegree(response.data);
        // console.log('grados: ',response.data);        
      } catch (error) {
        console.log(error);
        
      }
    };
    fetchDegree();
  },[setDegree]);

  // guardar lo seleccionado
  const handleSave =async ()=>{

    const updateDegree={...subject, degree:selectedDegree};
    // console.log(updateDegree,'añadiendo grado');
    try {
    
      const {data}= await axios.patch(`/api/subjects/${subject.id}`,updateDegree);
      console.log(data);      
      // cerrando 
      onClose();
      toast({
        title: 'Asignacion de grado a la asignatura !',
        description:data.name,
        status:'success',
        duration: 3000,
        isClosable: true,
      })

      
    } catch (error) {
      console.log(error);
    }    
  };
  
  // seleccionar el grado
  const handleSelectDegree=(gradesSelected)=>{  
    setSelectedDegrees(gradesSelected);
  };

  // console.log('agregando !!',selectedDegree);
  

  return (
    <>    
      <Card key={subject.id}>
        <Flex>
          <Input
            type='text'
            value={name}
            readOnly={isInputActive ? true: false}
            borderWidth={isInputActive ? '2px' : '0px'}
            onChange={({target})=>setName(target.value)}
          />
          <Flex>
            <ButtonGroup>                    
              <IconButton
                onClick={handleEdit} 
                color="white" 
                bg="yellow.300" 
                icon={<ImPencil2 /> }
              />
              <IconButton               
                color="white" 
                bg="red.600" 
                icon={<DeleteIcon/> }
                onClick={handleDelete}
              />
              <Button
                color="white" 
                bg="blue.400"
                onClick={onOpen}              
              >Añadir el grado</Button>
                          
            </ButtonGroup>           
               
          </Flex>
        </Flex>
        
      </Card>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>SELECCIONE EL GRADO !</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <CheckboxGroup
              defaultValue={subject.degree}
              onChange={handleSelectDegree}
              placeholder='seleccione'
              colorScheme='green'              
            >
              <Stack spacing={[1, 5]} direction={['column', 'row']}>
                {degree.map((degree) => (
                  <Checkbox 
                    key={degree.id} 
                    value={degree.id}
                     
                  >
                    {degree.degree}
                  </Checkbox>
                ))}
              </Stack>
            </CheckboxGroup>
          </ModalBody>
          <ModalFooter>
            <Button 
              colorScheme='blue' 
              mr={3}
              onClick={()=>handleSave(degree.id)}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ListSubjects;