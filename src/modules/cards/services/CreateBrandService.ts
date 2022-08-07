import { inject, injectable } from 'tsyringe';
import Brand from '@modules/brands/models/Brand';
import IRepositoryUtils, { ITransaction } from '@shared/container/providers/RepositoryUtilsProvider/models/IRepositoryUtils';
import AppError from '@shared/errors/AppError';
import { IDomainRepository } from '@modules/domain/repositories/interfaces/IDomainRepository';

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

        @inject('RepositoryUtils')
        private repositoryUtils: IRepositoryUtils,
    ) { }
    public async execute({
        name,
        image
    }: IRequest): Promise<IResponse> {



        const transaction: ITransaction = { data: [] };

        const brandExists = await this.brandsRepository.findOne({
            where: {
                name: name
            }
        })
        if (!brandExists) {
            throw new AppError(`Bandeira escolhida não existe.`);
        }

        const createdBrand = this.brandsRepository.create({
            name: name,
            image: image
        })


        transaction.data.push(
            {
                entity: createdBrand,
                repository: this.brandsRepository
            }
        )

        await this.repositoryUtils.transaction(transaction);

        return {
            brand: createdBrand
        }
    }
}

export default CreateBrandService;
