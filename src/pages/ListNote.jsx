import { Box, Button, ButtonGroup, Card, Flex, FormControl, FormLabel, Heading, Input, Select, Table, Tbody, Td, Text, Tfoot, Th, Thead, Tr, useToast,} from '@chakra-ui/react';
import axios from 'axios';
import React, {useEffect, useState } from 'react';
import { FcPrint } from 'react-icons/fc';
import { LuNewspaper } from 'react-icons/lu';
import { pdf } from '@react-pdf/renderer';
import NoteListPDF from '../components/NoteListPDF';


export const ListNote = ({selectedDegree}) => {
  // console.log('...',selectedDegree);
 
 
  const [subject,setSubject]=useState('');
  const [student, setStudent]=useState('');
  const [assignment, setAssignment]=useState('');
  const [ponderacion, setPonderacion]=useState('');
  const [isLoading , setIsLoading] =useState('');
  // const [selectedDegreeNotes, setSelectedDegreeNotes] = useState([]);
  // guardo la nota del estudiante nombre tema materia ...
  const [newNota,setNewNota]=useState([]);
  // observo que se guarde...
  // console.log(newNota,'la nota');
  const toast=useToast();
  // estudiante
  const handleStudentChange=({target})=>{
    setStudent(target.value);
    console.log('alumno id',target.value);
  };
  // tipo de asignacion
  const handleTemaChange=({target})=>{
    setSubject(target.value);
    console.log('tema id',target.value);
  };
  // nombre asignacion
  const handleAssignmentChange=({target})=>{
    setAssignment(target.value);
    console.log('assignment id',target.value);
  };
  // nota
  const handleNotaChange=({target})=>{
    setPonderacion(target.value);
    console.log('Nota',target.value);
  };
  // materia
  const handleSubjectChange=({target})=>{
    setSubject(target.value);
    console.log('materia id',target.value);
  };


  // agrego la nota al alumno
  const addNota = async ()=>{
    setIsLoading(true);
    try {
      const response = await axios.post('/api/note',{
        student, subject, assignment, ponderacion,degree:selectedDegree.id
      });
      setNewNota([...newNota, response.data]);
      // setNewNota('');

      // console.log('Nota agregada correctamente',response);
      toast({
        title: 'Nota agregada correctamente',
        description: 'La nota se ha agregado al alumno con éxito.'.response,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      // limpiar los input
      setStudent('');
      setSubject('');
      setAssignment('');
      setPonderacion('');
      
    } catch (error) {
      // console.log(error);
      toast({
        title: 'Error al agregar la nota',
        description:error.response.data.error,
        status:'error',
        duration: 3000,
        isClosable: true,
        
      });
      
    }finally{
      setIsLoading(false);
    }
  };
  
  // mostrando todas las notas
  useEffect(()=>{
    const fetchNota=async()=>{
      try {
        const response = await axios.get('/api/note');
        setNewNota(response.data);
        // const filteredNotes = response.data.filter(note => note.degree.id === selectedDegree.id);
        // setNewNota(filteredNotes);
      } catch (error) {
        // console.log(error);
        toast({
          title: 'Error al cargar las notas',
          description:error.response.data.error,
          status:'error',
          duration: 3000,
          isClosable: true,
        });
        
      }
    };
    fetchNota();
  },[toast,setNewNota,]);

  // pdf
  const handlePrintPdf = async () => {
    try {
      const pdfBlob = await pdf(
        <NoteListPDF notes={newNota} />
      ).toBlob();

      const fileURL = URL.createObjectURL(pdfBlob);
      window.open(fileURL);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error al generar el PDF',
        description: 'Hubo un error al generar el PDF.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };
  
  return (
    <>
    
      <Card>
      
        <Flex
          w="100%"
          p={8}
          gap={8}
        >
          <Flex
            w="50%"
         
          >
          
            <FormControl>
              <FormLabel>Alumno :</FormLabel>            
              <Select
                placeholder="seleccione el alumno"
                // value={students}
                onChange={handleStudentChange}
              >
                {
                  selectedDegree.students.map((student) => (
                    <option 
                      key={student.id} 
                      value={student.id}                    
                    >
                      {student.name}
                    </option>
                  ))
                }
                
              </Select>
            </FormControl>
          </Flex>
          <Flex
            w="50%"
         
          >

            <FormControl>
              <FormLabel>Tema:</FormLabel>           
              <Select
                placeholder="seleccione el tema"
                // value={subject}
                onChange={handleTemaChange}
              >
                {selectedDegree.assignments.map((assignment)=>(
                  <option 
                    key={assignment.id} 
                    value={assignment.id}
                  >{assignment.name}</option>
                ))}
              </Select>
            </FormControl>
          </Flex>
        </Flex>

        <Flex
          w="100%"
          p={8}
          gap={8}
        >
          <Flex
            w="50%"
         
          >

            <FormControl>
              <FormLabel>Asignatura :</FormLabel>
              <Select 
                placeholder="seleccione la Asignatura"
                value={subject}
                onChange={handleSubjectChange}
              
             
              >
                {selectedDegree.subjects.map((subjects)=>(
                  <option 
                    key={subjects.id} 
                    value={subjects.id}
                  >{subjects.name}</option>
                ))
                }              
              </Select>
            </FormControl>
          </Flex>
          <Flex
            w="50%"
         
          >

            <FormControl>
              <FormLabel>Asignacion:</FormLabel>
              <Select
                placeholder="seleccione el tipo "
                value={assignment}
                onChange={handleAssignmentChange}
              >
                {selectedDegree.assignments.map((assignment)=>(
                  <option 
                    key={assignment.id} 
                    value={assignment.id}
                  >{assignment.tipo}</option>
                ))}
              </Select>

            </FormControl>
          </Flex>
        </Flex>
        <Flex
          w="100%"
          p={8}
          gap={8}
        >
          <FormControl>
            <Flex
              flexDir={{sm:'row',md:'row'}}
              justifyContent={'center'}
            >
              <FormLabel>Nota :</FormLabel>
              <Input 
                type="Number" 
                placeholder="nota"
                width="25" 
                value={ponderacion}
                onChange={handleNotaChange}
              />
            </Flex> 
          </FormControl>
        </Flex>
        <ButtonGroup>    
          <Button
            bgColor={'yellow'}   
            variant="ghost"
            w={'100%'}
            leftIcon={<LuNewspaper  />}
            isLoading={isLoading}
            onClick={addNota}          
            isDisabled={!student ||!subject ||!assignment ||!ponderacion}
            loadingText='añadiendo la nota...'
          >Agregar</Button>
        </ButtonGroup>
      </Card>
    
      {/* Listado de notas */}
      {
        selectedDegree.students.length === 0 ? (
          <Text
            as='b'
            textAlign={'center'}
            color={'red'}
            m={8}
            fontSize={20}
          
          >No hay estudiantes en este grado</Text>
        ) : newNota.length === 0 ? 
          (
            <Text>No hay notas disponibles para este grado</Text>
          ) 
          : 
          (
            <Box w='100%' >
              <Heading
                textAlign={'center'}
                color={'black'}
                fontWeight={'bold'}
                m={8}
                fontSize={20}
              >Notas {selectedDegree.degree}° grado</Heading>
              <Flex>
                <ButtonGroup>
                  <Button                    
                    bgGradient={'linear(to-l, #6066FA, yellow)'}
                    color={"white"}                    
                    w={'100%'}
                    leftIcon={<FcPrint fontSize={40}/>}
                    onClick={handlePrintPdf}
                    m={4}
                  >
                  Pdf
                  </Button>
                </ButtonGroup>
              </Flex>
              <Table 
                variant="striped" 
                size="base"                
                fontSize={{base:'10',md:'15',lg:'20'}}
                borderCollapse="collapse"
                boxShadow="lg"
                p={'0'}
                m={4}
                border="1px solid"
                borderColor="gray.200"
                borderRadius="lg"          
                width={{base:'40%',md:'60%',lg:'80%'}}
              >
                <Thead
                  bgGradient={'linear(to-l, #6066FA, yellow)'}
                >
                  <Tr>
                    <Th>N°</Th>
                    <Th>Alumno</Th>
                    <Th>Asignatura</Th>
                    <Th>Tema</Th>
                    <Th>tipo</Th>
                    <Th>Nota</Th>                  
                  </Tr>
                </Thead>
                <Tbody>
                  {newNota.map((note, index) => (
                    <Tr key={index}>
                      <Td>{index + 1}</Td>
                      <Td>{note.students.name}{note.students.lastname}</Td>
                      <Td>{note.subject.name}</Td>
                      <Td>{note.assignment.name}</Td>
                      <Td>{note.assignment.tipo}</Td>
                      <Td>{note.ponderacion}</Td>
                      <Td>
                        {/* <ButtonGroup>
                        <Button
                          variant="ghost"
                          size="sm"
                          colorScheme="blue"
                          // onClick={() => handleDelete(note.id)}
                        >
                          Eliminar
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          colorScheme="blue"
                          // onClick={() => handleEdit(note)} 
                          disabled={isLoading}
                        >..</Button>
                      </ButtonGroup> */}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          )
          // :(
          //   <Text>No hay notas disponibles para este grado</Text>
          // )
      }

    </>
  );
};
export default ListNote;
