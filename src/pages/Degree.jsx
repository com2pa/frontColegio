import React, { useEffect, useState } from 'react';
import SidebarWithHeader from '../pagesPrivate/LayoutPrivate/SidebarWithHeader';
import { Button, Card, Flex, Heading,  Input, List, useToast } from '@chakra-ui/react';
import axios from 'axios';
import DegreeCard from './DegreeCard';
// import { useAuth } from '../hooks/useAuth';

export const Degree = () => {
  const [degree, setDegree] = useState('');
  const [newDegree, setNewDegree] = useState([]);
  const toast =useToast();
  // const {auth}=useAuth();


  const handleNumberDegree=({target})=>{
    setDegree(target.value);
  };

  // // muestra todos los grados  
  useEffect(()=>{
    const getDegree = async()=>{
      const {data}=await axios.get('/api/degrees');
      setNewDegree(data);
    };        
    getDegree();
  },[setNewDegree]);

  
  // agregar nuevo grado
  const handleNewDegree =async()=>{
    try {
      const{data}=await axios.post(`/api/degrees`,{degree});
      console.log(data);
      toast({
        title: 'Grado agregado correctamente',
        description:data.degree,
        status:'success',
        duration: 3000,
        isClosable: true,
      });
      // setNewDegree(newDegree.concat(data));
      setNewDegree([...newDegree,data]);  // para actualizar la lista despues de agregar un nuevo grado
      setDegree('');
    } catch (error) {
      console.log(error);
    }
  };  

  // eliminar
  const handleDeleteDegree=async(degree)=>{
    try {
      const {data}=await axios.delete(`/api/degrees/${degree.id}`);
      console.log(data);
      const updatedDegrees = newDegree.filter((cat)=>cat.id !== degree.id);
      setNewDegree(updatedDegrees);

      toast({
        title: 'Grado eliminado correctamente',
        description:data,
        status:'success',
        duration: 3000,
        isClosable: true,
      });
      
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error al eliminar grado',
        description:error.response.data.error,
        status:'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <SidebarWithHeader>
      
      <Flex justifyContent={{base:'center',md:'center'}} p={{base:'1rem'}} textAlign={{base:'center'}} >
        <Heading fontSize={{base:'1rem',md:'1.2rem'}} > INGRESE LOS GRADOS DE LA ESCUELA</Heading>
      </Flex>
      
      <Card minH={{md:'10vh'}} p={5}>        
        {/* Agregar formulario para ingresar los grados */}
        <Flex 
          flexDir={{base:'colum',md:'row'}} 
          gap={{base:5,md:5}}
          justifyContent={{md:'space-between'}} 
          onSubmit={handleNewDegree}
        >
          <Input 
            type="number"
            value={degree}
            onChange={handleNumberDegree}
          />
          <Button 
            colorScheme='teal' 
            variant='ghost'
            onClick={handleNewDegree}
          >
            Agregar Grado
          </Button>
        </Flex>        
      </Card>
      
      <Flex 
        flexDir={{base:'column',md:'column'}} 
        justifyContent={{base:'center',md:'center'}} 
        p={{base:'1rem'}} 
        textAlign={{base:'center'}}
        mt={{md:5}}
      >
        <Heading fontSize={{base:'1rem',md:'1.2rem'}} > GRADOS REGISTRADOS</Heading>
        {newDegree.map((degree)=>(
          <>
            <Flex flexDir={'column'} paddingBottom={2} >
              <Card minH={{md:'10vh'}} width={'100%'}>
                <List>
                  <DegreeCard
                    key={degree.id}
                    degree={degree}
                    handleDeleteDegree={handleDeleteDegree}
                  />
                </List>
              </Card>

            </Flex>
          </>
        ))}            
      </Flex>
    </SidebarWithHeader>
  );
};

export default Degree;