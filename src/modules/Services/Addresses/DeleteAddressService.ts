import { injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import GenericRepositoryProvider from '@modules/Repositories/Generic/implementations/GenericRepositoryProvider';
import PersonAddress from '@modules/models/Address/PersonAddress';

interface IRequest {
    id: string;
} 

interface IResponse {
    address: PersonAddress;
}

@injectable()
export default class DeleteAddressService {
  public async execute({
    id
  }: IRequest): Promise<IResponse> {
    const personAddressesRepository = new GenericRepositoryProvider(PersonAddress);

    console.log(id)

    const addressExists = await personAddressesRepository.findOne({
      where:{
        id:id,
      },
    })

    if(!addressExists){
        throw new AppError('Endereço não encontrado.', 404)
    }

    personAddressesRepository.remove(addressExists)

    return {
        address:addressExists
    }
  }
}

