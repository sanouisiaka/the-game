export class Page<T> {
  readonly data: T[];

  readonly meta: PageMeta;

  constructor(data: T[], page: number, totalPage: number, totalCount: number) {
    this.data = data;
    this.meta = new PageMeta(page, totalPage, totalCount);
  }
}

export class PageMeta {
  readonly page: number;

  readonly totalPage: number;

  readonly total: number;

  constructor(page: number, totalPage: number, total: number) {
    this.page = page;
    this.totalPage = totalPage;
    this.total = total;
  }
}
