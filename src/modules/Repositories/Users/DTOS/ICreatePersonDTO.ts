export default interface ICreatePersonDTO {
    id: string;
    name: string;
    cpf: string;
    cellphone: number;
    birth_date: Date;
    gender_id: number;
    address_id: string;
}