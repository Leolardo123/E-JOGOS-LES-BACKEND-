import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import Card from '@modules/cards/models/Card';
import { IDomainRepository } from '@modules/domain/repositories/interfaces/IDomainRepository';

interface IRequest {
  id: string;
}

interface IResponse {
  card: Card
}

@injectable()
class ShowCardService {
  constructor(
    @inject('CardsRepository')
    private cardsRepository: IDomainRepository<Card>,
  ) { }
  public async execute({
    id
  }: IRequest): Promise<IResponse> {
    const cardExists = await this.cardsRepository.findOne({
      where: {
        id: id,
      },
    })

    if (!cardExists) {
      throw new AppError('Card não encontrado.')
    }

    return {
      card: cardExists
    }
  }
}

export default ShowCardService;
