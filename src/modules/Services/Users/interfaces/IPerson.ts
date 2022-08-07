import { IPhone } from "./IPhone";

export interface IPerson{
    name: string;
    cpf: string;
    cellphone: string;
    birth_date: string;
    gender_id: number;
    phone: IPhone;
}