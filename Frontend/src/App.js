import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<SignIn/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
          </Routes>
          </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
