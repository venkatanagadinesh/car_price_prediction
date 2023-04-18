import React, {useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    useToast
  } from '@chakra-ui/react';
  import axios from 'axios';
  
  export default function SignIn() {
    const toast = useToast();
    const navigate = useNavigate();
    const [form, setForm] = useState({emailId: '', password: ''})

    const handleChange = (e) => {
      setForm(prevState => ({
        ...prevState,
        [e.target.id]: e.target.value
    }));
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post('http://localhost:8000/login', form).then(
      response => {
        if (response.data.message === "success") {
          sessionStorage.setItem('emailId', form.emailId)
          navigate("/dashboard")
        }
        else{
          toast({
            title: 'Something seems to be wrong.',
            position: 'top-right',
            status: 'error',
            isClosable: true,
          })
        }
      },
      error => {
        toast({
          title: 'Something seems to be wrong.',
          position: 'top-right',
          status: 'error',
          isClosable: true,
        })
      }
    );
    }

    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="emailId">
                <FormLabel>Email address</FormLabel>
                <Input type="email" onChange={handleChange}/>
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" onChange={handleChange}/>
              </FormControl>
              <Stack spacing={4}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}>
                  justify={'right'}
                  <Text fontSize='0.8em' >
                  Not registered yet? <Link to='/signup' style={{'color': 'blue'}}>Create an Account</Link>
                </Text>
                </Stack>
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }