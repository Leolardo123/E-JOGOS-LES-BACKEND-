import { injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import GenericRepositoryProvider from '@modules/Repositories/Generic/implementations/GenericRepositoryProvider';
import Card from '@modules/models/Card/Card';
import PersonCard from '@modules/models/Card/PersonCard';

interface IRequest {
    id: string;
    user_id?: string;
}

@injectable()
class ShowCardService {
  public async execute({
    id,
    user_id
  }: IRequest): Promise<Card | undefined> {
    const personCardsRepository = new GenericRepositoryProvider(PersonCard)
    const personCard = await personCardsRepository.findOne({
      where:{
        id,
      },
      relations: ['card']
    })

    if(!personCard){
        throw new AppError('Card não encontrado.', 404);
    }

    return personCard.card;
  }
}

export default ShowCardService;
