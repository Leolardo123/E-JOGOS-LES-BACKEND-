/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import IndexCardsService from '@modules/Services/Cards/IndexCardsService';
import UpdateCardService from '@modules/Services/Cards/UpdateCardService';
import AddPersonCardsService from '@modules/Services/Cards/AddCardService';
import DeleteCardService from '@modules/Services/Cards/DeleteCardService';
import ShowCardService from '@modules/Services/Cards/ShowCardService';

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

    public async show(request: Request, response: Response): Promise<Response> {
        const {
            user_id,
            card_id
        } = request.params;

        const showCard = container.resolve(ShowCardService);

        const { card } = await showCard.execute({
            user_id,
            card_id
        });

        return response.status(201).json(card);
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

    public async delete(request: Request, response: Response): Promise<Response> {

        const {
            user_id,
            card_id
        } = request.params;

        const deleteCard = container.resolve(DeleteCardService);

        await deleteCard.execute({
            user_id,
            card_id
        });

        return response.status(200).json({msg:'Card deletado com sucesso.'});
    }

}
