import { injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import GenericRepositoryProvider from '@modules/Repositories/Generic/implementations/GenericRepositoryProvider';
import Brand from '@modules/models/Brand/Brand';

interface IRequest {
    id: string;
} 

interface IResponse {
    brand: Brand
}

@injectable()
class ShowBrandService {
  public async execute({
    id
  }: IRequest): Promise<IResponse> {
    const brandsRepository = new GenericRepositoryProvider(Brand)
    const brandExists = await brandsRepository.findOne({
      where:{
        id:id
      },
    })

    if(!brandExists){
        throw new AppError('Bandeira não encontrado.')
    }

    return {
        brand:brandExists
    }
  }
}

export default ShowBrandService;
