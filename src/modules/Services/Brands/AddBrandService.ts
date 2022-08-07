import { inject, injectable } from 'tsyringe';
import IRepositoryUtils, { ITransaction } from '@shared/container/providers/RepositoryUtilsProvider/models/IRepositoryUtils';
import GenericRepositoryProvider from '@modules/Repositories/Generic/implementations/GenericRepositoryProvider';
import Brand from '@modules/models/Brand/Brand';
import { IBrand } from './Interfaces/IBrand';


interface IRequest {
  name: string,
  image: string
}

@injectable()
class AddBrandService {
  constructor(
    @inject('RepositoryUtils')
    private repositoryUtils: IRepositoryUtils,
  ) {}

  public async execute({
    name,
    image
  }: IRequest): Promise<Brand | undefined> {
    const brandsRepository = new GenericRepositoryProvider(Brand);

    const transaction : ITransaction = { data: [] };

    const createdBrand= brandsRepository.create({
      name,
      image
    })

    transaction.data.push(
      {
        entity:createdBrand,
        repository:brandsRepository
      }
    )

    await this.repositoryUtils.transaction(transaction);

    return createdBrand;
  }
}

export default AddBrandService;
