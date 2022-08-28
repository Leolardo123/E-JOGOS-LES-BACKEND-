import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IDomainRepository } from '@modules/domain/repositories/interfaces/IDomainRepository';
import Product from '../models/Product';
import IProduct from './interfaces/IProduct';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
  product_id: string,
  product: Partial<IProduct>,
}

interface IResponse {
  product: Product,
}

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IDomainRepository<Product>,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) { }
  public async execute({
    product_id,
    product,
  }: IRequest): Promise<IResponse> {


    const productExists = await this.productsRepository.findOne({
      where: {
        id: product_id
      }
    })

    if (!productExists) {
      throw new AppError('Produto não encontrado.')
    }

    if(product.image){
      await this.storageProvider.saveFile(product.image)
    }

    const updateProduct = Object.assign(productExists, product) as Product;
    await this.productsRepository.save(updateProduct);

    return { product: updateProduct };
  }
}

export default UpdateProductService;
