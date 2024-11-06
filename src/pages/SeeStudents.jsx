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
      // console.log(data);
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
      <Grid 
        templateColumns="repeat(3, 1fr)"
        gap={4}
        gridTemplateColumns={["auto auto "]} 
        mb={4}       
      >
        {degree.map((degree) => (
          <GridItem key={degree._id}>
            <Card 
                        
              bg='gray.200'
              onChange={handleSelectDegree}
            >
              <Flex
                w="100%"
                flexDir="column"
                gap={4}
              >
                <Flex 
                  justifyContent={'center'}                
                >
                  <Text 
                    as='b'
                  >{degree.degree}° grado</Text>
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
            p={4}
          >            
            
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