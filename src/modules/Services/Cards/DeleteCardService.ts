import { injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import GenericRepositoryProvider from '@modules/Repositories/Generic/implementations/GenericRepositoryProvider';
import Card from '@modules/models/Card/Card';

interface IRequest {
    user_id: string;
    card_id: string;
} 

interface IResponse {
    card: Card
}

@injectable()
class DeleteCardService {
  public async execute({
    user_id,
    card_id
  }: IRequest): Promise<IResponse> {
    const cardsRepository = new GenericRepositoryProvider(Card);
    const cardExists = await cardsRepository.findOne({
      where:{
        id:card_id,
        person_id:user_id,
      },
    })

    if(!cardExists){
        throw new AppError('Usuário não encontrado.')
    }

    cardsRepository.remove(cardExists)

    return {
        card:cardExists
    }
  }
}

export default DeleteCardService;
