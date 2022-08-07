/* eslint-disable @typescript-eslint/no-unused-vars */
import IndexAddressesTypesService from '@modules/Services/Addresses/IndexAddressesTypesService';
import AppError from 'shared/errors/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import IndexPlacesTypesService from '@modules/Services/Addresses/IndexPlacesTypesService';

export default class PlaceTypesController {

    public async indexPlaceTypes(request: Request, response: Response): Promise<Response> {
        const { page , limit } = request.query

        const indexPlacesTypesService = container.resolve(IndexPlacesTypesService)
        const result = await indexPlacesTypesService.execute({
            page: page ? Number(page) : undefined,
            limit: limit ? Number(limit) : undefined
        })

        return response.json(result)
    }
}
