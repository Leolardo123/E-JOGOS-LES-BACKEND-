/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/Services/Users/CreateUserService';
import UpdateUserService from '@modules/Services/Users/UpdateUserService';
import ShowUserService from '@modules/Services/Users/ShowUserService';
import DeleteUserService from '@modules/Services/Users/DeleteUserService';
import IndexUsersService from '@modules/Services/Users/IndexUsersService';

export default class UsersController {

    public async index(request: Request, response: Response): Promise<Response> {
        const { page , limit } = request.query

        const indexUsersService = container.resolve(IndexUsersService)
        const result = await indexUsersService.execute({
            page: page ? Number(page) : undefined,
            limit: limit ? Number(limit) : undefined
        })

        return response.json(result)
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const {
            user_id,
        } = request.body;

        const showUser = container.resolve(ShowUserService);

        const { user } = await showUser.execute({
            user_id,
        });

        return response.status(201).json(user);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const {
            user,
            address,
            person
        } = request.body;

        const createUser = container.resolve(CreateUserService);

        const { user:createdUser } = await createUser.execute({
            user,
            address,  
            person
        });

        return response.status(201).json({user:createdUser});
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const {
            email
        } = request.body;
        const { user_id } = request.params

        const updateUserService = container.resolve(UpdateUserService);

        const { user } = await updateUserService.execute({
            user_id,
            user:{
                email,
            },
        });

        return response.status(201).json(user);
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const {
            user_id,
        } = request.params;

        const deleteUser = container.resolve(DeleteUserService);

        await deleteUser.execute({
            user_id,
        });

        return response.status(201).json({msg:'Usuário deletado com sucesso.'});
    }
}
