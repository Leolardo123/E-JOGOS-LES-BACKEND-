import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IRepositoryUtils, { ITransaction } from '@shared/container/providers/RepositoryUtilsProvider/models/IRepositoryUtils';
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

@injectable()
class AddPersonCardsService {
  constructor(
    @inject('CardsRepository')
    private cardsRepository: IDomainRepository<Card>,

    @inject('BrandsRepository')
    private brandsRepository: IDomainRepository<Brand>,

    @inject('UsersRepository')
    private usersRepository: IDomainRepository<User>,

    @inject('RepositoryUtils')
    private repositoryUtils: IRepositoryUtils,
  ) { }

  public async execute({
    owner_name,
    number,
    brand_id,
    user_id,
    security_code
  }: IRequest): Promise<Card | undefined> {


    const transaction: ITransaction = { data: [] };

    const userExists = await this.usersRepository.findOne({
      where: { id: user_id },
    })

    if (!userExists) {
      throw new AppError('Usuário não encontrado');
    }

    if (!userExists.person) {
      throw new AppError('Não pode cadastrar cartão sem os outros dados pessoais.');
    }

    if (brand_id) {
      const brandExists = await this.brandsRepository.findOne({
        where: { id: brand_id }
      });

      if (!brandExists) {
        throw new AppError(`A bandeira escolhida não existe.`);
      }
    }

    const createdCard = this.cardsRepository.create({
      owner_name,
      number,
      brand_id,
      person_id: userExists.person.id,
      security_code
    })

    transaction.data.push(
      {
        entity: createdCard,
        repository: this.cardsRepository
      }
    )

    await this.repositoryUtils.transaction(transaction);

    return createdCard;
  }
}

export default AddPersonCardsService;
