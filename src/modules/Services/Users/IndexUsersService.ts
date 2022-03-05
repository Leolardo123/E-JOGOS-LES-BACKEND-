import IPaginatedResponse from '@shared/interfaces/IPaginatedResponse';
import IPaginatedRequest from '@shared/interfaces/IPaginatedRequest';
import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/Repositories/Users/interfaces/IUsersRepository';
import User from '@modules/models/User/User';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '@modules/Repositories/Users/UsersRepository';


@injectable()
class IndexPlacesTypesService {
  constructor(
    private usersRepository:UsersRepository,
  ) {}

  public async execute({
    page,
    limit
  }: IPaginatedRequest): Promise<IPaginatedResponse<User>> {
    this.usersRepository = getCustomRepository(UsersRepository)
    return await this.usersRepository.index({page,limit})
  }
}

export default IndexPlacesTypesService;
