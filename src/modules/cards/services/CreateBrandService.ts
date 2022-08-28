import { inject, injectable } from 'tsyringe';

import IRepositoryUtils, { ITransaction } from '@shared/container/providers/RepositoryUtilsProvider/models/IRepositoryUtils';
import AppError from '@shared/errors/AppError';
import { IDomainRepository } from '@modules/domain/repositories/interfaces/IDomainRepository';
import Brand from '../models/Brand';

interface IRequest {
    name: string;
    image: string;
}

interface IResponse {
    brand: Brand
}

@injectable()
class CreateBrandService {
    constructor(
        @inject('BrandsRepository')
        private brandsRepository: IDomainRepository<Brand>,
    ) { }
    public async execute({
        name,
        image
    }: IRequest): Promise<IResponse> {
        const brandExists = await this.brandsRepository.findOne({
            where: {
                name: name
            }
        })

        if (brandExists) {
            throw new AppError(`Bandeira escolhida já existe.`);
        }

        const createdBrand = this.brandsRepository.create({
            name: name,
            image: image
        })

        await this.brandsRepository.save(createdBrand);

        return {
            brand: createdBrand
        }
    }
}

export default CreateBrandService;
