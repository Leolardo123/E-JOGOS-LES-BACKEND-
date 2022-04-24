import Product from "@modules/models/Products/Product";
import Cart, { CartStatusEnum } from "@modules/models/Sales/Cart";
import CartItem from "@modules/models/Sales/CartItem";
import User from "@modules/models/User/User";
import GenericRepositoryProvider from "@modules/Repositories/Generic/implementations/GenericRepositoryProvider";
import IRepositoryUtils, { ITransaction } from "@shared/container/providers/RepositoryUtilsProvider/models/IRepositoryUtils";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { v4 } from "uuid";

interface ICartItem {
    quantity: number;
    cart_id: string;
    product_id: string;
}

interface ICart {
    total_price: number;
    items: ICartItem[];
}

interface IRequest {
    cart: ICart;
    user_id: string;
}

@injectable()
export default class CreateCartService {
    constructor(
        @inject('RepositoryUtils')
        private repositoryUtils: IRepositoryUtils,
    ){}
    public async execute({
        cart,
        user_id
    }: IRequest): Promise<Cart> {
        const transaction: ITransaction = { data: [] };

        const productRepository = new GenericRepositoryProvider(Product);
        const cartRepository = new GenericRepositoryProvider(Cart);
        const cartItemRepository = new GenericRepositoryProvider(CartItem);
        const userRepository = new GenericRepositoryProvider(User);

        const userExists = await userRepository.findOne({
            where: {
                id: user_id
            },
            relations: ["carts"]
        });

        if (!userExists) {
            throw new AppError("Usuário não encontrado.");
        }

        if (!userExists.person) {
            throw new AppError("Usuário não autorizado.");
        }

        const createdCart = cartRepository.create({
            id: v4(),
            status_id: CartStatusEnum.CART_STATUS_OPEN,
            person_id: userExists.person.id,
        });

        let total_price = 0;
        const promiseItems = cart.items.map(async (item) => {
            const productExists = await productRepository.findOne({
                where: {
                    id: item.product_id
                }
            });

            if(!productExists) {
                throw new AppError("Produto não encontrado.");
            }

            productExists.stock -= item.quantity;
            total_price += productExists.price * item.quantity;

            const createdCartItem = cartItemRepository.create({
                id: v4(),
                cart_id: createdCart.id,
                price: productExists.price * item.quantity,
                quantity: item.quantity,
                product_id: item.product_id,
                product: productExists,
            });

            createdCart.cartItems.push(createdCartItem);

            return transaction.data.push({
                entity: createdCartItem,
                repository: cartItemRepository,
            })
        });
        
        await Promise.all(promiseItems);

        createdCart.total_price = total_price;
        transaction.data.push({
            entity: createdCart,
            repository: cartRepository,
        });

        await this.repositoryUtils.transaction(transaction);

        return createdCart;
    }
}