import React, { useEffect, useState } from 'react';
import SidebarWithHeader from '../pagesPrivate/LayoutPrivate/SidebarWithHeader';
import { Box, Button, Card, Flex, FormControl, Heading,  Input, List, useToast,} from '@chakra-ui/react';
import axios from 'axios';

import ListSubjects from './ListSubjects';


const REGEX_SUBJECTS=/^([A-Z][a-z]+)(\s[A-Z][a-z]+){0,2}$/;
export const Subjects = () => {
  const [name, setName]=useState('');
  const [newSubject, setNewSubject]=useState([]);
  const [nameValidation, setNameValidation]=useState(false);
 
  // const [selectedDegrees, setSelectedDegrees] = useState('');
  // const [degree, setDegree]=useState([]);
  const toast =useToast();
  
  const handleNameSubjects=({target})=>{
    setName(target.value);
  }; 

  //obtener todos los grados 
  // useEffect(()=>{
  //   const getDegree= async()=>{
  //     try {
  //       const response = await axios.get('/api/degrees');
  //       setDegree(response.data);
        
        
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getDegree();
    
  // },[setDegree]);  
  // 

  // mostrar todas las  asignaturas
  useEffect(()=>{
    const getSubjects= async()=>{
      try {
        const response = await axios.get('/api/subjects');
        setNewSubject(response.data);
        
        
      } catch (error) {
        console.log(error);
      }
    };
    getSubjects();
    
  },[setNewSubject]);  
 



  //   creando asignaturas
  const handleNewSubject = async (e) => {
    e.preventDefault();
    // const selectedDegreeIds = selectedDegrees.map(degree => degree.id);
    // console.log(selectedDegreeIds);
    try {
      const { data } = await axios.post('/api/subjects', { 
        name, 
      });
        // degrees: selectedDegreeIds,      
            
      setNewSubject(newSubject.concat(data));
      
      toast({
        title: 'Asignatura creada correctamente',
        description: data.name,
        status:'success',
        duration: 3000,
        isClosable: true,
      }); 
      //limpiar input
      setName('');
      
    } catch (error) {
      // console.log(error);
      toast({
        title: 'Error al crear la asignatura',
        description: error.response.data.error,
        status:'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };
  //   Validacion nombre de la asignatura
  useEffect(()=>{
    setNameValidation(REGEX_SUBJECTS.test(name));
  },[name]);

  // editar la asignatura
  const handleEditSubject = async(subject)=>{
    console.log('editar el nombre',subject);
    const id = subject.id;
    // console.log('id',id);
    const name = subject.name;
    // console.log(name);
    try {
      const {data}=await axios.put(`/api/subjects/${id}`, { name:name });
      toast({
        title: 'Asignatura editada correctamente',
        description:data.name,
        status:'success',
        duration: 3000,
        isClosable: true,
      });     
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error al editar la asignatura',
        description: error.response.data.error,
        status:'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // eliminar asignatura
  const handleDelete=async(subject)=>{
    console.log('asignatura a eliminar',subject);
    try {
      const{data}=await axios.delete(`/api/subjects/${subject}`);

      const updatedSubject= newSubject.filter((s)=>s.id !== subject);
      setNewSubject(updatedSubject);
      console.log('asignatura enviada!...',updatedSubject);

      toast({
        title: 'Asignatura eliminada correctamente',
        description:data.name,
        status:'success',
        duration: 3000,
        isClosable: true,
      });      
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error al eliminar la asignatura',
        description: error.response.data.error,
        status:'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <SidebarWithHeader>
      <Flex justifyContent={{base:'center',md:'center'}} my={{base:'1rem',md:'1rem'}}>
        <Heading> Asignaturas</Heading>
      </Flex>
      <Card 
        minH={{md:'10vh'}} p={5} my={8}>        
        {/* Agregar formulario para ingresar los grados */}
        <FormControl isInvalid={!nameValidation && name}> 
          <Flex 
            w="100%"
            gap={{base:15}}
            flexDir={{base:'column',sm:'column',md:'row'}}
          >      
            <Flex  
              onSubmit={ handleNewSubject}
              width="100%"
            >
              <Input 
                type="text"
                value={name}
                onChange={handleNameSubjects}
                placeholder='ingrese el nombre de la asignatura'
                w={'100%'}
                borderWidth={nameValidation? '2px' : '1px'}
                bg={'gray.100'}
              />
            </Flex>
            <Flex
              width="100%"
              justifyContent={{md:'space-around'}}
              alignItems={{md:'center'}}
            >
              <Button  
                size='md' 
                colorScheme="yellow"
                color={'white'}
                type='submit'
                w={'100%'}
                onClick={handleNewSubject}
                isDisabled={!nameValidation }

              >
               Agregar Asignaturas
              </Button>
            </Flex>
          </Flex>
        </FormControl>
      </Card>
      {/* Listado de Asignaturas */}
      <Flex 
        flexDir={'column'}
        textAlign={{base:'center',md:'center'}} 
        mt={{md:'3rem'}}
        w={'100%'}
        my={4}
      >
        <Heading fontSize={{base:'1rem',md:'1.2rem'}} 
        > LISTADO DE ASIGNATURAS</Heading>
      </Flex>
      <Flex flexDir={'column'}>
        {newSubject.map((subject)=>(
          <Box 
            key={subject._id}
          >            
            <List>
              <ListSubjects
                // key={subject._id}
                id={subject._id}
                name={subject.name}
                handleDelete={handleDelete}
                handleEditSubject={()=>handleEditSubject(subject.id)}
                subject={subject}
              />
            </List>
          </Box>
        )
        )}
      </Flex>
    </SidebarWithHeader>
  );
};

export default Subjects;