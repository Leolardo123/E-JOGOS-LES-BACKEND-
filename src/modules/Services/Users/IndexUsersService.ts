import IPaginatedResponse from '@shared/interfaces/IPaginatedResponse';
import IPaginatedRequest from '@shared/interfaces/IPaginatedRequest';
import { injectable } from 'tsyringe';

import User from '@modules/models/User/User';
import GenericRepositoryProvider from '@modules/Repositories/Generic/implementations/GenericRepositoryProvider';

@injectable()
class IndexUsersService {
  public async execute({
    page,
    limit
  }: IPaginatedRequest): Promise<IPaginatedResponse<User>> {
    const usersRepository = new GenericRepositoryProvider(User);
    return await usersRepository.index({page,limit})
  }
}

export default IndexUsersService;
