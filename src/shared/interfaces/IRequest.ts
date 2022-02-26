import IPaginatedRequest from "./IPaginatedRequest";
import IWhereParams from "./IWhereParams";

export interface IRequest extends IPaginatedRequest {
    whereParams: IWhereParams | undefined;
}