import { Box, Button, Heading, HStack, IconButton,Input, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast, VStack, ModalFooter } from '@chakra-ui/react'
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import React, { useState } from 'react'
import { useProductStore } from '../../../store/product';

const ProductCard = ({ product }) => {
    const textColor = useColorModeValue("gray.600", "gray.200")
    const bgColor = useColorModeValue("white", "gray.800")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [updatedProduct, setUpdatedProduct] = useState(product)

    const {deleteProduct, updateProduct} = useProductStore()
    const toast = useToast()

    const handleDelete = async () => {
        const {success, message} = await deleteProduct(product._id);
        if(!success){
            toast({
                title : 'Error',
                status : 'error',
                description : message,
                isClosable : true,
                duration : 3000
            })
        }
        else {
            toast({
                title : 'Success',
                status : 'success',
                description : message,
                isClosable : true,
                duration : 3000
            })
        }
    }

    const handleChange = (e) => {
        const value = e.target.value;
        const key = e.target.name;
        setUpdatedProduct({...updatedProduct, [key] : value})
    }
    const handleUpdate = async () =>{
        const {success, message} = await updateProduct(product._id, updatedProduct);
        onClose()
        if(!success) toast({
            title : "Error",
            status : "error",
            description : message,
            isClosable : true,
        })
        else {
            toast({
            title : "Success",
            status : 'success',
            description : message,
            isClosable : true,
        })
        }
    } 
    
    return (
        <Box rounded={'lg'} bgColor={bgColor} overflow={'hidden'} shadow={'md'} transition={'all .3s'}
            _hover={{transform : "translateY(-5px)", shadow : 'xl'}}
        >
            <Image src={product.img} alt={product.name}  w={'full'} aspectRatio={1/1} objectFit={'cover'}/>
            <Box p={{base: 2, sm : 3}} color={textColor}>
                
                <Heading
                    fontSize={{
                        base: 14,
                        sm: 16,
                        md : 18
                    }}
                >
                    {product.name}
                </Heading>
                <Text fontSize={{base: 12, sm: 14, md : 16}} >{`$${product.price}`}</Text>
                <HStack mt={{base : 2, sm : 4}} spacing={4}>
                    <IconButton icon={<FaRegEdit />} colorScheme='blue' onClick={onOpen} size={{base : 'xs', sm : 'sm'}}  />
                    <IconButton icon={<MdDelete />} colorScheme='red' onClick={handleDelete} size={{base : 'xs', sm : 'sm'}}/>
                </HStack>
            </Box>

            <Modal onClose={onClose} isOpen = {isOpen} blockScrollOnMount = {true}>
                    <ModalOverlay/>
                    <ModalContent mx={4}>
                        <ModalHeader>Edit Product</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <VStack>
                                <Input name = "name" value = {updatedProduct.name} onChange={handleChange} ></Input>
                                <Input name = "price" value = {updatedProduct.price} onChange={handleChange}></Input>
                                <Input name = "img" value = {updatedProduct.img} onChange={handleChange}></Input>
                            </VStack>
                        </ModalBody>
                        <ModalFooter >
                            {/* <Button colorScheme='blue'  onClick={onClose}>Close</Button> */}
                            <Button variant={'ghost'} w={'full'} onClick={handleUpdate}>Update</Button>
                        </ModalFooter>
                    </ModalContent>
                    
                    
            </Modal>


        </Box>
    )

}
export default ProductCard