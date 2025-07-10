import { Box, Button, calc, Container, Flex, HStack, Text, useColorMode } from '@chakra-ui/react'
import { CiSquarePlus } from "react-icons/ci";
import { MdOutlineDarkMode ,MdOutlineLightMode } from "react-icons/md";
import { Link } from 'react-router-dom'

const NavBar = () => {
  const {colorMode, toggleColorMode} = useColorMode();

  return (
    <Container maxW={"1140px"} px={4} mb={8}>
      <Flex
        flexDir={{ base: "column", sm: "row" }}
        justifyContent={'space-between'}
        alignItems={"center"}
        h={16}
      >
        <Text
          textAlign={'center'}
          fontSize={{ base: 22, sm: 28 }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          bgGradient={'linear(to-r, #34C9FA,rgb(49, 26, 255))'}
          bgClip={"text"}
        >
          {/* instead of anchor tag */}
          <Link to={"/"} >Product Store 🛍️</Link>
        </Text>


        <HStack spacing={2}>
          <Link to={"/create"}>
            <Button> <CiSquarePlus fontSize={18} /> </Button>
          </Link>
          <Button onClick={toggleColorMode} >
              {colorMode === 'light' ? <MdOutlineLightMode  fontSize={18} /> : <MdOutlineDarkMode fontSize={18}/>}
          </Button>

          
        </HStack>

      </Flex>
    </Container>
  )
}

export default NavBar