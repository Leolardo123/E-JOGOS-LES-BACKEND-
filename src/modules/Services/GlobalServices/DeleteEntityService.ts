import { injectable } from 'tsyringe';
import GenericRepositoryProvider from '@modules/Repositories/Generic/implementations/GenericRepositoryProvider';
import Domain from '@modules/models/Domain';
import { EntityTarget } from 'typeorm';
import AppError from '@shared/errors/AppError';

interface IRequest<T extends Domain> {
    id: string,
    entity: EntityTarget<T>,
} 

@injectable()
class DeleteEntityService {
  public async execute({
    id,
    entity,
  }: IRequest<Domain>): Promise<void> {
    const entityRepository = new GenericRepositoryProvider(entity);

    const entityExists = await entityRepository.findOne({
        where:{
            id
        },
    })

    if(!entityExists){
        throw new AppError('Item não encontrado.')
    }

    await entityRepository.remove(entityExists);
  }
}

export default DeleteEntityService;
