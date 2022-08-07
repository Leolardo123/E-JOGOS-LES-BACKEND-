import { inject, injectable } from 'tsyringe';

import IRepositoryUtils, { ITransaction } from '../../../shared/container/providers/RepositoryUtilsProvider/models/IRepositoryUtils';
import AppError from '../../../shared/errors/AppError';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import { IDomainRepository } from '@modules/domain/repositories/interfaces/IDomainRepository';
import Card from '../models/Card';
import User from '@modules/users/models/User';
import Brand from '../models/Brand';

interface IRequest {
    owner_name: string,
    number: string,
    brand_id: string,
    user_id: string,
    security_code: string
}

interface IResponse {
    card: Card
}

@injectable()
class CreateCardService {
    constructor(
        @inject('CardsRepository')
        private cardsRepository: IDomainRepository<Card>,

        @inject('BrandsRepository')
        private brandsRepository: IDomainRepository<Brand>,

        @inject('UsersRepository')
        private usersRepository: IDomainRepository<User>,

        @inject('HashProvider')
        private hashProvider: IHashProvider,

        @inject('RepositoryUtils')
        private repositoryUtils: IRepositoryUtils,
    ) { }
    public async execute({
        owner_name,
        number,
        brand_id,
        user_id,
        security_code
    }: IRequest): Promise<IResponse> {

        const hashedNumber = await this.hashProvider.generateHash(number)
        const hashedSecurityCode = await this.hashProvider.generateHash(security_code)

        const transaction: ITransaction = { data: [] };

        const userExists = await this.usersRepository.findOne({
            where: {
                id: user_id
            }
        })

        if (!userExists) {
            throw new AppError('Usuário não encontrado.')
        }

        if (!userExists.person) {
            throw new AppError('Não pode cadastrar cartão sem os outros dados pessoais.')
        }

        const brandExists = await this.brandsRepository.findOne({
            where: {
                id: brand_id
            }
        })

        if (!brandExists) {
            throw new AppError(`Bandeira escolhida não existe.`);
        }

        const createdCard = this.cardsRepository.create({
            owner_name: owner_name,
            number: hashedNumber,
            brand_id: brand_id,
            person_id: userExists.person.id,
            security_code: hashedSecurityCode
        })

        transaction.data.push(
            {
                entity: createdCard,
                repository: this.cardsRepository
            }
        )

        await this.repositoryUtils.transaction(transaction);

        return {
            card: createdCard
        }
    }
}

export default CreateCardService;
