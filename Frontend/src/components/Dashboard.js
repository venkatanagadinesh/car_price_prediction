import React, { ReactNode, useState } from 'react';
import '../index.css';
import PredictionPage from './PredictionPage';
import Posts from './Posts';
import MyPosts from './MyPosts';
import CreatePostForm from './CreatePostForm'
import { useNavigate } from "react-router-dom";
import logo from '../page-logo.png'
import {
  Box,
  CloseButton,
  Flex,
  HStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image
} from '@chakra-ui/react';
import {
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiChevronDown,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import axios from 'axios';
interface LinkItemProps {
  name: string;
  icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Posts', icon: FiCompass },
  { name: 'My Posts', icon: FiStar },
  { name: 'Predict Car Price', icon: FiTrendingUp },
];

export default function Dashboard({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [viewName, setViewName] = useState('');
  const [userFirstName, setUserFirstName] = useState('')
  const handleSidebarClick = linkName => {
    setViewName(linkName);
  };
  const getUserDetails = () => {
    axios.get('http://0.0.0.0:8000/getUserDetails/'+sessionStorage.getItem('emailId')).then(
      response => {
        console.group(response.data)
        setUserFirstName(response.data.firstName + ' ' + response.data.lastName)
      },
      error => {
       console.log('error')
      }
    );
  }

  const handleLogout = () => {
    sessionStorage.removeItem('emailId')
    navigate('/')
  }

  const [modalOpen, setModalOpen] = useState(false)
  const handleModalChange = () => {
    console.log( modalOpen)
    setModalOpen(!modalOpen)
    setViewName('')
  }

  React.useEffect(() => {
    getUserDetails();
    setViewName('Posts')
  },[modalOpen])
  return (
    <Box minH='100vh' bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
        viewname={handleSidebarClick}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size='full'
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} viewname={handleSidebarClick} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onopen={onOpen} userFirstName={userFirstName} handleLogout={handleLogout} handleModalChange={handleModalChange} viewName={viewName}/>
      <Box ml={{ base: 0, md: 60 }} p='4'>
        {children}
        {viewName === 'Predict Car Price' ? <PredictionPage /> : null}
        {viewName === 'Posts' ? <Posts /> : null}
        {viewName === 'My Posts' ? <MyPosts /> : null}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, viewname, ...rest }: SidebarProps) => {
  return (
    <Box
      transition='3s ease'
      bg={useColorModeValue('white', 'gray.900')}
      borderRight='1px'
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos='fixed'
      h='full'
      {...rest}
    >
      <Flex h='20' alignItems='center' mx='8' justifyContent='space-between'>
       <Image src={logo} style={{'margin-left':'0px'}}/>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map(link => (
        <NavItem
          key={link.name}
          icon={link.icon}
          onClick={() => viewname(link.name)}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Link
      href='#'
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align='center'
        p='4'
        mx='4'
        borderRadius='lg'
        role='group'
        cursor='pointer'
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr='4'
            fontSize='16'
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onopen, userFirstName, handleLogout,handleModalChange,viewName,     ...rest }: MobileProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height='20'
      alignItems='center'
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth='1px'
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize='2xl'
        fontFamily='monospace'
        fontWeight='bold'
      >
        Logo
      </Text>      
      <HStack spacing={{ base: '0', md: '6' }} w="100%">
      <Text
        fontSize='2xl'
        fontWeight='bold'
        w={'inherit'}
      >
        {viewName}
      </Text>
      <div className='d-flex justify-content-end align-items-baseline w-100'>
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
          style={{ right: '15px' }}
          onClick={onOpen}
        >
          Create A Post
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create A Post</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <CreatePostForm onClose={onClose} handleModalChange={handleModalChange}/>
            </ModalBody>
          </ModalContent>
        </Modal>
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition='all 0.3s'
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <Text fontSize='sm'>{userFirstName}</Text>
                <FiChevronDown />
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'white')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <MenuItem onClick={handleLogout}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        </div>
      </HStack>
    </Flex>
  );
};
