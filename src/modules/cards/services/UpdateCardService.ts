import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import { ICard } from './Interfaces/ICard';
import Card from '@modules/cards/models/Card';
import { IDomainRepository } from '@modules/domain/repositories/interfaces/IDomainRepository';
import User from '@modules/users/models/User';
import Brand from '../models/Brand';

interface IRequest {
    id: string;
    user_id: string;
    card: ICard;
}

interface ICustomCard {
    owner_name: string;
    number: string;
    brand_id: string;
    security_code: string;
}

interface IResponse {
    card: ICustomCard
}

@injectable()
class UpdateCardService {
    constructor(
        @inject('CardsRepository')
        private cardsRepository: IDomainRepository<Card>,

        @inject('BrandsRepository')
        private brandsRepository: IDomainRepository<Brand>,

        @inject('UsersRepository')
        private usersRepository: IDomainRepository<User>,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) { }

    public async execute({
        id,
        user_id,
        card: {
            owner_name,
            number,
            brand_id,
            security_code
        },
    }: IRequest): Promise<IResponse> {

        // const hashedNumber = await this.hashProvider.generateHash(number)
        // const hashedSecurityCode = await this.hashProvider.generateHash(security_code)

        const cardExists = await this.cardsRepository.findOne({
            where: {
                id: id
            },
        })

        if (!cardExists) {
            throw new AppError('Card não encontrado.')
        }

        const usersExists = await this.usersRepository.findOne({
            where: {
                id: user_id
            },
        })

        if (!usersExists) {
            throw new AppError('Usuário não encontrado.')
        }

        if (owner_name) cardExists.owner_name = owner_name;
        if (number) cardExists.number = number;
        if (user_id) cardExists.person_id = user_id;
        if (security_code) cardExists.security_code = security_code;
        if (brand_id) {
            const brandExists = await this.brandsRepository.findOne({
                where: {
                    id: brand_id
                }
            })

            if (!brandExists) {
                throw new AppError(`Bandeira escolhida não existe.`);
            } else {
                cardExists.brand_id = brand_id;
            }
        }

        await this.cardsRepository.save(cardExists);

        return {
            card: cardExists
        }
    }
}

export default UpdateCardService;
