import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { Flex, Grid, GridItem, Heading, Text,} from '@chakra-ui/react';
import axios from 'axios';
export const PieChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [students,setStudents]=useState('');
  const [teacher,SetTeacher]=useState('');
 


  // estudiantes
  useEffect(()=>{
    const fetchStudents =async()=>{
      try {
        const response = await axios.get('/api/studentsRegistrations');
        // console.log('estudiante..',response);
        setStudents(response.data);
      } catch (error) {
        console.log(error);       
      }
    };
    fetchStudents();
  },[]);

  // profesores
  useEffect(()=>{
    const getTeacher =async()=>{
      try {
        const {data}=await axios.get('/api/users');
        // filtra los los usuario con rol maestro
        const filteredTeachers = data.filter(user => user.role === 'maestro');
        SetTeacher(filteredTeachers);              
      } catch (error) {
        console.log(error);  
      }     
    
    };
    getTeacher();
  },[]);

  // grafica
  useEffect(() => {
    if(chartInstance.current){
      chartInstance.current.destroy();
    }
    const myChartRef = chartRef.current.getContext('2d');   
    chartInstance.current = new Chart(myChartRef,{
      type: 'pie',
      data: {
        labels: ['Estudiante','Profesor'],
        datasets: [{
          label: 'grafica ',
          data: [students.length,teacher.length,0], // 300, 50,100 si le añades 100 particiona el circulo en 3 mi tades !
          backgroundColor: [
            // 'rgb(255, 99, 132)',//paleta de colores para cada labels
            'rgb(54, 162, 235)', //estudiante
            'rgb(255, 205, 86)'//profesor
          ],
          hoverOffset:4
        }]
      }
    });
    
 

    return () => {

      if(chartInstance.current && chartInstance.current.destroy){
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  
  },[students,teacher]);

    
  return (
    <>
      <Heading
        as="h1"
        size="2xl"
        fontWeight="bold"
        mb={4}
        mt={8}
        textAlign="center"
        color="gray.600"
        borderBottom="1px solid gray.200"
        py={4}

      >Bienvenido</Heading>
      <Grid 
        templateColumns="repeat(3, 1fr)" 
        justifyItems="center"
        justifySelf="center"
        alignItems="center"
        gridTemplateRows="auto auto"        
      >
        <GridItem>
          <Flex
            // w="auto"
            // h="100%"
            bg="gray.200"
            justifyContent="center"
            alignItems="center"
            cursor="pointer"
            flexDir={{base:'column',sm:'column',md:'column',lg:'column'}}
            py={4}
            
          >
            <Text
              fontWeight="bold"
              fontSize={{sm:'0.9rem',md:'2rem',lg:'2rem'}}
              color="gray.600"
              flexDir={{sm:'column',md:'column',lg:'column'}}
              px={4}
              textAlign={'center'}
             
            >Estudiantes inscritos</Text>
            <canvas 
              ref={chartRef} 
              height="100%"
             
            />          
          </Flex>
        </GridItem>
        <GridItem>.</GridItem>
        <GridItem>.</GridItem>

      </Grid>
    </>
  );
};

export default PieChart;