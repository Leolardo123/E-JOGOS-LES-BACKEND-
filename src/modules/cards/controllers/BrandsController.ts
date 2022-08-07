/* eslint-disable @typescript-eslint/no-unused-vars */
import IndexEntityService from '@modules/domain/services/IndexEntityService';
import ShowEntityService from '@modules/domain/services/ShowEntityService';
import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import Brand from '../models/Brand';
import CreateBrandService from '../services/CreateBrandService';
import DeleteBrandService from '../services/DeleteBrandService';
import UpdateBrandService from '../services/UpdateBrandService';

export default class BrandsController {

    public async index(request: Request, response: Response): Promise<Response> {
        const { page, limit } = request.query

        const indexService = container.resolve(IndexEntityService)
        const result = await indexService.execute({
            entity: Brand,
            page: page ? Number(page) : undefined,
            limit: limit ? Number(limit) : undefined
        })

        return response.json(result)
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const {
            id
        } = request.query;

        const showBrand = container.resolve(ShowEntityService);

        const result = await showBrand.execute({
            entity: Brand,
            id: id as string,
        });

        return response.status(201).json(result);
    }

    public async create(request: Request, response: Response): Promise<void> {
        const { name } = request.body;
        const file = request.file;

        if (!file) throw new AppError('Falha ao carregar imagem.');

        const createBrandService = container.resolve(CreateBrandService);
        await createBrandService.execute({
            image: file.filename,
            name
        })

        response.json({ message: 'Bandeira cadastrada com sucesso.' });
    }

    public async update(request: Request, response: Response): Promise<void> {
        const { name, id } = request.body;
        const file = request.file;

        if (!file) throw new AppError('Falha ao carregar imagem.');

        const updateBrandService = container.resolve(UpdateBrandService);
        await updateBrandService.execute({
            id,
            brand: {
                image: file.filename,
                name
            }
        })

        response.json({ message: 'Bandeira atualizada com sucesso.' });
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const {
            id
        } = request.params;

        const deleteBrand = container.resolve(DeleteBrandService);

        await deleteBrand.execute({
            id
        });

        return response.status(200).json({ msg: 'Bandeira deletada com sucesso.' });
    }

}
