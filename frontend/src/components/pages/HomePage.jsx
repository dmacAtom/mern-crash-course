import { Box, Container, Flex, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useProductStore } from '../../../store/product'
import ProductCard from '../Card/ProductCard'

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    const getData = async() => {
      await fetchProducts();
    }
    getData()
    console.log("products fetched");
  }, []) //everytime component gets mounted we need to fetch the product
  // console.log(products);
  return (
    <Container maxW={'container.xl'} p={4} >
      <VStack spacing={5} p={5} boxSizing='border-box'>
        <Text
          bgGradient={'linear-gradient(90deg, #43b1ff, #0c0092)'}
          bgClip={"text"}
          fontSize={{ base: 20, sm: 26 }}
          fontWeight={"bold"}
          mb={10}
          textAlign={'center'}
        >
          Current Products 🛍️
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3

          }}
          spacing={{base : 4, sm : 8, md : 10}}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>




        {!products && <Text
          fontSize={{ base: 16, sm: 18 }}
          fontWeight={"bold"}
          mt={5}
          textAlign={'center'}
        >
          No Products Found.
          <Link to={"/create"}>
            <Text as={'span'} color={'blue.500'} _hover={{ textDecoration: 'underline' }} mx={1} > Create a Product</Text>
          </Link>
        </Text>}
      </VStack>
    </Container>
  )
}

export default HomePage