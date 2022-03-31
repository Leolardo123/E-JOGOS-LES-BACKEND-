import { inject, injectable } from 'tsyringe';
import IRepositoryUtils, { ITransaction } from '@shared/container/providers/RepositoryUtilsProvider/models/IRepositoryUtils';
import GenericRepositoryProvider from '@modules/Repositories/Generic/implementations/GenericRepositoryProvider';
import Brand from '@modules/models/Brand/Brand';
import { IBrand } from './Interfaces/IBrand';


interface IRequest {
  brands: IBrand[];
}

@injectable()
class AddBrandService {
  constructor(
    @inject('RepositoryUtils')
    private repositoryUtils: IRepositoryUtils,
  ) {}

  public async execute({
    brands
  }: IRequest): Promise<Brand[] | undefined> {
    const brandsRepository = new GenericRepositoryProvider(Brand);

    const transaction : ITransaction = { data: [] };

    let createdBrands = [] as Brand[];
    for(let brand of brands){

      const createdBrand= brandsRepository.create({
        ...brand
      })

      transaction.data.push(
        {
          entity:createdBrand,
          repository:brandsRepository
        }
      )

      createdBrands.push(createdBrand);
    }

    await this.repositoryUtils.transaction(transaction);

    return createdBrands;
  }
}

export default AddBrandService;
