import { injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import GenericRepositoryProvider from '@modules/Repositories/Generic/implementations/GenericRepositoryProvider';
import Card from '@modules/models/Card/Card';

interface IRequest {
    id: string;
} 

interface IResponse {
    card: Card
}

@injectable()
class DeleteCardService {
  public async execute({
    id
  }: IRequest): Promise<IResponse> {
    const cardsRepository = new GenericRepositoryProvider(Card);
    const cardExists = await cardsRepository.findOne({
      where:{
        id:id,
      },
    })

    if(!cardExists){
        throw new AppError('Cartão não encontrado.')
    }

    cardsRepository.remove(cardExists)

    return {
        card:cardExists
    }
  }
}

export default DeleteCardService;
