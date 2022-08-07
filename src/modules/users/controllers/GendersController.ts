/* eslint-disable @typescript-eslint/no-unused-vars */

import IndexEntityService from '@modules/domain/services/IndexEntityService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import Gender from '../models/Gender';

export default class GendersController {

    public async indexGenders(request: Request, response: Response): Promise<Response> {
        const { page, limit } = request.query

        const indexService = container.resolve(IndexEntityService)
        const result = await indexService.execute({
            entity: Gender,
            page: page ? Number(page) : undefined,
            limit: limit ? Number(limit) : undefined
        })

        return response.json(result)
    }

}
