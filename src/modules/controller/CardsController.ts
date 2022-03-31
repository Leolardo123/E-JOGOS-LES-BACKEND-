/* eslint-disable @typescript-eslint/no-unused-vars */
import AppError from 'shared/errors/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import IndexCardsService from '@modules/Services/Cards/IndexCardsService';
import UpdateCardService from '@modules/Services/Cards/UpdateCardService';
import AddPersonCardsService from '@modules/Services/Cards/AddCardService';

export default class CardsController {

    public async index(request: Request, response: Response): Promise<Response> {
        const { page , limit, user_id } = request.query

        const indexCardsService = container.resolve(IndexCardsService)
        const result = await indexCardsService.execute({
            page: page ? Number(page) : undefined,
            limit: limit ? Number(limit) : undefined,
            whereParams : {
                person: {
                    user_id: user_id as string
                }
            }
        })

        return response.json(result)
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const {         
            cards
        } = request.body;
        const { id: user_id } = request.user;

        const addCardService = container.resolve(AddPersonCardsService);

        const card = await addCardService.execute({
            cards,
            user_id,
        });

        return response.status(201).json(card);
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
