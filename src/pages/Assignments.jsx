// creo conograma o formato
// cronograma de actividades
// lapso, grado, materia, nombre de la actividad , que tipo de actividad 
import React, { useState } from 'react';
import SidebarWithHeader from '../pagesPrivate/LayoutPrivate/SidebarWithHeader';
import { Box, Button, Card, Checkbox, CheckboxGroup, Flex, FormControl, FormHelperText, FormLabel, Heading, Img, Input, Select, Stack, Text } from '@chakra-ui/react';
import dos from '../assets/2.png';
import { useEffect } from 'react';
import axios from 'axios';


export const Assignments = () => {
    
  const [degree, setDegree]=useState([ ]);
  const [selectedDegree, setSelectedDegree] =useState(null);
  const [subject, setSubject]=useState([]);
  const [selectedLapso ,setSelectedLapso] =useState('');



  
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
    setSelectedLapso(degree);
    console.log('seleccionando el grado !!',degree);
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
        <Box 
          h='20vh'
          w='100%'
          display={{ base: 'flex', md: 'flex' }}
          bg={'red'}
        >
          <Img 
            src={dos}
            alt='banner'
          />
        </Box>        
        <FormControl>
          <Flex
            w="100%"
            p={8}
            gap={8}
          >

        
            <Flex
              w="50%"
         
            >
              <FormControl>
                <FormLabel>Lapso</FormLabel>
                <Select 
                  placeholder='Seleccione'
                  value={selectedLapso}
                  onClick={handleDegreeChange}
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
                //   onChange={handleSelectDegree}
                >
                  <Stack spacing={5} direction='row'>
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
                {/* <Input type='email' /> */}
                <Select placeholder='Seleccione'>
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
                <Input type='email' />
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
                <Input type='email' />                
              </FormControl>
            </Flex>
          </Flex>
        </FormControl>
        <Button variant="solid" size="md" colorScheme="blue">
          Create
        </Button>
      </Card>
        
    </SidebarWithHeader>
  );
};

export default Assignments;