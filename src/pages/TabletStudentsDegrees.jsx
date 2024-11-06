// tabla  de estudiante por grado
import { Card,    
  Table,
  Tbody, 
  Td,  
  Tfoot, 
  Th, 
  Thead, 
  Tr, 
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const TabletStudentsDegrees = ({degree}) => {
  //   console.log('desde tablet',degree);
  const [
    // assignments, 
    setAssignments] = useState([]);


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
  }, [degree.id, setAssignments, ]);

 
  return (
    <>
      <Card>
        <Table 
          size='sm'
          variant="striped" 
          colorScheme="gray"
          borderCollapse="collapse"
          width={{ base: '100%', md: 'auto' }}
                  
        >
          <Thead
            bgGradient={'linear(to-l, #6066FA, yellow)'}
          >
            <Tr>
              <Th>N°</Th>
              <Th>Nombre y Apellido del estudiante </Th>
            </Tr>
          </Thead>
          {/* mostrando los alumnos por grado  */}
          <Tbody>
            {degree.students.map((student, index) => (
              <Tr key={student.id}>
                <Td>{index + 1}</Td>
                <Td>{student.name} {student.lastname}</Td>              
                 
              </Tr>
            ))
            }              
                     
          </Tbody>
          <Tfoot>
            <Tr>                
              <Th
                colSpan="3"
                fontWeight='bold'
                fontSize='md'
                textAlign='center'
                color='black.600'
              >Coligio casa de niños</Th>
            </Tr>
          </Tfoot>
        </Table> 
      </Card>
    </>
  );
};

export default TabletStudentsDegrees; 