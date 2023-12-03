export class Page<T> {
  readonly data: T[];

  readonly meta: PageMeta;

  constructor(data: T[], page: number, totalCount: number) {
    this.data = data;
    this.meta = new PageMeta(page, totalCount);
  }
}

export class PageMeta {
  readonly page: number;

  readonly total: number;

  constructor(page: number, total: number) {
    this.page = page;
    this.total = total;
  }
}
