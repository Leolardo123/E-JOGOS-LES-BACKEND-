/* eslint-disable @typescript-eslint/no-unused-vars */
import UpdatePersonService from '@modules/Services/Users/UpdatePersonService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class PersonsController {

    public async update(request: Request, response: Response): Promise<Response> {
        const {
            name,
            cpf,
            cellphone,
            gender_id,
            birth_date,
            phone,
        } = request.body;
        const { person_id } = request.params

        const updatePersonService = container.resolve(UpdatePersonService);

        const { person } = await updatePersonService.execute({
            person_id,
            person:{
                name,
                cpf,
                cellphone,
                gender_id,
                birth_date,
                phone,
            }
        });

        return response.status(201).json(person);
    }
}
