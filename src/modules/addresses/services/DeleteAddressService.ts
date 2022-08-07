import { IDomainRepository } from '@modules/domain/repositories/interfaces/IDomainRepository';
import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import PersonAddress from '../models/PersonAddress';

interface IRequest {
  id: string;
}

interface IResponse {
  address: PersonAddress;
}

@injectable()
export default class DeleteAddressService {
  constructor(
    @inject('PersonsAddressesRepository')
    private personsAddressesRepository: IDomainRepository<PersonAddress>,
  ) { }

  public async execute({
    id
  }: IRequest): Promise<IResponse> {
    const addressExists = await this.personsAddressesRepository.findOne({
      where: {
        id: id,
      },
    })

    if (!addressExists) {
      throw new AppError('Endereço não encontrado.')
    }

    this.personsAddressesRepository.remove(addressExists)

    return {
      address: addressExists
    }
  }
}

