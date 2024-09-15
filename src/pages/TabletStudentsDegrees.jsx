// tabla  de estudiante por grado
import { Card,    Table, TableContainer, Tbody, Td,  Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';

export const TabletStudentsDegrees = ({degree}) => {


  //   console.log('desde tablet',degree);

  

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