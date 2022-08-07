import { inject, injectable } from 'tsyringe';
import { IDomainRepository } from '@modules/domain/repositories/interfaces/IDomainRepository';
import AppError from '@shared/errors/AppError';
import Brand from '../models/Brand';

interface IRequest {
  id: string;
}

interface IResponse {
  brand: Brand
}

@injectable()
class DeleteBrandService {
  constructor(
    @inject('BrandsRepository')
    private brandsRepository: IDomainRepository<Brand>,
  ) { }
  public async execute({
    id
  }: IRequest): Promise<IResponse> {
    const brandExists = await this.brandsRepository.findOne({
      where: {
        id: id,
      },
    })

    if (!brandExists) {
      throw new AppError('Bandeira não encontrado.')
    }

    this.brandsRepository.remove(brandExists)

    return {
      brand: brandExists
    }
  }
}

export default DeleteBrandService;
