import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';

import GenericRepositoryProvider from '@modules/Repositories/Generic/implementations/GenericRepositoryProvider';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import { ICard } from './Interfaces/ICard';
import Card from '@modules/models/Card/Card';
import Brand from '@modules/models/Brand/Brand';
import Person from '@modules/models/User/Person';

interface IRequest {
    user_id: string;
    card_id: string;
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
    card_id,
    card:{
        owner_name,
        number,
        brand_id,
        person_id,
        security_code
    },
  }: IRequest): Promise<IResponse> {

    const hashedNumber = await this.hashProvider.generateHash(number)
    const hashedSecurityCode = await this.hashProvider.generateHash(security_code)

    const cardsRepository = new GenericRepositoryProvider(Card);
    const brandsRepository = new GenericRepositoryProvider(Brand);
    const personsRepository = new GenericRepositoryProvider(Person);

    const cardExists = await cardsRepository.findOne({
        where:{
            id: card_id
        },
    })

    if(!cardExists){
        throw new AppError('Card não encontrado.')
    }
    
    const personExists = await personsRepository.findOne({
        where:{
            id: user_id
        },
    })

    if(!personExists){
        throw new AppError('Usuário não encontrado.')
    }
    
    if(owner_name) cardExists.owner_name = owner_name;
    if(number) cardExists.number = hashedNumber;
    if(person_id) cardExists.person_id = person_id;
    if(security_code) cardExists.security_code = hashedSecurityCode;
    if(brand_id){
        const brandExists = await brandsRepository.findOne({
            where:{
                id: brand_id
            }
        })
        
        if(!brandExists){
            throw new AppError(`Bandeira escolhida não existe.`);
        }
    }

    await cardsRepository.save(cardExists);

    return {
        card:cardExists
    }
  }
}

export default UpdateCardService;
