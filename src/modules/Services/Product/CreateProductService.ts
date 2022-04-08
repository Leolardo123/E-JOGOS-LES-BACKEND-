import { injectable } from 'tsyringe';
import GenericRepositoryProvider from '@modules/Repositories/Generic/implementations/GenericRepositoryProvider';
import Product from '@modules/models/Products/Product';

interface IRequest {
    product: Product,
} 

interface IResponse {
    product: Product,
}

@injectable()
class CreateProductService {
  public async execute({
    product,
  }: IRequest): Promise<IResponse> {
    const productsRepository = new GenericRepositoryProvider(Product);

    //Validar se usuário é admin e existe

    const createdProduct = productsRepository.create({...product});
    await productsRepository.save(createdProduct);

    return { product:createdProduct };
  }
}

export default CreateProductService;
