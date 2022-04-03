import { injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import moment from 'moment';
import { IPerson } from './interfaces/IPerson';
import Person from '@modules/models/User/Person';
import GenericRepositoryProvider from '@modules/Repositories/Generic/implementations/GenericRepositoryProvider';
import Gender from '@modules/models/User/Gender';

interface IRequest {
    person_id: string;
    person: IPerson;
} 

interface IResponse {
    person: Person
}

@injectable()
class UpdatePersonService {
  public async execute({
    person_id,
    person:{
        birth_date,
        cellphone,
        cpf,
        gender_id,
        name,
        phone
    },
  }: IRequest): Promise<IResponse> {
    const personsRepository = new GenericRepositoryProvider(Person);
    const gendersRepository = new GenericRepositoryProvider(Gender);

    const personExists = await personsRepository.findOne({
        where:{
            id:person_id
        },
        relations:['phone']
    })

    if(!personExists){
        throw new AppError('Pessoa não encontrada.')
    }

    if(birth_date){
        if(
            !(moment(birth_date, "MM/DD/YYYY", true).isValid())
            && new Date() > new Date(birth_date)
        ){
            throw new AppError('Data de nascimento inválida.')
        }
        personExists.birth_date = moment(birth_date, "DD/MM/YYYY").toDate()
    } 

    if(gender_id) {
        const genderExists = await gendersRepository.findOne({
            where:{
                id:gender_id
            }
        })
        if(!genderExists){
            throw new AppError(`Genero selecionado não é uma opção válida`)
        }
        personExists.gender_id = gender_id
    }

    if(phone&&personExists.phone){
        if(phone.number) personExists.phone.number = phone.number
        if(phone.ddd) personExists.phone.ddd = phone.ddd
    }

    if(cellphone) personExists.cellphone = cellphone
    if(cpf)       personExists.cpf = cpf
    if(name)      personExists.name = name

    await personsRepository.save(personExists)

    return {
        person:personExists
    }
  }
}

export default UpdatePersonService;
