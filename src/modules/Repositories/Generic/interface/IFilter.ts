import { DeepPartial } from "typeorm";

export interface IFilter<T> {
    where?: DeepPartial<T>,
    relations?: string[],
}