import { injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import GenericRepositoryProvider from '@modules/Repositories/Generic/implementations/GenericRepositoryProvider';
import Card from '@modules/models/Card/Card';

interface IRequest {
    id: string;
    user_id: string;
} 

interface IResponse {
    card: Card
}

@injectable()
class DeleteCardService {
  public async execute({
    id,
    user_id,
  }: IRequest): Promise<IResponse> {
    const cardsRepository = new GenericRepositoryProvider(Card);
    const cardExists = await cardsRepository.findOne({
      where:{
        id
      },
    })

    if(!cardExists){
        throw new AppError('Cartão não encontrado.')
    }

    if(cardExists.person.user_id !== user_id){
        throw new AppError('Usuário não autorizado.')
    }

    cardsRepository.remove(cardExists)

    return {
        card:cardExists
    }
  }
}

export default DeleteCardService;
