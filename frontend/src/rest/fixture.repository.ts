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

  async getPaginatedIncomingFixtures(leagueId: number, page: number, size?: number): Promise<Page<Fixture>> {
    return this.axiosHttp.get<AxiosResponse<Page<Fixture>>>('/fixtures', { leagueId, after: new Date(), page, size })
      .then(response => response.data);
  }

  async getPaginatedPastFixtures(page: number, size?: number): Promise<Page<Fixture>> {
    return this.axiosHttp.get<AxiosResponse<Page<Fixture>>>('/fixtures', { before: new Date(), page, size })
      .then(response => response.data);
  }


}