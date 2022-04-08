import IPaginatedResponse from '@shared/interfaces/IPaginatedResponse';
import IPaginatedRequest from '@shared/interfaces/IPaginatedRequest';
import { injectable } from 'tsyringe';
import GenericRepositoryProvider from '@modules/Repositories/Generic/implementations/GenericRepositoryProvider';
import Domain from '@modules/models/Domain';
import { EntityTarget } from 'typeorm';

interface IGenericPaginatedRequest<T extends Domain> extends IPaginatedRequest {
  entity: EntityTarget<T>,
}

@injectable()
class IndexEntityService<T extends Domain> {
  public async execute({
    page,
    limit,
    entity,
  }: IGenericPaginatedRequest<T>): Promise<IPaginatedResponse<T>> {
    const entityRepository = new GenericRepositoryProvider(entity);
    return await entityRepository.index({page,limit})
  }
}

export default IndexEntityService;
