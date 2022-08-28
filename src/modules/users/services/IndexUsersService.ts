import IPaginatedResponse from '@shared/interfaces/IPaginatedResponse';
import IPaginatedRequest from '@shared/interfaces/IPaginatedRequest';
import { inject, injectable } from 'tsyringe';
import { IDomainRepository } from '@modules/domain/repositories/interfaces/IDomainRepository';
import User from '../models/User';

@injectable()
class IndexUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IDomainRepository<User>,
  ) { }
  public async execute({
    page,
    limit,
  }: IPaginatedRequest): Promise<IPaginatedResponse<User>> {
    return await this.usersRepository.index({ page, limit })
  }
}

export default IndexUsersService;
