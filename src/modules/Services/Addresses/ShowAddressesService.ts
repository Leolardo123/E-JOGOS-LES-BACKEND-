import { injectable } from 'tsyringe';
import Address from '@modules/models/Address/Address';
import GenericRepositoryProvider from '@modules/Repositories/Generic/implementations/GenericRepositoryProvider';
import AppError from '@shared/errors/AppError';
import PersonAddress from '@modules/models/Address/PersonAddress';

interface IRequest {
  id: string;
  user_id?: string;
}

@injectable()
class ShowAddressesService {
  public async execute({
    id,
    user_id
  }: IRequest): Promise<Address | undefined> {
    const personAddressesRepository = new GenericRepositoryProvider(PersonAddress);
    const personAddress = await personAddressesRepository.findOne({
      where: {
        id,
      },
      relations: ['address']
    });

    if (!personAddress) {
      throw new AppError('Endereço não encontrado', 404);
    }

    return personAddress.address;
  }
}

export default ShowAddressesService;
