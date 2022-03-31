import { inject, injectable } from 'tsyringe';

import IRepositoryUtils, { ITransaction } from '../../../shared/container/providers/RepositoryUtilsProvider/models/IRepositoryUtils';
import AppError from '../../../shared/errors/AppError';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
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

interface IResponse {
    card: Card
}

@injectable()
class CreateCardService {
  constructor(
    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('RepositoryUtils')
    private repositoryUtils: IRepositoryUtils,
  ) {}
  public async execute({
    owner_name,
    number,
    brand_id,
    person_id,
    security_code
  }: IRequest): Promise<IResponse> {

    const hashedNumber = await this.hashProvider.generateHash(number)
    const hashedSecurityCode = await this.hashProvider.generateHash(security_code)

    const cardsRepository = new GenericRepositoryProvider(Card)
    const personsRepository = new GenericRepositoryProvider(Person)
    const brandsRepository = new GenericRepositoryProvider(Brand)

    const transaction: ITransaction = { data: [] };

    const personExists = await personsRepository.findOne({
        where:{
            id: person_id
        }
    })

    if(!personExists){
        throw new AppError('Usuário não encontrado.')
    } 

    const brandExists = await brandsRepository.findOne({
        where:{
            id: brand_id
        }
    })
    if(!brandExists){
        throw new AppError(`Bandeira escolhida não existe.`);
    }

    const createdCard = cardsRepository.create({
        owner_name: owner_name,
        number: hashedNumber,
        brand_id: brand_id,
        person_id: person_id,
        security_code: hashedSecurityCode
    })
    

    transaction.data.push(
        {
            entity: createdCard,
            repository: cardsRepository
        }
    )

    await this.repositoryUtils.transaction(transaction);

    return {
        card:createdCard
    }
  }
}

export default CreateCardService;
