/* eslint-disable @typescript-eslint/no-unused-vars */
import DeleteEntityService from '@modules/domain/services/DeleteEntityService';
import IndexEntityService from '@modules/domain/services/IndexEntityService';
import ShowEntityService from '@modules/domain/services/ShowEntityService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import Product from '../models/Product';
import CreateProductService from '../services/CreateProductService';
import UpdateProductService from '../services/UpdateProductService';

export default class ProductsController {

    public async index(request: Request, response: Response): Promise<Response> {
        const { page, limit } = request.query

        const indexService = container.resolve(IndexEntityService)
        const result = await indexService.execute({
            page: page ? Number(page) : undefined,
            limit: limit ? Number(limit) : undefined,
            entity: Product,
        })

        return response.json(result)
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params

        const showProduct = container.resolve(ShowEntityService);

        const result = await showProduct.execute({
            id,
            entity: Product,
        });

        return response.json(result)
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const {
            product
        } = request.body;

        const createProduct = container.resolve(CreateProductService);

        const createdProduct = await createProduct.execute({
            product
        });

        return response.status(201).json({ createdProduct });
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const {
            product
        } = request.body;
        const { id } = request.params;

        const updateProduct = container.resolve(UpdateProductService);

        const updatedProduct = await updateProduct.execute({
            product_id: id,
            product
        });

        return response.status(201).json({ updatedProduct });
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params

        const deleteProduct = container.resolve(DeleteEntityService);

        await deleteProduct.execute({
            id,
            entity: Product,
        });

        return response.json({ message: 'Produto removido com sucesso' })
    }
}
