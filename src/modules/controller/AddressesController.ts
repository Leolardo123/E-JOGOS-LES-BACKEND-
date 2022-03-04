/* eslint-disable @typescript-eslint/no-unused-vars */
import IndexAddressesTypesService from '@modules/Services/Addresses/IndexAddressesTypesService';
import AppError from 'shared/errors/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import IndexPlacesTypesService from '@modules/Services/Addresses/IndexPlacesTypesService';
import IndexAddressesService from '@modules/Services/Addresses/IndexAddressesService';

export default class AddressesController {

    public async index(request: Request, response: Response): Promise<Response> {
        const { page , limit } = request.query

        const indexAddressesService = container.resolve(IndexAddressesService)
        const result = await indexAddressesService.execute({
            page: page ? Number(page) : undefined,
            limit: limit ? Number(limit) : undefined
        })

        return response.json(result)
    }

    public async indexAddressTypes(request: Request, response: Response): Promise<Response> {
        const { page , limit } = request.query

        const indexAddressesTypesService = container.resolve(IndexAddressesTypesService)
        const result = await indexAddressesTypesService.execute({
            page: page ? Number(page) : undefined,
            limit: limit ? Number(limit) : undefined
        })

        return response.json(result)
    }

    public async indexPlaceTypes(request: Request, response: Response): Promise<Response> {
        const { page , limit } = request.query

        const indexPlacesTypesService = container.resolve(IndexPlacesTypesService)
        const result = await indexPlacesTypesService.execute({
            page: page ? Number(page) : undefined,
            limit: limit ? Number(limit) : undefined
        })

        return response.json(result)
    }

    public async show(request: Request, response: Response): Promise<Response> {
        throw new AppError(`not implemented`, 501)
    }

    public async create(request: Request, response: Response): Promise<Response> {
        throw new AppError(`not implemented`, 501)
    }

    public async update(request: Request, response: Response): Promise<Response> {
        throw new AppError(`not implemented`, 501)
    }

    public async delete(request: Request, response: Response): Promise<void> {
        throw new AppError(`not implemented`, 501)
    }
}
