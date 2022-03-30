import { IPerson } from "../../Users/interfaces/IPerson";
import { IBrand } from "./IBrand";

export interface ICard{
    owner_name: string,
    number: number,
    brand_id: string,
    person_id: string,
    security_code: string
}