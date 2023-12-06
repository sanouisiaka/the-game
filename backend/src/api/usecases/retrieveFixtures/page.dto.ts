export class PageDto<T> {
  readonly response: T[];

  readonly currentPage: number;

  readonly totalPage: number;

  readonly totalCount: number;

  constructor(response: T[], currentPage: number, totalPage: number, totalCount: number) {
    this.response = response;
    this.currentPage = currentPage;
    this.totalPage = totalPage;
    this.totalCount = totalCount;
  }
}
