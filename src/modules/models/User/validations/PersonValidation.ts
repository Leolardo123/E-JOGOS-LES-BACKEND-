import { IValidate } from "@modules/models/validations/IValidate";
import AppError from "@shared/errors/AppError";
import moment from "moment";
import Person from "../Person";

export default class PersonValidation extends IValidate {
  public async validate(person: Person): Promise<void> {
    if(
        !(moment(person.birth_date, "MM/DD/YYYY", true).isValid())
    ){
        throw new AppError('Data de nascimento inválida.')
    }
  }
}