import IPaginatedResponse from '@shared/interfaces/IPaginatedResponse';
import { injectable } from 'tsyringe';
import GenericRepositoryProvider from '@modules/Repositories/Generic/implementations/GenericRepositoryProvider';
import { DeepPartial } from 'typeorm';
import Brand from '@modules/models/Brand/Brand';

interface IRequest {
  whereParams?: DeepPartial<Brand>,
  page?: number,
  limit?: number,
}

@injectable()
class IndexBrandsService {
  public async execute({
    page = 1,
    limit = 10,
    whereParams
  }: IRequest): Promise<IPaginatedResponse<Brand>> {
    const brandsRepository = new GenericRepositoryProvider(Brand);
    return await brandsRepository.index({
      page,
      limit,
      findParams: {
        where: whereParams
      }
    })
  }
}

export default IndexBrandsService;
