import IPaginatedResponse from '@shared/interfaces/IPaginatedResponse';
import IPaginatedRequest from '@shared/interfaces/IPaginatedRequest';
import Gender from '@modules/models/User/Gender';
import GenericRepositoryProvider from '@modules/Repositories/Generic/implementations/GenericRepositoryProvider';
import { injectable } from 'tsyringe';

@injectable()
class IndexGendersService {
  public async execute({
    page,
    limit
  }: IPaginatedRequest): Promise<IPaginatedResponse<Gender>> {
    const gendersRepository = new GenericRepositoryProvider(Gender)
    return await gendersRepository.index({page,limit})
  }
}

export default IndexGendersService;
