import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IRepositoryUtils, { ITransaction } from '@shared/container/providers/RepositoryUtilsProvider/models/IRepositoryUtils';
import GenericRepositoryProvider from '@modules/Repositories/Generic/implementations/GenericRepositoryProvider';
import Person from '@modules/models/User/Person';
import Card from '@modules/models/Card/Card';
import Brand from '@modules/models/Brand/Brand';


interface IRequest {
  owner_name: string,
  number: string,
  brand_id: string,
  person_id: string,
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
    person_id,
    security_code
  }: IRequest): Promise<Card | undefined> {
    const cardsRepository = new GenericRepositoryProvider(Card);
    const brandsRepository = new GenericRepositoryProvider(Brand);
    const personsRepository = new GenericRepositoryProvider(Person);

    const transaction : ITransaction = { data: [] };

    const personExists = await personsRepository.findOne({
      where:{id: person_id},
    })
    
    if(!personExists){
      throw new AppError('Pessoa não encontrada');
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
      person_id,
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
