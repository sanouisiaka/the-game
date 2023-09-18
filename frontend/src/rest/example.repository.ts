import { ExampleInterface } from '@/corelogic/ports/repository.interface'
import axiosInstance from '@/rest/axios.config'

export class ExampleRepository implements ExampleInterface {
  getExample(): Promise<string> {
    return axiosInstance.get<string>('/example')
      .then(response => response.data)
      .catch(() => '')

  }

}

export const exampleRepository = new ExampleRepository();