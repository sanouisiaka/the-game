export type Page<T> = {
  currentPage: number;
  totalPage: number;
  totalCount: number;
  response: T[]
}