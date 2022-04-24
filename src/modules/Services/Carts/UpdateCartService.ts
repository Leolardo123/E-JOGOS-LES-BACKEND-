import Product from "@modules/models/Products/Product";
import Cart from "@modules/models/Sales/Cart";
import CartItem from "@modules/models/Sales/CartItem";
import User from "@modules/models/User/User";
import GenericRepositoryProvider from "@modules/Repositories/Generic/implementations/GenericRepositoryProvider";
import IRepositoryUtils, { ITransaction } from "@shared/container/providers/RepositoryUtilsProvider/models/IRepositoryUtils";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { v4 } from "uuid";

interface IProducts{
    id: string,
}

interface ICartItem{
    id: string;
    product_id: string;
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
        const cartItemRepository = new GenericRepositoryProvider(CartItem);
        const cartRepository    = new GenericRepositoryProvider(Cart);
        const productRepository = new GenericRepositoryProvider(Product);
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
                const productRepository = new GenericRepositoryProvider(Product);

                const productExists = await productRepository.findOne({
                    where: {
                        id: item.product_id,
                        isActive: true,
                    },
                });
        
                if(!productExists) {
                    throw new AppError(`Produto ${item.product_id} não encontrado.`);
                }
        
                const cartItem = {
                    id: v4(),
                    cart_id: cartExists.id,
                    product_id: productExists.id,
                    product: productExists,
                    quantity: 1,
                    price: productExists.price,
                } as CartItem;
        
                productExists.stock -= 1;

                cartExists.total_price += cartItem.price;

                transaction.data.push(
                    {
                        entity: productExists,
                        repository: productRepository,
                    },
                    {
                        entity: cartItem,
                        repository: cartItemRepository,
                    }
                );
            } else {
                const { id, product, ...cartItemExists } = cartExists.cartItems[index];

                if(!product){
                    throw new AppError(`Produto ${item.product_id} não encontrado.`);
                }

                const stockDiff = item.quantity - cartItemExists.quantity;

                const updatedCartItem = {
                    ...cartItemExists,
                    quantity: item.quantity,
                    price: product.price * item.quantity,
                } as CartItem;

                product.stock -= stockDiff;

                transaction.data.push(
                    {
                        entity: product,
                        repository: productRepository,
                    },
                    {
                        entity: updatedCartItem,
                        repository: cartItemRepository,
                    }
                );
            }
        });

        transaction.data.push({
            entity: cartExists,
            repository: cartRepository
        });

        await this.repositoryUtils.transaction(transaction);

        return cartExists;
    }
}