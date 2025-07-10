import mongoose from "mongoose";
import Product from "../model/product.model.js";
import { data } from "react-router-dom";
export const getProducts = async (req, res) => {
    //find all products and store them
    try{

        const product = await Product.find({});
        res.status(200).json({success : "true", message : "Products fetched successfully", data : product});
    }
    catch(err){
        console.log("error :", err.message);
        res.status(500).json({success : "false", message : "Internal server error"})
    }
}
export const updateProduct = async (req, res) => {
    const {id} = req.params;
    const update = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){ //check if id is valid format or not and not check for that id in our db
        return res.status(404).json({success :"false", message : "Invalid Product ID format"});
    }
    try{
        const updatedProduct = await Product.findByIdAndUpdate(id,update,{new : true});
        if(!updatedProduct){ //to check if asked for was in our db
            return res.status(404).json({success :"false", message : "Product not found"})
        }
        res.status(200).json({success : "true", message : "Products updated successfully", data : updatedProduct})
    }catch(err){
        console.log("error :", err.message);
        res.status(500).json({success : "false", message : "Internal server error"})
    }
}


export const deleteProduct = async (req, res) => {
    const {id} = req.params //hover req.params to see what all are params

    if(!mongoose.Types.ObjectId.isValid(id)){ //check if id is valid format or not and not check for that id in our db
        return res.status(404).json({success :"false", message : "Invalid Product ID format"});
    }

    try{
        const product = await Product.findById(id);
        await product.deleteOne()
        // await Product.findByIdAndDelete(id)
        console.log("Product deleted : ",product.name)
        res.status(200).json({success : "true", message : "Product deleted successfully"})
    }
    catch (err){
        console.log("error :", err.message);
        res.status(500).json({success : "false", message : "Server error"})
    }
}


export const createProduct = async (req, res) => {
    const product = req.body;
    req.params
    if(!product.name || !product.price || !product.img) {
        return res.status(400).json({success : "false", message : "Please provide all the fields"})
    }
    const newProduct = new Product(product);
    try {
        await newProduct.save();
        console.log("Product Saved : ", newProduct);
        res.status(201).json({success : "true", message : "Product created successfully", data : newProduct})
        
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success : "false", message : "Internal Server Error"}) //we can sent html also as response, here we are using postman so we are providing json
    }
}
    
export const deleteAll = async(req, res) => {
    try{
        await Product.deleteMany({});
        res.status(200).json({success : "true", message : "DB Cleared Successfully"})
        console.log("Product deleted successfully");
    }catch(e){
        console.log("Error :", e);
        res.status(500).json({success: "false", message : "Server Error"})
    }
}