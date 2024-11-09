import { Button, Card, Checkbox, CheckboxGroup,  Flex, FormControl, FormHelperText, FormLabel, Input, Stack, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SidebarWithHeader from '../pagesPrivate/LayoutPrivate/SidebarWithHeader';
import StudentList from './StudentList';
const REGEX_NAME = /^(\w+\s?){1,5}$/;
const REGEX_LASTNAME = /^(\w+\s?){1,2}$/; 

export const FormRegistrationStudent = () => {
  const [name, setName]=useState('');
  const [nameValidation , setNameValidation]= useState(false);

  const [lastname, setLastname]= useState('');
  const [lastnameValidation, setLastnameValidation]= useState(false);

  const [sex, setSex]=useState('');
  const [sexValidation, setSexValidation]= useState(false);

  const [age , setAge]= useState('');
  const [ageValidation, setAgeValidation]= useState(false);
  
  const [degree,setDegree] =useState([]);
  const [selectedDegree,setselectedDegree]=useState('');
  
  const toast =useToast();
  const [isLoading, setIsLoading] = useState(false);

  const[newStudentRegistrations, setNewStudentRegistration] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  
  const handleNameInput =({target})=>{
    setName(target.value);
    
  };
  const handleLastNameInput =({target})=>{
    setLastname(target.value);
    
  }; 

  const handleAgeInput=({target})=>{
    setAge(target.value);
    setAgeValidation(target.value >= 5 && target.value <= 11);
    console.log(target.value);

   
  };
  const handleGeneroInput=({target})=>{
    setSex(target.value);
    
  };
  
  
  useEffect(()=>{
    setNameValidation(REGEX_NAME.test(name));
  },[name]);
    
  useEffect(()=>{
    setLastnameValidation(REGEX_LASTNAME.test(lastname));
  },[lastname]);

  useEffect(()=>{
    setSexValidation(sex !== '');
  },[sex]);
  useEffect(()=>{
    setAgeValidation(age);
  },[age]);


  //   obteniendo todos los grados
  useEffect(()=>{
    const fetchDegree = async()=>{
      try {
        const response = await axios.get('/api/degrees');
        setDegree(response.data);      
            
      } catch (error) {
        toast({
          title: 'Error al obtener los grados',
          description: 'Intente nuevamente',
          status: 'error',
          duration: 3000,
          isClosable: true,
  
        });   
      }
    };
    fetchDegree();
  },[setDegree, toast]);

  //   muestro todos los registrados
  useEffect(()=>{
    const fetchNewStudentsRegistrations = async()=>{
      try {
        const response = await axios.get('/api/studentsRegistrations');
        setNewStudentRegistration(response.data);
        // console.log('registros: ',response.data);
        setFilteredStudents(response.data);            
      } catch (error) {
        toast({
          title: 'Error al obtener los registros',
          description: 'Intente nuevamente',
          status: 'error',
          duration: 3000,
          isClosable: true,
  
        });   
      }
    };
    fetchNewStudentsRegistrations();
  },[setNewStudentRegistration,setFilteredStudents, toast]);
  


  //   seleccionar el grado
  const handleSelectDegree=(selectedDegree)=>{  
    setselectedDegree(selectedDegree);
    console.log('agregando!!',selectedDegree);
   
  };

  // agregar alumno
  const handleAddStudent = async()=>{
    setIsLoading(true);
    try {
      const {data}=await axios.post('/api/studentsRegistrations', {
        name, 
        lastname, 
        age, 
        sex, 
        selectedDegree
      });
      
      toast({
        title: 'Alumno agregado correctamente',
        description: data.name,
        status:'success',
        duration: 3000,
        isClosable: true,
      });
      setNewStudentRegistration([...newStudentRegistrations,data]);
      setFilteredStudents([...filteredStudents, data]); 
      
          
      //   limpiar input
      setName('');
      setLastname('');      
      setSex('');
      setAge('');



    } catch (error) {
      toast({
        title: 'Error al agregar al alumno',
        description: error.response.data.error,
        status: 'error',

        duration: 3000,
        isClosable: true,
      });
    }
  };


  return (
    
    <SidebarWithHeader> 
      <Card mb={8}>
        
        <FormControl>
          <Flex flexDir={{base:'column',md:'row'}} p={{base:15}} gap={{base:4}}>
           
            <FormControl isInvalid={!nameValidation && name}>
              <Flex flexDir={{base:'column', }}>
                <FormLabel fontSize={{base:12}} w="100%">Nombre  Niño/a </FormLabel>
                <Input
                  type='text' 
                  placeholder="Ingrese nombre del alumno"
                  size="sm"
                  onChange={handleNameInput}
                  value={name}
                />
              </Flex>
              {nameValidation ? '': (
                <FormHelperText color='red' border='0.5px solid red' margin='0.5rem' padding='1rem'>
                  <p>Debe comenzar con mayuscula seguido de minuscula !</p>
                </FormHelperText>
  
              )}
            </FormControl>
            
            
            <FormControl isInvalid={!lastnameValidation && lastname}>
              <Flex flexDir={{base:'column'}}>
                <FormLabel fontSize={{base:12}} w="100%">Apellido  Niño/a</FormLabel>
                <Input
                  type='text' 
                  placeholder="Ingrese apellido del alumno"
                  size="sm" 
                  onChange={handleLastNameInput}
                  value={lastname}
                />
              </Flex>
              {lastnameValidation ? '':(
                <FormHelperText color='red' border='0.5px solid red' margin='0.5rem' padding='1rem'>
                  <p>Debe comenzar con mayuscula seguido de minuscula !</p>
                </FormHelperText>
              )}
            </FormControl>
            
          </Flex>         
          <Flex flexDir={{base:'column',md:'row'}} p={{base:15}} gap={{base:4}}>
            <FormControl isInvalid={!sexValidation && sex}>
              <Flex flexDir={{base:'column',}}>
                <FormLabel fontSize={{base:12}} w="100%">Sexo </FormLabel>
                <Input 
                  type='text' 
                  placeholder="ingrese el sexo niño o niña" 
                  size="sm"
                  onChange={handleGeneroInput}    
                  value={sex}
                />
              </Flex>
              {!sexValidation? '':(
                <FormHelperText color='red' border='0.5px solid red' margin='0.5rem' padding='1rem'>
                  <p>Escriba niño o niña!</p>
                </FormHelperText>
              )}
            </FormControl>
           
            <FormControl isInvalid={!ageValidation && age}>
              <Flex flexDir={{base:'column',}}>
                <FormLabel fontSize={{base:12}} w="100%">Edad</FormLabel>
                <Input 
                  type='number' 
                  placeholder="Ingrese edad del alumno" 
                  size="sm"
                  onChange={handleAgeInput}
                  value={age}
                />
              </Flex>
              <FormHelperText>
                {!ageValidation? '': (
                  <FormHelperText color='red' border='0.5px solid red' margin='0.5rem' padding='1rem'>
                    <p>Debe ser un numero entero positivo!</p>
                  </FormHelperText>
                )}                
              </FormHelperText>
            </FormControl>
          </Flex>
          <Flex 
            flexDir={{base:'column',md:'row'}} 
            p={{base:15}} 
            // gap={{base:4,md:0,lg:0}}
          >
            <FormControl>
              <Flex flexDir={'column'}>
                <FormLabel 
                  fontSize={{base:12}} 
                  w="100%"
                  display={'flex'}
                  justifyContent={'center'}
                >Grado a inscribir</FormLabel>
                {/* <Input placeholder="ingrese el grado" /> */}
                <CheckboxGroup
                  defaultValue={degree.id}
                  placeholder='seleccione'
                  colorScheme='green'
                  onChange={handleSelectDegree}

                >
                  <Stack 
                    // spacing={[1, 5]} 
                    direction={['column', 'row']}
                    alignItems={'center'}
                    justifyContent={'center'}
                  >
                    {degree.map((degree) => (
                      <Checkbox 
                        key={degree.id} 
                        value={degree.id}                        
                      >
                        {degree.degree} ° grado
                      </Checkbox>
                    ))}
                  </Stack>
                </CheckboxGroup>
              </Flex>
            </FormControl>
          </Flex> 
        </FormControl>
      </Card>
      <Button
        isLoading={isLoading}
        onClick={handleAddStudent} 
        colorScheme='green' 
        size='sm' 
        w='100%'
        isDisabled={
          !nameValidation || 
            !lastnameValidation ||
            !sexValidation ||
            !ageValidation 
            
        }
      >Agregar al alumno</Button>

      <Flex 
        flexDir="column" 
        mt={8}
        gap={8}
        w="100%"      
        justifyContent="center"
        alignItems="center"
        bgColor='gray.100'
        // height="60vh"
        overflowY="auto"
        
        
      >
        <Flex justifyContent='center'> 
          <Text> Registados </Text>
        </Flex>
        
        {filteredStudents.map((studentsRegistrations) => (
          <StudentList
            key={studentsRegistrations.id}
            studentsRegistrations={studentsRegistrations}
            name={studentsRegistrations.name}
            lastname={studentsRegistrations.lastname}
            age={studentsRegistrations.age}
            sex={studentsRegistrations.sex}
            selectedDegree={studentsRegistrations.selectedDegree}

          />
        ) 
        )}
       
      </Flex>

   


    </SidebarWithHeader>
    
  );
};

export default FormRegistrationStudent;
