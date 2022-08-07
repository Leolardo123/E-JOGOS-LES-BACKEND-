/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AuthenticateUserService } from '../services/AuthenticateUserService';
import CreateUserService from '../services/CreateUserService';
import DeleteUserService from '../services/DeleteUserService';
import IndexUsersService from '../services/IndexUsersService';
import ShowUserService from '../services/ShowUserService';
import UpdateUserService from '../services/UpdateUserService';

export default class UsersController {

    public async auth(request: Request, response: Response): Promise<Response> {
        const {
            email,
            password
        } = request.body;

        const authenticateUser = container.resolve(AuthenticateUserService);

        const {
            user: { password: userPassword, ...user },
            access_token,
            refresh_token,
        } = await authenticateUser.execute({
            email,
            password,
        });

        return response.json({
            user,
            access_token,
            refresh_token,
        });
    }

    public async index(request: Request, response: Response): Promise<Response> {
        const { page, limit } = request.query

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

        return response.status(200).json(user);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const {
            user,
            address,
            person
        } = request.body;

        const createUser = container.resolve(CreateUserService);

        const { user: { password, ...createdUser } } = await createUser.execute({
            user,
            address,
            person
        });

        return response.status(201).json({ user: createdUser });
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const {
            email
        } = request.body;
        const { user_id } = request.params

        const updateUserService = container.resolve(UpdateUserService);

        const { user } = await updateUserService.execute({
            user_id,
            user: {
                email,
            },
        });

        return response.status(200).json(user);
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const {
            user_id,
        } = request.body;

        const deleteUser = container.resolve(DeleteUserService);

        await deleteUser.execute({
            user_id,
        });

        return response.status(200).json({ msg: 'Usuário deletado com sucesso.' });
    }
}
