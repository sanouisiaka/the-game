export class PageResponse<T> {
  readonly response: T[];

  readonly currentPage: number;

  readonly totalCount: number;

  constructor(response: T[], currentPage: number, totalCount: number) {
    this.response = response;
    this.currentPage = currentPage;
    this.totalCount = totalCount;
  }
}
