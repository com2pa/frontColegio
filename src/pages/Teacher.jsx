// muestra los maestro registrados
import React, { useEffect, useState } from 'react';
import SidebarWithHeader from '../pagesPrivate/LayoutPrivate/SidebarWithHeader';
import axios from 'axios';
import { Card, useToast } from '@chakra-ui/react';

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
        //   console.log(filteredTeachers);
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
      <h1>Maestros</h1>
      
            
     
      {teacher && teacher.map((teacher)=>(
        
        <Card 
          key={teacher._id}
          bg='yellow.100'
          w='100%'
          h='100px'
          my={4}
        > {teacher.name}
        </Card>
        
      )
      )}
      
    </SidebarWithHeader>
  );
};

export default Teacher;
