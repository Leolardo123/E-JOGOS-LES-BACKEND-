import CartItem from "@modules/models/Sales/CartItem";
import GenericRepositoryProvider from "@modules/Repositories/Generic/implementations/GenericRepositoryProvider";
import { ITransaction } from "@shared/container/providers/RepositoryUtilsProvider/models/IRepositoryUtils";
import AppError from "@shared/errors/AppError";
import { injectable } from "tsyringe";

interface ICartItem {
    quantity: number;
    cart_id: string;
    product_id: string;
}

interface IRequest {
    item: ICartItem;
    user_id: string;
}

@injectable()
export default class CreateCartService {
    public async execute({
        item,
        user_id
    }: IRequest): Promise<CartItem | void> {
        const cartRepository = new GenericRepositoryProvider(CartItem);

        const cartItemExists = await cartRepository.findOne({
            where: {
                product_id: item.product_id,
                cart: {
                    person: {
                        user_id
                    }
                }
            },
            relations: ["cart", "cart.person","product"]
        });

        if(!cartItemExists) {
            throw new AppError('Item do carrinho não encontrado.');
        }

        if (item.quantity == 0) {
            await cartRepository.remove(cartItemExists);
            return ;
        }

        const stockDiff = item.quantity - cartItemExists.quantity;
        cartItemExists.product.stock -= stockDiff;

        cartItemExists.quantity = item.quantity;
        cartItemExists.price = cartItemExists.product.price * item.quantity;

        await cartRepository.save(cartItemExists);

        return cartItemExists;
    }
}