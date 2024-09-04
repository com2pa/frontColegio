'use client';

import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
const REGEX_EMAIL = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const REGEX_PASS = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z\d\s]).{8,15}$/;

export const SplitScreen=()=> {
  const { setAuth } = useAuth(); 
  const [email, setEmail] = useState('');
  const [emailValidation, setEmailValidation] = useState(true);

  const [password, setPassword] = useState('');
  const [passwordValidation, setPasswordValidation] = useState(true);

  const [isLoginValid, setIsLoginValid] = useState(true);

  const handleEmailInput = ({ target }) => {
    setEmail(target.value);
    // console.log(target.value)

  };
  const toast = useToast();

  const navegate = useNavigate();
  const handlePassword = ({ target }) => {
    setPassword(target.value);
    // console.log(target.value)
  };

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setEmailValidation(REGEX_EMAIL.test(email));
  }, [email]);

  useEffect(() => {
    setPasswordValidation(REGEX_PASS.test(password));
  }, [password]);

  useEffect(() => {
    setIsLoginValid(emailValidation && passwordValidation);

  }, [emailValidation, passwordValidation]);

  useEffect(() => {
    if (isLoginValid) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [isLoginValid]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = {
        user_id: 1,
        email,
        password,
      };
      const response = await axios.post('/api/login', user);
      setAuth(response.data);
      setIsLoading(false);

      if (response.data) {
        // console.log('Login correcto');
        toast({
          title: 'Login correcto',
          description: response.data.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });

      } else {
        // console.log('Correo o contraseña incorrectos');
        toast({
          title: 'Error de inicio de sesión',
          description: response.data.messege,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });

      }

      navegate('/dashboard');
      //window.location.pathname =`/Servicio/`
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast({
        title: 'datos de ingresados',
        description: error.response.data.error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });

    }


  };
  return (


    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Sign in to your account</Heading>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" onChange={handleEmailInput} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" onChange={handlePassword}/>
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Checkbox>Remember me</Checkbox>
              <Text color={'blue.500'}>Forgot password?</Text>
            </Stack>
            <Button colorScheme={'blue'} variant={'solid'} onClick={handleLogin} isDisabled={!isLoginValid} isLoading={!isLoading}>
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
          }
        />
      </Flex>
    </Stack>
  );
};

export default SplitScreen;