const PAGE_DEFAULT = 1; 
const LIMIT_DEFAULT = 8;

export interface IPagination {
    total: number;
    totalPage: number;
    current: number
}


export {PAGE_DEFAULT, LIMIT_DEFAULT}