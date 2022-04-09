import { injectable } from 'tsyringe';
import GenericRepositoryProvider from '@modules/Repositories/Generic/implementations/GenericRepositoryProvider';
import Domain from '@modules/models/Domain';
import { EntityTarget } from 'typeorm';

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
    const entityRepository = new GenericRepositoryProvider(entity);
    return await entityRepository.findOne({
        where:{
            id
        },
        relations
    })
  }
}

export default ShowEntityService;
