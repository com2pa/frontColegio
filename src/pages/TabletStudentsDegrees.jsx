// tabla  de estudiante por grado
import { Card,    Table, TableContainer, Tbody, Td,  Tfoot, Th, Thead, Tr, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const TabletStudentsDegrees = ({degree}) => {
  //   console.log('desde tablet',degree);
  const [assignments, setAssignments] = useState([]);
  const [selectedDegree, setSelectedDegree] = useState(null);
  const toast = useToast();

  // obteniendo todas las asignaciones
  useEffect(() => {
    const FetchAssignments = async (degreeId) => {
      try {
        const response = await axios.get(`/api/assignment?degreeId=${degreeId}`);
        setAssignments(response.data);
        // console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    FetchAssignments(degree.id);
  }, [degree.id, setAssignments]);

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
    <>
      <Card>           
        <TableContainer 
        
        >
          <Table 
            size='sm' 
            display="block"
            variant="striped" 
            colorScheme="gray"
            borderCollapse="collapse"
            width={{ base: '100%', md: 'auto' }}
          >
            <Thead>
              <Tr>
                <Th>N°</Th>
                <Th>Nombre y Apellido del estudiante </Th>
                {/* {degree.assignments && degree.assignments.length > 0 ? (
                  assignments.map((assignment, index) => (
                    <>
                      <Th key={index}>{assignment.lapso} {assignment.name}</Th>
                    </>
                  ))
                ) : null} */}
                {/* {assignments.length > 0 ? (
                  assignments.map((assignment,) => (
                    <>
                      <Th >{assignment.lapso} {assignment.name}</Th>
                    </>
                  ))
                ) : null} */}
                            
              </Tr>
            </Thead>
            {/* mostrando los alumnos por grado  */}
            <Tbody>
              {degree.students.map((student, index) => (
                <Tr key={student.id}>
                  <Td>{index + 1}</Td>
                  <Td>{student.name}{student.lastname}</Td>              
                 
                </Tr>
              ))
              }              
                     
            </Tbody>
            <Tfoot>
              <Tr>                
                <Th>Coligio casa de niños</Th>
              </Tr>
            </Tfoot>
          </Table> 
        </TableContainer> 
      </Card>
      
    </>
  );
};

export default TabletStudentsDegrees; 