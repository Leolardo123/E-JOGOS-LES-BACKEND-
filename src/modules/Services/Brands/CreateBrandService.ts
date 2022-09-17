import { inject, injectable } from 'tsyringe';
import IRepositoryUtils, { ITransaction } from '../../../shared/container/providers/RepositoryUtilsProvider/models/IRepositoryUtils';
import AppError from '../../../shared/errors/AppError';
import GenericRepositoryProvider from '@modules/Repositories/Generic/implementations/GenericRepositoryProvider';
import Brand from '@modules/models/Brand/Brand';

interface IRequest {
    name: string;
    image: string;
} 

interface IResponse {
    brand: Brand
}

@injectable()
class CreateBrandService {
  constructor(
    @inject('RepositoryUtils')
    private repositoryUtils: IRepositoryUtils,
  ) {}
  public async execute({
    name,
    image
  }: IRequest): Promise<IResponse> {

    const brandsRepository = new GenericRepositoryProvider(Brand)

    const transaction: ITransaction = { data: [] };

    const brandExists = await brandsRepository.findOne({
        where:{
            name: name
        }
    })
    if(!brandExists){
        throw new AppError(`Bandeira escolhida não existe.`);
    }

    const createdBrand = brandsRepository.create({
        name: name,
        image: image
    })
    

    transaction.data.push(
        {
            entity: createdBrand,
            repository: brandsRepository
        }
    )

    await this.repositoryUtils.transaction(transaction);

    return {
        brand:createdBrand
    }
  }
}

export default CreateBrandService;
