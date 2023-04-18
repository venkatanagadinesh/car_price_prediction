import React from "react";
import { Link, useNavigate } from "react-router-dom";
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
    useToast
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import axios from 'axios';
  
  export default function SignUp() {
    const toast = useToast();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({firstName: '', lastName: '', emailId: '', password: ''})

    const handleChange = (e) => {
      setForm(prevState => ({
        ...prevState,
        [e.target.id]: e.target.value
    }));
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post('http://localhost:8000/createAccount', form).then(
      response => {
        if (response) {
          toast({
            title: 'You can now login with your credentials',
            position: 'top-right',
            status: 'success',
            isClosable: true,
          })
          navigate("/")
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
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input type="text" onChange={handleChange}/>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text"  onChange={handleChange}/>
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="emailId" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" onChange={handleChange}/>
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} onChange={handleChange}/>
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign up
                </Button>
              </Stack>
              <Stack pt={2}>
                <Text align={'center'}>
                  Already a user? <Link to='/' style={{'color': 'blue'}}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }