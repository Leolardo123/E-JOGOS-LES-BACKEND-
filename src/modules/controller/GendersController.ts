/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import IndexGendersService from '@modules/Services/Users/IndexGendersService';

export default class GendersController {

    public async indexGenders(request: Request, response: Response): Promise<Response> {
        const { page , limit } = request.query

        const indexGendersService = container.resolve(IndexGendersService)
        const result = await indexGendersService.execute({
            page: page ? Number(page) : undefined,
            limit: limit ? Number(limit) : undefined
        })

        return response.json(result)
    }

}
