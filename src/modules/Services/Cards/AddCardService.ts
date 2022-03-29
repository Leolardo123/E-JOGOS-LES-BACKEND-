import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IRepositoryUtils, { ITransaction } from '@shared/container/providers/RepositoryUtilsProvider/models/IRepositoryUtils';
import GenericRepositoryProvider from '@modules/Repositories/Generic/implementations/GenericRepositoryProvider';
import Person from '@modules/models/User/Person';
import { ICard } from './Interfaces/ICard';
import Card from '@modules/models/Card/Card';
import Brand from '@modules/models/Card/Brand';


interface IRequest {
  cards: ICard[];
  user_id: string;
}

@injectable()
class AddPersonCardsService {
  constructor(
    @inject('RepositoryUtils')
    private repositoryUtils: IRepositoryUtils,
  ) {}

  public async execute({
    cards,
    user_id
  }: IRequest): Promise<Card[] | undefined> {
    const cardsRepository = new GenericRepositoryProvider(Card);
    const brandRepository = new GenericRepositoryProvider(Brand);
    const personsRepository = new GenericRepositoryProvider(Person);

    const transaction : ITransaction = { data: [] };

    const personExists = await personsRepository.findOne({
      where:{user_id},
    })
    
    if(!personExists){
      throw new AppError('Pessoa não encontrada');
    }

    let createdCards = [] as Card[];
    for(let card of cards){

      const createdCard= cardsRepository.create({
        ...card
      })

      transaction.data.push(
        {
          entity:createdCard,
          repository:cardsRepository
        }
      )

      createdCards.push(createdCard);
    }

    await this.repositoryUtils.transaction(transaction);

    return createdCards;
  }
}

export default AddPersonCardsService;
