import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { useProductStore} from "../../../store/product"

const CreatePage = () => {
  
  const toast = useToast();

  const [product ,setProduct] = useState({
    name:"",
    price : "",
    img:""
  })
  const {createProduct} = useProductStore()
  function handleChange(e){
    const value = e.target.value;
    const key = e.target.name
    setProduct({...product, [key] : value})
  }
  async function handleClick(){
    const {success, message, data} = await createProduct(product)
    if(success === 'false'){
        toast({
          title : "Error",
          description : message,
          status : 'error',
          isClosable : true
        })
    }
    else{
      toast({
          title : "Success",
          description : message,
          status : 'success',//important
          isClosable : true
        })
    }
    setProduct({name : "", price:"", img : ""});
  }

  return (
    <Container maxW={'container.md'}>
      <VStack spacing={8} m={4}>
          <Heading textAlign={'center'} mb={6}>Create New Product</Heading>
          <Box width={'full'} bg={useColorModeValue("white",'gray.800')} shadow={'md'} p={6} borderRadius={'md'}>
            <VStack spacing={5}>
              <Input name="name" placeholder="Product Name" value={product.name} onChange={handleChange}/>
              <Input name="price" placeholder="Product Price" value={product.price} onChange={handleChange}/>
              <Input name="img" placeholder="Product Image URL" value={product.img} onChange={handleChange}/>
              <Button colorScheme="blue" onClick={handleClick} w={'100%'}>Add Product</Button>
            </VStack>

          </Box>

      </VStack>

    </Container>
  )
}

export default CreatePage