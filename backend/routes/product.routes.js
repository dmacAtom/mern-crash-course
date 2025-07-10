import { Router } from "express";
import { createProduct, deleteAll, deleteProduct, getProducts, updateProduct } from "../controller/product.controller.js";
import path from 'path'
const router = Router();

router.post("/", createProduct)

router.delete("/all", deleteAll)

router.delete("/:id", deleteProduct)

router.get("/", getProducts)

router.put("/:id", updateProduct)



export default router