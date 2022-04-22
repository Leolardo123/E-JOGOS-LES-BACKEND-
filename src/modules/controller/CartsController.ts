import Cart from "@modules/models/Sales/Cart"
import CreateCartService from "@modules/Services/Carts/CreateCartService"
import DeleteEntityService from "@modules/Services/GlobalServices/DeleteEntityService"
import IndexEntityService from "@modules/Services/GlobalServices/IndexUsersService"
import ShowEntityService from "@modules/Services/GlobalServices/ShowEntityService"
import { Request, Response } from "express"
import { container } from "tsyringe"

export default class CartsController {
    
    public async index(request: Request, response: Response): Promise<Response> {
        const { page , limit } = request.query

        const indexService = container.resolve(IndexEntityService)
        const result = await indexService.execute({
            page: page ? Number(page) : undefined,
            limit: limit ? Number(limit) : undefined,
            entity: Cart,
        })

        return response.json(result)
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params

        const showCart = container.resolve(ShowEntityService);

        const result = await showCart.execute({
            id,
            entity: Cart,
        });

        return response.json(result)
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const {
            cart
        } = request.body;
        const { id } = request.user;

        const createCart = container.resolve(CreateCartService);

        const createdCart = await createCart.execute({
            cart,
            user_id: id
        });

        return response.status(201).json({createdCart});
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params

        const deleteCart = container.resolve(DeleteEntityService);

        await deleteCart.execute({
            id,
            entity: Cart,
        });

        return response.json({message: 'Carrinho apagado com sucesso'})
    }
}