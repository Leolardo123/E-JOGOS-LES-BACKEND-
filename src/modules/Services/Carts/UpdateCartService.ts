import Cart from "@modules/models/Sales/Cart";
import CartItem from "@modules/models/Sales/CartItem";
import User from "@modules/models/User/User";
import GenericRepositoryProvider from "@modules/Repositories/Generic/implementations/GenericRepositoryProvider";
import IRepositoryUtils, { ITransaction } from "@shared/container/providers/RepositoryUtilsProvider/models/IRepositoryUtils";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface ICartItem{
    id: string;
    quantity: number;
}

interface ICart {
    cart_id: string;
    items: ICartItem[];
}

interface IRequest {
    cart: ICart;
    user_id: string;
}

@injectable()
export default class UpdateCartService {
    constructor(
        @inject('RepositoryUtils')
        private repositoryUtils: IRepositoryUtils,
    ){}
    public async execute({
        cart,
        user_id
    }: IRequest): Promise<Cart> {
        const transaction: ITransaction = { data: [] };
        const cartRepository = new GenericRepositoryProvider(Cart);
        const cartItemRepository = new GenericRepositoryProvider(CartItem);
        const userRepository = new GenericRepositoryProvider(User);

        const userExists = await userRepository.findOne({
            where: {
                id: user_id
            },
        });

        if(!userExists) {
            throw new AppError("Usuário não encontrado.");
        }

        const cartExists = await cartRepository.findOne({
            where: {
                id: cart.cart_id,
            },
        });

        if(!cartExists) {
            throw new AppError("Carrinho não encontrado.");
        }

        if(cartExists.person_id !== userExists.person?.id) {
            throw new AppError("Usuário não autorizado.");
        }

        cart.items.forEach(async (item) => {
            const index = cartExists.cartItems.findIndex(exist => exist.id === item.id);

            if(index === -1) {
                throw new AppError(`Item ${item.id} não encontrado.`);
            }

            const itemExists = cartExists.cartItems[index];

            const { price } = itemExists.product;

            cartExists.total_price -= itemExists.price;

            const updatedItem = {
                cart_id: cartExists.id,
                product_id: itemExists.product_id,
                quantity: item.quantity,
                price: price * item.quantity,
            } as CartItem;

            cartExists.total_price += updatedItem.price;

            transaction.data.push({
                entity: updatedItem,
                repository: cartItemRepository
            })

            cartExists.cartItems[index] = updatedItem;
        });

        await this.repositoryUtils.transaction(transaction);

        return cartExists;
    }
}