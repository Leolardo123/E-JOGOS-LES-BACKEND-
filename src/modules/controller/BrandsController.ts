/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
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
            id
        } = request.query;

        const showBrand = container.resolve(ShowBrandService);

        const { brand } = await showBrand.execute({
            id: id as string,
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
            id,
            brand: {
                name,
                image
            }
        } = request.body;

        const updateBrandService = container.resolve(UpdateBrandService);

        const { brand } = await updateBrandService.execute({
            id,
            brand: {
                name,
                image
            }
        });

        return response.status(201).json(brand);
    }

    public async delete(request: Request, response: Response): Promise<Response> {

        
        const {
            id
        } = request.params;
        console.log("testedelete: ", id)

        const deleteBrand = container.resolve(DeleteBrandService);

        await deleteBrand.execute({
            id
        });

        return response.status(200).json({msg:'Bandeira deletada com sucesso.'});
    }

}
