// muestra los maestro registrados
import React, { useEffect, useState } from 'react';
import SidebarWithHeader from '../pagesPrivate/LayoutPrivate/SidebarWithHeader';
import axios from 'axios';
import { Card, Heading, Stack, Switch, Table, Td, Th, Thead, Tr, useToast } from '@chakra-ui/react';

export const Teacher = () => {
  // llamando a los usuarios con role de maestro
  const [teacher,SetTeacher]=useState();
  const toast = useToast();
  useEffect(()=>{
    const getTeacher =async()=>{
      try {
        const {data}=await axios.get('/api/users');
        // filtra los los usuario con rol maestro
        const filteredTeachers = data.filter(user => user.role === 'maestro');
        SetTeacher(filteredTeachers);
        console.log(filteredTeachers);
        //   SetTeacher(data);      
        //   console.log(data);
        
        
              
      } catch (error) {
        console.log(error);
        toast({
          title: 'Error para mostrar lista de maestro',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
            
      }
      
    
    };
    getTeacher();
  },[toast]);

  // renderizando los maestros registrados
  return (
    <SidebarWithHeader>
      <Heading      
        as="h1"
        fontSize="xl"
        fontWeight="bold"
        color="black"       
        textAlign="center"
        p={'0'}   
      >Maestros</Heading>

      <>
        <Table 
          variant="simple"
          size="sm"
          width="100%"
          // borderCollapse="collapse"
          boxShadow="lg"
          bg="white"
          p={'0'}
          m={'0'}
          border="1px solid"
          borderColor="gray.200"
          borderRadius="lg"          
          overflowY='auto'

        >
          <Thead
            bgGradient={'linear(to-l, #6066FA, yellow)'}                               
          >
            <Tr>
              <Th>N°</Th>
              <Th>Personal Administrativo</Th>
              <Th>Acceso</Th>              
            </Tr>
          </Thead>
          <tbody>
            {teacher && teacher.map((teacher,index)=>(
              <Tr key={index}>
                <Td>{index+1}</Td>
                <Td>{teacher.name}</Td>
                <Td>
                  <Stack direction='row'>
                    <Switch colorScheme='red' />                    
                  </Stack>
                </Td>
              </Tr>
            ))}
          </tbody>
          <tfoot>
            <Tr>
              <Th 
                colSpan="3"
                fontWeight='bold'
                fontSize='lg'
                textAlign='center'
                color='black.600'
                
              >Total Maestros: {teacher && teacher.length}</Th>
            </Tr>
          </tfoot>
        </Table>
      </>
    
      
    </SidebarWithHeader>
  );
};

export default Teacher;
