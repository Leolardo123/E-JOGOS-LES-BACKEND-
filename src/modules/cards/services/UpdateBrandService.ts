import { inject, injectable } from 'tsyringe';
import { IBrand } from '../services/Interfaces/IBrand';
import { IDomainRepository } from '@modules/domain/repositories/interfaces/IDomainRepository';
import AppError from '@shared/errors/AppError';
import Brand from '../models/Brand';

interface IRequest {
    id: string;
    brand: IBrand;
}

interface IResponse {
    brand: Brand
}

@injectable()
class UpdateBrandService {
    constructor(
        @inject('BrandsRepository')
        private brandsRepository: IDomainRepository<Brand>,
    ) { }
    public async execute({
        id,
        brand: {
            name,
            image
        },
    }: IRequest): Promise<IResponse> {
        const brandExists = await this.brandsRepository.findOne({
            where: {
                id: id
            },
        })

        if (!brandExists) {
            throw new AppError('Bandeira não encontrada.')
        }

        if (name) brandExists.name = name;
        if (image) brandExists.image = image;

        await this.brandsRepository.save(brandExists);

        return {
            brand: brandExists
        }
    }
}

export default UpdateBrandService;
