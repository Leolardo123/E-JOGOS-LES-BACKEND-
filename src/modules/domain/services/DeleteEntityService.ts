import { injectable } from 'tsyringe';
import Domain from '@modules/domain/models/DomainUUID';
import { EntityTarget } from 'typeorm';
import AppError from '@shared/errors/AppError';
import DomainUUID from '@modules/domain/models/DomainUUID';
import DomainRepository from '../repositories/DomainRepository';

interface IRequest<T extends Domain> {
  id: string,
  entity: EntityTarget<T>,
}

@injectable()
class DeleteEntityService {
  public async execute({
    id,
    entity,
  }: IRequest<DomainUUID>): Promise<void> {
    const entityRepository = new DomainRepository(entity);

    const entityExists = await entityRepository.findOne({
      where: {
        id
      },
    })

    if (!entityExists) {
      throw new AppError('Item não encontrado.')
    }

    await entityRepository.remove(entityExists);
  }
}

export default DeleteEntityService;
