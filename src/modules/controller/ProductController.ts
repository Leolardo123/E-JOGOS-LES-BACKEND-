/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/Services/Users/CreateUserService';
import UpdateUserService from '@modules/Services/Users/UpdateUserService';
import ShowUserService from '@modules/Services/Users/ShowUserService';
import DeleteUserService from '@modules/Services/Users/DeleteUserService';
import IndexUsersService from '@modules/Services/Users/IndexUsersService';
import CreateProductService from '@modules/Services/Product/CreateProductService';

export default class ProductsController {

    public async index(request: Request, response: Response): Promise<Response> {
        const { page , limit } = request.query

        const indexUsersService = container.resolve(IndexUsersService)
        const result = await indexUsersService.execute({
            page: page ? Number(page) : undefined,
            limit: limit ? Number(limit) : undefined
        })

        return response.json(result)
    }

    public async show(request: Request, response: Response): Promise<Response> {
        throw new Error('Method not implemented.');
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const {
            product
        } = request.body;

        const createProduct = container.resolve(CreateProductService);

        const createdProduct = await createProduct.execute({
            product
        });

        return response.status(201).json({createdProduct});
    }

    public async update(request: Request, response: Response): Promise<Response> {
        throw new Error('Method not implemented.');
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        throw new Error('Method not implemented.');
    }
}
