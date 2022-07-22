import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';

import GenericRepositoryProvider from '@modules/Repositories/Generic/implementations/GenericRepositoryProvider';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import { ICard } from './Interfaces/ICard';
import Card from '@modules/models/Card/Card';
import Brand from '@modules/models/Brand/Brand';
import Person from '@modules/models/User/Person';
import User from '@modules/models/User/User';

interface IRequest {
    id: string;
    user_id: string;
    card: ICard;
} 

interface IResponse {
    card: Card
}

@injectable()
class UpdateCardService {

  constructor(
      @inject('HashProvider')
        private hashProvider: IHashProvider,
    ){}

  public async execute({
      user_id,
      id,
    card:{
        owner_name,
        number,
        brand_id,
        security_code
    },
  }: IRequest): Promise<IResponse> {

    // const hashedNumber = await this.hashProvider.generateHash(number)
    // const hashedSecurityCode = await this.hashProvider.generateHash(security_code)

    const cardsRepository = new GenericRepositoryProvider(Card);
    const brandsRepository = new GenericRepositoryProvider(Brand);
    const usersRepository = new GenericRepositoryProvider(User);

    const cardExists = await cardsRepository.findOne({
        where:{
            id: id
        },
        relations:['person_card', 'person_card.person']
    })

    if(!cardExists){
        throw new AppError('Card não encontrado.', 404)
    }
    
    const usersExists = await usersRepository.findOne({
        where:{
            id: user_id
        },
    })

    if(!usersExists){
        throw new AppError('Usuário não encontrado.')
    }
    
    if(owner_name) cardExists.owner_name = owner_name;
    if(number) cardExists.number = number;
    if(security_code) cardExists.security_code = security_code;
    if(brand_id){
        const brandExists = await brandsRepository.findOne({
            where:{
                id: brand_id
            }
        })
        
        if(!brandExists){
            throw new AppError(`Bandeira escolhida não existe.`);
        } else {
            cardExists.brand_id = brand_id;
        }
    }

    await cardsRepository.save(cardExists);

    return {
        card:cardExists
    }
  }
}

export default UpdateCardService;
