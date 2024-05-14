import { SortType } from "./sortTypes";

export interface IPagination{
    pageSize: number; 
    currentPage: number
}

export interface IGetParams extends IPagination{
    sortBy: SortType
    request: string
}