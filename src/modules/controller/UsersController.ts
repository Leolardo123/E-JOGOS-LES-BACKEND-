/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from 'shared/errors/AppError';
import CreateUserService from '@modules/Services/Users/CreateUserService';

export default class UsersController {

    public async index(request: Request, response: Response): Promise<Response> {
        throw new AppError(`not implemented`, 501)
    }

    public async show(request: Request, response: Response): Promise<Response> {
        throw new AppError(`not implemented`, 501)
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const {
        user,
        address,
        person
        } = request.body;

        const createUser = container.resolve(CreateUserService);

        const createdUser = await createUser.execute({
        user,
        address,  
        person
        });

        return response.status(201).json(createdUser);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        throw new AppError(`not implemented`, 501)
    }

    public async delete(request: Request, response: Response): Promise<void> {
        throw new AppError(`not implemented`, 501)
    }
}
