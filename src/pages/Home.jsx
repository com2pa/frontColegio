
import {  Card,  Flex,Image,    Text,  } from "@chakra-ui/react";
import Menu from "../layout/Menu";
import Footer from "../layout/Footer";
// import { useNavigate } from "react-router-dom";
import React  from "react";
import Educacion from '../assets/educacion.jpg';



export const Home = () => {  
  return (    
    <>
      <Flex flexDir="column" gap={8} p={8} maxW="90rem" mx="auto">
        <Menu />
      
        {/* seccion 1 */}
        <Flex gap={4} flexDir={{ base: 'column', md: 'row', }} > 
          <Card variant="outline" w="100%" textAlign="justify" justifyContent="center">
            <Flex flexDir="column" alignContent="center"p={4}  gap="3rem">
              <Text color="red.600" fontSize={{ base: 25, md: 45}} fontWeight="600">
                Casa de Niños
              </Text>
                         
            </Flex>
          </Card>
          <Card variant="outline" width="100%" height="30rem" display={{base: 'none', md: 'block'}}>
            <Image 
              src={Educacion} 
              alt="educacion" 
              height="100%" 
              objectFit="cover" 
              w="100%"  /> 
          </Card>
        </Flex> 
        {/* seccion 2 */}
        
      
      
        <Footer/>     
      </Flex>
    </>
  );
};

export default Home;