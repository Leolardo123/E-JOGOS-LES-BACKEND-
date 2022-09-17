import { injectable } from 'tsyringe';
import GenericRepositoryProvider from '@modules/Repositories/Generic/implementations/GenericRepositoryProvider';
import Product from '@modules/models/Products/Product';
import IProduct from './interfaces/IProduct';
import AppError from '@shared/errors/AppError';

interface IRequest {
    product_id: string,
    product: Partial<IProduct>,
} 

interface IResponse {
    product: Product,
}

@injectable()
class UpdateProductService {
  public async execute({
    product_id,
    product,
  }: IRequest): Promise<IResponse> {
    const productsRepository = new GenericRepositoryProvider(Product);

    const productExists = await productsRepository.findOne({
        where:{
            id:product_id
        }
    })

    if(!productExists){
        throw new AppError('Produto não encontrado.')
    }

    const updateProduct = Object.assign(productExists, product) as Product;
    await productsRepository.save(updateProduct);

    return { product: updateProduct };
  }
}

export default UpdateProductService;
