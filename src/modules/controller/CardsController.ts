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
        const { page , limit, person_id } = request.query

        console.log('request: ',request.query)

        const indexCardsService = container.resolve(IndexCardsService)
        const result = await indexCardsService.execute({
            page: page ? Number(page) : undefined,
            limit: limit ? Number(limit) : undefined,
            whereParams : {
                person_id: person_id as string
            }
        })

        return response.json(result)
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const {
            id
        } = request.params;

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
            person_id,
            security_code
        } = request.body;

        const addCardService = container.resolve(AddPersonCardsService);

        const card = await addCardService.execute({
            owner_name,
            number,
            brand_id,
            person_id,
            security_code
        });

        return response.status(201).json(card);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const {
            id,
            card: {
                owner_name,
                number,
                brand_id,
                person_id,
                security_code
            }
        } = request.body;

        const updateCardService = container.resolve(UpdateCardService);

        const { card } = await updateCardService.execute({
            id,
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
            id
        } = request.params;

        const deleteCard = container.resolve(DeleteCardService);

        await deleteCard.execute({
            id
        });

        return response.status(200).json({msg:'Card deletado com sucesso.'});
    }

}
