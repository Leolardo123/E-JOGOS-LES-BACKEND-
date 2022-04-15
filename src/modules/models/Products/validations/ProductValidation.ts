import AppError from "@shared/errors/AppError";
import Product from "../Product";

export const validateProduct = (entity: Product) => {
    if(!entity){
        throw new AppError('Produto não encontrado.');
    }
    if (entity.stock < 0) {
        throw new AppError(`Ultrapassou a quantidade de estoque do item ${entity.name}`);
    }
    if(entity.stock === 0){
        entity.isActive = false;
    }
}