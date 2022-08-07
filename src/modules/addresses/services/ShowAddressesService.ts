import { inject, injectable } from 'tsyringe';
import Address from '@modules/addresses/models/Address';
import AppError from '@shared/errors/AppError';
import { IDomainRepository } from '@modules/domain/repositories/interfaces/IDomainRepository';
import PersonAddress from '../models/PersonAddress';

interface IRequest {
  id: string;
  user_id?: string;
}

@injectable()
class ShowAddressesService {
  constructor(
    @inject('PersonsAddressesRepository')
    private personAddressesRepository: IDomainRepository<PersonAddress>,
  ) { }
  public async execute({
    id,
    user_id
  }: IRequest): Promise<Address | undefined> {

    const personAddress = await this.personAddressesRepository.findOne({
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
