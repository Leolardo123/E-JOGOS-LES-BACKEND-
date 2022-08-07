import IPaginatedResponse from '@shared/interfaces/IPaginatedResponse';
import { inject, injectable } from 'tsyringe';
import { DeepPartial } from 'typeorm';
import Card from '@modules/cards/models/Card';
import { IDomainRepository } from '@modules/domain/repositories/interfaces/IDomainRepository';

interface IRequest {
  whereParams?: DeepPartial<Card>,
  page?: number,
  limit?: number,
}

@injectable()
class IndexCardsService {
  constructor(
    @inject('CardsRepository')
    private cardsRepository: IDomainRepository<Card>,
  ) { }
  public async execute({
    page = 1,
    limit = 10,
    whereParams
  }: IRequest): Promise<IPaginatedResponse<Card>> {
    return await this.cardsRepository.index({
      page,
      limit,
      findParams: {
        where: whereParams
      }
    })
  }
}

export default IndexCardsService;
