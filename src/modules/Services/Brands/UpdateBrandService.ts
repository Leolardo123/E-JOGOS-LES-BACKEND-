import { injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import GenericRepositoryProvider from '@modules/Repositories/Generic/implementations/GenericRepositoryProvider';
import Brand from '@modules/models/Brand/Brand';
import { IBrand } from './Interfaces/IBrand';

interface IRequest {
    id: string;
    brand: IBrand;
} 

interface IResponse {
    brand: Brand
}

@injectable()
class UpdateBrandService {

  public async execute({
    id,
    brand:{
        name,
        image
    },
  }: IRequest): Promise<IResponse> {

    const brandsRepository = new GenericRepositoryProvider(Brand);

    const brandExists = await brandsRepository.findOne({
        where:{
            id: id
        },
    })

    if(!brandExists){
        throw new AppError('Bandeira não encontrada.')
    }
    
    if(name) brandExists.name = name;
    if(image) brandExists.image = image;

    await brandsRepository.save(brandExists);

    return {
        brand:brandExists
    }
  }
}

export default UpdateBrandService;
