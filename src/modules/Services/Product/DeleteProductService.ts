import { injectable } from 'tsyringe';
import GenericRepositoryProvider from '@modules/Repositories/Generic/implementations/GenericRepositoryProvider';
import Product from '@modules/models/Products/Product';
import AppError from '@shared/errors/AppError';

interface IRequest {
    product_id:  string,
} 

interface IResponse {
    product: Product,
}

@injectable()
class DeleteProductService {
  public async execute({
    product_id,
  }: IRequest): Promise<void> {
    const productsRepository = new GenericRepositoryProvider(Product);

    const productExists = await productsRepository.findOne({
        where:{
            id:product_id
        }
    })

    if(!productExists){
        throw new AppError('Produto não encontrado.')
    }

    productsRepository.remove(productExists);

    return
  }
}

export default DeleteProductService;
