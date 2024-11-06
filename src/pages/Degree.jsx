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
      try {
        const {data}=await axios.get('/api/degrees');
        setNewDegree(data);
        
      } catch (error) {
        console.log(error);
      }
    };        
    getDegree();
  },[]);

  
  // agregar nuevo grado
  const handleNewDegree =async()=>{
    try {
      const{data}=await axios.post(`/api/degrees`,{degree});
      // console.log(data);   
      setNewDegree([...newDegree,data]);  // para actualizar la lista despues de agregar un nuevo grado
      setDegree('');  
      // console.log(updatedDegrees);    
      
      toast({
        title: 'Grado agregado correctamente',
        description:data.degree,
        status:'success',
        duration: 3000,
        isClosable: true,
      });
    
    } catch (error) {
      console.log(error);
    }
  };  

  // eliminar
  const handleDeleteDegree=async(degree)=>{
    try {
      const {data}=await axios.delete(`/api/degrees/${degree.id}`);
      console.log(data);
      const updatedDegrees = newDegree.filter((d)=>d.id !== degree.id);
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
      
      <Card 
        // minH={{md:'10vh'}} 
        p={5}>        
        
        <Flex 
          // flexDir={{md:'column'}} 
          gap={{base:5,md:5}}
          justifyContent={{md:'center',lg:'center'}}           
          onSubmit={handleNewDegree}
          width="100%"
        >
          <Input 
            type="number"
            value={degree}
            onChange={handleNumberDegree}
            placeholder='Grado'         
            bg={'gray.100'}
            
          />
          <Button 
            size='md' 
            colorScheme="yellow"
            color={'white'}
            type='submit'
            onClick={handleNewDegree}
            w={'100%'}

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
        {/* {newDegree.map((degree)=>(
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
        ))}             */}
        {newDegree.length>0?
          newDegree.map((degree)=>(
            <>
              <Card 
                minH={{md:'10vh'}} 
                width='100%'
                key={degree.id}
                mb={4}
              >
                <List>
                  <DegreeCard                    
                    degree={degree}
                    handleDeleteDegree={handleDeleteDegree}
                  />
                </List>
              </Card>
            </>
          )):
          <Heading fontSize={{base:'1rem',md:'1.2rem'}} >No hay grados registrados</Heading>
        }
      </Flex>
    </SidebarWithHeader>
  );
};

export default Degree;