import {create} from 'zustand'

export const useProductStore = create((set)=> ({
    products : [],
    setProducts : (products) => set({products}),//when key and value have same name, we can skip key
    createProduct : async (newProduct) => {
        if(!newProduct.name || !newProduct.price || !newProduct.img){
            return {success : "false", message : "please fill in all fields."}
        }
        const res = await fetch("/api/product", { //we will be recieving response from the backend
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(newProduct)
        })

        const data = await res.json();
        console.log(data.data);
        set(prev => ({ products : [...prev.products, data.data]})) //will update only products unlike in useStates
        return data;
    },
    fetchProducts: async () => {
        const response = await fetch("/api/product");
        const data = await response.json(); // to convert json string to json object
        set({ products : data.data})
    },
    deleteProduct : async (pid) => {
        console.log(pid);
        const res = await fetch(`/api/product/${pid}`,{
            method : "DELETE",
        });
        const data = await res.json();
        console.log(data);
        if(!data.success){
            return {
                success : false,
                message : data.message
            }
        }
        set( prev => ({products  : prev.products.filter(product => ( product._id !== pid))})) //else we need to mount home page again to see the changes
        return {success : true, message : data.message};
    },
    updateProduct : async (id, updatedProduct) => {
        const res = await fetch(`/api/product/${id}`,{
            method : 'PUT',
            headers:{
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(updatedProduct)
        });
        const data = await res.json();
        console.log(data.success);

        if(!data.success) return {success : false, message : data.message}

        set(prev => ({products: prev.products.map((product) => product._id === id ? data.data : product ) }))

        return {success : true, message : data.message}

    }
}));