import ProductModel from "./models/product.model.js";
import ErrorManager from "../../managers/ErrorManager.js";
import { isValidID } from "../../config/mongoose.config.js";
import { convertToBoolean } from "../../utils/converter.js";

export default class ProductsDAO{

    get = async (id)=>{
        if (!isValidID(id)) {
            throw new ErrorManager("ID inválido", 400);
        }
        const productFound = await ProductModel.findById(id);

        if (!productFound) {
            throw new ErrorManager("ID no encontrado", 404);
        }
        return productFound;
    }

    getAll = async (params)=>{

        const $and = [];

        if (params?.avail) $and.push({ status: convertToBoolean(params.avail) });
        if (params?.category) $and.push({ category: { $regex: params.category, $options: "i" } });
        const filters = $and.length > 0 ? { $and } : {};

        const sort = {
            asc: { price: 1 },
            desc: { price: -1 },
        };

        const myCustomLabels = {
            limit: false,
            totalDocs: false,
            pagingCounter: false,
            };

        const paginationOptions = {
            limit: params?.limit || 10, // Número de documentos por página (por defecto 10)
            page: params?.page || 1, // Página actual (por defecto 1)
            sort: sort[params?.sort] ?? {}, // Ordenamiento (sin orden por defecto)
            lean: true, // Convertir los resultados en objetos planos
            customLabels: myCustomLabels,
        };

        return await ProductModel.paginate(filters, paginationOptions);
    }

    post = async (data)=>{

        const product = await ProductModel.create({
            ...data,
            status: convertToBoolean(data.status),
        });

        return product;
    }

    put = async (id, data)=>{
        const product = await this.get(id);
        const newValues = {
            ...product,
            ...data,
            status: data.status ? convertToBoolean(data.status) : product.status,
        };

        product.set(newValues);
        product.save();

        return product;
    }

    delete = async (id)=>{
        const product = await this.get(id);
        return await product.deleteOne();
    }

}