/* eslint-disable @typescript-eslint/no-unused-vars */
import IndexAddressesTypesService from '@modules/Services/Addresses/IndexAddressesTypesService';
import AppError from 'shared/errors/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import IndexPlacesTypesService from '@modules/Services/Addresses/IndexPlacesTypesService';
import IndexAddressesService from '@modules/Services/Addresses/IndexAddressesService';
import UpdateAddressService from '@modules/Services/Addresses/UpdateAddressService';
import AddPersonAddressesService from '@modules/Services/Addresses/AddPersonAddressesService';
import ShowAddressesService from '@modules/Services/Addresses/ShowAddressesService';
import DeleteAddressService from '@modules/Services/Addresses/DeleteAddressService';

export default class AddressesController {

    public async index(request: Request, response: Response): Promise<Response> {
        const { page , limit } = request.query

        const indexAddressesService = container.resolve(IndexAddressesService)
        const result = await indexAddressesService.execute({
            page: page ? Number(page) : undefined,
            limit: limit ? Number(limit) : undefined,
        })

        return response.json(result)
    }

    public async indexAddressTypes(request: Request, response: Response): Promise<Response> {
        const { page , limit } = request.query

        const indexAddressesTypesService = container.resolve(IndexAddressesTypesService)
        const result = await indexAddressesTypesService.execute({
            page: page ? Number(page) : undefined,
            limit: limit ? Number(limit) : undefined
        })

        return response.json(result)
    }

    public async indexPlaceTypes(request: Request, response: Response): Promise<Response> {
        const { page , limit } = request.query

        const indexPlacesTypesService = container.resolve(IndexPlacesTypesService)
        const result = await indexPlacesTypesService.execute({
            page: page ? Number(page) : undefined,
            limit: limit ? Number(limit) : undefined
        })

        return response.json(result)
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.body;

        const showAddressService = container.resolve(ShowAddressesService);

        const address = await showAddressService.execute({
            id,
        });

        return response.json(address);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const {
            user_id,
            addresses,
        } = request.body;

        const addAddressService = container.resolve(AddPersonAddressesService);

        const address = await addAddressService.execute({
            addresses,
            user_id,
        });

        return response.status(201).json(address);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const {
            id,
            user_id,
            address_type_id,
            place_type_id,
            cep,
            city,
            complement,
            country,
            neighborhood,
            number,
            place,
            state
        } = request.body;

        const updateAddressService = container.resolve(UpdateAddressService);

        const { address } = await updateAddressService.execute({
            id,
            user_id,
            address:{
                address_type_id,
                place_type_id,
                cep,
                city,
                complement,
                country,
                neighborhood,
                number,
                place,
                state
            }
        });

        return response.status(201).json(address);
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.body;

        const deleteAddressService = container.resolve(DeleteAddressService);

        await deleteAddressService.execute({
            id,
        });

        return response.status(204).json();
    }

}
