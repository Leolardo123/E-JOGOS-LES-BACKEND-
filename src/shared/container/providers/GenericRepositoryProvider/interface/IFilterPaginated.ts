import { IFilter } from "./IFilter";

export interface IFilterPaginated<T> {
    page?: number,
    limit?: number,
    findParams?: IFilter<T>,
}