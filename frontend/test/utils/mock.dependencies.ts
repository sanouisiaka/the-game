import { HttpClient } from '@/rest/axios.config'

export class HttpClientMocked implements HttpClient {
  get = jest.fn();
  post = jest.fn();
  patch = jest.fn();
  delete = jest.fn();
}