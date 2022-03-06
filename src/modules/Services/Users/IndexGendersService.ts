import IPaginatedResponse from '@shared/interfaces/IPaginatedResponse';
import IPaginatedRequest from '@shared/interfaces/IPaginatedRequest';
import { injectable } from 'tsyringe';
import { getCustomRepository } from 'typeorm';
import GendersRepository from '@modules/Repositories/Users/GenderRepository';
import Gender from '@modules/models/User/Gender';


@injectable()
class IndexGendersService {
  constructor(
    private gendersRepository:GendersRepository,
  ) {}

  public async execute({
    page,
    limit
  }: IPaginatedRequest): Promise<IPaginatedResponse<Gender>> {
    this.gendersRepository = getCustomRepository(GendersRepository)
    return await this.gendersRepository.index({page,limit})
  }
}

export default IndexGendersService;
