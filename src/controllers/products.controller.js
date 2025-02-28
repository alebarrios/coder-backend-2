import { productService } from '../services/ProductService.js';

async function getAllProducts(req,res){
    try {
        const productsListDTO = await productService.getAllProducts(req.query);
        res.status(200).json({ status: "success", payload: productsListDTO.toJSON() });

    } catch (error) {
        res.status(error.code).json({ status: "error", message: error.message });
    }
};

async function getProductById(req,res){
    try {
        const { id } = req.params;
        const productDTO = await productService.getOneById(id);
        res.status(200).json({ status: "success", payload: productDTO.toJSON() });

    } catch (error) {
        res.status(error.code).json({ status: "error", message: error.message });
    }
};

async function postProduct(req,res){
    try {
        const productDTO = await productService.insertOne(req.body);
        res.status(201).json({ status: "success", payload: productDTO.toJSON() });

    } catch (error) {
        res.status(error.code).json({ status: "error", message: error.message });
    }
};

async function putProduct(req,res){
    try {
        const { id } = req.params;
        const productDTO = await productService.updateOneById(id, req.body);
        res.status(200).json({ status: "success", payload: productDTO.toJSON() });

    } catch (error) {
        res.status(error.code).json({ status: "error", message: error.message });
    }
};

async function deleteProduct(req,res){
    try {
        const { id } = req.params;
        const productDTO = await productService.deleteOneById(id);
        res.status(200).json({ status: "success", payload: productDTO.toJSON() });

    } catch (error) {
        res.status(error.code).json({ status: "error", message: error.message });
    }
};

export default
{getAllProducts,
getProductById,
postProduct,
putProduct,
deleteProduct,
}