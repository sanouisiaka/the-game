import { AXIOS_HTTP_CLIENT, HttpClient } from '@/rest/axios.config';

import { AxiosResponse } from 'axios';
import { inject, injectable } from 'tsyringe';
import { IFixtureRepository } from '@/corelogic/ports/fixture.repository.interface';
import { Fixture } from '@/corelogic/domain/fixture/fixture';
import { Page } from '@/corelogic/domain/page';

@injectable()
export class FixtureRepository implements IFixtureRepository {

  // @ts-ignore
  constructor(@inject(AXIOS_HTTP_CLIENT) private axiosHttp: HttpClient) {
  }

  async getPaginatedFixtures(leagueId: number, after: Date, page: number, size?: number): Promise<Page<Fixture>> {
    return this.axiosHttp.get<AxiosResponse<Page<Fixture>>>('/fixtures', { leagueId, after, page, size })
      .then(response => response.data);
  }


}