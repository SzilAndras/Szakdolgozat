
export interface PageableInterface<T> {
  content?: T[];
  totalElements: number;
  last: boolean;
  first: boolean;
  empty: boolean;
  totalPages: number;
  number: number;
  size: number;
  numberOfElements: number;
}
