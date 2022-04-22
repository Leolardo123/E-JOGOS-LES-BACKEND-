import { IValidate } from "@modules/models/validations/IValidate";
import AppError from "@shared/errors/AppError";
import Cart from "../Cart";

export default class CartValidation extends IValidate {
    public async validate(cart: Cart): Promise<void> {
        if(!cart.cartItems || cart.cartItems.length == 0){
            throw new AppError('Não pode salvar um carrinho vazio.');
        }
    }
}