import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import Card from '@modules/cards/models/Card';
import { IDomainRepository } from '@modules/domain/repositories/interfaces/IDomainRepository';

interface IRequest {
  id: string;
  user_id: string;
}

interface IResponse {
  card: Card
}

@injectable()
class DeleteCardService {
  constructor(
    @inject('CardsRepository')
    private cardsRepository: IDomainRepository<Card>,
  ) { }
  public async execute({
    id,
    user_id,
  }: IRequest): Promise<IResponse> {
    const cardExists = await this.cardsRepository.findOne({
      where: {
        id
      },
    })

    if (!cardExists) {
      throw new AppError('Cartão não encontrado.')
    }

    if (cardExists.person.user_id !== user_id) {
      throw new AppError('Usuário não autorizado.')
    }

    this.cardsRepository.remove(cardExists)

    return {
      card: cardExists
    }
  }
}

export default DeleteCardService;
