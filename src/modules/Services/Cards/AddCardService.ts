import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IRepositoryUtils, { ITransaction } from '@shared/container/providers/RepositoryUtilsProvider/models/IRepositoryUtils';
import GenericRepositoryProvider from '@modules/Repositories/Generic/implementations/GenericRepositoryProvider';
import Card from '@modules/models/Card/Card';
import Brand from '@modules/models/Brand/Brand';
import User from '@modules/models/User/User';


interface IRequest {
  owner_name: string,
  number: string,
  brand_id: string,
  user_id: string,
  security_code: string
}

@injectable()
class AddPersonCardsService {
  constructor(
    @inject('RepositoryUtils')
    private repositoryUtils: IRepositoryUtils,
  ) {}

  public async execute({
    owner_name,
    number,
    brand_id,
    user_id,
    security_code
  }: IRequest): Promise<Card | undefined> {
    const cardsRepository = new GenericRepositoryProvider(Card);
    const brandsRepository = new GenericRepositoryProvider(Brand);
    const usersRepository = new GenericRepositoryProvider(User);

    const transaction : ITransaction = { data: [] };

    const userExists = await usersRepository.findOne({
      where:{id: user_id},
    })

    if(!userExists){
      throw new AppError('Usuário não encontrado');
    }

    if(!userExists.person){
      throw new AppError('Não pode cadastrar cartão sem os outros dados pessoais.');
    }

    if(brand_id){
      const brandExists = await brandsRepository.findOne({
        where:{ id: brand_id }
      });

      if(!brandExists){
          throw new AppError(`A bandeira escolhida não existe.`);
      }
    }

    const createdCard= cardsRepository.create({
      owner_name,
      number,
      brand_id,
      person_id: userExists.person.id,
      security_code
    })

    transaction.data.push(
      {
        entity:createdCard,
        repository:cardsRepository
      }
    )
    
    await this.repositoryUtils.transaction(transaction);

    return createdCard;
  }
}

export default AddPersonCardsService;
