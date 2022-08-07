import { IValidate } from "@modules/models/validations/IValidate";
import AppError from "@shared/errors/AppError";
import CartItem from "../CartItem";


export default class CartItemValidation extends IValidate {
    public async validate(item: CartItem): Promise<void> {
        if(!item.product){
            throw new AppError('Falha ao carregar produto do carrinho.');
        }
        if(item.quantity == 0){
            throw new AppError('Quantidade deve ser maior que zero.');
        }
    }
}