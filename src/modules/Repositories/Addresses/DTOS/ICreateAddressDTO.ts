export default interface ICreateAddressDTO {
    id: string;
    cep: string;
    number: number;
    address_type_id: number;
    city: string; 
    state: string;
    country: string;
    complement?: string;
    neighborhood: string;
    place: string;
    place_type_id: string;
}