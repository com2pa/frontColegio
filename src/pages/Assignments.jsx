// creo conograma o formato
// cronograma de actividades
// lapso, grado, materia, nombre de la actividad , que tipo de actividad 
import React, { useState } from 'react';
import SidebarWithHeader from '../pagesPrivate/LayoutPrivate/SidebarWithHeader';
import { Box, Button, Card, Checkbox, CheckboxGroup, Flex, FormControl, FormHelperText, FormLabel, Heading, Input, List, Select, Stack, Text, useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import axios from 'axios';
import CardAssignments from './CardAssignments';


export const Assignments = () => {
    
  const [degree, setDegree]=useState([ ]);
  const [selectedDegree, setSelectedDegree] =useState('');

  const [lapso ,setLapso] =useState('');

  const [subject, setSubject]=useState([]);
  const [subjectSelected, setsubjectSelected]=useState('');

  const [name, setName]=useState('');

  const [tipo, setTipo]=useState('');
  const toast=useToast();

  const[assignment, setAssignment]= useState([]);
  // console.log(assignment,'asignacion');

  // mostrando los grados
  useEffect(()=>{
    const FechDegree=async()=>{
      const {data} = await axios.get('/api/degrees');
      setDegree(data);

    };
    FechDegree();
  },[setDegree]); 

  // mostrando asignatura
  useEffect(()=>{
    const fetchSubject=async()=>{
      const {data} = await axios.get('/api/subjects');
      setSubject(data);
    };
    fetchSubject();
  },[setSubject]);

  //   obtener el valor de grado al seleccionarlo
  const handleDegreeChange = (degree) => {
    setSelectedDegree(degree);
    // console.log('seleccionando el grado !!',degree);
  };

  // obtener el lapso seleccionado
  const handleSelectLapso=(lapso)=>{
    setLapso(lapso);
    // console.log('seleccionando el lapso!!',lapso);
  };
  
  // mostrando todas las asignaciones
  useEffect(()=>{
    const fetchAssignments=async()=>{
      const response = await axios.get('/api/assignment');
      setAssignment(response.data);
      // console.log(response.data);
    };
    fetchAssignments();
  },[setAssignment]);
 

  // enviar 
  const handleSubmit = async () => {    
    // console.log('Selected Subject:', subjectSelected);
    try {
      const {data}= await axios.post('/api/assignment', {
        name,
        tipo,
        lapso,
        selectedDegree,
        subjectSelected,
      });
      // console.log(data);
      toast({
        title: 'Actividad agregada correctamente',
        description: data.selectedDegree,
        status:'success',
        isClosable:true,
        duration: 3000,
      });
      // alert('Actividad agregada exitosamente');
      setName('');
      setTipo('');
      setSelectedDegree('');
      setsubjectSelected('');
      setLapso('');

    } catch (error) {
      console.log(error);
      toast({
        title: 'Error al agregar actividad',
        description: error.response.data.error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };
  // eliminar la asignatura
  const handleDelete=async(id)=>{   
    // console.log('eliminando la actividad!!',assignment.id);
    
    try {
      const borrado = await axios.delete(`/api/assignment/${id}`);
      // console.log(borrado);
      toast({
        title: 'Actividad eliminada correctamente',
        description: 'La actividad ha sido eliminada exitosamente',borrado,
        status:'success',
        isClosable:true,
        duration: 3000,
      });
      // Actualizar el estado de las asignaciones para mostrar la lista actualizada
      setAssignment(assignment.filter(item => item.id !== id));
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error al eliminar actividad',
        description: error.response.data.error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };


  return (
    <SidebarWithHeader>
      <Flex
        w="100%"
        p={8}
        justifyContent={'center'}
      >
        <Heading> Cronograma de actidades</Heading>
      </Flex>
      <Card      
      >              
        <FormControl>
          <Flex
            w="100%"
            p={8}
            gap={8}
          >
            <Flex
              // w="50%"         
            >
              <FormControl>
                <FormLabel>Lapso</FormLabel>
                <Select 
                  placeholder='Seleccione'
                  value={lapso}
                  onChange={(e)=>handleSelectLapso(e.target.value)}
                >
                  <option value='1er lapso'>1er lapso</option>
                  <option value='2do lapso'>2do lapso</option>
                  <option value='3er lapso'>3er lapso</option>
                  <option value='Recuperacion Vacional'>Recuperacion Vacional</option>

                </Select>
                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
              </FormControl>
            </Flex>
            <Flex
              w="50%"
            
            >
              <FormControl>
                <FormLabel>Grado</FormLabel>
                
                <CheckboxGroup
                  defaultValue={degree.id}                  
                  colorScheme='green'
                  onChange={ handleDegreeChange}
                >
                  <Stack 
                    spacing={1}  
                    direction={['column', 'row']}
                  >
                    {degree.map((degree) => (
                      <Checkbox 
                        key={degree.id} 
                        value={degree.id}                        
                        size='sm' 
                        colorScheme='red'
                        defaultChecked                      

                      >
                        {degree.degree}
                      </Checkbox>
                    ))}                  
                  </Stack>
                </CheckboxGroup>
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
                <FormLabel>Asignatura</FormLabel>
                <Select 
                  placeholder='Seleccione'
                  // value={subjectSelected}
                  // onChange={(e)=>handleSelectSubject(e.target.value)}
                  onChange={({target})=>setsubjectSelected(target.value)}
                >
                  {subject.map((subject) => (
                    <option key={subject.id} value={subject.id}>{subject.name}</option>
                  ))}                  
                </Select>
                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
              </FormControl>
            </Flex>
            <Flex
              w="50%"
            >
              <FormControl>
                <FormLabel>Tema(de la actividad)</FormLabel>
                <Input 
                  type='text'
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                />
                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
              </FormControl>
            </Flex>
          </Flex>
          <Flex
            w="100%"
            p={8}
            gap={8}
          >
            <Flex
              w="100%"         
            >
              <FormControl>
                <FormLabel>actidades</FormLabel>
                <Input 
                  type='text'
                  value={tipo}
                  onChange={(e)=>setTipo(e.target.value)} 
                />
                <FormHelperText>actividades como : 
                  individual,
                  grupal,
                  exposicion,
                  examen, 
                  trabajo escrito,
                  dibujo,
                  maqueta,
                  ejercicio,
                </FormHelperText>                       
              </FormControl>
            </Flex>
          </Flex>
        </FormControl>
        <Button 
          variant="solid" 
          size="md" 
          colorScheme="blue"      
          onClick={handleSubmit}
          isDisabled={ 
            !name || 
            !tipo  || 
            !lapso || 
            !subjectSelected ||
            !selectedDegree
          }
        >
          Create
        </Button>
      </Card>
      <Flex>
        <Box 
          w='100%'
        >
          <Heading
            as='h2'
            fontWeight='bold'
            fontSize='2xl'
            textAlign='center'
            mt={5}
          >Asignaciones</Heading>
          {assignment.map((assignment) => (
            <List
              key={assignment.id}  
            >                        
              <CardAssignments                
                assignment={assignment}
                handleDelete={handleDelete}   
              />
            </List>            
          ))}          
        </Box>
      </Flex>
        
    </SidebarWithHeader>
  );
};

export default Assignments;