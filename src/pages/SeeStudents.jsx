import React, { useEffect, useState } from 'react';
import SidebarWithHeader from '../pagesPrivate/LayoutPrivate/SidebarWithHeader';
import { Box, Button, Card, Flex, Grid, GridItem,  Input, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';

import { FaRegEye } from 'react-icons/fa';
import TabletStudentsDegrees from './TabletStudentsDegrees';





export const SeeStudents = () => {
  const [ degree , setDegree]=useState([]);

  const [selectedDegree, setSelectedDegree] = useState(null);
  const toast=useToast();  


  // mostrar todos los grados
  useEffect(()=>{
    const fetchDegree =async()=>{
      const {data} = await axios.get('/api/degrees');
      setDegree(data);
      console.log(data);
    };
    fetchDegree();  
  },[setDegree]);

  //   seleccionar el grado
  const handleSelectDegree=(degree)=>{
    setSelectedDegree(degree);
    // console.log('grado seleccionado !',degree.degree, degree.students);
    toast({
      title: `Estudiantes del ${degree.degree}° grado`,
      description: 'cargado grados',
      status: 'info',
      duration: 1000,
      isClosable: true,
    });
  };
  
  



  return (
    <SidebarWithHeader>
      <h1>Aquí se verán los estudiantes</h1>
      
      <Grid 
        templateColumns="repeat(3, 1fr)" 
        gap={4}
      >
        {degree.map((degree) => (
          <GridItem key={degree._id}>
            
            <Card 
              h={{md:'10vh'}}              
              bg='gray.200'
              onChange={handleSelectDegree}
            //   onClick={() => setSelectedDegree(degree._id)}
            >
              <Flex
                w="100%"
                // gap={12}
                flexDir="column"
                justifyContent="space-evenly"
              >
                <Flex 
                  justifyContent={'center'}                
                >
                  <Text 
                    as='b'

                  >{degree.degree}° grado</Text>
                  {/* {degree.students && degree.students.length > 0 ? (
                  <List>
                    {degree.students.map((student) => (
                      <ListItem key={student._id}>
                       c
                      </ListItem>
 
                    ))}
                  </List>
                ) : (
                  <Text>No hay estudiantes en este grado.</Text>
                )}            */}

                </Flex>
                <Flex
                  justifyContent={'center'}
                             
                >
                  <Button 
                    leftIcon={<FaRegEye  />} 
                    colorScheme='teal' 
                    variant='solid'
                    w="100%"
                    onClick={() => handleSelectDegree(degree)}
                  >
                        Ver grado
                  </Button>           
                </Flex>
              </Flex>
            </Card> 
          </GridItem>          
        ))}
      </Grid>
      <Flex  >
        {selectedDegree &&(

          <Card 
            w={"100%"} 
            my={8}
            h={'auto'}
          >            
            <Flex
              my={8}
              justifyContent={'center'}
            >                
              <Input         
                size='md'             
                borderColor='gray.200'             
                rounded='md'              
                _placeholder={{ color: 'gray.400' }}              
                w={"50%"}
                placeholder='Buscar estudiante...' 
                type='search'/>
            </Flex>
            <Box w={"100%"}>
              <Text 
                as='h2'
                display={'flex'}
                justifyContent={'center'}
              >Estudiantes del  {selectedDegree.degree}° grado</Text>
            </Box>
            
            <TabletStudentsDegrees
            //   key={selectedDegree.id}             
              degree={selectedDegree}
              degreeId={selectedDegree.id}
            />       
          
            
           
          </Card>

        )}
      </Flex>
    </SidebarWithHeader>
  );
};

export default SeeStudents;