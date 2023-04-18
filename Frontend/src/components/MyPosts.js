import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Image,
  Stack,
  Heading,
  Button,
  Text,
  Grid,
  GridItem,
  Center,
  useToast
} from '@chakra-ui/react';
import '../index.css';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Posts () {
  const [dataList, setDataList] = useState([]);
  const toast = useToast();
  const getPosts = () => {
    axios
      .get('http://0.0.0.0:8000/getPosts/' + sessionStorage.getItem('emailId'))
      .then(
        response => {
          const data  = response.data.filter(function(item){
            return item.status !== 'soldOut';
         })
          setDataList(data);
        },
        error => {
          console.log('error');
        }
      );
  };

  const formatDate = date => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    var d = new Date(date),
      month = '' + months[d.getMonth() + 1],
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [month, day, year].join('-');
  };

  const handlePost = (id) => {
    axios
      .put('http://0.0.0.0:8000/deletePost/' + id)
      .then(
        response => {
          toast({
            title: 'Post has been deleted',
            position: 'top-right',
            status: 'success',
            isClosable: true,
          });
          getPosts();
        },
        error => {
          toast({
            title: 'Post cannot be deleted at the moment',
            position: 'top-right',
            status: 'error',
            isClosable: true,
          });
        }
      );
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <ChakraProvider>
      {dataList.map(function (data) {
        const {
          carMake,
          carMileage,
          carModel,
          carYear,
          contact,
          dateCreated,
          description,
          image,
          price,
          status,
          title,
          user,
          id
        } = data;
        return (
          <Center width='100%' py={4}>
            {status !== 'soldOut' && <Stack
              borderWidth='1px'
              borderRadius='lg'
              w={{ sm: '100%', md: '540px' }}
              height={{ sm: '476px', md: '20rem' }}
              direction={{ base: 'column', md: 'row' }}
              boxShadow={'2xl'}
              padding={4}
            >
             {image.split('//Z,').length > 1 ? (
                <Carousel showArrows={true}>
                  {image.split('//Z,').map(image => {
                    return (
                      <div>
                        <img alt='' src={image+'//Z'} id="carousel"/>
                      </div>
                    );
                  })}
                </Carousel>
              ) : (
                <Image src={image} />
              )}
              <div style={{ width: '100%' }}>
                <div className='d-flex flex-row justify-content-between w-100'>
                  <div>
                    <Heading fontSize={'2xl'} fontFamily={'body'}>
                      {title}
                    </Heading>
                  </div>
                  <div>
                    <Button
                      fontSize={'sm'}
                      rounded={'full'}
                      bg={'blue.400'}
                      color={'white'}
                      boxShadow={
                        '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                      }
                      _hover={{
                        bg: 'blue.500',
                      }}
                      _focus={{
                        bg: 'blue.500',
                      }}
                      style={{ position: 'absolute', right: '12%' }}
                      onClick={() => handlePost(id)}
                    >
                      Remove Post
                    </Button>
                  </div>
                </div>
                <br/>
                <div style={{ position: 'relative' }}>
                  <div>
                    <div className='row'>
                      <div className='col-12'>
                        <Text fontWeight={600} color={'gray.600'}>
                          {description}
                        </Text>
                      </div>
                    </div>
                  </div>
                  <div className='myinformation-section'>
                    <div className='row'>
                      <div className='col-5'>
                        <Text
                          fontWeight={600}
                          color={'gray.500'}
                          size='sm'
                          mb={4}
                        >
                          Make : {carMake}
                        </Text>
                      </div>
                      <div className='col-7'>
                        <Text
                          fontWeight={600}
                          color={'gray.500'}
                          size='sm'
                          mb={4}
                        >
                          Model : {carModel}
                        </Text>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-5'>
                        <Text
                          fontWeight={600}
                          color={'gray.500'}
                          size='sm'
                          mb={4}
                        >
                          Mileage: {carMileage}
                        </Text>
                      </div>
                      <div className='col-7'>
                        <Text
                          fontWeight={600}
                          color={'gray.500'}
                          size='sm'
                          mb={4}
                        >
                          Make Year: {carYear}
                        </Text>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-5'>
                        <Text
                          fontWeight={600}
                          color={'gray.500'}
                          size='sm'
                          mb={4}
                        >
                          Price: {price}
                        </Text>
                      </div>
                      <div className='col-7'>
                        <Text
                          fontWeight={600}
                          color={'gray.500'}
                          size='sm'
                          mb={4}
                        >
                          Date Posted: {formatDate(dateCreated)}
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Stack>}
          </Center>
        );
      })}
    </ChakraProvider>
  );
}
