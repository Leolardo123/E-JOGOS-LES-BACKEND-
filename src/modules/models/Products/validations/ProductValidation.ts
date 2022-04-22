import { IValidate } from "@modules/models/validations/IValidate";
import AppError from "@shared/errors/AppError";
import Product from "../Product";

export default class ProductValidation extends IValidate {
  public async validate(product: Product): Promise<void> {
    if(!product){
        throw new AppError('Produto não encontrado.');
    }
    if(product.stock < 0){
        throw new AppError(`Produto ${product.name} não possui estoque suficiente.`);
    }
    if(product.stock === 0){
        product.isActive = false;
    }
  }
}