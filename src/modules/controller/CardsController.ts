/* eslint-disable @typescript-eslint/no-unused-vars */
import AppError from 'shared/errors/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import IndexCardsService from '@modules/Services/Cards/IndexCardsService';
import UpdateCardService from '@modules/Services/Cards/UpdateCardService';

export default class CardsController {

    public async index(request: Request, response: Response): Promise<Response> {
        const { page , limit, user_id } = request.query

        const indexCardsService = container.resolve(IndexCardsService)
        const result = await indexCardsService.execute({
            page: page ? Number(page) : undefined,
            limit: limit ? Number(limit) : undefined,
            whereParams : {
                person: {
                    user_id: user_id as string,
                }
            }
        })

        return response.json(result)
    }

    public async show(request: Request, response: Response): Promise<Response> {
        throw new AppError(`not implemented`, 501)
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const {
            owner_name,
            number,
            brand_id,
            person_id,
            security_code
        } = request.body;

        const createCard = container.resolve(CreateCardService);

        const { card:createdCard } = await createCard.execute({
            owner_name,
            number,
            brand_id,
            person_id,
            security_code
        });

        return response.status(201).json({card:createdCard});
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const {
            owner_name,
            number,
            brand_id,
            person_id,
            security_code
        } = request.body;
        const { card_id } = request.params;
        const { id: user_id } = request.user;

        const updateCardService = container.resolve(UpdateCardService);

        const { card } = await updateCardService.execute({
            user_id,
            card_id,
            card:{
                owner_name,
                number,
                brand_id,
                person_id,
                security_code
            }
        });

        return response.status(201).json(card);
    }
}
