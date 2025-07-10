// import { Button } from '@chakra-ui/react'
// import { Button } from '@chakra-ui/react'
import { Box, Button, useColorMode, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/Navbar/NavBar';
import HomePage from './components/pages/HomePage';
import CreatePage from './components/pages/CreatePage';

const App = () => {
  return (
    <Box minH={'100vh'}  bg={useColorModeValue("gray.100", "gray.900")}>
        <NavBar/>
        <Routes>  {/*to navigate between different pages in this single page application */}

          <Route path='/' element = {<HomePage/>}/>
          <Route path='/create' element = {<CreatePage/>}/>
          <Route path='*' element = {<HomePage/>}/>
        </Routes>
    </Box>
  )
}

export default App