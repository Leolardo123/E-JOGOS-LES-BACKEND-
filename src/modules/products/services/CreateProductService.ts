import { inject, injectable } from 'tsyringe';
import { IDomainRepository } from '@modules/domain/repositories/interfaces/IDomainRepository';
import Product from '../models/Product';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
  product: Product,
}

interface IResponse {
  product: Product,
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IDomainRepository<Product>,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) { }
  public async execute({
    product,
  }: IRequest): Promise<IResponse> {
    const createdProduct = this.productsRepository.create({ ...product });
    await this.storageProvider.saveFile(product.image);
    await this.productsRepository.save(createdProduct);

    return { product: createdProduct };
  }
}

export default CreateProductService;
