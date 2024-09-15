// muetro el listado de los alumnos inscritos:
// nombre , apellido, edad , sexo
import { Button, Card,  Flex, Input } from '@chakra-ui/react';
import React, { useState } from 'react';

export const StudentList = ({studentsRegistrations}) => {
  const [isInputActive, setIsInputActive]=useState(false);
  const [name, setName]=useState(studentsRegistrations.name);
  const [lastname, setLastname]=useState(studentsRegistrations.lastname);
  const [sex, setSex]=useState(studentsRegistrations.sex);
  const [age,setAge]=useState(studentsRegistrations.age);
  //   const [selectedDegree , setSelectedDegree] =useState(studentsRegistrations.selectedDegree);
  return (
    <Card
      key={studentsRegistrations.id}
      m={4}
    >
      <Flex w="100%" flexDir={{base:'column',md:'row'}}>
        <Flex w="50%">
          <Input
            type='text'
            readOnly={isInputActive ? true: false}
            value={name}
            borderWidth={isInputActive? '2px' : '0px'}
            onChange={({target})=>setName(target.value)}
          />
        </Flex>
        <Flex w="50%">
          <Input
            type='text'
            readOnly={isInputActive? true: false}
            value={lastname}
            borderWidth={isInputActive? '2px' : '0px'}
            onChange={({target})=>setLastname(target.value)}
          />
        </Flex>
        


            
      </Flex>
      <Flex w="100%" flexDir={{base:'column',md:'row'}}>
        <Flex w="50%">
          <Input
            type='text'
            readOnly={isInputActive ? true: false}
            value={sex}
            borderWidth={isInputActive? '2px' : '0px'}
            onChange={({target})=>setSex(target.value)}
          />
        </Flex>
        <Flex w="50%">
          <Input
            type='number'
            readOnly={isInputActive? true: false}
            value={age}
            borderWidth={isInputActive? '2px' : '0px'}
            onChange={({target})=>setAge(target.value)}
          />
        </Flex>
        


            
      </Flex>
      <Flex w="100%" flexDir={{base:'column',md:'row'}}>
        {/* <CheckboxGroup>

        </CheckboxGroup> */}
            
      </Flex>
      

    </Card>
  );
};

export default StudentList;