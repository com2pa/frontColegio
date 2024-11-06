import React, { useEffect, useState } from 'react';
import SidebarWithHeader from '../pagesPrivate/LayoutPrivate/SidebarWithHeader';
import axios from 'axios';
import { Box, Button, Card, Flex, Grid, GridItem, Heading,  Text, useToast } from '@chakra-ui/react';
import { FaRegEye } from 'react-icons/fa';
import ListNote from './ListNote';

export const Note = () => {
  const [ degree , setDegree]=useState([]);
  const [selectedDegree, setSelectedDegree] = useState(null);
  const toast=useToast();  
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
      <Heading
        as="h2"
        size="lg"
        fontWeight="bold"
        mb={4}
        mt={8}
        textAlign="center"
      >Notas por grado</Heading>
            
      <Grid 
        // templateColumns="repeat(3, 1fr)" 
        gap={4}
        gridTemplateColumns={["auto auto "]} 
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
              
                </Flex>
                <Flex
                  justifyContent={'center'}
                             
                >
                  <Button 
                    leftIcon={<FaRegEye  />} 
                    colorScheme='yellow' 
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
              {/* <Input         
                size='md'             
                borderColor='gray.200'             
                rounded='md'              
                _placeholder={{ color: 'gray.400' }}              
                w={"50%"}
                placeholder='Buscar estudiante...' 
                type='search'/> */}
            </Flex>
            <Box w={"100%"}>
              <Text 
                as='h2'
                display={'flex'}
                justifyContent={'center'}
              > Notas de Estudiantes del  {selectedDegree.degree}° grado</Text>
            </Box>
            <ListNote
              selectedDegree={selectedDegree}      
                         
            />
          
          </Card>

        )}
      </Flex>

    </SidebarWithHeader>
  );
};
export default Note;
