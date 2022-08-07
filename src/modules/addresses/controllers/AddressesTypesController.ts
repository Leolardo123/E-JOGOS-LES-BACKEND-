/* eslint-disable @typescript-eslint/no-unused-vars */
import IndexAddressesTypesService from '@modules/Services/Addresses/IndexAddressesTypesService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class AddressesTypesController {

    public async indexAddressTypes(request: Request, response: Response): Promise<Response> {
        const { page , limit } = request.query

        const indexAddressesTypesService = container.resolve(IndexAddressesTypesService)
        const result = await indexAddressesTypesService.execute({
            page: page ? Number(page) : undefined,
            limit: limit ? Number(limit) : undefined
        })

        return response.json(result)
    }

}
