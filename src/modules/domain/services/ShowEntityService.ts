import { injectable } from 'tsyringe';
import Domain from '@modules/domain/models/DomainUUID';
import { EntityTarget } from 'typeorm';
import DomainRepository from '../repositories/DomainRepository';

interface IRequest<T extends Domain> {
  id: string,
  relations?: string[],
  entity: EntityTarget<T>,
}

@injectable()
class ShowEntityService {
  public async execute({
    id,
    entity,
    relations,
  }: IRequest<Domain>): Promise<Domain | undefined> {
    const entityRepository = new DomainRepository(entity);
    return await entityRepository.findOne({
      where: {
        id
      },
      relations
    })
  }
}

export default ShowEntityService;
