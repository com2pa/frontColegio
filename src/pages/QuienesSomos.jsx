import { Card, Flex, Image, Text,} from '@chakra-ui/react';
import React from 'react';
import Menu from '../layout/Menu';
import Footer from '../layout/Footer';
import Profesores from '../assets/quienesomos.jpg';

export const QuienesSomos = () => {
  return (
    <Flex flexDir="column" gap={8} p={8} maxW="90rem" mx="auto">     
      <Menu/>
      <Flex gap={4} flexDir={{ base: 'column', md: 'row', }} > 
        <Card 
          variant="outline" 
          w="100%" 
          textAlign="justify" 
          justifyContent="center"
          
        >
          <Flex flexDir="column" alignContent="center"p={4}  gap="3rem">
            <Text color="red.600" fontSize={{ base: 25, md: 45}} fontWeight="600">
                Quienes Somos
  
            </Text>
            <Text fontSize={{ base: 16, md: 24 }} fontWeight="400">
                Colegio Nacional de Educación Tecnológica, Nuestra Misión es brindar educación superior a la medida de nuestro conocimiento y nuestra experiencia. En este espacio, buscamos desarrollar conocimientos y habilidades que nos permitan ser un líderes en el mundo de la tecnología.
            </Text>
                         
          </Flex>
        </Card>
        <Card variant="outline" width="100%" height="30rem" display={{base: 'none', md: 'block'}}>
          <Image src={Profesores} alt="cerrar-equipo-listo-trabajar" height="100%" objectFit="cover" w="100%"  /> 
        </Card>
      </Flex> 

      <Footer/>
    </Flex>
  );
};
