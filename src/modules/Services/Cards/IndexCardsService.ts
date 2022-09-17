import IPaginatedResponse from '@shared/interfaces/IPaginatedResponse';
import { injectable } from 'tsyringe';
import GenericRepositoryProvider from '@modules/Repositories/Generic/implementations/GenericRepositoryProvider';
import { DeepPartial } from 'typeorm';
import Card from '@modules/models/Card/Card';

interface IRequest {
  whereParams?: DeepPartial<Card>,
  page?: number,
  limit?: number,
}

@injectable()
class IndexCardsService {
  public async execute({
    page = 1,
    limit = 10,
    whereParams
  }: IRequest): Promise<IPaginatedResponse<Card>> {
    const cardsRepository = new GenericRepositoryProvider(Card);
    return await cardsRepository.index({
      page,
      limit,
      findParams: {
        where: whereParams
      }
    })
  }
}

export default IndexCardsService;
