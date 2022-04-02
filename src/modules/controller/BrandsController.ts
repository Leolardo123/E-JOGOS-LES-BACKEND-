/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import IndexCardsService from '@modules/Services/Cards/IndexCardsService';
import UpdateCardService from '@modules/Services/Cards/UpdateCardService';
import AddPersonCardsService from '@modules/Services/Cards/AddCardService';
import DeleteCardService from '@modules/Services/Cards/DeleteCardService';
import ShowCardService from '@modules/Services/Cards/ShowCardService';
import IndexBrandsService from '@modules/Services/Brands/IndexBrandsService';
import ShowBrandService from '@modules/Services/Brands/ShowBrandService';
import AddBrandService from '@modules/Services/Brands/AddBrandService';
import UpdateBrandService from '@modules/Services/Brands/UpdateBrandService';
import DeleteBrandService from '@modules/Services/Brands/DeleteBrandService';

export default class BrandsController {

    public async index(request: Request, response: Response): Promise<Response> {
        const { page , limit } = request.query

        const indexBrandsService = container.resolve(IndexBrandsService)
        const result = await indexBrandsService.execute({
            page: page ? Number(page) : undefined,
            limit: limit ? Number(limit) : undefined
        })

        return response.json(result)
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const {
            brand_id
        } = request.params;

        const showBrand = container.resolve(ShowBrandService);

        const { brand } = await showBrand.execute({
            brand_id
        });

        return response.status(201).json(brand);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const {         
            name,
            image
        } = request.body;

        const addBrandService = container.resolve(AddBrandService);

        const brand = await addBrandService.execute({
            name,
            image
        });

        return response.status(201).json(brand);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const {
            brand_id,
            name,
            image
        } = request.body;

        const updateBrandService = container.resolve(UpdateBrandService);

        const { brand } = await updateBrandService.execute({
            brand_id,
            brand: {
                name,
                image
            }
        });

        return response.status(201).json(brand);
    }

    public async delete(request: Request, response: Response): Promise<Response> {

        const {
            brand_id
        } = request.params;

        const deleteBrand = container.resolve(DeleteBrandService);

        await deleteBrand.execute({
            brand_id
        });

        return response.status(200).json({msg:'Bandeira deletada com sucesso.'});
    }

}
