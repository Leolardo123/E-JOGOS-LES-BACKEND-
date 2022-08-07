import IPaginatedResponse from '@shared/interfaces/IPaginatedResponse';
import IPaginatedRequest from '@shared/interfaces/IPaginatedRequest';
import { injectable } from 'tsyringe';
import { EntityTarget } from 'typeorm';
import DomainUUID from '@modules/domain/models/DomainUUID';
import DomainRepository from '../repositories/DomainRepository';

interface IGenericPaginatedRequest<T extends DomainUUID> extends IPaginatedRequest {
  entity: EntityTarget<T>,
}

@injectable()
class IndexEntityService {
  public async execute({
    page,
    limit,
    entity,
  }: IGenericPaginatedRequest<DomainUUID>): Promise<IPaginatedResponse<DomainUUID>> {
    const entityRepository = new DomainRepository(entity);
    return await entityRepository.index({ page, limit })
  }
}

export default IndexEntityService;
