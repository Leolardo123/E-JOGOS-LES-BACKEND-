/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AddPersonCardsService from '../services/AddCardService';
import DeleteCardService from '../services/DeleteCardService';
import IndexCardsService from '../services/IndexCardsService';
import ShowCardService from '../services/ShowCardService';
import UpdateCardService from '../services/UpdateCardService';

export default class CardsController {

    public async index(request: Request, response: Response): Promise<Response> {
        const { page, limit } = request.query

        const { user_id } = request.body

        const indexCardsService = container.resolve(IndexCardsService)
        const result = await indexCardsService.execute({
            page: page ? Number(page) : undefined,
            limit: limit ? Number(limit) : undefined,
            whereParams: {
                person: {
                    user_id
                }
            }
        })

        return response.json(result)
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.body;

        const showCardService = container.resolve(ShowCardService);

        const card = await showCardService.execute({
            id
        });

        return response.json(card);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const {
            owner_name,
            number,
            brand_id,
            user_id,
            security_code
        } = request.body;


        const addPersonCardsService = container.resolve(AddPersonCardsService);

        const card = await addPersonCardsService.execute({
            owner_name,
            number,
            brand_id,
            user_id,
            security_code
        });

        return response.status(201).json(card);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const {
            id,
            user_id,
            card: {
                owner_name,
                number,
                brand_id,
                security_code
            }
        } = request.body;

        const updateCardService = container.resolve(UpdateCardService);

        const { card } = await updateCardService.execute({
            id,
            user_id,
            card: {
                owner_name,
                number,
                brand_id,
                security_code,
                user_id
            }
        });

        return response.status(201).json(card);
    }

    public async delete(request: Request, response: Response): Promise<Response> {

        const {
            id
        } = request.params;
        const {
            id: user_id
        } = request.user

        const deleteCard = container.resolve(DeleteCardService);

        await deleteCard.execute({
            id,
        });

        return response.status(200).json({ msg: 'Card deletado com sucesso.' });
    }

}
