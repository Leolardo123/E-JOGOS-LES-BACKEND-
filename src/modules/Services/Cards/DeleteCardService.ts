import { injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import GenericRepositoryProvider from '@modules/Repositories/Generic/implementations/GenericRepositoryProvider';
import PersonCard from '@modules/models/Card/PersonCard';

interface IRequest {
    id: string;
} 

interface IResponse {
    card: PersonCard;
}

@injectable()
export default class DeleteCardService {
  public async execute({
    id,
  }: IRequest): Promise<IResponse> {
    const personCardsRepository = new GenericRepositoryProvider(PersonCard);

    console.log(id)

    const cardExists = await personCardsRepository.findOne({
      where:{
        id: id,
      },
    })

    if(!cardExists){
        throw new AppError('Cartão não encontrado.', 404)
    }

    personCardsRepository.remove(cardExists)

    return {
        card:cardExists
    }
  }
}
