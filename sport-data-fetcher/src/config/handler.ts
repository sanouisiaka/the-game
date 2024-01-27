export interface Handler<T> {
  handle(request: T): void;
}
