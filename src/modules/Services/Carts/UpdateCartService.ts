import Cart from "@modules/models/Sales/Cart";
import User from "@modules/models/User/User";
import GenericRepositoryProvider from "@modules/Repositories/Generic/implementations/GenericRepositoryProvider";
import { injectable } from "tsyringe";

interface ICartItem {
    quantity: number;
    price: number;
    cart_id: string;
    product_id: string;
}

interface ICart {
    total_price: number;
    items: ICartItem[];
}

interface IRequest {
    cart: ICart;
    cart_id: string;
    user_id: string;
}

@injectable()
export default class UpdateCartService {
    public async execute({
        cart,
        cart_id,
        user_id
    }: IRequest): Promise<Cart> {
        const cartRepository = new GenericRepositoryProvider(Cart);
        const userRepository = new GenericRepositoryProvider(User);

        const userExists = await userRepository.findOne({
            where: {
                id: user_id
            },
            relations: ["carts"]
        });

        if (!userExists) {
            throw new Error("Usuário não encontrado.");
        }

        if (!userExists.person) {
            throw new Error("Usuário não autorizado.");
        }

        const total_price = cart.items.reduce((acc, item) => {
            return acc + item.price * item.quantity;
        }, 0);

        const cartExists = await cartRepository.findOne({
            where: {
                id: cart_id,
                person_id: userExists.person.id
            }
        });

        if (!cartExists) {
            throw new Error("Carrinho não encontrado.");
        }

        return updatedCart;
    }
}