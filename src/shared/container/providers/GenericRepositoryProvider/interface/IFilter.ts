export interface IFilter<T> {
    where?: Partial<T>,
    relations?: string[],
}