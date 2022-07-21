/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import IndexCardsService from '@modules/Services/Cards/IndexCardsService';
import UpdateCardService from '@modules/Services/Cards/UpdateCardService';
import AddPersonCardsService from '@modules/Services/Cards/addPersonCardsService';
import DeleteCardService from '@modules/Services/Cards/DeleteCardService';
import ShowCardService from '@modules/Services/Cards/ShowCardService';

export default class CardsController {

    public async index(request: Request, response: Response): Promise<Response> {
        const { page , limit } = request.query

        const { user_id } = request.body

        const indexCardsService = container.resolve(IndexCardsService)
        const result = await indexCardsService.execute({
            page: page ? Number(page) : undefined,
            limit: limit ? Number(limit) : undefined,
        })

        return response.json(result)
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const {
            id
        } = request.body;

        const showCard = container.resolve(ShowCardService);

        const { card } = await showCard.execute({
            id
        });

        return response.status(201).json(card);
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
            card:{
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
            user_id,
        });

        return response.status(200).json({msg:'Card deletado com sucesso.'});
    }

}
