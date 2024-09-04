'use client';

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,  
  FormHelperText,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import axios from 'axios';

const REGEX_EMAIL=/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const REGEX_NAME = /^[A-Z][a-z]*[ ][A-Z][a-z]*$/;
const REGEX_PHONE = /^[0](212|412|414|424|416|426)[0-9]{7}$/;
const REGEX_PASS =/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z\d\s]).{8,15}$/;

export const SignupCard=()=> {
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState('');
  const [nameValidation, setNameValidation] = useState(false);

  const [lastname, setLastname]= useState('');
  const [lastNameValidation, setLastNameValidation] = useState(false);

  const [email, setEmail] = useState('');
  const [emailValidation, setEmailValidation] = useState(false);
  
  const [phone, setPhone] = useState('');
  const [phoneValidation, setPhoneValidation] = useState(false);

  const [address, setAddress] = useState('');
  const [addressValidation, setAddressValidation] = useState(false);



  const [cedula, setCedula]= useState('');
  const [cedulaValidation, setCedulaValidation] = useState(false);


  const [password, setPassword] = useState('');
  const [passwordValidation, setPasswordValidation] = useState(false);

  const handleNameInput =({target})=>{
    setName(target.value);
  };
  const handleLastNameInput =({target})=>{
    setLastname(target.value);
  };
  const handleEmailInput =({target})=>{
    setEmail(target.value);
  };
  const handlePhoneInput =({target})=>{
    setPhone(target.value);
  };
  const handleAddressInput =({target})=>{
    setAddress(target.value);
  };
  
  const handleCedulaInput =({target})=>{
    setCedula(target.value);
    console.log(target.value);
  };
  const handlePasswordInput =({target})=>{
    setPassword(target.value);
  };


  
  useEffect(()=>{
    setNameValidation(REGEX_NAME.test(name));
  },[name]);
  useEffect(()=>{
    setLastNameValidation(REGEX_NAME.test(lastname));
  },[lastname]);
  useEffect(()=>{
    setEmailValidation(REGEX_EMAIL.test(email));
  },[email]);
  useEffect(()=>{
    setPhoneValidation(REGEX_PHONE.test(phone));
  },[phone]);
  useEffect(()=>{
    setAddressValidation(address);
  },[address]);
  useEffect(()=>{
    setCedulaValidation(cedula);
  },[cedula]);
  useEffect(()=>{
    setPasswordValidation(REGEX_PASS.test(password));
  },[password]);
  const toast =useToast();
  const handleNewUser= async()=>{
    try {
      const {data}= await axios.post('/api/users',{name,lastname,phone,email,cedula,address,password});
      console.log('creado! ',data);
      toast({
        position:'top',
        title: 'Success',
        description: data,
        status:'success',
        duration:4000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        position:'top',
        title: 'Error',
        status: 'error',
        description: error.response.data.error,
        duration:4000,
        isClosable: true,
      });
        
    }
  };
  




  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Registrate
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired isInvalid={!nameValidation && name}>
                  <FormLabel>Nombre Completo</FormLabel>
                  <Input type="text" onChange={handleNameInput} value={name} />
                  {nameValidation ? ''
                    

                    : (
                      <FormHelperText color='red' border='0.5px solid red' margin='0.5rem' padding='1rem'>
                        <p> Debe comenzar con mayuscula tanto el nombre como apellido</p>
                        <p>1.- Primer caracter en Mayuscula del nombre seguido el resto del nombre en minuscula</p>
                        <p>2.- Primer caracter en Mayuscula deL apellido seguido el resto del nombre en minuscula
                            Merwil Vegas</p>
                      </FormHelperText>
                  
                    ) 
                  }
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName"isRequired isInvalid={!lastNameValidation & lastname} >
                  <FormLabel>Apellido Completo</FormLabel>
                  <Input type="text" onChange={handleLastNameInput} value={lastname} />
                  {lastNameValidation ? ''
                   
                    :  (
                      <FormHelperText color='red' border='0.5px solid red' margin='0.5rem' padding='1rem'>
                        <p> Debe comenzar con mayuscula tanto el nombre como apellido</p>
                        <p>1.- Primer caracter en Mayuscula del nombre seguido el resto del nombre en minuscula</p>
                        <p>2.- Primer caracter en Mayuscula deL apellido seguido el resto del nombre en minuscula
                            Merwil Vegas</p>
                      </FormHelperText>
                  
                    ) 
  
                  }
                </FormControl>
              </Box>
            </HStack>
            <HStack>
              <Box>
                <FormControl id="phone" isRequired isInvalid={!phoneValidation && phone}>
                  <FormLabel>Telefono </FormLabel>
                  <Input type="tel" onChange={handlePhoneInput} value={phone} />
                  {phoneValidation ? ''
                    
                    : (
                      <FormHelperText color='red' border='0.5px solid red' margin='0.5rem' padding='1rem'>
                          Debe ser un numero de telefono valido
                        <p>1-. Debe comenzar con 0</p>
                        <p>2.- seguido 212  o 412 o 414 o 416 424  o 426</p>
                      </FormHelperText>
                    )

                  }
                </FormControl>
              </Box>
              <Box>
                <FormControl id="cedula" isRequired isInvalid={!cedulaValidation && cedula}>
                  <FormLabel>Cedula</FormLabel>
                  <Input type="Number" onChange={handleCedulaInput} value={cedula} />
                </FormControl>

              </Box>
            </HStack>
            <HStack>
              
              <FormControl id="email" isRequired isInvalid={!emailValidation && email}>
                <FormLabel>Correo Electronico</FormLabel>
                <Input type="email" onChange={handleEmailInput} value={email} />
              </FormControl>
              
              
            </HStack>
            <FormControl id="address" isRequired isInvalid={!addressValidation && address}>
              <FormLabel>Direccion de vivienda</FormLabel>
              <Input type="text" onChange={handleAddressInput} value={address} />
            </FormControl>
            
            <FormControl id="password" isRequired isInvalid={!passwordValidation && password}>
              <FormLabel>Contraseña</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} onChange={handlePasswordInput} value={password} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {passwordValidation ? ''
              
                :   (
                  <FormHelperText color='red' border='0.5px solid red' margin='0.5rem' padding='1rem'>
                    <p>Debe contener al menos una mayuscula, una minuscula, un numero y un caracter especial </p>
                    <p>1.- Contiene al menos una letra mayúscula ([A-Z]). </p>
                    <p>2.- Contiene al menos una letra minúscula ([a-z]). </p>
                    <p>3.- Contiene al menos un dígito . </p>
                    <p>4.- No tiene espacios en blanco. </p>
                    <p>5.- Contiene al menos un carácter especial que no sea letra ni dígito . </p>
                    <p>6.- Tiene una longitud total entre 8 y 15 caracteres. </p>
                  </FormHelperText>             
  
                )
              }
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={handleNewUser}>
                Resgistro
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Ya eres usuario? <Link color={'blue.400'}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default  SignupCard;