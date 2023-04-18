import React, { useState } from 'react';
import {
  ChakraProvider,
  Image,
  Stack,
  Heading,
  Text,
  Grid,
  GridItem,
  Center,
} from '@chakra-ui/react';
import '../index.css';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Posts () {
  const [dataList, setDataList] = useState([]);
  const getPosts = () => {
    axios.get('http://0.0.0.0:8000/getPosts').then(
      response => {
        const data = response.data.filter(function (item) {
          return item.status !== 'soldOut';
        });
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

  React.useEffect(() => {
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
        } = data;
        return (
          <Center width='100%' py={4}>
            <Stack
              borderWidth='1px'
              borderRadius='lg'
              w={{ sm: '100%', md: '540px' }}
              height={{ sm: '476px', md: '20rem' }}
              direction={{ base: 'column', md: 'row' }}
              boxShadow={'2xl'}
              padding={4}
            >
              {image.split(' ').length > 1 ? (
                <Carousel showArrows={true}>
                  {image.split(' ').map(img => {
                    return (
                      <div>
                        <img alt='' src={img} id="carousel"/>
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
                </div>
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
                  <div className='information-section'>
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
                    <div className='row'>
                      <div className='col-5'>
                        <Text
                          fontWeight={600}
                          color={'gray.500'}
                          size='sm'
                          mb={4}
                        >
                          Contact: {contact}
                        </Text>
                      </div>
                      <div className='col-7'>
                        <Text
                          fontWeight={600}
                          color={'gray.500'}
                          size='sm'
                          mb={4}
                        >
                          Posted BY: {user}
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Stack>
          </Center>
        );
      })}
    </ChakraProvider>
  );
}
