import { inject, injectable } from 'tsyringe';
import { IDomainRepository } from '@modules/domain/repositories/interfaces/IDomainRepository';
import Product from '../models/Product';

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
  ) { }
  public async execute({
    product,
  }: IRequest): Promise<IResponse> {
    const createdProduct = this.productsRepository.create({ ...product });
    await this.productsRepository.save(createdProduct);

    return { product: createdProduct };
  }
}

export default CreateProductService;
